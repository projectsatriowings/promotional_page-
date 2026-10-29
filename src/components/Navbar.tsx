import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, User } from 'lucide-react';
import { DIGITALGHURU_CONTACT } from '../data/coursesData';

interface NavbarProps {
  onOpenEnquiry: (courseId?: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'courses', 'how-it-works', 'why-digitalghuru', 'about-us', 'learning-experience', 'parents'];
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
    { name: 'Three AI Courses', href: '#courses', id: 'courses' },
    { name: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { name: 'Why DigitalGhuru?', href: '#why-digitalghuru', id: 'why-digitalghuru' },
    { name: 'About Us', href: '#about-us', id: 'about-us' },
    { name: 'Student Projects', href: '#learning-experience', id: 'learning-experience' },
    { name: 'Parent Guide', href: '#parents', id: 'parents' },
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
                  AI Super Kids
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  Ages 6–12 Learning Pathways
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 bg-stone-100/90 p-1.5 rounded-full border border-stone-200/80 shadow-xs">
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
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
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
                href={`tel:${DIGITALGHURU_CONTACT.phone}`}
                className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-orange-600 px-2 py-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>+91 8825948859</span>
              </a>

              {/* Student / Parent Portal Trigger */}
              <button
                onClick={() => onOpenAuth('login')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-slate-700 bg-white hover:bg-stone-50 border border-stone-300 shadow-xs hover:border-orange-500 hover:text-orange-600 transition-all"
              >
                <User className="w-3.5 h-3.5 text-orange-500" />
                <span>Student Portal</span>
              </button>

              <button
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <span>Enrol Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-stone-300"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenEnquiry()}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] shadow-sm"
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
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF8F5] shadow-2xl p-6 flex flex-col justify-between border-l border-stone-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <img
                    src="/brand/favicon.svg"
                    alt="Logo"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-sm font-bold text-slate-900">
                    AI Super Kids
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-800"
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
                    className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-stone-200/70 hover:text-slate-900 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-200 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-stone-300 flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-orange-500" />
                <span>Student / Parent Portal</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 shadow-md shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                <span>Enrol Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-500">
                Support: +91 8825948859
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
