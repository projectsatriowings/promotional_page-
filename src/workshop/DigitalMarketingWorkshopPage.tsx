import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Calendar,
  Clock,
  Globe,
  Monitor,
  Megaphone,
  Search,
  Zap,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Play,
  Lock,
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';
import { Footer } from '../shared/Footer';
import { CurriculumTimeline, CurriculumStep } from '../shared/CurriculumTimeline';
import { DigitalMarketingRegistrationCard } from './DigitalMarketingRegistrationCard';
import { WorkshopStickyBar, WorkshopStickyBarConfig } from '../shared/WorkshopStickyBar';
import './DigitalMarketingWorkshop.css';

/* ==========================================================================
   WORKSHOP CONFIGURATION
   Centralized configuration for event date, time, language, platform,
   price, and countdown target timestamp.
   ========================================================================== */
export const WORKSHOP_CONFIG = {
  title: 'AI-Powered Digital Marketing Masterclass',
  badge: 'Live Webinar · December 9, 2026',
  eyebrow: 'For business owners, freelancers, students & working professionals',
  h1Part1: 'Your Customers Are Already Online. Learn to Reach Them with',
  h1Hl1: 'AI-Powered',
  h1Part2: 'Digital Marketing — SEO, Social Media, Meta & Google Ads, Content Creation, and Marketing Automation in Just',
  h1Hl2: '3 Hours',
  date: 'Wed, Dec 9',
  time: '7:00 PM IST',
  language: 'Tamil',
  platform: 'Live on Zoom',
  price: '₹99',
  priceNumber: 99,
  originalPrice: '₹1,999',
  countdownTarget: '2026-12-09T19:00:00+05:30',
  defaultVideoPoster: '/brand/workshop-preview-poster.webp',
};

const DM_STICKY_BAR_CONFIG: WorkshopStickyBarConfig = {
  status: 'Live on Zoom · Wed, Dec 9 · 7:00 PM IST',
  mobileStatus: 'Dec 9 · 7 PM',
  offerEnds: WORKSHOP_CONFIG.countdownTarget,
  rightText: 'Early bird price ends soon',
  price: WORKSHOP_CONFIG.price,
  targetRegisterId: 'register',
  heroReserveSelector: '[data-hero-reserve], .dmw-cta-wrap',
  alwaysDisplay: true,
};

/* ==========================================================================
   PROBLEM-SOLUTION COMPARISON CARDS DATA
   ========================================================================== */
export interface ProblemSolutionCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  pain: string;
  painText: string;
  win: string;
  winText: string;
}

export const WHY_JOIN_CARDS: ProblemSolutionCard[] = [
  {
    id: 'ads',
    icon: Megaphone,
    pain: 'Ads that burn money',
    painText: 'Boosting posts and hoping for the best, with nothing to show for it.',
    win: 'Ads that bring leads',
    winText: 'Set up Meta & Google ads with the right audience, budget and goal.',
  },
  {
    id: 'calendar',
    icon: Calendar,
    pain: 'Posting with zero results',
    painText: 'Random posts, low reach, and no idea what to post next.',
    win: 'A content plan that grows',
    winText: 'Build a month of content ideas and a calendar in minutes with AI.',
  },
  {
    id: 'seo',
    icon: Search,
    pain: 'Invisible on Google',
    painText: 'Customers search for what you sell and find your competitors.',
    win: 'Show up when people search',
    winText: 'Use simple SEO and Google Business Profile steps to rank locally.',
  },
  {
    id: 'ai-content',
    icon: Zap,
    pain: 'Hours lost making content',
    painText: 'Writing captions and designing posts eats your whole day.',
    win: 'Create content 10× faster',
    winText: 'Use ChatGPT and Canva AI to write, design and repurpose quickly.',
  },
  {
    id: 'leads',
    icon: MessageSquare,
    pain: 'Leads slip away',
    painText: 'Enquiries come in, but follow-ups are manual and late.',
    win: 'Follow-ups on autopilot',
    winText: 'Automate replies and reminders with WhatsApp and email tools.',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    pain: 'No idea what\'s working',
    painText: 'Spending time and money without reading the numbers.',
    win: 'Decisions backed by data',
    winText: 'Read your analytics and double down on what actually converts.',
  },
];

