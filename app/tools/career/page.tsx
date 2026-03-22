import React from 'react';
import CareerClient from './CareerClient';

export const revalidate = false;

export const metadata = {
  title: 'Career Coach AI — Free AI-Powered Career Coaching App',
  description: 'Free AI-powered career coaching app. Get personalized career path recommendations, skill gap analysis, and market insights to advance your career globally.',
};

const softwareSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Career Coach AI',
  description: 'Free AI-powered career coaching app. Get personalized career path recommendations, skill gap analysis, and market insights to advance your career globally.',
  url: 'https://jobmeter.com/tools/career',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Personalized Career Path Recommendations', 'Skill Gap Analysis', 'Real-Time Market Insights', 'Progress Tracking', 'Resume Analytics'],
  provider: { '@type': 'Organization', name: 'JobMeter' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '1200' },
});

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What exactly does a career coach do?', acceptedAnswer: { '@type': 'Answer', text: 'A career coach helps professionals navigate career growth through goal-setting, resume optimization, interview prep, and strategic career planning. AI career coaches automate this with data-driven profile analysis and personalized recommendations.' } },
    { '@type': 'Question', name: 'Can ChatGPT give career advice?', acceptedAnswer: { '@type': 'Answer', text: 'ChatGPT can respond to career-related prompts but lacks persistent memory, real-time job market data, and structured progress tracking. Dedicated AI career coach platforms offer more accurate, personalized, and actionable guidance.' } },
    { '@type': 'Question', name: 'How much is a 30-minute life coaching session?', acceptedAnswer: { '@type': 'Answer', text: 'A 30-minute career coaching session typically costs $50-$200 globally, averaging around $125 in North America. AI-powered alternatives like Career Coach AI offer core features for free.' } },
    { '@type': 'Question', name: 'What are the 7 qualities of an effective coach?', acceptedAnswer: { '@type': 'Answer', text: 'The seven qualities are: empathy, deep expertise, clarity, accountability, adaptability, inspiration, and results-orientation. The best career coaches and AI coaching tools embody all seven.' } },
  ],
});

const comparisonRows: [string, string, string, string][] = [
  ['Cost', 'Free core; premium $9/mo', '$50-$200/session', 'Free but generic'],
  ['Speed', 'Instant analysis', 'Scheduled sessions', 'Prompt-dependent'],
  ['Personalization', 'Profile-based AI', 'Human intuition', 'One-off responses'],
  ['Skill Gap Tracking', 'Detailed roadmap', 'Vague suggestions', 'No tracking'],
  ['Market Data', 'Real-time insights', "Coach's knowledge", 'Knowledge cutoff'],
  ['Availability', 'Web/app, global 24/7', 'Location & time bound', 'Global, no structure'],
];

const benefits = [
  { title: 'Tailored Career Paths', body: 'Our system recommends specific roles based on your exact background and rising market demand—not cookie-cutter templates.' },
  { title: 'Precision Skill Gap Analysis', body: 'Identify exactly which skills are holding you back with hyper-specific tips: curated courses, project ideas, and timelines.' },
  { title: 'Global Accessibility', body: "Whether you're in Lagos, Berlin, or Toronto, Career Coach AI delivers the same quality guidance instantly—no geography, no waitlist." },
  { title: 'Free to Start', body: 'The career coach AI free tier includes full profile analysis and career path recommendations. Upgrade only when you need advanced features.' },
  { title: 'Always Up-to-Date', body: 'Our Career Coach software continuously updates recommendations based on current hiring trends and in-demand skills.' },
  { title: 'Persistent Login & Continuity', body: "Complete your profile once and return anytime via Career Coach AI login. Your analysis evolves with you—unlike one-off AI prompts." },
];

const faqs = [
  { q: 'Is Career Coach AI really free?', a: 'Yes. Core features—profile analysis, career path recommendations, and skill gap identification—are free forever. Premium unlocks deeper analytics.' },
  { q: 'How accurate is the AI career coach?', a: 'Our system achieves a 90%+ match rate to real-world job outcomes, based on aggregated user data and continuously updated market trend analysis.' },
  { q: 'Can I use it to prepare for career coach certification?', a: 'Absolutely. The tool identifies coaching skill gaps and suggests ICF-aligned courses and practice frameworks.' },
  { q: "What if I'm switching careers mid-life?", a: 'Career Coach AI is ideal for mid-career transitions. It analyzes your transferable skills and maps them to new fields, including roles you may not have considered.' },
  { q: 'Does it work for creative and non-traditional fields?', a: 'Yes. The system covers 50+ industries globally—including design, media, education, healthcare, and freelancing.' },
  { q: 'How is this better than searching "career coach near me"?', a: 'Local career coaches are constrained by geography and hourly rates. Career Coach AI is available 24/7, globally, at no cost for core features.' },
  { q: 'Is Career Coach AI different from Career Coach GPT?', a: "Yes. Career Coach GPT-style prompts offer one-off text responses. Our platform stores your profile, tracks progress over time, and updates recommendations as the market evolves." },
  { q: 'How do I log in or reset my access?', a: 'Use your email to sign in or reset credentials. Google and Apple sign-in are also supported for seamless Career Coach AI login.' },
];

