import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B132B] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/digital-marketing-course" className="inline-block">
              <img
                src="/brand/logo-navbar.webp"
                alt="Digital Ghuru Logo"
                className="h-10 w-auto object-contain brightness-110"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/logo-final dG.webp';
                }}
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Digital Ghuru is a premier technology and marketing course centre dedicated to practical, career-ready education and early digital literacy.
            </p>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
              <span className="font-bold text-amber-400">Academic Partner:</span> Jaighurudeva Academy of Vedic Sciences & Emerging Tech.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-amber-400 transition-colors block"
                >
                  Home
                </Link>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-amber-400 transition-colors">
                  Course Curriculum
                </a>
              </li>
              <li>
                <a href="#who-can-join" className="hover:text-amber-400 transition-colors">
                  Who Can Join
                </a>
              </li>
              <li>
                <a href="#enquiry" className="hover:text-amber-400 transition-colors">
                  Admissions Enquiry
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Courses */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Our Courses
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link
                  to="/digital-marketing-course"
                  className="group flex flex-col hover:text-white transition-colors"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-orange-400 flex items-center gap-1">
                    Digital Marketing Program
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    For College Students & Professionals
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/4-kids-chennai"
                  className="group flex flex-col hover:text-white transition-colors"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-sky-400 flex items-center gap-1">
                    3 Kids AI & Tech Courses
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    For Grades 6 to 12 (AI Innovators, Entrepreneurs & Future Leaders)
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact Centre
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+918825948859" className="hover:text-white transition-colors block font-semibold text-slate-200">
                    +91 8825948859
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a href="mailto:admissions@digitalghuru.com" className="hover:text-white transition-colors">
                  admissions@digitalghuru.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-snug">
                  Chennai Campus & Hyderabad Learning Studio
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-snug">
                  Mon - Sat: 9:00 AM - 7:00 PM<br />Sun: 10:00 AM - 4:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Column 5: Follow Us */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Connect With Us
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Stay updated with workshop announcements, student achievements, and new batch schedules.
            </p>
            <div className="flex items-center gap-2.5">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/digitalghuru"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-500 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current text-slate-200" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/digitalghuru"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current text-slate-200" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@digitalghuru"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current text-slate-200" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/digitalghuru"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current text-slate-200" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
            <div className="mt-5">
              <a
                href="https://wa.me/918825948859?text=Hello%20Digital%20Ghuru,%20I%20would%20like%20to%20know%20more%20about%20the%20courses"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 transition-colors"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Digital Ghuru. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Digital Ghuru Educational Initiative</span>
            <span>•</span>
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-slate-400 transition-colors"
            >
              Promotional Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
