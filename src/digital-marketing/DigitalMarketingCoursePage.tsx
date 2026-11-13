import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Laptop,
  Users,
  ChevronDown,
  MessageCircle,
  MapPin,
  Send,
  MessageSquareCheck,
  X
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';
import { Footer } from '../shared/Footer';
import { TrainingGallerySection } from './components/TrainingGallerySection';
import { FaqChatSection } from './components/FaqChatSection';
import { AudienceWheelSection } from './components/AudienceWheelSection';
import { CourseEnquiryPopup } from '../shared/CourseEnquiryPopup';
import { StickyOfferBar } from '../shared/StickyOfferBar';

interface CurriculumModule {
  number: string;
  title: string;
  description: string;
}

interface TechOrbitTool {
  name: string;
  useCase: string;
  logo: string;
  logoLight?: string;
  brandColor: string;
  ring: 'inner' | 'outer';
  category: 'Paid Ads' | 'Analytics & SEO' | 'AI & Creative' | 'Automation';
}

interface InstituteAdvantage {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

interface CareerOpportunity {
  number: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  skills: string[];
  logo: string;
}

// 4-point sparkle/star icon in white (85% opacity, 12px) with slow 4s spin/pulse
const WhiteSparkle: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-3 h-3 text-white/85 shrink-0 animate-sparkle-pulse"
    aria-hidden="true"
  >
    <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
  </svg>
);

