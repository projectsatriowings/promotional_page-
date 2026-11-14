import React, { useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useSharedCountdown, setSharedCountdownDeadline } from './useSharedCountdown';

export interface StickyOfferBarProps {
  /** Optional configurable offer deadline timestamp, ISO string, or Date */
  endDate?: Date | string | number;
  /** Configurable duration in minutes if no deadline has been stored yet */
  initialMinutes?: number;
  /** Primary callback when user clicks Reserve Seat or promotional copy to smoothly scroll to admissions form */
  onReserveSeat?: () => void;
  /** Deprecated legacy alias for onReserveSeat */
  onOpenEnquiry?: () => void;
  /** Custom class names if needed */
  className?: string;
}

export const StickyOfferBar: React.FC<StickyOfferBarProps> = ({
  endDate,
  onReserveSeat,
  onOpenEnquiry,
  className = '',
}) => {
  // Synchronized countdown from single shared source
  const { formattedMin, formattedSec, isExpired } = useSharedCountdown();

  // If a custom endDate is explicitly provided, update the shared countdown deadline
  useEffect(() => {
    if (endDate) {
      const parsed = new Date(endDate).getTime();
      if (!isNaN(parsed)) {
        setSharedCountdownDeadline(parsed);
      }
    }
  }, [endDate]);

  const handleAction = () => {
    if (onReserveSeat) {
      onReserveSeat();
      return;
    }
    if (onOpenEnquiry) {
      onOpenEnquiry();
      return;
    }
    // Default fallback: scroll smoothly directly to enquiry form card
    const enquiryEl =
      document.getElementById('enquiry-form-card') ||
      document.getElementById('enquiry-form-card-kids') ||
      document.getElementById('enquiry') ||
      document.getElementById('enquiry-kids');
    if (enquiryEl) {
      const header = document.querySelector('header');
      const banner = header?.previousElementSibling as HTMLElement | null;
      const headerHeight = header ? header.getBoundingClientRect().height : 56;
      const bannerHeight = banner ? banner.getBoundingClientRect().height : 33;
      const navOffset = headerHeight + bannerHeight + 6;
      const elementPosition = enquiryEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: 'smooth',
      });
    }
  };

  return (
    <aside
      aria-label="Limited Time Counselling Offer"
      className={`fixed bottom-0 left-0 right-0 z-40 w-full select-none transition-transform duration-300 shadow-[0_-4px_20px_rgba(244,81,0,0.3)] border-t border-white/20 ${className}`}
      style={{
        background: 'linear-gradient(90deg, #FF7900 0%, #F45100 100%)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full">
        
        {/* ==============================================================
            MOBILE VIEW (Screens < 640px): Compact Two-Row Offer Bar
            Height: ~76-85px, Two Distinct Balanced Rows
            ============================================================== */}
        <div className="flex sm:hidden flex-col justify-center py-2 gap-1.5 w-full min-h-[76px] max-h-[85px]">
          
          {/* Row 1 - Offer heading & Direct countdown (no white cards) */}
          <div className="flex items-center justify-between w-full">
            <h3 className="text-white font-extrabold text-[12.5px] tracking-tight leading-none m-0 whitespace-nowrap">
              Free counselling offer ends in
            </h3>

            {/* Direct countdown on orange background */}
            <div
              className="flex items-center gap-1.5 shrink-0"
              aria-label={`Time remaining: ${formattedMin} minutes and ${formattedSec} seconds`}
            >
              <div className="flex flex-col items-center justify-center leading-none">
                <span className="text-[17px] font-black text-white leading-none tracking-tight">
                  {formattedMin}
                </span>
                <span className="text-[7px] font-extrabold text-white/85 uppercase tracking-widest mt-0.5">
                  MIN
                </span>
              </div>

              <span className="text-white font-black text-sm leading-none select-none pb-1" aria-hidden="true">
                :
              </span>

              <div className="flex flex-col items-center justify-center leading-none">
                <span className="text-[17px] font-black text-white leading-none tracking-tight">
                  {formattedSec}
                </span>
                <span className="text-[7px] font-extrabold text-white/85 uppercase tracking-widest mt-0.5">
                  SEC
                </span>
              </div>
            </div>
          </div>

          {/* Row 2 - Promotional message and Reserve Seat button */}
          <div className="flex items-center justify-between w-full gap-2">
            {isExpired ? (
              <p className="text-white text-[11px] font-bold tracking-tight m-0 truncate leading-tight flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-200 shrink-0" />
                <span className="truncate">Special batch filling fast</span>
              </p>
            ) : (
              <p
                onClick={handleAction}
                className="text-white text-[11.5px] font-bold tracking-tight m-0 cursor-pointer hover:underline transition-all truncate leading-tight"
              >
                Get the full syllabus free
              </p>
            )}

            {/* Small white rounded button: Reserve Seat → */}
            <button
              type="button"
              onClick={handleAction}
              aria-label="Reserve Seat"
              className="h-[32px] inline-flex items-center gap-1 px-3 rounded-full bg-white text-[#F45100] font-extrabold text-xs shadow-xs hover:bg-orange-50 active:scale-95 transition cursor-pointer whitespace-nowrap shrink-0 group"
            >
              <span>Reserve Seat</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* ==============================================================
            DESKTOP / TABLET VIEW (Screens >= 640px): Unchanged Single Row
            ============================================================== */}
        <div className="hidden sm:flex w-full h-[68px] min-h-[68px] max-h-[70px] items-center justify-between gap-4 lg:gap-6 py-0">
          
          {/* Left Section: Heading & Live Countdown Boxes (Vertically Centered) */}
          <div className="flex items-center justify-start gap-3 sm:gap-4 shrink-0">
            <h3 className="text-white font-extrabold text-sm lg:text-[15px] tracking-tight leading-none m-0 whitespace-nowrap">
              Free counselling offer ends in
            </h3>

            {/* Countdown Boxes (52-54px high on desktop) */}
            <div
              className="flex items-center gap-1.5 sm:gap-2 shrink-0"
              aria-label={`Time remaining: ${formattedMin} minutes and ${formattedSec} seconds`}
            >
              {/* Minutes Box */}
              <div className="bg-white rounded-xl shadow-sm w-[50px] h-[52px] lg:w-[52px] lg:h-[54px] p-1 flex flex-col items-center justify-center shrink-0">
                <span className="text-lg sm:text-[22px] font-black text-[#0B132B] leading-none tracking-tight">
                  {formattedMin}
                </span>
                <span className="text-[8px] lg:text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest mt-0.5">
                  MIN
                </span>
              </div>

              {/* Colon separator vertically centered */}
              <span className="text-white font-black text-base sm:text-lg lg:text-xl leading-none select-none" aria-hidden="true">
                :
              </span>

              {/* Seconds Box */}
              <div className="bg-white rounded-xl shadow-sm w-[50px] h-[52px] lg:w-[52px] lg:h-[54px] p-1 flex flex-col items-center justify-center shrink-0">
                <span className="text-lg sm:text-[22px] font-black text-[#0B132B] leading-none tracking-tight">
                  {formattedSec}
                </span>
                <span className="text-[8px] lg:text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest mt-0.5">
                  SEC
                </span>
              </div>
            </div>
          </div>

          {/* Right Section: Promotional message & Reserve Seat Button (Vertically Centered) */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-4 shrink-0">
            {isExpired ? (
              <p className="text-white text-xs sm:text-sm font-bold tracking-tight m-0 flex items-center gap-1.5 leading-none">
                <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                <span>Special offer batch filling fast · Reserve your seat today</span>
              </p>
            ) : (
              <p
                onClick={handleAction}
                className="text-white text-xs md:text-sm lg:text-[15px] font-bold tracking-tight m-0 cursor-pointer hover:underline transition-all leading-none"
              >
                Book now and get the full syllabus free
              </p>
            )}

            {/* Clickable 44px Reserve Seat button */}
            <button
              type="button"
              onClick={handleAction}
              aria-label="Reserve My Seat"
              className="h-[44px] inline-flex items-center gap-1.5 px-4 lg:px-5 rounded-xl bg-white text-[#F45100] font-extrabold text-xs sm:text-sm shadow-sm hover:bg-orange-50 active:scale-95 transition cursor-pointer whitespace-nowrap group shrink-0"
            >
              <span>Reserve Seat</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </aside>
  );
};

export default StickyOfferBar;

