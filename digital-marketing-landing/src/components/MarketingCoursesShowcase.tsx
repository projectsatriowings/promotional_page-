import React, { useState, useRef } from 'react';
import { 
  ArrowRight, Sparkles, ChevronLeft, ChevronRight, Layers, LayoutGrid, Tag, Eye, Send, Clock
} from 'lucide-react';
import { MARKETING_COURSES } from '../data/marketingCoursesData';
import { MarketingCourseDetailView } from './MarketingCourseDetailView';

interface MarketingCoursesShowcaseProps {
  onOpenEnquiry: (courseId: string) => void;
}

export const MarketingCoursesShowcase: React.FC<MarketingCoursesShowcaseProps> = ({ onOpenEnquiry }) => {
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
    if (mobileIndex < MARKETING_COURSES.length - 1) {
      setMobileIndex((prev) => prev + 1);
      scrollToMobileIndex(mobileIndex + 1);
    }
  };

  const scrollToMobileIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth * 0.84;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const selectedCourse = MARKETING_COURSES.find((c) => c.id === selectedCourseId) || null;

  return (
    <section id="courses" className="py-24 md:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Official DigitalGhuru Programs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Explore Our Digital Marketing Programs
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              From our flagship 12-Module AI-Powered certification to intensive media buying bootcamps. Hover over any card to view syllabus details or enrol.
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
            <MarketingCourseDetailView
              course={selectedCourse}
              onSelectCourse={(id) => handleSelectCourse(id)}
              onClose={handleCloseDetails}
              onOpenEnquiry={(id) => onOpenEnquiry(id)}
            />
          </div>
        )}

        {/* DESKTOP VIEW: THREE MARKETING COURSES */}
        <div className="hidden md:block">
          {viewMode === 'deck' ? (
            <div className="relative pt-6 pb-14">
              <div className="flex items-stretch justify-center -space-x-4 lg:-space-x-8 px-6 py-6 perspective-1000 max-w-5xl mx-auto">
                {MARKETING_COURSES.map((course, idx) => {
                  const isHovered = hoveredCourseId === course.id;
                  const isSelected = selectedCourseId === course.id;

                  const zIndex = isHovered ? 30 : isSelected ? 25 : 10 + idx;
                  const rotationMap = [-1.5, 0, 1.5];
                  const yTranslationMap = [2, 0, 2];
                  const baseRotation = rotationMap[idx] || 0;
                  const baseY = yTranslationMap[idx] || 0;

                  return (
                    <div
                      key={course.id}
                      id={`marketing-card-${idx}`}
                      tabIndex={0}
                      role="region"
                      aria-label={course.title}
                      onMouseEnter={() => setHoveredCourseId(course.id)}
                      onMouseLeave={() => setHoveredCourseId(null)}
                      style={{
                        zIndex,
                        transform: isHovered
                          ? 'translateY(-22px) scale(1.03) rotate(0deg)'
                          : isSelected
                          ? 'translateY(-14px) scale(1.02) rotate(0deg)'
                          : `translateY(${baseY}px) rotate(${baseRotation}deg)`,
                      }}
                      className={`group relative flex-1 max-w-[340px] lg:max-w-[360px] rounded-3xl bg-white border cursor-pointer select-none transition-all duration-300 ease-out focus-within:ring-4 focus-within:ring-orange-500/30 ${
                        isSelected
                          ? 'border-orange-600 shadow-2xl ring-2 ring-orange-600/20'
                          : isHovered
                          ? 'border-orange-400 shadow-2xl'
                          : 'border-stone-200 shadow-lg'
                      }`}
                    >
                      <div className="h-2.5 w-full rounded-t-3xl bg-orange-600" />

                      <div className="p-6 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center justify-between mb-3.5">
                            <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-orange-100 text-orange-900">
                              Track {course.number}
                            </span>
                            <span className="text-xs font-bold text-slate-900 bg-stone-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                              <Tag className="w-3 h-3 text-orange-600" />
                              <span>{course.price}</span>
                            </span>
                          </div>

                          <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-stone-100 border border-stone-100">
                            <img
                              src={course.cardImage}
                              alt={course.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                            <div className="absolute bottom-2.5 left-3 right-3 text-white">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                                {course.badge}
                              </span>
                            </div>
                          </div>

                          <h3 className="text-lg font-black text-slate-900 leading-snug mb-2">
                            {course.title}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-6">
                            {course.shortDescription}
                          </p>
                        </div>

                        {/* CTA ACTION AREA */}
                        <div className="relative pt-3 border-t border-stone-100 min-h-[56px] flex items-center justify-center">
                          <div className="text-xs font-medium text-slate-400 group-hover:opacity-0 group-focus-within:opacity-0 transition-opacity duration-200 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{course.duration.split('(')[0]}</span>
                          </div>

                          <div className="absolute inset-x-0 bottom-1 flex items-center gap-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all duration-200">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectCourse(course.id);
                              }}
                              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-md flex items-center justify-center gap-1.5"
                            >
                              <Eye className="w-3.5 h-3.5 text-amber-300" />
                              <span>View Course</span>
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenEnquiry(course.id);
                              }}
                              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 transition-colors shadow-md flex items-center justify-center gap-1.5"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Enrol Now</span>
                            </button>
                          </div>
                        </div>

                      </div>

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
                Hover to view "View Course" and "Enrol Now" actions • Click any track to inspect curriculum modules
              </p>
            </div>
          ) : (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {MARKETING_COURSES.map((course) => (
                <div
                  key={course.id}
                  className={`group rounded-3xl bg-white border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 focus-within:ring-4 focus-within:ring-orange-500/20 ${
                    selectedCourseId === course.id
                      ? 'border-orange-600 ring-2 ring-orange-600/20'
                      : 'border-stone-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase bg-orange-100 text-orange-800">
                        Track {course.number}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900 bg-stone-100 px-2.5 py-0.5 rounded-full">
                        {course.price}
                      </span>
                    </div>

                    <div className="h-48 rounded-2xl overflow-hidden mb-4 bg-stone-100">
                      <img
                        src={course.cardImage}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                      />
                    </div>

                    <h3 className="text-lg font-black text-slate-900 leading-snug mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
                    <button
                      onClick={() => handleSelectCourse(course.id)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-300" />
                      <span>View Course</span>
                    </button>
                    <button
                      onClick={() => onOpenEnquiry(course.id)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 transition-colors shadow-sm flex items-center justify-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Enrol Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MOBILE VIEW */}
        <div className="block md:hidden">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 pt-2 px-1"
          >
            {MARKETING_COURSES.map((course) => {
              const isSelected = selectedCourseId === course.id;
              return (
                <div
                  key={course.id}
                  className={`flex-shrink-0 w-[84vw] max-w-xs snap-center rounded-3xl bg-white border p-5 flex flex-col justify-between shadow-lg transition-all ${
                    isSelected ? 'border-orange-600 ring-2 ring-orange-600/20' : 'border-stone-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase bg-orange-100 text-orange-800">
                        Track {course.number}
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

                  <div className="space-y-2 pt-3 border-t border-stone-100">
                    <button
                      onClick={() => handleSelectCourse(course.id)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isSelected ? 'Viewing Below' : 'View Course'}</span>
                    </button>
                    <button
                      onClick={() => onOpenEnquiry(course.id)}
                      className="w-full py-2 px-4 rounded-xl text-xs font-bold text-white bg-orange-600 flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3 h-3" />
                      <span>Enrol Now</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 px-2">
            <div className="flex items-center gap-1.5">
              {MARKETING_COURSES.map((_, dotIdx) => (
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
                disabled={mobileIndex === MARKETING_COURSES.length - 1}
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