export const DigitalMarketingCoursePage: React.FC = () => {
  // 2s Auto-popup for Syllabus & Free Counselling Offer
  const [isEnquiryPopupOpen, setIsEnquiryPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEnquiryPopupOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Section 10: In-Page Contact Card Countdown & Dismiss state
  const [enquiryCountdown, setEnquiryCountdown] = useState(14 * 60 + 28);
  const [isCardDismissed, setIsCardDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setEnquiryCountdown((prev) => (prev > 0 ? prev - 1 : 14 * 60 + 28));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const enquiryMin = String(Math.floor(enquiryCountdown / 60)).padStart(2, '0');
  const enquirySec = String(enquiryCountdown % 60).padStart(2, '0');

  // Section 4: Curriculum Module Floating Tooltip state
  const [activeTooltip, setActiveTooltip] = useState<{
    mod: CurriculumModule;
    x: number;
    y: number;
    arrowOffset: number;
  } | null>(null);
  const curriculumSectionRef = useRef<HTMLElement>(null);
  const curriculumTooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showCurriculumTooltip = (mod: CurriculumModule, el: HTMLElement) => {
    if (curriculumTooltipTimeoutRef.current) {
      clearTimeout(curriculumTooltipTimeoutRef.current);
      curriculumTooltipTimeoutRef.current = null;
    }
    if (!curriculumSectionRef.current) return;

    const rect = el.getBoundingClientRect();
    const sectionRect = curriculumSectionRef.current.getBoundingClientRect();

    // 8px gap above the button, relative to section container
    const y = rect.top - sectionRect.top - 8;
    const centerX = rect.left - sectionRect.left + rect.width / 2;

    // Viewport containment: keep 280px tooltip within bounds
    const minX = 148;
    const maxX = Math.max(minX, sectionRect.width - 148);
    const clampedX = Math.max(minX, Math.min(maxX, centerX));
    const arrowOffset = Math.max(-115, Math.min(115, centerX - clampedX));

    setActiveTooltip({
      mod,
      x: clampedX,
      y,
      arrowOffset,
    });
  };

  const hideCurriculumTooltip = () => {
    if (curriculumTooltipTimeoutRef.current) {
      clearTimeout(curriculumTooltipTimeoutRef.current);
      curriculumTooltipTimeoutRef.current = null;
    }
    setActiveTooltip(null);
  };

  const handleCurriculumTitleTouch = (mod: CurriculumModule, el: HTMLElement) => {
    showCurriculumTooltip(mod, el);
    if (curriculumTooltipTimeoutRef.current) {
      clearTimeout(curriculumTooltipTimeoutRef.current);
    }
    curriculumTooltipTimeoutRef.current = setTimeout(() => {
      setActiveTooltip(null);
    }, 3000);
  };

  useEffect(() => {
    const handleGlobalTap = (e: MouseEvent | TouchEvent) => {
      if (
        curriculumSectionRef.current &&
        !curriculumSectionRef.current.contains(e.target as Node)
      ) {
        hideCurriculumTooltip();
      }
    };
    document.addEventListener('touchstart', handleGlobalTap, { passive: true });
    document.addEventListener('click', handleGlobalTap);
    return () => {
      document.removeEventListener('touchstart', handleGlobalTap);
      document.removeEventListener('click', handleGlobalTap);
      if (curriculumTooltipTimeoutRef.current) {
        clearTimeout(curriculumTooltipTimeoutRef.current);
      }
    };
  }, []);

  // Split Orbit & Tools section state
  const toolsSectionRef = useRef<HTMLElement | null>(null);
  const [toolsInView, setToolsInView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const activeCategory = hoveredCategory || selectedCategory;
  const [countProgress, setCountProgress] = useState(0);
  // Orbit tool interaction state (hover & click)
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const [clickedOrbitTool, setClickedOrbitTool] = useState<string | null>(null);
  const [hoveredOrbitTool, setHoveredOrbitTool] = useState<string | null>(null);
  const activeOrbitTool = hoveredOrbitTool || clickedOrbitTool;

  const handleToolClick = (toolName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClickedOrbitTool((prev) => (prev === toolName ? null : toolName));
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (orbitRef.current && !orbitRef.current.contains(e.target as Node)) {
        setClickedOrbitTool(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  useEffect(() => {
    const el = toolsSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setToolsInView(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toolsInView) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setCountProgress(1);
      return;
    }

    const duration = 1200;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCountProgress(eased);

      if (t < 1) {
        requestAnimationFrame(frame);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [toolsInView]);

  // Section 7: Six Institute Advantages Data (Reference Style)
  const advantages: InstituteAdvantage[] = [
    {
      number: '01',
      icon: Users,
      title: 'Student-focused learning',
      description: 'Small cohort sizes for individual attention and dedicated mentor feedback.',
      stat: '15',
      statLabel: 'Students per batch',
    },
    {
      number: '02',
      icon: BookOpen,
      title: 'Beginner-friendly teaching',
      description: 'No jargon overload. Concepts explained with simple everyday analogies.',
      stat: '100%',
      statLabel: '100% BEGINNER FRIENDLY',
    },
    {
      number: '03',
      icon: Laptop,
      title: 'Practical learning approach',
      description: 'Step away from slides. Every lecture pairs with a direct software exercise on your laptop.',
      stat: '100%',
      statLabel: 'Hands-on sessions',
    },
    {
      number: '04',
      icon: MessageSquareCheck,
      title: 'Course guidance and feedback',
      description: 'Weekly trainer sessions to review your ad copy, targeting sheets and SEO plans.',
      stat: 'Weekly',
      statLabel: 'Trainer reviews',
    },
    {
      number: '05',
      icon: Sparkles,
      title: 'Updated syllabus with AI',
      description: 'Work alongside ChatGPT, Midjourney and Zapier to multiply your output.',
      stat: '5+',
      statLabel: 'AI tools covered',
    },
    {
      number: '06',
      icon: MapPin,
      title: 'Convenient campuses',
      description: 'Fully equipped offline computer labs in Chennai & Hyderabad, plus live streams.',
      stat: '3',
      statLabel: 'Ways to attend',
    },
  ];

  // Section 7: Auto-cycling Showcase State
  const [activeAdvantageIdx, setActiveAdvantageIdx] = useState(0);
  const [displayStat, setDisplayStat] = useState('15');
  const [isAdvantageSectionVisible, setIsAdvantageSectionVisible] = useState(false);
  const [isAdvantageHovered, setIsAdvantageHovered] = useState(false);
  const [panelTilt, setPanelTilt] = useState({ x: 0, y: 0 });
  const advantageSectionRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // IntersectionObserver for Section 7 visibility
  useEffect(() => {
    const el = advantageSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAdvantageSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goToNextAdvantage = useCallback(() => {
    setActiveAdvantageIdx((prev) => (prev + 1) % advantages.length);
  }, [advantages.length]);

  const goToPrevAdvantage = useCallback(() => {
    setActiveAdvantageIdx((prev) => (prev - 1 + advantages.length) % advantages.length);
  }, [advantages.length]);

  // Stat count-up effect
  useEffect(() => {
    const currentStat = advantages[activeAdvantageIdx].stat;
    const match = currentStat.match(/^(\d+)(.*)$/);

    if (!match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayStat(currentStat);
      return;
    }

    const targetNum = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const duration = 600;
    const startTime = performance.now();
    let frameId: number;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      const val = Math.round(eased * targetNum);
      setDisplayStat(`${val}${suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCounter);
      }
    };

    frameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frameId);
  }, [activeAdvantageIdx]);

  // 3D Tilt handlers
  const handlePanelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 640 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPanelTilt({ x: -y * 12, y: x * 12 });
  };

  const handlePanelMouseLeave = () => {
    setPanelTilt({ x: 0, y: 0 });
  };

  // Touch Swipe handlers
  const handleTouchStartAdvantage = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEndAdvantage = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goToNextAdvantage();
      } else {
        goToPrevAdvantage();
      }
    }
    touchStartXRef.current = null;
  };

  // Keyboard navigation for tablist
  const handleAdvantageKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (index + 1) % advantages.length;
      setActiveAdvantageIdx(nextIdx);
      document.getElementById(`advantage-tab-${nextIdx}`)?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (index - 1 + advantages.length) % advantages.length;
      setActiveAdvantageIdx(prevIdx);
      document.getElementById(`advantage-tab-${prevIdx}`)?.focus();
    }
  };

  // Section 8: 3D Rotating Carousel - Career Opportunities State & Logic
  const careerSectionRef = useRef<HTMLElement>(null);
  const careerRingRef = useRef<HTMLDivElement>(null);
  const careerCardSlotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeHighlightIdx, setActiveHighlightIdx] = useState<number>(0);
  const [hasEnteredCareers, setHasEnteredCareers] = useState(false);
  const [isDraggingCareers, setIsDraggingCareers] = useState(false);

  const COUNT = 9;
  const STEP = 360 / COUNT; // 40deg

  const angleRef = useRef(0);
  const fromRef = useRef(0);
  const toRef = useRef(0);
  const t0Ref = useRef(0);
  const durationRef = useRef(900);
  const movingRef = useRef(false);
  const idleTimeRef = useRef(0);
  const radiusRef = useRef(495);
  const targetIndexRef = useRef(0);
  const scrollPauseUntilRef = useRef(0);
  const currentActiveRef = useRef(0);

  const isHoveredRef = useRef(false);
  const isInViewRef = useRef(false);
  const hasEnteredRef = useRef(false);

  const dragInfoRef = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    lastX: number;
    moved: boolean;
  }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    moved: false,
  });

  const checkDescOverflow = useCallback(() => {
    careerCardSlotsRef.current.forEach((slot) => {
      if (!slot) return;
      const descScroll = slot.querySelector('.desc-scroll') as HTMLElement | null;
      if (!descScroll) return;
      const overflows = descScroll.scrollHeight > descScroll.clientHeight + 1;
      if (overflows) {
        descScroll.classList.add('has-more');
        const isAtEnd = descScroll.scrollTop + descScroll.clientHeight >= descScroll.scrollHeight - 2;
        descScroll.classList.toggle('at-end', isAtEnd);
      } else {
        descScroll.classList.remove('has-more', 'at-end');
      }
    });
  }, []);

  const handleDescScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollHeight > el.clientHeight) {
      el.classList.add('has-more');
      const isAtEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      el.classList.toggle('at-end', isAtEnd);
    }
    scrollPauseUntilRef.current = performance.now() + 3000;
    idleTimeRef.current = 0;
  }, []);

  const frontIndex = useCallback(() => {
    return ((Math.round(-angleRef.current / STEP) % COUNT) + COUNT) % COUNT;
  }, [COUNT, STEP]);

  const setActive = useCallback((index: number) => {
    targetIndexRef.current = index;
    careerCardSlotsRef.current.forEach((slot, i) => {
      if (!slot) return;
      const isMatch = (i === index);
      slot.classList.toggle('is-active', isMatch);
      const card = slot.querySelector('.career-card');
      if (card) {
        card.classList.toggle('is-active', isMatch);
        if (isMatch) card.setAttribute('aria-current', 'true');
        else card.removeAttribute('aria-current');
      }
      const inner = slot.querySelector('.career-card-inner');
      if (inner) {
        inner.classList.toggle('is-active', isMatch);
      }
      if (!isMatch) {
        const descScroll = slot.querySelector('.desc-scroll') as HTMLElement | null;
        if (descScroll) {
          descScroll.scrollTop = 0;
          descScroll.classList.remove('at-end');
          if (descScroll.scrollHeight > descScroll.clientHeight + 1) {
            descScroll.classList.add('has-more');
          }
        }
      }
    });

    setActiveHighlightIdx(index);
  }, [COUNT]);

  const updateDepth = useCallback((curAngle: number) => {
    careerCardSlotsRef.current.forEach((slot, i) => {
      if (!slot) return;
      const rel = ((i * STEP + curAngle) % 360 + 540) % 360 - 180;
      const d = Math.min(Math.abs(rel), 140) / 140; // 0 front -> 1 back
      slot.style.opacity = (1 - d * 0.7).toFixed(3); // 1 -> 0.3
      slot.style.filter = d > 0.05 ? `blur(${(d * 2).toFixed(2)}px)` : 'none';
      slot.style.zIndex = String(1000 - Math.round(Math.abs(rel)));
      slot.style.pointerEvents = Math.abs(rel) < 100 ? 'auto' : 'none';
    });
  }, [STEP]);

  const goTo = useCallback((index: number, duration = 900) => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = -index * STEP;
    const delta = ((target - angleRef.current) % 360 + 540) % 360 - 180; // shortest way

    if (isReduced) {
      angleRef.current = angleRef.current + delta;
      movingRef.current = false;
      idleTimeRef.current = 0;
      if (careerRingRef.current) {
        careerRingRef.current.style.transform = `translateZ(${-radiusRef.current}px) rotateY(${angleRef.current}deg)`;
      }
      updateDepth(angleRef.current);
      setActive(index);
      return;
    }

    targetIndexRef.current = index;
    fromRef.current = angleRef.current;
    toRef.current = angleRef.current + delta;
    t0Ref.current = performance.now();
    durationRef.current = duration;
    movingRef.current = true;
    currentActiveRef.current = index;
    setActive(index);
  }, [STEP, setActive, updateDepth]);

  const updateRadius = useCallback(() => {
    if (!careerRingRef.current) return;
    const firstSlot = careerRingRef.current.querySelector('.career-card-slot') as HTMLElement | null;
    const cardWidth = firstSlot && firstSlot.offsetWidth > 0
      ? firstSlot.offsetWidth
      : (window.innerWidth <= 640 ? 260 : window.innerWidth <= 1024 ? 280 : 320);
    const GAP = 40;
    const r = Math.round((cardWidth + GAP) / 2 / Math.tan(Math.PI / COUNT));
    radiusRef.current = r;
    careerRingRef.current.style.setProperty('--career-ring-r', `${r}px`);

    careerCardSlotsRef.current.forEach((slot, i) => {
      if (slot) {
        slot.style.transform = `rotateY(${i * STEP}deg) translateZ(${r}px)`;
      }
    });

    if (careerRingRef.current) {
      careerRingRef.current.style.transform = `translateZ(${-r}px) rotateY(${angleRef.current}deg)`;
    }

    updateDepth(angleRef.current);
    checkDescOverflow();
  }, [COUNT, STEP, checkDescOverflow, updateDepth]);

  useEffect(() => {
    updateRadius();
    setActive(0);
    checkDescOverflow();
    const el = careerRingRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => updateRadius());
    ro.observe(el);
    window.addEventListener('resize', updateRadius);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateRadius);
    };
  }, [setActive, updateRadius]);

  const handleCareerCardClick = (idx: number) => {
    if (dragInfoRef.current.moved) return;

    const delta = ((idx * -STEP - angleRef.current) % 360 + 540) % 360 - 180;
    if (Math.abs(delta) < 2 && !movingRef.current) {
      scrollToSection('enquiry');
      return;
    }

    goTo(idx, 900);
  };

  const handleDotClick = (idx: number) => {
    goTo(idx, 900);
  };

  const handlePrevCareer = useCallback(() => {
    const cur = targetIndexRef.current >= 0 ? targetIndexRef.current : frontIndex();
    const prevIdx = (cur - 1 + COUNT) % COUNT;
    goTo(prevIdx, 900);
  }, [COUNT, frontIndex, goTo]);

  const handleNextCareer = useCallback(() => {
    const cur = targetIndexRef.current >= 0 ? targetIndexRef.current : frontIndex();
    const nextIdx = (cur + 1) % COUNT;
    goTo(nextIdx, 900);
  }, [COUNT, frontIndex, goTo]);

  const handleCareerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    const drag = dragInfoRef.current;
    drag.isDragging = true;
    drag.startX = e.clientX;
    drag.startY = e.clientY;
    drag.lastX = e.clientX;
    drag.moved = false;

    movingRef.current = false;
    setIsDraggingCareers(true);
  };

  const handleCareerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragInfoRef.current;
    if (!drag.isDragging) return;

    const deltaX = e.clientX - drag.lastX;
    if (Math.abs(e.clientX - drag.startX) > 4 || Math.abs(e.clientY - drag.startY) > 4) {
      drag.moved = true;
    }
    drag.lastX = e.clientX;

    angleRef.current += deltaX * 0.25;
    const radius = radiusRef.current;
    if (careerRingRef.current) {
      careerRingRef.current.style.transform = `translateZ(${-radius}px) rotateY(${angleRef.current}deg)`;
    }
    updateDepth(angleRef.current);

    const curFront = ((Math.round(-angleRef.current / STEP) % COUNT) + COUNT) % COUNT;
    if (curFront !== currentActiveRef.current) {
      currentActiveRef.current = curFront;
      setActive(curFront);
    }
  };

  const handleCareerPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragInfoRef.current;
    if (!drag.isDragging) return;
    drag.isDragging = false;
    setIsDraggingCareers(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (drag.moved) {
      scrollPauseUntilRef.current = performance.now() + 300;
    }
  };

  const handleCareersKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevCareer();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNextCareer();
    }
  };

  // IntersectionObserver for Entry & Viewport tracking
  useEffect(() => {
    const el = careerSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !hasEnteredRef.current) {
          hasEnteredRef.current = true;
          setHasEnteredCareers(true);
          updateRadius();
          setActive(0);
          idleTimeRef.current = 0;
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [setActive, updateRadius]);

  // RequestAnimationFrame continuous infinite rotation loop
  useEffect(() => {
    let animId: number;
    let lastNow = performance.now();
    const SPEED = 0.011; // deg/ms (~11 deg/sec for continuous smooth horizontal flow)

    const frame = (now: number) => {
      const dt = Math.min(now - lastNow, 100);
      lastNow = now;

      if (movingRef.current) {
        const p = Math.min(1, (now - t0Ref.current) / durationRef.current);
        const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        angleRef.current = fromRef.current + (toRef.current - fromRef.current) * e;

        if (careerRingRef.current) {
          careerRingRef.current.style.transform = `translateZ(${-radiusRef.current}px) rotateY(${angleRef.current}deg)`;
        }
        updateDepth(angleRef.current);

        const curFront = ((Math.round(-angleRef.current / STEP) % COUNT) + COUNT) % COUNT;
        if (curFront !== currentActiveRef.current) {
          currentActiveRef.current = curFront;
          setActive(curFront);
        }

        if (p === 1) {
          movingRef.current = false;
        }
      } else if (
        !isHoveredRef.current &&
        !dragInfoRef.current.isDragging &&
        isInViewRef.current &&
        hasEnteredRef.current &&
        performance.now() >= scrollPauseUntilRef.current
      ) {
        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!isReduced) {
          // Continuously advance carousel without stopping or stepping
          angleRef.current -= SPEED * dt;

          if (careerRingRef.current) {
            careerRingRef.current.style.transform = `translateZ(${-radiusRef.current}px) rotateY(${angleRef.current}deg)`;
          }
          updateDepth(angleRef.current);

          const curFront = ((Math.round(-angleRef.current / STEP) % COUNT) + COUNT) % COUNT;
          if (curFront !== currentActiveRef.current) {
            currentActiveRef.current = curFront;
            setActive(curFront);
          }
        }
      }

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [COUNT, STEP, setActive, updateDepth]);

  // Static Enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    audience: 'College Student / Beginner',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Static form: Open WhatsApp enquiry directly with prefilled text
    const text = encodeURIComponent(
      `Hello Digital Ghuru! I want to enquire about the Digital Marketing Course.\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nCategory: ${formData.audience}\nMessage: ${formData.message || 'Please send course syllabus and fee details.'}`
    );
    window.open(`https://wa.me/918825948859?text=${text}`, '_blank');
    setFormSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Section 4: 20 Curriculum Modules
  const curriculumModules: CurriculumModule[] = [
    { number: '01', title: 'Introduction to Digital Marketing', description: 'Digital ecosystem overview, buyer psychology, inbound vs outbound, customer journey stages.' },
    { number: '02', title: 'Website and Landing Page Basics', description: 'WordPress setup, landing page conversion principles, UI/UX fundamentals, mobile responsiveness.' },
    { number: '03', title: 'Search Engine Optimization (SEO)', description: 'How search engines crawl, index, and rank pages; SERP layout and ranking factor breakdown.' },
    { number: '04', title: 'Keyword Research', description: 'Search intent analysis, long-tail keyword discovery, search volume metrics, competitor keyword gap analysis.' },
    { number: '05', title: 'On-Page SEO', description: 'Meta tags, header hierarchies, image alt text optimization, URL structuring, keyword density & LSI.' },
    { number: '06', title: 'Off-Page SEO', description: 'Link building strategies, high-authority backlink outreach, domain authority, anchor text optimization.' },
    { number: '07', title: 'Technical SEO', description: 'Core Web Vitals, XML sitemaps, robots.txt, schema markup, site speed optimization, mobile indexing.' },
    { number: '08', title: 'Social Media Marketing', description: 'Platform algorithms, organic audience growth, engagement strategies, content calendar scheduling.' },
    { number: '09', title: 'Facebook and Instagram Marketing', description: 'Business Suite setup, community building, reels strategies, influencer collaboration frameworks.' },
    { number: '10', title: 'Meta Ads Manager', description: 'Campaign structures, custom audiences, lookalike targeting, pixel tracking, A/B ad creative testing.' },
    { number: '11', title: 'Google Ads (SEM)', description: 'Ad auction dynamics, Quality Score optimization, bidding strategies (tCPA, ROAS), ad extensions.' },
    { number: '12', title: 'Search Advertising', description: 'High-intent search keyword bidding, negative keywords, high-converting ad copy copywriting.' },
    { number: '13', title: 'Display Advertising', description: 'Banner ads, responsive display ads, Google Display Network targeting, remarketing sequences.' },
    { number: '14', title: 'Content Marketing', description: 'Storytelling frameworks, content pillars, lead magnets, editorial workflows, content repurposing.' },
    { number: '15', title: 'Content Creation & Canva', description: 'Graphic design fundamentals, viral hooks, thumbnail design, video scripting for reels and shorts.' },
    { number: '16', title: 'Email Marketing', description: 'List building, newsletter copywriting, email automation sequences, open rate & click rate optimization.' },
    { number: '17', title: 'Google Analytics 4 (GA4)', description: 'Event tracking, user journey reports, conversion funnels, custom exploration reports.' },
    { number: '18', title: 'Marketing Performance Analysis', description: 'ROI calculation, Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), attribution models.' },
    { number: '19', title: 'AI Tools for Digital Marketing', description: 'Leveraging ChatGPT for copy, Midjourney for creatives, Zapier for automation, prompt engineering.' },
    { number: '20', title: 'Marketing Strategy and Campaign Planning', description: 'End-to-end full-funnel campaign blueprint, media planning, budget allocation, client pitch decks.' }
  ];

  // 12 Industry Tech Stack Platforms for Split Orbit
  const techOrbitTools: TechOrbitTool[] = [
    // Inner ring (5 tools)
    {
      name: 'Google Ads',
      useCase: 'Paid Search',
      logo: '/assets/logos/googleads.svg',
      brandColor: '#4285F4',
      ring: 'inner',
      category: 'Paid Ads',
    },
    {
      name: 'Meta',
      useCase: 'Paid Social',
      logo: '/assets/logos/meta.svg',
      brandColor: '#0081FB',
      ring: 'inner',
      category: 'Paid Ads',
    },
    {
      name: 'Google Analytics 4',
      useCase: 'Data & Tracking',
      logo: '/assets/logos/googleanalytics.svg',
      brandColor: '#E37400',
      ring: 'inner',
      category: 'Analytics & SEO',
    },
    {
      name: 'Google Search Console',
      useCase: 'SEO Audits',
      logo: '/assets/logos/googlesearchconsole.svg',
      brandColor: '#458CF5',
      ring: 'inner',
      category: 'Analytics & SEO',
    },
    {
      name: 'ChatGPT',
      useCase: 'AI Copywriting',
      logo: '/assets/logos/chatgpt.svg',
      brandColor: '#10A37F',
      ring: 'inner',
      category: 'AI & Creative',
    },

    // Outer ring (7 tools - fixed predetermined angles)
    {
      name: 'WordPress',
      useCase: 'CMS & Landing Pages',
      logo: '/assets/logos/wordpress.svg',
      brandColor: '#21759B',
      ring: 'outer',
      category: 'Automation',
    },
    {
      name: 'Semrush',
      useCase: 'Competitor Intelligence',
      logo: '/assets/logos/semrush.svg',
      brandColor: '#FF642D',
      ring: 'outer',
      category: 'Analytics & SEO',
    },
    {
      name: 'Ubersuggest',
      useCase: 'Keyword Discovery',
      logo: '/assets/logos/ubersuggest.svg',
      brandColor: '#F25C05',
      ring: 'outer',
      category: 'Analytics & SEO',
    },
    {
      name: 'Midjourney',
      useCase: 'AI Visuals',
      logo: '/assets/logos/midjourney.svg',
      brandColor: '#1E1F22',
      ring: 'outer',
      category: 'AI & Creative',
    },
    {
      name: 'Canva',
      useCase: 'Creative Design',
      logo: '/assets/logos/canva.svg',
      brandColor: '#00C4CC',
      ring: 'outer',
      category: 'AI & Creative',
    },
    {
      name: 'Zapier',
      useCase: 'Marketing Automation',
      logo: '/assets/logos/zapier.svg',
      brandColor: '#FF4F00',
      ring: 'outer',
      category: 'Automation',
    },
    {
      name: 'Mailchimp',
      useCase: 'Email Automation',
      logo: '/assets/logos/mailchimp.svg',
      brandColor: '#FFE01B',
      ring: 'outer',
      category: 'Automation',
    },
  ];

  // Section 8: 9 Career Opportunities (3D Rotating Carousel)
  const careerOpportunities: CareerOpportunity[] = [
    {
      number: '01',
      title: 'Digital Marketing Executive',
      summary: 'Run campaigns across digital platforms.',
      description: 'Manage comprehensive brand campaigns across digital platforms and track daily campaign deliverables.',
      category: 'Generalist',
      skills: ['Campaign planning', 'Reporting', 'Multi-channel ads'],
      logo: '/brand/logo-final.webp',
    },
    {
      number: '02',
      title: 'SEO Specialist',
      summary: 'Grow organic traffic from Google.',
      description: 'Optimize website architecture, audit keyword rankings, and drive high-intent organic traffic from Google.',
      category: 'Search',
      skills: ['Keyword research', 'Technical SEO', 'Link building'],
      logo: '/brand/logo-final.webp',
    },
    {
      number: '03',
      title: 'Social Media Executive',
      summary: 'Content calendars, reels and community.',
      description: 'Design social content calendars, craft short-form reels, and manage community interactions.',
      category: 'Social',
      skills: ['Content calendar', 'Reels editing', 'Community management'],
      logo: '/brand/logo-final.webp',
    },
    {
      number: '04',
      title: 'Social Media Manager',
      summary: 'Lead brand social and influencers.',
      description: 'Lead overarching brand social presence, execute cross-channel influencer partnerships, and report on reach.',
      category: 'Social',
      skills: ['Social strategy', 'Influencer outreach', 'Reach analytics'],
      logo: '/brand/logo-final.webp',
    },
    {
      number: '05',
      title: 'Google Ads Specialist',
      summary: 'Lower cost per click with PPC.',
      description: 'Manage performance PPC campaigns, optimize keyword Quality Scores, and lower Cost Per Click.',
      category: 'Paid Ads',
      skills: ['Search ads', 'Bidding strategy', 'Conversion tracking'],
      logo: '/brand/logo-final.webp',
    },
    {
      number: '06',
      title: 'Content Marketing Executive',
      summary: 'Blogs, case studies and lead magnets.',
      description: 'Research and draft authoritative blog posts, informative case studies, and engaging lead magnets.',
      category: 'Content',
      skills: ['Copywriting', 'SEO writing', 'AI-assisted drafting'],
      logo: '/brand/logo-final.webp',
    },
    {
      number: '07',
      title: 'Digital Marketing Analyst',
      summary: 'Turn GA4 data into dashboards.',
      description: 'Analyze GA4 attribution data and customer acquisition costs, and build actionable executive dashboards.',
      category: 'Analytics',
      skills: ['GA4', 'Attribution', 'Dashboard building'],
      logo: '/brand/logo-final.webp',
    },
    {
      number: '08',
      title: 'Freelance Digital Marketer',
      summary: 'Serve global clients independently.',
      description: 'Work independently with international clients on Upwork/Fiverr, providing tailored marketing services.',
      category: 'Independent',
      skills: ['Client pitching', 'Pricing', 'Project delivery'],
      logo: '/brand/logo-final.webp',
    },
    {
      number: '09',
      title: 'Digital Marketing Entrepreneur',
      summary: 'Launch your own agency or brand.',
      description: 'Launch your own digital marketing boutique agency, eCommerce brand, or affiliate marketing venture.',
      category: 'Business',
      skills: ['Business model', 'Paid growth', 'Automation'],
      logo: '/brand/logo-final.webp',
    },
  ];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF9F6] text-slate-900 font-sans antialiased selection:bg-orange-600 selection:text-white">
      {/* Reusable Premium Navbar */}
      <Navbar activePage="dm" onOpenEnquiry={() => scrollToSection('enquiry')} />

      <main className="pt-[80px] sm:pt-[105px] w-full max-w-full overflow-x-hidden">
        {/* ===================================================================
            SECTION 1: HERO SECTION
            =================================================================== */}
        <section id="hero" className="hero-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hero-grid">

              {/* Left Column: Headlines & CTAs */}
              <div className="text-center lg:text-left pt-2 pb-8 lg:pb-14 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-50 border border-orange-200 text-orange-700 shadow-2xs mb-4 self-center lg:self-start">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>AI-Powered Career Training • Chennai</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-5">
                  Master Digital Marketing.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start via-brand-mid to-brand-end">
                    Build Your Digital Future.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 mb-8">
                  Discover digital marketing skills, explore modern marketing tools and develop the knowledge to grow in today's digital world.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">

                  <button
                    type="button"
                    onClick={() => scrollToSection('enquiry')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-brand-start via-brand-mid to-brand-end hover:brightness-105 shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 transition-all duration-200 cursor-pointer active:scale-[0.99] group"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Verified Course Highlights */}
                <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">100% Practical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">AI Tool Modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Live Exercises</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Placement Support</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Large Student Cutout */}
              <div className="hero-image-wrap">
                {/* Soft Decorative Ambient Glow */}
                <div className="hero-bg-glow" aria-hidden="true" />

                {/* Faint dashed orange circle behind upper body for depth */}
                <div className="hero-bg-circle" aria-hidden="true" />

                {/* Bottom-aligned large student image with WebP + PNG fallback */}
                <picture>
                  <source srcSet="/assets/hero-student.webp" type="image/webp" />
                  <img
                    src="/assets/hero-student.png"
                    alt="Digital Ghuru Digital Marketing Student"
                    className="hero-image select-none"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </div>

            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: WHO CAN JOIN THIS COURSE? (SPIN TO FIND YOUR PATH WHEEL)
            =================================================================== */}
        <AudienceWheelSection onEnquire={() => scrollToSection('enquiry')} />

        {/* ===================================================================
            SECTION 4: COMPLETE COURSE CURRICULUM (COMPACT MARQUEE STRIP)
            =================================================================== */}
        <section
          id="curriculum"
          ref={curriculumSectionRef}
          className="relative pt-12 sm:pt-[90px] pb-6 bg-white overflow-hidden w-full max-w-full"
        >
          {/* Floating Tooltip Box rendered above the track */}
          {activeTooltip && (
            <div
              id="curriculum-active-tooltip"
              role="tooltip"
              className="curriculum-tooltip"
              style={{
                top: `${activeTooltip.y}px`,
                left: `${activeTooltip.x}px`,
              }}
            >
              <div className="text-[10px] font-bold text-[#F04E00] tracking-[1px] uppercase mb-1">
                MODULE {activeTooltip.mod.number}
              </div>
              <div className="text-[12.5px] text-[#0F172A] leading-[1.5] font-normal">
                {activeTooltip.mod.description}
              </div>
              <div
                className="curriculum-tooltip-arrow"
                style={{
                  left: `calc(50% + ${activeTooltip.arrowOffset}px)`,
                }}
              />
            </div>
          )}

          {/* Full-Width Scrolling Marquee Strip (Edge-to-Edge) */}
          <div className="w-full relative overflow-hidden curriculum-marquee-band marquee-container">
            {/* Inner track with smooth edge mask to prevent edge artifact boxes */}
            <div className="curriculum-marquee-track">
              <div
                className="animate-marquee-curriculum"
                style={{
                  animationPlayState: activeTooltip ? 'paused' : undefined,
                }}
              >
                {/* First pass */}
                {curriculumModules.map((mod, idx) => {
                  const isActive = activeTooltip?.mod.number === mod.number;
                  return (
                    <div key={`mod-pass1-${idx}`} className="flex items-center shrink-0">
                      <button
                        type="button"
                        aria-describedby={isActive ? 'curriculum-active-tooltip' : undefined}
                        onMouseEnter={(e) => showCurriculumTooltip(mod, e.currentTarget)}
                        onMouseLeave={hideCurriculumTooltip}
                        onFocus={(e) => showCurriculumTooltip(mod, e.currentTarget)}
                        onBlur={hideCurriculumTooltip}
                        onClick={(e) => handleCurriculumTitleTouch(mod, e.currentTarget)}
                        className={`curriculum-marquee-title ${isActive ? 'is-active-title' : ''}`}
                      >
                        {mod.title}
                      </button>
                      <div className="mx-7 flex items-center justify-center shrink-0">
                        <WhiteSparkle />
                      </div>
                    </div>
                  );
                })}

                {/* Second pass (identical, for seamless 0% to -50% infinite loop) */}
                {curriculumModules.map((mod, idx) => {
                  const isActive = activeTooltip?.mod.number === mod.number;
                  return (
                    <div key={`mod-pass2-${idx}`} className="flex items-center shrink-0">
                      <button
                        type="button"
                        aria-describedby={isActive ? 'curriculum-active-tooltip' : undefined}
                        onMouseEnter={(e) => showCurriculumTooltip(mod, e.currentTarget)}
                        onMouseLeave={hideCurriculumTooltip}
                        onFocus={(e) => showCurriculumTooltip(mod, e.currentTarget)}
                        onBlur={hideCurriculumTooltip}
                        onClick={(e) => handleCurriculumTitleTouch(mod, e.currentTarget)}
                        className={`curriculum-marquee-title ${isActive ? 'is-active-title' : ''}`}
                      >
                        {mod.title}
                      </button>
                      <div className="mx-7 flex items-center justify-center shrink-0">
                        <WhiteSparkle />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>



        {/* ===================================================================
            SECTION: SPLIT ORBIT - TOOLS YOU'LL MASTER (REDESIGNED)
            =================================================================== */}
        <section id="tools" ref={toolsSectionRef} className="tools-section-wrapper">
          <div className="tools-container">
            <div className="tools-grid">

              {/* Left Column: Heading, Subtitle, Chips, Stats, Cert line, CTA */}
              <div className="tools-left-col">
                {/* 1. Pill badge */}
                <div className="tools-badge">
                  <span>Industry tech stack</span>
                </div>

                {/* 2. Heading */}
                <h2 className="tools-heading">
                  Tools you’ll{' '}
                  <span className="tools-heading-gradient">
                    master
                  </span>
                </h2>

                {/* 3. Subtitle */}
                <p className="tools-subtitle">
                  Get hands-on with the same 12 platforms top agencies and brands use every day, from running ads to automating campaigns.
                </p>

                {/* 4. Tool category chips (no icons) */}
                <div className="tools-chips-row">
                  {(['Paid Ads', 'Analytics & SEO', 'AI & Creative', 'Automation'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`tools-category-chip ${activeCategory === cat ? 'is-active' : ''}`}
                      onMouseEnter={() => setHoveredCategory(cat)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      onClick={() => setSelectedCategory((prev) => (prev === cat ? null : cat))}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* 5. Stats in boxes (3-column grid, animated count-up, no icons) */}
                <div className="tools-stats-grid">
                  <div className="tools-stat-box">
                    <div className="tools-stat-number">{Math.round(countProgress * 12)}+</div>
                    <div className="tools-stat-label">Tools</div>
                  </div>
                  <div className="tools-stat-box">
                    <div className="tools-stat-number">{Math.round(countProgress * 3)}</div>
                    <div className="tools-stat-label">Certifications</div>
                  </div>
                  <div className="tools-stat-box">
                    <div className="tools-stat-number">{Math.round(countProgress * 100)}%</div>
                    <div className="tools-stat-label">Hands-on</div>
                  </div>
                </div>

                {/* 6. Certification line (no icons) */}
                <div className="tools-cert-line">
                  Certification prep for Google Ads, GA4 and Meta Blueprint
                </div>

                {/* 7. CTA Buttons */}
                <div className="tools-cta-row">

                  <button
                    type="button"
                    onClick={() => scrollToSection('enquiry')}
                    className="tools-primary-btn"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>

              {/* Right Column: Orbit System */}
              <div className="flex justify-center items-center w-full">
                {/* Orbit Display (visible on screens >400px, responsive scaling via CSS) */}
                <div
                  ref={orbitRef}
                  className="orbit"
                  onClick={(e) => {
                    if (
                      (e.target as HTMLElement).classList?.contains('orbit') ||
                      (e.target as HTMLElement).classList?.contains('ring')
                    ) {
                      setClickedOrbitTool(null);
                    }
                  }}
                >
                  <div className="orbit-glow" aria-hidden="true" />
                  <div className="ring ring--inner" />
                  <div className="ring ring--outer" />
                  <div className="orbit-center">
                    <div className="orbit-center-title">DIGITAL</div>
                    <div className="orbit-center-sub">GHURU</div>
                  </div>

                  <div className="track track--inner">
                    {techOrbitTools
                      .filter((t) => t.ring === 'inner')
                      .map((tool, idx) => {
                        const isMatch = activeCategory ? tool.category === activeCategory : null;
                        const isHighlighted = isMatch === true;
                        const isDimmed = isMatch === false;

                        return (
                          <div
                            key={tool.name}
                            className="slot"
                            style={{ '--i': `${idx}`, '--n': '5' } as React.CSSProperties}
                          >
                            <div className="logo-rotator">
                              <button
                                type="button"
                                className={`logo ${activeOrbitTool === tool.name ? 'is-active' : ''} ${isHighlighted ? 'is-highlighted' : ''
                                  } ${isDimmed ? 'is-dimmed' : ''}`}
                                style={{
                                  '--tool-color': tool.brandColor,
                                  '--tool-glow': `${tool.brandColor}33`,
                                } as React.CSSProperties}
                                aria-label={`${tool.name} – ${tool.useCase}`}
                                onMouseEnter={() => setHoveredOrbitTool(tool.name)}
                                onMouseLeave={() => setHoveredOrbitTool(null)}
                                onFocus={() => setHoveredOrbitTool(tool.name)}
                                onBlur={() => setHoveredOrbitTool(null)}
                                onClick={(e) => handleToolClick(tool.name, e)}
                              >
                                <img src={tool.logo} alt={`${tool.name} logo`} />
                                <span className="tip" role="tooltip">
                                  <span className="tip-title">{tool.name}</span>
                                  <span className="tip-sep">·</span>
                                  <span className="tip-desc">{tool.useCase}</span>
                                </span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className="track track--outer">
                    {techOrbitTools
                      .filter((t) => t.ring === 'outer')
                      .map((tool, idx) => {
                        const isMatch = activeCategory ? tool.category === activeCategory : null;
                        const isHighlighted = isMatch === true;
                        const isDimmed = isMatch === false;

                        return (
                          <div
                            key={tool.name}
                            className="slot"
                            style={{ '--i': `${idx}`, '--n': '7' } as React.CSSProperties}
                          >
                            <div className="logo-rotator">
                              <button
                                type="button"
                                className={`logo ${activeOrbitTool === tool.name ? 'is-active' : ''} ${isHighlighted ? 'is-highlighted' : ''
                                  } ${isDimmed ? 'is-dimmed' : ''}`}
                                style={{
                                  '--tool-color': tool.brandColor,
                                  '--tool-glow': `${tool.brandColor}33`,
                                } as React.CSSProperties}
                                aria-label={`${tool.name} – ${tool.useCase}`}
                                onMouseEnter={() => setHoveredOrbitTool(tool.name)}
                                onMouseLeave={() => setHoveredOrbitTool(null)}
                                onFocus={() => setHoveredOrbitTool(tool.name)}
                                onBlur={() => setHoveredOrbitTool(null)}
                                onClick={(e) => handleToolClick(tool.name, e)}
                              >
                                <img src={tool.logo} alt={`${tool.name} logo`} />
                                <span className="tip" role="tooltip">
                                  <span className="tip-title">{tool.name}</span>
                                  <span className="tip-sep">·</span>
                                  <span className="tip-desc">{tool.useCase}</span>
                                </span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 7: WHY CHOOSE DIGITAL GHURU? (AUTO-CYCLING SHOWCASE)
            =================================================================== */}
        <section
          id="why-choose"
          ref={advantageSectionRef}
          className="py-12 sm:py-20 border-t border-slate-200/80 transition-colors"
          style={{ backgroundColor: '#FAF8F5' }}
        >
          <div className="w-full mx-auto max-w-[1200px] px-4 sm:px-6">
            {/* Header: Pill Badge + Solid Navy Heading */}
            <div className="mb-6 text-left">
              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium leading-none mb-2"
                style={{ backgroundColor: '#FAECE7', color: '#712B13' }}
              >
                <span>Institute advantages</span>
              </div>
              <h2 className="text-3xl sm:text-[40px] font-bold text-[#0F172A] tracking-tight leading-[1.15] m-0">
                Why choose Digital Ghuru?
              </h2>
            </div>

            {/* Mobile (≤640px): Horizontal scrollable row of number chips (01–06) above panel */}
            <div className="block sm:hidden mb-4">
              <div
                role="tablist"
                aria-label="Institute Advantages"
                className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none"
              >
                {advantages.map((item, idx) => {
                  const isActive = activeAdvantageIdx === idx;
                  return (
                    <button
                      key={item.number}
                      id={`advantage-mob-tab-${idx}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="advantage-feature-panel"
                      type="button"
                      onClick={() => setActiveAdvantageIdx(idx)}
                      className={`relative shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${isActive
                        ? 'bg-[#D85A30] text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                    >
                      <span className="font-semibold">{item.number}</span>
                      <span className="truncate max-w-[140px]">{item.title}</span>
                      {isActive && isAdvantageSectionVisible && (
                        <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/70 rounded-full overflow-hidden">
                          <span
                            key={`mob-progress-${activeAdvantageIdx}`}
                            className="block h-full bg-white advantage-compact-progress"
                            style={{
                              animationPlayState: isAdvantageHovered ? 'paused' : 'running',
                            }}
                            onAnimationEnd={goToNextAdvantage}
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Grid Showcase:
                Desktop (>1024px): 1fr 1fr; gap: 24px; align-items: center;
                Tablet (≤1024px): Stack panel above list
            */}
            <div
              className="showcase-container grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
              onMouseEnter={() => setIsAdvantageHovered(true)}
              onMouseLeave={() => setIsAdvantageHovered(false)}
            >
              {/* Left Column: Compact Numbered List (6 items directly below each other, gap: 0) */}
              <div
                role="tablist"
                aria-label="Institute Advantages"
                className="hidden sm:flex flex-col gap-0 order-2 lg:order-1"
              >
                {advantages.map((item, idx) => {
                  const isActive = activeAdvantageIdx === idx;
                  return (
                    <button
                      key={item.number}
                      id={`advantage-tab-${idx}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="advantage-feature-panel"
                      tabIndex={isActive ? 0 : -1}
                      type="button"
                      onClick={() => setActiveAdvantageIdx(idx)}
                      onKeyDown={(e) => handleAdvantageKeyDown(e, idx)}
                      className={`advantage-compact-row ${isActive ? 'is-active' : ''}`}
                    >
                      {/* Fixed 28px width number */}
                      <span
                        className={`text-[14px] w-[28px] shrink-0 transition-colors ${isActive
                          ? 'font-semibold text-[#D85A30]'
                          : 'font-medium text-[#94A3B8]'
                          }`}
                      >
                        {item.number}
                      </span>

                      {/* Title */}
                      <span
                        className={`text-[17px] leading-snug transition-colors ${isActive
                          ? 'font-semibold text-[#0F172A]'
                          : 'font-medium text-[#475569]'
                          }`}
                      >
                        {item.title}
                      </span>

                      {/* 2px Coral Progress line at the bottom */}
                      {isActive && isAdvantageSectionVisible && (
                        <div
                          key={`progress-${activeAdvantageIdx}`}
                          className="advantage-compact-progress"
                          style={{
                            animationPlayState: isAdvantageHovered ? 'paused' : 'running',
                          }}
                          onAnimationEnd={goToNextAdvantage}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Flat Coral Feature Panel */}
              <div className="order-1 lg:order-2 flex w-full">
                <div
                  id="advantage-feature-panel"
                  role="tabpanel"
                  aria-labelledby={`advantage-tab-${activeAdvantageIdx}`}
                  onMouseMove={handlePanelMouseMove}
                  onMouseLeave={handlePanelMouseLeave}
                  onTouchStart={handleTouchStartAdvantage}
                  onTouchEnd={handleTouchEndAdvantage}
                  className="feature-panel-ref w-full text-white flex flex-col justify-between"
                  style={{
                    transform:
                      panelTilt.x || panelTilt.y
                        ? `perspective(1000px) rotateX(${panelTilt.x}deg) rotateY(${panelTilt.y}deg)`
                        : undefined,
                    transition: 'transform 180ms ease-out',
                  }}
                >
                  {/* Two Crisp Decorative Circles (no blur, background #F0997B, opacity .45) */}
                  <div aria-hidden="true" className="panel-circle-1" />
                  <div aria-hidden="true" className="panel-circle-2" />

                  {/* Panel Content (Switch animates with fade in, move up from 18px, scale 0.97 -> 1) */}
                  {(() => {
                    const current = advantages[activeAdvantageIdx];
                    const IconComp = current.icon;
                    return (
                      <div
                        key={`panel-content-${activeAdvantageIdx}`}
                        className="panel-content-transition relative z-10 flex flex-col justify-between h-full min-h-[270px]"
                      >
                        {/* Top: 64px Icon Tile + Title + Description */}
                        <div>
                          {/* 64px Icon Tile: 16px radius, background peach #F5C4B3, icon dark brown #712B13 at 28px */}
                          <div className="w-16 h-16 rounded-[16px] bg-[#F5C4B3] flex items-center justify-center icon-tile-bob-ref">
                            <IconComp className="w-7 h-7 text-[#712B13]" />
                          </div>

                          {/* Title: 26px, weight 600, white, 20px above (mt-5), 6px below (mb-1.5) */}
                          <h3 className="text-[26px] font-semibold text-white tracking-tight leading-snug mt-5 mb-1.5">
                            {current.title}
                          </h3>

                          {/* Description: 16px, #FAECE7, line-height 1.5, one or two lines */}
                          <p className="text-[16px] text-[#FAECE7] leading-[1.5] max-w-md m-0">
                            {current.description}
                          </p>
                        </div>

                        {/* Bottom: Stat number (48px, weight 500, white, 20px above) + Stat label (14px, #FAECE7, sentence case) */}
                        <div className="mt-5">
                          <div className="text-[48px] font-medium text-white leading-none tracking-tight mb-1">
                            {displayStat}
                          </div>
                          <div className="text-[14px] font-normal text-[#FAECE7] leading-tight">
                            {current.statLabel}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 8: CAREER OPPORTUNITIES (3D ROTATING CAROUSEL)
            =================================================================== */}
        <section
          id="careers"
          ref={careerSectionRef}
          tabIndex={0}
          onKeyDown={handleCareersKeyDown}
          className="career-section-bg outline-none py-12 sm:py-24 overflow-hidden w-full max-w-full"
          style={{ overflow: 'hidden' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 1. Section header (centred) */}
            <div
              className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${hasEnteredCareers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FFF1E6] text-[#C2410C] mb-4">
                <span>CAREER DIRECTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-[1.15] mb-3">
                Career Opportunities in{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #FFA000 0%, #F04E00 100%)',
                  }}
                >
                  Digital Marketing
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-1">
                Explore the roles you can pursue after completing the course.
              </p>
              <p className="text-[13px] text-[#94A3B8] italic">
                *These represent potential industry pathways, not guaranteed placements.
              </p>
            </div>

            {/* 2. 3D Stage & Rotating Ring */}
            <div
              className={`career-stage-wrapper ${isDraggingCareers ? 'is-dragging' : ''}`}
              onMouseEnter={() => { isHoveredRef.current = true; }}
              onMouseLeave={() => { isHoveredRef.current = false; }}
              onPointerDown={handleCareerPointerDown}
              onPointerMove={handleCareerPointerMove}
              onPointerUp={handleCareerPointerUp}
              onPointerCancel={handleCareerPointerUp}
            >
              {/* Floor reflection under the ring */}
              <div aria-hidden="true" className="career-floor-reflection" />

              {/* Ring Stage with entry tilt & scale */}
              <div
                className={`career-stage-inner ${hasEnteredCareers ? 'is-entered' : 'is-entering'
                  }`}
              >
                <div ref={careerRingRef} className="career-ring">
                  {careerOpportunities.map((career, idx) => {
                    const isActive = activeHighlightIdx === idx;
                    return (
                      <div
                        key={career.number}
                        ref={(el) => {
                          careerCardSlotsRef.current[idx] = el;
                        }}
                        className={`career-card-slot ${isActive ? 'is-active' : ''}`}
                        style={{ '--i': `${idx}` } as React.CSSProperties}
                      >
                        <button
                          type="button"
                          onClick={() => handleCareerCardClick(idx)}
                          className={`career-card card ${isActive ? 'is-active' : ''}`}
                          aria-current={isActive ? 'true' : undefined}
                          aria-label={`Role ${career.number}: ${career.title}`}
                        >
                          <div className={`career-card-inner inner ${isActive ? 'is-active' : ''}`}>
                            {/* Orange Gradient Overlay Layer */}
                            <div aria-hidden="true" className="career-card-overlay overlay" />

                            {/* Digital Ghuru watermark logo behind content (medium size) */}
                            <div aria-hidden="true" className="career-card-watermark watermark">
                              <img
                                src={career.logo || '/brand/logo-final.webp'}
                                alt="Digital Ghuru"
                                className="career-watermark-logo"
                                loading="lazy"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = '/brand/logo-navbar.webp';
                                }}
                              />
                            </div>

                            {/* Card Content (z-index: 10 above overlay) */}
                            <div className="career-card-content">
                              {/* Top row: Number and category chip */}
                              <div className="flex items-center justify-between w-full">
                                <span className="career-card-num num">{career.number}</span>
                                <span className="career-card-chip chip">{career.category}</span>
                              </div>

                              {/* Small label: ROLE 0X OF 09 */}
                              <div className="career-card-role-label">
                                ROLE {career.number} OF 09
                              </div>

                              {/* Role title */}
                              <h3 className="career-card-title title">
                                {career.title}
                              </h3>

                              {/* Scrollable description area */}
                              <div
                                className="desc-scroll"
                                tabIndex={0}
                                aria-label="Role description"
                                onPointerDown={(e) => e.stopPropagation()}
                                onWheel={(e) => {
                                  e.stopPropagation();
                                  scrollPauseUntilRef.current = performance.now() + 3000;
                                  idleTimeRef.current = 0;
                                }}
                                onScroll={handleDescScroll}
                                onKeyDown={(e) => {
                                  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
                                    e.stopPropagation();
                                    scrollPauseUntilRef.current = performance.now() + 3000;
                                    idleTimeRef.current = 0;
                                  }
                                }}
                              >
                                <p className="career-card-desc desc">
                                  {career.description}
                                </p>
                              </div>

                              {/* Divider */}
                              <div className="career-card-divider divider" />

                              {/* SKILLS YOU'LL USE label */}
                              <div className="career-skills-label">
                                SKILLS YOU’LL USE
                              </div>

                              {/* Skill chips */}
                              <div
                                className="career-skill-chips-wrap"
                                onPointerDown={(e) => e.stopPropagation()}
                                onWheel={(e) => {
                                  e.stopPropagation();
                                  scrollPauseUntilRef.current = performance.now() + 3000;
                                  idleTimeRef.current = 0;
                                }}
                              >
                                {career.skills.map((skill, sIdx) => (
                                  <span
                                    key={skill}
                                    className="career-skill-chip"
                                    style={{ '--s-idx': sIdx } as React.CSSProperties}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>

                              {/* Text link: Explore role → */}
                              <div className="career-card-link link">
                                <span>Explore role</span>
                                <span>→</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Prev / Next controls below the ring: 24px gap */}
            <div
              className="flex items-center justify-center gap-4 mt-6"
              onMouseEnter={() => { isHoveredRef.current = true; }}
              onMouseLeave={() => { isHoveredRef.current = false; }}
            >
              <button
                type="button"
                onClick={handlePrevCareer}
                className="career-nav-btn"
                aria-label="Previous career opportunity"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNextCareer}
                className="career-nav-btn"
                aria-label="Next career opportunity"
              >
                →
              </button>
            </div>

            {/* Progress dots: 16px gap below buttons */}
            <div
              className="flex items-center justify-center gap-2 mt-4"
              onMouseEnter={() => { isHoveredRef.current = true; }}
              onMouseLeave={() => { isHoveredRef.current = false; }}>
              {careerOpportunities.map((career, idx) => {
                const isActive = activeHighlightIdx === idx;
                return (
                  <button
                    key={career.number}
                    type="button"
                    onClick={() => handleDotClick(idx)}
                    className={`career-dot ${isActive ? 'is-active' : ''}`}
                    aria-label={`Go to role ${career.number}: ${career.title}`}
                  />
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div
              className={`text-center mt-12 transition-all duration-700 delay-300 ${hasEnteredCareers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            >
              <p className="text-base text-[#475569] mb-4">
                Not sure which path fits you?
              </p>
              <button
                type="button"
                onClick={() => scrollToSection('enquiry')}
                className="career-counsel-btn"
              >
                <span>Get Free Career Counselling</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 9: STUDENT PROJECTS, GALLERY AND WORKSHOP SESSIONS
            =================================================================== */}
        <TrainingGallerySection onBookVisit={() => scrollToSection('enquiry')} />

        {/* ===================================================================
            SECTION 10: STUDENT ENQUIRY / ADMISSION CTA
            =================================================================== */}
        <section id="enquiry" className="py-12 sm:py-20 bg-gradient-to-b from-[#FAF9F6] to-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Direct Call / WhatsApp Options */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-800">
                  <span>ADMISSION ENQUIRY</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Ready to Start Your Digital Marketing Journey?
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Take the next step towards learning digital marketing. Contact Digital Ghuru to know more about the course syllabus, class timings, and fee structure.
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href="tel:+918825948859"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-orange-300 shadow-xs hover:shadow transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Call Admissions Office</span>
                      <span className="text-sm font-bold text-slate-900">+91 8825948859</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/918825948859?text=Hello%20Digital%20Ghuru,%20I%20am%20interested%20in%20the%20Digital%20Marketing%20Course.%20Please%20share%20the%20syllabus%20and%20fee%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Instant WhatsApp Enquiry</span>
                      <span className="text-sm font-bold text-emerald-700">Chat with counselor (+91 8825948859)</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Visit Our Training Centre</span>
                      <span className="text-xs font-semibold text-slate-800">Campus visits open Mon–Sat: 9:00 AM – 7:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Contact Card matching reference popup */}
              <div className="lg:col-span-6">
                {isCardDismissed ? (
                  <div className="rounded-[24px] bg-[#FAF8F5] border border-orange-200/60 p-8 sm:p-10 shadow-xl text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
                    <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shadow-inner">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">Enquiry Form Dismissed</h4>
                      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Looking for course syllabus, class timings, or current fee offers?
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCardDismissed(false)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 shadow-md shadow-slate-900/15 transition-all cursor-pointer"
                    >
                      <span>Reopen Enquiry Form</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="relative rounded-[24px] overflow-hidden shadow-2xl border border-orange-200/50 bg-[#FAF8F5] transition-all">
                    {/* Vibrant Orange Gradient Header Section (Compact Height) */}
                    <div className="relative bg-gradient-to-br from-[#ea580c] via-[#f97316] to-[#c2410c] text-white px-5 py-3 sm:px-6 sm:py-3.5 pb-2.5 sm:pb-3">
                      {/* Top Row: Pill Badge + Close Button */}
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/20 text-orange-100 text-[11px] font-semibold backdrop-blur-sm border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                          <span>Limited seats</span>
                          <span className="text-white/40">•</span>
                          <span>Next batch</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsCardDismissed(true)}
                          aria-label="Close enquiry card"
                          className="w-6 h-6 rounded-lg bg-black/20 hover:bg-black/35 text-white/90 hover:text-white flex items-center justify-center transition border border-white/15 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Prominent Offer Heading */}
                      <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white mb-1.5 leading-tight">
                        Free counselling offer ends in
                      </h3>

                      {/* Countdown Timer & Teaser */}
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        {/* Minutes Box */}
                        <div className="bg-white text-slate-900 rounded-lg px-2 py-0.5 shadow-xs flex flex-col items-center justify-center min-w-[42px] sm:min-w-[46px]">
                          <span className="text-lg sm:text-xl font-black leading-none tracking-tight">{enquiryMin}</span>
                          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">MIN</span>
                        </div>

                        <span className="text-white/80 font-black text-lg pb-0.5">:</span>

                        {/* Seconds Box */}
                        <div className="bg-white text-slate-900 rounded-lg px-2 py-0.5 shadow-xs flex flex-col items-center justify-center min-w-[42px] sm:min-w-[46px]">
                          <span className="text-lg sm:text-xl font-black leading-none tracking-tight">{enquirySec}</span>
                          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">SEC</span>
                        </div>

                        {/* Teaser copy */}
                        <p className="text-white text-xs sm:text-[13px] font-semibold leading-tight ml-1.5">
                          Book now and get the full syllabus free
                        </p>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-1 bg-black/25 rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full transition-all duration-700"
                          style={{ width: '84%' }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-orange-100/90 font-medium mt-1">
                        <span>Seats fill fast. Book soon.</span>
                        <span className="text-amber-200 font-bold">84% Claimed</span>
                      </div>
                    </div>

                    {/* Form Body on Clean Off-White Background (#FAF8F5 - Compact) */}
                    <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-[#FAF8F5]">
                      <div className="mb-2.5">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                          Request Course Syllabus & Counseling
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Fill this quick form to connect directly with our admissions counselor.
                        </p>
                      </div>

                      {formSubmitted ? (
                        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2.5 animate-fade-in">
                          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                          <h4 className="text-sm font-bold text-emerald-900">Enquiry Initiated!</h4>
                          <p className="text-xs text-emerald-700 leading-relaxed">
                            WhatsApp was opened with your pre-filled course enquiry. Our counselor will assist you shortly.
                          </p>
                          <button
                            type="button"
                            onClick={() => setFormSubmitted(false)}
                            className="text-xs font-bold text-emerald-800 underline cursor-pointer"
                          >
                            Submit another enquiry
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-2">
                          {/* Student Name */}
                          <div>
                            <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                              Student Name <span className="text-orange-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="e.g. Sangeetha"
                              className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300/80 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 focus:outline-none transition shadow-xs"
                            />
                          </div>

                          {/* Phone Number & Email Address (2 columns) */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                                Phone Number <span className="text-orange-500">*</span>
                              </label>
                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="e.g. 9876543210"
                                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300/80 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 focus:outline-none transition shadow-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                                Email Address
                              </label>
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="e.g. name@example.com"
                                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300/80 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 focus:outline-none transition shadow-xs"
                              />
                            </div>
                          </div>

                          {/* I Am A... */}
                          <div>
                            <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                              I Am A...
                            </label>
                            <div className="relative">
                              <select
                                value={formData.audience}
                                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300/80 bg-white text-xs sm:text-sm text-slate-900 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 focus:outline-none transition shadow-xs appearance-none cursor-pointer pr-10"
                              >
                                <option>College Student</option>
                                <option>Fresh Graduate</option>
                                <option>Complete Beginner</option>
                                <option>Working Professional</option>
                                <option>Business Owner / Entrepreneur</option>
                                <option>Freelancer</option>
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          {/* Message / Questions (Optional) */}
                          <div>
                            <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                              Message / Questions (Optional)
                            </label>
                            <textarea
                              rows={1}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Ask about batch timings, fees, or course curriculum..."
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-300/80 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 focus:outline-none transition shadow-xs resize-none"
                            />
                          </div>

                          {/* Submit Button (Vibrant Header Gradient Color) */}
                          <button
                            type="submit"
                            className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs uppercase sm:text-sm tracking-wider text-white bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#c2410c] hover:brightness-105 active:scale-[0.99] transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer group"
                          >
                            <span>SUBMIT & RESERVE SPOT</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>

                          <p className="text-[10px] text-slate-500 text-center leading-tight mt-1.5">
                            *This connects directly to our verified counselor line without third-party data tracking.
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 12: FREQUENTLY ASKED QUESTIONS (FAQ CHAT)
            =================================================================== */}
        <FaqChatSection onTalkToCounsellor={() => scrollToSection('enquiry')} />

      </main>

      {/* Common Footer */}
      <Footer />

      {/* Fixed Sticky Counselling Offer Bar */}
      <StickyOfferBar onOpenEnquiry={() => setIsEnquiryPopupOpen(true)} />

      {/* Auto-popup 2s on Mount */}
      <CourseEnquiryPopup
        isOpen={isEnquiryPopupOpen}
        onClose={() => setIsEnquiryPopupOpen(false)}
        courseName="Digital Marketing Course"
        defaultRole="College student"
        roleOptions={[
          'College student',
          'Fresh graduate / Job seeker',
          'Working professional',
          'Business owner / Entrepreneur',
          'Freelancer / Creator',
          'Other',
        ]}
      />
    </div>
  );
};

export default DigitalMarketingCoursePage;

