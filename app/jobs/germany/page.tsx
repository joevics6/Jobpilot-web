import JobList from '@/components/jobs/JobList';
import { Metadata } from 'next';
import { BreadcrumbListSchema } from '@/components/seo/StructuredData';

export const revalidate = 1800;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jobmeter.app';

export const metadata: Metadata = {
  title: 'Jobs in Germany - Find Employment Opportunities | JobMeter',
  description: 'Browse latest job openings in Germany. Find full-time, part-time, and remote jobs across all industries. Apply to top German companies today.',
  alternates: {
    canonical: `${siteUrl}/jobs/germany`,
    languages: {
      'de': `${siteUrl}/jobs/germany`,
      'en': `${siteUrl}/jobs/germany`,
    },
  },
};

export default function GermanyJobsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Jobs', url: `${siteUrl}/jobs` },
    { name: 'Germany', url: `${siteUrl}/jobs/germany` },
  ];

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <div>
        <JobList initialCountry="Germany" />
      </div>
    </>
  );
}
