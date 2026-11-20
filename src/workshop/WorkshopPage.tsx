import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Clock,
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Laptop,
  Award,
  Users,
  Target,
  MessageCircle,
  ChevronDown,
  AlertCircle,
  Zap,
  BookOpen,
  ShieldCheck,
  TrendingUp,
  Play,
  Gamepad2,
  Code2,
  Rocket,
  Video,
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';
import { Footer } from '../shared/Footer';
import { CourseEnquiryPopup } from '../shared/CourseEnquiryPopup';
import { StickyOfferBar } from '../shared/StickyOfferBar';
import { useSharedCountdown } from '../shared/useSharedCountdown';

interface WorkshopTrack {
  id: string;
  title: string;
  badge: string;
  duration: string;
  schedule: string;
  mode: string;
  seatsLeft: string;
  tagline: string;
  highlights: string[];
  tools: string[];
  icon: React.ReactNode;
}

interface WorkshopPageProps {
  defaultCategory?: 'dm' | 'kids';
}

export const WorkshopPage: React.FC<WorkshopPageProps> = ({ defaultCategory }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active sub-tab from prop or URL
  const initialCategory: 'dm' | 'kids' =
    defaultCategory ||
    (location.pathname === '/workshop/kids' || location.pathname === '/workshop/4-kids'
      ? 'kids'
      : 'dm');

  const [activeCategory, setActiveCategory] = useState<'dm' | 'kids'>(initialCategory);

  // Sync category if URL path changes
  useEffect(() => {
    if (location.pathname === '/workshop/kids' || location.pathname === '/workshop/4-kids') {
      setActiveCategory('kids');
    } else if (location.pathname === '/workshop/digital-marketing') {
      setActiveCategory('dm');
    }
  }, [location.pathname]);

  // Auto-popup 2s on initial mount
  const [isEnquiryPopupOpen, setIsEnquiryPopupOpen] = useState(false);
  const popupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    popupTimerRef.current = setTimeout(() => {
      setIsEnquiryPopupOpen(true);
    }, 2000);
    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
    };
  }, []);

  // Synchronized countdown for Workshop category
  const { formattedMin: enquiryMin, formattedSec: enquirySec } = useSharedCountdown('workshop');

  // Digital Marketing Workshop Tracks
  const dmTracks: WorkshopTrack[] = [
    {
      id: 'ai-marketing',
      title: 'Generative AI & Marketing Automation Bootcamp',
      badge: 'Bestseller · Weekend Intensive',
      duration: '1 Day (6 Hours)',
      schedule: 'Saturday · 10:00 AM – 4:30 PM',
      mode: 'In-Person (Chennai) & Live Interactive Online',
      seatsLeft: 'Only 7 seats left',
      tagline: 'Automate marketing tasks, generate high-converting ad copy, and build custom GPT workflows.',
      highlights: [
        'Advanced Prompt Engineering for copy, research & market analysis',
        'Midjourney v6 & Flux for high-converting visual ad creatives',
        'Automated lead generation workflows with Make.com & ChatGPT',
        'Build your own Custom AI Agent for daily marketing tasks',
      ],
      tools: ['ChatGPT Plus', 'Claude 3.7', 'Midjourney v6', 'Make.com', 'Notion AI'],
      icon: <Zap className="w-6 h-6 text-amber-500" />,
    },
    {
      id: 'performance-ads',
      title: 'Performance Marketing & Paid Ads Accelerator',
      badge: 'High ROI · Real Ad Spend',
      duration: '2 Days (Weekend Bootcamp)',
      schedule: 'Saturday & Sunday · 10:00 AM – 4:00 PM',
      mode: 'In-Person Lab (Chennai)',
      seatsLeft: 'Only 5 seats left',
      tagline: 'Launch live ad campaigns with real budget. Master Meta Ads Manager, Google Search & GA4.',
      highlights: [
        'Live ₹5,000 ad budget campaign launch during class',
        'Meta Pixel, Conversion API & Google Tag Manager setup',
        'CBO vs ABO testing frameworks & creative fatigue mitigation',
        'GA4 conversion attribution & Looker Studio live dashboards',
      ],
      tools: ['Meta Ads Manager', 'Google Ads', 'GA4', 'Tag Manager', 'Looker Studio'],
      icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
    },
    {
      id: 'content-creator',
      title: 'Viral Short-Form Video & Content Engine',
      badge: 'Trending · Creator & Brand Focus',
      duration: '1 Day (6 Hours)',
      schedule: 'Sunday Masterclass · 10:30 AM – 4:30 PM',
      mode: 'Studio Lab (Chennai)',
      seatsLeft: 'Only 6 seats left',
      tagline: 'Master scripting, smartphone camera setup, AI video editing, and Instagram & YouTube algorithms.',
      highlights: [
        'The 3-Second Viral Hook Framework for Reels & Shorts',
        'Hands-on CapCut Pro AI workflows (auto-captions, jump cuts, b-roll)',
        'Smartphone camera settings, wireless mic & ring lighting lab',
        'Content calendar system to generate 30 videos in 2 hours',
      ],
      tools: ['CapCut Pro', 'Canva Magic', 'ElevenLabs', 'Smartphone Studio Gear'],
      icon: <Play className="w-6 h-6 text-rose-500" />,
    },
    {
      id: 'seo-growth',
      title: 'SEO & Growth Hacking Masterclass',
      badge: 'Career Acceleration · Practical',
      duration: '1 Day (5 Hours)',
      schedule: 'Upcoming Sunday · 11:00 AM – 4:00 PM',
      mode: 'Interactive Live Lab',
      seatsLeft: 'Only 8 seats left',
      tagline: 'Perform real-time website audits, map high-intent keywords, and rank Page 1 on Google.',
      highlights: [
        'Live technical SEO audit on attendee websites',
        'High-intent commercial keyword mapping with Ahrefs/SEMrush',
        'AI-assisted programmatic SEO & content clustering',
        'Google Business Profile ranking hack for local domination',
      ],
      tools: ['Ahrefs', 'SEMrush', 'Google Search Console', 'Screaming Frog'],
      icon: <Target className="w-6 h-6 text-emerald-500" />,
    },
  ];

  // 3 Kids AI and Tech Program Workshop Tracks
  const kidsTracks: WorkshopTrack[] = [
    {
      id: 'kids-ai-story',
      title: 'AI Super Kids & Digital Storytelling Lab',
      badge: 'Ages 7–12 · Fun & Interactive',
      duration: '1 Day (4 Hours)',
      schedule: 'Saturday · 10:00 AM – 2:00 PM',
      mode: 'In-Person (Chennai) & Live Interactive Online',
      seatsLeft: 'Only 6 seats left',
      tagline: 'Hands-on creative AI tools, digital comics, voice character cloning, and safe AI exploration.',
      highlights: [
        'Write and publish custom illustrated AI storybooks',
        'Generate vibrant cartoon art using safe kid-friendly AI prompts',
        'Voice avatar creation and sound effect design with ElevenLabs',
        'Digital safety, AI ethics and critical thinking for young minds',
      ],
      tools: ['ChatGPT for Kids', 'Canva Magic', 'ElevenLabs', 'AI Storyboarder'],
      icon: <Rocket className="w-6 h-6 text-indigo-500" />,
    },
    {
      id: 'kids-robotics-scratch',
      title: 'Robotics, Scratch Coding & Game Design',
      badge: 'Ages 10–16 · Hands-on Coding',
      duration: '2 Days (Weekend Bootcamp)',
      schedule: 'Saturday & Sunday · 10:30 AM – 2:30 PM',
      mode: 'Hands-On Tech Lab (Chennai)',
      seatsLeft: 'Only 5 seats left',
      tagline: 'Build playable arcade games and program smart interactive robot sensors with block coding.',
      highlights: [
        'Design and publish 2 playable browser games in MIT Scratch',
        'Conditional logic, variables, game physics and high scores',
        'Micro:bit sensor coding (temperature, motion, LED matrix)',
        'Young Coder Certificate of Achievement by Digital Ghuru',
      ],
      tools: ['MIT Scratch 3.0', 'Micro:bit Simulator', 'MakeCode', 'Logic Blocks'],
      icon: <Gamepad2 className="w-6 h-6 text-purple-500" />,
    },
    {
      id: 'kids-young-entrepreneur',
      title: 'Young Innovators & Tech Entrepreneurship',
      badge: 'Ages 12–18 · Future Leaders',
      duration: '1 Day (5 Hours)',
      schedule: 'Sunday · 11:00 AM – 4:00 PM',
      mode: 'Innovation Lab (Chennai)',
      seatsLeft: 'Only 7 seats left',
      tagline: 'Transform brilliant ideas into working no-code mobile apps and deliver a live shark-tank pitch.',
      highlights: [
        'Build a functional mobile app prototype without writing code',
        'AI-assisted business model generation and market research',
        'Pitch deck design and live Shark Tank presentation session',
        'Digital Ghuru Young Founder Certificate & mentor feedback',
      ],
      tools: ['Glide No-Code', 'Canva Magic', 'ChatGPT', 'Figma for Kids'],
      icon: <Code2 className="w-6 h-6 text-cyan-500" />,
    },
    {
      id: 'kids-animation-youtube',
      title: 'Creative Media, Animation & YouTube Lab',
      badge: 'Ages 8–15 · Creator Focus',
      duration: '1 Day (4 Hours)',
      schedule: 'Upcoming Sunday · 2:00 PM – 6:00 PM',
      mode: 'Studio Lab (Chennai)',
      seatsLeft: 'Only 6 seats left',
      tagline: 'Green screen effects, CapCut video editing, podcast microphones, and safe creator habits.',
      highlights: [
        'Record and edit a live podcast episode with real microphones',
        'Green screen video background effects and animated transitions',
        'Thumbnail design and compelling video storytelling frameworks',
        'Digital Ghuru Junior Creator badge & takeaway portfolio file',
      ],
      tools: ['CapCut Pro', 'Audacity', 'Canva Animation', 'Studio Microphones'],
      icon: <Video className="w-6 h-6 text-rose-500" />,
    },
  ];

  // Active tracks based on sub-tab
  const currentTracks = activeCategory === 'kids' ? kidsTracks : dmTracks;

  // Selected track for preview
  const [selectedTrackId, setSelectedTrackId] = useState<string>(
    activeCategory === 'kids' ? 'kids-ai-story' : 'ai-marketing'
  );

  // Form state for in-page contact card
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    workshop: activeCategory === 'kids' ? kidsTracks[0].title : dmTracks[0].title,
    role: activeCategory === 'kids' ? 'Parent (for Kids Workshop)' : 'Working professional',
    message: '',
  });

  // Keep form in sync when category changes
  useEffect(() => {
    setSelectedTrackId(activeCategory === 'kids' ? 'kids-ai-story' : 'ai-marketing');
    setFormData((prev) => ({
      ...prev,
      workshop: activeCategory === 'kids' ? kidsTracks[0].title : dmTracks[0].title,
      role: activeCategory === 'kids' ? 'Parent (for Kids Workshop)' : 'Working professional',
    }));
  }, [activeCategory]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubTabChange = (cat: 'dm' | 'kids') => {
    setActiveCategory(cat);
    const targetPath = cat === 'kids' ? '/workshop/kids' : '/workshop/digital-marketing';
    navigate(targetPath, { replace: true });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const header = document.querySelector('header');
      const banner = header?.previousElementSibling as HTMLElement | null;
      const headerHeight = header ? header.getBoundingClientRect().height : 56;
      const bannerHeight = banner ? banner.getBoundingClientRect().height : 33;
      const navOffset = headerHeight + bannerHeight + 6;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: 'smooth',
      });
    }
  };

  const handleReserveSeat = () => {
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
      popupTimerRef.current = null;
    }
    setIsEnquiryPopupOpen(false);
    scrollToSection('enquiry-form-card-workshop');
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your phone number';
    } else if (!/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
      errs.phone = 'Enter a valid 10-digit number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = encodeURIComponent(`Workshop Registration Request - ${formData.workshop}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nCategory: ${activeCategory === 'kids' ? '3 Kids AI & Tech Program' : 'Digital Marketing'}\nWorkshop: ${formData.workshop}\nProfile: ${formData.role}\nNote: ${formData.message || 'N/A'}`
    );

    try {
      const link = document.createElement('a');
      link.href = `mailto:admissions@digitalghuru.com?subject=${subject}&body=${body}`;
      link.target = '_blank';
    } catch {}

    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Digital Ghuru, I would like to reserve my seat for the ${formData.workshop} (${activeCategory === 'kids' ? '3 Kids AI & Tech' : 'Digital Marketing'}).\nName: ${formData.name}\nPhone: ${formData.phone}\nRole: ${formData.role}`
    );
    window.open(`https://wa.me/918825948859?text=${text}`, '_blank');
  };

  const faqs = [
    {
      q: 'Do I need any prior technical or coding experience?',
      a: 'No prior coding or technical knowledge is needed. Both our Digital Marketing and 3 Kids AI & Tech workshops are designed to be 100% beginner-friendly and practical. Every concept is broken down step-by-step with real-time mentor guidance.',
    },
    {
      q: 'Should I bring my own laptop to the workshop?',
      a: 'Yes! These are hands-on lab masterclasses where attendees build live campaigns, configure tools, code games, or generate AI artwork during the session. Bring your laptop and charger.',
    },
    {
      q: 'Will participants receive a verified certificate?',
      a: 'Yes, every participant receives an official Digital Ghuru Masterclass Certificate of Completion, complete with verifiable credential links for resumes, school portfolios, and LinkedIn.',
    },
    {
      q: 'Will session recordings, tool templates, and prompt libraries be shared?',
      a: 'Yes! All attendees get full 30-day access to recorded video sessions, plus lifetime access to our curated Prompt Cheat Sheets, checklist templates, and project code files.',
    },
    {
      q: 'Can parents attend the 3 Kids AI & Tech workshops?',
      a: 'Parents are warmly welcome to accompany younger children (Ages 7–11) during the orientation and final showcase. We also have a dedicated parent waiting lounge with Wi-Fi.',
    },
    {
      q: 'Can I reschedule my batch if an unexpected conflict arises?',
      a: 'Yes. Simply notify our academic coordinator at least 24 hours prior to the workshop, and we will happily move your seat to the subsequent cohort at zero extra charge.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* Shared Navbar */}
      <Navbar activePage="workshop" onOpenEnquiry={handleReserveSeat} />

      <main className="pt-24 sm:pt-28">
        {/* ==============================================================
            HERO SECTION: Digital Ghuru Workshops
            ============================================================== */}
        <section id="hero-workshop" className="relative overflow-hidden pt-8 pb-12 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100/80 text-orange-700 border border-orange-200 shadow-2xs mb-4">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>
                  {activeCategory === 'kids'
                    ? '3 Kids AI & Tech Workshops · Weekend Camps'
                    : 'Hands-On Weekend Masterclasses · Chennai & Live Online'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.15] mb-5">
                Fast-Track Your Skills With{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA000] via-[#FF7900] to-[#F04E00]">
                  {activeCategory === 'kids' ? 'Kids AI & Tech' : 'Practical AI & Growth'}
                </span>{' '}
                Workshops.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
                {activeCategory === 'kids'
                  ? 'Inspire your child with hands-on robotics, safe AI storytelling, and game design. Fun, weekend bootcamps designed for young creators and future leaders.'
                  : 'No boring theory. Dive into intensive, weekend masterclasses designed to give you actionable skills in Generative AI tools, live Performance Ads, and viral content production.'}
              </p>

              {/* ==============================================================
                  THE TWO SUB-TABS UNDER WORKSHOP (Digital Marketing & 3 Kids AI)
                  ============================================================== */}
              <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm gap-1.5 mb-8">
                <button
                  type="button"
                  onClick={() => handleSubTabChange('dm')}
                  className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-tight transition-all cursor-pointer ${
                    activeCategory === 'dm'
                      ? 'bg-gradient-to-r from-brand-start via-brand-mid to-brand-end text-white shadow-md shadow-orange-500/25'
                      : 'text-[#231A38] hover:text-[#F04E00] hover:bg-slate-50'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Digital Marketing</span>
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeCategory === 'dm' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    4 Tracks
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSubTabChange('kids')}
                  className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-tight transition-all cursor-pointer ${
                    activeCategory === 'kids'
                      ? 'bg-gradient-to-r from-brand-start via-brand-mid to-brand-end text-white shadow-md shadow-orange-500/25'
                      : 'text-[#231A38] hover:text-[#F04E00] hover:bg-slate-50'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>3 Kids AI and Tech Program</span>
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeCategory === 'kids' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    4 Tracks
                  </span>
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => scrollToSection('workshop-tracks')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-brand-start via-brand-mid to-brand-end hover:brightness-105 shadow-md shadow-orange-500/25 transition cursor-pointer"
                >
                  <span>Explore {activeCategory === 'kids' ? 'Kids' : 'Marketing'} Tracks</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleReserveSeat}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-stone-50 border border-slate-200 shadow-xs transition cursor-pointer"
                >
                  <span>Reserve Early-Bird Seat</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80">
                <div className="flex items-center gap-2 justify-center text-xs font-bold text-slate-700">
                  <Laptop className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>100% Practical Labs</span>
                </div>
                <div className="flex items-center gap-2 justify-center text-xs font-bold text-slate-700">
                  <Award className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Verified Certificate</span>
                </div>
                <div className="flex items-center gap-2 justify-center text-xs font-bold text-slate-700">
                  <Users className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Small Cohorts (15 Seats)</span>
                </div>
                <div className="flex items-center gap-2 justify-center text-xs font-bold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>1:1 Mentor Feedback</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==============================================================
            WORKSHOP TRACKS SECTION
            ============================================================== */}
        <section id="workshop-tracks" className="py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-1 block">
                {activeCategory === 'kids' ? '3 Kids AI & Tech Program' : 'Digital Marketing Program'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {activeCategory === 'kids'
                  ? 'Upcoming 3 Kids AI & Tech Workshops'
                  : 'Upcoming Digital Marketing Workshops'}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                {activeCategory === 'kids'
                  ? 'Interactive robotics, Scratch programming, and creative AI bootcamps for ages 7 to 18.'
                  : 'Hand-picked intensive curriculums designed to help you execute live campaigns immediately.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {currentTracks.map((track) => (
                <div
                  key={track.id}
                  className={`rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                    selectedTrackId === track.id
                      ? 'border-orange-500 bg-orange-50/20 shadow-lg ring-1 ring-orange-500/20'
                      : 'border-slate-200 bg-white hover:border-orange-300 shadow-sm hover:shadow-md'
                  }`}
                  onClick={() => setSelectedTrackId(track.id)}
                >
                  <div>
                    {/* Header: Badge & Seats */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-orange-100 text-orange-700 border border-orange-200">
                        {track.badge}
                      </span>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                        {track.seatsLeft}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2.5 rounded-xl bg-orange-100/70 shrink-0 mt-0.5">
                        {track.icon}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                          {track.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {track.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Meta info: Duration, Schedule, Mode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span>{track.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span>{track.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-1 sm:col-span-2">
                        <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span>{track.mode}</span>
                      </div>
                    </div>

                    {/* Key takeaways */}
                    <div className="mb-4">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                        What you'll build & master:
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {track.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {track.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData((prev) => ({ ...prev, workshop: track.title }));
                      handleReserveSeat();
                    }}
                    className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-brand-start via-brand-mid to-brand-end hover:brightness-105 transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Reserve Seat for this Workshop</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==============================================================
            WHY ATTEND WORKSHOP SECTION
            ============================================================== */}
        <section className="py-16 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-1 block">
                The Masterclass Advantage
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Why Students & Parents Choose Digital Ghuru Workshops
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Live Tool Execution</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Attendees don't just sit and listen. They configure live ad accounts, write AI prompts, program robots, and export finished assets live.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Take-Home Toolkits</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Receive ready-to-use Prompt Libraries, game source code, templates, and 30-day recorded video access for easy review anytime.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Verified Credential</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Showcase practical project competence with an official Digital Ghuru Masterclass Certificate for school portfolios, LinkedIn, and resumes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            WORKSHOP IN-PAGE ENQUIRY CARD (WITH DEDICATED WORKSHOP TIMER)
            ============================================================== */}
        <section id="enquiry-workshop" className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF8F5] to-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Workshop overview */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 border border-orange-200 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>Limited Batch Size</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                  Reserve Your Seat for the Upcoming Workshop Cohort
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  Seats are capped at 15 participants per batch to maintain 1:1 mentor assistance and interactive labs.
                  Early-bird attendees receive full access to our proprietary Prompt Library & Workshop Toolkit.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-slate-900 block">Fast-Track Curriculum:</strong>
                      <span className="text-xs text-slate-600">Master months of trial & error in one intensive weekend.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-slate-900 block">Personal Mentorship:</strong>
                      <span className="text-xs text-slate-600">Get your campaigns, code, and AI pipelines reviewed live.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sm text-slate-900 block">30-Day Replay & Support:</strong>
                      <span className="text-xs text-slate-600">Revisit all recordings and post questions in our alumni network.</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-800">Need school or team corporate booking?</span>
                  </div>
                  <a
                    href="https://wa.me/918825948859?text=Hello%20Digital%20Ghuru,%20I%20am%20interested%20in%20a%20workshop%20for%20our%20group."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-extrabold text-orange-600 hover:underline shrink-0"
                  >
                    Chat With Us →
                  </a>
                </div>
              </div>

              {/* Right Column: Workshop Card matching Reference with Dedicated Timer */}
              <div className="lg:col-span-6">
                <div
                  id="enquiry-form-card-workshop"
                  className="relative rounded-[24px] overflow-hidden shadow-2xl border border-orange-200/50 bg-[#FAF8F5] transition-all scroll-mt-[92px] sm:scroll-mt-[105px]"
                >
                  {/* Orange Urgency Header */}
                  <div className="bg-gradient-to-br from-[#ea580c] via-[#f97316] to-[#c2410c] text-white px-5 py-4 sm:px-7 sm:py-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/20 text-orange-100 text-[11px] font-semibold backdrop-blur-sm border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                        <span>Limited seats</span>
                        <span className="text-white/40">•</span>
                        <span>
                          {activeCategory === 'kids'
                            ? 'Next Kids AI Workshop'
                            : 'Next Marketing Workshop'}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white mb-2 leading-tight">
                      Free early-bird offer & pass ends in
                    </h3>

                    {/* Dedicated Workshop Countdown Timer */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="bg-white text-slate-900 rounded-lg px-2.5 py-1 shadow-xs flex flex-col items-center justify-center min-w-[42px] sm:min-w-[48px]">
                        <span className="text-lg sm:text-xl font-black leading-none tracking-tight">{enquiryMin}</span>
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">MIN</span>
                      </div>

                      <span className="text-white/80 font-black text-base pb-0.5">:</span>

                      <div className="bg-white text-slate-900 rounded-lg px-2.5 py-1 shadow-xs flex flex-col items-center justify-center min-w-[42px] sm:min-w-[48px]">
                        <span className="text-lg sm:text-xl font-black leading-none tracking-tight">{enquirySec}</span>
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">SEC</span>
                      </div>

                      <p className="text-white text-xs sm:text-[13px] font-semibold leading-tight ml-1 sm:ml-2">
                        Book now & get free prompt toolkits worth ₹2,999
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-black/25 rounded-full overflow-hidden mt-3">
                      <div
                        className="h-full bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full transition-all duration-700"
                        style={{ width: '88%' }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] sm:text-xs text-orange-100/90 font-medium mt-1">
                      <span>Seats fill fast. Reserve today.</span>
                      <span className="text-amber-200 font-bold">88% Claimed</span>
                    </div>
                  </div>

                  {/* Form Body */}
                  <div className="p-5 sm:p-7 bg-[#FAF8F5]">
                    {isSubmitted ? (
                      <div className="py-6 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 mb-3 shadow-md">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">Workshop Seat Requested!</h4>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mb-5 leading-relaxed">
                          Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our workshop coordinator
                          will contact you via WhatsApp & phone to confirm batch timings and send the preparation kit.
                        </p>
                        <button
                          type="button"
                          onClick={handleWhatsAppDirect}
                          className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Connect Instantly on WhatsApp</span>
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} noValidate>
                        <div className="mb-3">
                          <h4 className="text-sm sm:text-base font-bold text-slate-900">
                            Reserve Your Workshop Seat
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Fill this quick form to lock in early-bird pricing and get the complete syllabus brochure.
                          </p>
                        </div>

                        {/* Name & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                              {activeCategory === 'kids' ? 'Parent / Student Name' : 'Your Name'}{' '}
                              <span className="text-orange-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder={activeCategory === 'kids' ? 'e.g. Sangeetha (Parent)' : 'e.g. Sangeetha'}
                              value={formData.name}
                              onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (errors.name) setErrors({ ...errors, name: '' });
                              }}
                              className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 outline-none transition shadow-2xs ${
                                errors.name
                                  ? 'border border-red-400 ring-1 ring-red-400'
                                  : 'border border-slate-300 hover:border-slate-400 focus:border-orange-500'
                              }`}
                            />
                            {errors.name && (
                              <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.name}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                              Phone Number <span className="text-orange-500">*</span>
                            </label>
                            <input
                              type="tel"
                              placeholder="e.g. 9876543210"
                              value={formData.phone}
                              onChange={(e) => {
                                setFormData({ ...formData, phone: e.target.value });
                                if (errors.phone) setErrors({ ...errors, phone: '' });
                              }}
                              className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 outline-none transition shadow-2xs ${
                                errors.phone
                                  ? 'border border-red-400 ring-1 ring-red-400'
                                  : 'border border-slate-300 hover:border-slate-400 focus:border-orange-500'
                              }`}
                            />
                            {errors.phone && (
                              <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Email & Workshop selection */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                              Email Address <span className="text-orange-500">*</span>
                            </label>
                            <input
                              type="email"
                              placeholder="name@example.com"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                if (errors.email) setErrors({ ...errors, email: '' });
                              }}
                              className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 outline-none transition shadow-2xs ${
                                errors.email
                                  ? 'border border-red-400 ring-1 ring-red-400'
                                  : 'border border-slate-300 hover:border-slate-400 focus:border-orange-500'
                              }`}
                            />
                            {errors.email && (
                              <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                              Select Workshop Track
                            </label>
                            <div className="relative">
                              <select
                                value={formData.workshop}
                                onChange={(e) => setFormData({ ...formData, workshop: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 bg-white border border-slate-300 hover:border-slate-400 focus:border-orange-500 outline-none transition shadow-2xs appearance-none pr-8"
                              >
                                {currentTracks.map((t) => (
                                  <option key={t.id} value={t.title}>
                                    {t.title}
                                  </option>
                                ))}
                                <option value="All Tracks / General Enquiry">All Tracks / General Enquiry</option>
                              </select>
                              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* Profile & Notes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">I am a</label>
                            <div className="relative">
                              <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 bg-white border border-slate-300 hover:border-slate-400 focus:border-orange-500 outline-none transition shadow-2xs appearance-none pr-8"
                              >
                                {activeCategory === 'kids' ? (
                                  <>
                                    <option value="Parent (for Kids Workshop)">Parent (for Kids Workshop)</option>
                                    <option value="School Student (Grades 6–12)">School Student (Grades 6–12)</option>
                                    <option value="School Teacher / Educator">School Teacher / Educator</option>
                                    <option value="Other">Other</option>
                                  </>
                                ) : (
                                  <>
                                    <option value="Working professional">Working professional</option>
                                    <option value="College student">College student</option>
                                    <option value="Fresh graduate">Fresh graduate / Job seeker</option>
                                    <option value="Business owner / Entrepreneur">Business owner / Entrepreneur</option>
                                    <option value="Freelancer / Creator">Freelancer / Creator</option>
                                    <option value="Other">Other</option>
                                  </>
                                )}
                              </select>
                              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                              Questions or Goals (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="Batch dates, tool requirements, fees..."
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400 border border-slate-300 hover:border-slate-400 focus:border-orange-500 outline-none transition shadow-2xs"
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#c2410c] hover:brightness-105 active:scale-[0.99] transition shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer group"
                        >
                          <span>Reserve Workshop Seat</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <p className="text-center text-[10px] text-slate-500 mt-2 font-normal">
                          Your details will be shared securely with our workshop coordinators.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==============================================================
            FAQ SECTION
            ============================================================== */}
        <section className="py-16 bg-white border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-1 block">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-[#FAF8F5]/50 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-orange-600 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180 text-orange-600' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Common Footer */}
      <Footer />

      {/* Fixed Sticky Offer Bar for Workshop Category */}
      <StickyOfferBar onReserveSeat={handleReserveSeat} category="workshop" />

      {/* Auto-popup Modal for Workshop on initial mount */}
      <CourseEnquiryPopup
        isOpen={isEnquiryPopupOpen}
        onClose={() => setIsEnquiryPopupOpen(false)}
        courseName={
          activeCategory === 'kids'
            ? '3 Kids AI and Tech Program Workshop'
            : 'Digital Marketing Practical Workshop'
        }
        category="workshop"
        defaultRole={activeCategory === 'kids' ? 'Parent (for Kids Workshop)' : 'Working professional'}
        roleOptions={
          activeCategory === 'kids'
            ? [
                'AI Super Kids & Digital Storytelling Lab',
                'Robotics, Scratch Coding & Game Design',
                'Young Innovators & Tech Entrepreneurship',
                'Creative Media, Animation & YouTube Lab',
                'Parent (for Kids Workshop)',
                'School Student (Grades 6–12)',
                'Other',
              ]
            : [
                'Generative AI & Marketing Automation Bootcamp',
                'Performance Marketing & Paid Ads Accelerator',
                'Viral Short-Form Video & Content Engine',
                'SEO & Growth Hacking Masterclass',
                'Working professional',
                'College student',
                'Business owner / Entrepreneur',
                'Freelancer / Creator',
              ]
        }
      />
    </div>
  );
};

export default WorkshopPage;
