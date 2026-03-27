import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ObjectiveQuizClient from './ObjectiveQuizClient';
import AdUnit from '@/components/ads/AdUnit';
import { COMPANIES, companyToSlug, slugToCompany } from '@/lib/quizCompanies';

export const revalidate = false;

export async function generateStaticParams() {
  return COMPANIES.map((company) => ({
    company: companyToSlug(company),
  }));
}

interface Props {
  params: Promise<{ company: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company: companySlug } = await params;
  const company = slugToCompany(companySlug);
  if (!company) return {};
  const firstName = company.split(' ')[0];

  return {
    title: `${company} Objective Questions Quiz | Practice Online`,
    description: `Free ${company} objective aptitude test questions. Multiple choice quiz with ${firstName} recruitment test practice.`,
    keywords: [`${firstName} objective questions`, `${firstName} aptitude test`, 'multiple choice quiz'],
  };
}

export default async function ObjectiveQuizPage({ params }: Props) {
  const { company: companySlug } = await params;
  const company = slugToCompany(companySlug);

  if (!company) notFound();

  return (
    <>
      {/* Removed top AdUnit */}

      <ObjectiveQuizClient company={company} />

      {/* Keep bottom ad */}
      <AdUnit slot="9751041788" format="auto" />

      {/* Mobile anchor (unchanged) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-100" style={{ height: '50px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50px', overflow: 'hidden' }}>
          <AdUnit
            slot="3349195672"
            format="auto"
            style={{ display: 'block', width: '100%', height: '50px', maxHeight: '50px', overflow: 'hidden' }}
          />
        </div>
      </div>
    </>
  );
}