import JobList from '@/components/jobs/JobList';
import { Metadata } from 'next';
import { BreadcrumbListSchema } from '@/components/seo/StructuredData';

export const revalidate = 1800;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jobmeter.app';

export const metadata: Metadata = {
  title: 'Jobs in Canada - Find Employment Opportunities | JobMeter',
  description: 'Browse latest job openings in Canada. Find full-time, part-time, and remote jobs across all industries. Apply to top Canadian companies today.',
  alternates: {
    canonical: `${siteUrl}/jobs/canada`,
    languages: {
      'en-CA': `${siteUrl}/jobs/canada`,
      'en': `${siteUrl}/jobs/canada`,
    },
  },
};

export default function CanadaJobsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Jobs', url: `${siteUrl}/jobs` },
    { name: 'Canada', url: `${siteUrl}/jobs/canada` },
  ];

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <div>
        <JobList initialCountry="Canada" />
      </div>
    </>
  );
}
