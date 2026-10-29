import React, { useState } from 'react';
import { ArrowRight, BookOpen, Sparkles, Terminal, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

interface HeroSectionProps {
  onExploreCourses: () => void;
  onDiscoverAbout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCourses,
  onDiscoverAbout,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF8F5] to-[#FFFFFF]"
    >
      {/* Background ambient warmth with brand orange and gold */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-orange-200/25 via-amber-200/25 to-blue-100/20 blur-3xl pointer-events-none rounded-full -z-10" />
      <div className="absolute top-1/3 -left-36 w-96 h-96 bg-orange-100/40 blur-3xl pointer-events-none rounded-full -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-100/40 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Official Brand Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-widest uppercase mb-6 shadow-xs animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
              <span>DIGITALGHURU · AI SUPER KIDS PROGRAM</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-black tracking-tight text-slate-900 leading-[1.08] mb-6">
              Big Ideas Start Small.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700">
                Discover AI with DigitalGhuru.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-8">
              A comprehensive curriculum structured across <strong className="text-slate-800">Ages 6 through 12</strong> (Ages 6–8, 9–10, and 11–12). From early digital safety and creative prompt storytelling to hands-on problem solving and AI prototyping, empower your child with real, future-ready computational skills.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreCourses}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-white bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore 3 AI Pathways</span>
                <ArrowRight className="w-5 h-5 text-amber-200" />
              </button>

              <button
                onClick={onDiscoverAbout}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base text-slate-700 bg-white hover:bg-stone-50 border border-stone-300 shadow-xs hover:shadow transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 text-orange-600" />
                <span>About DigitalGhuru</span>
              </button>
            </div>

            {/* Verified Platform Trust Indicators */}
            <div className="pt-6 border-t border-stone-200/80 w-full">
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-3">
                Official Program Pillars & Verified Academic Safeguards
              </p>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Calibrated for Ages 6–12</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <span>Partnered with Jaighurudeva Academy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Responsible AI & Digital Safety First</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Official Course Graphics */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div
              className="relative w-full max-w-md lg:max-w-none transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg)`,
              }}
            >
              {/* Main Rounded Card Frame featuring official banner */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src="/brand/card-g1-6.png"
                  alt="DigitalGhuru AI Super Kids Classroom in session"
                  className="w-full h-[440px] sm:h-[480px] object-cover object-center filter brightness-[0.96] group-hover:scale-104 transition-transform duration-700 ease-out"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent pointer-events-none" />

                {/* Official Logo Brand Overlay Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-white/80 flex items-center gap-2">
                  <img
                    src="/brand/favicon.svg"
                    alt="Star"
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-xs font-bold text-slate-900">
                    Official AI Program
                  </span>
                </div>

                {/* Bottom Overlay Info Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-stone-200/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full">
                      Ages 6 through 12
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Classroom to Capstone</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    AI Super Kids: Curiosity, Logic & Leadership
                  </h3>
                  <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-full w-[90%] rounded-full animate-pulse" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>3 Age Pathways (Ages 6–8, 9–10, 11–12)</span>
                    <span>Starting from ₹8,000</span>
                  </div>
                </div>
              </div>

              {/* Floating Educational Badges */}
              {/* Badge 1: Early Explorers (Top Left) */}
              <div
                className="absolute -top-6 -left-6 bg-white rounded-2xl p-3 shadow-xl border border-stone-200 flex items-center gap-3 transition-transform duration-500 hover:scale-105"
                style={{
                  transform: `translateY(${Math.sin(mousePos.y * 5) * 6}px)`,
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left pr-2">
                  <p className="text-[10px] font-bold text-orange-600 uppercase">Ages 6–8</p>
                  <p className="text-xs font-bold text-slate-800">Early AI Awareness</p>
                </div>
              </div>

              {/* Badge 2: Young Leaders (Bottom Right) */}
              <div
                className="hidden sm:flex absolute -bottom-6 -right-6 bg-white rounded-2xl p-3 shadow-xl border border-stone-200 items-center gap-3 transition-transform duration-500 hover:scale-105"
                style={{
                  transform: `translateY(${-Math.sin(mousePos.x * 5) * 8}px)`,
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                  <Terminal className="w-5 h-5" />
                </div>
                <div className="text-left pr-2">
                  <p className="text-[10px] font-bold text-teal-700 uppercase">Ages 11–12</p>
                  <p className="text-xs font-bold text-slate-800">Young Leaders & AI Prototypes</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
