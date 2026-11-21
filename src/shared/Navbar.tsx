import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, Menu, X, ChevronDown } from 'lucide-react';
import { ROUTES } from '../routes';

interface NavbarProps {
  onOpenEnquiry?: () => void;
  activePage?: 'dm' | 'kids' | 'workshop';
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, activePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWorkshopDropdownOpen, setIsWorkshopDropdownOpen] = useState(false);
  const [isMobileWorkshopOpen, setIsMobileWorkshopOpen] = useState(false);
  const workshopRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  // Active state matching rules:
  // "Workshop" shows orange text + underline only when the current route starts with /workshop/
  const isWorkshopPage = location.pathname.startsWith('/workshop/');

  // Course links active states (only active when route exactly matches and not on workshop)
  const isDMPage =
    !isWorkshopPage &&
    (activePage === 'dm' ||
      location.pathname === ROUTES.DM_COURSE ||
      location.pathname === ROUTES.HOME ||
      location.pathname === '/digitalghuru');

  const isKidsPage =
    !isWorkshopPage &&
    (activePage === 'kids' ||
      location.pathname === ROUTES.KIDS_COURSE ||
      location.pathname === ROUTES.KIDS_ALIAS);

  // Workshop dropdown items exact matching:
  const isWorkshopDM =
    location.pathname === ROUTES.DM_WORKSHOP ||
    location.pathname === ROUTES.DM_WORKSHOP_ALIAS;

  const isWorkshopKids =
    location.pathname === ROUTES.KIDS_WORKSHOP ||
    location.pathname === '/workshop/kids' ||
    location.pathname === '/workshop/4-kids';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change; keep mobile workshop open if on workshop page
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsWorkshopDropdownOpen(false);
    if (location.pathname.startsWith('/workshop/')) {
      setIsMobileWorkshopOpen(true);
    }
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
  }, [location.pathname]);

  // Close menus on Escape key & Click Outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsWorkshopDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (workshopRef.current && !workshopRef.current.contains(e.target as Node)) {
        if (dropdownTimerRef.current) {
          clearTimeout(dropdownTimerRef.current);
          dropdownTimerRef.current = null;
        }
        setIsWorkshopDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
    };
  }, []);

  const handleWorkshopMouseEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setIsWorkshopDropdownOpen(true);
  };

  const handleWorkshopMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsWorkshopDropdownOpen(false);
    }, 150);
  };

  const handleWorkshopTriggerClick = () => {
    setIsWorkshopDropdownOpen((prev) => !prev);
  };

  const handleWorkshopKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsWorkshopDropdownOpen((prev) => !prev);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsWorkshopDropdownOpen(true);
      setTimeout(() => {
        firstItemRef.current?.focus();
      }, 50);
    }
  };

  const handleCourseSelect = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setIsWorkshopDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleEnquireClick = () => {
    setIsMobileMenuOpen(false);
    if (onOpenEnquiry) {
      onOpenEnquiry();
      return;
    }
    // On workshop pages, scroll smoothly to the in-page #register section
    if (isWorkshopPage) {
      const regEl = document.getElementById('register');
      if (regEl) {
        regEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    const targetId = isKidsPage
      ? 'enquiry-form-card-kids'
      : isWorkshopPage
      ? 'register'
      : 'enquiry-form-card';
    const fallbackId = isKidsPage
      ? 'enquiry-kids'
      : isWorkshopPage
      ? 'register'
      : 'enquiry';
    const el = document.getElementById(targetId) || document.getElementById(fallbackId);
    if (el) {
      const header = document.querySelector('header');
      const banner = header?.previousElementSibling as HTMLElement | null;
      const headerHeight = header ? header.getBoundingClientRect().height : 56;
      const bannerHeight = banner ? banner.getBoundingClientRect().height : 33;
      const navOffset = headerHeight + bannerHeight + 6;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Top Announcement Bar — Premium High-Impact Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#070D1E] via-[#0E1B3E] to-[#070D1E] text-white py-1.5 sm:py-2 px-3 sm:px-6 border-b border-indigo-500/20 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left / Info with Glowing Live Pulse & Gradient Pill */}
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Live Beacon */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-sm shadow-emerald-400" />
            </span>

            {/* Glowing Category Pill */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400/20 via-orange-500/20 to-amber-400/20 border border-amber-400/40 text-amber-300 shadow-xs shrink-0">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{isKidsPage ? 'Grades 6–12' : isWorkshopPage ? 'Masterclasses' : 'Career Program'}</span>
            </span>

            {/* Main Announcement Message */}
            <p className="text-[11px] sm:text-xs font-medium text-slate-200 truncate">
              {isKidsPage ? (
                <>
                  <span className="font-bold text-white">3 Kids Courses:</span>{' '}
                  <span className="text-amber-300 font-semibold">AI Innovators, Entrepreneurs & Future Leaders</span>{' '}
                  <span className="hidden md:inline text-slate-400">— Weekend Batches Enrolling Now!</span>
                </>
              ) : isWorkshopPage ? (
                <>
                  <span className="font-bold text-white">Hands-On Masterclasses:</span>{' '}
                  <span className="text-amber-300 font-semibold">Practical Generative AI & Performance Marketing</span>{' '}
                  <span className="hidden md:inline text-slate-400">— Weekend Cohorts Filling Fast!</span>
                </>
              ) : (
                <>
                  <span className="font-bold text-white">Master Digital Marketing:</span>{' '}
                  <span className="text-orange-300 font-semibold">Practical SEO, Meta & Google Ads</span>{' '}
                  <span className="hidden md:inline text-slate-400">— New Weekday & Weekend Batches Open!</span>
                </>
              )}
            </p>
          </div>

          {/* Right Action: Direct WhatsApp Pill with Emerald Glow */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/918825948859?text=Hello%20Digital%20Ghuru,%20I%20would%20like%20to%20enquire%20about%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-[11px] font-bold shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all transform hover:scale-105"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3 h-3 text-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`fixed top-[33px] sm:top-[37px] left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200/80 py-2 sm:py-2.5'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-2 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left End: Brand Logo (star icon + DIGITAL GHURU + Professional Course Centre) */}
            <Link
              to={isKidsPage ? ROUTES.KIDS_COURSE : isWorkshopPage ? ROUTES.DM_WORKSHOP : ROUTES.HOME}
              onClick={(e) => {
                if (location.pathname === (isKidsPage ? ROUTES.KIDS_COURSE : isWorkshopPage ? ROUTES.DM_WORKSHOP : ROUTES.HOME)) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0"
              title="Digital Ghuru Course Centre"
            >
              <img
                src="/brand/logo-navbar.webp"
                alt="Digital Ghuru Logo"
                className="h-10 sm:h-14 md:h-[54px] w-auto object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/logo-final dG.webp';
                }}
              />
              <div className="flex flex-col">
                <span className="text-sm sm:text-lg md:text-xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-start via-brand-mid to-brand-end leading-none">
                  Digital Ghuru
                </span>
                <span className="text-[10px] sm:text-xs md:text-[13px] font-semibold text-slate-600 mt-0.5 sm:mt-1 whitespace-nowrap">
                  Professional Course Centre
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Tabs (in exact required order) */}
            <nav
              className="hidden md:flex items-center gap-1.5 lg:gap-3"
              aria-label="Main Navigation"
            >
              {/* Tab 1: Digital Marketing Program */}
              <Link
                to={ROUTES.DM_COURSE}
                onClick={(e) => {
                  if (location.pathname === ROUTES.DM_COURSE || location.pathname === ROUTES.HOME) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`relative px-2.5 py-2 lg:px-3.5 lg:py-2.5 text-xs lg:text-[13.5px] font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap ${
                  isDMPage
                    ? 'text-[#F04E00] font-bold'
                    : 'text-[#231A38] hover:text-[#F04E00]'
                }`}
                aria-current={isDMPage ? 'page' : undefined}
              >
                <span>Digital Marketing Program</span>
                {isDMPage && (
                  <span
                    className="absolute bottom-0 left-2 lg:left-3 right-2 lg:right-3 h-[2.5px] bg-gradient-to-r from-brand-start via-brand-mid to-brand-end rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>

              {/* Tab 2: 3 Kids AI & Tech Program */}
              <Link
                to={ROUTES.KIDS_COURSE}
                onClick={(e) => {
                  if (location.pathname === ROUTES.KIDS_COURSE || location.pathname === ROUTES.KIDS_ALIAS) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`relative px-2.5 py-2 lg:px-3.5 lg:py-2.5 text-xs lg:text-[13.5px] font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap ${
                  isKidsPage
                    ? 'text-[#F04E00] font-bold'
                    : 'text-[#231A38] hover:text-[#F04E00]'
                }`}
                aria-current={isKidsPage ? 'page' : undefined}
              >
                <span>3 Kids AI & Tech Program</span>
                {isKidsPage && (
                  <span
                    className="absolute bottom-0 left-2 lg:left-3 right-2 lg:right-3 h-[2.5px] bg-gradient-to-r from-brand-start via-brand-mid to-brand-end rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>

              {/* Tab 3: Workshop Dropdown Trigger (Button only, not a link) */}
              <div
                ref={workshopRef}
                className="relative"
                onMouseEnter={handleWorkshopMouseEnter}
                onMouseLeave={handleWorkshopMouseLeave}
              >
                <button
                  type="button"
                  onClick={handleWorkshopTriggerClick}
                  onKeyDown={handleWorkshopKeyDown}
                  aria-haspopup="menu"
                  aria-expanded={isWorkshopDropdownOpen}
                  aria-label="Workshop tracks"
                  className={`inline-flex items-center gap-1 relative px-2.5 py-2 lg:px-3.5 lg:py-2.5 text-xs lg:text-[13.5px] font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                    isWorkshopPage
                      ? 'text-[#F04E00] font-bold'
                      : 'text-[#231A38] hover:text-[#F04E00]'
                  }`}
                >
                  <span>Workshop</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isWorkshopDropdownOpen
                        ? 'rotate-180 text-[#F04E00]'
                        : 'text-slate-400 group-hover:text-[#F04E00]'
                    }`}
                    aria-hidden="true"
                  />
                  {isWorkshopPage && (
                    <span
                      className="absolute bottom-0 left-2 lg:left-3 right-2 lg:right-3 h-[2.5px] bg-gradient-to-r from-brand-start via-brand-mid to-brand-end rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>

                {/* Sub-tabs Dropdown Menu with Seamless Hover Bridge */}
                {isWorkshopDropdownOpen && (
                  <div
                    className="absolute top-full left-0 pt-1.5 w-64 z-50 pointer-events-auto"
                    role="menu"
                    aria-label="Workshop tracks"
                  >
                    {/* Invisible hover bridge to eliminate any gap between trigger and panel */}
                    <div className="absolute -top-2 left-0 right-0 h-3" aria-hidden="true" />

                    <div className="w-full rounded-2xl bg-white/98 backdrop-blur-xl border border-slate-200/90 shadow-xl p-2 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Workshop Tracks
                      </div>

                      {/* Sub-tab 1: Digital Marketing */}
                      <Link
                        ref={firstItemRef}
                        to={ROUTES.DM_WORKSHOP}
                        onClick={handleCourseSelect}
                        role="menuitem"
                        className={`flex flex-col px-3 py-2 rounded-xl transition-all duration-150 ${
                          isWorkshopDM
                            ? 'bg-orange-50/90 text-[#F04E00]'
                            : 'text-[#231A38] hover:bg-slate-50 hover:text-[#F04E00]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">Digital Marketing</span>
                          {isWorkshopDM && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F04E00]" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 mt-0.5 font-normal">
                          AI Tools, Paid Ads & SEO Masterclasses
                        </span>
                      </Link>

                      {/* Sub-tab 2: 3 Kids AI and Tech Program */}
                      <Link
                        to={ROUTES.KIDS_WORKSHOP}
                        onClick={handleCourseSelect}
                        role="menuitem"
                        className={`flex flex-col px-3 py-2 rounded-xl transition-all duration-150 mt-1 ${
                          isWorkshopKids
                            ? 'bg-orange-50/90 text-[#F04E00]'
                            : 'text-[#231A38] hover:bg-slate-50 hover:text-[#F04E00]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">3 Kids AI and Tech Program</span>
                          {isWorkshopKids && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F04E00]" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 mt-0.5 font-normal">
                          Coding, Robotics & Creative AI for Kids
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right End: Enquire Now Button & Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={handleEnquireClick}
                className="relative group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-extrabold text-white overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shrink-0 bg-gradient-to-r from-brand-start via-brand-mid to-brand-end hover:brightness-105 shadow-orange-500/25 hover:shadow-orange-500/35"
              >
                <span className="relative z-10 whitespace-nowrap">Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-transform group-hover:translate-x-0.5 shrink-0" />
              </button>

              {/* Mobile Hamburger Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-[#231A38] hover:text-[#F04E00] hover:bg-orange-50/80 transition-colors focus:outline-none cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/98 backdrop-blur-2xl shadow-xl px-4 pt-3 pb-4 space-y-1.5 mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Programs & Navigation
            </div>

            {/* Tab 1: Digital Marketing */}
            <Link
              to={ROUTES.DM_COURSE}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-tight transition-colors duration-200 ${
                isDMPage ? 'text-[#F04E00] font-bold' : 'text-[#231A38] hover:text-[#F04E00]'
              }`}
            >
              <span>Digital Marketing Program</span>
              {isDMPage && <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-start to-brand-end" />}
            </Link>

            {/* Tab 2: 3 Kids AI & Tech */}
            <Link
              to={ROUTES.KIDS_COURSE}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-tight transition-colors duration-200 ${
                isKidsPage ? 'text-[#F04E00] font-bold' : 'text-[#231A38] hover:text-[#F04E00]'
              }`}
            >
              <span>3 Kids AI & Tech Program</span>
              {isKidsPage && <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-start to-brand-end" />}
            </Link>

            {/* Tab 3: Workshop Accordion Item (Button only, expands/collapses inline) */}
            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => setIsMobileWorkshopOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={isMobileWorkshopOpen}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-tight transition-colors duration-200 cursor-pointer ${
                  isWorkshopPage ? 'text-[#F04E00] font-bold' : 'text-[#231A38] hover:text-[#F04E00]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>Workshop</span>
                  {isWorkshopPage && <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-start to-brand-end" />}
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMobileWorkshopOpen ? 'rotate-180 text-[#F04E00]' : 'text-slate-400'
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Sub-tabs under Workshop (Accordion) */}
              {isMobileWorkshopOpen && (
                <div className="ml-3 pl-3 border-l-2 border-orange-200/80 space-y-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    to={ROUTES.DM_WORKSHOP}
                    onClick={handleCourseSelect}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold tracking-tight transition-colors duration-200 ${
                      isWorkshopDM ? 'text-[#F04E00] font-bold bg-orange-50/80' : 'text-slate-600 hover:text-[#F04E00]'
                    }`}
                  >
                    <span>↳ Digital Marketing</span>
                    {isWorkshopDM && <span className="w-1.5 h-1.5 rounded-full bg-[#F04E00]" />}
                  </Link>

                  <Link
                    to={ROUTES.KIDS_WORKSHOP}
                    onClick={handleCourseSelect}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold tracking-tight transition-colors duration-200 ${
                      isWorkshopKids ? 'text-[#F04E00] font-bold bg-orange-50/80' : 'text-slate-600 hover:text-[#F04E00]'
                    }`}
                  >
                    <span>↳ 3 Kids AI and Tech Program</span>
                    {isWorkshopKids && <span className="w-1.5 h-1.5 rounded-full bg-[#F04E00]" />}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
