import React, { useState } from 'react';
import { Compass, Lightbulb, Code2, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LEARNING_JOURNEY_STEPS } from '../data/coursesData';

interface HowItWorksSectionProps {
  onExploreCourses: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onExploreCourses }) => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Compass className="w-6 h-6 text-amber-500" />;
      case 1:
        return <Lightbulb className="w-6 h-6 text-blue-500" />;
      case 2:
        return <Code2 className="w-6 h-6 text-teal-500" />;
      case 3:
        return <Trophy className="w-6 h-6 text-violet-500" />;
      default:
        return <Compass className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative background grid subtle overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-wider uppercase mb-3">
            <span>The Four-Stage Learning Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            How Young Minds Master AI
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A research-backed pedagogical sequence designed to transition children naturally from curiosity to confident computational thinking.
          </p>
        </div>

        {/* Desktop Connected Progressive Timeline */}
        <div className="hidden lg:block relative mb-16">
          {/* Connecting line behind step circles */}
          <div className="absolute top-1/2 left-12 right-12 h-1 bg-stone-200 -translate-y-12 z-0" />
          
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {LEARNING_JOURNEY_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-3xl p-6 bg-white border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-slate-900 shadow-xl -translate-y-2 ring-2 ring-slate-900/10'
                      : 'border-stone-200 hover:border-stone-400 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Step Number Badge & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center font-black text-slate-900 text-sm shadow-xs">
                        {step.step}
                      </span>
                      <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                        {getStepIcon(idx)}
                      </div>
                    </div>

                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 mb-1">
                      {step.tagline}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50/60 p-2.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    <span className="truncate">{step.outcome}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Responsive Vertical Timeline */}
        <div className="block lg:hidden space-y-4 mb-12">
          {LEARNING_JOURNEY_STEPS.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl p-5 bg-white border border-stone-200 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                  {step.step}
                </span>
                <div>
                  <div className="text-[11px] font-bold text-blue-600 uppercase">
                    {step.tagline}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {step.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{step.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Deep-Dive Callout Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-md max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-black text-slate-900">
              Ready to see which track matches your child's age?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Explore syllabus milestones, live sandbox previews, and upcoming term dates.
            </p>
          </div>
          <button
            onClick={onExploreCourses}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Browse All 4 Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
