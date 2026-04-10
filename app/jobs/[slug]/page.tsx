import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { mapJobToSchema } from '@/lib/mapJobToSchema';
import JobClient from './JobClient';
import { Metadata } from 'next';
import { cache } from 'react';

export const revalidate = false;
export const dynamic = 'force-static';

const COMPANIES_URL = 'https://jobs-api.joevicspro.workers.dev/companies';

const getJob = cache(async (slug: string) => {
  const supabase = createClient();
  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error || !job) return null;
  return job;
});

const getCompanies = cache(async () => {
  try {
    const res = await fetch(COMPANIES_URL, {
      next: { revalidate: 604800 },
    });
    const data = await res.json();
    return data.companies || [];
  } catch (error) {
    console.error('Failed to fetch companies from Cloudflare:', error);
    return [];
  }
});

const getRelatedJobs = cache(async (currentJob: any) => {
  const supabase = createClient();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  let relatedJobs: any[] = [];
  const MAX_JOBS = 10;

  if (currentJob.category) {
    const { data: categoryJobs } = await supabase
      .from('jobs')
      .select('id, slug, title, company, location, salary_range, posted_date, created_at, category, sector')
      .eq('category', currentJob.category)
      .eq('status', 'active')
      .neq('id', currentJob.id)
      .or(`posted_date.gte.${thirtyDaysAgo.toISOString().split('T')[0]},created_at.gte.${thirtyDaysAgo.toISOString()}`)
      .order('created_at', { ascending: false })
      .limit(8);
    if (categoryJobs) relatedJobs = categoryJobs;
  }

  if (relatedJobs.length < MAX_JOBS && currentJob.sector) {
    const excludeIds = [currentJob.id, ...relatedJobs.map(job => job.id)];
    const remainingSlots = MAX_JOBS - relatedJobs.length;

    const { data: sectorJobs } = await supabase
      .from('jobs')
      .select('id, slug, title, company, location, salary_range, posted_date, created_at, category, sector')
      .eq('sector', currentJob.sector)
      .eq('status', 'active')
      .neq('id', currentJob.id)
      .not('id', 'in', `(${excludeIds.join(',')})`)
      .or(`posted_date.gte.${thirtyDaysAgo.toISOString().split('T')[0]},created_at.gte.${thirtyDaysAgo.toISOString()}`)
      .order('created_at', { ascending: false })
      .limit(remainingSlots);
    if (sectorJobs) relatedJobs = [...relatedJobs, ...sectorJobs];
  }

  return relatedJobs.slice(0, MAX_JOBS);
});

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await getJob(params.slug);
  
  if (!job) {
    return {
      title: 'Job Not Found - JobMeter',
      description: 'The job you are looking for could not be found. Browse more jobs on JobMeter.',
    };
  }

  const companyName = typeof job.company === 'string' 
    ? job.company 
    : (job.company?.name || 'Company');

  const isConfidential = companyName === 'Confidential Employer';

  const locationStr = typeof job.location === 'string'
    ? job.location
    : (job.location?.remote 
        ? 'Remote'
        : [job.location?.city, job.location?.state, job.location?.country].filter(Boolean).join(', ') || 'Not specified');

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

  let titleCore = isConfidential
    ? `${jobTitle} in ${locationStr}`
    : `${jobTitle} at ${companyName} in ${locationStr}`;

  if (titleCore.length > 60) titleCore = titleCore.substring(0, 60).trim();

  let description = isConfidential
    ? `Apply for ${jobTitle} in ${locationStr}`
    : `Apply for ${jobTitle} at ${companyName} in ${locationStr}`;

  if (salaryStr) description += `. Salary: ${salaryStr}`;
  if (job.employment_type) description += `. ${job.employment_type}`;
  if (job.sector) description += ` ${job.sector} role.`;
  description += ' Apply now on JobMeter.';

  if (description.length > 155) description = description.substring(0, 152).trim() + '...';

  const isNoIndex = job.status === 'expired';

  return {
    title: titleCore,
    description,
    openGraph: {
      title: titleCore,
      description,
      type: 'website',
      siteName: 'JobMeter',
      url: `https://www.jobmeter.app/jobs/${job.slug || job.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: titleCore,
      description,
    },
    alternates: {
      canonical: `https://www.jobmeter.app/jobs/${job.slug || job.id}`,
    },
    robots: isNoIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export default async function JobPage({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug);
  if (!job) notFound();

  const companies = await getCompanies();
  const relatedJobs = await getRelatedJobs(job);
  const schema = mapJobToSchema(job);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <JobClient 
        job={job} 
        relatedJobs={relatedJobs} 
        companies={companies} 
      />
    </>
  );
}