import React from 'react';
import { MapPin, Phone, Mail, Award, CheckCircle2, Building2, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface AboutUsSectionProps {
  onOpenEnquiry: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ onOpenEnquiry }) => {
  const campuses = [
    {
      city: 'Chennai — Anna Nagar',
      type: 'Flagship Training Hub',
      address: '2nd Floor, W Block, 3rd Avenue, Anna Nagar, Chennai - 600040',
      timing: 'Mon–Sat: 9:00 AM – 7:30 PM'
    },
    {
      city: 'Chennai — Korattur',
      type: 'Technology & Lab Campus',
      address: 'Near Railway Station, Central Avenue, Korattur, Chennai - 600080',
      timing: 'Mon–Sat: 9:30 AM – 7:00 PM'
    },
    {
      city: 'Hyderabad — Ameerpet',
      type: 'Executive Learning Hub',
      address: 'Metro Pillar 1042, Beside Mythrivanam, Ameerpet, Hyderabad - 500038',
      timing: 'Mon–Sat: 9:00 AM – 8:00 PM'
    }
  ];

  return (
    <section id="about-us" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Visual & Partner Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" 
                alt="DigitalGhuru Modern Learning Classroom"
                className="w-full h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
              
              {/* Partner Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/60">
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
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mb-1">
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
            <div className="absolute -top-4 -right-4 bg-emerald-600 text-white px-4 py-2 rounded-2xl shadow-lg shadow-emerald-600/30 text-xs font-bold flex items-center gap-1.5 border-2 border-white">
              <ShieldCheck className="w-4 h-4" />
              Govt & ISO Compliant Curriculum
            </div>
          </div>

          {/* Right Column: Mission and Editorial */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-300 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" />
              About DigitalGhuru
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              Empowering India’s Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">AI-First Marketers</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-5">
              Founded on the belief that traditional marketing education has fallen years behind real industry demands, <strong>DigitalGhuru</strong> bridges the gap between digital theory and commercial execution.
            </p>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              In academic partnership with <strong>Jaighurudeva Educational Academy</strong>, we provide intensive, agency-standard training programs where students run real advertising budgets, command state-of-the-art AI workflows, and graduate with certified portfolios that immediately attract hiring managers.
            </p>

            {/* Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Live Client Spend</h4>
                  <p className="text-xs text-slate-500">Every trainee deploys and monitors actual live advertising budgets.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">1-on-1 Mentorship</h4>
                  <p className="text-xs text-slate-500">Weekly code & campaign reviews by active agency growth directors.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Portfolio-First Hiring</h4>
                  <p className="text-xs text-slate-500">Graduate with 5+ proven case studies ready to show recruiters.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Lifetime Alumni Access</h4>
                  <p className="text-xs text-slate-500">Access to ongoing tool updates, guest lectures, and alumni community.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenEnquiry}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
              >
                <span>Book a Campus Visit</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="https://digitalghuru.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-sm border border-slate-300 transition-colors"
              >
                Visit Official Website
              </a>
            </div>

          </div>
        </div>

        {/* Physical Campuses Grid */}
        <div className="pt-12 border-t border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Our Physical Campuses</h3>
            <p className="text-sm text-slate-600">
              Walk in for a 1-on-1 counseling session, sit in on a live class, or test-drive our AI labs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campuses.map((campus, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {campus.type}
                    </span>
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{campus.city}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{campus.address}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>{campus.timing}</span>
                  <a 
                    href="tel:+918825948859" 
                    className="font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Call Hub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

