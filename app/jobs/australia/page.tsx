import JobList from '@/components/jobs/JobList';
import { Metadata } from 'next';
import { BreadcrumbListSchema } from '@/components/seo/StructuredData';

export const revalidate = 1800;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jobmeter.app';

export const metadata: Metadata = {
  title: 'Jobs in Australia - Find Employment Opportunities | JobMeter',
  description: 'Browse latest job openings in Australia. Find full-time, part-time, and remote jobs across all industries. Apply to top Australian companies today.',
  alternates: {
    canonical: `${siteUrl}/jobs/australia`,
    languages: {
      'en-AU': `${siteUrl}/jobs/australia`,
      'en': `${siteUrl}/jobs/australia`,
    },
  },
};

export default function AustraliaJobsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Jobs', url: `${siteUrl}/jobs` },
    { name: 'Australia', url: `${siteUrl}/jobs/australia` },
  ];

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <div>
        <JobList initialCountry="Australia" />
      </div>
    </>
  );
}
