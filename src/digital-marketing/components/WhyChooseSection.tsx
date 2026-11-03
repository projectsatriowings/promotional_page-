import React from 'react';
import { Briefcase, Sparkles, Trophy, Award, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { MARKETING_WHY_POINTS, MARKETING_STATS } from '../data/marketingCoursesData';

interface WhyChooseSectionProps {
  onOpenEnquiry: (courseId?: string) => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ onOpenEnquiry }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Briefcase: <Briefcase className="w-6 h-6 text-orange-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-blue-600" />,
    Trophy: <Trophy className="w-6 h-6 text-amber-500" />,
    Award: <Award className="w-6 h-6 text-emerald-600" />
  };

  return (
    <section id="why-choose" className="py-24 md:py-32 bg-[#FAF9F6] text-slate-900 relative overflow-hidden border-t border-slate-200/80">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-dots-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Trophy className="w-3.5 h-3.5 text-orange-600" />
            <span>The DigitalGhuru Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Engineered For Immediate Agency Impact
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We don’t teach outdated theory. Our curriculum combines real advertising budgets, agency-grade AI toolstacks, and certified academic pedigree.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {MARKETING_WHY_POINTS.map((pillar, idx) => (
            <div 
              key={idx}
              className="group relative p-6 bg-white hover:bg-slate-50/80 rounded-3xl border border-slate-200/90 hover:border-orange-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-2xs">
                  {iconMap[pillar.icon] || <CheckCircle className="w-6 h-6 text-orange-600" />}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-orange-600">
                <span>Verified Benefit</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Metrics Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {MARKETING_STATS.map((stat, idx) => (
              <div key={idx} className="text-center pt-6 md:pt-0 first:pt-0">
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-white mb-2 leading-none">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