export const DM_CURRICULUM_STEPS: CurriculumStep[] = [
  {
    time: '0:00 – 0:25',
    title: 'Digital Marketing Foundations',
    text: 'Understand the customer journey, the marketing funnel and which channels actually work for your business today.',
    tags: ['Funnels', 'Target audience', 'Channel strategy'],
  },
  {
    time: '0:25 – 0:55',
    title: 'Create Content with AI',
    text: 'Write captions, ad copy and a month of post ideas, then design scroll-stopping creatives in minutes.',
    tags: ['ChatGPT', 'Canva AI', 'Content calendar'],
  },
  {
    time: '0:55 – 1:30',
    title: 'Meta Ads, Hands-On',
    text: 'Set up a Facebook & Instagram campaign step by step: objective, audience, budget and creatives that convert.',
    tags: ['Meta Ads Manager', 'Lead ads', 'Retargeting'],
  },
  {
    time: '1:30 – 2:00',
    title: 'Google Ads & Search',
    text: "Show up when people search for what you sell, with the right keywords and a budget that doesn't burn out.",
    tags: ['Google Ads', 'Keywords', 'Search campaigns'],
  },
  {
    time: '2:00 – 2:30',
    title: 'SEO & Local Visibility',
    text: 'Simple on-page SEO and Google Business Profile steps to rank higher and get found locally.',
    tags: ['On-page SEO', 'Google Business Profile', 'Reviews'],
  },
  {
    time: '2:30 – 3:00',
    title: 'Automation, Analytics & Q&A',
    text: 'Automate follow-ups on WhatsApp and email, read your numbers, and get your questions answered live.',
    tags: ['WhatsApp automation', 'Email', 'Analytics'],
  },
];

interface DigitalMarketingWorkshopPageProps {
  videoSrc?: string;
  videoPoster?: string;
  youtubeId?: string;
}

