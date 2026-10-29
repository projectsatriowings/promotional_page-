import React from 'react';
import { Hammer, Award, ShieldCheck, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { DIGITALGHURU_BENEFITS } from '../data/coursesData';

interface WhySectionProps {
  onOpenEnquiry: () => void;
}

export const WhySection: React.FC<WhySectionProps> = ({ onOpenEnquiry }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer':
        return <Hammer className="w-5 h-5 text-orange-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-violet-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-orange-600" />;
    }
  };

  const getAccentBg = (accent: string) => {
    switch (accent) {
      case 'orange':
        return 'bg-orange-50 border-orange-200';
      case 'blue':
        return 'bg-blue-50 border-blue-200';
      case 'teal':
        return 'bg-teal-50 border-teal-200';
      case 'violet':
        return 'bg-violet-50 border-violet-200';
      default:
        return 'bg-stone-50 border-stone-200';
    }
  };

  return (
    <section id="why-digitalghuru" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Brand Image & Academic Partnership Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200/90 group">
              <img
                src="/brand/card-g7-8.png"
                alt="DigitalGhuru students collaborating on AI and robotics"
                className="w-full h-[470px] object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent pointer-events-none" />

              {/* Partnership Badge with Jaighurudeva */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-stone-200 flex items-center gap-2.5">
                <img
                  src="/brand/partner-jaighurudeva.webp"
                  alt="Jaighurudeva Educational Academy Logo"
                  className="h-6 w-auto object-contain"
                />
                <span className="text-xs font-bold text-slate-800">
                  Academic Excellence Partner
                </span>
              </div>

              {/* Bottom Quote */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/90 backdrop-blur-xs text-[11px] font-bold uppercase tracking-wider mb-2">
                  <span>DigitalGhuru Methodology</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold leading-snug">
                  "Transforming learners from passive technology consumers into confident creators and ethical young founders."
                </h3>
              </div>
            </div>

            {/* Overlap Stat Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm">
                  500+
                </div>
                <div className="text-xs font-bold leading-tight">
                  Students Trained Across Programs
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                Award-winning technology training institute with campuses in Chennai & Hyderabad.
              </p>
            </div>
          </div>

          {/* Right Column: Why Choose DigitalGhuru Cards */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase mb-3">
              <span>Why Choose DigitalGhuru?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Real-World Execution.{' '}
              <span className="block text-slate-700">Future-Proof AI Education.</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-2xl">
              We bridge academic rigor with real industry practice. In collaboration with Jaighurudeva Educational Academy, our curriculum gives young learners hands-on exposure to verified AI tools, structured design thinking, and ethical foundations.
            </p>

            {/* 4 Illustrated Benefit Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DIGITALGHURU_BENEFITS.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-orange-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3.5 ${getAccentBg(
                        b.accent
                      )}`}
                    >
                      {getIcon(b.icon)}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Enquire Link */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Transparent syllabus & verified milestone certificates for all grades.</span>
              </div>
              <button
                onClick={onOpenEnquiry}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 group"
              >
                <span>Request Official Prospectus</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
