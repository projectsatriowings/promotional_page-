import React, { useState, useRef } from 'react';
import { 
  ArrowRight, Sparkles, ChevronLeft, ChevronRight, Layers, LayoutGrid, Tag, Eye, Send, Clock, 
  Target, Award, CheckCircle2, ShieldCheck, Laptop, ExternalLink
} from 'lucide-react';
import { MARKETING_COURSES, MarketingCourse } from '../data/marketingCoursesData';
import { MarketingCourseDetailView } from './MarketingCourseDetailView';

interface MarketingCoursesShowcaseProps {
  onOpenEnquiry: (courseId: string) => void;
}

export const MarketingCoursesShowcase: React.FC<MarketingCoursesShowcaseProps> = ({ onOpenEnquiry }) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'editorial' | 'grid'>('editorial');
  const [mouseTilt, setMouseTilt] = useState<{ id: string; x: number; y: number } | null>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ id, x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt(null);
  };

  const primaryCourse = MARKETING_COURSES[0];
  const supportingCourses = MARKETING_COURSES.slice(1);
  const selectedCourse = MARKETING_COURSES.find((c) => c.id === selectedCourseId) || null;

  return (
    <section id="courses" className="py-24 md:py-32 bg-[#FAF9F6] text-slate-900 relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Verified Industry Curriculums</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Elite Digital Marketing Programs
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              From our flagship 12-Module AI-Powered certification to intensive media buying bootcamps. Select any program to inspect full weekly modules and placement criteria.
            </p>
          </div>

          {/* Desktop View Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-200/80 p-1.5 rounded-xl border border-slate-300/80">
            <button
              onClick={() => setViewMode('editorial')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'editorial'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Feature Editorial</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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

        {/* Selected Course Detail Modal/Drawer */}
        {selectedCourse && (
          <div ref={detailsRef} className="mb-16 scroll-mt-28">
            <MarketingCourseDetailView
              course={selectedCourse}
              onSelectCourse={handleSelectCourse}
              onClose={handleCloseDetails}
              onOpenEnquiry={onOpenEnquiry}
            />
          </div>
        )}

        {/* Editorial Layout: Large Feature Card for Track 01 + Asymmetric Cards for 02 & 03 */}
        {viewMode === 'editorial' && (
          <div className="space-y-8">
            
            {/* Primary Feature Card: Track 01 */}
            <div 
              onMouseMove={(e) => handleMouseMove(e, primaryCourse.id)}
              onMouseLeave={handleMouseLeave}
              className="relative bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden group transition-all duration-300 hover:border-orange-500/50 hover:shadow-2xl"
              style={{
                transform: mouseTilt?.id === primaryCourse.id 
                  ? `perspective(1000px) rotateY(${mouseTilt.x * 2}deg) rotateX(${-mouseTilt.y * 2}deg)`
                  : 'none'
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-orange-600 text-white">
                      TRACK {primaryCourse.number} • FLAGSHIP
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-orange-600" />
                      <span>{primaryCourse.duration}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {primaryCourse.price}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                      {primaryCourse.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {primaryCourse.shortDescription}
                    </p>
                  </div>

                  {/* Key outcomes checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {primaryCourse.keyOutcomes.slice(0, 4).map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tool Badges */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-2">
                      Tools Mastered in Sprints:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {primaryCourse.tools.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 border border-slate-200 text-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3.5">
                    <button
                      onClick={() => handleSelectCourse(primaryCourse.id)}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-600/20 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View 12-Module Curriculum</span>
                    </button>

                    <button
                      onClick={() => onOpenEnquiry(primaryCourse.id)}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <span>Enrol / Download Brochure</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Preview Card */}
                <div className="lg:col-span-5 relative">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl relative group">
                    <img
                      src="/brand/dm-banner.jpg"
                      alt="Digital Marketing Classroom Session"
                      className="w-full h-80 sm:h-96 object-cover filter brightness-[0.92] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/80 shadow-lg">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-orange-700">Next Cohort Admissions Open</span>
                        <span className="text-emerald-700 font-bold">100% Placement Cell</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Offline Campuses: Chennai (Anna Nagar, Korattur), Hyderabad (Ameerpet) & Live Online.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Asymmetrical Supporting Grid: Track 02 & Track 03 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {supportingCourses.map((course) => (
                <div
                  key={course.id}
                  onMouseMove={(e) => handleMouseMove(e, course.id)}
                  onMouseLeave={handleMouseLeave}
                  className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-orange-500/50 hover:shadow-xl shadow-sm"
                  style={{
                    transform: mouseTilt?.id === course.id 
                      ? `perspective(1000px) rotateY(${mouseTilt.x * 3}deg) rotateX(${-mouseTilt.y * 3}deg)`
                      : 'none'
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-orange-700 border border-slate-200">
                        TRACK {course.number}
                      </span>
                      <span className="text-sm font-black text-slate-900 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                        {course.price}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-orange-600" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-700">
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{course.badge}</span>
                      </div>
                    </div>

                    {/* Key Outcomes */}
                    <div className="space-y-1.5 pt-2">
                      {course.keyOutcomes.slice(0, 2).map((out, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleSelectCourse(course.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Inspect Modules</span>
                    </button>

                    <button
                      onClick={() => onOpenEnquiry(course.id)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      <span>Enrol</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Grid View Mode */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MARKETING_COURSES.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 flex flex-col justify-between hover:border-orange-500/50 hover:shadow-lg transition-all shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-orange-600">TRACK {course.number}</span>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full">{course.price}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{course.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3">{course.shortDescription}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleSelectCourse(course.id)}
                    className="text-xs text-orange-600 font-bold hover:underline"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOpenEnquiry(course.id)}
                    className="px-3.5 py-2 rounded-lg bg-orange-600 text-white text-xs font-bold shadow-sm"
                  >
                    Enrol Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
