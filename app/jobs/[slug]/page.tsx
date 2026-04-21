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

  const { data } = await supabase
    .from('jobs')
    .select('id, title, company, location, category, slug, status, deadline, created_at')
    .eq('category', currentJob.category)
    .neq('id', currentJob.id)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(10);

  return data || [];
});

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await getJob(params.slug);
  if (!job) return { title: 'Job Not Found' };

  const companyName = typeof job.company === 'string' ? job.company : job.company?.name || 'Company';
  const titleCore = `${job.title} at ${companyName}`;
  const description = job.description?.replace(/<[^>]*>/g, '').slice(0, 160) || '';
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