import React from 'react';
import { Sparkles, Phone, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenEnquiry: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Admissions Open • Limited Intake per Center</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
          Transform Your Career into an <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            AI-Powered Digital Marketer
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Gain agency-tested skills in paid ads, technical SEO, and AI automation. Graduate with a certified portfolio, live ad spend credentials, and dedicated 100% placement support.
        </p>

        {/* Trust Points */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-300 mb-12">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>₹25,000 Complete 12-Module Program</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Jaighurudeva Co-Certification</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Weekend & Weekday Batches</span>
          </div>
        </div>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Apply for Upcoming Batch</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="tel:+918825948859"
            className="w-full sm:w-auto px-7 py-4 bg-slate-900/90 hover:bg-slate-800 text-white font-bold rounded-2xl text-base border border-slate-700/80 hover:border-slate-600 transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-sm"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call +91 8825948859</span>
          </a>
        </div>

        {/* Footnote */}
        <p className="mt-8 text-xs text-slate-500">
          Campus centers located at Anna Nagar (Chennai), Korattur (Chennai), and Ameerpet (Hyderabad).
        </p>

      </div>
    </section>
  );
};

