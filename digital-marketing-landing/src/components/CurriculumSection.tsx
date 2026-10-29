import React, { useState } from 'react';
import { BookOpen, Check, Sparkles, ChevronDown, ChevronRight, Layers, ArrowRight } from 'lucide-react';
import { MARKETING_COURSES } from '../data/marketingCoursesData';

interface CurriculumSectionProps {
  onOpenEnquiry: (courseId?: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({ onOpenEnquiry }) => {
  const [activeModule, setActiveModule] = useState<number | null>(0);
  const flagshipCourse = MARKETING_COURSES[0];

  return (
    <section id="curriculum" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5 text-orange-600" />
            <span>12 Comprehensive Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            What You Will Learn
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From consumer psychology and AI content creation to live Meta Ads, technical SEO, and automated CRM funnels.
          </p>
        </div>

        {/* 12 Modules Grid / Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-12">
          {flagshipCourse.modules.map((mod, idx) => {
            const isOpen = activeModule === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50/50 hover:bg-stone-50 transition-all duration-200"
              >
                <button
                  onClick={() => setActiveModule(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
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
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-stone-100 bg-white space-y-3 text-xs leading-relaxed">
                    <div className="pt-3">
                      <span className="font-bold text-slate-700 block mb-1.5">Topics Explored:</span>
                      <ul className="space-y-1 text-slate-600">
                        {mod.topics.map((t, tIdx) => (
                          <li key={tIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 flex items-start gap-2 text-orange-950 font-medium">
                      <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[11px] uppercase tracking-wider text-orange-800">Hands-on Task:</strong>
                        <span>{mod.handsOnTask}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 mb-1">
              Want the full day-by-day lesson roadmap?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Download the official 40-page course handbook with live tools checklists.
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry(flagshipCourse.id)}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all duration-200"
          >
            <span>Download Detailed Syllabus</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

