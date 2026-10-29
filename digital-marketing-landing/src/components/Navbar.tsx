import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: (courseId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'courses', 'curriculum', 'why-choose', 'about-us', 'projects'];
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
    { name: 'About', href: '#about-us', id: 'about-us' },
    { name: 'Why DigitalGhuru', href: '#why-choose', id: 'why-choose' },
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
      {/* Top announcement strip */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0B132B] text-white text-[11px] font-semibold text-center py-1.5 tracking-wide overflow-hidden">
        <div className="flex items-center justify-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
          <span>🎓 Next batch starting soon — Limited seats available!</span>
          <span className="hidden sm:inline text-orange-400 font-bold cursor-pointer hover:underline" onClick={() => onOpenEnquiry()}>
            Reserve your spot →
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
  className="fixed top-7 left-0 right-0 z-40 w-full"
>
  <div className="w-full px-0 pt-0">
    <div
      className={`flex w-full items-center justify-between transition-all duration-500 rounded-none px-4 sm:px-6 lg:px-10 py-2.5 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-xl shadow-slate-200/60 border-b border-slate-100'
          : 'bg-white/80 backdrop-blur-md shadow-md border-b border-white/60'
      }`}
    >
            {/* Logo */}
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
                  className="h-10 sm:h-19 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-orange-400/40 ring-offset-1" />
              </div>
            </a>

            {/* Desktop Nav — pill-less, underline style */}
            <nav className="hidden lg:flex items-center gap-10 ">
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
                    className="relative px-3.5 py-2 text-[19px] font-semibold tracking-wide transition-colors duration-200 group"
                    style={{
                      color: isActive ? '#EA580C' : isHovered ? '#0B132B' : '#64748b',
                    }}
                  >
                    {link.name}
                    {/* Active / hover underline */}
                    <span
                      className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full transition-all duration-300 origin-left"
                      style={{
                        background: 'linear-gradient(to right, #EA580C, #F59E0B)',
                        transform: isActive ? 'scaleX(1)' : isHovered ? 'scaleX(0.7)' : 'scaleX(0)',
                        opacity: isActive ? 1 : isHovered ? 0.6 : 0,
                      }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Enrol CTA — split button style */}
              <button
                onClick={() => onOpenEnquiry()}
                className="group relative inline-flex items-center gap-2 pl-5 pr-4 py-2.5 rounded-xl text-[12px] font-black text-white overflow-hidden shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                style={{ background: 'linear-gradient(135deg, #EA580C 0%, #F59E0B 100%)' }}
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />
                <span className="relative z-10">Enrol Now</span>
                <span className="relative z-10 w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            </div>

            {/* Mobile toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => onOpenEnquiry()}
                className="px-4 py-1.5 rounded-xl text-[12px] font-black text-white shadow-md"
                style={{ background: 'linear-gradient(135deg, #EA580C, #F59E0B)' }}
              >
                Enrol
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
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
            className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm flex flex-col"
            style={{ background: '#FFFDF9' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel header */}
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
              {navLinks.map((link, i) => {
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
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-500/30'
                        : 'text-slate-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <ArrowRight className="w-4 h-4 opacity-80" />}
                  </a>
                );
              })}
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
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-black text-sm shadow-lg shadow-orange-500/30"
                style={{ background: 'linear-gradient(135deg, #EA580C 0%, #F59E0B 100%)' }}
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
