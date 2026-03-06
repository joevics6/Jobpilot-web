import JobList from '@/components/jobs/JobList';
import { Metadata } from 'next';
import { BreadcrumbListSchema } from '@/components/seo/StructuredData';

export const revalidate = 1800;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jobmeter.app';

export const metadata: Metadata = {
  title: 'Jobs in United Kingdom - Find Employment Opportunities | JobMeter',
  description: 'Browse latest job openings in the United Kingdom. Find full-time, part-time, and remote jobs across all industries. Apply to top UK companies today.',
  alternates: {
    canonical: `${siteUrl}/jobs/united-kingdom`,
    languages: {
      'en-GB': `${siteUrl}/jobs/united-kingdom`,
      'en': `${siteUrl}/jobs/united-kingdom`,
    },
  },
};

export default function UKJobsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Jobs', url: `${siteUrl}/jobs` },
    { name: 'United Kingdom', url: `${siteUrl}/jobs/united-kingdom` },
  ];

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <div>
        <JobList initialCountry="United Kingdom" />
      </div>
    </>
  );
}
