import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: (courseId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
    { name: 'Programs', href: '#courses', id: 'courses' },
    { name: '12-Module Syllabus', href: '#curriculum', id: 'curriculum' },
    { name: 'Why DigitalGhuru', href: '#why-choose', id: 'why-choose' },
    { name: 'About Institute', href: '#about-us', id: 'about-us' },
    { name: 'Live Projects', href: '#projects', id: 'projects' },
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
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-stone-200/90 py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Official DigitalGhuru Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl py-1"
            >
              <img
                src="/brand/logo-navbar.webp"
                alt="DigitalGhuru Logo"
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 leading-none">
                  AI Marketing Institute
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  100% Placement & Agency Training
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-stone-100/90 p-1.5 rounded-full border border-stone-200/80 shadow-xs">
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
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+918825948859"
                className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-orange-600 px-2 py-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>+91 8825948859</span>
              </a>

              <a
                href="#curriculum"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#curriculum');
                }}
                className="text-xs font-bold text-slate-700 hover:text-orange-600 px-3 py-2 transition-colors"
              >
                View Syllabus
              </a>

              <button
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <span>Enrol Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => onOpenEnquiry()}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-orange-600"
              >
                Enrol
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-xl text-slate-700 hover:bg-stone-100 focus:outline-none"
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
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-stone-100">
                <img
                  src="/brand/logo-navbar.webp"
                  alt="DigitalGhuru Logo"
                  className="h-10 w-auto object-contain"
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
                        : 'text-slate-700 hover:bg-stone-50'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-100 space-y-3">
              <a
                href="https://digitalghuru.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-orange-600"
              >
                <span>Visit digitalghuru.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-600 text-white font-bold text-sm shadow-md"
              >
                <span>Download Course Brochure</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-400">
                Chennai & Hyderabad Campuses • Live Online
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

