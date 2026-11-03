import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, ChevronDown, Check } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry?: () => void;
  activePage?: 'dm' | 'kids';
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, activePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isKidsPage =
    activePage === 'kids' ||
    location.pathname === '/4-kids-chennai' ||
    location.pathname === '/kids';

  const isDmPage = !isKidsPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScrollTo = (elementId: string) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    const target = document.getElementById(elementId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireClick = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    if (onOpenEnquiry) {
      onOpenEnquiry();
      return;
    }
    const enquiryEl = isKidsPage
      ? document.getElementById('enquiry-kids')
      : document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0B132B] text-white text-[11px] sm:text-xs font-semibold py-1.5 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-start to-brand-end animate-pulse" />
            <span className="truncate">
              {isKidsPage
                ? '🎈 Admissions open for 4 Kids Technology & AI Foundation — Weekend Batches!'
                : '🎓 Admissions open for Digital Marketing Master Program — Weekend & Weekday Batches!'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-300">
            <a
              href="tel:+918825948859"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>+91 8825948859</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/918825948859?text=Hello%20Digital%20Ghuru,%20I%20would%20like%20to%20enquire%20about%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`fixed top-7 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200/80 py-2.5'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Side: Brand Logo (Keeps user inside promotional site) */}
            <Link
              to={isKidsPage ? '/kids' : '/'}
              onClick={(e) => {
                if (location.pathname === (isKidsPage ? '/kids' : '/')) {
                  e.preventDefault();
                  const heroId = isKidsPage ? 'hero-kids' : 'hero';
                  const el = document.getElementById(heroId);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
              className="flex items-center gap-3 group focus:outline-none"
              title="Digital Ghuru Course Centre"
            >
              <img
                src="/brand/logo-navbar.webp"
                alt="Digital Ghuru Logo"
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/logo-final dG.webp';
                }}
              />
              <div className="hidden md:flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-start via-brand-mid to-brand-end leading-none">
                  Digital Ghuru
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  Professional Course Centre
                </span>
              </div>
            </Link>

            {/* Centre Navigation — Contextual to the Current Course */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
              {/* Home Link: Scrolls to top inside the promotional page */}
              <button
                type="button"
                onClick={() => {
                  const heroId = isKidsPage ? 'hero-kids' : 'hero';
                  const el = document.getElementById(heroId);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Scroll to Top"
              >
                Home
              </button>

              {/* Single Course Dropdown: Shows current course with dropdown to switch */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onMouseEnter={() => setDropdownOpen(true)}
                  className={`inline-flex items-center gap-1.5 py-1 text-sm font-bold transition-colors cursor-pointer group ${
                    isKidsPage
                      ? 'text-sky-600'
                      : 'text-orange-600'
                  }`}
                >
                  <span>{isKidsPage ? '4 Kids Course' : 'Digital Marketing'}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full ${
                      isKidsPage
                        ? 'bg-gradient-to-r from-sky-500 to-indigo-500'
                        : 'bg-gradient-to-r from-brand-start to-brand-end'
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2.5 z-50 animate-fade-in"
                  >
                    <div className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Select Course
                    </div>

                    {/* Option 1: Digital Marketing */}
                    <Link
                      to="/digital-marketing-course"
                      onClick={() => setDropdownOpen(false)}
                      className={`flex items-start justify-between px-3.5 py-2.5 hover:bg-orange-50/80 transition-colors rounded-xl mx-1.5 ${
                        isDmPage ? 'bg-orange-50/60' : ''
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Digital Marketing Course</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          For Students, Graduates & Professionals
                        </p>
                      </div>
                      {isDmPage && (
                        <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      )}
                    </Link>

                    {/* Option 2: 4 Kids Course */}
                    <Link
                      to="/kids"
                      onClick={() => setDropdownOpen(false)}
                      className={`flex items-start justify-between px-3.5 py-2.5 hover:bg-sky-50/80 transition-colors rounded-xl mx-1.5 ${
                        isKidsPage ? 'bg-sky-50/60' : ''
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>AI Super Kids (4 Kids)</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-100 text-sky-800">
                            Grades 6–12
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Innovators, Entrepreneurs & Future Leaders
                        </p>
                      </div>
                      {isKidsPage && (
                        <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      )}
                    </Link>
                  </div>
                )}
              </div>

              {/* Contextual Section Links for DIGITAL MARKETING */}
              {isDmPage && (
                <>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('curriculum')}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Curriculum
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('why-choose')}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Why Choose Us
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('about-course')}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('enquiry')}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Contact Us
                  </button>
                </>
              )}

              {/* Contextual Section Links for 4 KIDS COURSE */}
              {isKidsPage && (
                <>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('who-can-join-kids')}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Age Pathways
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('what-kids-learn')}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    What Kids Learn
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('why-choose-kids')}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Why Choose Us
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('about-kids')}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('faq-kids')}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Parent FAQs
                  </button>
                </>
              )}
            </nav>

            {/* Right Side: Enquire Now Button */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+918825948859"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-orange-600" />
                <span>+91 8825948859</span>
              </a>

              <button
                type="button"
                onClick={handleEnquireClick}
                className={`relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
                  isKidsPage
                    ? 'bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:brightness-105 shadow-sky-500/25 hover:shadow-sky-500/35'
                    : 'bg-gradient-to-r from-brand-start via-brand-mid to-brand-end hover:brightness-105 shadow-orange-500/25 hover:shadow-orange-500/35'
                }`}
              >
                <span className="relative z-10">Enquire Now</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Actions: Enquire + Hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={handleEnquireClick}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs ${
                  isKidsPage
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600'
                    : 'bg-gradient-to-r from-brand-start to-brand-end'
                }`}
              >
                Enquire
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-t border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const heroId = isKidsPage ? 'hero-kids' : 'hero';
                  const el = document.getElementById(heroId);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 block"
              >
                Home
              </button>

              {/* Course Switcher in Mobile */}
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 block">
                  Switch Course
                </span>
                <Link
                  to="/digital-marketing-course"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold ${
                    isDmPage
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : 'text-slate-700 hover:bg-white'
                  }`}
                >
                  <span>Digital Marketing Course</span>
                  {isDmPage ? <Check className="w-4 h-4 text-orange-600" /> : <ArrowRight className="w-3.5 h-3.5 text-slate-400" />}
                </Link>

                <Link
                  to="/kids"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold ${
                    isKidsPage
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : 'text-slate-700 hover:bg-white'
                  }`}
                >
                  <span>4 Kids Course (Grades 6–12)</span>
                  {isKidsPage ? <Check className="w-4 h-4 text-sky-600" /> : <Check className="w-3.5 h-3.5 text-slate-400" />}
                </Link>
              </div>

              {/* In-page Sections for Digital Marketing */}
              {isDmPage && (
                <>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('curriculum')}
                    className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Curriculum
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('why-choose')}
                    className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Why Choose Us
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('about-course')}
                    className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    About Us
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('enquiry')}
                    className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Contact Us
                  </button>
                </>
              )}

              {/* In-page Sections for 4 Kids */}
              {isKidsPage && (
                <>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('who-can-join-kids')}
                    className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Age Pathways
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('what-kids-learn')}
                    className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    What Kids Learn
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('why-choose-kids')}
                    className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Why Choose Us
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('about-kids')}
                    className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    About Us
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTo('faq-kids')}
                    className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Parent FAQs
                  </button>
                </>
              )}

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href="tel:+918825948859"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 border border-slate-200"
                >
                  <Phone className="w-4 h-4 text-orange-600" />
                  <span>Call: +91 8825948859</span>
                </a>
                <button
                  type="button"
                  onClick={handleEnquireClick}
                  className={`w-full py-3 rounded-xl text-sm font-extrabold text-white shadow-md text-center ${
                    isKidsPage
                      ? 'bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600'
                      : 'bg-gradient-to-r from-brand-start via-brand-mid to-brand-end'
                  }`}
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
