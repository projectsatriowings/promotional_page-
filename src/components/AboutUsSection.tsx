import React from 'react';
import { ExternalLink, MapPin, Building } from 'lucide-react';
import { DoodleStar, PaperCloud, DoodleCircuit } from './PlayfulDoodles';

interface AboutUsSectionProps {
  onOpenEnquiry: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="about-us" className="py-24 md:py-32 bg-[#FAF8F5] relative overflow-hidden border-t border-stone-200/80">
      
      {/* Background Decorative Doodles */}
      <div className="absolute top-10 right-12 pointer-events-none hidden lg:block animate-float-slow">
        <PaperCloud className="w-24 h-14" color="#E0F2FE" />
      </div>
      <div className="absolute bottom-12 left-10 pointer-events-none hidden sm:block animate-wiggle-soft">
        <DoodleCircuit className="w-14 h-14 text-emerald-500 opacity-60" color="#10B981" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Story, Mission & Verified Facts */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase">
              <Building className="w-3.5 h-3.5 text-orange-600" />
              <span>About DigitalGhuru</span>
              <DoodleStar className="w-3.5 h-3.5 text-amber-500" color="#F59E0B" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Pioneering AI-Powered Education for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200]">
                Next-Gen Innovators
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              With over <strong className="text-slate-800">500+ students trained</strong> across professional programs and junior workshops, <strong className="text-slate-900">Digital Ghuru</strong> stands at the forefront of AI education in India. We transform learners through hands-on, agency-style training, practical project execution, and cutting-edge computational curriculums.
            </p>

            {/* Mission & Vision Callout Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-3xl bg-white border-2 border-stone-200 shadow-paper shadow-paper-hover transition-all">
                <div className="text-[11px] font-black uppercase tracking-wider text-orange-600 mb-1">
                  Our Mission
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  "To transform the future of technology education through innovation, AI integration, and real execution over textbook theory."
                </p>
              </div>

              <div className="p-4 rounded-3xl bg-white border-2 border-stone-200 shadow-paper shadow-paper-hover transition-all">
                <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 mb-1">
                  Our Vision
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  "To empower learners globally to lead in the AI era, delivering transformational education with real-world application."
                </p>
              </div>
            </div>

            {/* Collaboration Callout */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 flex items-start gap-3.5 shadow-sm">
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
                <div className="p-3.5 rounded-2xl bg-white border-2 border-stone-200 shadow-sm hover:border-orange-300 transition-colors">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>Anna Nagar (Chennai)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">3rd Ave, Kumaran Nagar</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border-2 border-stone-200 shadow-sm hover:border-orange-300 transition-colors">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>Korattur (Chennai)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Gurudev Complex, 57th St</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border-2 border-stone-200 shadow-sm hover:border-orange-300 transition-colors">
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
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
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

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <img
                src="/brand/card-g9-10.png"
                alt="DigitalGhuru Young Leaders at work"
                className="w-full h-[480px] object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Certified Mentorship
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  Real Software Architects & AI Specialists as Mentors
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Guiding junior minds with patient, supportive, hands-on attention.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
