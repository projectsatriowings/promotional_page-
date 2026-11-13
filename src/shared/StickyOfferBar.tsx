import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'dg_counselling_offer_deadline';
const DEFAULT_DURATION_MS = 15 * 60 * 1000; // 15 minutes persistent timer

export interface StickyOfferBarProps {
  /** Optional configurable offer deadline timestamp, ISO string, or Date */
  endDate?: Date | string | number;
  /** Configurable duration in minutes if no deadline has been stored yet */
  initialMinutes?: number;
  /** Optional callback to open enquiry popup or scroll to admissions form */
  onOpenEnquiry?: () => void;
  /** Custom class names if needed */
  className?: string;
}

export const StickyOfferBar: React.FC<StickyOfferBarProps> = ({
  endDate,
  initialMinutes = 15,
  onOpenEnquiry,
  className = '',
}) => {
  // Compute initial target timestamp stored in localStorage so it stays synchronized across refreshes
  const getTargetTimestamp = useCallback((): number => {
    if (endDate) {
      const parsed = new Date(endDate).getTime();
      if (!isNaN(parsed)) return parsed;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed > Date.now()) {
          return parsed;
        }
      }
      // Generate new synchronized deadline
      const duration = (initialMinutes || 15) * 60 * 1000;
      const newDeadline = Date.now() + duration;
      localStorage.setItem(STORAGE_KEY, String(newDeadline));
      return newDeadline;
    } catch {
      return Date.now() + (initialMinutes || 15) * 60 * 1000;
    }
  }, [endDate, initialMinutes]);

  const [targetTime] = useState<number>(getTargetTimestamp);
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>(() => {
    const diff = Math.max(0, targetTime - Date.now());
    return {
      minutes: Math.floor(diff / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  });
  const [isExpired, setIsExpired] = useState<boolean>(() => targetTime <= Date.now());

  // Real-time ticking countdown
  useEffect(() => {
    if (isExpired) return;

    const tick = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ minutes: 0, seconds: 0 });
        setIsExpired(true);
        return;
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ minutes, seconds });
    };

    tick();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [targetTime, isExpired]);

  const formattedMin = String(timeLeft.minutes).padStart(2, '0');
  const formattedSec = String(timeLeft.seconds).padStart(2, '0');

  const handleAction = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
      return;
    }
    // Default fallback: scroll to enquiry section
    const enquiryEl = document.getElementById('enquiry') || document.getElementById('enquiry-kids');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full h-auto md:h-[68px] min-h-[64px] md:min-h-[68px] max-h-none md:max-h-[70px] flex items-center justify-between py-1.5 md:py-0">
        
        {/* Responsive Container: Single Horizontal Row on Desktop/Tablet, Compact on Mobile */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-4 lg:gap-6">
          
          {/* Left Section: Heading & Live Countdown Boxes (Vertically Centered) */}
          <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-3 sm:gap-4 shrink-0">
            <h3 className="text-white font-extrabold text-xs sm:text-sm lg:text-[15px] tracking-tight leading-none m-0 whitespace-nowrap">
              Free counselling offer ends in
            </h3>

            {/* Countdown Boxes (52-54px high on desktop, 42px on mobile) */}
            <div
              className="flex items-center gap-1.5 sm:gap-2 shrink-0"
              aria-label={`Time remaining: ${formattedMin} minutes and ${formattedSec} seconds`}
            >
              {/* Minutes Box */}
              <div className="bg-white rounded-xl shadow-sm w-[44px] h-[42px] sm:w-[50px] sm:h-[52px] lg:w-[52px] lg:h-[54px] p-0.5 sm:p-1 flex flex-col items-center justify-center shrink-0">
                <span className="text-lg sm:text-[22px] font-black text-[#0B132B] leading-none tracking-tight">
                  {formattedMin}
                </span>
                <span className="text-[7px] sm:text-[8px] lg:text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest mt-0.5">
                  MIN
                </span>
              </div>

              {/* Colon separator vertically centered */}
              <span className="text-white font-black text-base sm:text-lg lg:text-xl leading-none select-none" aria-hidden="true">
                :
              </span>

              {/* Seconds Box */}
              <div className="bg-white rounded-xl shadow-sm w-[44px] h-[42px] sm:w-[50px] sm:h-[52px] lg:w-[52px] lg:h-[54px] p-0.5 sm:p-1 flex flex-col items-center justify-center shrink-0">
                <span className="text-lg sm:text-[22px] font-black text-[#0B132B] leading-none tracking-tight">
                  {formattedSec}
                </span>
                <span className="text-[7px] sm:text-[8px] lg:text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest mt-0.5">
                  SEC
                </span>
              </div>
            </div>
          </div>

          {/* Right Section: Promotional message & Reserve Seat Button (Vertically Centered) */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-2.5 sm:gap-4 shrink-0">
            {isExpired ? (
              <p className="text-white text-xs sm:text-sm font-bold tracking-tight m-0 flex items-center gap-1.5 leading-none">
                <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                <span>Special offer batch filling fast · Reserve your seat today</span>
              </p>
            ) : (
              <p
                onClick={handleAction}
                className="text-white text-[11.5px] sm:text-xs md:text-sm lg:text-[15px] font-bold tracking-tight m-0 cursor-pointer hover:underline transition-all leading-none"
              >
                Book now and get the full syllabus free
              </p>
            )}

            {/* Clickable 44px Reserve Seat button */}
            <button
              type="button"
              onClick={handleAction}
              aria-label="Reserve My Seat"
              className="h-[36px] sm:h-[44px] inline-flex items-center gap-1.5 px-3.5 sm:px-4 lg:px-5 rounded-xl bg-white text-[#F45100] font-extrabold text-xs sm:text-sm shadow-sm hover:bg-orange-50 active:scale-95 transition cursor-pointer whitespace-nowrap group shrink-0"
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

