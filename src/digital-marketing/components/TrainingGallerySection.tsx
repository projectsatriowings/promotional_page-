import React, { useState, useEffect, useRef } from 'react';

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

// Heights per tile in each column (260-320px for masonry look and >620px total height per column)
const COL_HEIGHTS: number[][] = [
  [280, 320, 270], // Column 1: sum = 870px
  [310, 270, 310], // Column 2: sum = 890px
  [270, 310, 290], // Column 3: sum = 870px
];

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

  // Split photo array into 3 separate groups with NO shared images between columns
  // photos[0,3,6] -> col 1; photos[1,4,7] -> col 2; photos[2,5,8] -> col 3
  const columns: GalleryPhoto[][] = [[], [], []];
  photos.forEach((photo, i) => {
    columns[i % 3].push(photo);
  });

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

  // Render a column of tiles (rendered only with its own group, duplicated once for seamless loop)
  const renderColumn = (colPhotos: GalleryPhoto[], colNum: number) => {
    const heights = COL_HEIGHTS[colNum - 1] || [280, 300, 280];

    return (
      <div className={`gallery-col-track col-${colNum}`}>
        {/* Set A (accessible) */}
        <div className="gallery-col-group">
          {colPhotos.map((photo, i) => {
            const h = heights[i % heights.length];
            return (
              <figure
                key={`col-${colNum}-a-${i}`}
                className="gallery-tile"
                style={{ height: `${h}px` }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="gallery-tile-img"
                />
                <div className="gallery-tile-overlay" />
                <figcaption className="gallery-tile-caption">
                  <div className="gallery-tile-title">{photo.title}</div>
                  <div className="gallery-tile-subtitle">{photo.subtitle}</div>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Set B (duplicated for seamless loop, aria-hidden) */}
        <div className="gallery-col-group" aria-hidden="true">
          {colPhotos.map((photo, i) => {
            const h = heights[i % heights.length];
            return (
              <figure
                key={`col-${colNum}-b-${i}`}
                className="gallery-tile"
                style={{ height: `${h}px` }}
              >
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  className="gallery-tile-img"
                />
                <div className="gallery-tile-overlay" />
                <figcaption className="gallery-tile-caption">
                  <div className="gallery-tile-title">{photo.title}</div>
                  <div className="gallery-tile-subtitle">{photo.subtitle}</div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    );
  };

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
              onClick={
                onBookVisit ||
                (() => {
                  const enquiryEl = document.getElementById('enquiry');
                  if (enquiryEl) {
                    enquiryEl.scrollIntoView({ behavior: 'smooth' });
                  }
                })
              }
              className="gallery-cta-btn"
            >
              <span>Book a Free Campus Visit</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: 3 MOVING PHOTO COLUMNS ================= */}
        <div
          className={`gallery-cols-wrapper ${!isSectionInView ? 'is-paused' : ''}`}
          aria-label="Classroom and workshop photo columns"
        >
          {/* Column 1: Moves UP (36s) */}
          <div className="gallery-col-enter col-delay-1 gallery-col-item">
            {renderColumn(columns[0], 1)}
          </div>

          {/* Column 2: Moves DOWN (44s) */}
          <div className="gallery-col-enter col-delay-2 gallery-col-item">
            {renderColumn(columns[1], 2)}
          </div>

          {/* Column 3: Moves UP (40s) */}
          <div className="gallery-col-enter col-delay-3 gallery-col-item gallery-col-3">
            {renderColumn(columns[2], 3)}
          </div>
        </div>
      </div>
    </section>
  );
};
