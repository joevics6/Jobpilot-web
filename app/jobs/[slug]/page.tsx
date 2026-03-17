import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { mapJobToSchema } from '@/lib/mapJobToSchema';
import JobClient from './JobClient';
import { Metadata } from 'next';

export const revalidate = 3600;

const KNOWN_COUNTRIES = [
  'us', 'united-states', 'canada', 'australia', 'new-zealand',
  'france', 'spain', 'germany', 'united-kingdom', 'uk', 'uae', 'emirates'
];

// ─── Country abbreviation map for CTR ────────────────────────────────────────
const COUNTRY_ABBREVIATIONS: Record<string, string> = {
  'nigeria': 'NG',
  'united states': 'U.S',
  'usa': 'U.S',
  'us': 'U.S',
  'united kingdom': 'U.K',
  'uk': 'U.K',
  'united arab emirates': 'UAE',
  'uae': 'UAE',
  'canada': 'Canada',
  'australia': 'Australia',
  'germany': 'Germany',
  'france': 'France',
  'spain': 'Spain',
  'new zealand': 'NZ',
  'kenya': 'Kenya',
  'ghana': 'Ghana',
  'south africa': 'S.Africa',
};

function getCountryAbbreviation(job: any): string | null {
  if (job.location?.remote) return 'Remote';
  if (Array.isArray(job.country) && job.country.length > 0) {
    const first = job.country.find((c: string) => c.toLowerCase() !== 'global');
    if (first) return COUNTRY_ABBREVIATIONS[first.toLowerCase()] || first;
  }
  if (job.location && typeof job.location === 'object') {
    const country = job.location.country;
    if (country && country.toLowerCase() !== 'global') {
      return COUNTRY_ABBREVIATIONS[country.toLowerCase()] || country;
    }
  }
  return null;
}

// ─── generateMetadata ────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  if (KNOWN_COUNTRIES.includes(slug)) {
    redirect(`/jobs/${slug}`);
  }
  
  const supabase = createClient();
  
  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !job) {
    return {
      title: 'Job Not Found - JobMeter',
      description: 'The job you are looking for could not be found. Browse more jobs on JobMeter.',
    };
  }

  // NULL SAFE: Company name
  const companyName = typeof job.company === 'string' 
    ? job.company 
    : (job.company?.name || 'Company');

  const isConfidential = companyName === 'Confidential Employer';

  // NULL SAFE: Location string
  const locationStr = typeof job.location === 'string'
    ? job.location
    : (job.location?.remote 
        ? 'Remote'
        : [job.location?.city, job.location?.state, job.location?.country].filter(Boolean).join(', ') || 'Not specified');

  // NULL SAFE: Salary string
  const getSalaryString = () => {
    if (job.salary_abbreviation) return job.salary_abbreviation;
    if (job.salary) return job.salary;
    if (job.salary_range && typeof job.salary_range === 'object') {
      const { min, max, currency } = job.salary_range;
      if (currency && (min || max)) {
        if (min && max) return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
        if (min) return `${currency} ${min.toLocaleString()}`;
        if (max) return `${currency} ${max.toLocaleString()}`;
      }
    }
    return null;
  };

  const salaryStr = getSalaryString();
  const jobTitle = job.title || 'Job Opportunity';
  const countryAbbr = getCountryAbbreviation(job);

  // ── Title: "Accountant at Dangote in NG | JobMeter"
  // or for confidential: "Accountant in Lagos, NG | JobMeter"
  let titleCore = isConfidential
    ? countryAbbr ? `${jobTitle} in ${countryAbbr}` : jobTitle
    : countryAbbr ? `${jobTitle} at ${companyName} in ${countryAbbr}` : `${jobTitle} at ${companyName}`;

  // Keep title under 60 chars before " | JobMeter"
  if (titleCore.length > 49) titleCore = titleCore.substring(0, 49).trim();
  const title = `${titleCore} | JobMeter`;

  // ── Description: keyword-rich with location and salary
  let description = isConfidential
    ? `Apply for ${jobTitle} in ${locationStr}`
    : `Apply for ${jobTitle} at ${companyName} in ${locationStr}`;

  if (salaryStr) description += `. Salary: ${salaryStr}`;
  if (job.employment_type) description += `. ${job.employment_type}`;
  if (job.sector) description += ` ${job.sector} role.`;
  description += ' Apply now on JobMeter.';

  if (description.length > 155) description = description.substring(0, 152).trim() + '...';

  // ── robots: noindex only for status === 'expired' (Confidential Employer expired jobs)
  const isNoIndex = job.status === 'expired';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'JobMeter',
      url: `https://www.jobmeter.app/jobs/${job.slug || job.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://www.jobmeter.app/jobs/${job.slug || job.id}`,
    },
    robots: isNoIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

// ─── View count ───────────────────────────────────────────────────────────────

async function incrementViewCount(slug: string) {
  const supabase = createClient();
  try {
    await supabase.rpc('increment_job_views', { job_slug: slug });
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
}

// ─── Related jobs ─────────────────────────────────────────────────────────────

async function fetchRelatedJobs(currentJob: any) {
  const supabase = createClient();
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  let relatedJobs: any[] = [];
  const MAX_JOBS = 10;

  if (currentJob.category) {
    const { data: categoryJobs, error: catError } = await supabase
      .from('jobs')
      .select('id, slug, title, company, location, salary_range, posted_date, created_at, category, sector')
      .eq('category', currentJob.category)
      .eq('status', 'active')
      .neq('id', currentJob.id)
      .or(`posted_date.gte.${thirtyDaysAgo.toISOString().split('T')[0]},created_at.gte.${thirtyDaysAgo.toISOString()}`)
      .order('created_at', { ascending: false })
      .limit(8);

    if (!catError && categoryJobs && categoryJobs.length > 0) {
      relatedJobs = categoryJobs;
    }
  }

  if (relatedJobs.length < MAX_JOBS && currentJob.sector) {
    const excludeIds = [currentJob.id, ...relatedJobs.map(job => job.id)];
    const remainingSlots = MAX_JOBS - relatedJobs.length;

    const { data: sectorJobs, error: sectorError } = await supabase
      .from('jobs')
      .select('id, slug, title, company, location, salary_range, posted_date, created_at, category, sector')
      .eq('sector', currentJob.sector)
      .eq('status', 'active')
      .neq('id', currentJob.id)
      .not('id', 'in', `(${excludeIds.join(',')})`)
      .or(`posted_date.gte.${thirtyDaysAgo.toISOString().split('T')[0]},created_at.gte.${thirtyDaysAgo.toISOString()}`)
      .order('created_at', { ascending: false })
      .limit(remainingSlots);

    if (!sectorError && sectorJobs && sectorJobs.length > 0) {
      relatedJobs = [...relatedJobs, ...sectorJobs];
    }
  }

  const validJobs = relatedJobs.filter(job => job && job.slug && job.title);
  return validJobs.slice(0, MAX_JOBS);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function JobPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  
  const { slug } = params;
  
  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !job) {
    notFound();
  }

  incrementViewCount(params.slug);

  const relatedJobs = await fetchRelatedJobs(job);
  const schema = mapJobToSchema(job);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <JobClient job={job} relatedJobs={relatedJobs} />
    </>
  );
}