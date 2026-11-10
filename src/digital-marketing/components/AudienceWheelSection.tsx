import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface TargetAudiencePath {
  number: string;
  title: string;
  shortLabel: string;
  description: string;
  keyBenefit: string;
}

export const TARGET_AUDIENCES: TargetAudiencePath[] = [
  {
    number: '01',
    title: 'College Students',
    shortLabel: 'College',
    description:
      'Build high-demand digital skills before graduation to secure competitive career placements.',
    keyBenefit:
      'Prepares you for entry-level agency roles, internships, and dynamic marketing careers.',
  },
  {
    number: '02',
    title: 'Fresh Graduates',
    shortLabel: 'Fresh',
    description:
      'Bridge the academic gap with hands-on campaign execution, SEO, and paid performance marketing.',
    keyBenefit:
      'Graduate with a verified project portfolio and real campaign case studies.',
  },
  {
    number: '03',
    title: 'Complete Beginners',
    shortLabel: 'Beginners',
    description:
      'No coding or prior marketing background required. Start from scratch with guided step-by-step lessons.',
    keyBenefit:
      'Learn the fundamentals of web psychology, social platforms, and search algorithms easily.',
  },
  {
    number: '04',
    title: 'Working Professionals',
    shortLabel: 'Working',
    description:
      'Upskill into the high-growth digital domain or integrate AI marketing tools into your current role.',
    keyBenefit:
      'Weekend batches available to learn without interrupting your current job.',
  },
  {
    number: '05',
    title: 'Business Owners',
    shortLabel: 'Business',
    description:
      'Stop depending blindly on third-party agencies. Learn how to generate consistent online leads.',
    keyBenefit:
      'Cut marketing acquisition costs and run profitable Google & Meta ad campaigns directly.',
  },
  {
    number: '06',
    title: 'Entrepreneurs',
    shortLabel: 'Entrepreneurs',
    description:
      'Validate startup ideas, build landing pages, craft viral brand messaging, and acquire early adopters.',
    keyBenefit:
      'Master complete go-to-market strategies with organic search and paid acquisition.',
  },
  {
    number: '07',
    title: 'Freelancers',
    shortLabel: 'Freelancers',
    description:
      'Offer high-ticket services like SEO audits, Meta ad management, and automated content creation.',
    keyBenefit:
      'Pitch international clients on platforms like Upwork and Fiverr with real portfolio proofs.',
  },
];

// Wheel colors repeating: #F04E00, #FF8A3D, #FFF1E6, #FFD1B0
const SEGMENT_COLORS = [
  { fill: '#F04E00', text: '#FFFFFF' },
  { fill: '#FF8A3D', text: '#FFFFFF' },
  { fill: '#FFF1E6', text: '#712B13' },
  { fill: '#FFD1B0', text: '#712B13' },
  { fill: '#F04E00', text: '#FFFFFF' },
  { fill: '#FF8A3D', text: '#FFFFFF' },
  { fill: '#FFF1E6', text: '#712B13' },
];

const N = 7;
const SEG = 360 / N; // 51.42857°
const HOLD = 3000;
const PROGRESS_RADIUS = 57;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS;

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);
const easeSpin = (p: number) => 1 - Math.pow(1 - p, 4);

interface AudienceWheelSectionProps {
  onEnquire?: () => void;
}

