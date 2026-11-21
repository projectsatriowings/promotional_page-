import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Clock, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import './CurriculumTimeline.css';

export const DURATION = 12000; // full run, ms
export const HOLD = 3000; // pause at the end before replaying
const CIRCLE_RADIUS = 46;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // ~289.03px

export interface CurriculumStep {
  time?: string;
  title: string;
  text: string;
  tags: string[];
}

export interface CurriculumTimelineProps {
  mode?: 'time' | 'count';
  totalMins?: number;
  unit?: string;
  ringLabel?: string;
  steps: CurriculumStep[];
  kicker?: string;
  title?: React.ReactNode;
  subtitle?: string;
  price?: string;
  onReserveClick?: () => void;
}

export const CurriculumTimeline: React.FC<CurriculumTimelineProps> = ({
  mode = 'time',
  totalMins = 180,
  unit = 'Part',
  ringLabel = 'of 3 hours',
  steps,
  kicker = 'Curriculum',
  title = (
    <>
      What You'll Learn in <span className="hl">3 Hours</span>
    </>
  ),
  subtitle = 'A hands-on, step-by-step plan built for real results — not theory.',
  price = '₹99',
  onReserveClick,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const trackLineRef = useRef<HTMLDivElement>(null);
  const trackFillRef = useRef<HTMLDivElement>(null);
  const ringBarRef = useRef<SVGCircleElement>(null);
  const ringValRef = useRef<HTMLSpanElement>(null);
  const cardsRowRef = useRef<HTMLDivElement>(null);

  const nodeColsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardElsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState('Getting started…');
  const [isSwapping, setIsSwapping] = useState(false);
  const [isSectionSeen, setIsSectionSeen] = useState(false);

  // Animation refs
  const fracsRef = useRef<number[]>([]);
  const runningRef = useRef(false);
  const hoveringRef = useRef(false);
  const lastCurrentRef = useRef(-1);
  const tRef = useRef(0);
  const lastTimeRef = useRef(0);
  const holdUntilRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Measure each node's horizontal center relative to the track
  const measure = useCallback(() => {
    if (!trackLineRef.current) return;
    const r = trackLineRef.current.getBoundingClientRect();
    if (r.width === 0) return;

    fracsRef.current = steps.map((_, i) => {
      const colEl = nodeColsRef.current[i];
      if (!colEl) return (i + 0.5) / steps.length;
      const nodeEl = colEl.querySelector<HTMLElement>('.cur-node');
      if (!nodeEl) return (i + 0.5) / steps.length;
      const n = nodeEl.getBoundingClientRect();
      const frac = (n.left + n.width / 2 - r.left) / r.width;
      return Math.max(0, Math.min(1, frac));
    });
  }, [steps]);

  // Scroll horizontal cards container to specific card (NEVER scroll the page)
  const scrollToCard = useCallback((index: number) => {
    const container = cardsRowRef.current;
    const card = cardElsRef.current[index];
    if (!container || !card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const targetScrollLeft = container.scrollLeft + (cardRect.left - containerRect.left) - 16;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'smooth',
    });
  }, []);

  // Render progress (0 to 1)
  const renderProgress = useCallback(
    (p: number, shouldScrollCards = true) => {
      const clampedP = Math.max(0, Math.min(1, p));

      // 1. Horizontal Track Fill
      if (trackFillRef.current) {
        trackFillRef.current.style.width = `${clampedP * 100}%`;
      }

      // 2. SVG Ring Dashoffset
      if (ringBarRef.current) {
        ringBarRef.current.style.strokeDashoffset = `${CIRCLE_CIRCUMFERENCE * (1 - clampedP)}`;
      }

      // 3. Reached Nodes and Current Step
      let current = -1;
      steps.forEach((_, i) => {
        const colEl = nodeColsRef.current[i];
        if (!colEl) return;
        const targetFrac = fracsRef.current[i] ?? (i + 0.5) / steps.length;
        const isOn = clampedP >= targetFrac;
        colEl.classList.toggle('cur-on', isOn);
        if (isOn) current = i;
      });

      steps.forEach((_, i) => {
        const colEl = nodeColsRef.current[i];
        if (!colEl) return;
        colEl.classList.toggle('cur-current', i === current);
      });

      const effectiveStep = current >= 0 ? current : 0;
      setActiveStepIndex(effectiveStep);

      // 4. Elapsed Time / Counter Text
      if (ringValRef.current) {
        if (mode === 'time') {
          const mins = Math.round(clampedP * totalMins);
          ringValRef.current.textContent = `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m`;
        } else {
          const reached = current < 0 ? 0 : current + 1;
          ringValRef.current.textContent = `${reached}/${steps.length}`;
        }
      }

      // 5. "Now Learning" Title Transition & Card Scroll
      if (current !== lastCurrentRef.current) {
        lastCurrentRef.current = current;
        setIsSwapping(true);
        setTimeout(() => {
          const nextText = current < 0 ? 'Getting started…' : steps[current]?.title || 'Getting started…';
          setCurrentTitle(nextText);
          setIsSwapping(false);
        }, 200);

        if (shouldScrollCards && current >= 0) {
          scrollToCard(current);
        }
      }
    },
    [mode, totalMins, steps, scrollToCard]
  );

  // Jump to specific step on click
  const handleJumpToStep = (index: number) => {
    measure();
    const targetFrac = fracsRef.current[index] ?? (index + 0.5) / steps.length;
    tRef.current = targetFrac * DURATION;
    holdUntilRef.current = performance.now() + 4000; // Pause autoplay for 4s after user interaction
    renderProgress(targetFrac, true);
    scrollToCard(index);
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      handleJumpToStep(activeStepIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeStepIndex < steps.length - 1) {
      handleJumpToStep(activeStepIndex + 1);
    }
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (ringBarRef.current) {
      ringBarRef.current.style.strokeDasharray = `${CIRCLE_CIRCUMFERENCE}`;
      ringBarRef.current.style.strokeDashoffset = `${CIRCLE_CIRCUMFERENCE}`;
    }

    if (reduceMotion) {
      setIsSectionSeen(true);
      nodeColsRef.current.forEach((el) => {
        if (el) {
          el.classList.add('cur-on');
        }
      });
      renderProgress(1, false);
      return;
    }

    measure();
    renderProgress(0, false);

    const handleResize = () => {
      measure();
      renderProgress(tRef.current / DURATION, false);
    };
    window.addEventListener('resize', handleResize);

    // Section visibility & Entrance animation
    const frame = (now: number) => {
      if (!runningRef.current) return;
      const dt = lastTimeRef.current ? now - lastTimeRef.current : 0;
      lastTimeRef.current = now;

      if (holdUntilRef.current) {
        if (now >= holdUntilRef.current) {
          holdUntilRef.current = 0;
        }
      } else if (!hoveringRef.current) {
        tRef.current += dt;
        if (tRef.current >= DURATION) {
          tRef.current = DURATION;
          holdUntilRef.current = now + HOLD;
          // reset after hold
          setTimeout(() => {
            if (runningRef.current && !hoveringRef.current) {
              tRef.current = 0;
            }
          }, HOLD);
        }
      }

      renderProgress(tRef.current / DURATION, true);
      animationFrameIdRef.current = requestAnimationFrame(frame);
    };

    let sectionObs: IntersectionObserver | null = null;
    if (rootRef.current) {
      sectionObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsSectionSeen(true);
              if (!runningRef.current) {
                runningRef.current = true;
                lastTimeRef.current = 0;
                measure();
                animationFrameIdRef.current = requestAnimationFrame(frame);
              }
            } else {
              runningRef.current = false;
              if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
              }
            }
          });
        },
        { threshold: 0.2 }
      );
      sectionObs.observe(rootRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sectionObs) sectionObs.disconnect();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [measure, renderProgress]);

  return (
    <section
      ref={rootRef}
      className={`cur-section ${isSectionSeen ? 'cur-seen' : ''}`}
      id="curriculum"
      aria-label="Curriculum Section"
    >
      <div className="cur-inner">

        {/* 1. HEADER (CENTERED, MAX 720PX) */}
        <div className="cur-header">
          <span className="cur-kicker">{kicker}</span>
          <h2 className="cur-title">{title}</h2>
          <p className="cur-subtitle">{subtitle}</p>
        </div>

        {/* 2. STATUS BAR CARD */}
        <div className="cur-status">
          <div className="cur-status__left">
            {/* 104x104 Progress Ring */}
            <div className="cur-ring">
              <svg className="cur-ring__svg" viewBox="0 0 104 104" aria-hidden="true">
                <defs>
                  <linearGradient id="curRingGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f97c1c" />
                    <stop offset="100%" stopColor="#e8550f" />
                  </linearGradient>
                </defs>
                <circle className="cur-ring__track" cx="52" cy="52" r="46" />
                <circle
                  ref={ringBarRef}
                  className="cur-ring__bar"
                  cx="52"
                  cy="52"
                  r="46"
                  strokeDasharray={2 * Math.PI * 46}
                  strokeDashoffset={2 * Math.PI * 46}
                />
              </svg>
              <div className="cur-ring__center">
                <span
                  ref={ringValRef}
                  className={`cur-ring__value cur-ring__value--${mode}`}
                >
                  {mode === 'count' ? `0/${steps.length}` : '0h 00m'}
                </span>
                <span className="cur-ring__label">
                  {mode === 'time'
                    ? ringLabel === 'of 3 hours' || !ringLabel
                      ? 'of 3 hrs'
                      : ringLabel
                    : ringLabel || 'modules'}
                </span>
              </div>
            </div>

            {/* Now Learning text block */}
            <div className="cur-status__info">
              <span className="cur-status__now">NOW LEARNING</span>
              <div
                className={`cur-status__nowtitle ${isSwapping ? 'cur-swap' : ''}`}
                title={currentTitle}
              >
                {currentTitle}
              </div>
            </div>
          </div>

          {/* Right: Price Pop Button */}
          <div className="cur-status__right">
            <button
              type="button"
              className="price"
              onClick={onReserveClick}
              aria-label={`Reserve My Seat for ${price}`}
            >
              Reserve My Seat <span className="price-tag">{price}</span> →
            </button>
          </div>
        </div>

        {/* 3. HORIZONTAL TRACK */}
        <div
          className="cur-track-section"
          onMouseEnter={() => {
            hoveringRef.current = true;
          }}
          onMouseLeave={() => {
            hoveringRef.current = false;
          }}
        >
          {/* Dashed line + animated progress fill + glowing tip dot */}
          <div ref={trackLineRef} className="cur-track__line">
            <div ref={trackFillRef} className="cur-track__fill">
              <span className="cur-track__dot" />
            </div>
          </div>

          {/* 6 Step Nodes evenly spaced via CSS Grid */}
          <div className="cur-track__grid">
            {steps.map((step, i) => {
              const stepNum = String(i + 1).padStart(2, '0');
              return (
                <div
                  key={i}
                  ref={(el) => {
                    nodeColsRef.current[i] = el;
                  }}
                  className="cur-node-col"
                >
                  <button
                    type="button"
                    className="cur-node-btn"
                    onClick={() => handleJumpToStep(i)}
                    aria-label={`Jump to step ${i + 1}: ${step.title}`}
                  >
                    <div className="cur-node">
                      <span className="cur-node__num">{stepNum}</span>
                      <Check className="cur-node__chk" />
                    </div>
                  </button>

                  <div className="cur-node__meta">
                    {step.time ? (
                      <span className="cur-node__time">{step.time}</span>
                    ) : (
                      <span className="cur-node__unit">
                        {unit} {stepNum}
                      </span>
                    )}
                    <span className="cur-node__title" title={step.title}>
                      {step.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. DETAIL CARDS ROW (SWIPEABLE CAROUSEL) */}
        <div
          className="cur-cards-section"
          onMouseEnter={() => {
            hoveringRef.current = true;
          }}
          onMouseLeave={() => {
            hoveringRef.current = false;
          }}
        >
          <div className="cur-cards-header">
            <div className="cur-cards-header__title">
              <span>
                {unit} {String(activeStepIndex + 1).padStart(2, '0')} of{' '}
                {String(steps.length).padStart(2, '0')}
              </span>
            </div>
            <div className="cur-cards-nav">
              <button
                type="button"
                className="cur-nav-btn"
                onClick={handlePrev}
                aria-label="Previous step"
                disabled={activeStepIndex === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="cur-nav-btn"
                onClick={handleNext}
                aria-label="Next step"
                disabled={activeStepIndex === steps.length - 1}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cards Row */}
          <div ref={cardsRowRef} className="cur-cards-row">
            {steps.map((step, i) => {
              const stepNum = String(i + 1).padStart(2, '0');
              const isCurrent = i === activeStepIndex;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    cardElsRef.current[i] = el;
                  }}
                  className={`cur-card ${isCurrent ? 'cur-card--current' : ''}`}
                  style={{ '--i': i } as React.CSSProperties}
                  onClick={() => handleJumpToStep(i)}
                >
                  <div className="cur-card__top">
                    {step.time && (
                      <span className="cur-card__time">
                        <Clock className="w-3.5 h-3.5 stroke-[#ee6a12]" />
                        {step.time}
                      </span>
                    )}
                    <span className="cur-card__label">
                      {unit} {stepNum}
                    </span>
                  </div>

                  <h3 className="cur-card__title">{step.title}</h3>
                  <p className="cur-card__desc">{step.text}</p>

                  <div className="cur-card__tags">
                    {step.tags.map((tag, j) => (
                      <span key={j}>{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CurriculumTimeline;
