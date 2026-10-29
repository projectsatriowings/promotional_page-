import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, Sparkles, LogIn } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'courses', 'campaign-showcase', 'learning-journey', 'curriculum', 'why-choose', 'about-us'];
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
    { name: 'Programs', href: '#courses', id: 'courses' },
    { name: 'Interactive Labs', href: '#campaign-showcase', id: 'campaign-showcase' },
    { name: 'Learning Roadmap', href: '#learning-journey', id: 'learning-journey' },
    { name: '12-Module Syllabus', href: '#curriculum', id: 'curriculum' },
    { name: 'Why DigitalGhuru', href: '#why-choose', id: 'why-choose' },
    { name: 'Campuses', href: '#about-us', id: 'about-us' },
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
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-3 shadow-xs'
            : 'bg-transparent py-4'
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
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl"
            >
              <img
                src="/brand/logo-navbar.webp"
                alt="DigitalGhuru Logo"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 leading-none">
                  Growth Marketing Studio
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  100% Placement • Chennai & Hyd
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 shadow-xs">
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
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              <a
                href="tel:+918825948859"
                className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 px-2 py-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-orange-600" />
                <span>+91 8825948859</span>
              </a>

              {/* Student Portal / Login Button */}
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-orange-600" />
                <span>Student Portal</span>
              </button>

              {/* Candidate Register Button */}
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-orange-800 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Apply / Register</span>
              </button>

              {/* Enrol / Brochure CTA */}
              <button
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 shadow-md shadow-orange-600/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Enrol Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
              </button>
            </div>

            {/* Mobile Actions & Menu Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenLogin}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200"
              >
                Portal
              </button>
              <button
                onClick={() => onOpenEnquiry()}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-orange-600"
              >
                Enrol
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white border-l border-slate-200 p-6 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <img
                  src="/brand/logo-navbar.webp"
                  alt="DigitalGhuru Logo"
                  className="h-9 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      activeSection === link.id
                        ? 'bg-orange-50 text-orange-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
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
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <span>Download Course Brochure</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-500">
                Anna Nagar • Korattur • Ameerpet • Live Online
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
