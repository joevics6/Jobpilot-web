import JobList from '@/components/jobs/JobList';
import { Metadata } from 'next';
import { BreadcrumbListSchema } from '@/components/seo/StructuredData';

export const revalidate = 1800;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jobmeter.app';

export const metadata: Metadata = {
  title: 'Jobs in USA - Find Employment Opportunities | JobMeter',
  description: 'Browse latest job openings in the United States. Find full-time, part-time, and remote jobs across all industries. Apply to top US companies today.',
  alternates: {
    canonical: `${siteUrl}/jobs/usa`,
    languages: {
      'en-US': `${siteUrl}/jobs/usa`,
      'en': `${siteUrl}/jobs/usa`,
    },
  },
};

export default function USAJobsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Jobs', url: `${siteUrl}/jobs` },
    { name: 'USA', url: `${siteUrl}/jobs/usa` },
  ];

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <div>
        <JobList initialCountry="United States" />
      </div>
    </>
  );
}
