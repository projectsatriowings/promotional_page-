import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Sparkles,
  Heart,
  Shield,
  Lightbulb,
  Puzzle,
  Users,
  ChevronDown,
  HelpCircle,
  MapPin,
  Send,
  MessageCircle,
  Star,
  Bot,
  Palette,
  Code2,
  Cpu,
  Rocket,
  Compass,
  FileSpreadsheet,
  GraduationCap,
  Briefcase,
  Layers,
  Terminal,
  TrendingUp,
  Brain,
  BarChart3,
  X
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';
import { Footer } from '../shared/Footer';
import { Lightbox } from '../shared/Lightbox';
import { ChatFAQ, FaqItem } from '../shared/ChatFAQ';
import { CourseEnquiryPopup } from '../shared/CourseEnquiryPopup';
import { StickyOfferBar } from '../shared/StickyOfferBar';

export const KidsCoursePage: React.FC = () => {
  // 2s Auto-popup for Syllabus & Free Counselling Offer
  const [isEnquiryPopupOpen, setIsEnquiryPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEnquiryPopupOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Section 11: In-Page Contact Card Countdown & Dismiss state
  const [enquiryCountdown, setEnquiryCountdown] = useState(14 * 60 + 28);
  const [isCardDismissed, setIsCardDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setEnquiryCountdown((prev) => (prev > 0 ? prev - 1 : 14 * 60 + 28));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const enquiryMin = String(Math.floor(enquiryCountdown / 60)).padStart(2, '0');
  const enquirySec = String(enquiryCountdown % 60).padStart(2, '0');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [activeCaption, setActiveCaption] = useState('');



  // Static Parent Enquiry Form state
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    childName: '',
    childGrade: 'Grades 6–8 • AI Innovators',
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
    if (!formData.parentName || !formData.phone) return;

    // Static form: Open WhatsApp enquiry directly with prefilled text
    const text = encodeURIComponent(
      `Hello Digital Ghuru! I am enquiring for the AI Super Kids Programme.\nParent Name: ${formData.parentName}\nPhone: ${formData.phone}\nStudent Name: ${formData.childName || 'N/A'}\nGrade Pathway: ${formData.childGrade}\nMessage: ${formData.message || 'Please send batch details, curriculum brochure and timings.'}`
    );
    window.open(`https://wa.me/918825948859?text=${text}`, '_blank');
    setFormSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Section 3: EXACTLY THREE GRADE COURSES (Direct from Official Brochures)
  const threeCourses = [
    {
      id: 'g6_8' as const,
      gradeBadge: 'Grades 6 – 8',
      title: 'AI Innovators',
      subtitle: 'Solve Problems with AI',
      color: 'from-amber-400 to-orange-500',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-200',
      buttonColor: 'bg-gradient-to-r from-amber-500 to-orange-600',
      banner: '/brand/card-g7-8.png',
      officialBanner: '/brand/banner-g7-8.png',
      desc: 'A structured program for data literacy, responsible research, and practical AI solution design.',
      path: ['Research', 'Analyse', 'Design', 'Prototype', 'Present'],
      highlights: [
        'Understand machine learning from patterns',
        'Data literacy, quality and bias awareness',
        'Advanced prompting & AI-assisted research',
        'Automation workflows & design thinking',
        'Build real-world prototypes & solutions'
      ],
      sampleProjects: ['AI Study Assistant', 'AI Career Explorer', 'AI for Environment', 'AI for School'],
      learningOutcome: 'Problem Solving + Innovation + Responsible AI'
    },
    {
      id: 'g9_10' as const,
      gradeBadge: 'Grades 9 – 10',
      title: 'AI Entrepreneurs',
      subtitle: 'Build with AI',
      color: 'from-sky-400 to-blue-500',
      tagColor: 'bg-sky-100 text-sky-900 border-sky-200',
      buttonColor: 'bg-gradient-to-r from-sky-500 to-blue-600',
      banner: '/brand/card-g9-10.png',
      officialBanner: '/brand/banner-g9-10.png',
      desc: 'Turn real-world problems into responsible AI products, services, and startup concepts.',
      path: ['Identify', 'Users', 'Solution', 'Prototype', 'Test', 'Pitch'],
      highlights: [
        'Machine learning & Large Language Models',
        'Natural Language Processing & Computer Vision',
        'Advanced prompt engineering with constraints',
        'User research & market opportunity sizing',
        'Final Project: Build & pitch an AI Startup'
      ],
      sampleProjects: ['EdTech AI Helper', 'Healthcare Awareness Bot', 'Local Business Automator', 'Accessibility Tool'],
      learningOutcome: 'Entrepreneurial Thinking + AI Capability'
    },
    {
      id: 'g11_12' as const,
      gradeBadge: 'Grades 11 – 12',
      title: 'AI Future Leaders',
      subtitle: 'Build Your AI Future',
      color: 'from-indigo-400 to-purple-600',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-200',
      buttonColor: 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600',
      banner: '/brand/card-g11-12.png',
      officialBanner: '/brand/banner-g11-12.png',
      desc: 'Advanced learning for higher education, AI careers, entrepreneurship, and responsible technology leadership.',
      path: ['Learn', 'Develop', 'Build', 'Lead'],
      highlights: [
        'Python programming & data manipulation',
        'Data visualization & machine learning models',
        'Connecting APIs & intelligent workflow automation',
        'Introduction to AI Agents & multi-step planning',
        'Resume, LinkedIn, portfolio & Capstone project'
      ],
      sampleProjects: ['Machine Learning Predictor', 'AI Agent Workflow', 'Career Portfolio & LinkedIn', 'Comprehensive Capstone'],
      learningOutcome: 'Technical Capability + Career Readiness + Responsible Leadership'
    }
  ];

  // Section 6: Benefits for School Students with Professional Lucide Icons
  const benefits = [
    {
      title: 'Critical Thinking & Verification',
      desc: 'Students learn to evaluate AI responses critically, spot biases, and check ground-truth sources.',
      icon: <Brain className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-100'
    },
    {
      title: 'Data & Algorithmic Literacy',
      desc: 'Demystifies how algorithms process inputs, analyze patterns, and generate outputs.',
      icon: <BarChart3 className="w-5 h-5 text-sky-600" />,
      bg: 'bg-sky-50 border-sky-100'
    },
    {
      title: 'Real-World Problem Solving',
      desc: 'Directs technical curiosity towards solving tangible issues in education, healthcare, and community.',
      icon: <Puzzle className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-100'
    },
    {
      title: 'Entrepreneurial Confidence',
      desc: 'Students transition from consumers to creators who understand product design and business models.',
      icon: <Rocket className="w-5 h-5 text-orange-600" />,
      bg: 'bg-orange-50 border-orange-100'
    },
    {
      title: 'Coding & API Foundations',
      desc: 'Practical experience with Python, data visualization, and cloud service integration.',
      icon: <Terminal className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100'
    },
    {
      title: 'Responsible AI Leadership',
      desc: 'Instills deep awareness of privacy, ethics, safety, intellectual property, and copyright.',
      icon: <Shield className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50 border-rose-100'
    },
    {
      title: 'Public Presentation & Pitching',
      desc: 'Regular pitch sessions build persuasive communication and public speaking skills.',
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      bg: 'bg-purple-50 border-purple-100'
    },
    {
      title: 'College & Career Readiness',
      desc: 'Graduates leave with tangible project portfolios, LinkedIn profiles, and verified capstone demos.',
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50 border-blue-100'
    }
  ];

  // Section 12: 10 FAQs for Parents
  const parentFaqs: FaqItem[] = [
    {
      question: 'What is the AI Super Kids programme?',
      answer:
        'The Digital Ghuru AI Super Kids programme is a structured technology curriculum offered in partnership with schools and weekend learning studios across three grade pathways: Grades 6–8 (AI Innovators), Grades 9–10 (AI Entrepreneurs), and Grades 11–12 (AI Future Leaders).',
      followUps: ['Which grades are eligible to enroll?', 'Where are the classes conducted?'],
    },
    {
      question: 'Which grades are eligible to enroll?',
      answer:
        'The programme is tailored for students from Grade 6 to Grade 12. Each grade cohort follows a dedicated curriculum matched to their academic maturity and cognitive development.',
      followUps: ['Grades 6–8 curriculum?', 'Grades 9–10 track?'],
    },
    {
      question: 'How does the Grades 6–8 (AI Innovators) curriculum work?',
      answer:
        'Grades 6–8 students focus on data literacy, understanding how machine learning recognizes patterns, spotting bias and fairness issues, advanced prompt craft, and designing prototypes for school and community problems.',
      followUps: ['What makes Grades 9–10 unique?', 'What will students have to show?'],
    },
    {
      question: 'What makes Grades 9–10 (AI Entrepreneurs) unique?',
      answer:
        'High school students explore Generative AI, Computer Vision, and NLP while learning the entire startup product lifecycle: identifying user pain points, testing solutions, building an interactive prototype, and pitching their AI startup.',
      followUps: ['What does the Grades 11–12 track cover?', 'What will students have to show?'],
    },
    {
      question: 'What does the Grades 11–12 (AI Future Leaders) track cover?',
      answer:
        'Senior students develop serious technical foundations in Python programming, data handling, machine learning algorithms, and APIs, while preparing college portfolios, LinkedIn profiles, and completing a comprehensive AI Capstone project.',
      followUps: ['Are any prior coding prerequisites required?', 'What are the class timings and days?'],
    },
    {
      question: 'Are any prior coding or computer science prerequisites required?',
      answer:
        'No prior coding experience is required! Our mentors begin with intuitive visual frameworks and step-by-step guidance before advancing into structured code and logic.',
      followUps: ['What will my child build?', 'Class timings?'],
    },
    {
      question: 'What are the class timings and days?',
      answer:
        'Sessions are held on weekends (Saturdays or Sundays, 2 hours per session) to seamlessly complement regular school academics without adding homework stress.',
      followUps: ['Where are classes held?', 'How do we enroll?'],
    },
    {
      question: 'Where are the classes conducted?',
      answer:
        'Classes are conducted offline at our Chennai Learning Studio (in partnership with Jaighurudeva Academy) with dedicated computer workstations, as well as live interactive hybrid batches.',
      followUps: ['What are the class timings and days?', 'How can parents enroll or speak with an academic mentor?'],
    },
    {
      question: 'What will students have to show after completing the course?',
      answer:
        'Students graduate with tangible, working project deliverables: Grades 6–8 complete functional study tools; Grades 9–10 produce a tested AI Startup concept with pitch deck; and Grades 11–12 graduate with a Python-powered Capstone project and career portfolio.',
      followUps: ['How can parents enroll or speak with an academic mentor?', 'Talk to an Academic Mentor →'],
    },
    {
      question: 'How can parents enroll or speak with an academic mentor?',
      answer:
        'You can submit the enquiry form on this page or message us directly on WhatsApp (+91 8825948859). Our academic coordinator will provide the complete syllabus brochure and schedule an orientation.',
      followUps: ['Talk to an Academic Mentor →'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Reusable Premium Navbar */}
      <Navbar activePage="kids" onOpenEnquiry={() => scrollToSection('enquiry-kids')} />

      <main className="pt-28">
        {/* ===================================================================
            SECTION 1: HERO SECTION
            =================================================================== */}
        <section id="hero-kids" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-orange-50/70 via-[#FAF8F5] to-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100/90 border border-amber-200 text-amber-900 shadow-2xs">
                  <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span>AI Super Kids • 3 Structured Pathways for Grades 6 to 12</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Empowering Young Minds with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-start via-brand-mid to-brand-end">
                    Real AI Capability!
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  A structured school partnership and weekend program that turns passive screen time into practical innovation, data literacy, and responsible technology leadership.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToSection('who-can-join-kids')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-brand-start via-brand-mid to-brand-end hover:brightness-105 shadow-xl shadow-orange-500/25 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer btn-theme-cta"
                  >
                    <span>Explore 3 Grade Pathways</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('enquiry-kids')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm text-slate-700 bg-white hover:bg-stone-50 border-2 border-stone-200 shadow-sm hover:shadow transition-all duration-200 cursor-pointer btn-theme-secondary"
                  >
                    <span>Enquire for Your Child</span>
                  </button>
                </div>

                {/* Verified Highlights */}
                <div className="pt-6 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Grades 6–8 Innovators</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Grades 9–10 Startups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Grades 11–12 Python & ML</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Hands-on Capstones</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Banner */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/25 to-orange-500/25 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />
                  <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl border-2 border-orange-100">
                    <img
                      src="/brand/banner-g7-8.png"
                      alt="AI Super Kids Grade 6 to 8 Program"
                      className="w-full h-auto object-cover cursor-pointer hover:scale-102 transition-transform duration-300"
                      onClick={() => handleOpenLightbox('/brand/banner-g7-8.png', 'AI Super Kids: AI Innovators (Grades 6–8)')}
                    />
                    <div className="p-4 bg-gradient-to-r from-brand-start via-brand-mid to-brand-end text-white flex items-center justify-between text-xs font-medium">
                      <span>Admissions Open • Weekend Batches</span>
                      <span className="px-2 py-0.5 rounded bg-white/20 font-bold">Grades 6–12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: ABOUT THE AI SUPER KIDS PROGRAMME
            =================================================================== */}
        <section id="about-kids" className="py-20 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Image side */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-stone-200 group">
                  <img
                    src="/brand/banner-g9-10.png"
                    alt="AI Super Kids High School Innovators"
                    className="w-full h-auto object-cover cursor-pointer group-hover:scale-102 transition-transform duration-300"
                    onClick={() => handleOpenLightbox('/brand/banner-g9-10.png', 'AI Entrepreneurs: Building with AI in Grades 9–10')}
                  />
                  <div className="p-4 bg-orange-50 text-orange-950 text-xs font-medium border-t border-orange-100">
                    ✦ Study the data • Question the output • Build the solution.
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-900">
                  <span>ABOUT THE PROGRAMME</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  From Technology Consumers to Responsible AI Builders
                </h2>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    <strong className="text-slate-900">What is the AI Super Kids programme?</strong> It is a comprehensive school partnership and weekend learning initiative designed to equip students from Grade 6 to Grade 12 with practical knowledge of artificial intelligence, data literacy, and ethical technology creation.
                  </p>
                  <p>
                    <strong className="text-slate-900">Why was it created?</strong> Generative AI and automation are reshaping higher education and future careers. Our mission is to ensure school students develop critical thinking, bias awareness, and hands-on technical proficiency rather than relying uncritically on AI tools.
                  </p>
                  <p>
                    <strong className="text-slate-900">How do students learn?</strong> Through an active problem-based methodology: <em>Research &rarr; Analyse &rarr; Design &rarr; Prototype &rarr; Present</em>. Students build real applications, test prototypes, and explain their solutions with confidence.
                  </p>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                    <h3 className="text-sm font-bold text-amber-900 mb-1">Small Batch Mentorship</h3>
                    <p className="text-xs text-amber-800">Capped cohort sizes ensure personalized attention and active project reviews.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200">
                    <h3 className="text-sm font-bold text-orange-900 mb-1">Responsible Innovation</h3>
                    <p className="text-xs text-orange-800">Comprehensive coverage of data quality, privacy, copyright, and ethical AI safeguards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: THREE GRADE COURSES (EXACTLY THREE CARDS ONLY)
            =================================================================== */}
        <section id="who-can-join-kids" className="py-20 bg-[#FAF8F5] border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900">
                <span>THREE STRUCTURED GRADE COURSES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Three Tailored Courses for Grades 6 to 12
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Explore the official AI Super Kids programs designed for middle school, high school, and senior secondary students.
              </p>
            </div>

            {/* EXACTLY THREE CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {threeCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-6 rounded-3xl border-2 border-stone-200/90 bg-white shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  <div>
                    {/* Course Card Image */}
                    <div
                      className="rounded-2xl overflow-hidden mb-5 border border-stone-200 shadow-xs bg-slate-900 cursor-pointer"
                      onClick={() => handleOpenLightbox(course.officialBanner, `${course.title} • ${course.gradeBadge}`)}
                    >
                      <img
                        src={course.banner}
                        alt={`${course.title} - ${course.gradeBadge}`}
                        className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/brand/card-g7-8.png';
                        }}
                      />
                    </div>

                    {/* Grade Badge & Course Title */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${course.tagColor}`}>
                        {course.gradeBadge}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        School Program
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900">
                      {course.title}
                    </h3>
                    <p className="text-xs font-extrabold text-orange-600 mb-3">
                      ✦ {course.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-5">
                      {course.desc}
                    </p>

                    {/* Pathway Progression Pills */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                        Structured Methodology:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.path.map((step, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-slate-700 border border-slate-200"
                          >
                            <span className="text-[9px] text-orange-600">{idx + 1}.</span>
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Curriculum Highlights */}
                    <div className="space-y-1.5 mb-5 text-xs text-slate-700">
                      {course.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-tight">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Action & Outcome */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="p-2.5 rounded-xl bg-orange-50/60 border border-orange-100 text-[11px] text-orange-950 font-semibold">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 block">Learning Outcome:</span>
                      {course.learningOutcome}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          childGrade: `${course.gradeBadge} • ${course.title}`
                        }));
                        scrollToSection('enquiry-kids');
                      }}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-orange-50 hover:bg-orange-100 hover:text-orange-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-orange-200/80"
                    >
                      <span>Enquire for {course.gradeBadge}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: INTERACTIVE AND PRACTICAL LEARNING ACTIVITIES
            =================================================================== */}
        <section id="activities" className="py-20 bg-[#FAF8F5] border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-900">
                <span>HANDS-ON ACTIVITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Interactive Learning Activities
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Students learn best when they are actively researching, designing prototypes, analyzing data, and pitching solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 mb-5 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-xs">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Data Quality & Research Lab</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students inspect datasets, analyze missing or biased values, and formulate clear investigative prompts.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-xs">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Automation & Tools Studio</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Connect modern digital tools, create automated rules, and explore how multi-step workflows save time.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-xs">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Startup Prototype Sprint</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High school students interview users, map problem statements, and build interactive digital mockups.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-5 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shadow-xs">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Showcase & Pitch Day</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students present completed Capstone projects to mentors and parents, explaining technical logic and business value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 6: BENEFITS FOR CHILDREN
            =================================================================== */}
        <section id="benefits" className="py-20 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-900">
                <span>STUDENT DEVELOPMENT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Intended Benefits for School Students
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                How our structured AI curriculum develops critical analytical thinking, product mindset, and academic readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/90 hover:border-orange-300 hover:bg-white hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 shadow-2xs group flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-11 h-11 rounded-2xl ${b.bg} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                      {b.icon}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">{b.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 7: WHY CHOOSE DIGITAL GHURU FOR YOUR CHILD?
            =================================================================== */}
        <section id="why-choose-kids" className="py-20 bg-[#FAF8F5] border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900">
                <span>PARENT PEACE OF MIND</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Why Parents Trust Digital Ghuru
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Verified attributes ensuring a secure, supportive, and academically enriching learning space.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                <Shield className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">Child-Safe Environment</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Safe browsing protocols, secure software sandboxes, and monitored computer labs prevent access to harmful content.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                <Users className="w-8 h-8 text-amber-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">1:8 Mentor Ratio</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We maintain strict caps of 8 students per batch so no student gets left behind or feels overlooked.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                <Heart className="w-8 h-8 text-rose-500 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">Regular Parent Updates</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Parents receive bi-weekly progress summaries highlighting newly completed projects, coding labs, and presentation milestones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 8: PROGRAMME DETAILS
            =================================================================== */}
        <section id="programme-details" className="py-20 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-900">
                <span>PROGRAMME SCHEDULE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Programme Information & Schedules
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Key logistical information for parents planning their child's extracurricular and skill development schedule.
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-3xl border border-stone-200 p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Programme Name</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">AI Super Kids Program</p>
                  <p className="text-xs text-slate-500 mt-0.5">3 Structured Grade Pathways</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Eligible Grades</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">Grades 6 to 12</p>
                  <p className="text-xs text-slate-500 mt-0.5">Grades 6–8, 9–10, 11–12</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Weekly Schedule</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">Weekend Batches</p>
                  <p className="text-xs text-slate-500 mt-0.5">Sat or Sun: 2 hours/session</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Learning Modes</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">Offline & Live Hybrid</p>
                  <p className="text-xs text-slate-500 mt-0.5">Chennai Studio & School Labs</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Programme Fee</span>
                  <p className="text-sm font-bold text-orange-600 mt-1">Enquire for Term Fees</p>
                  <p className="text-xs text-slate-500 mt-0.5">Includes all project materials</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Centre Location</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">Chennai Campus</p>
                  <p className="text-xs text-slate-500 mt-0.5">Partner Jaighurudeva Academy</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Parent Support</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">+91 8825948859</p>
                  <p className="text-xs text-slate-500 mt-0.5">Direct coordinator assistance</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Orientation Call</span>
                  <p className="text-sm font-bold text-emerald-600 mt-1">Free Consultation</p>
                  <p className="text-xs text-slate-500 mt-0.5">Speak with a lead mentor</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 10: PARENT TESTIMONIALS
            =================================================================== */}
        <section id="testimonials-kids" className="py-20 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900">
                <span>PARENT VOICES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Parent Feedback & Experiences
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Real reflections from parents whose children participated in our weekend and school partnership workshops.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200">
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  "My 7th-grade daughter was spending time randomly scrolling. After joining the AI Innovators weekend cohort, she created a working study assistant bot for her science exams. The shift towards active curiosity is inspiring."
                </p>
                <div className="border-t border-stone-200 pt-3">
                  <span className="text-xs font-bold text-slate-900 block">Kavitha R.</span>
                  <span className="text-[11px] text-slate-500">Parent of Grade 7 Student, Chennai</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200">
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  "The AI Entrepreneurs program taught my 10th-grade son not just prompts, but how to think like a product builder. He designed a working healthcare awareness concept and pitched it with genuine confidence."
                </p>
                <div className="border-t border-stone-200 pt-3">
                  <span className="text-xs font-bold text-slate-900 block">Venkatesh S.</span>
                  <span className="text-[11px] text-slate-500">Parent of Grade 10 Student, Chennai</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200">
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  "For 11th and 12th students aiming for engineering and tech careers, learning Python, data APIs, and Capstone project development puts them miles ahead in college admissions."
                </p>
                <div className="border-t border-stone-200 pt-3">
                  <span className="text-xs font-bold text-slate-900 block">Dr. Meenakshi N.</span>
                  <span className="text-[11px] text-slate-500">Parent of Grade 11 Student, Chennai</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 11: PARENT ENQUIRY SECTION
            =================================================================== */}
        <section id="enquiry-kids" className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-900">
                  <span>ADMISSIONS & CONSULTATION</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Equip Your Student with Future-Proof Skills Today!
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Have questions about grade eligibility, weekend batch timings, or the curriculum syllabus? Contact our admissions desk for immediate assistance.
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href="tel:+918825948859"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 shadow-xs hover:shadow transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Call Admissions Office</span>
                      <span className="text-sm font-bold text-slate-900">+91 8825948859</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/918825948859?text=Hello%20Digital%20Ghuru,%20I%20am%20enquiring%20about%20the%20AI%20Super%20Kids%20programme.%20Please%20share%20the%20grade%20batch%20timings."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 shadow-xs hover:shadow transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Chat on WhatsApp</span>
                      <span className="text-sm font-bold text-emerald-700">Immediate reply (+91 8825948859)</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Chennai Campus Visits</span>
                      <span className="text-xs font-semibold text-slate-800">Jaighurudeva Academy Campus, Chennai</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Contact Card matching reference popup */}
              <div className="lg:col-span-6">
                {isCardDismissed ? (
                  <div className="rounded-[24px] bg-[#FAF8F5] border border-orange-200/60 p-8 sm:p-10 shadow-xl text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
                    <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shadow-inner">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">Enquiry Form Dismissed</h4>
                      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Looking for grade batch timings, weekend schedules, or tuition fees?
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCardDismissed(false)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 shadow-md shadow-slate-900/15 transition-all cursor-pointer"
                    >
                      <span>Reopen Enquiry Form</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="relative rounded-[24px] overflow-hidden shadow-2xl border border-orange-200/50 bg-[#FAF8F5] transition-all">
                    {/* Vibrant Orange Gradient Header Section (Compact Height) */}
                    <div className="relative bg-gradient-to-br from-[#ea580c] via-[#f97316] to-[#c2410c] text-white px-5 py-3 sm:px-6 sm:py-3.5 pb-2.5 sm:pb-3">
                      {/* Top Row: Pill Badge + Close Button */}
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/20 text-orange-100 text-[11px] font-semibold backdrop-blur-sm border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                          <span>Limited seats</span>
                          <span className="text-white/40">•</span>
                          <span>Next batch</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsCardDismissed(true)}
                          aria-label="Close enquiry card"
                          className="w-6 h-6 rounded-lg bg-black/20 hover:bg-black/35 text-white/90 hover:text-white flex items-center justify-center transition border border-white/15 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Prominent Offer Heading */}
                      <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white mb-1.5 leading-tight">
                        Free counselling offer ends in
                      </h3>

                      {/* Countdown Timer & Teaser */}
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        {/* Minutes Box */}
                        <div className="bg-white text-slate-900 rounded-lg px-2 py-0.5 shadow-xs flex flex-col items-center justify-center min-w-[42px] sm:min-w-[46px]">
                          <span className="text-lg sm:text-xl font-black leading-none tracking-tight">{enquiryMin}</span>
                          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">MIN</span>
                        </div>

                        <span className="text-white/80 font-black text-lg pb-0.5">:</span>

                        {/* Seconds Box */}
                        <div className="bg-white text-slate-900 rounded-lg px-2 py-0.5 shadow-xs flex flex-col items-center justify-center min-w-[42px] sm:min-w-[46px]">
                          <span className="text-lg sm:text-xl font-black leading-none tracking-tight">{enquirySec}</span>
                          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">SEC</span>
                        </div>

                        {/* Teaser copy */}
                        <p className="text-white text-xs sm:text-[13px] font-semibold leading-tight ml-1.5">
                          Book now and get the full syllabus free
                        </p>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-1 bg-black/25 rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full transition-all duration-700"
                          style={{ width: '84%' }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-orange-100/90 font-medium mt-1">
                        <span>Seats fill fast. Book soon.</span>
                        <span className="text-amber-200 font-bold">84% Claimed</span>
                      </div>
                    </div>

                    {/* Form Body on Clean Off-White Background (#FAF8F5 - Compact) */}
                    <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-[#FAF8F5]">
                      <div className="mb-2.5">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                          Enquire for Your Child
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Leave your contact details and our team will connect with you regarding the next weekend orientation.
                        </p>
                      </div>

                      {formSubmitted ? (
                        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2.5 animate-fade-in">
                          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                          <h4 className="text-sm font-bold text-emerald-900">Enquiry Initiated!</h4>
                          <p className="text-xs text-emerald-700 leading-relaxed">
                            WhatsApp was launched with your student's grade pathway and details. Our coordinator will reply promptly!
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
                        <form onSubmit={handleFormSubmit} className="space-y-2">
                          {/* Parent's Name */}
                          <div>
                            <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                              Parent's Name <span className="text-orange-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.parentName}
                              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                              placeholder="e.g. Ramesh Kumar"
                              className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300/80 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 focus:outline-none transition shadow-xs"
                            />
                          </div>

                          {/* Phone Number & Student's Name (2 columns) */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                                Phone Number <span className="text-orange-500">*</span>
                              </label>
                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="e.g. 9876543210"
                                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300/80 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 focus:outline-none transition shadow-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                                Student's Name
                              </label>
                              <input
                                type="text"
                                value={formData.childName}
                                onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                                placeholder="e.g. Ananya"
                                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300/80 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 focus:outline-none transition shadow-xs"
                              />
                            </div>
                          </div>

                          {/* Student's Grade Course */}
                          <div>
                            <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                              Student's Grade Course
                            </label>
                            <div className="relative">
                              <select
                                value={formData.childGrade}
                                onChange={(e) => setFormData({ ...formData, childGrade: e.target.value })}
                                className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300/80 bg-white text-xs sm:text-sm text-slate-900 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 focus:outline-none transition shadow-xs appearance-none cursor-pointer pr-10 font-medium"
                              >
                                <option>Grades 6–8 • AI Innovators (Solve Problems with AI)</option>
                                <option>Grades 9–10 • AI Entrepreneurs (Build with AI)</option>
                                <option>Grades 11–12 • AI Future Leaders (Build Your AI Future)</option>
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          {/* Questions for Our Mentors (Optional) */}
                          <div>
                            <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                              Questions for Our Mentors (Optional)
                            </label>
                            <textarea
                              rows={1}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Tell us about your student's school or ask about batch timings..."
                              className="w-full px-3 py-1.5 rounded-xl border border-slate-300/80 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 focus:outline-none transition shadow-xs resize-none"
                            />
                          </div>

                          {/* Submit Button (Vibrant Header Gradient Color) */}
                          <button
                            type="submit"
                            className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs uppercase sm:text-sm tracking-wider text-white bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#c2410c] hover:brightness-105 active:scale-[0.99] transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer group"
                          >
                            <span>Submit & Chat on WhatsApp</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>

                          <p className="text-[10px] text-slate-500 text-center leading-tight mt-1.5">
                            *Safe and private. Connects directly with our admissions coordinator on WhatsApp.
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 12: PARENT FAQS (CHAT-STYLE)
            =================================================================== */}
        <ChatFAQ
          id="faq-kids"
          badge="PARENT QUESTIONS"
          heading="Ask Us Anything"
          highlight="Anything"
          subtitle="Tap a question to get instant answers about grade pathways, safety, schedules and learning outcomes."
          botName="Digital Ghuru Academic Mentor"
          botStatus="Online · replies instantly"
          welcome="Hi! I'm here to help parents. Pick any question on the left and I'll answer it right here."
          inputHint="Choose a question from the list…"
          ctaText="Still have questions? Talk to an academic mentor →"
          theme="kids"
          faqs={parentFaqs}
          onCtaClick={() => scrollToSection('enquiry-kids')}
        />

      </main>

      {/* Common Footer */}
      <Footer />

      {/* Fixed Sticky Counselling Offer Bar */}
      <StickyOfferBar onOpenEnquiry={() => setIsEnquiryPopupOpen(true)} />

      {/* Image Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={activeImage}
        caption={activeCaption}
      />

      {/* Auto-popup 2s on Mount */}
      <CourseEnquiryPopup
        isOpen={isEnquiryPopupOpen}
        onClose={() => setIsEnquiryPopupOpen(false)}
        courseName="AI & Tech for Kids"
        defaultRole="Parent"
        roleOptions={[
          'Parent (Grades 1–6 / Little Explorers)',
          'Parent (Grades 7–8 / Young Innovators)',
          'Parent (Grades 9–10 / Junior Tech Leaders)',
          'Parent (Grades 11–12 / Future AI Creators)',
          'School student',
          'Other',
        ]}
      />
    </div>
  );
};

export default KidsCoursePage;
