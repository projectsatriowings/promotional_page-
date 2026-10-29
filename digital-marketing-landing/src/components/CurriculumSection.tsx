import React, { useState } from 'react';
import { BookOpen, Check, Sparkles, ChevronDown, ChevronRight, Layers, ArrowRight, Download, Search } from 'lucide-react';
import { MARKETING_COURSES } from '../data/marketingCoursesData';

interface CurriculumSectionProps {
  onOpenEnquiry: (courseId?: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({ onOpenEnquiry }) => {
  const [activeModule, setActiveModule] = useState<number | null>(0);
  const [filterQuery, setFilterQuery] = useState('');
  const flagshipCourse = MARKETING_COURSES[0];

  const filteredModules = flagshipCourse.modules.filter((m) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.topics.some((t) => t.toLowerCase().includes(q)) ||
      m.toolsUsed.some((tool) => tool.toLowerCase().includes(q))
    );
  });

  return (
    <section id="curriculum" className="py-24 md:py-32 bg-white text-slate-900 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5 text-orange-600" />
            <span>Exhaustive 12-Module Syllabus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Everything You Need To Lead Growth
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From consumer psychology and AI content creation to live Meta Ads, technical SEO, and automated CRM funnels.
          </p>

          {/* Quick Filter Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search by topic, e.g. SEO, Meta Ads, Zapier..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 shadow-2xs"
            />
          </div>
        </div>

        {/* 12 Modules Grid / Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-12">
          {filteredModules.map((mod, idx) => {
            const isOpen = activeModule === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/70 hover:bg-slate-50 transition-all duration-200"
              >
                <button
                  onClick={() => setActiveModule(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#FFA800] to-[#FF5200] text-white flex items-center justify-center font-black text-xs shadow-xs">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {mod.title}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">{mod.duration}</span>
                    </div>
                  </div>
                  <div className="p-1 rounded-full text-slate-400">
                    {isOpen ? <ChevronDown className="w-4 h-4 text-orange-600" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-slate-200 bg-white space-y-3 text-xs leading-relaxed">
                    <div className="pt-3">
                      <span className="font-bold text-slate-700 block mb-1.5">Topics Explored:</span>
                      <ul className="space-y-1 text-slate-600">
                        {mod.topics.map((t, tIdx) => (
                          <li key={tIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FFA800] to-[#FF5200]" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 flex items-start gap-2 text-slate-800 font-medium">
                      <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[11px] uppercase tracking-wider text-orange-800">Hands-on Task:</strong>
                        <span>{mod.handsOnTask}</span>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">Tools:</span>
                      {mod.toolsUsed.map((tool, toolIdx) => (
                        <span key={toolIdx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] border border-slate-200">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Syllabus Footer Banner */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-50 via-amber-50 to-white border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900">Want the full 24-page syllabus PDF?</h4>
            <p className="text-xs text-slate-600">
              Includes comprehensive lecture schedules, faculty credentials, and agency project rubrics.
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry(flagshipCourse.id)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download Syllabus PDF</span>
          </button>
        </div>

      </div>
    </section>
  );
};
