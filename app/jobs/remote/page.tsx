import JobList from '@/components/jobs/JobList';
import { Metadata } from 'next';
import { BreadcrumbListSchema } from '@/components/seo/StructuredData';

export const revalidate = false;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jobmeter.app';

export const metadata: Metadata = {
  title: 'Remote Jobs - Work From Anywhere | JobMeter',
  description: 'Browse the latest remote job opportunities. Find full-time, part-time, and contract remote jobs across all industries. Apply to top companies hiring remotely today.',
  alternates: {
    canonical: `${siteUrl}/jobs/remote`,
  },
};

export default function RemoteJobsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Jobs', url: `${siteUrl}/jobs` },
    { name: 'Remote', url: `${siteUrl}/jobs/remote` },
  ];

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <div>
        <JobList initialJobType="Remote" />
      </div>
    </>
  );
}
