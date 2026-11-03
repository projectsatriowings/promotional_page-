import React, { useState } from 'react';
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Laptop,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  ChevronDown,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  MapPin,
  Clock,
  Send,
  Search,
  Share2,
  BarChart3,
  Globe,
  Compass,
  Cpu,
  Target,
  FileSpreadsheet,
  GraduationCap,
  Store,
  Rocket
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';
import { Footer } from '../shared/Footer';
import { Lightbox } from '../shared/Lightbox';

export const DigitalMarketingCoursePage: React.FC = () => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [activeCaption, setActiveCaption] = useState('');

  // FAQ Accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Curriculum expand state
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  // Static Enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    audience: 'College Student / Beginner',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleOpenLightbox = (url: string, caption: string) => {
    setActiveImage(url);
    setActiveCaption(caption);
    setLightboxOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Static form: Open WhatsApp enquiry directly with prefilled text
    const text = encodeURIComponent(
      `Hello Digital Ghuru! I want to enquire about the Digital Marketing Course.\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nCategory: ${formData.audience}\nMessage: ${formData.message || 'Please send course syllabus and fee details.'}`
    );
    window.open(`https://wa.me/918825948859?text=${text}`, '_blank');
    setFormSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Section 3: 7 Audiences
  const targetAudiences = [
    {
      title: 'College Students',
      icon: <GraduationCap className="w-6 h-6 text-orange-600" />,
      desc: 'Build high-demand digital skills before graduation to secure competitive career placements.',
      benefit: 'Prepares you for entry-level agency roles, internships, and dynamic marketing careers.'
    },
    {
      title: 'Fresh Graduates',
      icon: <Briefcase className="w-6 h-6 text-amber-600" />,
      desc: 'Bridge the academic gap with hands-on campaign execution, SEO, and paid performance marketing.',
      benefit: 'Graduate with a verified project portfolio and real campaign case studies.'
    },
    {
      title: 'Complete Beginners',
      icon: <Compass className="w-6 h-6 text-emerald-600" />,
      desc: 'No coding or prior marketing background required. Start from scratch with guided step-by-step lessons.',
      benefit: 'Learn the fundamentals of web psychology, social platforms, and search algorithms easily.'
    },
    {
      title: 'Working Professionals',
      icon: <TrendingUp className="w-6 h-6 text-sky-600" />,
      desc: 'Upskill into the high-growth digital domain or integrate AI marketing tools into your current role.',
      benefit: 'Weekend batches available to learn without interrupting your current job.'
    },
    {
      title: 'Business Owners',
      icon: <Store className="w-6 h-6 text-purple-600" />,
      desc: 'Stop depending blindly on third-party agencies. Learn how to generate consistent online leads.',
      benefit: 'Cut marketing acquisition costs and run profitable Google & Meta ad campaigns directly.'
    },
    {
      title: 'Entrepreneurs',
      icon: <Rocket className="w-6 h-6 text-rose-600" />,
      desc: 'Validate startup ideas, build landing pages, craft viral brand messaging, and acquire early adopters.',
      benefit: 'Master complete go-to-market strategies with organic search and paid acquisition.'
    },
    {
      title: 'Freelancers',
      icon: <Laptop className="w-6 h-6 text-indigo-600" />,
      desc: 'Offer high-ticket services like SEO audits, Meta ad management, and automated content creation.',
      benefit: 'Pitch international clients on platforms like Upwork and Fiverr with real portfolio proofs.'
    }
  ];

  // Section 4: 20 Curriculum Modules
  const curriculumModules = [
    { num: '01', title: 'Introduction to Digital Marketing', desc: 'Digital ecosystem overview, buyer psychology, inbound vs outbound, customer journey stages.' },
    { num: '02', title: 'Website and Landing Page Basics', desc: 'WordPress setup, landing page conversion principles, UI/UX fundamentals, mobile responsiveness.' },
    { num: '03', title: 'Search Engine Optimization (SEO)', desc: 'How search engines crawl, index, and rank pages; SERP layout and ranking factor breakdown.' },
    { num: '04', title: 'Keyword Research', desc: 'Search intent analysis, long-tail keyword discovery, search volume metrics, competitor keyword gap analysis.' },
    { num: '05', title: 'On-Page SEO', desc: 'Meta tags, header hierarchies, image alt text optimization, URL structuring, keyword density & LSI.' },
    { num: '06', title: 'Off-Page SEO', desc: 'Link building strategies, high-authority backlink outreach, domain authority, anchor text optimization.' },
    { num: '07', title: 'Technical SEO', desc: 'Core Web Vitals, XML sitemaps, robots.txt, schema markup, site speed optimization, mobile indexing.' },
    { num: '08', title: 'Social Media Marketing', desc: 'Platform algorithms, organic audience growth, engagement strategies, content calendar scheduling.' },
    { num: '09', title: 'Facebook and Instagram Marketing', desc: 'Business Suite setup, community building, reels strategies, influencer collaboration frameworks.' },
    { num: '10', title: 'Meta Ads Manager', desc: 'Campaign structures, custom audiences, lookalike targeting, pixel tracking, A/B ad creative testing.' },
    { num: '11', title: 'Google Ads (SEM)', desc: 'Ad auction dynamics, Quality Score optimization, bidding strategies (tCPA, ROAS), ad extensions.' },
    { num: '12', title: 'Search Advertising', desc: 'High-intent search keyword bidding, negative keywords, high-converting ad copy copywriting.' },
    { num: '13', title: 'Display Advertising', desc: 'Banner ads, responsive display ads, Google Display Network targeting, remarketing sequences.' },
    { num: '14', title: 'Content Marketing', desc: 'Storytelling frameworks, content pillars, lead magnets, editorial workflows, content repurposing.' },
    { num: '15', title: 'Content Creation & Canva', desc: 'Graphic design fundamentals, viral hooks, thumbnail design, video scripting for reels and shorts.' },
    { num: '16', title: 'Email Marketing', desc: 'List building, newsletter copywriting, email automation sequences, open rate & click rate optimization.' },
    { num: '17', title: 'Google Analytics 4 (GA4)', desc: 'Event tracking, user journey reports, conversion funnels, custom exploration reports.' },
    { num: '18', title: 'Marketing Performance Analysis', desc: 'ROI calculation, Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), attribution models.' },
    { num: '19', title: 'AI Tools for Digital Marketing', desc: 'Leveraging ChatGPT for copy, Midjourney for creatives, Zapier for automation, prompt engineering.' },
    { num: '20', title: 'Marketing Strategy and Campaign Planning', desc: 'End-to-end full-funnel campaign blueprint, media planning, budget allocation, client pitch decks.' }
  ];

  // Section 6: Tools & Technologies
  const tools = [
    { name: 'Google Ads', category: 'Paid Search', icon: '🎯' },
    { name: 'Google Analytics 4', category: 'Data & Tracking', icon: '📊' },
    { name: 'Google Search Console', category: 'SEO Audits', icon: '🔍' },
    { name: 'Meta Ads Manager', category: 'Paid Social', icon: '📱' },
    { name: 'Canva Pro', category: 'Creative Design', icon: '🎨' },
    { name: 'WordPress', category: 'CMS & Landing Pages', icon: '🌐' },
    { name: 'ChatGPT', category: 'AI Copywriting', icon: '🤖' },
    { name: 'Midjourney', category: 'AI Visuals', icon: '✨' },
    { name: 'Zapier', category: 'Marketing Automation', icon: '⚡' },
    { name: 'Mailchimp', category: 'Email Automation', icon: '📧' },
    { name: 'Semrush', category: 'Competitor Intelligence', icon: '📈' },
    { name: 'Ubersuggest', category: 'Keyword Discovery', icon: '💡' }
  ];

  // Section 8: 9 Career Opportunities
  const careers = [
    { title: 'Digital Marketing Executive', desc: 'Manage comprehensive brand campaigns across digital platforms and track daily campaign deliverables.' },
    { title: 'SEO Specialist', desc: 'Optimize website architecture, audit keyword rankings, and drive high-intent organic traffic from Google.' },
    { title: 'Social Media Executive', desc: 'Design social content calendars, craft viral short-form reels, and manage community interactions.' },
    { title: 'Social Media Manager', desc: 'Lead overarching brand social presence, execute cross-channel influencer partnerships, and report on reach.' },
    { title: 'Google Ads Specialist', desc: 'Manage performance PPC campaigns, optimize keyword Quality Scores, and lower Cost Per Click.' },
    { title: 'Content Marketing Executive', desc: 'Research and draft authoritative blog posts, informative case studies, and engaging lead magnets.' },
    { title: 'Digital Marketing Analyst', desc: 'Analyze GA4 attribution data, customer acquisition costs, and build actionable executive dashboards.' },
    { title: 'Freelance Digital Marketer', desc: 'Work independently with international clients on Upwork/Fiverr providing tailored marketing services.' },
    { title: 'Digital Marketing Entrepreneur', desc: 'Launch your own digital marketing boutique agency, eCommerce brand, or affiliate marketing venture.' }
  ];

  // Section 12: 10 FAQs
  const faqs = [
    {
      q: 'What is digital marketing?',
      a: 'Digital marketing is the practice of promoting products, brands, or services using internet channels such as search engines (Google), social media platforms (Instagram, Facebook, LinkedIn), email, and websites to connect with prospective customers.'
    },
    {
      q: 'Can beginners join this course?',
      a: 'Yes, absolutely! The course is structured from fundamental concepts to advanced practical strategies. No prior coding, web development, or marketing knowledge is required.'
    },
    {
      q: 'What topics are covered?',
      a: 'The curriculum covers 20 comprehensive modules including SEO, Keyword Research, Technical SEO, Meta Ads, Google Ads (SEM), Content Creation, Email Marketing, GA4 Analytics, AI Prompt Craft, and Full-Funnel Campaign Planning.'
    },
    {
      q: 'How long is the course?',
      a: 'The core training spans 3 months of comprehensive classroom/online sessions, followed by 1 month of dedicated live project work and portfolio building.'
    },
    {
      q: 'Is practical training included?',
      a: 'Yes! Over 70% of the course is hands-on. Students work on actual campaign setup simulations, SEO audits, live website builds on WordPress, and ad creative designs.'
    },
    {
      q: 'What tools will I learn?',
      a: 'You will learn Google Ads, GA4, Google Search Console, Meta Ads Manager, Canva, WordPress, ChatGPT for marketing copy, Zapier for automation, and keyword research tools.'
    },
    {
      q: 'Is classroom training available?',
      a: 'Yes! We conduct offline classroom training at our modern campus in Chennai (with sessions in Hyderabad), as well as interactive live online batches for remote learners.'
    },
    {
      q: 'What are the course fees?',
      a: 'Our course fees are structured transparently with flexible installment and scholarship options. Contact our admissions desk through the enquiry form or WhatsApp for current batch fee details.'
    },
    {
      q: 'How can I enquire?',
      a: 'You can submit the enquiry form on this page, chat with our admissions team directly via WhatsApp (+91 8825948859), or call our course centre directly.'
    },
    {
      q: 'Where is Digital Ghuru located?',
      a: 'Digital Ghuru learning centres are located in Chennai and Hyderabad, conducted in partnership with Jaighurudeva Academy. Campus visits are welcomed during working hours.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans antialiased selection:bg-orange-600 selection:text-white">
      {/* Reusable Premium Navbar */}
      <Navbar activePage="dm" onOpenEnquiry={() => scrollToSection('enquiry')} />

      <main className="pt-20">
        {/* ===================================================================
            SECTION 1: HERO SECTION
            =================================================================== */}
        <section id="hero" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-white via-[#FAF9F6] to-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Headlines & CTAs */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-50 border border-orange-200 text-orange-700 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>AI-Powered Career Training • Chennai & Hyderabad</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Master Digital Marketing.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start via-brand-mid to-brand-end">
                    Build Your Digital Future.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Discover digital marketing skills, explore modern marketing tools and develop the knowledge to grow in today's digital world.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToSection('about-course')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-brand-start via-brand-mid to-brand-end hover:brightness-105 shadow-xl shadow-orange-500/25 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer btn-theme-cta"
                  >
                    <span>Explore Course</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('enquiry')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs hover:shadow transition-all duration-200 cursor-pointer btn-theme-secondary"
                  >
                    <span>Enquire Now</span>
                  </button>
                </div>

                {/* Verified Course Highlights */}
                <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">100% Practical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">AI Tool Modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Live Exercises</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Placement Support</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Image Preview */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-brand-start/20 to-brand-end/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
                  <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl border border-slate-200/80">
                    <img
                      src="/assets/hero_banner_image.png"
                      alt="Digital Ghuru Digital Marketing Workshop"
                      className="w-full h-auto object-cover cursor-pointer hover:scale-102 transition-transform duration-300"
                      onClick={() => handleOpenLightbox('/assets/hero_banner_image.png', 'Digital Ghuru Digital Marketing Program Command Center')}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/brand/dm-banner.jpg';
                      }}
                    />
                    <div className="p-4 bg-slate-900 text-white flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-semibold text-slate-200">Weekend & Weekday Cohorts</span>
                      </div>
                      <span className="text-amber-400 font-bold">Admissions Open</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: ABOUT THE COURSE
            =================================================================== */}
        <section id="about-course" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Image Side */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                  <img
                    src="/assets/problem-section_image.png"
                    alt="Why Digital Marketing Matters"
                    className="w-full h-auto object-cover cursor-pointer group-hover:scale-102 transition-transform duration-300"
                    onClick={() => handleOpenLightbox('/assets/problem-section_image.png', 'The New Digital Marketing Playbook')}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/day_1_image.png';
                    }}
                  />
                  <div className="p-4 bg-amber-50 border-t border-amber-200 text-amber-900 text-xs font-medium">
                    ✦ Degrees open doors. Practical digital skills open futures.
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                  <span>SECTION 02</span>
                  <span>•</span>
                  <span>ABOUT THE COURSE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Understand the Modern Marketing Playbook
                </h2>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    <strong className="text-slate-900">What is digital marketing?</strong> It is the art and science of connecting businesses with consumers across every digital touchpoint—from Google search queries and social feeds to automated email sequences.
                  </p>
                  <p>
                    <strong className="text-slate-900">Why is it important today?</strong> Traditional marketing is slow and hard to measure. Digital marketing provides real-time analytics, laser-focused audience targeting, and immediate return on investment.
                  </p>
                  <p>
                    <strong className="text-slate-900">What will you gain?</strong> You will gain end-to-end competency: setting up websites, running Google & Meta ad campaigns, generating organic SEO traffic, and leveraging AI tools like ChatGPT to craft marketing campaigns in minutes instead of days.
                  </p>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Beginner-Friendly</h3>
                    <p className="text-xs text-slate-600">Complex marketing algorithms simplified with practical, real-world examples.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Portfolio Output</h3>
                    <p className="text-xs text-slate-600">Finish the course with real campaign case studies to present during job interviews.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: WHO CAN JOIN THIS COURSE?
            =================================================================== */}
        <section id="who-can-join" className="py-20 bg-[#FAF9F6] border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-800">
                <span>SECTION 03</span>
                <span>•</span>
                <span>ELIGIBILITY & AUDIENCE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Who Can Join This Course?
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Whether you are stepping into the workforce or scaling an existing business, this course is tailored to diverse learning goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {targetAudiences.map((audience, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      {audience.icon}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {audience.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {audience.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block mb-1">
                      Key Benefit
                    </span>
                    <p className="text-xs text-slate-700 font-medium">
                      {audience.benefit}
                    </p>
                  </div>
                </div>
              ))}

              {/* Extra Summary Box */}
              <div className="bg-gradient-to-br from-[#0B132B] to-[#1E293B] text-white p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <Sparkles className="w-8 h-8 text-amber-400 mb-3" />
                  <h3 className="text-base font-bold text-white mb-2">
                    Not Sure If You Fit?
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Talk to our academic counselor. We evaluate your background and recommend the ideal batch timing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('enquiry')}
                  className="mt-4 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span>Request Free Counseling</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: COMPLETE COURSE CURRICULUM
            =================================================================== */}
        <section id="curriculum" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                <span>SECTION 04</span>
                <span>•</span>
                <span>20 COMPREHENSIVE MODULES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Complete Course Curriculum
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                A structured, industry-aligned syllabus covering fundamental to advanced marketing methodologies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {curriculumModules.map((mod, idx) => {
                const isExpanded = expandedModule === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setExpandedModule(isExpanded ? null : idx)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer ${
                      isExpanded
                        ? 'bg-orange-50/50 border-orange-300 shadow-sm'
                        : 'bg-[#FAF9F6] border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-orange-600">
                        MODULE {mod.num}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-180 text-orange-600' : ''
                        }`}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <FileSpreadsheet className="w-4 h-4 text-orange-600" />
                <span>Want the complete day-by-day session breakdown with case study notes?</span>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('enquiry')}
                className="px-4 py-2 rounded-lg font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              >
                Download Detailed Syllabus PDF
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: PRACTICAL TRAINING AND LIVE PROJECTS
            =================================================================== */}
        <section id="practical-training" className="py-20 bg-[#FAF9F6] border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                <span>SECTION 05</span>
                <span>•</span>
                <span>PRACTICAL LEARNING JOURNEY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Practical Training & Simulated Exercises
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Move progressively from theoretical concepts to applying actual tools in classroom simulations.
              </p>
            </div>

            {/* Step-by-Step Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-black text-sm flex items-center justify-center mb-4">
                  1
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Audit & Keyword Lab</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Conduct comprehensive SEO audits on live websites. Identify indexing errors, crawl issues, and high-value long-tail keyword opportunities.
                </p>
                <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  Exercises: Competitor Gap Analysis, Schema Markup, Meta Tag Writing
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-black text-sm flex items-center justify-center mb-4">
                  2
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Campaign Simulation</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Build complete Meta Ads & Google Ads mock campaign architectures. Define target customer personas, negative keywords, and budget splits.
                </p>
                <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  Exercises: Ad Copywriting, Canva Banner Design, Landing Page Funnel
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-black text-sm flex items-center justify-center mb-4">
                  3
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Analytics & Reporting</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Read Google Analytics 4 event reports and track conversion paths. Formulate weekly growth suggestions based on real metrics.
                </p>
                <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  Exercises: GA4 Funnels, ROAS Calculation, Final Pitch Deck
                </div>
              </div>
            </div>

            {/* Visual proof photo banner */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="/assets/hands_on_method_image.png"
                alt="Hands On Training Method"
                className="w-full h-auto object-cover cursor-pointer hover:brightness-105 transition"
                onClick={() => handleOpenLightbox('/assets/hands_on_method_image.png', 'Step-by-step hands-on training framework')}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/workshop_promises_image.png';
                }}
              />
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 6: TOOLS AND TECHNOLOGIES
            =================================================================== */}
        <section id="tools" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-sky-100 text-sky-800">
                <span>SECTION 06</span>
                <span>•</span>
                <span>INDUSTRY TECH STACK</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Tools & Technologies You Will Learn
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Get comfortable navigating the actual software suites used by marketing agencies and corporate brands worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200 text-center hover:bg-white hover:border-orange-300 hover:shadow-sm transition-all"
                >
                  <div className="text-2xl mb-2">{tool.icon}</div>
                  <h3 className="text-xs font-bold text-slate-900">{tool.name}</h3>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 7: WHY CHOOSE DIGITAL GHURU?
            =================================================================== */}
        <section id="why-choose" className="py-20 bg-[#FAF9F6] border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-800">
                <span>SECTION 07</span>
                <span>•</span>
                <span>INSTITUTE ADVANTAGES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Why Choose Digital Ghuru?
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Verified benefits designed to provide an encouraging, high-impact learning environment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Users className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">Student-Focused Learning</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Small cohort sizes to ensure personal attention and dedicated time for reviewing individual assignments.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <BookOpen className="w-8 h-8 text-amber-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">Beginner-Friendly Teaching</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No jargon overload. Concepts are explained using straightforward analogies and everyday marketing situations.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Laptop className="w-8 h-8 text-emerald-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">Practical Learning Approach</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Step away from pure slides. Every lecture is paired with a direct software exercise on your computer.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-sky-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">Course Guidance & Feedback</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trainers conduct weekly feedback sessions to review your ad copy, target audience sheets, and SEO strategies.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <TrendingUp className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">Updated Syllabus with AI</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Learn to work alongside modern AI models (ChatGPT, Midjourney, Zapier) to multiply your marketing output.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <MapPin className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">Convenient Campuses</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fully equipped offline computer labs in Chennai and Hyderabad, plus interactive live streaming for remote students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 8: CAREER OPPORTUNITIES
            =================================================================== */}
        <section id="careers" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                <span>SECTION 08</span>
                <span>•</span>
                <span>CAREER DIRECTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Career Opportunities in Digital Marketing
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Explore potential industry roles you can pursue following comprehensive course completion.
                <span className="block text-xs text-slate-400 mt-1 italic">
                  *Note: These represent potential industry pathways and career trajectories, not guaranteed placements.
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careers.map((career, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FAF9F6] border border-slate-200 hover:border-orange-300 hover:bg-white transition-all shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {career.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {career.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 9: STUDENT PROJECTS, GALLERY AND WORKSHOP SESSIONS
            =================================================================== */}
        <section id="gallery" className="py-20 bg-[#FAF9F6] border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-purple-100 text-purple-800">
                <span>SECTION 09</span>
                <span>•</span>
                <span>AUTHENTIC GALLERY & MENTORS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Training Sessions & Learning Environment
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Real photos from Digital Ghuru classroom sessions, workshops, and faculty mentors. Click any image to view in full resolution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Classroom Workshop Photo */}
              <div
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer bg-white"
                onClick={() => handleOpenLightbox('/assets/classroom_workshop.jpg', 'Digital Ghuru Interactive Classroom Session')}
              >
                <img
                  src="/assets/classroom_workshop.jpg"
                  alt="Classroom Workshop"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h4 className="text-xs font-bold text-slate-900">Hands-on Classroom Lab</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Students collaborating on real SEO & campaign briefs</p>
                </div>
              </div>

              {/* Day 1 Workshop */}
              <div
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer bg-white"
                onClick={() => handleOpenLightbox('/assets/day_1_image.png', 'Foundational Digital Marketing Workshop')}
              >
                <img
                  src="/assets/day_1_image.png"
                  alt="Workshop Day 1"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h4 className="text-xs font-bold text-slate-900">Digital Strategy Foundations</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Deconstructing viral campaigns and customer journeys</p>
                </div>
              </div>

              {/* Day 2 Workshop */}
              <div
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer bg-white"
                onClick={() => handleOpenLightbox('/assets/day_2_image.png', 'Advanced AI & Campaign Execution')}
              >
                <img
                  src="/assets/day_2_image.png"
                  alt="Workshop Day 2"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h4 className="text-xs font-bold text-slate-900">AI Marketing Tool Demos</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Deploying ChatGPT and automated workflows live</p>
                </div>
              </div>

              {/* Mentors Showcase */}
              <div
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer bg-white"
                onClick={() => handleOpenLightbox('/assets/Bala Sir.jpeg', 'Bala Sir — Senior Marketing Mentor')}
              >
                <img
                  src="/assets/Bala Sir.jpeg"
                  alt="Bala Sir"
                  className="w-full h-56 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h4 className="text-xs font-bold text-slate-900">Faculty Mentors</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Experienced industry guidance across practical modules</p>
                </div>
              </div>

              {/* Cohort Audience Photo */}
              <div
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer bg-white"
                onClick={() => handleOpenLightbox('/assets/whos_for_it_image.png', 'Student Community & Batch Cohort')}
              >
                <img
                  src="/assets/whos_for_it_image.png"
                  alt="Cohort Participants"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h4 className="text-xs font-bold text-slate-900">Active Peer Community</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Learn alongside ambitious students & professionals</p>
                </div>
              </div>

              {/* Promises Banner */}
              <div
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer bg-white"
                onClick={() => handleOpenLightbox('/assets/workshop_promises_image.png', 'Practical Outcomes Guarantee')}
              >
                <img
                  src="/assets/workshop_promises_image.png"
                  alt="Workshop Promises"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h4 className="text-xs font-bold text-slate-900">Verified Learning Outcomes</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Commitment to tangible skill acquisition</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 10: COURSE DETAILS
            =================================================================== */}
        <section id="course-details" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-800">
                <span>SECTION 10</span>
                <span>•</span>
                <span>PRACTICAL INFORMATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Course Details & Batch Schedule
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Key schedule and operational details before you contact our admissions desk.
              </p>
            </div>

            <div className="bg-[#FAF9F6] rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Course Name</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">AI-Powered Digital Marketing</p>
                  <p className="text-xs text-slate-500 mt-0.5">Comprehensive Master Program</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">3 Months Training</p>
                  <p className="text-xs text-slate-500 mt-0.5">+ 1 Month Capstone Project</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Learning Mode</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">Classroom & Live Online</p>
                  <p className="text-xs text-slate-500 mt-0.5">Flexible hybrid attendance</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Timings</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">Weekday & Weekend</p>
                  <p className="text-xs text-slate-500 mt-0.5">Morning / Evening batches</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Course Fee</span>
                  <p className="text-sm font-bold text-orange-600 mt-1">Contact for Scholarship</p>
                  <p className="text-xs text-slate-500 mt-0.5">EMI / Installment plans available</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Eligibility</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">Any Degree / 12th Pass</p>
                  <p className="text-xs text-slate-500 mt-0.5">No prior coding required</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Campus Location</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">Chennai & Hyderabad</p>
                  <p className="text-xs text-slate-500 mt-0.5">Academic Partner Jaighurudeva</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Enquiry Line</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">+91 8825948859</p>
                  <p className="text-xs text-slate-500 mt-0.5">Direct counselor assistance</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 11: STUDENT ENQUIRY / ADMISSION CTA
            =================================================================== */}
        <section id="enquiry" className="py-20 bg-gradient-to-b from-[#FAF9F6] to-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Direct Call / WhatsApp Options */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-800">
                  <span>SECTION 11</span>
                  <span>•</span>
                  <span>ADMISSION ENQUIRY</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Ready to Start Your Digital Marketing Journey?
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Take the next step towards learning digital marketing. Contact Digital Ghuru to know more about the course syllabus, class timings, and fee structure.
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href="tel:+918825948859"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-orange-300 shadow-xs hover:shadow transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Call Admissions Office</span>
                      <span className="text-sm font-bold text-slate-900">+91 8825948859</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/918825948859?text=Hello%20Digital%20Ghuru,%20I%20am%20interested%20in%20the%20Digital%20Marketing%20Course.%20Please%20share%20the%20syllabus%20and%20fee%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Instant WhatsApp Enquiry</span>
                      <span className="text-sm font-bold text-emerald-700">Chat with counselor (+91 8825948859)</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Visit Our Training Centre</span>
                      <span className="text-xs font-semibold text-slate-800">Campus visits open Mon–Sat: 9:00 AM – 7:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Static Enquiry Form */}
              <div className="lg:col-span-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl relative">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Request Course Syllabus & Counseling
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Fill this quick form to connect directly with our admissions counselor.
                  </p>

                  {formSubmitted ? (
                    <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fade-in">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="text-sm font-bold text-emerald-900">Enquiry Initiated!</h4>
                      <p className="text-xs text-emerald-700 leading-relaxed">
                        WhatsApp was opened with your pre-filled course enquiry. Our counselor will assist you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="text-xs font-bold text-emerald-800 underline cursor-pointer"
                      >
                        Submit another enquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Student Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sangeetha"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Phone Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. 9876543210"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. name@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          I Am A...
                        </label>
                        <select
                          value={formData.audience}
                          onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option>College Student</option>
                          <option>Fresh Graduate</option>
                          <option>Complete Beginner</option>
                          <option>Working Professional</option>
                          <option>Business Owner / Entrepreneur</option>
                          <option>Freelancer</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Message / Questions (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Ask about batch timings, fees, or course curriculum..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-start via-brand-mid to-brand-end hover:brightness-105 shadow-md shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit & Connect on WhatsApp</span>
                      </button>

                      <p className="text-[10px] text-slate-400 text-center leading-tight">
                        *This connects directly to our verified counselor line without third-party data tracking.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 12: FREQUENTLY ASKED QUESTIONS (FAQ)
            =================================================================== */}
        <section id="faq" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                <span>SECTION 12</span>
                <span>•</span>
                <span>FAQ ACCORDION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Clear answers to common student inquiries regarding admissions, course structure, and tools.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 bg-[#FAF9F6] hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-orange-600 shrink-0" />
                        <span>{idx + 1}. {faq.q}</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-orange-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-600 leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 13: FINAL CALL TO ACTION
            =================================================================== */}
        <section id="final-cta" className="py-20 bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#1E293B] text-white border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next Cohort Starts Soon</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Your Digital Future Starts Here.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Equip yourself with practical, career-ready digital marketing and AI tools skills. Speak with our counselors today to reserve your seat in the upcoming batch.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => scrollToSection('enquiry')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-brand-start via-brand-mid to-brand-end hover:brightness-105 shadow-xl shadow-orange-500/25 transition-all cursor-pointer"
              >
                Enquire Now
              </button>

              <a
                href="https://wa.me/918825948859?text=Hello%20Digital%20Ghuru,%20I%20am%20ready%20to%20enquire%20for%20the%20Digital%20Marketing%20Course."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-sm text-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/40 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href="tel:+918825948859"
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-sm text-slate-300 bg-white/10 hover:bg-white/20 border border-white/15 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>Call: +91 8825948859</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Common Footer */}
      <Footer />

      {/* Reusable Image Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={activeImage}
        caption={activeCaption}
      />
    </div>
  );
};

export default DigitalMarketingCoursePage;

