import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Gamepad2,
  Bot,
  Workflow,
  Lightbulb,
  Users,
  Rocket,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Play,
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';
import { Footer } from '../shared/Footer';
import { CurriculumTimeline, CurriculumStep } from '../shared/CurriculumTimeline';
import { KidsRegistrationCard, KIDS_REGISTRATION_CONFIG } from './KidsRegistrationCard';
import { WorkshopStickyBar, WorkshopStickyBarConfig } from '../shared/WorkshopStickyBar';
import './KidsTechProgram.css';

/* ==========================================================================
   KIDS AI & TECH PROGRAM CONFIGURATION
   Centralized configuration for Chennai program details, pricing, schedule
   ========================================================================== */
export const KIDS_PROGRAM_CONFIG = {
  title: '3 Kids AI and Tech Program',
  badge: 'Kids AI & Tech Program · Chennai',
  eyebrow: 'Turn screen time into skill time',
  h1Part1: 'Your Child Will Grow Up With',
  h1Hl1: 'AI',
  h1Part2: '. Help Them Learn to Create With It — Not Just Use It. Coding, Game Building, AI Tools, and Robotics in a',
  h1Hl2: 'Fun, Hands-On',
  h1Part3: 'Program.',
  date: 'Sat, Dec 12, 2026',
  time: '10:00 AM IST',
  ageGroup: 'Ages 7–16 (Grades 2–10)',
  venue: 'Chennai Hub & Live Online',
  price: '₹99',
  priceNumber: 99,
  originalPrice: '₹1,999',
  countdownTarget: '2026-12-12T10:00:00+05:30',
  defaultVideoPoster: '/brand/kids-preview-poster.webp',
};

const KIDS_STICKY_BAR_CONFIG: WorkshopStickyBarConfig = {
  status: `${KIDS_REGISTRATION_CONFIG.seatsLeft} of ${KIDS_REGISTRATION_CONFIG.seatsTotal} seats left this batch`,
  mobileStatus: `${KIDS_REGISTRATION_CONFIG.seatsLeft} of ${KIDS_REGISTRATION_CONFIG.seatsTotal} left`,
  seatsLeft: KIDS_REGISTRATION_CONFIG.seatsLeft,
  seatsTotal: KIDS_REGISTRATION_CONFIG.seatsTotal,
  offerEnds: KIDS_PROGRAM_CONFIG.countdownTarget,
  rightText: 'Early bird price for your child',
  price: KIDS_PROGRAM_CONFIG.price,
  targetRegisterId: 'register',
  heroReserveSelector: '[data-hero-reserve], .kids-cta-wrap',
  alwaysDisplay: true,
};

/* ==========================================================================
   PROBLEM-SOLUTION COMPARISON CARDS (FOR PARENTS)
   ========================================================================== */
export interface KidsComparisonCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  pain: string;
  painText: string;
  win: string;
  winText: string;
}

export const KIDS_WHY_CARDS: KidsComparisonCard[] = [
  {
    id: 'games',
    icon: Gamepad2,
    pain: 'Only plays games',
    painText: 'Hours spent playing games someone else made.',
    win: 'Builds their own games',
    winText: 'Designs and codes simple games they can share with friends.',
  },
  {
    id: 'ai-copy',
    icon: Bot,
    pain: 'Uses AI to copy answers',
    painText: 'Treats AI as a shortcut for homework.',
    win: 'Uses AI to create, safely',
    winText: 'Learns how AI works and uses kid-safe tools to make art, stories and projects.',
  },
  {
    id: 'logic',
    icon: Workflow,
    pain: 'Gets stuck on logic',
    painText: 'Maths and problem-solving feel hard and boring.',
    win: 'Thinks step by step',
    winText: 'Builds logical thinking through puzzles, coding and challenges.',
  },
  {
    id: 'ideas',
    icon: Lightbulb,
    pain: 'Ideas stay in their head',
    painText: 'Big imagination, but no way to bring ideas to life.',
    win: 'Turns ideas into projects',
    winText: 'Uses Scratch, Python and robotics to build what they imagine.',
  },
  {
    id: 'mentors',
    icon: Users,
    pain: 'Learns tech alone online',
    painText: 'Random videos with no guidance or feedback.',
    win: 'Learns with mentors & friends',
    winText: 'Guided sessions, teamwork and feedback in every class.',
  },
  {
    id: 'future',
    icon: Rocket,
    pain: 'Unsure about the future',
    painText: 'The world is changing fast and they feel left behind.',
    win: 'Confident with future skills',
    winText: 'Grows comfortable with AI and tech early, with confidence.',
  },
];

