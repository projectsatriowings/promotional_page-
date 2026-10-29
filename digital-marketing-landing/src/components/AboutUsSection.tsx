import React, { useState } from 'react';
import { MapPin, Phone, Mail, Award, CheckCircle2, Building2, ShieldCheck, ArrowUpRight, Clock, Navigation } from 'lucide-react';

interface AboutUsSectionProps {
  onOpenEnquiry: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ onOpenEnquiry }) => {
  const [selectedCampusIdx, setSelectedCampusIdx] = useState(0);

  const campuses = [
    {
      city: 'Chennai — Anna Nagar',
      type: 'Flagship Training Hub',
      address: '2nd Floor, W Block, 3rd Avenue, Anna Nagar, Chennai - 600040',
      timing: 'Mon–Sat: 9:00 AM – 7:30 PM',
      highlights: 'High-speed ad simulation lab, 40+ iMac workstations, dedicated agency studio room'
    },
    {
      city: 'Chennai — Korattur',
      type: 'Technology & Lab Campus',
      address: 'Near Railway Station, Central Avenue, Korattur, Chennai - 600080',
      timing: 'Mon–Sat: 9:30 AM – 7:00 PM',
      highlights: 'SEO crawl test environment, interactive presentation studio, weekend cohort hub'
    },
    {
      city: 'Hyderabad — Ameerpet',
      type: 'Executive Learning Hub',
      address: 'Metro Pillar 1042, Beside Mythrivanam, Ameerpet, Hyderabad - 500038',
      timing: 'Mon–Sat: 9:00 AM – 8:00 PM',
      highlights: 'Media buying war room, executive placement interview cell, live streaming studio'
    }
  ];

  const currentCampus = campuses[selectedCampusIdx];

  return (
    <section id="about-us" className="py-24 md:py-32 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Visual & Partner Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-900 group">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" 
                alt="DigitalGhuru Modern Learning Classroom"
                className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Partner Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 p-1.5 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                    <img 
                      src="/brand/partner-jaighurudeva.webp" 
                      alt="Jaighurudeva Educational Academy"
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full inline-block mb-1">
                      Academic Collaboration
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      Jaighurudeva Educational Academy
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Co-certifying high-impact professional diplomas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Pill */}
            <div className="absolute -top-4 -right-4 bg-orange-600 text-white px-4 py-2 rounded-2xl shadow-xl shadow-orange-600/20 text-xs font-bold flex items-center gap-1.5 border-2 border-white">
              <ShieldCheck className="w-4 h-4 text-amber-200" />
              Govt & ISO Compliant Curriculum
            </div>
          </div>

          {/* Right Column: Story & Vision */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase self-start">
              <Building2 className="w-3.5 h-3.5 text-orange-600" />
              About DigitalGhuru
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Bridging The Gap Between Marketing Degrees & Agency Reality
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Traditional universities teach digital marketing through outdated textbooks and multiple-choice questions. Meanwhile, modern agencies demand practitioners who can engineer prompt pipelines in ChatGPT, allocate real budgets in Meta Ads Manager, and set up server-side CAPI tracking.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Headquartered in Chennai with physical campuses across Anna Nagar, Korattur, and Hyderabad (Ameerpet), DigitalGhuru delivers rigorous agency simulations backed by our proud academic partnership with <strong className="text-slate-900">Jaighurudeva Educational Academy</strong>.
            </p>

            {/* Core Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Practical simulations over rote memorization',
                'Live ad spends & authentic client reporting',
                '15+ Enterprise AI tools integrated into workflows',
                'Lifetime alumni network and placement referrals'
              ].map((val, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <span>{val}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="https://digitalghuru.com/about-us"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                <span>Read Full Institute Story</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Campuses & Infrastructure Explorer */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700 block mb-1">
                Physical Campuses & Infrastructure
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Visit Our Modern Growth Hubs
              </h3>
            </div>

            {/* Campus Tab Selectors */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {campuses.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCampusIdx(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCampusIdx === idx
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {c.city.split('—')[1]?.trim() || c.city}
                </button>
              ))}
            </div>
          </div>

          {/* Active Campus Spotlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-700">
                <MapPin className="w-4 h-4" />
                <span>{currentCampus.city} • {currentCampus.type}</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">{currentCampus.address}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Campus Facilities:</strong> {currentCampus.highlights}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Hours: {currentCampus.timing}</span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <span className="text-xs font-bold text-slate-900 block">Admissions Desk Direct Contact</span>
              <div className="text-xs space-y-1.5 text-slate-600">
                <p>Phone: <a href="tel:+918825948859" className="text-orange-600 font-bold hover:underline">+91 8825948859</a></p>
                <p>Email: <a href="mailto:info@digitalghuru.com" className="text-orange-600 font-bold hover:underline">info@digitalghuru.com</a></p>
              </div>
              <button
                onClick={onOpenEnquiry}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Schedule Offline Campus Tour
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
