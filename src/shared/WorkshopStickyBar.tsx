import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import './WorkshopStickyBar.css';

export interface WorkshopStickyBarConfig {
  status: string;
  mobileStatus?: string;
  seatsLeft?: number;
  seatsTotal?: number;
  offerEnds: string; // ISO date string e.g. "2026-12-09T19:00:00+05:30"
  rightText: string;
  price: string;
  regularPrice?: string;
  targetRegisterId?: string;
  heroReserveSelector?: string;
  alwaysDisplay?: boolean; // defaults to true
}

export interface WorkshopStickyBarProps {
  config: WorkshopStickyBarConfig;
}

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

function calculateTimeRemaining(targetDateStr: string): TimeLeft {
  const targetTime = new Date(targetDateStr).getTime();
  const now = Date.now();
  const diff = targetTime - now;

  if (isNaN(targetTime) || diff <= 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      isExpired: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    isExpired: false,
  };
}

const FlipBox: React.FC<{ value: string; unit: string }> = ({ value, unit }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      prevValueRef.current = value;
      setIsFlipping(true);
      setDisplayValue(value);
      const timer = window.setTimeout(() => {
        setIsFlipping(false);
      }, 400);
      return () => window.clearTimeout(timer);
    }
  }, [value]);

  return (
    <span className="wsb-flip-group">
      <span
        className={`wsb-flip-box ${isFlipping ? 'wsb-flip-box--anim' : ''}`}
        aria-hidden="true"
      >
        {displayValue}
      </span>
      <span className="wsb-unit" aria-hidden="true">{unit}</span>
    </span>
  );
};

