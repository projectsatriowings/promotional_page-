import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { COURSES, DIGITALGHURU_CONTACT } from '../data/coursesData';

interface FooterProps {
  onSelectCourse: (courseId: string) => void;
  onOpenEnquiry: (courseId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCourse, onOpenEnquiry }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info & Collaboration (Cols 1–4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/brand/logo-navbar.webp"
                alt="DigitalGhuru Logo"
                className="h-11 w-auto object-contain brightness-110"
              />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              With over 500+ students trained, Digital Ghuru is an award-winning technology training institute shaping the future of AI talent across India through hands-on, agency-style learning.
            </p>

            {/* Academic Partner */}
            <div className="pt-2 flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 max-w-sm">
              <img
                src="/brand/partner-jaighurudeva.webp"
                alt="Jaighurudeva Academy"
                className="h-8 w-auto object-contain"
              />
              <span className="text-[11px] text-slate-400 leading-tight">
                In proud academic collaboration with <strong className="text-white">Jaighurudeva Educational Academy</strong>.
              </span>
            </div>

            {/* Official Contact Info */}
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <a href={`tel:${DIGITALGHURU_CONTACT.phone}`} className="hover:text-white transition-colors">
                  {DIGITALGHURU_CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <a href={`mailto:${DIGITALGHURU_CONTACT.email}`} className="hover:text-white transition-colors">
                  {DIGITALGHURU_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Four AI Learning Tracks (Cols 5–8) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              AI Super Kids Grade Tracks
            </h4>
            <ul className="space-y-3">
              {COURSES.map((course) => (
                <li key={course.id}>
                  <button
                    onClick={() => {
                      scrollToSection('courses');
                      onSelectCourse(course.id);
                    }}
                    className="text-left text-xs text-slate-400 hover:text-white transition-colors group flex items-center justify-between w-full"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {course.gradeBadge}: {course.title.replace('AI Super Kids: ', '')}
                    </span>
                    <span className="text-[10px] text-orange-400 font-bold bg-slate-900 px-2 py-0.5 rounded">
                      {course.price}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-900">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Physical Campus Centers
              </h5>
              <div className="space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Anna Nagar: 45, A Block, 3rd Ave, Kumaran Nagar, Chennai - 600102</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Korattur: Gurudev Complex, 57th St, Venkatraman Nagar, Chennai - 600050</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Hyderabad: Kallu Compound Rd, Pratap Nagar, Ameerpet - 500073</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links (Cols 9–10) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('courses')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Three AI Tracks
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('why-digitalghuru')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Why DigitalGhuru?
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about-us')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About DigitalGhuru
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('learning-experience')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Student Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('parents')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Parent Guide & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links & Admissions (Cols 11–12) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Official Links
            </h4>
            
            <ul className="space-y-2 text-xs text-slate-400 mb-6">
              <li>
                <a
                  href={DIGITALGHURU_CONTACT.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={DIGITALGHURU_CONTACT.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={DIGITALGHURU_CONTACT.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={DIGITALGHURU_CONTACT.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Twitter (X)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>

            <button
              onClick={() => onOpenEnquiry()}
              className="w-full py-2.5 px-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
            >
              <span>Enroll for Next Term</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Safety Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} DigitalGhuru. All rights reserved. In academic collaboration with Jaighurudeva Academy.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://digitalghuru.com/refund-policy"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-400"
            >
              Refund Policy
            </a>
            <a
              href="https://digitalghuru.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-400"
            >
              digitalghuru.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
