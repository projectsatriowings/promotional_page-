import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, ArrowUp, ShieldCheck } from 'lucide-react';
import { MARKETING_COURSES } from '../data/marketingCoursesData';

interface FooterProps {
  onOpenEnquiry: (courseId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080E] text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/brand/logo-navbar.webp" 
                alt="DigitalGhuru Logo" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded-full border border-orange-500/30">
                Growth Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India’s premier agency-style AI marketing institute. Co-certifying world-class growth practitioners in partnership with Jaighurudeva Educational Academy.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISO 9001:2015 Certified Curriculum</span>
            </div>
          </div>

          {/* Col 2: Programs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Programs</h4>
            <ul className="space-y-2 text-xs">
              {MARKETING_COURSES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onOpenEnquiry(c.id)}
                    className="text-left text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {c.title}
                  </button>
                </li>
              ))}
              <li>
                <a 
                  href="#campaign-showcase" 
                  className="text-slate-400 hover:text-orange-400 transition-colors"
                >
                  Interactive Campaign Labs
                </a>
              </li>
              <li>
                <a 
                  href="#curriculum" 
                  className="text-slate-400 hover:text-orange-400 transition-colors"
                >
                  12-Module Syllabus Download
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Campuses */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Campuses</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <strong className="text-slate-300 block">Chennai — Anna Nagar (Hub)</strong>
                <span className="text-slate-500">2nd Floor, W Block, 3rd Avenue</span>
              </li>
              <li>
                <strong className="text-slate-300 block">Chennai — Korattur (Lab)</strong>
                <span className="text-slate-500">Central Avenue, Near Railway Station</span>
              </li>
              <li>
                <strong className="text-slate-300 block">Hyderabad — Ameerpet</strong>
                <span className="text-slate-500">Metro Pillar 1042, Mythrivanam</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Admissions Desk</h4>
            <div className="space-y-2 text-xs">
              <a 
                href="tel:+918825948859" 
                className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>+91 8825948859</span>
              </a>
              <a 
                href="mailto:info@digitalghuru.com" 
                className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span>info@digitalghuru.com</span>
              </a>
              <a 
                href="https://digitalghuru.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors pt-2"
              >
                <span>digitalghuru.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DigitalGhuru. All rights reserved. Academic Partner: Jaighurudeva Academy.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-orange-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