export default function CareerPage() {
  return (
    <>
      <CareerClient />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-t border-gray-200 pt-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Coach AI: Your Personalized Path to Professional Success</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">Discover the best AI career coach that analyzes your skills, experience, and goals to deliver tailored career path recommendations, skill gap analysis, and development tips—all for free. Our career coach website makes professional guidance accessible to professionals worldwide.</p>
            <p className="text-gray-700 leading-relaxed">Career Coach AI leverages advanced algorithms similar to Career Coach GPT to scan your profile and suggest optimal career trajectories. Unlike traditional career coaching online sessions costing $100–$200 per hour, this AI career coach app provides instant, data-driven advice without appointments—available 24/7, globally.</p>
          </div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What Exactly Does a Career Coach Do?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">A career coach guides individuals through professional growth—from resume optimization and interview preparation to long-term career strategy. They assess your strengths, identify blind spots, set measurable goals, and provide accountability. Sessions typically cover role transitions, salary negotiation, leadership development, and navigating workplace challenges.</p>
            <p className="text-gray-700 leading-relaxed mb-4">Our AI career coach app replicates this experience algorithmically. It dissects your profile against global benchmarks, flags technical and leadership gaps, and surfaces exact next steps—whether you are in Lagos, London, or Los Angeles.</p>
            <p className="text-gray-700 leading-relaxed">Beyond guidance, career coaches answer the question professionals struggle with alone: <em>&quot;Am I on the right track, and if not, what do I do next?&quot;</em></p>
          </div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Can ChatGPT Give Career Advice?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Yes—ChatGPT can respond to an AI career coach prompt with useful general guidance. Ask it to review your resume for a tech role and you will get a reasonable answer. However, ChatGPT has no memory of your profile between sessions, no access to real-time job market data, and no structured development tracking.</p>
            <p className="text-gray-700 leading-relaxed">Career Coach AI goes further: it stores your profile securely, cross-references your data against live market trends, and delivers a structured roadmap rather than a one-off text response. Users consistently report better outcomes compared to open-ended Career Coach GPT prompts.</p>
          </div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The 7 Qualities of an Effective Career Coach</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Whether working with career coaches near you or using an AI career coach app, the best coaching experiences share seven core qualities:</p>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-4">
              <li><strong>Empathy</strong> — Understanding your unique background and ambitions without judgment.</li>
              <li><strong>Deep Expertise</strong> — Real knowledge of hiring trends, role requirements, and career ladders.</li>
              <li><strong>Clarity</strong> — Breaking complex career decisions into simple, actionable steps.</li>
              <li><strong>Accountability</strong> — Tracking your progress and holding you to commitments.</li>
              <li><strong>Adaptability</strong> — Pivoting recommendations as the market or your goals evolve.</li>
              <li><strong>Inspiration</strong> — Motivating you to take action, not just provide information.</li>
              <li><strong>Results-Orientation</strong> — Measuring success by real outcomes: offers received, promotions earned.</li>
            </ol>
            <p className="text-gray-700 leading-relaxed">Career Coach AI is engineered to deliver all seven—with unbiased, data-driven analysis and market-responsive recommendations.</p>
          </div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How Much Does Career Coaching Cost?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">A traditional 30-minute career coaching session costs between $50 and $200 globally, averaging around $125 in North America and Europe. Experienced executive coaches often charge $250–$500 per hour. Career coaching services in emerging markets typically range from $30–$80 per session.</p>
            <p className="text-gray-700 leading-relaxed mb-4">Career coach certification programs accredited by the ICF command premium pricing—typically requiring 60–125 training hours plus 100+ practice coaching hours.</p>
            <p className="text-gray-700 leading-relaxed">Career Coach AI offers its core features—full profile analysis, personalized career path recommendations, and skill gap identification—completely free. Premium tiers unlock advanced analytics at a fraction of the cost of a single human coaching session.</p>
          </div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Become a Career Coach</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Aspiring career coaches typically build 3–5 years of professional experience in a specific niche, complete a formal coach training program accredited by the ICF, accumulate 100+ supervised practice coaching hours, and build a client base through LinkedIn or career coaching online platforms.</p>
            <p className="text-gray-700 leading-relaxed mb-4">Career coach certification signals credibility. The ICF offers three levels—ACC, PCC, and MCC—each requiring progressively more training hours. Niche specialization makes it easier to stand out in a crowded market.</p>
            <p className="text-gray-700 leading-relaxed">AI career coach software accelerates the process for both coaches (sharpening assessment frameworks) and clients (arriving at sessions with greater clarity about gaps and goals).</p>
          </div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Coach AI vs. Traditional Coaching vs. ChatGPT</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    {['Feature', 'Career Coach AI', 'Traditional Coach', 'ChatGPT'].map(h => (<th key={h} className="text-left px-4 py-3 font-semibold text-gray-900">{h}</th>))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparisonRows.map(([feature, ai, human, gpt]) => (
                    <tr key={feature} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{feature}</td>
                      <td className="px-4 py-3 text-green-700">{ai}</td>
                      <td className="px-4 py-3 text-gray-600">{human}</td>
                      <td className="px-4 py-3 text-gray-600">{gpt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Use an AI Career Coach?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map(({ title, body }) => (
                <div key={title} className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              {faqs.map(({ q, a }) => (
                <div key={q} className="border-b border-gray-100 pb-5">
                  <h4 className="font-semibold text-gray-900 mb-2">{q}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-t border-gray-200 pt-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'CV Keyword Checker', description: 'Check keyword match between your CV and job descriptions', color: '#10B981', route: '/tools/keyword-checker' },
              { title: 'ATS CV Review', description: 'Optimize your CV for ATS systems before applying', color: '#8B5CF6', route: '/tools/ats-review' },
              { title: 'Role Finder', description: 'Discover new career paths based on your skills', color: '#06B6D4', route: '/tools/role-finder' },
              { title: 'Job Scam Detector', description: 'AI-powered analysis to detect fraudulent job postings', color: '#EF4444', route: '/tools/scam-detector' },
            ].map(tool => (
              <a key={tool.title} href={tool.route} className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: tool.color + '1A' }}>
                  <span className="text-lg font-bold" style={{ color: tool.color }}>&#8594;</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{tool.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{tool.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: softwareSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    </>
  );
}