export const WorkshopStickyBar: React.FC<WorkshopStickyBarProps> = ({ config }) => {
  const isAlwaysDisplay = config.alwaysDisplay !== false; // Default: true (always display and sticky)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeRemaining(config.offerEnds)
  );
  const [hasPassedHero, setHasPassedHero] = useState(isAlwaysDisplay);
  const [isRegisterInView, setIsRegisterInView] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const [barHeight, setBarHeight] = useState(76);

  // Timer interval updates
  useEffect(() => {
    setTimeLeft(calculateTimeRemaining(config.offerEnds));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(config.offerEnds));
    }, 1000);
    return () => clearInterval(timer);
  }, [config.offerEnds]);

  // Dynamically track bar height
  useEffect(() => {
    if (!barRef.current) return;
    const updateHeight = () => {
      if (barRef.current) {
        const h = barRef.current.offsetHeight;
        if (h > 0) setBarHeight(h);
      }
    };
    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(barRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Show/Hide IntersectionObserver & scroll tracking (only if alwaysDisplay is explicitly false)
  useEffect(() => {
    if (isAlwaysDisplay) return;

    const heroSelector =
      config.heroReserveSelector ||
      '[data-hero-reserve], #hero-reserve, .kids-cta-wrap, .dmw-cta-wrap';
    const heroEl = document.querySelector(heroSelector);
    const registerTargetId = config.targetRegisterId || 'register';
    const registerEl = document.getElementById(registerTargetId);

    const checkPositions = () => {
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        // Scrolled past if the bottom of hero reserve button is above the viewport top
        setHasPassedHero(heroRect.bottom < 0);
      }
      if (registerEl) {
        const regRect = registerEl.getBoundingClientRect();
        const inView = regRect.top < window.innerHeight && regRect.bottom > 0;
        setIsRegisterInView(inView);
      }
    };

    checkPositions();

    let heroObserver: IntersectionObserver | null = null;
    if (heroEl) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasPassedHero(false);
          } else {
            setHasPassedHero(entry.boundingClientRect.bottom < 0);
          }
        },
        { threshold: [0, 1] }
      );
      heroObserver.observe(heroEl);
    }

    let registerObserver: IntersectionObserver | null = null;
    if (registerEl) {
      registerObserver = new IntersectionObserver(
        ([entry]) => {
          setIsRegisterInView(entry.isIntersecting);
        },
        { threshold: 0 }
      );
      registerObserver.observe(registerEl);
    }

    window.addEventListener('scroll', checkPositions, { passive: true });
    window.addEventListener('resize', checkPositions, { passive: true });

    return () => {
      if (heroObserver) heroObserver.disconnect();
      if (registerObserver) registerObserver.disconnect();
      window.removeEventListener('scroll', checkPositions);
      window.removeEventListener('resize', checkPositions);
    };
  }, [isAlwaysDisplay, config.heroReserveSelector, config.targetRegisterId]);

  const isBarVisible = isAlwaysDisplay ? true : hasPassedHero && !isRegisterInView;

  // Add bottom padding to workshop page equal to the bar's height while visible
  useEffect(() => {
    const pageRoot = barRef.current?.closest(
      '.dmw-page, .kids-page, [data-workshop-page]'
    ) as HTMLElement | null;

    if (pageRoot) {
      pageRoot.style.paddingBottom = isBarVisible ? `${barHeight}px` : '0px';
      pageRoot.style.transition = 'padding-bottom 0.3s ease';
    } else {
      document.body.style.paddingBottom = isBarVisible ? `${barHeight}px` : '0px';
    }

    return () => {
      if (pageRoot) {
        pageRoot.style.paddingBottom = '0px';
      } else {
        document.body.style.paddingBottom = '0px';
      }
    };
  }, [isBarVisible, barHeight]);

  const handleCtaClick = useCallback(() => {
    const targetId = config.targetRegisterId || 'register';
    const el = document.getElementById(targetId);
    if (el) {
      const navHeader = document.querySelector('header');
      const navHeight = navHeader ? navHeader.getBoundingClientRect().height : 70;
      const targetTop = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
    }
  }, [config.targetRegisterId]);

  // Progress calculation for seats
  const hasSeatsData =
    typeof config.seatsTotal === 'number' &&
    typeof config.seatsLeft === 'number' &&
    config.seatsTotal > 0;
  const bookedPercent = hasSeatsData
    ? Math.min(
        100,
        Math.max(
          0,
          Math.round(
            ((config.seatsTotal! - config.seatsLeft!) / config.seatsTotal!) * 100
          )
        )
      )
    : 0;

  return (
    <aside
      ref={barRef}
      role="region"
      aria-label="Reserve your seat"
      className={`wsb-bar ${isBarVisible ? 'wsb-bar--visible' : 'wsb-bar--hidden'}`}
    >
      <div className="wsb-inner">
        {/* DESKTOP LEFT: Translucent dark pill */}
        <div className="wsb-pill">
          <div className="wsb-live-dot-wrap" aria-hidden="true">
            <span className="wsb-live-dot" />
            <span className="wsb-live-dot-pulse" />
          </div>

          <span className="wsb-status-text">{config.status}</span>

          {hasSeatsData && (
            <div
              className="wsb-progress-track"
              role="progressbar"
              aria-valuenow={bookedPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${config.seatsLeft} seats remaining out of ${config.seatsTotal}`}
            >
              <div
                className="wsb-progress-fill"
                style={{ width: `${bookedPercent}%` }}
              />
            </div>
          )}

          {timeLeft.isExpired ? (
            <span className="wsb-closed-badge">Offer closed</span>
          ) : (
            <div className="wsb-timer-group">
              <span className="wsb-timer-label">Offer ends in</span>
              <div
                className="wsb-flip-row"
                aria-live="off"
                aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds remaining`}
              >
                <FlipBox value={timeLeft.days} unit="d" />
                <FlipBox value={timeLeft.hours} unit="h" />
                <FlipBox value={timeLeft.minutes} unit="m" />
                <FlipBox value={timeLeft.seconds} unit="s" />
              </div>
            </div>
          )}
        </div>

        {/* MOBILE LEFT: 2-line compact presentation */}
        <div className="wsb-mobile-left">
          <div className="wsb-mobile-row1">
            <div className="wsb-live-dot-wrap" aria-hidden="true">
              <span className="wsb-live-dot" />
              <span className="wsb-live-dot-pulse" />
            </div>
            <span className="wsb-mobile-status">
              {config.mobileStatus || config.status}
            </span>
          </div>
          <div className="wsb-mobile-row2" aria-live="off">
            {timeLeft.isExpired ? (
              <span className="wsb-closed-badge">Offer closed</span>
            ) : (
              <div className="wsb-flip-row">
                <FlipBox value={timeLeft.days} unit="d" />
                <FlipBox value={timeLeft.hours} unit="h" />
                <FlipBox value={timeLeft.minutes} unit="m" />
                <FlipBox value={timeLeft.seconds} unit="s" />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Text & CTA Button */}
        <div className="wsb-right">
          <span className="wsb-right-text">{config.rightText}</span>
          <button
            type="button"
            className="wsb-btn"
            onClick={handleCtaClick}
            aria-label={`Reserve Seat for ${config.price}`}
          >
            <span className="wsb-btn-label">
              <span className="wsb-btn-text-desktop">Reserve My Seat</span>
              <span className="wsb-btn-text-mobile">Reserve</span>
              {!timeLeft.isExpired && (
                <span className="wsb-price-chip">{config.price}</span>
              )}
            </span>
            <span className="wsb-arrow" aria-hidden="true">
              <ArrowRight size={16} strokeWidth={2.6} />
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default WorkshopStickyBar;
