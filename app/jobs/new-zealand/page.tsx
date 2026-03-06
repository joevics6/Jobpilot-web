import JobList from '@/components/jobs/JobList';
import { Metadata } from 'next';
import { BreadcrumbListSchema } from '@/components/seo/StructuredData';

export const revalidate = 1800;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jobmeter.app';

export const metadata: Metadata = {
  title: 'Jobs in New Zealand - Find Employment Opportunities | JobMeter',
  description: 'Browse latest job openings in New Zealand. Find full-time, part-time, and remote jobs across all industries. Apply to top New Zealand companies today.',
  alternates: {
    canonical: `${siteUrl}/jobs/new-zealand`,
    languages: {
      'en-NZ': `${siteUrl}/jobs/new-zealand`,
      'en': `${siteUrl}/jobs/new-zealand`,
    },
  },
};

export default function NewZealandJobsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Jobs', url: `${siteUrl}/jobs` },
    { name: 'New Zealand', url: `${siteUrl}/jobs/new-zealand` },
  ];

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <div>
        <JobList initialCountry="New Zealand" />
      </div>
    </>
  );
}
