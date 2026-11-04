import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface GalleryPhoto {
  src: string;
  title: string;
  subtitle: string;
  alt: string;
}

export const DEFAULT_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: '/assets/classroom_workshop.jpg',
    title: 'Hands-on Classroom Lab',
    subtitle: 'Students working on real SEO and campaign briefs',
    alt: 'Students collaborating on SEO and digital campaign briefs in practical classroom lab',
  },
  {
    src: '/assets/day_1_image.png',
    title: 'Digital Strategy Foundations',
    subtitle: 'Breaking down viral campaigns and customer journeys',
    alt: 'Interactive foundational workshop on digital strategy and audience mapping',
  },
  {
    src: '/assets/day_2_image.png',
    title: 'AI Marketing Tool Demos',
    subtitle: 'Running ChatGPT and automated workflows live',
    alt: 'Live workshop demonstration of generative AI marketing tools and automation',
  },
  {
    src: '/assets/whos_for_it_image.png',
    title: 'Active Peer Community',
    subtitle: 'Learn alongside ambitious students and professionals',
    alt: 'Diverse cohort of learners and professionals interacting in class',
  },
  {
    src: '/assets/workshop_promises_image.png',
    title: 'Learning Outcomes',
    subtitle: 'Focused on practical, job-ready skills',
    alt: 'Tangible skill acquisition and hands-on portfolio milestones',
  },
  {
    src: '/assets/hands_on_method_image.png',
    title: 'Live Campaign Simulation',
    subtitle: 'Real-time ad spend allocation and A/B split testing',
    alt: 'Simulation of multi-channel ad spend allocation and campaign performance',
  },
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
    title: 'Agency Sprint Reviews',
    subtitle: 'Pitching live strategy decks to experienced agency mentors',
    alt: 'Students presenting campaign analytics and strategy decks during sprint review',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    title: 'Collaborative Group Labs',
    subtitle: 'Brainstorming cross-channel social and performance strategies',
    alt: 'Collaborative group problem-solving in modern technology training room',
  },
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    title: '1:1 Mentor Feedback',
    subtitle: 'Personalized portfolio critiques and resume polishing',
    alt: 'One on one mentor feedback session reviewing student portfolio and career roadmap',
  },
];

// Column configurations: varied order so adjacent columns never match, with varied heights for masonry feel
const COL_1_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const COL_1_HEIGHTS = [240, 300, 200, 280, 220, 310, 190, 270, 250];

const COL_2_INDICES = [3, 7, 1, 8, 2, 6, 0, 4, 5];
const COL_2_HEIGHTS = [290, 210, 310, 230, 270, 200, 280, 220, 260];

const COL_3_INDICES = [6, 2, 8, 4, 0, 7, 5, 1, 3];
const COL_3_HEIGHTS = [220, 300, 210, 290, 240, 270, 200, 310, 230];

interface TrainingGallerySectionProps {
  photos?: GalleryPhoto[];
  onBookVisit?: () => void;
}

