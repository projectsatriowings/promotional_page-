import React from 'react';
import { ArrowRight, Phone, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenEnquiry: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 p-8 sm:p-14 overflow-hidden shadow-2xl text-white">
          {/* Ambient light circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Next Cohort Registrations Closing Soon</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Ready To Lead The High-Growth Marketing Era?
            </h2>

            <p className="text-sm sm:text-base text-orange-50 max-w-2xl mx-auto leading-relaxed">
              Reserve your seat for the upcoming weekend or weekday batch. Learn directly from agency founders, manage live client budgets, and unlock 100% placement cell support.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onOpenEnquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider text-orange-700 bg-white hover:bg-slate-50 shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Enrol & Reserve Cohort Seat</span>
                <ArrowRight className="w-4 h-4 text-orange-700" />
              </button>

              <a
                href="tel:+918825948859"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-white bg-orange-700/60 hover:bg-orange-700/80 border border-white/20 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-200" />
                <span>Call Admissions: +91 8825948859</span>
              </a>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-orange-100 border-t border-white/20">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-200" />
                100% Placement Support
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-200" />
                Jaighurudeva Academic Certification
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-200" />
                15+ Enterprise AI Tools
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
