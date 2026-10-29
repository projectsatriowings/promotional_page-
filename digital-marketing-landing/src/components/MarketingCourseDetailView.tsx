import React, { useState } from 'react';
import { 
  X, Check, Sparkles, ArrowRight, ArrowLeft, ExternalLink, Tag, 
  Clock, ShieldCheck, ChevronDown, ChevronRight, Briefcase, Laptop, UserCheck
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
    <div className="w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 transition-all duration-300">
      
      {/* Top Banner Navigation Strip */}
      <div className="bg-slate-900 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 text-white">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Programs</span>
        </button>

        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-[11px] font-semibold text-slate-400 hidden lg:inline mr-1">
            Switch Track:
          </span>
          {MARKETING_COURSES.map((c) => {
            const isCurrent = c.id === course.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCourse(c.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-orange-600 text-white font-bold shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="truncate max-w-[120px] sm:max-w-none">
                  Track {c.number}. {c.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          aria-label="Close details"
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8 lg:p-10">
        
        {/* Header Info */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-orange-100 text-orange-900">
                Track {course.number} • {course.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
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
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {course.shortDescription}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col flex-shrink-0">
            <button
              onClick={() => onOpenEnquiry(course.id)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
            >
              <span>Apply for Cohort Seat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-slate-500 text-center">
              Weekend & Weekday Batches Open
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-100 pt-6 pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Curriculum Overview & Outcomes
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'modules'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Weekly Module Breakdown ({course.modules.length} Modules)
          </button>
          <button
            onClick={() => setActiveTab('audience')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'audience'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Target Audience & Placement
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Detailed Program Description</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-3">Key Learning Outcomes</h4>
                <div className="space-y-2.5">
                  {course.keyOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Format & Delivery
                </span>
                <p className="text-xs text-slate-700">{course.format}</p>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Toolstack Mastered
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {course.tools.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-white text-slate-700 text-[11px] border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  100% Placement Cell
                </span>
                <span className="text-slate-500">Jaighurudeva Certified</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Modules Accordion */}
        {activeTab === 'modules' && (
          <div className="space-y-3 max-w-4xl">
            {course.modules.map((mod, idx) => {
              const isOpen = expandedModule === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 hover:bg-slate-100/60 transition-colors"
                >
                  <button
                    onClick={() => setExpandedModule(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-orange-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{mod.title}</h4>
                        <span className="text-[11px] text-slate-500">{mod.duration}</span>
                      </div>
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-orange-600" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-200 space-y-3 text-xs bg-white">
                      <div className="pt-3">
                        <span className="text-slate-700 font-semibold block mb-1">Topics Explored:</span>
                        <ul className="space-y-1 text-slate-600">
                          {mod.topics.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-slate-800">
                        <strong className="text-[11px] uppercase tracking-wider text-orange-800 block mb-0.5">Hands-On Sprints:</strong>
                        <span>{mod.handsOnTask}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Audience & Placement */}
        {activeTab === 'audience' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-orange-600" />
                <span>Who Is This Program Engineered For?</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {course.targetAudience.map((aud, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>{aud}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span>Placement Guarantee Details</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students who achieve 85%+ attendance and complete all module sprints gain direct referrals to our 100+ partner digital marketing agencies and high-growth brands in Chennai, Bangalore, and Hyderabad.
              </p>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                Includes mock technical interviews, AI-optimized resume building, and client capstone portfolio reviews.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