export const AudienceWheelSection: React.FC<AudienceWheelSectionProps> = ({
  onEnquire,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wheelStageRef = useRef<HTMLDivElement | null>(null);
  const rotorRef = useRef<SVGGElement | null>(null);
  const pointerRef = useRef<HTMLDivElement | null>(null);
  const progressCircleRef = useRef<SVGCircleElement | null>(null);
  const confettiContainerRef = useRef<HTMLDivElement | null>(null);
  const bulbElementsRef = useRef<(SVGCircleElement | null)[]>([]);
  const segmentPathsRef = useRef<(SVGPathElement | null)[]>([]);
  const bulbsGroupRef = useRef<SVGGElement | null>(null);

  // React state only for Card content & spinning overlay
  const [cardIndex, setCardIndex] = useState(0);
  const [isCardSpinning, setIsCardSpinning] = useState(false);

  // Animation Engine State Machine Ref
  const stRef = useRef({
    rotation: 0,
    phase: 'idle' as 'idle' | 'spinning' | 'holding' | 'dragging' | 'drag-coast',
    from: 0,
    to: 0,
    t0: 0,
    dur: 0,
    index: 0,
    next: 0,
    big: false,
    holdUntil: 0,
    pausedUntil: 0,
    hover: false,
    inView: false,
    vel: 0,
  });

  const dragAngleRef = useRef(0);
  const dragLastTimeRef = useRef(0);
  const dragVelRef = useRef(0);
  const lastSeparatorRef = useRef(0);
  const pointerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isReducedMotionRef = useRef(false);
  const hasFirstLandedRef = useRef(false);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Confetti burst animation
  const triggerConfetti = useCallback((count = 20) => {
    if (isReducedMotionRef.current || !confettiContainerRef.current) return;
    const container = confettiContainerRef.current;
    const colors = ['#F04E00', '#FFA000', '#FFD1B0', '#0F172A', '#FFFFFF'];

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'wheel-confetti-piece';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = '50%';
      piece.style.top = '50%';
      container.appendChild(piece);

      const angle = (-0.25 + Math.random() * 0.5) * Math.PI; // burst towards right (card)
      const dist = 140 + Math.random() * 220;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const rot = -360 + Math.random() * 720;
      const dur = 1000 + Math.random() * 500;

      piece.animate(
        [
          {
            transform: 'translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(0.6)',
            opacity: 1,
          },
          {
            transform: `translate(-50%, -50%) translate(${dx * 0.5}px, ${dy * 0.5 - 30}px) rotate(${rot * 0.5}deg) scale(1)`,
            opacity: 1,
            offset: 0.4,
          },
          {
            transform: `translate(-50%, -50%) translate(${dx}px, ${dy + 120}px) rotate(${rot}deg) scale(0.8)`,
            opacity: 0,
            offset: 1,
          },
        ],
        {
          duration: dur,
          easing: 'cubic-bezier(.16, .84, .36, 1)',
          fill: 'forwards',
        }
      ).onfinish = () => piece.remove();
    }
  }, []);

  // Compute rotation target for audience index
  const targetFor = useCallback((i: number, turns: number) => {
    const st = stRef.current;
    const target = ((360 - i * SEG) % 360 + 360) % 360;
    const cur = ((st.rotation % 360) + 360) % 360;
    if (turns === 0) {
      let d = target - cur;
      if (d > 180) d -= 360;
      if (d < -180) d += 360;
      return st.rotation + d;
    }
    let d = target - cur;
    if (d <= 0) d += 360;
    return st.rotation + d + 360 * turns;
  }, []);

  // Pulse highlight on landed segment
  const highlightSegment = useCallback((idx: number) => {
    segmentPathsRef.current.forEach((path, pIdx) => {
      if (!path) return;
      if (pIdx === idx) {
        path.classList.remove('is-landed');
        void path.getBoundingClientRect(); // force reflow
        path.classList.add('is-landed');
      } else {
        path.classList.remove('is-landed');
      }
    });
  }, []);

  // Update hub progress ring
  const updateProgressRing = useCallback((p: number) => {
    if (!progressCircleRef.current) return;
    const clamped = Math.max(0, Math.min(1, p));
    const offset = PROGRESS_CIRCUMFERENCE * (1 - clamped);
    progressCircleRef.current.style.strokeDashoffset = String(offset);
  }, []);

  // Pointer needle spring tick
  const tickPointer = useCallback((rotation: number) => {
    const sepIndex = Math.floor((rotation + SEG / 2) / SEG);
    if (sepIndex !== lastSeparatorRef.current) {
      lastSeparatorRef.current = sepIndex;
      if (pointerRef.current) {
        pointerRef.current.style.transform = 'translateX(-50%) rotate(-16deg)';
        if (pointerTimerRef.current) clearTimeout(pointerTimerRef.current);
        pointerTimerRef.current = setTimeout(() => {
          if (pointerRef.current) {
            pointerRef.current.style.transform = 'translateX(-50%) rotate(0deg)';
          }
        }, 60);
      }
    }
  }, []);

  // Light bulb chase while spinning, glow together when holding
  const updateBulbs = useCallback((now: number, phase: string) => {
    const isSpinningPhase = phase === 'spinning' || phase === 'drag-coast' || phase === 'dragging';
    if (isSpinningPhase) {
      if (bulbsGroupRef.current) bulbsGroupRef.current.classList.remove('all-lit');
      const activeIdx = Math.floor(now / 60) % 14;
      bulbElementsRef.current.forEach((el, k) => {
        if (!el) return;
        const isLit = k === activeIdx || k === (activeIdx + 1) % 14;
        el.setAttribute('fill', isLit ? '#FFFFFF' : '#FFE4D0');
        el.style.filter = isLit ? 'drop-shadow(0 0 6px #FFB27A)' : 'none';
      });
    } else {
      if (bulbsGroupRef.current) bulbsGroupRef.current.classList.add('all-lit');
      bulbElementsRef.current.forEach((el) => {
        if (!el) return;
        el.setAttribute('fill', '#FFFFFF');
        el.style.filter = 'drop-shadow(0 0 6px #FFB27A)';
      });
    }
  }, []);

  // Land on target audience
  const land = useCallback(() => {
    const st = stRef.current;
    st.rotation = st.to;
    st.index = st.next;
    st.phase = 'holding';
    st.holdUntil = performance.now() + HOLD;
    setIsCardSpinning(false);
    setCardIndex(st.index);
    triggerConfetti(st.big ? 50 : 20);
    highlightSegment(st.index);
    if (rotorRef.current) {
      rotorRef.current.setAttribute('transform', `rotate(${st.rotation})`);
    }
  }, [highlightSegment, triggerConfetti]);

  // Spin to audience index
  const spinTo = useCallback(
    (i: number, turns: number, dur: number, big: boolean) => {
      const st = stRef.current;
      st.from = st.rotation;
      st.to = targetFor(i, turns);
      st.t0 = performance.now();
      st.dur = dur;
      st.next = i;
      st.big = big;
      st.phase = 'spinning';
      setIsCardSpinning(true);
      segmentPathsRef.current.forEach((p) => p?.classList.remove('is-landed'));
      updateProgressRing(0);
    },
    [targetFor, updateProgressRing]
  );

  // Single Animation Engine (Unified RAF Loop)
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      const st = stRef.current;

      if (st.phase === 'spinning') {
        const p = Math.min(1, (now - st.t0) / st.dur);
        st.rotation = st.from + (st.to - st.from) * (st.big ? easeSpin(p) : easeOutCubic(p));
        if (p >= 1) {
          land(); // always finishes, so it cannot get stuck!
        }
      } else if (st.phase === 'drag-coast') {
        st.rotation += st.vel;
        st.vel *= 0.985;
        if (Math.abs(st.vel) < 0.05) {
          const i = ((Math.round(((360 - (st.rotation % 360)) % 360) / SEG) % N) + N) % N;
          spinTo(i, 0, 300, true);
        }
      } else if (st.phase === 'holding') {
        const auto = st.inView && !st.hover && now > st.pausedUntil;
        if (!auto) {
          st.holdUntil += 16; // pause the hold timer while hover / paused / out-of-view
        } else if (now >= st.holdUntil) {
          spinTo((st.index + 1) % N, 1, 1800, false);
        }
        updateProgressRing(1 - Math.max(0, st.holdUntil - now) / HOLD);
      }

      if (rotorRef.current) {
        rotorRef.current.setAttribute('transform', `rotate(${st.rotation})`);
      }
      tickPointer(st.rotation);
      updateBulbs(now, st.phase);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [land, spinTo, tickPointer, updateBulbs, updateProgressRing]);

  // IntersectionObserver: starts auto mode on view, initializes index 0 immediately
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          stRef.current.inView = entry.isIntersecting;
          if (entry.isIntersecting && !hasFirstLandedRef.current) {
            hasFirstLandedRef.current = true;
            // On first view, index 0 is immediately active, holds for 3s
            stRef.current.rotation = 0;
            stRef.current.to = 0;
            stRef.current.index = 0;
            stRef.current.next = 0;
            stRef.current.phase = 'holding';
            stRef.current.holdUntil = performance.now() + HOLD;
            setIsCardSpinning(false);
            setCardIndex(0);
            highlightSegment(0);
            if (rotorRef.current) {
              rotorRef.current.setAttribute('transform', 'rotate(0)');
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [highlightSegment]);

  // Hub Spin Button Click: 5 turns over 4s to random different index
  const handleManualSpinHub = () => {
    const st = stRef.current;
    if (st.phase === 'spinning' || st.phase === 'dragging') return;
    let nextIndex = Math.floor(Math.random() * N);
    while (nextIndex === st.index) {
      nextIndex = Math.floor(Math.random() * N);
    }
    const now = performance.now();
    st.pausedUntil = now + 8000;
    spinTo(nextIndex, 5, 4000, true);
  };

  // Keyboard navigation on hub: Space/Enter = spin; Left/Right = prev/next
  const handleHubKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleManualSpinHub();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (stRef.current.index - 1 + N) % N;
      handleSelectAudienceChip(prevIdx);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (stRef.current.index + 1) % N;
      handleSelectAudienceChip(nextIdx);
    }
  };

  // Audience Chip Click: 2 turns over 2.5s
  const handleSelectAudienceChip = (i: number) => {
    const st = stRef.current;
    if (st.phase === 'spinning' || st.phase === 'dragging' || i === st.index) return;
    const now = performance.now();
    st.pausedUntil = now + 8000;
    spinTo(i, 2, 2500, true);
  };

  // Drag & Flick Physics
  const getCenterCoords = () => {
    if (!wheelStageRef.current) return { cx: 0, cy: 0 };
    const rect = wheelStageRef.current.getBoundingClientRect();
    return {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const st = stRef.current;
    if (st.phase === 'spinning') return;
    st.phase = 'dragging';
    const { cx, cy } = getCenterCoords();
    const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
    dragAngleRef.current = (rad * 180) / Math.PI;
    dragLastTimeRef.current = performance.now();
    dragVelRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const st = stRef.current;
    if (st.phase !== 'dragging') return;
    const { cx, cy } = getCenterCoords();
    const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
    const angle = (rad * 180) / Math.PI;
    let delta = angle - dragAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const now = performance.now();
    const dt = now - dragLastTimeRef.current;
    if (dt > 0) {
      dragVelRef.current = (delta / dt) * 16.66;
    }
    dragLastTimeRef.current = now;
    dragAngleRef.current = angle;

    st.rotation += delta;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const st = stRef.current;
    if (st.phase !== 'dragging') return;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    st.vel = Math.max(-25, Math.min(25, dragVelRef.current));
    st.phase = 'drag-coast';
    st.pausedUntil = performance.now() + 8000;
  };

  const activeAudience = TARGET_AUDIENCES[cardIndex];

  return (
    <section
      id="who-can-join"
      ref={sectionRef}
      className="audience-wheel-section"
    >
      <div className="wheel-container">
        {/* ================= 1. SECTION HEADER (CENTERED) ================= */}
        <div className="wheel-header-centered">
          <div className="wheel-badge-wrap">
            <span className="wheel-pill-badge">ELIGIBILITY & AUDIENCE</span>
          </div>
          <h2 className="wheel-main-heading">
            Spin to Find <span className="wheel-gradient-text">Your Path</span>
          </h2>
          <p className="wheel-subtitle">
            Whether you’re a student, a professional or a business owner, there’s a
            seat for you. Spin to see where you fit.
          </p>
        </div>

        {/* ================= 2. SPLIT LAYOUT ================= */}
        <div className="wheel-grid">
          {/* ================= LEFT: WHEEL CONTAINER ================= */}
          <div
            ref={wheelStageRef}
            className="wheel-stage"
            onMouseEnter={() => {
              stRef.current.hover = true;
            }}
            onMouseLeave={() => {
              stRef.current.hover = false;
            }}
          >
            {/* Confetti container for bursts */}
            <div
              ref={confettiContainerRef}
              className="wheel-confetti-stage"
              aria-hidden="true"
            />

            {/* Top Pointer Needle (Navy Triangle 28x34 with 2px White Outline & Drop Shadow) */}
            <div ref={pointerRef} className="wheel-pointer" aria-hidden="true">
              <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
                <path
                  d="M14 34L2 6C0.8 3.8 2.4 1 5 1H23C25.6 1 27.2 3.8 26 6L14 34Z"
                  fill="#0F172A"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Wheel Outer Frame with Shadow and Touch-Action */}
            <div
              className="wheel-disc-wrap"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Rotating SVG with <g id="wheel-rotor"> rotating around (0,0) */}
              <svg
                viewBox="-230 -230 460 460"
                width="460"
                height="460"
                className="wheel-svg"
                aria-hidden="true"
              >
                <g id="wheel-rotor" ref={rotorRef}>
                  {/* 7 Segments */}
                  <g className="wheel-segments-group">
                    {TARGET_AUDIENCES.map((item, idx) => {
                      const mid = idx * SEG;
                      const startAngle = mid - SEG / 2;
                      const endAngle = mid + SEG / 2;
                      const rad1 = (startAngle * Math.PI) / 180;
                      const rad2 = (endAngle * Math.PI) / 180;
                      const R = 212;

                      const x1 = R * Math.sin(rad1);
                      const y1 = -R * Math.cos(rad1);
                      const x2 = R * Math.sin(rad2);
                      const y2 = -R * Math.cos(rad2);

                      const color = SEGMENT_COLORS[idx];
                      const words = item.title.split(' ');
                      const flip = mid > 90 && mid < 270;

                      return (
                        <g key={item.number} className="wheel-segment-group">
                          {/* Segment Arc */}
                          <path
                            ref={(el) => {
                              segmentPathsRef.current[idx] = el;
                            }}
                            d={`M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(
                              2
                            )} ${y2.toFixed(2)} Z`}
                            fill={color.fill}
                            stroke="#FFFFFF"
                            strokeWidth="3"
                            strokeLinejoin="round"
                            className="wheel-segment-path"
                          />

                          {/* Segment Label (Rotated along segment, flipped on lower half so it reads left-to-right) */}
                          <g transform={`rotate(${mid}) translate(0, -150) rotate(${flip ? 180 : 0})`}>
                            <text
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill={color.text}
                              className="wheel-segment-label"
                            >
                              {words.length > 1 ? (
                                flip ? (
                                  <>
                                    <tspan x="0" dy="-0.65em">
                                      {words.slice(1).join(' ')}
                                    </tspan>
                                    <tspan x="0" dy="1.3em">
                                      {words[0]}
                                    </tspan>
                                  </>
                                ) : (
                                  <>
                                    <tspan x="0" dy="-0.65em">
                                      {words[0]}
                                    </tspan>
                                    <tspan x="0" dy="1.3em">
                                      {words.slice(1).join(' ')}
                                    </tspan>
                                  </>
                                )
                              ) : (
                                <tspan x="0" dy="0">
                                  {item.title}
                                </tspan>
                              )}
                            </text>

                            {/* Short label for mobile */}
                            <text
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill={color.text}
                              className="wheel-segment-label-mobile"
                            >
                              {item.shortLabel}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </g>

                  {/* Outer Navy Ring */}
                  <circle
                    cx="0"
                    cy="0"
                    r="220"
                    stroke="#0F172A"
                    strokeWidth="16"
                    fill="none"
                  />

                  {/* 14 Light Bulbs (8px diameter = r="4") */}
                  <g ref={bulbsGroupRef} className="wheel-bulbs-group all-lit">
                    {Array.from({ length: 14 }).map((_, bIdx) => {
                      const angle = bIdx * (360 / 14);
                      const rad = (angle * Math.PI) / 180;
                      const bx = 220 * Math.sin(rad);
                      const by = -220 * Math.cos(rad);

                      return (
                        <circle
                          key={`bulb-${bIdx}`}
                          ref={(el) => {
                            bulbElementsRef.current[bIdx] = el;
                          }}
                          cx={bx}
                          cy={by}
                          r="4"
                          fill="#FFFFFF"
                          className="wheel-bulb"
                        />
                      );
                    })}
                  </g>
                </g>
              </svg>

              {/* Centre Hub Button & Progress Ring (Outside rotor, doesn't rotate) */}
              <div className="wheel-hub-container">
                <svg
                  className="wheel-hub-progress-svg"
                  viewBox="0 0 120 120"
                  aria-hidden="true"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r={PROGRESS_RADIUS}
                    className="wheel-hub-track"
                  />
                  <circle
                    ref={progressCircleRef}
                    cx="60"
                    cy="60"
                    r={PROGRESS_RADIUS}
                    className="wheel-hub-progress"
                    style={{
                      strokeDasharray: PROGRESS_CIRCUMFERENCE,
                      strokeDashoffset: PROGRESS_CIRCUMFERENCE,
                    }}
                  />
                </svg>

                <button
                  type="button"
                  onClick={handleManualSpinHub}
                  onKeyDown={handleHubKeyDown}
                  disabled={isCardSpinning}
                  className="wheel-hub-btn"
                  aria-label="Spin the wheel to find your path"
                >
                  <span className="wheel-hub-text">SPIN</span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: AUDIENCE CARD & CHIPS ================= */}
          <div
            className="wheel-right-col"
            onMouseEnter={() => {
              stRef.current.hover = true;
            }}
            onMouseLeave={() => {
              stRef.current.hover = false;
            }}
          >
            {/* The Audience Card */}
            <div
              className={`audience-card ${isCardSpinning ? 'is-spinning' : 'is-popped'}`}
              aria-live="polite"
            >
              {/* Soft Drifting Background Circles */}
              <div className="card-drift-circle circle-1" aria-hidden="true" />
              <div className="card-drift-circle circle-2" aria-hidden="true" />

              {/* Watermark Number */}
              <div className="card-watermark" aria-hidden="true">
                {activeAudience.number}
              </div>

              {/* Card Body */}
              <div className="card-body">
                {/* Spinning Indicator Badge */}
                {isCardSpinning && (
                  <div className="card-spinning-badge">
                    <span className="pulse-dot" />
                    <span>Spinning…</span>
                  </div>
                )}

                <div className="card-header-tag">
                  YOU LANDED ON · {activeAudience.number} OF 07
                </div>

                <h3 className="card-title">{activeAudience.title}</h3>

                <p className="card-desc">{activeAudience.description}</p>

                <div className="card-divider" />

                <div className="card-benefit-wrap">
                  <div className="card-benefit-label">KEY BENEFIT</div>
                  <div className="card-benefit-text">{activeAudience.keyBenefit}</div>
                </div>

                <div className="card-btn-wrap">
                  <button
                    type="button"
                    onClick={
                      onEnquire ||
                      (() => {
                        const el = document.getElementById('enquiry');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      })
                    }
                    className="card-cta-btn"
                  >
                    <span>This is me, enquire now →</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Audience Chips (Below Card in normal document flow) */}
            <div className="wheel-chips-wrap">
              <div className="wheel-chips-label">Quick select audience:</div>
              <div className="wheel-chips-row">
                {TARGET_AUDIENCES.map((item, idx) => {
                  const isSelected = cardIndex === idx;
                  return (
                    <button
                      key={item.number}
                      type="button"
                      disabled={isCardSpinning}
                      onClick={() => handleSelectAudienceChip(idx)}
                      className={`wheel-chip-btn ${isSelected ? 'is-selected' : ''}`}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ================= 9. "NOT SURE IF YOU FIT?" STRIP ================= */}
        <div className="wheel-counselling-strip">
          <div className="wheel-counselling-content">
            <span className="wheel-counselling-text">
              Not sure if you fit? Our academic counsellor will review your background
              and recommend the ideal batch.
            </span>
            <button
              type="button"
              onClick={
                onEnquire ||
                (() => {
                  const el = document.getElementById('enquiry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                })
              }
              className="wheel-counselling-btn"
            >
              Request Free Counselling →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceWheelSection;
