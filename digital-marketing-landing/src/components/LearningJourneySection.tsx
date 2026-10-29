import React, { useState } from 'react';
import { 
  Compass, Sparkles, Target, Award, ArrowRight, CheckCircle2, 
  ChevronRight, Laptop, Briefcase, FileText, Users, TrendingUp 
} from 'lucide-react';

export const LearningJourneySection: React.FC<{ onOpenEnquiry: (courseId?: string) => void }> = ({ onOpenEnquiry }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      number: '01',
      duration: 'Weeks 1–3',
      title: 'Audience Psychology & AI Strategy',
      subtitle: 'Market Research & Creative Architecture',
      description: 'Master consumer empathy mapping, competitor keyword intelligence with Semrush, and prompt engineering frameworks (AIDA, PAS) using ChatGPT and Midjourney.',
      skills: ['Buyer Persona Synthesis', 'AI Prompt Engineering', 'Competitor Gap Analysis', 'Content Calendar Systems'],
      handsOnProject: 'Build an exhaustive audience intelligence dossier for an enterprise retail brand.',
      metric: '15+ AI Tools Mastered',
      icon: <Compass className="w-5 h-5 text-orange-600" />
    },
    {
      number: '02',
      duration: 'Weeks 4–6',
      title: 'High-Converting Organic Funnels',
      subtitle: 'Viral Social Media & Technical SEO',
      description: 'Engineer organic acquisition machines. Write viral Instagram Reel scripts, optimize on-page schema markup, audit Core Web Vitals, and launch B2B executive lead funnels on LinkedIn.',
      skills: ['Technical SEO & Schema', 'Reel Scripting & Pacing', 'Core Web Vitals Optimization', 'B2B LinkedIn Outreach'],
      handsOnProject: 'Perform a 60-point technical SEO crawl audit and rank a target pillar page on Google.',
      metric: 'Top 3 SERP Benchmark',
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />
    },
    {
      number: '03',
      duration: 'Weeks 7–9',
      title: 'Paid Media Buying & Automation',
      subtitle: 'Meta Ads Manager & Google PMax Lab',
      description: 'Deploy real advertising spend. Configure server-side Conversions API (CAPI), structure dynamic creative testing sets, automate lead capture funnels via Zapier webhooks.',
      skills: ['Server-Side CAPI Tracking', 'Dynamic Creative Testing', 'Google Performance Max', 'Zapier CRM Webhooks'],
      handsOnProject: 'Manage live client ad spend on Meta & Google Ads optimizing for target ROAS.',
      metric: '3.8x+ ROAS Target',
      icon: <Target className="w-5 h-5 text-purple-600" />
    },
    {
      number: '04',
      duration: 'Weeks 10–12',
      title: 'Agency Capstone & Placement Defense',
      subtitle: 'Executive Reporting & Direct Referrals',
      description: 'Assemble your live client capstone portfolio, configure Google Looker Studio executive reporting dashboards, and defend your growth findings in front of agency hiring partners.',
      skills: ['Looker Studio Dashboards', 'Multi-Touch Attribution', 'Portfolio Defense', 'Executive Interview Prep'],
      handsOnProject: 'Present an end-to-end multi-channel ROI growth audit to agency founders.',
      metric: '100% Placement Support',
      icon: <Award className="w-5 h-5 text-emerald-600" />
    }
  ];

  const current = stages[activeStage];

  return (
    <section id="learning-journey" className="py-24 md:py-32 bg-[#FAF9F6] text-slate-900 relative overflow-hidden border-t border-slate-200/80">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dots-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>The Pedagogical Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            How You Evolve From Learner To Agency Marketer
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our 12-week roadmap is engineered around live sprint milestones. Every week culminates in an industry deliverable ready for your placement portfolio.
          </p>
        </div>

        {/* 4-Stage Connected Workflow Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-white border-2 border-orange-500 shadow-lg shadow-orange-500/10'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {isActive && (
                  <div className="absolute -top-1 left-6 right-6 h-0.5 bg-orange-500 rounded-full" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isActive ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    STAGE {stage.number}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">{stage.duration}</span>
                </div>
                <h4 className={`text-sm sm:text-base font-bold leading-snug mb-1 ${
                  isActive ? 'text-slate-900' : 'text-slate-700'
                }`}>
                  {stage.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{stage.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Spotlight Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600 text-white flex items-center gap-1.5">
                  {current.icon}
                  Stage {current.number} • {current.duration}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {current.metric}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                  {current.title}
                </h3>
                <h4 className="text-sm font-semibold text-orange-700 mb-4">
                  {current.subtitle}
                </h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Skills Learned Pill Grid */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                  Core Competencies Acquired:
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Practical Task Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/70 border border-orange-200 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800 block">
                    Deliverable / Capstone Task
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 mt-0.5">
                    {current.handsOnProject}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenEnquiry('ai-powered-digital-marketing')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-600/20 transition-all cursor-pointer"
                >
                  <span>Download Full Weekly Syllabus</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Visual Panel */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-mono text-slate-600 font-bold">
                  STAGE_{current.number}_EVALUATION
                </span>
                <span className="text-[10px] uppercase font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Ready For Review
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Sprint Completion:</span>
                    <span className="text-orange-700 font-bold font-mono">100% Verified</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 w-full rounded-full" />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 text-xs shadow-xs">
                  <span className="text-slate-700 block font-semibold">Faculty & Agency Mentor Evaluation:</span>
                  <p className="text-[11px] text-slate-600 italic leading-relaxed">
                    "Weekly code, creative hooks, and spend attribution must pass our 14-point audit before advancing to next stage."
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 block">Attendance Req.</span>
                    <span className="font-bold text-slate-900">85% Min</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 block">Placement Referrals</span>
                    <span className="font-bold text-emerald-700">Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
