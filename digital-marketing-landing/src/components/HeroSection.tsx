import React, { useState } from 'react';
import { 
  ArrowRight, BookOpen, Award, Briefcase, Sparkles, 
  TrendingUp, Target, Search, BarChart3, ShieldCheck, Play, Zap, Laptop
} from 'lucide-react';
import { MARKETING_STATS } from '../data/marketingCoursesData';

interface HeroSectionProps {
  onExploreCourses: () => void;
  onViewCurriculum: () => void;
  onOpenEnquiry: (courseId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCourses,
  onViewCurriculum,
  onOpenEnquiry,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heroTab, setHeroTab] = useState<'meta' | 'seo' | 'analytics'>('meta');

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
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF8F5] to-white text-slate-900 border-b border-slate-200/80"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-grid-cyber opacity-40 pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[950px] h-[480px] bg-gradient-to-tr from-orange-200/30 via-amber-200/25 to-blue-100/25 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Kinetic Typography & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* High-Tech Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-widest uppercase mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
              <span>DIGITALGHURU · KINETIC GROWTH STUDIO</span>
            </div>

            {/* Kinetic Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black tracking-tight text-slate-900 leading-[1.06] mb-6">
              Turn Digital Skills Into{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700">
                Real-World Growth.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mb-8">
              Transform into an AI-powered growth marketer. Master agency-grade performance advertising on Meta & Google, enterprise SEO architecture, viral content pipelines, and autonomous marketing workflows with 15+ industry tools and 100% placement support.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreCourses}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 shadow-xl shadow-orange-600/20 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </button>

              <button
                onClick={onViewCurriculum}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs hover:shadow transition-all duration-200 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-orange-600" />
                <span>12-Module Syllabus</span>
              </button>

              <button
                onClick={() => onOpenEnquiry('ai-powered-digital-marketing')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 shadow-xs transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Verified Statistics Bar */}
            <div className="pt-6 border-t border-slate-200/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
              {MARKETING_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                    {stat.number}
                  </span>
                  <span className="text-xs text-slate-500 font-medium mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Editorial Command Center Mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div
              className="relative w-full max-w-lg lg:max-w-none transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)`,
              }}
            >
              {/* Outer Browser Window Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                
                {/* Browser Top Navigation Bar */}
                <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-mono text-slate-300 ml-2 hidden sm:inline">
                      digitalghuru://command-center.live
                    </span>
                  </div>

                  {/* Micro Tab Selector */}
                  <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
                    <button
                      onClick={() => setHeroTab('meta')}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                        heroTab === 'meta' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Meta Ads
                    </button>
                    <button
                      onClick={() => setHeroTab('seo')}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                        heroTab === 'seo' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      SEO Crawl
                    </button>
                    <button
                      onClick={() => setHeroTab('analytics')}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                        heroTab === 'analytics' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      GA4 ROAS
                    </button>
                  </div>
                </div>

                {/* Command Center Body Display */}
                <div className="p-5 sm:p-6 space-y-4 bg-slate-50/60">
                  {heroTab === 'meta' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-orange-700 block font-bold">
                            Live Ad Account Simulation
                          </span>
                          <h4 className="text-base font-black text-slate-900">
                            Meta CAPI • Dynamic Creative Testing
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          ROAS: 4.2x
                        </span>
                      </div>

                      {/* Graphic Preview with overlay metrics */}
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-video group">
                        <img
                          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
                          alt="Campaign Creative Mockup"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                          <div>
                            <p className="text-white font-bold text-xs">Creative Set #04 (Midjourney AI)</p>
                            <span className="text-[10px] text-slate-300">Target CPA: ₹142 • CTR: 3.42%</span>
                          </div>
                          <span className="px-2.5 py-1 rounded bg-orange-600 text-white text-[10px] font-bold">
                            High Scaling
                          </span>
                        </div>
                      </div>

                      {/* Performance Bar */}
                      <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-600 font-medium">Budget Scaled: ₹45,000 / ₹50,000</span>
                          <span className="text-emerald-600 font-bold font-mono">90% Pacing</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 w-[90%] rounded-full" />
                        </div>
                      </div>
                    </div>
                  )}

                  {heroTab === 'seo' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-blue-700 block font-bold">
                            Technical Crawler (Semrush API)
                          </span>
                          <h4 className="text-base font-black text-slate-900">
                            Site Audit & Core Web Vitals
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                          Health: 98%
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                          <span className="text-slate-800 font-medium">Rank #1 • "ai marketing course chennai"</span>
                          <span className="text-emerald-600 font-bold font-mono">+8 Pos</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                          <span className="text-slate-800 font-medium">Rank #1 • "meta media buying hyderabad"</span>
                          <span className="text-emerald-600 font-bold font-mono">+11 Pos</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                          <span className="text-slate-800 font-medium">Core Web Vitals LCP Index</span>
                          <span className="text-blue-600 font-bold font-mono">0.9s (Passed)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {heroTab === 'analytics' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-emerald-700 block font-bold">
                            Google Analytics 4 & Looker Studio
                          </span>
                          <h4 className="text-base font-black text-slate-900">
                            Attribution & Unit Economics
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          LTV/CAC: 4.8x
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                          <span className="text-[10px] text-slate-500 block uppercase">Blended ROAS</span>
                          <span className="text-lg font-black text-slate-900">4.38x</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                          <span className="text-[10px] text-slate-500 block uppercase">Lead Conversion</span>
                          <span className="text-lg font-black text-emerald-600">14.8%</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-[11px] text-slate-600">
                        Multi-touch Markov attribution verifies organic search drives 38% higher retention than single-touch direct.
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      DigitalGhuru Real Agency Simulator
                    </span>
                    <span className="text-orange-700 font-semibold">Weekend & Weekday Batches</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: AI Prompting Engine */}
              <div
                className="hidden sm:flex absolute -top-5 -left-5 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 items-center gap-3 transition-transform duration-500"
                style={{
                  transform: `translateY(${Math.sin(mousePos.y * 5) * 6}px)`,
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left pr-2">
                  <p className="text-[10px] font-bold text-orange-600 uppercase">AI Toolset</p>
                  <p className="text-xs font-bold text-slate-900">15+ Modern AI Tools</p>
                </div>
              </div>

              {/* Floating Badge 2: Placement Support */}
              <div
                className="hidden sm:flex absolute -bottom-5 -right-5 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 items-center gap-3 transition-transform duration-500"
                style={{
                  transform: `translateY(${-Math.sin(mousePos.x * 5) * 6}px)`,
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="text-left pr-2">
                  <p className="text-[10px] font-bold text-blue-600 uppercase">Career Cell</p>
                  <p className="text-xs font-bold text-slate-900">100% Placement Support</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