export const KIDS_CURRICULUM_STEPS: CurriculumStep[] = [
  {
    title: 'How AI Really Works',
    text: 'Kids discover what AI is, how it learns from examples, and how to use it safely and responsibly.',
    tags: ['AI basics', 'Online safety', 'Fun experiments'],
  },
  {
    title: 'Coding with Scratch',
    text: 'Drag-and-drop coding to build animations and interactive stories — logic made playful.',
    tags: ['Scratch', 'Loops & logic', 'Animation'],
  },
  {
    title: 'Build Your Own Game',
    text: 'Design characters, levels and scores, then share a playable game with friends and family.',
    tags: ['Game design', 'Problem-solving', 'Creativity'],
  },
  {
    title: 'Creative AI Studio',
    text: 'Use kid-safe AI tools to create art, stories and music — and learn to give AI good instructions.',
    tags: ['AI art', 'Storytelling', 'Prompting'],
  },
  {
    title: 'Python & Robotics',
    text: 'Take the first steps in real Python and bring ideas to life with beginner robotics kits.',
    tags: ['Python', 'Sensors', 'Robotics'],
  },
  {
    title: 'Showcase Project',
    text: 'Plan, build and present a final project — building confidence, teamwork and communication.',
    tags: ['Teamwork', 'Presentation', 'Confidence'],
  },
];

interface KidsTechProgramPageProps {
  videoSrc?: string;
  videoPoster?: string;
  youtubeId?: string;
}

