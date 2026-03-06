import JobList from '@/components/jobs/JobList';
import { Metadata } from 'next';
import { BreadcrumbListSchema } from '@/components/seo/StructuredData';

export const revalidate = 1800;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jobmeter.app';

export const metadata: Metadata = {
  title: 'Jobs in UAE - Find Employment Opportunities | JobMeter',
  description: 'Browse latest job openings in UAE. Find full-time, part-time, and remote jobs across all industries. Apply to top UAE companies today.',
  alternates: {
    canonical: `${siteUrl}/jobs/uae`,
    languages: {
      'en-AE': `${siteUrl}/jobs/uae`,
      'en': `${siteUrl}/jobs/uae`,
    },
  },
};

export default function UAEJobsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Jobs', url: `${siteUrl}/jobs` },
    { name: 'UAE', url: `${siteUrl}/jobs/uae` },
  ];

  return (
    <>
      <BreadcrumbListSchema items={breadcrumbItems} />
      <div>
        <JobList initialCountry="United Arab Emirates" />
      </div>
    </>
  );
}
