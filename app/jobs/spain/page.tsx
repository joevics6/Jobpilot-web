import JobList from '@/components/jobs/JobList';
import { Metadata } from 'next';
import { BreadcrumbListSchema } from '@/components/seo/StructuredData';

export const revalidate = 1800;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jobmeter.app';

export const metadata: Metadata = {
  title: 'Jobs in Spain - Find Employment Opportunities | JobMeter',
  description: 'Browse latest job openings in Spain. Find full-time, part-time, and remote jobs across all industries. Apply to top Spanish companies today.',
  alternates: {
    canonical: `${siteUrl}/jobs/spain`,
    languages: {
      'es': `${siteUrl}/jobs/spain`,
      'en': `${siteUrl}/jobs/spain`,
    },
  },
};

export default function SpainJobsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Jobs', url: `${siteUrl}/jobs` },
    { name: 'Spain', url: `${siteUrl}/jobs/spain` },
  ];

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <div>
        <JobList initialCountry="Spain" />
      </div>
    </>
  );
}