export const DigitalMarketingWorkshopPage: React.FC<DigitalMarketingWorkshopPageProps> = ({
  videoSrc,
  videoPoster = WORKSHOP_CONFIG.defaultVideoPoster,
  youtubeId,
}) => {
  /* --------------------------------------------------------------------------
     STATE: LIVE COUNTDOWN TO 2026-12-09T19:00:00+05:30
     -------------------------------------------------------------------------- */
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00',
  });

  useEffect(() => {
    const target = new Date(WORKSHOP_CONFIG.countdownTarget).getTime();
    const pad = (n: number) => String(n).padStart(2, '0');

    const updateCountdown = () => {
      const now = Date.now();
      let diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff %= 1000 * 60 * 60 * 24;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff %= 1000 * 60 * 60;
      const mins = Math.floor(diff / (1000 * 60));
      diff %= 1000 * 60;
      const secs = Math.floor(diff / 1000);

      setTimeLeft({
        days: pad(days),
        hours: pad(hours),
        mins: pad(mins),
        secs: pad(secs),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  /* --------------------------------------------------------------------------
     STATE: SECTION 2 (WHY YOU NEED TO JOIN) FLIP CARDS & SWITCH
     -------------------------------------------------------------------------- */
  const [isWithMode, setIsWithMode] = useState<boolean>(false);
  // Track individual card overrides ('solo' toggles)
  const [soloCards, setSoloCards] = useState<Record<string, boolean>>({});
  const [isInView, setIsInView] = useState<boolean>(false);
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [animatedSolved, setAnimatedSolved] = useState<number>(0);
  const userInteractedRef = useRef<boolean>(false);
  const whySectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Calculate number of cards currently showing "With This Workshop"
  useEffect(() => {
    let count = 0;
    WHY_JOIN_CARDS.forEach((card) => {
      const isSolo = !!soloCards[card.id];
      // In 'with' mode: true unless solo. In 'without' mode: false unless solo.
      const isCardWith = isWithMode ? !isSolo : isSolo;
      if (isCardWith) count++;
    });
    setSolvedCount(count);
  }, [isWithMode, soloCards]);

  // Smooth number animation for solved counter
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 600;
    const startVal = animatedSolved;
    const endVal = solvedCount;

    if (startVal === endVal) return;

    let frameId: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.round(startVal + (endVal - startVal) * progress);
      setAnimatedSolved(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [solvedCount]);

  // Reveal on scroll and auto-switch to "With" ~1.8s after in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();

            setTimeout(() => {
              if (!userInteractedRef.current) {
                setIsWithMode(true);
              }
            }, 1800);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (whySectionRef.current) {
      observer.observe(whySectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Global switch handler
  const handleModeSwitch = (mode: 'without' | 'with') => {
    userInteractedRef.current = true;
    setIsWithMode(mode === 'with');
    // Clear individual solo card overrides when main switch is clicked
    setSoloCards({});
  };

  // Individual card flip handler
  const handleCardFlip = (cardId: string) => {
    userInteractedRef.current = true;
    setSoloCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  // 3D Tilt and Mouse Spotlight effect for desktop
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const el = cardRefs.current.get(cardId);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltEl = el.querySelector<HTMLElement>('.wcard__tilt');
    if (tiltEl) {
      tiltEl.style.setProperty('--ry', `${(x - 0.5) * 12}deg`);
      tiltEl.style.setProperty('--rx', `${(0.5 - y) * 12}deg`);
    }

    const faces = el.querySelectorAll<HTMLElement>('.face');
    faces.forEach((face) => {
      const fx = face.classList.contains('face--with') ? 1 - x : x;
      face.style.setProperty('--mx', `${fx * 100}%`);
      face.style.setProperty('--my', `${y * 100}%`);
    });
  }, []);

  const handleMouseLeave = useCallback((cardId: string) => {
    const el = cardRefs.current.get(cardId);
    if (!el) return;
    const tiltEl = el.querySelector<HTMLElement>('.wcard__tilt');
    if (tiltEl) {
      tiltEl.style.setProperty('--rx', '0deg');
      tiltEl.style.setProperty('--ry', '0deg');
    }
  }, []);

  // Smooth scroll to register section
  const scrollToRegister = () => {
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <div className="dmw-page">
      {/* Shared Unified Navbar */}
      <Navbar activePage="workshop" onOpenEnquiry={scrollToRegister} />

      <main className="pt-20 sm:pt-24">
        {/* ==============================================================
            SECTION 1: HERO (2 columns, stacks on mobile <960px)
            ============================================================== */}
        <section className="dmw-hero" aria-label="Workshop Overview">
          <div className="dmw-hero__inner">

            {/* LEFT COLUMN: 16:9 VIDEO */}
            <div className="dmw-video-wrap">
              <div className="dmw-video-frame">
                <span className="dmw-video-tag">
                  <span className="dot" /> Watch Preview
                </span>

                {youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
                    title="AI-Powered Digital Marketing Webinar Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : videoSrc ? (
                  <video controls playsInline preload="metadata" poster={videoPoster}>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  /* Stylized Preview Poster with Live Play Simulation */
                  <div
                    className="relative w-full h-full bg-gradient-to-br from-[#16130f] via-[#231a15] to-[#0f0c0a] flex items-center justify-center p-6 text-center cursor-pointer group"
                    onClick={scrollToRegister}
                  >
                    <div
                      className="absolute inset-0 opacity-30 mix-blend-overlay bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${videoPoster}')`,
                      }}
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#f97c1c] to-[#e8550f] text-white flex items-center justify-center shadow-2xl shadow-orange-500/50 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                      </div>
                      <span className="mt-4 text-xs sm:text-sm font-bold text-white tracking-wide uppercase px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                        Masterclass Preview (3 Hours)
                      </span>
                      <p className="mt-2 text-[11px] sm:text-xs text-slate-300 max-w-xs">
                        Learn live campaign planning, AI prompts & revenue workflows
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: CONTENT */}
            <div className="dmw-content">
              {/* 1. Pill badge with pulsing orange dot */}
              <span className="dmw-badge">
                <span className="dot" /> {WORKSHOP_CONFIG.badge}
              </span>

              {/* 2. Orange eyebrow line with a short line before it */}
              <p className="dmw-eyebrow">{WORKSHOP_CONFIG.eyebrow}</p>

              {/* 3. H1 */}
              <h1 className="dmw-title">
                {WORKSHOP_CONFIG.h1Part1}{' '}
                <span className="hl">{WORKSHOP_CONFIG.h1Hl1}</span>{' '}
                {WORKSHOP_CONFIG.h1Part2}{' '}
                <span className="hl">{WORKSHOP_CONFIG.h1Hl2}</span>.
              </h1>

              {/* 4. Description paragraph */}
              <p className="dmw-desc">
                Learn how to plan and run campaigns that bring real leads and sales using{' '}
                <strong>ChatGPT, Canva AI, Meta Ads Manager, Google Ads, SEO tools, and WhatsApp & email automation</strong>{' '}
                <span className="accent">to grow your business or build a career in digital marketing.</span>
              </p>

              {/* 5. One-line meta row with small orange icons (NOT cards) */}
              <div className="dmw-meta">
                <span>
                  <Calendar className="w-3.5 h-3.5" />
                  {WORKSHOP_CONFIG.date}
                </span>
                <span>
                  <Clock className="w-3.5 h-3.5" />
                  {WORKSHOP_CONFIG.time}
                </span>
                <span>
                  <Globe className="w-3.5 h-3.5" />
                  {WORKSHOP_CONFIG.language}
                </span>
                <span>
                  <Monitor className="w-3.5 h-3.5" />
                  {WORKSHOP_CONFIG.platform}
                </span>
              </div>

              {/* 6. Price pop CTA button */}
              <div className="dmw-cta-wrap" data-hero-reserve="true">
                <button
                  type="button"
                  className="price"
                  onClick={scrollToRegister}
                  aria-label={`Reserve My Seat for ${WORKSHOP_CONFIG.price}`}
                >
                  Reserve My Seat <span className="price-tag">{WORKSHOP_CONFIG.price}</span> →
                </button>
              </div>

              {/* 7. Live Countdown */}
              <div className="dmw-timer">
                <div className="dmw-timer__label">EARLY BIRD PRICE EXPIRES IN</div>
                <div className="dmw-timer__row">
                  <div className="dmw-timer__box">
                    <div className="dmw-timer__num">{timeLeft.days}</div>
                    <div className="dmw-timer__unit">Days</div>
                  </div>
                  <span className="dmw-timer__sep">:</span>
                  <div className="dmw-timer__box">
                    <div className="dmw-timer__num">{timeLeft.hours}</div>
                    <div className="dmw-timer__unit">Hours</div>
                  </div>
                  <span className="dmw-timer__sep">:</span>
                  <div className="dmw-timer__box">
                    <div className="dmw-timer__num">{timeLeft.mins}</div>
                    <div className="dmw-timer__unit">Mins</div>
                  </div>
                  <span className="dmw-timer__sep">:</span>
                  <div className="dmw-timer__box">
                    <div className="dmw-timer__num">{timeLeft.secs}</div>
                    <div className="dmw-timer__unit">Secs</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==============================================================
            SECTION 2: WHY YOU NEED TO JOIN (White background #ffffff)
            ============================================================== */}
        <section
          ref={whySectionRef}
          id="why"
          className={`why ${isInView ? 'in-view' : ''} ${isWithMode ? 'is-with' : ''}`}
          aria-label="Why You Need to Join"
        >
          <div className="why__inner">
            
            {/* Header */}
            <div className="why__head">
              <span className="why__kicker">Why You Need to Join</span>
              <h2 className="why__title">
                Stop Guessing. Start Marketing <span className="hl">That Works.</span>
              </h2>
              <p className="why__sub">
                Most businesses and beginners make the same mistakes online. Flip the switch to see what changes after these 3 hours.
              </p>
            </div>

            {/* Segmented Switch & Progress Meter */}
            <div className="why__switch">
              <div className="sw" role="group" aria-label="Comparison Switch">
                <span className="sw__thumb" />
                <button
                  type="button"
                  data-mode="without"
                  aria-pressed={!isWithMode}
                  onClick={() => handleModeSwitch('without')}
                >
                  Without
                </button>
                <button
                  type="button"
                  data-mode="with"
                  aria-pressed={isWithMode}
                  onClick={() => handleModeSwitch('with')}
                >
                  With This Workshop
                </button>
              </div>

              <div className="meter">
                <div className="meter__bar">
                  <div
                    className="meter__fill"
                    style={{
                      width: `${(solvedCount / WHY_JOIN_CARDS.length) * 100}%`,
                    }}
                  />
                </div>
                <span>
                  <b>{animatedSolved}</b> / <span>{WHY_JOIN_CARDS.length}</span> problems solved
                </span>
              </div>
            </div>

            {/* 3x2 Grid of 3D Flip Cards */}
            <div className="why__grid">
              {WHY_JOIN_CARDS.map((card, i) => {
                const IconComponent = card.icon;
                const isSolo = !!soloCards[card.id];

                return (
                  <div
                    key={card.id}
                    ref={(el) => {
                      if (el) cardRefs.current.set(card.id, el);
                      else cardRefs.current.delete(card.id);
                    }}
                    className={`wcard ${isSolo ? 'solo' : ''}`}
                    style={{ '--i': i } as React.CSSProperties}
                    tabIndex={0}
                    role="button"
                    aria-label={`Flip card: ${card.win}`}
                    onClick={() => handleCardFlip(card.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardFlip(card.id);
                      }
                    }}
                    onMouseMove={(e) => handleMouseMove(e, card.id)}
                    onMouseLeave={() => handleMouseLeave(card.id)}
                  >
                    <div className="wcard__tilt">
                      <div className="wcard__flip">
                        
                        {/* WITHOUT FACE */}
                        <div className="face face--without">
                          <div className="face__top">
                            <span className="face__icon">
                              <IconComponent className="w-6 h-6" />
                            </span>
                            <span className="face__tag">Without</span>
                          </div>
                          <h3>{card.pain}</h3>
                          <p>{card.painText}</p>
                          <span className="face__hint">Tap to see the fix ↻</span>
                        </div>

                        {/* WITH FACE */}
                        <div className="face face--with">
                          <div className="face__top">
                            <span className="face__icon">
                              <IconComponent className="w-6 h-6" />
                            </span>
                            <span className="face__tag">With This Workshop</span>
                          </div>
                          <h3>{card.win}</h3>
                          <p>{card.winText}</p>
                          <span className="face__hint">✓ You'll learn this live</span>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Below the grid: Price Pop Button + Small Text */}
            <div className="why__cta">
              <button
                type="button"
                className="price"
                onClick={scrollToRegister}
                aria-label={`Reserve My Seat for ${WORKSHOP_CONFIG.price}`}
              >
                Reserve My Seat <span className="price-tag">{WORKSHOP_CONFIG.price}</span> →
              </button>
              <p>Live · Practical · Beginner-friendly</p>
            </div>

          </div>
        </section>

        {/* ==============================================================
            SECTION: CURRICULUM (Interactive Timeline & Progress Ring)
            ============================================================== */}
        <CurriculumTimeline
          mode="time"
          totalMins={180}
          unit="Part"
          ringLabel="of 3 hours"
          steps={DM_CURRICULUM_STEPS}
          kicker="Curriculum"
          title={
            <>
              What You'll Learn in <span className="hl">3 Hours</span>
            </>
          }
          subtitle="A hands-on, step-by-step plan built for real results — not theory."
          price={WORKSHOP_CONFIG.price}
          onReserveClick={scrollToRegister}
        />

        {/* ==============================================================
            SECTION 3: IN-PAGE ANIMATED REGISTRATION CARD (#register)
            ============================================================== */}
        <DigitalMarketingRegistrationCard />
      </main>

      {/* Sticky Bottom CTA Bar (Only for Workshop Page) */}
      <WorkshopStickyBar config={DM_STICKY_BAR_CONFIG} />

      {/* Common Footer */}
      <Footer />
    </div>
  );
};

export default DigitalMarketingWorkshopPage;
