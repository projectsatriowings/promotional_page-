import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  MessageCircle,
  HelpCircle,
  MapPin,
  Send,
  Compass,
  GraduationCap,
  Store,
  Rocket
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';
import { Footer } from '../shared/Footer';
import { Lightbox } from '../shared/Lightbox';

interface CurriculumModule {
  number: string;
  title: string;
  description: string;
}

interface TechOrbitTool {
  name: string;
  useCase: string;
  logo: string;
  logoLight?: string;
  brandColor: string;
  ring: 'inner' | 'outer';
}

// 4-point sparkle/star icon in white (85% opacity, 12px) with slow 4s spin/pulse
const WhiteSparkle: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-3 h-3 text-white/85 shrink-0 animate-sparkle-pulse"
    aria-hidden="true"
  >
    <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
  </svg>
);

export const DigitalMarketingCoursePage: React.FC = () => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [activeCaption, setActiveCaption] = useState('');

  // FAQ Accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Section 4: Curriculum Module Floating Tooltip state
  const [activeTooltip, setActiveTooltip] = useState<{
    mod: CurriculumModule;
    x: number;
    y: number;
    arrowOffset: number;
  } | null>(null);
  const curriculumSectionRef = useRef<HTMLElement>(null);
  const curriculumTooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showCurriculumTooltip = (mod: CurriculumModule, el: HTMLElement) => {
    if (curriculumTooltipTimeoutRef.current) {
      clearTimeout(curriculumTooltipTimeoutRef.current);
      curriculumTooltipTimeoutRef.current = null;
    }
    if (!curriculumSectionRef.current) return;

    const rect = el.getBoundingClientRect();
    const sectionRect = curriculumSectionRef.current.getBoundingClientRect();

    // 8px gap above the button, relative to section container
    const y = rect.top - sectionRect.top - 8;
    const centerX = rect.left - sectionRect.left + rect.width / 2;

    // Viewport containment: keep 280px tooltip within bounds
    const minX = 148;
    const maxX = Math.max(minX, sectionRect.width - 148);
    const clampedX = Math.max(minX, Math.min(maxX, centerX));
    const arrowOffset = Math.max(-115, Math.min(115, centerX - clampedX));

    setActiveTooltip({
      mod,
      x: clampedX,
      y,
      arrowOffset,
    });
  };

  const hideCurriculumTooltip = () => {
    if (curriculumTooltipTimeoutRef.current) {
      clearTimeout(curriculumTooltipTimeoutRef.current);
      curriculumTooltipTimeoutRef.current = null;
    }
    setActiveTooltip(null);
  };

  const handleCurriculumTitleTouch = (mod: CurriculumModule, el: HTMLElement) => {
    showCurriculumTooltip(mod, el);
    if (curriculumTooltipTimeoutRef.current) {
      clearTimeout(curriculumTooltipTimeoutRef.current);
    }
    curriculumTooltipTimeoutRef.current = setTimeout(() => {
      setActiveTooltip(null);
    }, 3000);
  };

  useEffect(() => {
    const handleGlobalTap = (e: MouseEvent | TouchEvent) => {
      if (
        curriculumSectionRef.current &&
        !curriculumSectionRef.current.contains(e.target as Node)
      ) {
        hideCurriculumTooltip();
      }
    };
    document.addEventListener('touchstart', handleGlobalTap, { passive: true });
    document.addEventListener('click', handleGlobalTap);
    return () => {
      document.removeEventListener('touchstart', handleGlobalTap);
      document.removeEventListener('click', handleGlobalTap);
      if (curriculumTooltipTimeoutRef.current) {
        clearTimeout(curriculumTooltipTimeoutRef.current);
      }
    };
  }, []);

  // Split Orbit state for Section: Tools You’ll Master
  const [activeOrbitTool, setActiveOrbitTool] = useState<string | null>(null);
  const orbitTouchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOrbitToolTouch = (toolName: string) => {
    setActiveOrbitTool(toolName);
    if (orbitTouchTimeoutRef.current) clearTimeout(orbitTouchTimeoutRef.current);
    orbitTouchTimeoutRef.current = setTimeout(() => {
      setActiveOrbitTool(null);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (orbitTouchTimeoutRef.current) clearTimeout(orbitTouchTimeoutRef.current);
    };
  }, []);

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
  const curriculumModules: CurriculumModule[] = [
    { number: '01', title: 'Introduction to Digital Marketing', description: 'Digital ecosystem overview, buyer psychology, inbound vs outbound, customer journey stages.' },
    { number: '02', title: 'Website and Landing Page Basics', description: 'WordPress setup, landing page conversion principles, UI/UX fundamentals, mobile responsiveness.' },
    { number: '03', title: 'Search Engine Optimization (SEO)', description: 'How search engines crawl, index, and rank pages; SERP layout and ranking factor breakdown.' },
    { number: '04', title: 'Keyword Research', description: 'Search intent analysis, long-tail keyword discovery, search volume metrics, competitor keyword gap analysis.' },
    { number: '05', title: 'On-Page SEO', description: 'Meta tags, header hierarchies, image alt text optimization, URL structuring, keyword density & LSI.' },
    { number: '06', title: 'Off-Page SEO', description: 'Link building strategies, high-authority backlink outreach, domain authority, anchor text optimization.' },
    { number: '07', title: 'Technical SEO', description: 'Core Web Vitals, XML sitemaps, robots.txt, schema markup, site speed optimization, mobile indexing.' },
    { number: '08', title: 'Social Media Marketing', description: 'Platform algorithms, organic audience growth, engagement strategies, content calendar scheduling.' },
    { number: '09', title: 'Facebook and Instagram Marketing', description: 'Business Suite setup, community building, reels strategies, influencer collaboration frameworks.' },
    { number: '10', title: 'Meta Ads Manager', description: 'Campaign structures, custom audiences, lookalike targeting, pixel tracking, A/B ad creative testing.' },
    { number: '11', title: 'Google Ads (SEM)', description: 'Ad auction dynamics, Quality Score optimization, bidding strategies (tCPA, ROAS), ad extensions.' },
    { number: '12', title: 'Search Advertising', description: 'High-intent search keyword bidding, negative keywords, high-converting ad copy copywriting.' },
    { number: '13', title: 'Display Advertising', description: 'Banner ads, responsive display ads, Google Display Network targeting, remarketing sequences.' },
    { number: '14', title: 'Content Marketing', description: 'Storytelling frameworks, content pillars, lead magnets, editorial workflows, content repurposing.' },
    { number: '15', title: 'Content Creation & Canva', description: 'Graphic design fundamentals, viral hooks, thumbnail design, video scripting for reels and shorts.' },
    { number: '16', title: 'Email Marketing', description: 'List building, newsletter copywriting, email automation sequences, open rate & click rate optimization.' },
    { number: '17', title: 'Google Analytics 4 (GA4)', description: 'Event tracking, user journey reports, conversion funnels, custom exploration reports.' },
    { number: '18', title: 'Marketing Performance Analysis', description: 'ROI calculation, Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), attribution models.' },
    { number: '19', title: 'AI Tools for Digital Marketing', description: 'Leveraging ChatGPT for copy, Midjourney for creatives, Zapier for automation, prompt engineering.' },
    { number: '20', title: 'Marketing Strategy and Campaign Planning', description: 'End-to-end full-funnel campaign blueprint, media planning, budget allocation, client pitch decks.' }
  ];

  // 12 Industry Tech Stack Platforms for Split Orbit
  const techOrbitTools: TechOrbitTool[] = [
    // Inner ring (5 tools)
    {
      name: 'Google Ads',
      useCase: 'Paid Search',
      logo: '/assets/logos/googleads.svg',
      brandColor: '#4285F4',
      ring: 'inner',
    },
    {
      name: 'Meta',
      useCase: 'Paid Social',
      logo: '/assets/logos/meta.svg',
      brandColor: '#0081FB',
      ring: 'inner',
    },
    {
      name: 'Google Analytics 4',
      useCase: 'Data & Tracking',
      logo: '/assets/logos/googleanalytics.svg',
      brandColor: '#E37400',
      ring: 'inner',
    },
    {
      name: 'Google Search Console',
      useCase: 'SEO Audits',
      logo: '/assets/logos/googlesearchconsole.svg',
      brandColor: '#458CF5',
      ring: 'inner',
    },
    {
      name: 'ChatGPT',
      useCase: 'AI Copywriting',
      logo: '/assets/logos/chatgpt.svg',
      brandColor: '#10A37F',
      ring: 'inner',
    },

    // Outer ring (7 tools)
    {
      name: 'Semrush',
      useCase: 'Competitor Intelligence',
      logo: '/assets/logos/semrush.svg',
      brandColor: '#FF642D',
      ring: 'outer',
    },
    {
      name: 'Ubersuggest',
      useCase: 'Keyword Discovery',
      logo: '/assets/logos/ubersuggest.svg',
      brandColor: '#F25C05',
      ring: 'outer',
    },
    {
      name: 'Midjourney',
      useCase: 'AI Visuals',
      logo: '/assets/logos/midjourney.svg',
      brandColor: '#1E1F22',
      ring: 'outer',
    },
    {
      name: 'Canva',
      useCase: 'Creative Design',
      logo: '/assets/logos/canva.svg',
      brandColor: '#00C4CC',
      ring: 'outer',
    },
    {
      name: 'Zapier',
      useCase: 'Marketing Automation',
      logo: '/assets/logos/zapier.svg',
      brandColor: '#FF4F00',
      ring: 'outer',
    },
    {
      name: 'Mailchimp',
      useCase: 'Email Automation',
      logo: '/assets/logos/mailchimp.svg',
      brandColor: '#FFE01B',
      ring: 'outer',
    },
    {
      name: 'WordPress',
      useCase: 'CMS & Landing Pages',
      logo: '/assets/logos/wordpress.svg',
      brandColor: '#21759B',
      ring: 'outer',
    },
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

      <main className="pt-[105px]">
        {/* ===================================================================
            SECTION 1: HERO SECTION
            =================================================================== */}
        <section id="hero" className="relative pt-6 pb-0 overflow-hidden bg-gradient-to-b from-white via-[#FAF9F6] to-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-start">

              {/* Left Column: Headlines & CTAs */}
              <div className="text-center lg:text-left pb-8 lg:pb-14">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-50 border border-orange-200 text-orange-700 shadow-2xs mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>AI-Powered Career Training • Chennai & Hyderabad</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-5">
                  Master Digital Marketing.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start via-brand-mid to-brand-end">
                    Build Your Digital Future.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 mb-8">
                  Discover digital marketing skills, explore modern marketing tools and develop the knowledge to grow in today's digital world.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                  <button
                    type="button"
                    onClick={() => scrollToSection('curriculum')}
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

              {/* Right Column: Hero Large Student Cutout */}
              <div className="relative flex flex-col justify-end items-center self-end w-full">
                {/* Soft Decorative Ambient Glow (560px circle centred behind torso) */}
                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none -z-0 rounded-full"
                  style={{
                    width: '420px',
                    height: '420px',
                    top: '48%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255,122,0,0.18) 0%, rgba(245,158,11,0.12) 45%, rgba(255,122,0,0) 70%)',
                    filter: 'blur(90px)',
                  }}
                />

                {/* Faint dashed orange circle behind upper body for depth */}
                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none -z-0 rounded-full hidden sm:block"
                  style={{
                    width: '340px',
                    height: '340px',
                    top: '42%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '2px dashed rgba(255,107,0,0.15)',
                  }}
                />

                {/* Bottom-aligned large student image */}
                <div className="hero-student-wrapper">
                  <img
                    src="/assets/hero-student.png"
                    alt="Digital Ghuru Digital Marketing Student"
                    className="hero-student-image select-none"
                    loading="eager"
                    fetchPriority="high"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/hero_banner_image.png';
                    }}
                  />
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
            SECTION 4: COMPLETE COURSE CURRICULUM (COMPACT MARQUEE STRIP)
            =================================================================== */}
        <section
          id="curriculum"
          ref={curriculumSectionRef}
          className="relative pt-[90px] pb-6 bg-white overflow-visible"
        >
          {/* Floating Tooltip Box rendered above the track */}
          {activeTooltip && (
            <div
              id="curriculum-active-tooltip"
              role="tooltip"
              className="curriculum-tooltip"
              style={{
                top: `${activeTooltip.y}px`,
                left: `${activeTooltip.x}px`,
              }}
            >
              <div className="text-[10px] font-bold text-[#F04E00] tracking-[1px] uppercase mb-1">
                MODULE {activeTooltip.mod.number}
              </div>
              <div className="text-[12.5px] text-[#0F172A] leading-[1.5] font-normal">
                {activeTooltip.mod.description}
              </div>
              <div
                className="curriculum-tooltip-arrow"
                style={{
                  left: `calc(50% + ${activeTooltip.arrowOffset}px)`,
                }}
              />
            </div>
          )}

          {/* Full-Width Scrolling Marquee Strip (Edge-to-Edge) */}
          <div className="w-full relative overflow-hidden curriculum-marquee-band marquee-container">
            {/* Inner track with smooth edge mask to prevent edge artifact boxes */}
            <div className="curriculum-marquee-track">
              <div
                className="animate-marquee-curriculum"
                style={{
                  animationPlayState: activeTooltip ? 'paused' : undefined,
                }}
              >
                {/* First pass */}
                {curriculumModules.map((mod, idx) => {
                  const isActive = activeTooltip?.mod.number === mod.number;
                  return (
                    <div key={`mod-pass1-${idx}`} className="flex items-center shrink-0">
                      <button
                        type="button"
                        aria-describedby={isActive ? 'curriculum-active-tooltip' : undefined}
                        onMouseEnter={(e) => showCurriculumTooltip(mod, e.currentTarget)}
                        onMouseLeave={hideCurriculumTooltip}
                        onFocus={(e) => showCurriculumTooltip(mod, e.currentTarget)}
                        onBlur={hideCurriculumTooltip}
                        onClick={(e) => handleCurriculumTitleTouch(mod, e.currentTarget)}
                        className={`curriculum-marquee-title ${isActive ? 'is-active-title' : ''}`}
                      >
                        {mod.title}
                      </button>
                      <div className="mx-7 flex items-center justify-center shrink-0">
                        <WhiteSparkle />
                      </div>
                    </div>
                  );
                })}

                {/* Second pass (identical, for seamless 0% to -50% infinite loop) */}
                {curriculumModules.map((mod, idx) => {
                  const isActive = activeTooltip?.mod.number === mod.number;
                  return (
                    <div key={`mod-pass2-${idx}`} className="flex items-center shrink-0">
                      <button
                        type="button"
                        aria-describedby={isActive ? 'curriculum-active-tooltip' : undefined}
                        onMouseEnter={(e) => showCurriculumTooltip(mod, e.currentTarget)}
                        onMouseLeave={hideCurriculumTooltip}
                        onFocus={(e) => showCurriculumTooltip(mod, e.currentTarget)}
                        onBlur={hideCurriculumTooltip}
                        onClick={(e) => handleCurriculumTitleTouch(mod, e.currentTarget)}
                        className={`curriculum-marquee-title ${isActive ? 'is-active-title' : ''}`}
                      >
                        {mod.title}
                      </button>
                      <div className="mx-7 flex items-center justify-center shrink-0">
                        <WhiteSparkle />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>



        {/* ===================================================================
            SECTION: SPLIT ORBIT - TOOLS YOU'LL MASTER
            =================================================================== */}
        <section id="tools" className="py-16 bg-transparent" style={{ paddingBlock: '64px' }}>
          <div className="w-full mx-auto" style={{ maxWidth: '1200px', paddingInline: '24px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px] gap-12 lg:gap-16 items-center">

              {/* Left Column: Heading, Subtitle & Stats */}
              <div className="text-center lg:text-left flex flex-col justify-center">
                {/* Pill badge */}
                <div
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-[#F04E00] mb-4 self-center lg:self-start"
                  style={{ backgroundColor: 'rgba(255, 107, 0, 0.12)' }}
                >
                  <span>Industry tech stack</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-[40px] font-bold text-[#0F172A] tracking-tight leading-[1.15] mb-3">
                  Tools you’ll{' '}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #FFA000 0%, #F04E00 100%)',
                    }}
                  >
                    master
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-base text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
                  12 industry platforms, practised hands-on in every module.
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                  <div>
                    <div className="text-[28px] font-bold text-[#F04E00] leading-none mb-1">
                      12+
                    </div>
                    <div className="text-[13px] text-slate-500 font-medium">Tools</div>
                  </div>
                  <div>
                    <div className="text-[28px] font-bold text-[#F04E00] leading-none mb-1">
                      3
                    </div>
                    <div className="text-[13px] text-slate-500 font-medium">Certifications</div>
                  </div>
                  <div>
                    <div className="text-[28px] font-bold text-[#F04E00] leading-none mb-1">
                      100%
                    </div>
                    <div className="text-[13px] text-slate-500 font-medium">Hands-on</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Orbit System */}
              <div className="flex justify-center items-center w-full">
                {/* Desktop & Tablet Orbit (hidden on mobile ≤640px) */}
                <div className="hidden sm:block">
                  <div className="orbit">
                    <div className="ring ring--inner" />
                    <div className="ring ring--outer" />
                    <div className="orbit-center">
                      <Sparkles className="w-5 h-5 text-white drop-shadow-xs mb-0.5" />
                      <div className="text-white font-extrabold text-[12px] uppercase tracking-wider leading-tight text-center">
                        Digital
                        <br />
                        Ghuru
                      </div>
                    </div>

                    <div className="track track--inner">
                      {techOrbitTools
                        .filter((t) => t.ring === 'inner')
                        .map((tool, idx) => (
                          <div
                            key={tool.name}
                            className="slot"
                            style={{ '--i': `${idx}`, '--n': '5' } as React.CSSProperties}
                          >
                            <button
                              type="button"
                              className={`logo ${activeOrbitTool === tool.name ? 'is-active' : ''}`}
                              style={{
                                '--tool-color': tool.brandColor,
                                '--tool-glow': `${tool.brandColor}26`,
                              } as React.CSSProperties}
                              aria-label={`${tool.name} – ${tool.useCase}`}
                              onMouseEnter={() => setActiveOrbitTool(tool.name)}
                              onMouseLeave={() => setActiveOrbitTool(null)}
                              onFocus={() => setActiveOrbitTool(tool.name)}
                              onBlur={() => setActiveOrbitTool(null)}
                              onClick={() => handleOrbitToolTouch(tool.name)}
                            >
                              <img src={tool.logo} alt={`${tool.name} logo`} />
                              <span className="tip" role="tooltip">
                                <span className="tip-title">{tool.name}</span>
                                <span className="tip-sep">·</span>
                                <span className="tip-desc">{tool.useCase}</span>
                              </span>
                            </button>
                          </div>
                        ))}
                    </div>

                    <div className="track track--outer">
                      {techOrbitTools
                        .filter((t) => t.ring === 'outer')
                        .map((tool, idx) => (
                          <div
                            key={tool.name}
                            className="slot"
                            style={{ '--i': `${idx}`, '--n': '7' } as React.CSSProperties}
                          >
                            <button
                              type="button"
                              className={`logo ${activeOrbitTool === tool.name ? 'is-active' : ''}`}
                              style={{
                                '--tool-color': tool.brandColor,
                                '--tool-glow': `${tool.brandColor}26`,
                              } as React.CSSProperties}
                              aria-label={`${tool.name} – ${tool.useCase}`}
                              onMouseEnter={() => setActiveOrbitTool(tool.name)}
                              onMouseLeave={() => setActiveOrbitTool(null)}
                              onFocus={() => setActiveOrbitTool(tool.name)}
                              onBlur={() => setActiveOrbitTool(null)}
                              onClick={() => handleOrbitToolTouch(tool.name)}
                            >
                              <img src={tool.logo} alt={`${tool.name} logo`} />
                              <span className="tip" role="tooltip">
                                <span className="tip-title">{tool.name}</span>
                                <span className="tip-sep">·</span>
                                <span className="tip-desc">{tool.useCase}</span>
                              </span>
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Mobile 4x3 Grid (shown on ≤640px) */}
                <div className="block sm:hidden w-full max-w-sm mx-auto">
                  <div className="grid grid-cols-4 gap-3 justify-items-center py-2">
                    {techOrbitTools.map((tool) => {
                      const isSelected = activeOrbitTool === tool.name;
                      return (
                        <div key={tool.name} className="relative flex justify-center">
                          <button
                            type="button"
                            aria-label={`${tool.name} – ${tool.useCase}`}
                            onClick={() => handleOrbitToolTouch(tool.name)}
                            className={`logo-mobile ${isSelected ? 'is-active' : ''}`}
                            style={{
                              '--tool-color': tool.brandColor,
                              '--tool-glow': `${tool.brandColor}26`,
                            } as React.CSSProperties}
                          >
                            <img
                              src={tool.logo}
                              alt={`${tool.name} logo`}
                              className="w-[28px] h-[28px] object-contain select-none pointer-events-none"
                              loading="lazy"
                            />
                            <span className="tip" role="tooltip">
                              <span className="tip-title">{tool.name}</span>
                              <span className="tip-sep">·</span>
                              <span className="tip-desc">{tool.useCase}</span>
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

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
                <span>AUTHENTIC GALLERY & MENTORS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Training Sessions & Learning Environment
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Real photos from Digital Ghuru classroom sessions, interactive workshops, and learning cohorts. Click any image to view in full resolution.
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
                <span>FREQUENTLY ASKED QUESTIONS</span>
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
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-orange-600' : ''
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

