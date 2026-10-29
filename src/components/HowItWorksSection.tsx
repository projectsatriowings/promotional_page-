import React, { useState } from 'react';
import { Compass, Sparkles, Code2, Trophy, ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react';
import { LEARNING_JOURNEY_STEPS } from '../data/coursesData';
import { DoodleStar, DoodleCircuit, DoodleSparkle } from './PlayfulDoodles';

interface HowItWorksSectionProps {
  onExploreCourses: () => void;
  onOpenEnquiry?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onExploreCourses,
  onOpenEnquiry
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Lightbulb className="w-6 h-6 text-amber-500" />;
      case 1:
        return <Compass className="w-6 h-6 text-blue-500" />;
      case 2:
        return <Code2 className="w-6 h-6 text-emerald-500" />;
      case 3:
        return <Trophy className="w-6 h-6 text-orange-500" />;
      default:
        return <Compass className="w-6 h-6 text-blue-500" />;
    }
  };

  const getStepColor = (index: number) => {
    switch (index) {
      case 0:
        return { border: 'border-amber-400', bg: 'bg-amber-50', text: 'text-amber-800', bar: 'bg-amber-500' };
      case 1:
        return { border: 'border-blue-400', bg: 'bg-blue-50', text: 'text-blue-800', bar: 'bg-blue-500' };
      case 2:
        return { border: 'border-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-800', bar: 'bg-emerald-500' };
      case 3:
        return { border: 'border-orange-400', bg: 'bg-orange-50', text: 'text-orange-800', bar: 'bg-orange-500' };
      default:
        return { border: 'border-blue-400', bg: 'bg-blue-50', text: 'text-blue-800', bar: 'bg-blue-500' };
    }
  };

  const currentStep = LEARNING_JOURNEY_STEPS[activeStep];
  const color = getStepColor(activeStep);

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-white relative overflow-hidden border-y border-stone-200/70">
      
      {/* Playful Floating Doodles */}
      <div className="absolute top-12 left-10 pointer-events-none hidden lg:block animate-float-slow">
        <DoodleCircuit className="w-16 h-16 text-teal-400 opacity-60" color="#14B8A6" />
      </div>
      <div className="absolute bottom-12 right-12 pointer-events-none hidden lg:block animate-wiggle-soft">
        <DoodleStar className="w-10 h-10 text-amber-400 opacity-80" color="#F59E0B" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Interactive Learning Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            How Kids Go From Curious to AI Creators
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our 4-stage pedagogical framework combines playful discovery, interactive coding challenges, and a proud Capstone Showcase co-certified with Jaighurudeva Academy.
          </p>
        </div>

        {/* Step Progress Pills & Illustrated Connecting Path */}
        <div className="relative mb-14">
          
          {/* Animated Connecting SVG Path (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 -translate-y-8 h-2 z-0">
            <svg className="w-full h-8" preserveAspectRatio="none" viewBox="0 0 800 20">
              <path
                d="M 10 10 Q 200 18 400 10 T 790 10"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="4"
                strokeDasharray="8 6"
              />
              {/* Highlighted active segment */}
              <path
                d="M 10 10 Q 200 18 400 10 T 790 10"
                fill="none"
                stroke="#F97316"
                strokeWidth="4"
                strokeDashoffset={800 - ((activeStep + 1) / 4) * 800}
                strokeDasharray="800"
                className="transition-all duration-700 ease-out"
              />
            </svg>
          </div>

          {/* 4 Clickable Step Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {LEARNING_JOURNEY_STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;
              const stepColor = getStepColor(idx);

              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left rounded-3xl p-5 sm:p-6 transition-all duration-300 border-2 flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? `${stepColor.bg} ${stepColor.border} shadow-xl -translate-y-2`
                      : 'bg-[#FAF8F5] border-stone-200 hover:border-stone-300 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-transform duration-300 ${
                          isSelected
                            ? 'bg-white shadow-sm scale-110'
                            : 'bg-white/80 border border-stone-200'
                        }`}
                      >
                        {getStepIcon(idx)}
                      </span>
                      <span className="text-xs font-black tracking-widest text-slate-400 uppercase">
                        Stage {step.step}
                      </span>
                    </div>

                    <h3 className={`text-base font-black transition-colors ${
                      isSelected ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      {step.tagline}
                    </p>
                  </div>

                  {/* Progress indicator pill */}
                  <div className="mt-5 pt-3 border-t border-stone-200/60 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">
                      {isSelected ? 'Active Focus' : 'Click to inspect'}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'translate-x-1 text-orange-600' : 'text-slate-400 group-hover:translate-x-0.5'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Interactive Spotlight on Active Step */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border-2 border-stone-200 shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Detail Description */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${color.bg} ${color.text} border ${color.border}`}>
                  Stage {currentStep.step} of 4 • {currentStep.tagline}
                </span>
                <DoodleSparkle className="w-4 h-4 text-orange-500" color="#F97316" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {currentStep.title}
              </h3>

              <p className="text-base text-slate-600 leading-relaxed">
                {currentStep.description}
              </p>

              {/* Verified Outcome Badge */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Concrete Learning Outcome
                  </h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {currentStep.outcome}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onExploreCourses}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all flex items-center gap-2"
                >
                  <span>Explore Course Pathways</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {onOpenEnquiry && (
                  <button
                    onClick={onOpenEnquiry}
                    className="px-6 py-3 rounded-2xl bg-white hover:bg-stone-50 text-slate-700 font-bold text-sm border border-stone-300 shadow-xs transition-colors"
                  >
                    Request Full Syllabus PDF
                  </button>
                )}
              </div>
            </div>

            {/* Right Visual Card with Course Age Pathway Alignment */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/40 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                  How This Applies to Each Age Group
                </div>

                {/* Track 1 */}
                <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200">
                  <div className="flex items-center justify-between text-xs font-bold text-sky-900">
                    <span>Ages 6–8 (Early Explorers)</span>
                    <span className="text-[10px] bg-sky-200/70 px-2 py-0.5 rounded-full text-sky-800">Visual & Voice</span>
                  </div>
                  <p className="text-xs text-sky-700 mt-1">
                    Playful voice-guided interactions, storybook prompts, and cartoon robot ethics.
                  </p>
                </div>

                {/* Track 2 */}
                <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200">
                  <div className="flex items-center justify-between text-xs font-bold text-teal-900">
                    <span>Ages 9–10 (AI Innovators)</span>
                    <span className="text-[10px] bg-teal-200/70 px-2 py-0.5 rounded-full text-teal-800">Scratch & Logic</span>
                  </div>
                  <p className="text-xs text-teal-700 mt-1">
                    Connecting block-coding scripts to AI vision models, prompt engineering, and quiz bots.
                  </p>
                </div>

                {/* Track 3 */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                    <span>Ages 11–12 (AI Young Leaders)</span>
                    <span className="text-[10px] bg-amber-200/70 px-2 py-0.5 rounded-full text-amber-800">Python & Capstone</span>
                  </div>
                  <p className="text-xs text-amber-700 mt-1">
                    Real Python scripting, dataset ethics, and live Demo Day presentations for family and peers.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
