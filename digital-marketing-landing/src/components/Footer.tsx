import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenEnquiry: (courseId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Partner */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/brand/logo-final.webp" 
                alt="DigitalGhuru" 
                className="h-9 w-auto brightness-110"
                onError={(e) => {
                  // Fallback to navbar logo if logo-final not available
                  (e.target as HTMLImageElement).src = '/brand/logo-navbar.webp';
                }}
              />
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              DigitalGhuru is India’s premier institute for AI-integrated Digital Marketing and Performance Growth, conducted in academic partnership with Jaighurudeva Educational Academy.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <img 
                src="/brand/partner-jaighurudeva.webp" 
                alt="Jaighurudeva Educational Academy" 
                className="h-10 w-auto bg-white/10 p-1 rounded-md border border-white/10" 
              />
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-200 block">Academic Collaboration</span>
                Jaighurudeva Educational Academy
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#courses" className="hover:text-emerald-400 transition-colors">
                  AI Digital Marketing
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-emerald-400 transition-colors">
                  Post Graduate Program
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-emerald-400 transition-colors">
                  Performance Bootcamp
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-emerald-400 transition-colors">
                  12-Module Syllabus
                </a>
              </li>
              <li>
                <a href="#student-projects" className="hover:text-emerald-400 transition-colors">
                  Student Portfolios
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">DigitalGhuru</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about-us" className="hover:text-emerald-400 transition-colors">
                  About Our Mission
                </a>
              </li>
              <li>
                <a href="#why-choose" className="hover:text-emerald-400 transition-colors">
                  Why DigitalGhuru
                </a>
              </li>
              <li>
                <a 
                  href="https://digitalghuru.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://digitalghuru.com/refund-policy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://digitalghuru.com/terms-and-conditions" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Campuses */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Campuses</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a href="tel:+918825948859" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>+91 8825948859</span>
              </a>
              <a href="mailto:contact@digitalghuru.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>contact@digitalghuru.com</span>
              </a>
              <div className="flex items-start gap-2 pt-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Anna Nagar (Chennai) • Korattur (Chennai) • Ameerpet (Hyderabad)</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => onOpenEnquiry()}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-emerald-900/30"
              >
                Schedule Free Counseling Call
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DigitalGhuru. All rights reserved. In collaboration with Jaighurudeva Educational Academy.</p>
          <div className="flex items-center gap-6">
            <a href="https://digitalghuru.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400">
              Privacy Policy
            </a>
            <a href="https://digitalghuru.com/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400">
              Terms of Use
            </a>
            <a href="https://digitalghuru.com/refund-policy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400">
              Refunds
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

