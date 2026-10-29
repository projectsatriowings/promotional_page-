import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Search, Layers, Sparkles, CheckCircle2, 
  ArrowRight, ShieldCheck, Play, Sliders, ExternalLink, RefreshCw, 
  Flame, Target, Zap, MousePointerClick, Globe
} from 'lucide-react';

export const CampaignShowcaseSection: React.FC<{ onOpenEnquiry: (courseId?: string) => void }> = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState<'paid-ads' | 'seo' | 'viral-reel' | 'automation' | 'attribution'>('paid-ads');
  
  // Interactive simulator states
  const [adSpend, setAdSpend] = useState<number>(25000);
  const [targetRoas, setTargetRoas] = useState<number>(4.2);
  const [showSeoComparison, setShowSeoComparison] = useState<'before' | 'after'>('after');
  const [activeReelSegment, setActiveReelSegment] = useState<number>(0);

  const calculatedRevenue = Math.round(adSpend * targetRoas);
  const calculatedConversions = Math.round((adSpend * targetRoas) / 1250);

  const tabs = [
    { id: 'paid-ads', label: 'Meta & Google Paid Ads', icon: <Target className="w-4 h-4" /> },
    { id: 'seo', label: 'Technical SEO & SERP', icon: <Search className="w-4 h-4" /> },
    { id: 'viral-reel', label: 'Viral Reel & AI Content', icon: <Flame className="w-4 h-4" /> },
    { id: 'automation', label: 'Zapier & CRM Workflows', icon: <Zap className="w-4 h-4" /> },
    { id: 'attribution', label: 'Attribution & Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <section id="campaign-showcase" className="py-24 md:py-32 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Interactive Campaign Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Test Agency Simulations Before You Enrol
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore the exact multi-channel campaign architectures taught in our curriculum. Test real interactive levers for paid ads, SEO audits, viral reels, and automation pipelines.
            </p>
          </div>

          <button
            onClick={() => onOpenEnquiry('ai-powered-digital-marketing')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-600/20 transition-all cursor-pointer self-start md:self-auto"
          >
            <span>Run Real Sprints In Class</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 border-b border-slate-200">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20 border border-orange-500'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Meta & Google Paid Ads Command Simulator */}
        {activeTab === 'paid-ads' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#FAF9F6] border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative">
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-orange-700 uppercase tracking-widest mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Meta Ads Manager & Google PMax Lab
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Live Unit Economics & ROAS Calculator
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Learn to model Return On Ad Spend (ROAS) and Customer Acquisition Cost (CAC) using real media-buying formulas.
                </p>

                {/* Slider 1: Ad Spend */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 font-semibold">Monthly Ad Testing Budget:</span>
                    <span className="text-orange-700 font-bold">₹{adSpend.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="5000"
                    value={adSpend}
                    onChange={(e) => setAdSpend(Number(e.target.value))}
                    className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>₹5,000 (Testing)</span>
                    <span>₹50,000 (Scaling)</span>
                    <span>₹1,00,000 (Enterprise)</span>
                  </div>
                </div>

                {/* Slider 2: Target ROAS */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 font-semibold">Projected Campaign ROAS Benchmark:</span>
                    <span className="text-emerald-700 font-bold">{targetRoas}x Multiple</span>
                  </div>
                  <input
                    type="range"
                    min="2.5"
                    max="6.0"
                    step="0.1"
                    value={targetRoas}
                    onChange={(e) => setTargetRoas(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>2.5x (Break-even)</span>
                    <span>4.2x (Agency Benchmark)</span>
                    <span>6.0x (Hyper Growth)</span>
                  </div>
                </div>

                {/* Calculated Results */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 grid grid-cols-2 gap-4 shadow-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Est. Revenue Generated</span>
                    <span className="text-xl font-black text-slate-900">₹{calculatedRevenue.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Estimated Conversions</span>
                    <span className="text-xl font-black text-emerald-700">{calculatedConversions} Orders</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  CAPI Server-Side Verified
                </span>
                <span>Illustrative Agency Model</span>
              </div>
            </div>

            {/* Right: Ad Preview & Campaign Terminal Mockup */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xs">
              {/* Terminal header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-600 ml-2">meta-ads-manager // campaign_audit.live</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ● ACTIVE ROAS 4.2x
                </span>
              </div>

              {/* Dynamic Ad Preview Card */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                <div className="sm:col-span-5 relative rounded-lg overflow-hidden border border-slate-200 aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"
                    alt="Ad Creative Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-mono">
                    Midjourney v6 • Prompted
                  </div>
                </div>

                <div className="sm:col-span-7 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-orange-700 uppercase text-[10px]">Sponsored • Instagram Feed</span>
                    <span className="text-[10px] text-slate-500 font-mono">CTR: 3.42%</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    AI-Driven Omnichannel Marketing Masterclass
                  </h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                    Stop burning ad budgets on guesswork. Learn audience segmentation, custom lookalikes, and dynamic creative iteration.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] border-t border-slate-200">
                    <span className="text-slate-500">Target CPA: ₹142</span>
                    <span className="px-3 py-1 rounded bg-orange-600 text-white font-bold text-[10px]">
                      Book Demo
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Metric Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Lookalike Audience</span>
                  <span className="font-bold text-slate-900">1% High LTV</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Event Attribution</span>
                  <span className="font-bold text-emerald-700">7-Day Click</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Hook Retention</span>
                  <span className="font-bold text-amber-700">68.4% (3s)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Technical SEO & SERP Architecture */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#FAF9F6] border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
                  <Search className="w-3.5 h-3.5" />
                  Semrush & Search Console Blueprint
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Technical Audit & Ranking Acceleration
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Learn how DigitalGhuru students perform complete 60-point site health audits, eliminate crawl budget waste, and capture high-intent commercial SERP positions.
                </p>

                {/* Before / After Toggle */}
                <div className="p-1.5 rounded-xl bg-slate-200/80 border border-slate-300 flex items-center gap-1 mb-6">
                  <button
                    onClick={() => setShowSeoComparison('before')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      showSeoComparison === 'before'
                        ? 'bg-red-100 text-red-800 border border-red-300 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Legacy Site (Before Audit)
                  </button>
                  <button
                    onClick={() => setShowSeoComparison('after')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      showSeoComparison === 'after'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Optimized Site (After Sprint)
                  </button>
                </div>

                {/* Score breakdown */}
                {showSeoComparison === 'before' ? (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2 text-xs">
                    <div className="flex justify-between text-red-800 font-bold">
                      <span>Crawl Health Score:</span>
                      <span>54 / 100 (Critical Errors)</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      • 28 Broken canonical tags & redirect chains<br />
                      • Missing JSON-LD Course schema markup<br />
                      • Core Web Vitals LCP failing at 4.8s
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
                    <div className="flex justify-between text-emerald-800 font-bold">
                      <span>Crawl Health Score:</span>
                      <span>98 / 100 (Enterprise Clean)</span>
                    </div>
                    <p className="text-slate-700 text-[11px]">
                      • Complete schema structured data implemented<br />
                      • Topic cluster internal linking deployed<br />
                      • Core Web Vitals LCP optimized to 0.9s
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>Tools: Semrush • Ahrefs • GSC</span>
                <span className="text-emerald-700 font-bold">+320% Organic Traffic</span>
              </div>
            </div>

            {/* Right: Simulated SERP Ranking Table */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 text-xs font-mono text-slate-500">
                  <span>Google Search Console // Keyword Performance</span>
                  <span className="text-blue-700 font-bold">Rankings Verified</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    { kw: 'ai digital marketing course chennai', volume: '3,600/mo', rank: '#1', change: '+8', diff: 'High' },
                    { kw: 'performance marketing training anna nagar', volume: '1,800/mo', rank: '#2', change: '+14', diff: 'Med' },
                    { kw: 'meta media buying certification hyderabad', volume: '2,400/mo', rank: '#1', change: '+11', diff: 'High' },
                    { kw: '100% placement digital marketing institute', volume: '5,200/mo', rank: '#3', change: '+22', diff: 'High' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-black flex items-center justify-center text-xs">
                          {row.rank}
                        </span>
                        <div>
                          <p className="text-slate-900 font-semibold">{row.kw}</p>
                          <span className="text-[10px] text-slate-500">Vol: {row.volume} • KD: {row.diff}</span>
                        </div>
                      </div>
                      <span className="text-emerald-700 font-bold font-mono text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {row.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Total Tracked SERP Keywords: 140+</span>
                <span className="text-blue-700 font-semibold">Intent: Commercial Investigation</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Viral Reel Script & Content Engine */}
        {activeTab === 'viral-reel' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#FAF9F6] border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">
                  <Flame className="w-3.5 h-3.5" />
                  Instagram & Short-Form Video Science
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  The 30-Second Viral Reel Framework
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Understand the algorithmic psychology of viewer retention. Click each segment to explore how top creators structure audio hooks, emotional value, and conversion payoff.
                </p>

                {/* 3 Interactive Segments */}
                <div className="space-y-3">
                  {[
                    { 
                      title: '0–3s: Pattern-Interrupt Hook', 
                      desc: 'Visual disruption & high-curiosity verbal hook stopping user scroll immediately.',
                      metric: 'Target 3s Retention: > 65%'
                    },
                    { 
                      title: '4–18s: High-Density Value Delivery', 
                      desc: 'Rapid 3-point tactical demonstration with b-roll transitions and on-screen captioning.',
                      metric: 'Average Watch Time: 19.4s'
                    },
                    { 
                      title: '19–30s: Clear Micro-Conversion CTA', 
                      desc: 'Comment keyword trigger to trigger automated Instagram DM funnel with brochure.',
                      metric: 'Comment-to-DM Rate: 34%'
                    },
                  ].map((seg, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveReelSegment(idx)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        activeReelSegment === idx
                          ? 'bg-amber-50 border-amber-400 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-slate-900">{seg.title}</h4>
                        <span className="text-[10px] text-amber-700 font-mono font-semibold">{seg.metric}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-normal">{seg.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>AI Tools: ChatGPT • Midjourney • CapCut</span>
                <span className="text-amber-700 font-bold">100K+ Organic Reach</span>
              </div>
            </div>

            {/* Right: Phone Frame Simulation */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-center items-center shadow-xs">
              <div className="w-full max-w-sm rounded-3xl bg-slate-900 border-4 border-slate-800 p-4 shadow-2xl relative text-white">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 mb-3">
                  <span className="font-bold text-white">Reel Script Pipeline</span>
                  <span className="text-emerald-400 text-[10px] uppercase font-mono">AI Prompt Verified</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-orange-400 block font-bold mb-1">
                    Script Segment #{activeReelSegment + 1}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-mono">
                    {activeReelSegment === 0 && '"Most marketers waste ₹20,000 on Meta ads because of this ONE pixel tracking mistake. Here is the 60-second fix..."'}
                    {activeReelSegment === 1 && '"Step 1: Open Events Manager. Step 2: Switch to Server-Side CAPI. Step 3: Match deduplication keys. Notice how match quality jumps from 4.2 to 8.9..."'}
                    {activeReelSegment === 2 && '"Comment SPRINT below and my automated bot will send you our 12-page Meta Ad Audit checklist instantly in your DMs."'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                  <div className="p-2 rounded-lg bg-orange-950/40 border border-orange-500/30 text-orange-300">
                    Hook Type: Negative Contrast
                  </div>
                  <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-500/30 text-blue-300">
                    Automation: ManyChat DM
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Zapier Automation & CRM Funnel */}
        {activeTab === 'automation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#FAF9F6] border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-widest mb-2">
                  <Zap className="w-3.5 h-3.5" />
                  Autonomous Lead Pipeline (Zapier + CRM)
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Zero-Latency Lead Nurture Engine
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Students connect real webhook listeners to capture leads from landing pages, trigger AI prompt personalization within 60 seconds, and notify agency sales teams via WhatsApp and HubSpot.
                </p>

                <div className="space-y-3">
                  {[
                    { step: '01', title: 'Webhook Trigger', desc: 'Prospect submits course enquiry on WordPress landing page.', time: '0.2s latency' },
                    { step: '02', title: 'AI Personalization', desc: 'ChatGPT analyzes prospect background & drafts custom curriculum advice.', time: '1.4s compute' },
                    { step: '03', title: 'CRM & WhatsApp Dispatch', desc: 'Lead synced to HubSpot with lead score; brochure sent via WhatsApp API.', time: 'Instant' },
                  ].map((s, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center mt-0.5">
                        {s.step}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                          <span className="text-[10px] text-slate-500 font-mono">{s.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>Tools: Zapier • OpenAI API • HubSpot</span>
                <span className="text-purple-700 font-bold">14.8% Conversion Rate</span>
              </div>
            </div>

            {/* Right: Connected Workflow Visual */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-center shadow-xs">
              <div className="space-y-4 max-w-md mx-auto w-full">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                      WEB
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Lead Capture Form</h4>
                      <p className="text-[10px] text-slate-500">Prospect enters details</p>
                    </div>
                  </div>
                  <span className="text-emerald-700 text-xs font-mono font-bold">HTTP 200 OK</span>
                </div>

                <div className="flex justify-center">
                  <div className="h-6 w-0.5 bg-gradient-to-b from-orange-400 to-purple-400" />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                      ZAP
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Zapier Webhook Router</h4>
                      <p className="text-[10px] text-slate-500">18 multi-path rules active</p>
                    </div>
                  </div>
                  <span className="text-purple-700 text-xs font-mono font-bold">Passed (0ms)</span>
                </div>

                <div className="flex justify-center">
                  <div className="h-6 w-0.5 bg-gradient-to-b from-purple-400 to-emerald-400" />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      CRM
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">HubSpot CRM + WhatsApp API</h4>
                      <p className="text-[10px] text-slate-500">Personalized brochure sent</p>
                    </div>
                  </div>
                  <span className="text-emerald-700 text-xs font-mono font-bold">Dispatched</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Attribution & Analytics */}
        {activeTab === 'attribution' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#FAF9F6] border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 uppercase tracking-widest mb-2">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Google Looker Studio & GA4
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Executive Marketing Attribution
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Master data-driven attribution models. Compare first-click, last-click, and Markov chain models to allocate client marketing capital where it produces actual profit.
                </p>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <span className="text-xs font-bold text-slate-900 block">Multi-Channel Channel Mix</span>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                        <span>Meta Paid Advertising (Facebook / IG)</span>
                        <span className="text-orange-700 font-bold">42%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full w-[42%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                        <span>Google Search & Performance Max</span>
                        <span className="text-blue-700 font-bold">36%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full w-[36%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                        <span>SEO & Organic Inbound</span>
                        <span className="text-emerald-700 font-bold">22%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[22%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>Platform: Google Analytics 4</span>
                <span className="text-cyan-700 font-bold">Defensible Client Reporting</span>
              </div>
            </div>

            {/* Right: Looker Studio Executive Dashboard Mockup */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse" />
                    <span className="text-xs font-mono text-slate-800 font-bold">Executive Growth Dashboard (Looker Studio)</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Date Range: Last 30 Days</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase">Total Spend</span>
                    <span className="text-base font-black text-slate-900">₹1,45,000</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase">Pipeline Value</span>
                    <span className="text-base font-black text-emerald-700">₹6,24,000</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase">Blended ROAS</span>
                    <span className="text-base font-black text-cyan-700">4.3x</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase">Customer CAC</span>
                    <span className="text-base font-black text-amber-700">₹328</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div className="flex justify-between items-center text-slate-500 text-[11px]">
                    <span className="font-semibold text-slate-900">Attribution Assessment:</span>
                    <span className="text-emerald-700 font-bold">Positive Unit Economics</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Organic search delivers highest LTV; Meta paid ads drives rapid initial top-of-funnel customer acquisition. Recommended scaling budget +25% next cycle.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                <span>Created during Module 12 Capstone</span>
                <span>Ready for Client Presentation</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
