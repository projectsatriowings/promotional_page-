import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Award, Code2, Compass } from 'lucide-react';
import { InteractiveRobot } from './InteractiveRobot';
import { 
  DoodleStar, 
  DoodleArrow, 
  DoodleCircuit, 
  PaperCloud, 
  DoodleSparkle 
} from './PlayfulDoodles';

interface HeroSectionProps {
  onExploreCourses: () => void;
  onDiscoverAbout: () => void;
  onDiscoverHowItWorks?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCourses,
  onDiscoverAbout,
  onDiscoverHowItWorks,
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
      {/* Background Playful Doodles & Paper Clouds */}
      <div className="absolute top-16 left-8 pointer-events-none hidden lg:block animate-float-slow">
        <PaperCloud className="w-24 h-14" color="#E0F2FE" />
      </div>
      <div className="absolute top-28 right-16 pointer-events-none hidden lg:block animate-float-reverse">
        <PaperCloud className="w-28 h-16" color="#FEF3C7" />
      </div>
      <div className="absolute bottom-20 left-12 pointer-events-none hidden sm:block animate-wiggle-soft">
        <DoodleCircuit className="w-16 h-16 text-emerald-500 opacity-70" color="#10B981" />
      </div>
      <div className="absolute top-48 left-1/3 pointer-events-none hidden sm:block animate-pulse">
        <DoodleStar className="w-7 h-7" color="#F59E0B" />
      </div>

      {/* Background ambient warmth with brand orange and gold */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-orange-200/25 via-amber-200/25 to-blue-100/20 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Official Brand Eyebrow with Sparkle */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-widest uppercase mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FFA800] to-[#FF5200] animate-pulse" />
              <span>DIGITALGHURU · PLAYFUL AI MOTION LAB</span>
              <DoodleSparkle className="w-3.5 h-3.5" color="#EA580C" />
            </div>

            {/* Headline with Staggered Lines & Animated Gradient Accent */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] font-black tracking-tight text-slate-900 leading-[1.08] mb-6">
              <span className="block transform transition-transform duration-500 hover:translate-x-1">
                Big Ideas Start Small.
              </span>
              <span className="relative inline-block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200]">
                Discover AI with DigitalGhuru.
                {/* Hand-drawn scribble doodle underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-amber-400"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 9C50 3 120 2 180 6C230 9 270 5 298 7"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-8 mt-2">
              A joyful, age-calibrated learning playground for <strong className="text-slate-900 font-bold">Ages 6 through 12</strong> (Early Explorers, AI Innovators & Young Leaders). From visual prompt storytelling and robot logic to hands-on computational creation with certified mentors.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreCourses}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#FFA800] via-[#FF7A00] to-[#FF5200] hover:brightness-105 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span>Explore 3 Age Pathways</span>
                <ArrowRight className="w-5 h-5 text-amber-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onDiscoverHowItWorks || onDiscoverAbout}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base text-slate-700 bg-white hover:bg-stone-50 border-2 border-stone-200 shadow-paper shadow-paper-hover transition-all duration-200"
              >
                <Compass className="w-4 h-4 text-orange-600" />
                <span>How Kids Learn AI</span>
              </button>
            </div>

            {/* Verified Platform Trust Indicators */}
            <div className="pt-6 border-t border-stone-200/80 w-full">
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-3">
                Official Program Safeguards & Academic Standards
              </p>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Calibrated for Ages 6–12</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <span>Jaighurudeva Academy Collaboration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Child Safe & Screen Time Conscious</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Interactive Robot & Depth Frame */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Playful Arrow Doodle pointing to the showcase */}
            <div className="absolute -top-10 -left-6 z-20 hidden sm:block animate-wiggle-soft">
              <DoodleArrow className="w-12 h-12 text-rose-500" color="#F43F5E" />
              <span className="text-[11px] font-black text-rose-600 tracking-tight block -rotate-6">
                Interactive Lab!
              </span>
            </div>

            {/* 3D Depth Card that tilts on mouse movement */}
            <div
              className="relative w-full max-w-md lg:max-w-none transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
              }}
            >
              {/* Main Rounded Card Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src="/brand/card-g1-6.png"
                  alt="DigitalGhuru AI Super Kids Classroom"
                  className="w-full h-[440px] sm:h-[480px] object-cover object-center filter brightness-[0.96] group-hover:scale-104 transition-transform duration-700 ease-out"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent pointer-events-none" />

                {/* Top Official Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-white/80 flex items-center gap-2">
                  <img
                    src="/brand/favicon.svg"
                    alt="Star"
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-xs font-black text-slate-900">
                    Official AI Kids Lab
                  </span>
                </div>

                {/* Embedded Interactive Robot Mascot (Floating in bottom-right corner) */}
                <div className="absolute -bottom-2 -right-2 z-20 transform hover:scale-105 transition-transform">
                  <InteractiveRobot 
                    mood="tracking"
                    pointerPos={mousePos}
                    size="sm"
                  />
                </div>

                {/* Bottom Overlay Card with Course Information */}
                <div className="absolute bottom-4 left-4 right-24 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-stone-200/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full">
                      Ages 6 through 12
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Classroom to Capstone</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    AI Super Kids: Curiosity, Logic & Leadership
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>3 Certified Pathways Open</span>
                  </div>
                </div>
              </div>

              {/* Floating Doodle Accents around the Card */}
              <div 
                className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border-2 border-stone-200 hidden sm:flex items-center gap-2.5 z-20 animate-float-slow"
                style={{
                  transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Visual Code & Prompts</div>
                  <div className="text-[10px] text-slate-500">Scratch, Python & AI Bots</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
