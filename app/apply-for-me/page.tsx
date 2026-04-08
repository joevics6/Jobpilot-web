'use client';

import { useState } from 'react';
import { Check, MessageCircle, Shield, ChevronDown, ArrowRight, FileText, Send, BarChart2, Mail, CreditCard } from 'lucide-react';
import AuthModal from '@/components/AuthModal';   // Adjust this path if your AuthModal is located elsewhere

export default function ApplyForMePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleWhatsAppClick = () => {
    const whatsappNumber = '2347056928186';
    const message = encodeURIComponent(
      "Hi! I'd like to get started with Apply for Me. My JobMeter profile email is:"
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const steps = [
    {
      icon: <FileText className="w-6 h-6" />,
      number: "01",
      title: "Register on JobMeter.app",
      desc: "Create your free account. Upload your CV and set your job preferences, target roles, location, and salary expectations. That profile is all we need."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      number: "02",
      title: "Message Us on WhatsApp",
      desc: "Send us your JobMeter profile email. We confirm your preferences and send our bank details for payment. Share your proof of payment to activate your subscription."
    },
    {
      icon: <Mail className="w-6 h-6" />,
      number: "03",
      title: "Create a Dedicated Gmail",
      desc: "Create a fresh Gmail account for your applications and share the email and password with us. This inbox is how you track every interview invite and employer reply in real time."
    },
    {
      icon: <Send className="w-6 h-6" />,
      number: "04",
      title: "We Apply. Every Month.",
      desc: "We source 10–15 matched roles from JobMeter's database, write tailored cover letters, and submit every application — while you focus on your current job."
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      number: "05",
      title: "You Prepare. We Report.",
      desc: "Use our interview prep tools and aptitude quizzes while we keep applying. At month-end, you get a full report of every job we applied to on your behalf."
    }
  ];

  const included = [
    "10–15 curated job applications per month",
    "Professional CV written from scratch",
    "Tailored cover letter per application",
    "Dedicated Gmail inbox to track interview invites",
    "Access to interview preparation tools",
    "Access to aptitude test practice quizzes",
    "Monthly report of all applications submitted",
    "Extra month free if you get zero interview invites",
  ];

  const faqs = [
    {
      q: "How do I get started?",
      a: "Register on JobMeter.app and complete your profile. Then send us a WhatsApp message with your JobMeter profile email. We'll send our bank details, and once we confirm your payment, you're in — first applications go out within 48 hours."
    },
    {
      q: "How does the Gmail work?",
      a: "You create a fresh Gmail account specifically for your job applications, then share the email address and password with us. We use it to apply on your behalf. You can log in anytime to see interview invites and employer replies directly."
    },
    {
      q: "How do I pay?",
      a: "We send our bank account details on WhatsApp. You make a transfer and send us a screenshot as proof of payment. We activate your subscription immediately after confirmation."
    },
    {
      q: "Is this available outside Nigeria?",
      a: "Currently, Apply for Me is available to Nigerian job seekers only. We focus on Nigerian and select remote roles sourced through JobMeter."
    },
    {
      q: "What kind of jobs will you apply to?",
      a: "Roles matched to the preferences you set on JobMeter — industry, location, salary range, job type. You can also flag specific companies or roles to exclude."
    },
    {
      q: "Will the CV actually be mine?",
      a: "Yes. It's written entirely from your real background using your JobMeter profile and any CV you upload. You receive a copy."
    },
    {
      q: "What if I already have a CV?",
      a: "Upload it to your JobMeter profile. We'll refine and rewrite it for better results — better formatting, stronger language, ATS-optimised."
    },
    {
      q: "What happens when I get an interview?",
      a: "You show up. That's your job — and it's where our prep tools come in. We keep applying in the background throughout the month."
    },
    {
      q: "Why only 100 people?",
      a: "We apply carefully, not in bulk. Capping at 100 subscribers ensures every application gets real attention — not a copy-paste job."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        .hero-grid {
          background-image: 
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .pill-badge {
          background: linear-gradient(135deg, rgba(251,191,36,0.18), rgba(251,191,36,0.08));
          border: 1px solid rgba(251,191,36,0.4);
        }

        .amber-glow {
          box-shadow: 0 0 60px rgba(251,191,36,0.15), 0 0 120px rgba(251,191,36,0.08);
        }

        .step-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          transition: all 0.4s ease;
        }
        .step-card:hover {
          border-color: rgba(251,191,36,0.5);
          box-shadow: 0 8px 32px rgba(251,191,36,0.12);
          transform: translateY(-4px);
        }

        .include-row {
          border-bottom: 1px solid #f3f4f6;
          transition: background 0.2s;
        }
        .include-row:hover {
          background: rgba(251,191,36,0.05);
        }
        .include-row:last-child {
          border-bottom: none;
        }

        .faq-item {
          border-bottom: 1px solid #f3f4f6;
        }
        .faq-item:last-child {
          border-bottom: none;
        }

        .cta-button {
          background: #111827;
          color: #ffffff;
          transition: all 0.25s ease;
          box-shadow: 0 8px 32px rgba(17,24,39,0.2);
        }
        .cta-button:hover {
          background: #1f2937;
          transform: translateY(-2px);
          box-shadow: 0 16px 48px rgba(17,24,39,0.28);
        }
        .cta-button:active {
          transform: translateY(0);
        }

        .ghost-button {
          border: 1px solid #d1d5db;
          color: #374151;
          transition: all 0.25s ease;
        }
        .ghost-button:hover {
          border-color: rgba(251,191,36,0.6);
          background: rgba(251,191,36,0.06);
        }

        .serif { font-family: 'Playfair Display', serif; }

        .spot-counter {
          background: linear-gradient(135deg, #fff5f5, #fff8f8);
          border: 1px solid rgba(239,68,68,0.2);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.35s; opacity: 0; }
        .delay-4 { animation-delay: 0.5s; opacity: 0; }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative hero-grid bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-300/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="pill-badge inline-flex items-center gap-2 px-5 py-2 rounded-full text-amber-600 text-sm font-medium mb-8 fade-up">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            Apply for Me — by JobMeter &nbsp;·&nbsp; 🇳🇬 Nigeria Only
          </div>

          <h1 className="fade-up delay-1 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-gray-900">
            Too Busy to Apply?<br />
            <span className="serif italic font-normal text-amber-500">We'll Do It for You.</span>
          </h1>

          <p className="fade-up delay-2 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Every month, we source matched jobs, write your CV, craft tailored cover letters, and submit 10–15 applications on your behalf — while you focus on everything else.
          </p>

          <div className="fade-up delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button 
              onClick={handleWhatsAppClick} 
              className="cta-button font-semibold text-base py-4 px-8 rounded-2xl flex items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Get Started — ₦5,000/month
            </button>

            {/* New Register Button - Same line, same height */}
            <button 
              onClick={() => setShowAuthModal(true)}
              className="ghost-button text-gray-600 text-base py-4 px-8 rounded-2xl flex items-center gap-2"
            >
              Register on JobMeter <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="fade-up delay-4 text-sm text-gray-400 tracking-wide">
            Setup in under 24 hours &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; Only 100 spots/month
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 text-xs tracking-widest">
          SCROLL
          <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="px-6 py-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-4">Sound familiar?</p>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-gray-900">
                You're not lazy.<br />
                <span className="text-gray-400 font-normal">You're just overwhelmed.</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Between work, family, and daily life, job hunting always falls to the bottom of the list. By the time you sit down to apply, the deadline's already closed.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { emoji: "🕐", text: "You saw a great role on Monday. It's Friday. You still haven't applied." },
                { emoji: "📅", text: "You finally found the perfect job. Posted 3 weeks ago. Already closed." },
                { emoji: "📄", text: "You've been meaning to update your CV for months. It never gets done." },
                { emoji: "💼", text: "You're not unemployed — you're just too busy to find something better." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.emoji}</span>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="px-6 py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-4">The process</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">How It Works</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="step-card rounded-3xl p-7 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
                    {s.icon}
                  </div>
                  <span className="text-5xl font-bold text-gray-100 leading-none">{s.number}</span>
                </div>
                <h3 className="font-semibold text-lg mb-3 leading-snug text-gray-900">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="px-6 py-24 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-4">Everything included</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">One Price. No Surprises.</h2>
          </div>

          <div className="rounded-3xl border border-gray-200 overflow-hidden mb-10 shadow-sm">
            {included.map((item, i) => (
              <div key={i} className="include-row flex items-center gap-4 px-7 py-5">
                <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-amber-600" />
                </div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="amber-glow bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-10 text-center">
            <p className="text-amber-600 text-sm font-medium tracking-widest uppercase mb-2">Monthly subscription</p>
            <div className="text-7xl font-bold tracking-tighter mb-1 text-gray-900">₦5,000</div>
            <p className="text-gray-400 text-lg mb-4">per month &nbsp;·&nbsp; cancel anytime</p>
            <p className="text-gray-500 text-sm mb-8">
              We'll send our bank details on WhatsApp. Make the transfer and send proof of payment to activate your subscription.
            </p>
            <button onClick={handleWhatsAppClick} className="cta-button font-semibold py-4 px-10 rounded-2xl inline-flex items-center gap-3 text-base">
              <MessageCircle className="w-5 h-5" />
              Secure Your Spot on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE + LIMIT ── */}
      <section className="px-6 py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
            <Shield className="w-10 h-10 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Guarantee</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              If you complete your first full month with us and don't receive a single interview invite, we give you a second month completely free. No questions. No arguments.
            </p>
            <p className="text-gray-400 text-sm mt-6">
              We apply strategically — every role matched to your profile, every application treated like it matters.
            </p>
          </div>

          <div className="spot-counter rounded-3xl p-10">
            <div className="text-4xl mb-6">⚠️</div>
            <h3 className="text-2xl font-semibold mb-4 text-red-500">Only 100 Spots Per Month</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              We launched this after a successful trial and the results were clear. We're opening it up — but capping at 100 subscribers to protect the quality of every application.
            </p>
            <p className="text-gray-400 text-sm mt-6">
              Once 100 spots are filled, registration closes until the following month.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOR / NOT FOR ── */}
      <section className="px-6 py-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Is This for You?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-10">
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-8">✓ &nbsp;This is for you if</p>
              <ul className="space-y-5">
                {[
                  "You're a working Nigerian professional who wants a better job but can't find time to apply",
                  "You keep finding great roles after the deadline has already passed",
                  "You procrastinate on applications and know it's costing you opportunities",
                  "You've been sending the same CV everywhere with no results",
                ].map((t, i) => (
                  <li key={i} className="flex gap-4 text-gray-700 leading-relaxed">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-red-100 bg-red-50/50 p-10">
              <p className="text-red-500 font-semibold text-sm uppercase tracking-widest mb-8">✕ &nbsp;This is not for you if</p>
              <ul className="space-y-5">
                {[
                  "You want hundreds of untargeted, bulk applications",
                  "You expect a guaranteed job offer — no one can promise that",
                  "You won't show up or prepare when interview invites come in",
                ].map((t, i) => (
                  <li key={i} className="flex gap-4 text-gray-700 leading-relaxed">
                    <span className="text-red-400 text-lg leading-none flex-shrink-0 mt-0.5">×</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-4">Questions</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">FAQ</h2>
          </div>

          <div className="rounded-3xl border border-gray-200 overflow-hidden bg-white shadow-sm">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-8 py-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-7">
                    <p className="text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-32 bg-gray-900 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-6">Don't wait another month</p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-white">
            The Jobs Won't<br />
            <span className="serif italic font-normal text-white/40">Wait for You.</span>
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed mb-12 max-w-xl mx-auto">
            Register on JobMeter.app, then message us on WhatsApp. We send our payment details, you confirm, and first applications go out within 48 hours.
          </p>

          <button onClick={handleWhatsAppClick} className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold py-5 px-12 rounded-2xl inline-flex items-center gap-3 text-lg mb-6 transition-all shadow-2xl">
            <MessageCircle className="w-6 h-6" />
            Start with Apply for Me
          </button>

          <p className="text-gray-600 text-sm">
            Currently available for Nigerian job seekers only. No guarantees of employment. We guarantee consistent, high-quality effort — and one free extra month if needed.
          </p>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
    </div>
  );
}