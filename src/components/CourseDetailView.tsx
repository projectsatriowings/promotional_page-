import React, { useState } from 'react';
import { 
  X, Check, Sparkles, ArrowRight, Play, 
  Terminal, ChevronRight, ChevronDown, ArrowLeft, ExternalLink, Tag
} from 'lucide-react';
import type { Course } from '../data/coursesData';
import { COURSES } from '../data/coursesData';

interface CourseDetailViewProps {
  course: Course;
  onSelectCourse: (courseId: string) => void;
  onClose: () => void;
  onOpenEnquiry: (courseId: string) => void;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  onSelectCourse,
  onClose,
  onOpenEnquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'projects' | 'sandbox'>('overview');
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [isSimPlaying, setIsSimPlaying] = useState(false);
  const [sandboxCustomInput, setSandboxCustomInput] = useState(course.simulationData.demoPrompt);
  const [simOutput, setSimOutput] = useState(course.simulationData.demoOutput);

  React.useEffect(() => {
    setActiveTab('overview');
    setExpandedModule(0);
    setSandboxCustomInput(course.simulationData.demoPrompt);
    setSimOutput(course.simulationData.demoOutput);
    setIsSimPlaying(false);
  }, [course.id]);

  const handleRunSimulation = () => {
    setIsSimPlaying(true);
    setSimOutput('Synthesizing kid-safe pipeline response...');
    setTimeout(() => {
      setSimOutput(
        `✓ Execution Complete: [DigitalGhuru ${course.gradeBadge}] processed command: "${sandboxCustomInput}". Model confidence: 98.4%. Verified safe.`
      );
      setIsSimPlaying(false);
    }, 800);
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden transition-all duration-300">
      
      {/* Top Banner Navigation Strip */}
      <div className="bg-slate-950 text-white px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        
        {/* Back to deck */}
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-300 hover:text-white px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All 4 Tracks</span>
        </button>

        {/* 4-Course Jump Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-[11px] font-semibold text-stone-400 hidden lg:inline mr-1">
            Jump to Track:
          </span>
          {COURSES.map((c) => {
            const isCurrent = c.id === course.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCourse(c.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] text-white font-bold shadow-sm'
                    : 'bg-slate-900 text-stone-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white/70" />
                <span className="truncate max-w-[120px] sm:max-w-none">
                  {c.gradeBadge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close detailed view"
          className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8 lg:p-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-stone-100">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider"
                style={{
                  backgroundColor: course.accent.lightHex,
                  color: course.accent.hex,
                }}
              >
                Track {course.number} • {course.gradeBadge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-slate-700">
                {course.level}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-orange-700 font-bold bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                <Tag className="w-3.5 h-3.5" />
                <span>Official Fee: {course.price}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-3">
              {course.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {course.subtitle} — {course.tagline}
            </p>
          </div>

          {/* Enrolment / Enquiry Box */}
          <div className="flex-shrink-0 bg-stone-50 p-5 rounded-2xl border border-stone-200/90 lg:w-72 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Admissions Status
              </div>
              <div className="text-sm font-extrabold text-slate-900 mb-2">
                {course.logistics.cohortStatus}
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {course.logistics.pricingNote}
              </p>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => onOpenEnquiry(course.id)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all duration-200 transform hover:-translate-y-0.5 bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105"
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
                <span>View on DigitalGhuru.com</span>
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
            Overview & Learning Outcomes
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'curriculum'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            Curriculum Modules ({course.modules.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'projects'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            Student Project Showcase ({course.exampleProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'sandbox'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Interactive Simulator Preview</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & OUTCOMES */}
        {activeTab === 'overview' && (
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Left: Official Banner Visual & Tools */}
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
                    {course.programName}
                  </div>
                  <h4 className="text-sm font-bold">{course.subtitle}</h4>
                </div>
              </div>

              {/* Tools & Technologies Mastered */}
              <div className="mt-5 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Core Tools & Platforms Mastered
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {course.toolsMastered.map((tool, idx) => (
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

            {/* Right: Full Description & Outcomes */}
            <div className="lg:col-span-7">
              <h3 className="text-lg font-bold text-slate-900 mb-3">About This Program</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {course.fullDescription}
              </p>

              <h3 className="text-lg font-bold text-slate-900 mb-3">What Students Will Learn</h3>
              <div className="space-y-3 mb-8">
                {course.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5 text-xs font-bold"
                      style={{ backgroundColor: course.accent.hex }}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 leading-normal font-medium">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>

              {/* Verified Prerequisites & Class Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-orange-50/70 border border-orange-100 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block mb-1">Prerequisites:</span>
                  <span className="text-slate-600">{course.logistics.prerequisites}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block mb-1">Class Delivery:</span>
                  <span className="text-slate-600">{course.logistics.classFormat}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CURRICULUM MODULES */}
        {activeTab === 'curriculum' && (
          <div className="pt-8 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Official Curriculum Framework</h3>
                <p className="text-xs text-slate-500">Structured lessons with hands-on milestone projects for {course.gradeBadge}.</p>
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
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-white"
                          style={{ backgroundColor: course.accent.hex }}
                        >
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
                          <h5 className="font-bold text-slate-800 mb-2">Topics & Concepts Covered:</h5>
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
                            <span className="font-bold text-orange-900 block">Hands-On Milestone Task:</span>
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

        {/* TAB 3: STUDENT PROJECT SHOWCASE */}
        {activeTab === 'projects' && (
          <div className="pt-8 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Featured Student Capstone Projects</h3>
                <p className="text-xs text-slate-500">Real project outcomes developed during {course.gradeBadge}.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.exampleProjects.map((proj, pIdx) => (
                <div
                  key={pIdx}
                  className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={proj.previewUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800">
                      {proj.tag}
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-semibold text-white">
                      {proj.difficulty}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-bold text-slate-900 mb-2">{proj.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {proj.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-3 border-t border-stone-100">
                      <span>DigitalGhuru {course.gradeBadge}</span>
                      <span className="text-orange-600 font-bold">Verified Deliverable</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INTERACTIVE SIMULATOR */}
        {activeTab === 'sandbox' && (
          <div className="pt-8 space-y-6 animate-fade-in">
            <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base sm:text-lg font-bold">
                    {course.simulationData.interactiveDemoTitle}
                  </h3>
                </div>
                <span className="text-xs text-orange-400 bg-orange-950/60 border border-orange-800 px-3 py-1 rounded-full">
                  DigitalGhuru Classroom Simulator
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Command / Prompt Input
                  </label>
                  <textarea
                    rows={3}
                    value={sandboxCustomInput}
                    onChange={(e) => setSandboxCustomInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-amber-200 font-mono focus:outline-none focus:border-orange-500"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={handleRunSimulation}
                      disabled={isSimPlaying}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 shadow-md shadow-orange-500/25 transition-all disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{isSimPlaying ? 'Executing...' : 'Run in Classroom Sandbox'}</span>
                    </button>
                    <span className="text-[11px] text-slate-400">Browser execution</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Simulated AI Feedback & Output
                  </label>
                  <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 min-h-[110px] text-xs font-mono text-emerald-400 leading-relaxed flex flex-col justify-between">
                    <div>{simOutput}</div>
                    <div className="text-[10px] text-slate-500 text-right mt-2">
                      Safety Filter: Active • Verified
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 block mb-2">
                  Curriculum Code Reference:
                </span>
                <pre className="bg-slate-900 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed border border-slate-800">
                  {course.simulationData.codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Related Courses Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-bold text-slate-900">Explore Other AI Super Kids Tracks</h4>
              <p className="text-xs text-slate-500">Seamlessly switch between Ages 6–8, 9–10, and 11–12 pathways.</p>
            </div>
            <button
              onClick={onClose}
              className="text-xs font-bold text-orange-600 hover:underline inline-flex items-center gap-1"
            >
              <span>View All 3 Cards Deck</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {COURSES.map((c) => {
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
                    <span
                      className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: c.accent.lightHex,
                        color: c.accent.hex,
                      }}
                    >
                      {c.gradeBadge}
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
