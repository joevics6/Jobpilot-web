import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import JobClient from '@/app/jobs/[slug]/JobClient';
import { Metadata } from 'next';

export const revalidate = 3600;

const REMOTE_CATEGORIES: Record<string, { name: string }> = {
  'marketing': { name: 'Marketing' },
  'graphic-design': { name: 'Graphic Design' },
  'business-analyst': { name: 'Business Analyst' },
  'administrative-assistant': { name: 'Administrative Assistant' },
  'healthcare': { name: 'Healthcare' },
  'copywriting': { name: 'Copywriting' },
  'video-editing': { name: 'Video Editing' },
  'ai-prompt-engineering': { name: 'AI Prompt Engineering' },
  'software-development': { name: 'Software Development' },
  'customer-service': { name: 'Customer Service' },
  'data-entry': { name: 'Data Entry' },
  'virtual-assistant': { name: 'Virtual Assistant' },
};

export async function generateMetadata({ params }: { params: { category: string; slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { slug, category } = params;
  
  const { data: job } = await supabase
    .from('jobs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!job) {
    return { title: 'Job Not Found - JobMeter' };
  }

  const companyName = typeof job.company === 'string' ? job.company : (job.company?.name || 'Company');
  const categoryName = REMOTE_CATEGORIES[category]?.name || category;

  return {
    title: `${job.title} at ${companyName} - Remote ${categoryName} Jobs`,
    description: job.description?.substring(0, 160),
    alternates: {
      canonical: `https://www.jobmeter.app/jobs/remote/${category}/${slug}`,
    },
  };
}

export default async function RemoteCategoryJobPage({ params }: { params: { category: string; slug: string } }) {
  const supabase = createClient();
  const { slug } = params;
  
  const { data: job } = await supabase
    .from('jobs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!job) {
    notFound();
  }

  return <JobClient job={job} />;
}
