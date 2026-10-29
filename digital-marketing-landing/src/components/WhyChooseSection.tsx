import React from 'react';
import { Briefcase, Sparkles, Trophy, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { MARKETING_WHY_POINTS, MARKETING_STATS } from '../data/marketingCoursesData';

interface WhyChooseSectionProps {
  onOpenEnquiry: (courseId?: string) => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ onOpenEnquiry }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Briefcase: <Briefcase className="w-6 h-6 text-emerald-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-blue-600" />,
    Trophy: <Trophy className="w-6 h-6 text-amber-500" />,
    Award: <Award className="w-6 h-6 text-purple-600" />
  };

  return (
    <section id="why-choose" className="py-24 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Trophy className="w-3.5 h-3.5" />
            The DigitalGhuru Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Why Top Brands Hire DigitalGhuru Graduates
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            We don’t teach outdated theory. Our curriculum combines real advertising budgets, agency-grade AI toolstacks, and certified academic pedigree.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {MARKETING_WHY_POINTS.map((pillar, idx) => (
            <div 
              key={idx}
              className="group relative p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[pillar.icon] || <CheckCircle className="w-6 h-6 text-emerald-600" />}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                <span>Certified Standard</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Metrics Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {MARKETING_STATS.map((stat, idx) => (
              <div key={idx} className="text-center pt-6 md:pt-0 first:pt-0">
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
            <div>
              <p className="text-sm font-semibold text-white">Next batch starts next Monday across all centers.</p>
              <p className="text-xs text-slate-400">Class sizes strictly limited to 15 students for hands-on mentor attention.</p>
            </div>
            <button
              onClick={() => onOpenEnquiry('ai-powered-digital-marketing')}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
            >
              Reserve Your Seat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

