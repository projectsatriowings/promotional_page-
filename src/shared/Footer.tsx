import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUp,
  ShieldCheck,
  Award,
  GraduationCap
} from 'lucide-react';

export const Footer: React.FC = () => {
  const location = useLocation();
  const isKidsPage = location.pathname.includes('kids') || location.pathname.includes('4-kids');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070D1E] text-slate-300 pt-14 sm:pt-16 pb-12 border-t border-slate-800/80 overflow-hidden">
      {/* Top Ambient Glow & Gradient Accent Line */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 opacity-90 shadow-[0_0_12px_rgba(255,140,0,0.5)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* =====================================================================
          MAIN FOOTER CONTENT GRID
          ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800/80">

          {/* ---------------------------------------------------------------
              COLUMN 1: VIBRANT BRAND IDENTITY & PARTNERSHIP (4 cols)
              --------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-5">
            {/* VIBRANT LOGO + BRAND NAME */}
            <Link
              to={isKidsPage ? '/kids' : '/'}
              onClick={scrollToTop}
              className="inline-flex items-center gap-3.5 group focus:outline-none"
              title="Digital Ghuru Professional Course Centre"
            >
              {/* Illuminated Glassmorphic Logo Container */}
              <div className="relative p-2.5 rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-slate-900/90 border border-orange-500/40 shadow-[0_0_24px_rgba(255,140,0,0.3)] group-hover:shadow-[0_0_32px_rgba(255,140,0,0.5)] group-hover:border-orange-400 transition-all duration-300">
                <img
                  src="/brand/logo-navbar.webp"
                  alt="Digital Ghuru Logo"
                  className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_16px_rgba(255,168,0,0.75)] brightness-125 saturate-160 contrast-110"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/logo-final dG.webp';
                  }}
                />
              </div>

              {/* Bold High-Contrast Brand Typography */}
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-orange-500 leading-none drop-shadow-[0_2px_10px_rgba(255,140,0,0.35)]">
                  Digital Ghuru
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-amber-200/90 tracking-wide uppercase mt-1">
                  Professional Course Centre
                </span>
              </div>
            </Link>

            {/* Institute Mission Statement */}
            <p className="text-xs sm:text-[13px] leading-relaxed text-slate-300 max-w-sm font-normal">
              Digital Ghuru is Tamil Nadu&apos;s pioneering technology and career course centre, delivering practical, agency-style training in Digital Marketing and early AI innovation for school students.
            </p>

            {/* Academic Partner Highlight Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/95 to-slate-900/80 border border-amber-500/35 shadow-md max-w-sm flex items-center gap-3.5 group hover:border-amber-400/60 transition-all">
              <div className="p-1 rounded-xl bg-white shrink-0 shadow-sm">
                <img
                  src="/brand/partner-jaighurudeva.webp"
                  alt="Jaighurudeva Educational Academy"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="text-xs text-slate-300 leading-tight">
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 mb-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Academic Partner</span>
                </div>
                <strong className="text-white font-bold block text-[12px]">
                  Jaighurudeva Educational Academy
                </strong>
                <span className="text-[11px] text-slate-400">
                  Chennai &amp; Hyderabad Campuses
                </span>
              </div>
            </div>

            {/* Trust Metrics Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-semibold text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>500+ Trained</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Practical Labs</span>
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------------------
              COLUMN 2: DIGITAL MARKETING MASTERCLASS (2 cols)
              --------------------------------------------------------------- */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,120,0,0.8)]" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Digital Marketing
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  to="/digital-marketing-course"
                  onClick={scrollToTop}
                  className="text-slate-300 hover:text-amber-400 transition-colors font-medium flex items-center justify-between group"
                >
                  <span>3-Month Master Program</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                </Link>
              </li>
              <li>
                <Link
                  to="/digital-marketing-course"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-amber-400 transition-colors block"
                >
                  Google Ads &amp; PPC Mastery
                </Link>
              </li>
              <li>
                <Link
                  to="/digital-marketing-course"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-amber-400 transition-colors block"
                >
                  Meta Ads &amp; Social Funnels
                </Link>
              </li>
              <li>
                <Link
                  to="/digital-marketing-course"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-amber-400 transition-colors block"
                >
                  SEO &amp; Content Strategy
                </Link>
              </li>
              <li>
                <Link
                  to="/digital-marketing-course"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-amber-400 transition-colors block"
                >
                  GA4 &amp; Data Analytics
                </Link>
              </li>
              <li>
                <Link
                  to="/digital-marketing-course"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-amber-400 transition-colors block"
                >
                  AI Tools &amp; Automation
                </Link>
              </li>
              <li className="pt-2">
                <span className="inline-block text-[11px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-md">
                  Includes 1-Mo Live Internship
                </span>
              </li>
            </ul>
          </div>

          {/* ---------------------------------------------------------------
              COLUMN 3: AI SUPER KIDS PROGRAMME (2 cols)
              --------------------------------------------------------------- */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                AI Super Kids
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  to="/4-kids-chennai"
                  onClick={scrollToTop}
                  className="text-slate-300 hover:text-sky-400 transition-colors font-medium flex items-center justify-between group"
                >
                  <span>3 Grade Pathways</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-sky-400" />
                </Link>
              </li>
              <li>
                <Link
                  to="/4-kids-chennai"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-sky-400 transition-colors block"
                >
                  Grades 6–8: AI Innovators
                </Link>
              </li>
              <li>
                <Link
                  to="/4-kids-chennai"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-sky-400 transition-colors block"
                >
                  Grades 9–10: Entrepreneurs
                </Link>
              </li>
              <li>
                <Link
                  to="/4-kids-chennai"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-sky-400 transition-colors block"
                >
                  Grades 11–12: Future Leaders
                </Link>
              </li>
              <li>
                <Link
                  to="/4-kids-chennai"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-sky-400 transition-colors block"
                >
                  School Partnerships
                </Link>
              </li>
              <li>
                <Link
                  to="/4-kids-chennai"
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-sky-400 transition-colors block"
                >
                  Weekend Innovation Labs
                </Link>
              </li>
              <li className="pt-2">
                <span className="inline-block text-[11px] font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md">
                  School Weekend Batches
                </span>
              </li>
            </ul>
          </div>

          {/* ---------------------------------------------------------------
              COLUMN 4: PHYSICAL CAMPUSES & HOURS (2 cols)
              --------------------------------------------------------------- */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Campuses &amp; Hours
              </h4>
            </div>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block font-semibold">Anna Nagar (Chennai)</strong>
                  <span className="text-[11px] text-slate-400">3rd Ave, Kumaran Nagar</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block font-semibold">Korattur (Chennai)</strong>
                  <span className="text-[11px] text-slate-400">Gurudev Complex, 57th St</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block font-semibold">Ameerpet (Hyderabad)</strong>
                  <span className="text-[11px] text-slate-400">Pratap Nagar Colony</span>
                </div>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-slate-800">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-400 leading-snug">
                  <span className="text-slate-300 font-medium block">Mon – Sat: 9 AM – 7 PM</span>
                  <span>Sun: 10 AM – 4 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* ---------------------------------------------------------------
              COLUMN 5: DIRECT CONTACT & SOCIAL COMMUNITY (2 cols)
              --------------------------------------------------------------- */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Contact &amp; Connect
              </h4>
            </div>

            {/* Direct Phone & Email */}
            <div className="space-y-2 text-xs">
              <a
                href="tel:+918825948859"
                className="flex items-center gap-2 text-slate-200 hover:text-amber-400 transition-colors font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>+91 8825948859</span>
              </a>
              <a
                href="tel:+918490104605"
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-[11px]"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>+91 8490104605</span>
              </a>
              <a
                href="mailto:admissions@digitalghuru.com"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-[11px]"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">admissions@digitalghuru.com</span>
              </a>
            </div>

            {/* Branded Social Media Buttons */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
                Join Our Learning Community
              </span>
              <div className="flex items-center gap-2">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/digitalghuru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/digitalghuru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@digitalghuru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm transform hover:scale-110"
                  aria-label="YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/digitalghuru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-[#0A66C2] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Instant WhatsApp Help Card */}
            <div className="pt-2">
              <a
                href="https://wa.me/918825948859?text=Hello%20Digital%20Ghuru,%20I%20would%20like%20to%20know%20more%20about%20the%20courses"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all text-emerald-400"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-bold">Counselor Online</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

        </div>

        {/* =====================================================================
            FOOTER BOTTOM BAR: COPYRIGHT, PARTNER CREDITS & BACK TO TOP
            ===================================================================== */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="font-medium text-slate-300">
              &copy; 2026 Digital Ghuru Professional Course Centre. All Rights Reserved.
            </p>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-[11px] text-slate-400">
              In Academic Collaboration with Jaighurudeva Academy
            </span>
          </div>

          {/* Back to Top Smooth Scroll */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-400 text-xs font-semibold transition-all shadow-sm group focus:outline-none"
            title="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 text-amber-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
