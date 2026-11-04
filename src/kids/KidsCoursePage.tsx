import React, { useState } from 'react';
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
  Check,
  Target,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Award,
  Clock,
  ChevronUp
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';
import { Footer } from '../shared/Footer';
import { Lightbox } from '../shared/Lightbox';

export const KidsCoursePage: React.FC = () => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [activeCaption, setActiveCaption] = useState('');

  // Curriculum active tab (3 courses)
  const [selectedCourseTab, setSelectedCourseTab] = useState<'g6_8' | 'g9_10' | 'g11_12'>('g6_8');
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const handleSelectCourse = (courseId: 'g6_8' | 'g9_10' | 'g11_12') => {
    setSelectedCourseTab(courseId);
    setExpandedModule(0);
    setTimeout(() => {
      const el = document.getElementById('selected-course-details');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleEnquireCourse = (courseTitle: string, gradeBadge: string) => {
    setFormData(prev => ({
      ...prev,
      childGrade: gradeBadge + ' • ' + courseTitle
    }));
    scrollToSection('enquiry-kids');
  };

  // FAQ Accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

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

  // Section 4: Modules breakdown for the 3 courses
  const courseSyllabus = {
    g6_8: {
      name: 'AI Innovators (Grades 6–8)',
      theme: 'AI Knowledge, Data Literacy & Problem Solving',
      modules: [
        { num: '01', title: 'Understanding Machine Learning', desc: 'Explore how machines learn from examples and patterns.' },
        { num: '02', title: 'Data Literacy', desc: 'Collect, organise, interpret, and present information effectively.' },
        { num: '03', title: 'Data Quality', desc: 'Understand how missing or incorrect data affects AI results.' },
        { num: '04', title: 'AI Bias and Fairness', desc: 'Recognise biased outputs and consider responsible, fair use.' },
        { num: '05', title: 'Advanced Prompting', desc: 'Add clear goals, context, constraints, and structured output formats.' },
        { num: '06', title: 'AI-Assisted Research', desc: 'Develop questions, summarise insights, and compare reliable sources.' },
        { num: '07', title: 'Automation Concepts', desc: 'Explore rules, digital workflows, and repetitive task automation.' },
        { num: '08', title: 'Design Thinking', desc: 'Understand users, define problems clearly, and develop ideas.' },
        { num: '09', title: 'AI Solution Design', desc: 'Match a real-world problem with a suitable AI-supported concept.' },
        { num: '10', title: 'Prototyping', desc: 'Build a model, workflow, storyboard, or interface concept.' },
        { num: '11', title: 'Testing and Improvement', desc: 'Collect feedback, find weaknesses, and strengthen the idea.' },
        { num: '12', title: 'Responsible Innovation', desc: 'Consider privacy, safety, bias, accuracy, and copyright.' },
        { num: '13', title: 'Project Presentation', desc: 'Explain the problem, research, solution, and expected benefit.' }
      ],
      coreCapabilities: ['Data literacy', 'Bias awareness', 'Research', 'Automation', 'Design thinking', 'Verification'],
      outcome: 'Problem Solving + Innovation + Responsible AI'
    },
    g9_10: {
      name: 'AI Entrepreneurs (Grades 9–10)',
      theme: 'AI Product Development & Startup Thinking',
      modules: [
        { num: '01', title: 'AI and Machine Learning', desc: 'Learn how AI identifies patterns and supports smart decision making.' },
        { num: '02', title: 'Generative AI and Language Models', desc: 'Explore text, image, code, and creative idea generation.' },
        { num: '03', title: 'Natural Language Processing', desc: 'Understand how AI interprets and processes human language.' },
        { num: '04', title: 'Computer Vision', desc: 'Explore image recognition, object detection, and visual classification.' },
        { num: '05', title: 'Advanced Prompt Engineering', desc: 'Master objectives, persona context, constraints, and JSON/markdown formats.' },
        { num: '06', title: 'AI Research and Data Analysis', desc: 'Compare sources, extract quantitative metrics, and identify useful insights.' },
        { num: '07', title: 'AI Productivity Tools', desc: 'Support project planning, communication, and collaborative workflows.' },
        { num: '08', title: 'Automation Concepts', desc: 'Connect software tools and reduce repetitive digital tasks.' },
        { num: '09', title: 'Problem Identification', desc: 'Define a meaningful real-world problem that needs a practical solution.' },
        { num: '10', title: 'User and Market Research', desc: 'Study target users, validate needs, and map existing market alternatives.' },
        { num: '11', title: 'Product and Solution Design', desc: 'Define product purpose, key features, user experience, and AI integration.' },
        { num: '12', title: 'Business Model and Branding', desc: 'Explore value proposition, customer segments, pricing, and brand story.' },
        { num: '13', title: 'Prototype and Startup Pitch', desc: 'Build an interactive prototype and pitch the startup concept to mentors.' }
      ],
      coreCapabilities: ['AI foundations', 'Research', 'Data analysis', 'Prompting', 'Automation', 'Responsible use'],
      outcome: 'Entrepreneurial Thinking + AI Capability'
    },
    g11_12: {
      name: 'AI Future Leaders (Grades 11–12)',
      theme: 'Python, Intelligent Systems, Career Readiness & Capstone',
      modules: [
        { num: '01', title: 'Python Fundamentals', desc: 'Master variables, data types, conditions, loops, and functions.' },
        { num: '02', title: 'Data Handling with Python', desc: 'Organise, clean, filter, and analyse structured datasets.' },
        { num: '03', title: 'Data Visualisation', desc: 'Communicate findings effectively through charts, plots, and visual summaries.' },
        { num: '04', title: 'Machine Learning Fundamentals', desc: 'Understand features, train/test data, predictive models, and accuracy.' },
        { num: '05', title: 'Generative AI and Language Models', desc: 'Explore modern LLM architectures, fine-tuning basics, and content support.' },
        { num: '06', title: 'Prompt Engineering', desc: 'Use multi-shot examples, system context, constraints, and API formats.' },
        { num: '07', title: 'Application Programming Interfaces (APIs)', desc: 'Learn how modern cloud applications exchange information securely.' },
        { num: '08', title: 'AI Automation', desc: 'Connect software tools, databases, and AI-supported backend workflows.' },
        { num: '09', title: 'AI Product Development', desc: 'Plan an intelligent digital service around validated real user demands.' },
        { num: '10', title: 'Market and User Research', desc: 'Study user demographics, industry verticals, and competing technology solutions.' },
        { num: '11', title: 'Business Models and Startup Strategy', desc: 'Explore value architecture, customer economics, revenue models, and costs.' },
        { num: '12', title: 'Introduction to AI Agents', desc: 'Understand autonomous tool use, reflection, and multi-step task planning.' },
        { num: '13', title: 'Future AI Careers', desc: 'Explore technical engineering, product leadership, and research career pathways.' },
        { num: '14', title: 'Portfolio Development', desc: 'Organise GitHub code repositories, live project demos, and documentation.' },
        { num: '15', title: 'Resume and LinkedIn Preparation', desc: 'Present achievements, technical skills, and coursework professionally.' },
        { num: '16', title: 'Interview and Presentation Skills', desc: 'Explain complex engineering projects with clarity, logic, and confidence.' }
      ],
      coreCapabilities: ['Code (Python)', 'Analyse data', 'Model concepts', 'Connect tools (APIs)', 'Automate', 'Build applications'],
      outcome: 'Technical Capability + Career Readiness + Responsible Leadership'
    }
  };

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
  const faqs = [
    {
      q: 'What is the AI Super Kids programme?',
      a: 'The Digital Ghuru AI Super Kids programme is a structured technology curriculum offered in partnership with schools and weekend learning studios across three grade pathways: Grades 6–8 (AI Innovators), Grades 9–10 (AI Entrepreneurs), and Grades 11–12 (AI Future Leaders).'
    },
    {
      q: 'Which grades are eligible to enroll?',
      a: 'The programme is tailored for students from Grade 6 to Grade 12. Each grade cohort follows a dedicated curriculum matched to their academic maturity and cognitive development.'
    },
    {
      q: 'How does the Grades 6–8 (AI Innovators) curriculum work?',
      a: 'Grades 6–8 students focus on data literacy, understanding how machine learning recognizes patterns, spotting bias and fairness issues, advanced prompt craft, and designing prototypes for school and community problems.'
    },
    {
      q: 'What makes Grades 9–10 (AI Entrepreneurs) unique?',
      a: 'High school students explore Generative AI, Computer Vision, and NLP while learning the entire startup product lifecycle: identifying user pain points, testing solutions, building an interactive prototype, and pitching their AI startup.'
    },
    {
      q: 'What does the Grades 11–12 (AI Future Leaders) track cover?',
      a: 'Senior students develop serious technical foundations in Python programming, data handling, machine learning algorithms, and APIs, while preparing college portfolios, LinkedIn profiles, and completing a comprehensive AI Capstone project.'
    },
    {
      q: 'Are any prior coding or computer science prerequisites required?',
      a: 'No prior coding experience is required! Our mentors begin with intuitive visual frameworks and step-by-step guidance before advancing into structured code and logic.'
    },
    {
      q: 'What are the class timings and days?',
      a: 'Sessions are held on weekends (Saturdays or Sundays, 2 hours per session) to seamlessly complement regular school academics without adding homework stress.'
    },
    {
      q: 'Where are the classes conducted?',
      a: 'Classes are conducted offline at our Chennai Learning Studio (in partnership with Jaighurudeva Academy) with dedicated computer workstations, as well as live interactive hybrid batches.'
    },
    {
      q: 'What will students have to show after completing the course?',
      a: 'Students graduate with tangible, working project deliverables: Grades 6–8 complete functional study tools; Grades 9–10 produce a tested AI Startup concept with pitch deck; and Grades 11–12 graduate with a Python-powered Capstone project and career portfolio.'
    },
    {
      q: 'How can parents enroll or speak with an academic mentor?',
      a: 'You can submit the enquiry form on this page or message us directly on WhatsApp (+91 8825948859). Our academic coordinator will provide the complete syllabus brochure and schedule an orientation.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Reusable Premium Navbar */}
      <Navbar activePage="kids" onOpenEnquiry={() => scrollToSection('enquiry-kids')} />

      <main className="pt-28">
        {/* ===================================================================
            SECTION 1: HERO SECTION
            =================================================================== */}
        <section id="hero-kids" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-sky-50/70 via-[#FAF8F5] to-[#FAF8F5]">
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
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600">
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:brightness-105 shadow-xl shadow-sky-500/25 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer btn-theme-cta"
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
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
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
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Hands-on Capstones</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Banner */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-sky-300/30 to-purple-300/30 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />
                  <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl border-2 border-sky-100">
                    <img
                      src="/brand/banner-g7-8.png"
                      alt="AI Super Kids Grade 6 to 8 Program"
                      className="w-full h-auto object-cover cursor-pointer hover:scale-102 transition-transform duration-300"
                      onClick={() => handleOpenLightbox('/brand/banner-g7-8.png', 'AI Super Kids: AI Innovators (Grades 6–8)')}
                    />
                    <div className="p-4 bg-gradient-to-r from-sky-600 to-indigo-600 text-white flex items-center justify-between text-xs font-medium">
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
                  <div className="p-4 bg-sky-50 text-sky-900 text-xs font-medium border-t border-sky-100">
                    ✦ Study the data • Question the output • Build the solution.
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-sky-100 text-sky-800">
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
                  <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200">
                    <h3 className="text-sm font-bold text-sky-900 mb-1">Responsible Innovation</h3>
                    <p className="text-xs text-sky-800">Comprehensive coverage of data quality, privacy, copyright, and ethical AI safeguards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: THREE GRADE COURSES — MINIMAL EDITORIAL SHOWCASE
            =================================================================== */}
        <section id="who-can-join-kids" className="py-20 lg:py-24 bg-[#FAF8F5] border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200/80 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>OFFICIAL AGE-CALIBRATED AI PATHWAYS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Discover Our AI Programs for Kids
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Explore our three dedicated age pathways. Click any card below to open its complete curriculum, learning journey, projects, and outcomes directly on this page.
              </p>
            </div>

            {/* EXACTLY THREE EDITORIAL COURSE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {threeCourses.map((course) => {
                const isSelected = selectedCourseTab === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => handleSelectCourse(course.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectCourse(course.id);
                      }
                    }}
                    className={`group rounded-3xl overflow-hidden bg-white border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 shadow-xl shadow-sky-500/15 -translate-y-2 ring-4 ring-sky-500/20'
                        : 'border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Course Image Banner with Zoom */}
                      <div className="relative overflow-hidden bg-slate-900 aspect-[16/10]">
                        <img
                          src={course.banner}
                          alt={`${course.title} - ${course.gradeBadge}`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/brand/card-g7-8.png';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                        
                        {/* Age-Group Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-sm border ${course.tagColor}`}>
                            {course.gradeBadge}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="absolute top-4 right-4">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-500 text-white shadow-md flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Active Selection
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Body with Generous Whitespace */}
                      <div className="p-6 sm:p-7 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                            {course.id === 'g6_8' ? 'Middle School' : course.id === 'g9_10' ? 'High School' : 'Senior Secondary'}
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            {course.id === 'g11_12' ? '16 Modules' : '13 Modules'}
                          </span>
                        </div>

                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                          {course.title}
                        </h3>

                        <p className="text-xs font-extrabold text-sky-600">
                          ✦ {course.subtitle}
                        </p>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {course.desc}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Interactive CTA Indicator */}
                    <div className="p-6 sm:p-7 pt-0">
                      <div
                        className={`w-full py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all duration-300 ${
                          isSelected
                            ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                            : 'bg-slate-100 text-slate-800 group-hover:bg-slate-900 group-hover:text-white'
                        }`}
                      >
                        <span>{isSelected ? 'Viewing Details Below' : 'Explore Course'}</span>
                        <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'translate-x-1' : 'group-hover:translate-x-1.5'}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: COMPLETE COURSE DETAILS (OPENS DYNAMICALLY BELOW)
            =================================================================== */}
        <section id="what-kids-learn" className="py-20 lg:py-24 bg-white border-t border-stone-200 scroll-mt-24">
          <div id="selected-course-details" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Track Switcher & Navigation Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Active Track:
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-500 text-white shadow-xs">
                  {threeCourses.find(c => c.id === selectedCourseTab)?.gradeBadge} • {threeCourses.find(c => c.id === selectedCourseTab)?.title}
                </span>
              </div>

              {/* Jump Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-slate-500 hidden sm:inline">Switch Track:</span>
                {threeCourses.map((c) => {
                  const isCurrent = c.id === selectedCourseTab;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelectCourse(c.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      {c.gradeBadge}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => scrollToSection('who-can-join-kids')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-stone-100 border border-stone-200 transition-colors ml-1 cursor-pointer"
                  title="Scroll back to the three course cards"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All Cards</span>
                </button>
              </div>
            </div>

            {/* SECTION A — COURSE INTRODUCTION */}
            {(() => {
              const currentCourse = threeCourses.find(c => c.id === selectedCourseTab) || threeCourses[0];
              const syllabus = courseSyllabus[selectedCourseTab];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${currentCourse.tagColor}`}>
                        {currentCourse.gradeBadge}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                        School Program • Weekend Batches
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Admissions Open
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                      {currentCourse.title}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">{currentCourse.subtitle}</span>
                    </h2>

                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                      {currentCourse.desc}
                    </p>

                    {/* Main Learning Objective Callout */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-sky-100 flex items-start gap-3.5">
                      <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 block">
                          Core Program Objective
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                          {currentCourse.learningOutcome}
                        </p>
                      </div>
                    </div>

                    {/* CTA Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleEnquireCourse(currentCourse.title, currentCourse.gradeBadge)}
                        className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:brightness-105 shadow-lg shadow-sky-500/25 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <span>Enquire for {currentCourse.gradeBadge}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href={`https://wa.me/918825948859?text=${encodeURIComponent(`Hello Digital Ghuru, I would like to enquire for ${currentCourse.title} (${currentCourse.gradeBadge}).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleOpenLightbox(currentCourse.officialBanner, `${currentCourse.title} • ${currentCourse.gradeBadge}`)}
                        className="px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-600 hover:text-slate-900 bg-stone-100 hover:bg-stone-200 transition-colors"
                      >
                        View Full Banner
                      </button>
                    </div>
                  </div>

                  {/* Right: Large Supporting Banner Image */}
                  <div className="lg:col-span-5">
                    <div
                      className="relative rounded-3xl overflow-hidden border-2 border-stone-200/90 shadow-xl bg-slate-900 group cursor-pointer"
                      onClick={() => handleOpenLightbox(currentCourse.officialBanner, `${currentCourse.title} • ${currentCourse.gradeBadge}`)}
                      title="Click to view full-resolution banner"
                    >
                      <img
                        src={currentCourse.officialBanner}
                        alt={`${currentCourse.title} Official Program Banner`}
                        className="w-full h-80 sm:h-96 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = currentCourse.banner;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                          Official DigitalGhuru Program
                        </span>
                        <h4 className="text-base font-bold">{currentCourse.title}</h4>
                        <p className="text-xs text-slate-300 mt-0.5">Click image to inspect full-size official brochure banner</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* SECTION B — WHAT STUDENTS WILL LEARN */}
            {(() => {
              const currentCourse = threeCourses.find(c => c.id === selectedCourseTab) || threeCourses[0];
              const syllabus = courseSyllabus[selectedCourseTab];
              const iconsList = [Brain, Sparkles, Cpu, Shield, Layers, Lightbulb];
              return (
                <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-stone-200 space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">
                        Core Competencies
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                        What Students Will Learn in {currentCourse.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {syllabus.coreCapabilities.map((cap, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-slate-700 border border-stone-200 shadow-2xs">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {currentCourse.highlights.map((highlight, idx) => {
                      const IconComponent = iconsList[idx % iconsList.length];
                      return (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex items-start gap-4"
                        >
                          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                              Skill 0{idx + 1}
                            </span>
                            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                              {highlight}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* SECTION C — DETAILED COURSE CURRICULUM (EXPANDABLE MODULES) */}
            {(() => {
              const syllabus = courseSyllabus[selectedCourseTab];
              const currentCourse = threeCourses.find(c => c.id === selectedCourseTab) || threeCourses[0];
              return (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                        Comprehensive Curriculum
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                        Official Syllabus Breakdown ({syllabus.modules.length} Modules)
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Click any module card to expand its topics, practical task, and learning outcome.
                      </p>
                    </div>

                    <div className="text-xs font-semibold text-slate-500">
                      Theme: <strong className="text-slate-800">{syllabus.theme}</strong>
                    </div>
                  </div>

                  {/* Modules Accordion Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {syllabus.modules.map((mod, idx) => {
                      const isExpanded = expandedModule === idx;
                      return (
                        <div
                          key={idx}
                          className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
                            isExpanded
                              ? 'border-sky-500 shadow-md ring-2 ring-sky-500/20'
                              : 'border-stone-200/90 hover:border-slate-300 shadow-2xs'
                          }`}
                        >
                          {/* Module Header Bar */}
                          <button
                            type="button"
                            onClick={() => setExpandedModule(isExpanded ? null : idx)}
                            className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 transition-colors ${
                                isExpanded
                                  ? 'bg-sky-600 text-white'
                                  : 'bg-stone-100 text-slate-700'
                              }`}>
                                {mod.num}
                              </span>
                              <div className="truncate">
                                <h4 className="text-sm font-bold text-slate-900 truncate">
                                  {mod.title}
                                </h4>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  {isExpanded ? 'Click to collapse' : 'Click to inspect topics & task'}
                                </span>
                              </div>
                            </div>

                            <div className="shrink-0 ml-2">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-sky-600" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                          </button>

                          {/* Expanded Content Drawer */}
                          {isExpanded && (
                            <div className="px-5 pb-5 pt-1 border-t border-stone-100 space-y-3.5 bg-slate-50/50">
                              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                                {mod.desc}
                              </p>

                              <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-1.5">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Module Focus & Hands-On Task:
                                </div>
                                <div className="flex items-start gap-2 text-xs text-slate-800">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>Interactive hands-on exercises and mentor-guided practical validation for {mod.title}.</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* SECTION D — LEARNING JOURNEY (TIMELINE) */}
            {(() => {
              const currentCourse = threeCourses.find(c => c.id === selectedCourseTab) || threeCourses[0];
              return (
                <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-8 shadow-xl">
                  <div className="max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                      Structured Methodology
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      The Learning Journey for {currentCourse.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Our students advance through progressive milestone stages from initial enquiry to final working prototype.
                    </p>
                  </div>

                  {/* Connected Pathway Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {currentCourse.path.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 relative overflow-hidden"
                      >
                        <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center mb-3">
                          0{idx + 1}
                        </span>
                        <h4 className="text-base font-bold text-white mb-1">
                          {step}
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          Phase {idx + 1}: Structured hands-on execution and peer review.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* SECTION E — PRACTICAL PROJECTS */}
            {(() => {
              const currentCourse = threeCourses.find(c => c.id === selectedCourseTab) || threeCourses[0];
              return (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">
                      Hands-On Capstone Demos
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      Real-World Projects in {currentCourse.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Students build tangible, portfolio-ready projects that demonstrate their technical curiosity and creative problem-solving.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentCourse.sampleProjects.map((projectName, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 font-bold text-sm flex items-center justify-center mb-4">
                            P{idx + 1}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                            Student Capstone Project
                          </span>
                          <h4 className="text-base font-bold text-slate-900 leading-snug">
                            {projectName}
                          </h4>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Practical, mentor-evaluated solution tackling real-world problems.
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-stone-200">
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block">
                            ✓ Verified Portfolio Output
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* SECTION F & G — LEARNING OUTCOMES & FINAL COURSE CTA */}
            {(() => {
              const currentCourse = threeCourses.find(c => c.id === selectedCourseTab) || threeCourses[0];
              return (
                <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      <Award className="w-3.5 h-3.5" />
                      <span>Verified Learning Outcome</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Ready to Begin {currentCourse.title}?
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      Target Outcome: <strong className="text-white">{currentCourse.learningOutcome}</strong>. Weekend cohorts are now accepting enrolments in Chennai and online.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleEnquireCourse(currentCourse.title, currentCourse.gradeBadge)}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Enquire for {currentCourse.gradeBadge}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://wa.me/918825948859?text=${encodeURIComponent(`Hello Digital Ghuru, I would like to reserve a seat for ${currentCourse.title} (${currentCourse.gradeBadge}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Admissions</span>
                    </a>
                  </div>
                </div>
              );
            })()}

          </div>
        </section>

        {/* ===================================================================
            SECTION 5: INTERACTIVE AND PRACTICAL LEARNING ACTIVITIES
            =================================================================== */}
        <section id="activities" className="py-20 bg-[#FAF8F5] border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-purple-100 text-purple-800">
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
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-5 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 shadow-xs">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Data Quality & Research Lab</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students inspect datasets, analyze missing or biased values, and formulate clear investigative prompts.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs">
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
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-5 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-xs">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
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
                  className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/90 hover:border-sky-300 hover:bg-white hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 shadow-2xs group flex flex-col justify-between"
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
                <Shield className="w-8 h-8 text-sky-600 mb-3" />
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-sky-100 text-sky-800">
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
                  <p className="text-sm font-bold text-sky-600 mt-1">Enquire for Term Fees</p>
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-sky-100 text-sky-800">
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
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200 hover:border-sky-300 shadow-xs hover:shadow transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
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

              {/* Right Column: Static Parent Form */}
              <div className="lg:col-span-6">
                <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xl">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Enquire for Your Child
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Leave your contact details and our team will connect with you regarding the next weekend orientation.
                  </p>

                  {formSubmitted ? (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fade-in">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
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
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Parent's Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.parentName}
                          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Student's Name
                          </label>
                          <input
                            type="text"
                            value={formData.childName}
                            onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                            placeholder="e.g. Ananya"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Student's Grade Course
                        </label>
                        <select
                          value={formData.childGrade}
                          onChange={(e) => setFormData({ ...formData, childGrade: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white font-medium"
                        >
                          <option>Grades 6–8 • AI Innovators (Solve Problems with AI)</option>
                          <option>Grades 9–10 • AI Entrepreneurs (Build with AI)</option>
                          <option>Grades 11–12 • AI Future Leaders (Build Your AI Future)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Questions for Our Mentors (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your student's school or ask about batch timings..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:brightness-105 shadow-md shadow-sky-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit & Chat on WhatsApp</span>
                      </button>

                      <p className="text-[10px] text-slate-400 text-center leading-tight">
                        *Safe and private. Connects directly with our admissions coordinator on WhatsApp.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 12: PARENT FAQS
            =================================================================== */}
        <section id="faq-kids" className="py-20 bg-white border-t border-stone-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-sky-100 text-sky-800">
                <span>PARENT QUESTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Helpful answers addressing parent queries about grade pathways, safety, schedules, and learning outcomes.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-stone-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 bg-[#FAF8F5] hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>{idx + 1}. {faq.q}</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-sky-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white border-t border-stone-100 text-xs text-slate-600 leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Common Footer */}
      <Footer />

      {/* Image Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={activeImage}
        caption={activeCaption}
      />
    </div>
  );
};

export default KidsCoursePage;
