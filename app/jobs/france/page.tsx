import JobList from '@/components/jobs/JobList';
import { Metadata } from 'next';
import { BreadcrumbListSchema } from '@/components/seo/StructuredData';

export const revalidate = 1800;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jobmeter.app';

export const metadata: Metadata = {
  title: 'Jobs in France - Find Employment Opportunities | JobMeter',
  description: 'Browse latest job openings in France. Find full-time, part-time, and remote jobs across all industries. Apply to top French companies today.',
  alternates: {
    canonical: `${siteUrl}/jobs/france`,
    languages: {
      'fr': `${siteUrl}/jobs/france`,
      'en': `${siteUrl}/jobs/france`,
    },
  },
};

export default function FranceJobsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Jobs', url: `${siteUrl}/jobs` },
    { name: 'France', url: `${siteUrl}/jobs/france` },
  ];

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <div>
        <JobList initialCountry="France" />
      </div>
    </>
  );
}
