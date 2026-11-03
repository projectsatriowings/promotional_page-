import React, { useState } from 'react';
import { ShieldCheck, FileText, Clock, Award, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface ParentTrustSectionProps {
  onOpenEnquiry: () => void;
}

export const ParentTrustSection: React.FC<ParentTrustSectionProps> = ({ onOpenEnquiry }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const PARENT_POINTS = [
    {
      title: 'Weekly Parent Learning Digests',
      description: 'Receive structured summaries detailing the computational concepts covered, completed student projects, and prompts for discussions at home.',
      icon: 'FileText'
    },
    {
      title: 'Minor-Safe Sandboxed AI Tools',
      description: 'All exercises run inside protected, commercial-free student sandboxes with strict safety guardrails and zero external open chatting.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Balanced Screen-Time Methodology',
      description: 'Digital tools are balanced with offline logic card challenges, physical sketching, and collaborative design-thinking discussions.',
      icon: 'Clock'
    },
    {
      title: 'Academic Partnership Excellence',
      description: 'Delivered in proud collaboration with Jaighurudeva Educational Academy, upholding pedagogical integrity and holistic mentorship.',
      icon: 'Award'
    }
  ];

  const FAQS = [
    {
      q: 'Does my child need prior programming experience to enroll?',
      a: 'No prior coding experience is needed for Early Explorers (Grades 1–6) or AI Innovators (Grades 7–8). We start with visual models, pattern logic, and guided prompt engineering. For Grades 9–10 and 11–12, foundational curiosity and basic typing skills are sufficient; our mentors guide students through Python step by step.'
    },
    {
      q: 'What are the official program fees and inclusions?',
      a: 'Official course fees are calibrated by developmental grade: Grades 1–6 (₹8,000), Grades 7–8 (₹10,000), Grades 9–10 (₹12,000), and Grades 11–12 (₹15,000). Fees include all student sandbox access, interactive workbooks, project reviews, and completion certificates.'
    },
    {
      q: 'Where are DigitalGhuru AI for Kids classes conducted?',
      a: 'We offer both hybrid studio labs at our physical campuses (Anna Nagar and Korattur in Chennai, and Ameerpet in Hyderabad) as well as live interactive cohorts online with dedicated mentor support.'
    },
    {
      q: 'How does DigitalGhuru protect my child’s safety online?',
      a: 'Safety is central to our curriculum. We train kids on data privacy, ethical boundaries, avoiding personal information leaks, and spotting algorithmic bias and misinformation, ensuring a secure and constructive digital mindset.'
    }
  ];

  return (
    <section id="parents" className="py-24 md:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Parent Guide & Safeguards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Built with Parental Trust & Care
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Transparent frameworks, small cohort sizes, and balanced screen-time practices ensure your child's exploration remains healthy, inspiring, and productive.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PARENT_POINTS.map((pt, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4 text-orange-600">
                  {pt.icon === 'FileText' && <FileText className="w-5 h-5 text-orange-600" />}
                  {pt.icon === 'ShieldCheck' && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
                  {pt.icon === 'Clock' && <Clock className="w-5 h-5 text-amber-600" />}
                  {pt.icon === 'Award' && <Award className="w-5 h-5 text-blue-600" />}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Parent FAQ Accordion */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-stone-100">
            <HelpCircle className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Frequently Asked Questions from Parents
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="border border-stone-200 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-stone-50/50 hover:bg-stone-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-800 pr-4">
                      {faq.q}
                    </span>
                    <span className="text-slate-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              Have a question regarding cohort schedules or campus locations?
            </span>
            <button
              onClick={onOpenEnquiry}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 underline"
            >
              Ask an Advisor in the Enquiry Form
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
