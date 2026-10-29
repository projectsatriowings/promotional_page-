import React, { useState, useRef } from 'react';
import { 
  ArrowRight, Sparkles, ChevronLeft, ChevronRight, Layers, LayoutGrid, Tag
} from 'lucide-react';
import { COURSES } from '../data/coursesData';
import { CourseDetailView } from './CourseDetailView';

interface CoursesShowcaseProps {
  onOpenEnquiry: (courseId: string) => void;
}

export const CoursesShowcase: React.FC<CoursesShowcaseProps> = ({ onOpenEnquiry }) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');
  const [mobileIndex, setMobileIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleCloseDetails = () => {
    setSelectedCourseId(null);
  };

  const handlePrevMobile = () => {
    if (mobileIndex > 0) {
      setMobileIndex((prev) => prev - 1);
      scrollToMobileIndex(mobileIndex - 1);
    }
  };

  const handleNextMobile = () => {
    if (mobileIndex < COURSES.length - 1) {
      setMobileIndex((prev) => prev + 1);
      scrollToMobileIndex(mobileIndex + 1);
    }
  };

  const scrollToMobileIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth * 0.82;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, courseId: string, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectCourse(courseId);
    } else if (e.key === 'ArrowRight' && index < COURSES.length - 1) {
      const nextCard = document.getElementById(`course-card-${index + 1}`);
      nextCard?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      const prevCard = document.getElementById(`course-card-${index - 1}`);
      prevCard?.focus();
    }
  };

  const selectedCourse = COURSES.find((c) => c.id === selectedCourseId) || null;

  return (
    <section id="courses" className="py-24 md:py-32 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Official DigitalGhuru Curriculum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Explore Our AI Learning Programs
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Four progressive pathways calibrated for each developmental stage. Click any card to inspect full curriculum modules, project milestones, and verified syllabus outcomes.
            </p>
          </div>

          {/* Desktop View Switcher */}
          <div className="hidden sm:flex items-center gap-2 bg-stone-200/70 p-1.5 rounded-2xl border border-stone-300/80">
            <button
              onClick={() => setViewMode('deck')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'deck'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Layered Deck</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* EXPANDED DETAILS VIEW */}
        {selectedCourse && (
          <div ref={detailsRef} className="mb-16 transition-all duration-500 ease-out">
            <CourseDetailView
              course={selectedCourse}
              onSelectCourse={(id) => handleSelectCourse(id)}
              onClose={handleCloseDetails}
              onOpenEnquiry={(id) => onOpenEnquiry(id)}
            />
          </div>
        )}

        {/* DESKTOP VIEW: FANNED / LAYERED CARD DECK */}
        <div className="hidden md:block">
          {viewMode === 'deck' ? (
            <div className="relative pt-6 pb-14">
              
              <div className="flex items-stretch justify-center -space-x-6 lg:-space-x-10 px-6 py-6 perspective-1000">
                {COURSES.map((course, idx) => {
                  const isHovered = hoveredCourseId === course.id;
                  const isSelected = selectedCourseId === course.id;

                  const zIndex = isHovered ? 30 : isSelected ? 25 : 10 + idx;
                  const rotationMap = [-2, -0.7, 0.7, 2];
                  const yTranslationMap = [4, 0, 0, 4];
                  const baseRotation = rotationMap[idx] || 0;
                  const baseY = yTranslationMap[idx] || 0;

                  return (
                    <div
                      key={course.id}
                      id={`course-card-${idx}`}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${course.title}`}
                      onKeyDown={(e) => handleKeyDown(e, course.id, idx)}
                      onMouseEnter={() => setHoveredCourseId(course.id)}
                      onMouseLeave={() => setHoveredCourseId(null)}
                      onClick={() => handleSelectCourse(course.id)}
                      style={{
                        zIndex,
                        transform: isHovered
                          ? 'translateY(-24px) scale(1.03) rotate(0deg)'
                          : isSelected
                          ? 'translateY(-16px) scale(1.02) rotate(0deg)'
                          : `translateY(${baseY}px) rotate(${baseRotation}deg)`,
                      }}
                      className={`relative flex-1 max-w-[310px] lg:max-w-[330px] rounded-3xl bg-white border cursor-pointer select-none transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-orange-500/30 ${
                        isSelected
                          ? 'border-orange-600 shadow-2xl ring-2 ring-orange-600/20'
                          : isHovered
                          ? 'border-orange-400 shadow-2xl'
                          : 'border-stone-200 shadow-lg'
                      }`}
                    >
                      {/* Top Accent Strip */}
                      <div
                        className="h-2.5 w-full rounded-t-3xl transition-colors"
                        style={{ backgroundColor: course.accent.hex }}
                      />

                      <div className="p-5 flex flex-col justify-between h-full">
                        <div>
                          {/* Header badges */}
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wider"
                              style={{
                                backgroundColor: course.accent.lightHex,
                                color: course.accent.hex,
                              }}
                            >
                              Track {course.number} • {course.gradeBadge}
                            </span>
                            <span className="text-xs font-bold text-slate-900 bg-stone-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Tag className="w-3 h-3 text-orange-600" />
                              <span>{course.price}</span>
                            </span>
                          </div>

                          {/* Official Course Image */}
                          <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-stone-100 border border-stone-100">
                            <img
                              src={course.cardImage}
                              alt={course.title}
                              className={`w-full h-full object-cover transition-transform duration-500 ${
                                isHovered ? 'scale-108' : 'scale-100'
                              }`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                            <div className="absolute bottom-2.5 left-3 right-3 text-white">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                                {course.ageGroup}
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-base lg:text-lg font-black text-slate-900 leading-snug mb-1.5 line-clamp-2">
                            {course.title}
                          </h3>

                          {/* Short Description */}
                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                            {course.shortDescription}
                          </p>
                        </div>

                        {/* Card Bottom Action */}
                        <div className="pt-3 border-t border-stone-100">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span
                              className="transition-colors"
                              style={{ color: course.accent.hex }}
                            >
                              {isSelected ? 'Viewing Curriculum' : 'View Course'}
                            </span>
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform duration-200"
                              style={{ backgroundColor: course.accent.hex }}
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Active Indicator Pin */}
                      {isSelected && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-md">
                          Selected Track
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-center text-xs text-slate-400 mt-4">
                Hover to elevate • Click any track to toggle full curriculum & syllabus details
              </p>
            </div>
          ) : (
            /* DESKTOP ALTERNATIVE: SIDE-BY-SIDE GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COURSES.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleSelectCourse(course.id)}
                  className={`rounded-3xl bg-white border cursor-pointer p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${
                    selectedCourseId === course.id
                      ? 'border-orange-600 ring-2 ring-orange-600/20'
                      : 'border-stone-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase"
                        style={{
                          backgroundColor: course.accent.lightHex,
                          color: course.accent.hex,
                        }}
                      >
                        {course.gradeBadge}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900 bg-stone-100 px-2 py-0.5 rounded-full">
                        {course.price}
                      </span>
                    </div>

                    <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-stone-100">
                      <img
                        src={course.cardImage}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-base font-black text-slate-900 leading-snug mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      View Curriculum
                    </span>
                    <ArrowRight className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MOBILE VIEW: SWIPEABLE CAROUSEL */}
        <div className="block md:hidden">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 pt-2 px-1"
          >
            {COURSES.map((course) => {
              const isSelected = selectedCourseId === course.id;
              return (
                <div
                  key={course.id}
                  onClick={() => handleSelectCourse(course.id)}
                  className={`flex-shrink-0 w-[82vw] max-w-xs snap-center rounded-3xl bg-white border p-5 flex flex-col justify-between shadow-lg transition-all ${
                    isSelected ? 'border-orange-600 ring-2 ring-orange-600/20' : 'border-stone-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase"
                        style={{
                          backgroundColor: course.accent.lightHex,
                          color: course.accent.hex,
                        }}
                      >
                        {course.gradeBadge}
                      </span>
                      <span className="text-xs font-bold text-slate-900 bg-stone-100 px-2.5 py-0.5 rounded-full">
                        {course.price}
                      </span>
                    </div>

                    <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-stone-100">
                      <img
                        src={course.cardImage}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-base font-black text-slate-900 leading-snug mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {course.shortDescription}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCourse(course.id);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
                    style={{ backgroundColor: course.accent.hex }}
                  >
                    <span>{isSelected ? 'Viewing Below' : 'View Course Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center justify-between pt-2 px-2">
            <div className="flex items-center gap-1.5">
              {COURSES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    setMobileIndex(dotIdx);
                    scrollToMobileIndex(dotIdx);
                  }}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    mobileIndex === dotIdx ? 'w-6 bg-orange-600' : 'w-2 bg-stone-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMobile}
                disabled={mobileIndex === 0}
                aria-label="Previous card"
                className="p-2 rounded-xl border border-stone-200 bg-white text-slate-700 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMobile}
                disabled={mobileIndex === COURSES.length - 1}
                aria-label="Next card"
                className="p-2 rounded-xl border border-stone-200 bg-white text-slate-700 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