export const TrainingGallerySection: React.FC<TrainingGallerySectionProps> = ({
  photos = DEFAULT_GALLERY_PHOTOS,
  onBookVisit,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [isSectionInView, setIsSectionInView] = useState(false);

  // Counter states
  const [countCampuses, setCountCampuses] = useState(0);
  const [countMentor, setCountMentor] = useState('0:0');
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const lastFocusedTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalImageRef = useRef<HTMLImageElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // 1. Intersection Observer for lazy animation & entry reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEnteredView(true);
            setIsSectionInView(true);
          } else {
            setIsSectionInView(false);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Count-up effect for stat boxes
  useEffect(() => {
    if (!isSectionInView || statsAnimated) return;
    setStatsAnimated(true);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCountCampuses(2);
      setCountMentor('1:1');
      return;
    }

    const duration = 850;
    const startTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCountCampuses(Math.round(eased * 2));
      if (progress >= 0.5) {
        setCountMentor('1:1');
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isSectionInView, statsAnimated]);

  // 3. Open Lightbox with shared-element origin measurement
  const handleOpenLightbox = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOriginRect(rect);
    lastFocusedTriggerRef.current = e.currentTarget;
    setLightboxIndex(index);
    setIsClosing(false);
    setSlideDirection(null);
  };

  // 4. Close Lightbox with reverse FLIP animation
  const handleCloseLightbox = useCallback(() => {
    if (lightboxIndex === null) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced || !originRect || !modalImageRef.current) {
      setLightboxIndex(null);
      setIsClosing(false);
      lastFocusedTriggerRef.current?.focus();
      return;
    }

    setIsClosing(true);
    const imgEl = modalImageRef.current;
    const currentRect = imgEl.getBoundingClientRect();
    const scaleX = originRect.width / currentRect.width;
    const scaleY = originRect.height / currentRect.height;
    const deltaX = originRect.left + originRect.width / 2 - (currentRect.left + currentRect.width / 2);
    const deltaY = originRect.top + originRect.height / 2 - (currentRect.top + currentRect.height / 2);

    imgEl.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
    imgEl.style.opacity = '0';
    imgEl.style.transition = 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms ease';

    setTimeout(() => {
      setLightboxIndex(null);
      setIsClosing(false);
      lastFocusedTriggerRef.current?.focus();
    }, 450);
  }, [lightboxIndex, originRect]);

  // Navigate lightbox photos
  const handlePrevPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setSlideDirection('left');
    setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + photos.length) % photos.length));
  }, [lightboxIndex, photos.length]);

  const handleNextPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setSlideDirection('right');
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % photos.length));
  }, [lightboxIndex, photos.length]);

  // FLIP animation on initial open
  useEffect(() => {
    if (lightboxIndex === null || isClosing || !originRect || !modalImageRef.current) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const imgEl = modalImageRef.current;
    const currentRect = imgEl.getBoundingClientRect();
    const scaleX = originRect.width / currentRect.width;
    const scaleY = originRect.height / currentRect.height;
    const deltaX = originRect.left + originRect.width / 2 - (currentRect.left + currentRect.width / 2);
    const deltaY = originRect.top + originRect.height / 2 - (currentRect.top + currentRect.height / 2);

    // Initial inverted position
    imgEl.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
    imgEl.style.opacity = '0.9';
    imgEl.style.transition = 'none';

    // Force layout reflow
    void imgEl.offsetHeight;

    // Animate to full center
    requestAnimationFrame(() => {
      imgEl.style.transform = 'translate(0px, 0px) scale(1, 1)';
      imgEl.style.opacity = '1';
      imgEl.style.transition = 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms ease';
    });
  }, [lightboxIndex, originRect, isClosing]);

  // Keyboard navigation & Esc & scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextPhoto();
      } else if (e.key === 'Tab' && dialogRef.current) {
        // Focus trap
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, handleCloseLightbox, handlePrevPhoto, handleNextPhoto]);

  // Mobile swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Render a column of tiles
  const renderColumn = (colIndices: number[], colHeights: number[], colNum: number) => {
    return (
      <div className={`gallery-col-track col-${colNum}`}>
        {/* Set A (accessible) */}
        <div className="gallery-col-group">
          {colIndices.map((photoIdx, i) => {
            const photo = photos[photoIdx];
            const h = colHeights[i];
            return (
              <button
                key={`a-${colNum}-${i}`}
                type="button"
                className="gallery-tile"
                style={{ height: `${h}px` }}
                onClick={(e) => handleOpenLightbox(photoIdx, e)}
                aria-label={`Open photo: ${photo.title}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="gallery-tile-img"
                />
                <div className="gallery-tile-overlay" />
                <span className="gallery-tile-pill">View</span>
                <div className="gallery-tile-caption">
                  <div className="gallery-tile-title">{photo.title}</div>
                  <div className="gallery-tile-subtitle">{photo.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Set B (duplicated for seamless loop, aria-hidden) */}
        <div className="gallery-col-group" aria-hidden="true">
          {colIndices.map((photoIdx, i) => {
            const photo = photos[photoIdx];
            const h = colHeights[i];
            return (
              <button
                key={`b-${colNum}-${i}`}
                type="button"
                tabIndex={-1}
                className="gallery-tile"
                style={{ height: `${h}px` }}
                onClick={(e) => handleOpenLightbox(photoIdx, e)}
              >
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  className="gallery-tile-img"
                />
                <div className="gallery-tile-overlay" />
                <span className="gallery-tile-pill">View</span>
                <div className="gallery-tile-caption">
                  <div className="gallery-tile-title">{photo.title}</div>
                  <div className="gallery-tile-subtitle">{photo.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const activePhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className={`gallery-section-wrapper ${hasEnteredView ? 'gallery-in-view' : ''}`}
    >
      <div className="gallery-layout-grid">
        {/* ================= LEFT COLUMN: TEXT & STATS ================= */}
        <div className="gallery-left-content">
          {/* Pill Badge */}
          <div className="gallery-fade-up delay-0">
            <span className="gallery-pill-badge">Inside the Classroom</span>
          </div>

          {/* Heading */}
          <h2 className="gallery-main-heading gallery-fade-up delay-100">
            Training Sessions &{' '}
            <span className="gallery-gradient-text">Learning Environment</span>
          </h2>

          {/* Subtitle */}
          <p className="gallery-subtitle gallery-fade-up delay-200">
            A look at our workshops, labs and learning cohorts at our Chennai and Hyderabad centres.
            Hover to pause, click any image to enlarge.
          </p>

          {/* Stat Boxes (2x2 Grid) */}
          <div className="gallery-stats-grid gallery-fade-up delay-300">
            {/* Box 1: Campuses */}
            <div className="gallery-stat-box">
              <span className="gallery-stat-num">{countCampuses}</span>
              <span className="gallery-stat-label">Campuses</span>
            </div>

            {/* Box 2: Live Workshops */}
            <div className="gallery-stat-box">
              <span className="gallery-stat-num">Live</span>
              <span className="gallery-stat-label">Workshops</span>
            </div>

            {/* Box 3: 1:1 Mentor feedback */}
            <div className="gallery-stat-box">
              <span className="gallery-stat-num">{countMentor}</span>
              <span className="gallery-stat-label">Mentor feedback</span>
            </div>

            {/* Box 4: Weekly Practical labs */}
            <div className="gallery-stat-box">
              <span className="gallery-stat-num">Weekly</span>
              <span className="gallery-stat-label">Practical labs</span>
            </div>
          </div>

          {/* Button */}
          <div className="gallery-fade-up delay-400">
            <button
              type="button"
              onClick={onBookVisit || (() => {
                const enquiryEl = document.getElementById('enquiry');
                if (enquiryEl) {
                  enquiryEl.scrollIntoView({ behavior: 'smooth' });
                }
              })}
              className="gallery-cta-btn"
            >
              <span>Book a Free Campus Visit</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: 3 MOVING PHOTO COLUMNS ================= */}
        <div
          className={`gallery-cols-wrapper ${
            !isSectionInView || lightboxIndex !== null ? 'is-paused' : ''
          }`}
          aria-label="Classroom and workshop photo columns"
        >
          {/* Column 1: Moves UP (36s) */}
          <div className="gallery-col-enter col-delay-1 gallery-col-item">
            {renderColumn(COL_1_INDICES, COL_1_HEIGHTS, 1)}
          </div>

          {/* Column 2: Moves DOWN (44s) */}
          <div className="gallery-col-enter col-delay-2 gallery-col-item">
            {renderColumn(COL_2_INDICES, COL_2_HEIGHTS, 2)}
          </div>

          {/* Column 3: Moves UP (40s) */}
          <div className="gallery-col-enter col-delay-3 gallery-col-item gallery-col-3">
            {renderColumn(COL_3_INDICES, COL_3_HEIGHTS, 3)}
          </div>
        </div>
      </div>

      {/* ================= FULLSCREEN ANIMATED LIGHTBOX ================= */}
      {lightboxIndex !== null && activePhoto && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${activePhoto.title}`}
          className={`gallery-lightbox-backdrop ${isClosing ? 'is-closing' : 'is-open'}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseLightbox();
            }
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close button (top right) */}
          <button
            type="button"
            className="gallery-lightbox-close-btn"
            onClick={handleCloseLightbox}
            aria-label="Close photo viewer"
          >
            ×
          </button>

          {/* Prev button (left) */}
          <button
            type="button"
            className="gallery-lightbox-nav-btn btn-prev"
            onClick={handlePrevPhoto}
            aria-label="Previous photo"
          >
            ←
          </button>

          {/* Center Image and Caption container */}
          <div
            className="gallery-lightbox-dialog-body"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-lightbox-img-wrapper">
              <img
                key={activePhoto.src}
                ref={modalImageRef}
                src={activePhoto.src}
                alt={activePhoto.alt}
                className={`gallery-lightbox-img ${
                  slideDirection === 'left'
                    ? 'slide-from-left'
                    : slideDirection === 'right'
                    ? 'slide-from-right'
                    : ''
                }`}
              />
            </div>

            {/* Caption */}
            <div className="gallery-lightbox-caption">
              <div className="gallery-lightbox-title">{activePhoto.title}</div>
              <div className="gallery-lightbox-subtitle">{activePhoto.subtitle}</div>
              <div className="gallery-lightbox-counter">
                {lightboxIndex + 1} / {photos.length}
              </div>
            </div>
          </div>

          {/* Next button (right) */}
          <button
            type="button"
            className="gallery-lightbox-nav-btn btn-next"
            onClick={handleNextPhoto}
            aria-label="Next photo"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

