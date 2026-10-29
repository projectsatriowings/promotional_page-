import React, { useState } from 'react';
import { 
  X, Check, Sparkles, ArrowRight, ArrowLeft, ExternalLink, Tag, 
  Clock, ShieldCheck, ChevronDown, ChevronRight, Briefcase
} from 'lucide-react';
import { MARKETING_COURSES, MarketingCourse } from '../data/marketingCoursesData';

interface MarketingCourseDetailViewProps {
  course: MarketingCourse;
  onSelectCourse: (courseId: string) => void;
  onClose: () => void;
  onOpenEnquiry: (courseId: string) => void;
}

export const MarketingCourseDetailView: React.FC<MarketingCourseDetailViewProps> = ({
  course,
  onSelectCourse,
  onClose,
  onOpenEnquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'audience'>('overview');
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  React.useEffect(() => {
    setActiveTab('overview');
    setExpandedModule(0);
  }, [course.id]);

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden transition-all duration-300">
      
      {/* Top Banner Navigation Strip */}
      <div className="bg-slate-950 text-white px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-300 hover:text-white px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Deck</span>
        </button>

        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-[11px] font-semibold text-stone-400 hidden lg:inline mr-1">
            Switch Track:
          </span>
          {MARKETING_COURSES.map((c) => {
            const isCurrent = c.id === course.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCourse(c.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isCurrent
                    ? 'bg-orange-600 text-white font-bold shadow-sm'
                    : 'bg-slate-900 text-stone-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="truncate max-w-[120px] sm:max-w-none">
                  {c.number}. {c.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          aria-label="Close details"
          className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8 lg:p-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-stone-100">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-orange-100 text-orange-900">
                Track {course.number} • {course.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{course.duration}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-orange-700 font-bold bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                <Tag className="w-3.5 h-3.5" />
                <span>{course.price}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-3">
              {course.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {course.shortDescription}
            </p>
          </div>

          <div className="flex-shrink-0 bg-stone-50 p-5 rounded-2xl border border-stone-200/90 lg:w-72 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Enrollment Open
              </div>
              <div className="text-base font-extrabold text-slate-900 mb-1">
                Fee: {course.price}
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Includes 50+ tool licenses, live client brief internships & 100% placement support.
              </p>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => onOpenEnquiry(course.id)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all duration-200 bg-orange-600 hover:bg-orange-500"
              >
                <span>Enrol / Request Syllabus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={course.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 py-1 transition-colors"
              >
                <span>View on digitalghuru.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-4 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            Overview & Core Outcomes
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'modules'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            Curriculum Modules ({course.modules.length})
          </button>
          <button
            onClick={() => setActiveTab('audience')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'audience'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            Who Is This Program For?
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 group">
                <img
                  src={course.heroImage}
                  alt={course.title}
                  className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                    Agency-Style Learning Experience
                  </div>
                  <h4 className="text-sm font-bold">{course.format}</h4>
                </div>
              </div>

              {/* Tools Mastered */}
              <div className="mt-5 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Industry & AI Tools Mastered
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {course.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white border border-stone-200 text-slate-800"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Program Description</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {course.fullDescription}
              </p>

              <h3 className="text-lg font-bold text-slate-900 mb-3">Key Learning Outcomes</h3>
              <div className="space-y-3 mb-8">
                {course.keyOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5 text-xs font-bold bg-orange-600">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 leading-normal font-medium">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-100 text-xs flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="text-slate-700 font-medium leading-relaxed">
                  100% Placement & Freelance support included with portfolio reviews, mock interviews, and direct referral access to 100+ hiring partners.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MODULES ACCORDION */}
        {activeTab === 'modules' && (
          <div className="pt-8 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Step-by-Step Curriculum Framework</h3>
                <p className="text-xs text-slate-500">Comprehensive syllabus designed around agency-style execution.</p>
              </div>
              <span className="text-xs text-slate-500 font-medium">Click module to expand</span>
            </div>

            <div className="space-y-3">
              {course.modules.map((mod, idx) => {
                const isExpanded = expandedModule === idx;
                return (
                  <div
                    key={idx}
                    className="border border-stone-200 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setExpandedModule(isExpanded ? null : idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-stone-50/70 hover:bg-stone-100/70 transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-orange-600">
                          {mod.number}
                        </span>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900">
                            {mod.title}
                          </h4>
                          <span className="text-xs text-slate-500">{mod.duration}</span>
                        </div>
                      </div>
                      <div className="p-1 rounded-full text-slate-400">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 sm:p-6 bg-white border-t border-stone-100 space-y-4 text-xs sm:text-sm">
                        <div>
                          <h5 className="font-bold text-slate-800 mb-2">Core Topics Covered:</h5>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {mod.topics.map((t, tIdx) => (
                              <li key={tIdx} className="flex items-center gap-2 text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3.5 rounded-xl bg-orange-50/80 border border-orange-200 flex items-start gap-2.5">
                          <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-orange-900 block">Milestone Practical Task:</span>
                            <span className="text-orange-800">{mod.handsOnTask}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: TARGET AUDIENCE */}
        {activeTab === 'audience' && (
          <div className="pt-8 space-y-6 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900">Who Should Enroll in This Program?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.targetAudience.map((aud, aIdx) => (
                <div key={aIdx} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-800">{aud}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Switcher Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-bold text-slate-900">Explore Other Marketing Tracks</h4>
              <p className="text-xs text-slate-500">Switch directly between specialized certifications.</p>
            </div>
            <button
              onClick={onClose}
              className="text-xs font-bold text-orange-600 hover:underline inline-flex items-center gap-1"
            >
              <span>View All Programs Deck</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MARKETING_COURSES.map((c) => {
              const isSelected = c.id === course.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCourse(c.id)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'border-orange-600 bg-orange-50/40 shadow-md ring-2 ring-orange-600/20'
                      : 'border-stone-200 bg-white hover:border-orange-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-orange-100 text-orange-800">
                      Track {c.number}
                    </span>
                    <span className="text-[11px] font-bold text-slate-800">{c.price}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">{c.title}</h5>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {c.shortDescription}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

