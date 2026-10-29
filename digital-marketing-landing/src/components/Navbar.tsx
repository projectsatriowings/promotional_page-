import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, Sparkles, LogIn, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: (courseId?: string) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenEnquiry,
  onOpenLogin,
  onOpenRegister,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'courses', 'campaign-showcase', 'curriculum', 'why-choose', 'about-us', 'projects'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Programs', href: '#courses', id: 'courses' },
    { name: 'Interactive Labs', href: '#campaign-showcase', id: 'campaign-showcase' },
    { name: 'Curriculum', href: '#curriculum', id: 'curriculum' },
    { name: 'Why DigitalGhuru', href: '#why-choose', id: 'why-choose' },
    { name: 'About & Campuses', href: '#about-us', id: 'about-us' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top announcement strip from teammate */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0B132B] text-white text-[11px] font-semibold text-center py-1.5 tracking-wide overflow-hidden shadow-xs">
        <div className="flex items-center justify-center gap-3 px-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FFA800] to-[#FF5200] animate-pulse inline-block" />
          <span>🎓 Next batch starting soon — Limited seats available!</span>
          <span 
            className="hidden sm:inline text-amber-400 font-bold cursor-pointer hover:underline" 
            onClick={() => onOpenEnquiry()}
          >
            Reserve your spot →
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed top-7 left-0 right-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-100 py-2.5'
            : 'bg-white/80 backdrop-blur-md border-b border-white/60 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Tag */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative">
                <img
                  src="/brand/logo-navbar.webp"
                  alt="DigitalGhuru Logo"
                  className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-orange-400/40 ring-offset-1 pointer-events-none" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] leading-none">
                  Growth Marketing Studio
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  100% Placement • Chennai & Hyd
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links with animated indicator */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const isHovered = hoveredLink === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative px-1 py-1.5 text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                      isActive 
                        ? 'text-orange-600 font-bold' 
                        : isHovered 
                        ? 'text-[#0B132B]' 
                        : 'text-slate-600'
                    }`}
                  >
                    {link.name}
                    {/* Active / hover animated underline */}
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full transition-all duration-300 origin-left"
                      style={{
                        background: 'linear-gradient(to right, #FFA800, #FF5200)',
                        transform: isActive ? 'scaleX(1)' : isHovered ? 'scaleX(0.7)' : 'scaleX(0)',
                        opacity: isActive ? 1 : isHovered ? 0.7 : 0,
                      }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center gap-2 xl:gap-3">
              <a
                href="tel:+918825948859"
                className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 px-2 py-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>+91 8825948859</span>
              </a>

              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 shadow-2xs hover:border-orange-300 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-orange-600" />
                <span>Student Portal</span>
              </button>

              <button
                onClick={onOpenRegister}
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100/80 border border-orange-200/80 shadow-2xs transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Apply Cohort</span>
              </button>

              {/* Enrol CTA with shimmer sweep and signature gradient */}
              <button
                onClick={() => onOpenEnquiry()}
                className="group relative inline-flex items-center gap-2 pl-4 pr-3.5 py-2 rounded-xl text-xs font-extrabold text-white overflow-hidden shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 cursor-pointer"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />
                <span className="relative z-10">Enrol Now</span>
                <span className="relative z-10 w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white" />
                </span>
              </button>
            </div>

            {/* Mobile Actions & Menu Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenLogin}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200"
              >
                Portal
              </button>
              <button
                onClick={() => onOpenEnquiry()}
                className="px-3.5 py-1.5 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] shadow-xs"
              >
                Enrol
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0B132B]/70 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm flex flex-col shadow-2xl"
            style={{ background: '#FFFDF9' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel header from teammate */}
            <div
              className="flex items-center justify-between p-5 pb-4"
              style={{ background: 'linear-gradient(135deg, #0B132B 0%, #1C2541 100%)' }}
            >
              <img
                src="/brand/logo-navbar.webp"
                alt="DigitalGhuru Logo"
                className="h-9 w-auto object-contain brightness-[2]"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] text-white shadow-md shadow-orange-500/25 font-bold'
                        : 'text-slate-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <ArrowRight className="w-4 h-4 opacity-90" />}
                  </a>
                );
              })}

              <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs"
                >
                  <LogIn className="w-4 h-4 text-orange-600" />
                  <span>Student Portal Sign In</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 font-bold text-xs"
                >
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span>Apply & Register For Cohort</span>
                </button>
              </div>
            </nav>

            {/* Panel footer */}
            <div className="p-4 border-t border-stone-200 space-y-3">
              <a
                href="tel:+918825948859"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 hover:border-orange-300"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-orange-600" />
                </div>
                +91 8825948859
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-black text-sm shadow-lg shadow-orange-500/25 bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105"
              >
                <span>Download Course Brochure</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://digitalghuru.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-orange-600 transition-colors"
              >
                <span>Visit digitalghuru.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <p className="text-[10px] text-center text-slate-400">
                Chennai & Hyderabad Campuses • Live Online
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
