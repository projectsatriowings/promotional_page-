import React, { useState } from 'react';
import { FolderGit2, ExternalLink, BarChart3, TrendingUp, Search, Layers, CheckCircle2 } from 'lucide-react';

interface StudentProjectsSectionProps {
  onOpenEnquiry: () => void;
}

export const StudentProjectsSection: React.FC<StudentProjectsSectionProps> = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const projects = [
    {
      title: 'E-Commerce Meta Ads & ROAS Optimization',
      category: 'Performance Marketing',
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      brief: 'Scaled a direct-to-consumer apparel brand by implementing dynamic creative testing, broad audience targeting, and CAPI server-side event tracking.',
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

  return (
    <section id="student-projects" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            Hands-On Portfolio Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Real Agency Briefs. Measurable Case Studies.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            DigitalGhuru students don’t just watch videos—they execute real client briefs, manage live budgets, and build verifiable portfolios ready for recruiters.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {projects.map((proj, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === idx
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {proj.icon}
              <span>{proj.category}</span>
            </button>
          ))}
        </div>

        {/* Active Project Card Showcase */}
        {projects[activeTab] && (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 inline-block mb-3">
                    {projects[activeTab].category} Portfolio Brief
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {projects[activeTab].title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                    {projects[activeTab].brief}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Key Execution Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {projects[activeTab].deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools Stack */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Industry Tools Mastered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[activeTab].tools.map((tool, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Metrics Card */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-md">
                <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold text-sm">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>Demonstrated Client Results</span>
                </div>

                <div className="space-y-4">
                  {projects[activeTab].metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600">{metric.label}</span>
                      <span className="text-xl sm:text-2xl font-black text-slate-900">{metric.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onOpenEnquiry}
                  className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <span>Build This In Your Portfolio</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

