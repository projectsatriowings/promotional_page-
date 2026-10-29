import React from 'react';
import { ExternalLink, MapPin, Building, Sparkles } from 'lucide-react';

interface AboutUsSectionProps {
  onOpenEnquiry: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="about-us" className="py-24 md:py-32 bg-[#FAF8F5] relative overflow-hidden border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Story, Mission & Verified Facts */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase">
              <Building className="w-3.5 h-3.5 text-orange-600" />
              <span>About DigitalGhuru</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Pioneering AI-Powered Education for Next-Gen Innovators
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              With over <strong className="text-slate-800">500+ students trained</strong> across professional programs and school workshops, <strong className="text-slate-900">Digital Ghuru</strong> stands at the forefront of AI education in India. We transform learners through hands-on, agency-style training, practical project execution, and cutting-edge computational curriculums.
            </p>

            {/* Mission & Vision Callout Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="text-[11px] font-bold uppercase tracking-wider text-orange-600 mb-1">
                  Our Mission
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  "To transform the future of technology education through innovation, AI integration, and real execution over textbook theory."
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-1">
                  Our Vision
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  "To empower learners globally to lead in the AI era, delivering transformational education with real-world application."
                </p>
              </div>
            </div>

            {/* Collaboration Callout */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 flex items-start gap-3.5">
              <img
                src="/brand/partner-jaighurudeva.webp"
                alt="Jaighurudeva Academy"
                className="h-10 w-auto object-contain mt-0.5"
              />
              <div className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900 block font-bold mb-0.5">
                  Academic Excellence Collaboration
                </strong>
                In proud partnership with <span className="font-semibold text-slate-900">Jaighurudeva Educational Academy</span>, combining digital AI innovation with a legacy of scholastic rigor and dedicated student mentorship.
              </div>
            </div>

            {/* Three Campuses */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Our Physical Campuses
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>Anna Nagar (Chennai)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">3rd Ave, Kumaran Nagar</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>Korattur (Chennai)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Gurudev Complex, 57th St</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>Ameerpet (Hyderabad)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Pratap Nagar Colony</p>
                </div>
              </div>
            </div>

            {/* Action CTA Links */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenEnquiry}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                Schedule Campus Consultation
              </button>

              <a
                href="https://digitalghuru.com/about-us"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
              >
                <span>Read Full Institute Story on DigitalGhuru.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Visual Brand Gallery & Logo Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <img
                src="/brand/banner-g11-12.png"
                alt="DigitalGhuru Advanced AI Learning Session"
                className="w-full h-[480px] object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Logo Card Overlay */}
              <div className="absolute top-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/brand/logo-navbar.webp"
                    alt="DigitalGhuru"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 block">
                    Award-Winning
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    AI Tech Institute
                  </span>
                </div>
              </div>

              {/* Bottom Quote Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>The DigitalGhuru Commitment</span>
                </div>
                <p className="text-sm font-semibold leading-relaxed">
                  "Honest feedback, transparent outcomes, and project-based mastery. Every student learns with genuine purpose."
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
