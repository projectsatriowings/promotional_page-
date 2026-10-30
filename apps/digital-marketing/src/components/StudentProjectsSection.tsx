import React, { useState } from 'react';
import { FolderGit2, ExternalLink, BarChart3, TrendingUp, Search, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface StudentProjectsSectionProps {
  onOpenEnquiry: () => void;
}

export const StudentProjectsSection: React.FC<StudentProjectsSectionProps> = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const projects = [
    {
      title: 'E-Commerce Meta Ads & ROAS Optimization',
      category: 'Performance Media Buying',
      icon: <TrendingUp className="w-5 h-5 text-orange-600" />,
      brief: 'Scaled a direct-to-consumer retail brand by implementing dynamic creative testing, broad audience targeting, and CAPI server-side event tracking.',
      tools: ['Meta Ads Manager', 'Conversions API (CAPI)', 'Midjourney', 'Google Analytics 4'],
      deliverables: [
        'Full-funnel campaign architecture (Top, Middle & Bottom of funnel)',
        '15 AI-generated creative variations tested with hook rate tracking',
        'Achieved 4.2x ROAS benchmark on real allocated agency testing spend'
      ],
      metrics: [
        { label: 'Target ROAS', value: '4.2x' },
        { label: 'Creative Iterations', value: '15+' },
        { label: 'CTR Improvement', value: '+180%' }
      ]
    },
    {
      title: 'Enterprise Technical SEO & Content Blueprint',
      category: 'Search Engine Optimization',
      icon: <Search className="w-5 h-5 text-blue-600" />,
      brief: 'Performed a comprehensive 60-point technical audit for a B2B SaaS platform, resolving canonical loops, crawl budget bottlenecks, and schema markup errors.',
      tools: ['Semrush', 'Google Search Console', 'Screaming Frog', 'ChatGPT'],
      deliverables: [
        'Full technical crawl audit with prioritize-by-impact indexation roadmap',
        'Competitor gap analysis uncovering 120+ high-intent commercial keywords',
        'Programmatic topic cluster architecture with internal link models'
      ],
      metrics: [
        { label: 'Indexed Pages', value: '450+' },
        { label: 'Keyword Gap', value: '120 Kw' },
        { label: 'Core Web Vitals', value: '98/100' }
      ]
    },
    {
      title: 'AI Automated Lead Funnel & CRM Nurture Sequence',
      category: 'Marketing Automation',
      icon: <Layers className="w-5 h-5 text-purple-600" />,
      brief: 'Built an autonomous lead capture funnel connecting high-converting landing pages, WhatsApp business webhooks, and AI-personalized email sequences.',
      tools: ['Zapier', 'OpenAI API', 'Mailchimp', 'WordPress Elementor'],
      deliverables: [
        'Zero-latency automated webhook passing leads from form to CRM',
        'AI prompt pipeline generating personalized follow-up emails within 60s',
        'Automated reporting spreadsheet updated in real-time for executive review'
      ],
      metrics: [
        { label: 'Lead Response Time', value: '< 60s' },
        { label: 'Form Conversion', value: '14.8%' },
        { label: 'Automation Steps', value: '18 zaps' }
      ]
    }
  ];

  const current = projects[activeTab];

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#FAF9F6] text-slate-900 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-orange-600" />
            <span>Hands-On Capstone Portfolios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Real Agency Briefs. Defensible Portfolios.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            DigitalGhuru students don’t just watch videos—they execute real client briefs, manage live budgets, and build verifiable portfolios ready for recruiters.
          </p>
        </div>

        {/* Project Tab Selectors */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar mb-10 pb-2">
          {projects.map((proj, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === idx
                  ? 'bg-gradient-to-r from-[#FFA800] to-[#FF5200] text-white shadow-md shadow-orange-500/25'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {proj.icon}
              <span>{proj.category}</span>
            </button>
          ))}
        </div>

        {/* Active Project Card */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-50 text-orange-800 border border-orange-200">
                {current.category}
              </div>
              <h3 className="text-2xl font-black text-slate-900">{current.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{current.brief}</p>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Sprint Deliverables:
                </span>
                <div className="space-y-2">
                  {current.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">
                  Toolstack Used:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {current.tools.map((tool, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-[11px] border border-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-500 block pb-2 border-b border-slate-200">
                VERIFIED SPRINT METRICS
              </span>
              <div className="space-y-3">
                {current.metrics.map((met, mIdx) => (
                  <div key={mIdx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xs text-slate-500 font-medium">{met.label}</span>
                    <span className="text-base font-black text-orange-600 font-mono">{met.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onOpenEnquiry}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Build This In Your Cohort</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
