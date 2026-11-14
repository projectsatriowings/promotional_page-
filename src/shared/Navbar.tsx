import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry?: () => void;
  activePage?: 'dm' | 'kids';
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, activePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isKidsPage =
    activePage === 'kids' ||
    location.pathname === '/4-kids-chennai' ||
    location.pathname === '/kids';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnquireClick = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
      return;
    }
    const targetId = isKidsPage ? 'enquiry-form-card-kids' : 'enquiry-form-card';
    const fallbackId = isKidsPage ? 'enquiry-kids' : 'enquiry';
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
              <span>{isKidsPage ? 'Grades 6–12' : 'Career Program'}</span>
            </span>

            {/* Main Announcement Message */}
            <p className="text-[11px] sm:text-xs font-medium text-slate-200 truncate">
              {isKidsPage ? (
                <>
                  <span className="font-bold text-white">3 Kids Courses:</span>{' '}
                  <span className="text-amber-300 font-semibold">AI Innovators, Entrepreneurs & Future Leaders</span>{' '}
                  <span className="hidden md:inline text-slate-400">— Weekend Batches Enrolling Now!</span>
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
          <div className="flex items-center justify-between gap-3">
            {/* Left End: Brand Logo (star icon + DIGITAL GHURU + Professional Course Centre) */}
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
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0"
              title="Digital Ghuru Course Centre"
            >
              <img
                src="/brand/logo-navbar.webp"
                alt="Digital Ghuru Logo"
                className="h-10 sm:h-14 md:h-[58px] w-auto object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
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

            {/* Right End: Enquire Now Button */}
            <button
              type="button"
              onClick={handleEnquireClick}
              className="relative group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-extrabold text-white overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shrink-0 bg-gradient-to-r from-brand-start via-brand-mid to-brand-end hover:brightness-105 shadow-orange-500/25 hover:shadow-orange-500/35"
            >
              <span className="relative z-10 whitespace-nowrap">Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-transform group-hover:translate-x-0.5 shrink-0" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
