import JobList from '@/components/jobs/JobList';
import { Metadata } from 'next';

export const revalidate = false;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jobmeter.app';

export const metadata: Metadata = {
  title: 'Find Jobs Near You — Search & Apply for Open Positions | JobMeter',
  description: 'Search thousands of jobs from verified employers across Nigeria, UK, US, Canada, UAE and more. Filter by location, role, salary and experience level. Updated daily.',
  keywords: ['find jobs', 'job search', 'job listings', 'vacancies', 'employment', 'hiring', 'career opportunities', 'job board'],
  openGraph: {
    title: 'Find Jobs Near You | JobMeter',
    description: 'Search thousands of jobs from verified employers. Free job search tool.',
    type: 'website',
    url: `${siteUrl}/jobs`,
    siteName: 'JobMeter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Jobs Near You | JobMeter',
    description: 'Search thousands of jobs from verified employers. Free job search tool.',
  },
  alternates: {
    canonical: `${siteUrl}/jobs`,
  },
};

export default function JobsPage() {
  return <JobList />;
}