export const KidsTechProgramPage: React.FC<KidsTechProgramPageProps> = ({
  videoSrc,
  videoPoster = KIDS_PROGRAM_CONFIG.defaultVideoPoster,
  youtubeId,
}) => {
  /* --------------------------------------------------------------------------
     STATE: LIVE COUNTDOWN TO PROGRAM START DATE
     -------------------------------------------------------------------------- */
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00',
  });

  useEffect(() => {
    const target = new Date(KIDS_PROGRAM_CONFIG.countdownTarget).getTime();
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
     STATE: SECTION 2 (WHY YOUR CHILD SHOULD JOIN) FLIP CARDS & SWITCH
     -------------------------------------------------------------------------- */
  const [isWithMode, setIsWithMode] = useState<boolean>(false);
  const [soloCards, setSoloCards] = useState<Record<string, boolean>>({});
  const [isInView, setIsInView] = useState<boolean>(false);
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [animatedSolved, setAnimatedSolved] = useState<number>(0);
  const userInteractedRef = useRef<boolean>(false);
  const whySectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Calculate unlocked skills
  useEffect(() => {
    let count = 0;
    KIDS_WHY_CARDS.forEach((card) => {
      const isSolo = !!soloCards[card.id];
      const isCardWith = isWithMode ? !isSolo : isSolo;
      if (isCardWith) count++;
    });
    setSolvedCount(count);
  }, [isWithMode, soloCards]);

  // Smooth counter animation
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

  // Reveal on scroll and auto-switch to "With" ~1.8s after appearing
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

  const handleModeSwitch = (mode: 'without' | 'with') => {
    userInteractedRef.current = true;
    setIsWithMode(mode === 'with');
    setSoloCards({});
  };

  const handleCardFlip = (cardId: string) => {
    userInteractedRef.current = true;
    setSoloCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  // 3D tilt & mouse spotlight
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

  const scrollToRegister = () => {
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#16130f] font-['Inter',system-ui,sans-serif]">
      {/* Universal Sticky Navbar */}
      <Navbar activePage="workshop" />

      <main>
        {/* ==============================================================
            SECTION 1: HERO (2 columns, stacks on mobile <960px)
            ============================================================== */}
        <section className="kids-hero" aria-label="Hero Section">
          <div className="kids-hero__inner">

            {/* LEFT COLUMN: 16:9 VIDEO CONTAINER */}
            <div className="kids-video-wrap">
              <div className="kids-video-frame">
                <span className="kids-video-tag">
                  <span className="dot" /> Watch Preview
                </span>

                {youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                    title="Kids AI & Tech Program Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : videoSrc ? (
                  <video controls playsInline preload="metadata" poster={videoPoster}>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1410] to-[#2b1f14] p-6 text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f97c1c] to-[#e8550f] text-white flex items-center justify-center shadow-lg shadow-orange-500/30 mb-4 transform hover:scale-105 transition cursor-pointer">
                      <Play className="w-7 h-7 translate-x-0.5 fill-current" />
                    </div>
                    <p className="text-sm font-bold tracking-tight text-white mb-1">
                      See What Chennai Kids Are Building
                    </p>
                    <p className="text-xs text-orange-200/90 max-w-xs">
                      Scratch Games · Python Scripts · Generative AI Stories · Hands-On Robotics
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-[11px] font-semibold border border-white/15">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      Ages 7 to 16 · Beginner Friendly
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: CONTENT */}
            <div className="kids-content">
              {/* 1. Pill badge with pulsing orange dot */}
              <span className="kids-badge">
                <span className="dot" /> {KIDS_PROGRAM_CONFIG.badge}
              </span>

              {/* 2. Orange eyebrow line */}
              <p className="kids-eyebrow">{KIDS_PROGRAM_CONFIG.eyebrow}</p>

              {/* 3. H1 Headline with bracketed highlights */}
              <h1 className="kids-title">
                {KIDS_PROGRAM_CONFIG.h1Part1}{' '}
                <span className="hl">{KIDS_PROGRAM_CONFIG.h1Hl1}</span>
                {KIDS_PROGRAM_CONFIG.h1Part2}{' '}
                <span className="hl">{KIDS_PROGRAM_CONFIG.h1Hl2}</span>{' '}
                {KIDS_PROGRAM_CONFIG.h1Part3}
              </h1>

              {/* 4. Description paragraph */}
              <p className="kids-desc">
                Kids learn by building real projects using{' '}
                <strong>Scratch, Python, kid-safe AI tools, and beginner robotics kits</strong>{' '}
                <span className="accent">
                  to build creativity, logical thinking, and confidence for the future.
                </span>
              </p>

              {/* 5. One-line meta row with small orange icons (NOT cards) */}
              <div className="kids-meta">
                <span>
                  <Calendar className="w-4 h-4 stroke-[#ee6a12]" />
                  {KIDS_PROGRAM_CONFIG.date}
                </span>
                <span>
                  <Clock className="w-4 h-4 stroke-[#ee6a12]" />
                  {KIDS_PROGRAM_CONFIG.time}
                </span>
                <span>
                  <Users className="w-4 h-4 stroke-[#ee6a12]" />
                  {KIDS_PROGRAM_CONFIG.ageGroup}
                </span>
                <span>
                  <MapPin className="w-4 h-4 stroke-[#ee6a12]" />
                  {KIDS_PROGRAM_CONFIG.venue}
                </span>
              </div>

              {/* 6. "Price Pop" CTA Button */}
              <div className="kids-cta-wrap" data-hero-reserve="true">
                <button
                  type="button"
                  className="price"
                  onClick={scrollToRegister}
                  aria-label={`Reserve My Child's Seat for ${KIDS_PROGRAM_CONFIG.price}`}
                >
                  Reserve My Seat <span className="price-tag">{KIDS_PROGRAM_CONFIG.price}</span> →
                </button>
              </div>

              {/* 7. Countdown Timer */}
              <div className="kids-timer">
                <div className="kids-timer__label">Early bird price expires in</div>
                <div className="kids-timer__row">
                  <div className="kids-timer__box">
                    <div className="kids-timer__num">{timeLeft.days}</div>
                    <div className="kids-timer__unit">Days</div>
                  </div>
                  <span className="kids-timer__sep">:</span>
                  <div className="kids-timer__box">
                    <div className="kids-timer__num">{timeLeft.hours}</div>
                    <div className="kids-timer__unit">Hours</div>
                  </div>
                  <span className="kids-timer__sep">:</span>
                  <div className="kids-timer__box">
                    <div className="kids-timer__num">{timeLeft.mins}</div>
                    <div className="kids-timer__unit">Mins</div>
                  </div>
                  <span className="kids-timer__sep">:</span>
                  <div className="kids-timer__box">
                    <div className="kids-timer__num">{timeLeft.secs}</div>
                    <div className="kids-timer__unit">Secs</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 2: WHY YOUR CHILD SHOULD JOIN (White background #ffffff)
            ============================================================== */}
        <section
          ref={whySectionRef}
          id="why"
          className={`kids-why ${isInView ? 'in-view' : ''} ${isWithMode ? 'is-with' : ''}`}
          aria-label="Why Your Child Should Join"
        >
          <div className="kids-why__inner">
            
            {/* Centered Header */}
            <div className="kids-why__head">
              <span className="kids-why__kicker">Why Your Child Should Join</span>
              <h2 className="kids-why__title">
                From Screen Time to <span className="hl">Skill Time.</span>
              </h2>
              <p className="kids-why__sub">
                Kids already spend hours on screens. Flip the switch to see what changes when they start creating instead of just consuming.
              </p>
            </div>

            {/* Segmented Switch & Progress Meter */}
            <div className="kids-why__switch">
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
                  With This Program
                </button>
              </div>

              <div className="meter">
                <div className="meter__bar">
                  <div
                    className="meter__fill"
                    style={{
                      width: `${(solvedCount / KIDS_WHY_CARDS.length) * 100}%`,
                    }}
                  />
                </div>
                <span>
                  <b>{animatedSolved}</b> / <span>{KIDS_WHY_CARDS.length}</span> skills unlocked
                </span>
              </div>
            </div>

            {/* 3x2 Grid of 3D Flip Cards */}
            <div className="kids-why__grid">
              {KIDS_WHY_CARDS.map((card, i) => {
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
                            <span className="face__tag">With This Program</span>
                          </div>
                          <h3>{card.win}</h3>
                          <p>{card.winText}</p>
                          <span className="face__hint">✓ Your child learns this</span>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Below the Grid: Price Pop Button + Tagline */}
            <div className="kids-why__cta">
              <button
                type="button"
                className="price"
                onClick={scrollToRegister}
                aria-label={`Reserve My Child's Seat for ${KIDS_PROGRAM_CONFIG.price}`}
              >
                Reserve My Seat <span className="price-tag">{KIDS_PROGRAM_CONFIG.price}</span> →
              </button>
              <p>Hands-on · Mentor-led · Fun for kids</p>
            </div>

          </div>
        </section>

        {/* ==============================================================
            SECTION: CURRICULUM (Interactive Timeline & Progress Ring)
            ============================================================== */}
        <CurriculumTimeline
          mode="count"
          unit="Module"
          ringLabel="modules"
          steps={KIDS_CURRICULUM_STEPS}
          kicker="Curriculum"
          title={
            <>
              What Your Child <span className="hl">Will Learn</span>
            </>
          }
          subtitle="A fun, project-based journey where every module ends with something your child built."
          price={KIDS_PROGRAM_CONFIG.price}
          onReserveClick={scrollToRegister}
        />

        {/* ==============================================================
            SECTION 3: IN-PAGE ANIMATED REGISTRATION CARD WITH ROBOT SWAP (#register)
            ============================================================== */}
        <KidsRegistrationCard />
      </main>

      {/* Sticky Bottom CTA Bar (Only for Workshop Page) */}
      <WorkshopStickyBar config={KIDS_STICKY_BAR_CONFIG} />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
};

export default KidsTechProgramPage;
