import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenEnquiry: () => void;
  onExploreCourses: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onOpenEnquiry,
  onExploreCourses,
}) => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with Official DigitalGhuru Warm Tones & Navy Depth */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/90 p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-slate-800">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 text-xs font-bold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>DigitalGhuru • AI Super Kids Program</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
              Start Your Child's AI Learning Journey.
            </h2>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              Equip your young creator with authentic artificial intelligence discernment, ethical principles, and practical problem-solving skills across Grades 1 through 12.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-orange-600 hover:bg-orange-500 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Get Started / Request Syllabus</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={onExploreCourses}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              >
                <span>Explore All 4 Grade Tracks</span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Grades 1 through 12</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-orange-400" />
                <span>In collaboration with Jaighurudeva Academy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Safe, Filtered Student Sandboxes</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
