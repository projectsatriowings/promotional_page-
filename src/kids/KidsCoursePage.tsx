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
  Code2
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';
import { Footer } from '../shared/Footer';
import { Lightbox } from '../shared/Lightbox';

export const KidsCoursePage: React.FC = () => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [activeCaption, setActiveCaption] = useState('');

  // FAQ Accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Static Parent Enquiry Form state
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    childName: '',
    childGrade: 'Ages 6–8 • Early Explorers',
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
      `Hello Digital Ghuru! I am enquiring for the 4 Kids Programme.\nParent Name: ${formData.parentName}\nPhone: ${formData.phone}\nChild Name: ${formData.childName || 'N/A'}\nChild Age Group: ${formData.childGrade}\nMessage: ${formData.message || 'Please send batch details and class timings.'}`
    );
    window.open(`https://wa.me/918825948859?text=${text}`, '_blank');
    setFormSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Section 3: EXACTLY THREE AGE PATHWAYS
  const agePathways = [
    {
      title: 'AI Super Kids: Early Explorers',
      age: 'Ages 6 – 8 Years',
      badge: 'Early Explorers',
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50/70',
      borderColor: 'border-amber-200',
      banner: '/brand/card-g1-6.png',
      desc: 'Introduce children gently to creative digital art, visual puzzles, and early curiosity about technology and smart machines without dry coding.',
      focus: 'Digital storytelling, safe AI awareness, creative pattern recognition.'
    },
    {
      title: 'AI Super Kids: AI Innovators',
      age: 'Ages 9 – 10 Years',
      badge: 'AI Innovators',
      color: 'from-sky-400 to-blue-500',
      bgColor: 'bg-sky-50/70',
      borderColor: 'border-sky-200',
      banner: '/brand/card-g7-8.png',
      desc: 'Develop data literacy, structured prompt craft, interactive robot animation, and building helpful study assistant mini-tools.',
      focus: 'Visual block logic, prompt engineering, interactive science games.'
    },
    {
      title: 'AI Super Kids: AI Young Leaders',
      age: 'Ages 11 – 12 Years',
      badge: 'Young Leaders',
      color: 'from-indigo-400 to-purple-500',
      bgColor: 'bg-purple-50/70',
      borderColor: 'border-purple-200',
      banner: '/brand/card-g11-12.png',
      desc: 'Empower older students to solve real-world problems by designing responsible AI prototypes, automation workflows, and presentation decks.',
      focus: 'Workflow logic, prototype design, public speaking & demo showcase.'
    }
  ];

  // Section 4: What Kids Will Learn
  const learningTopics = [
    {
      title: 'Creative AI & Digital Art',
      icon: <Palette className="w-6 h-6 text-pink-500" />,
      desc: 'Learn how modern creative software turns ideas into digital artwork, character illustrations, and story visuals.'
    },
    {
      title: 'Visual Coding & Game Logic',
      icon: <Code2 className="w-6 h-6 text-sky-500" />,
      desc: 'Assemble visual logic blocks to control sprites, create maze games, and understand cause-and-effect coding.'
    },
    {
      title: 'Prompt Craft & Safe AI',
      icon: <Bot className="w-6 h-6 text-amber-500" />,
      desc: 'Teach children how to ask constructive questions to AI assistants responsibly while protecting online privacy.'
    },
    {
      title: 'Logical Thinking & Math Puzzles',
      icon: <Puzzle className="w-6 h-6 text-purple-500" />,
      desc: 'Break large problems down into bite-sized algorithmic steps through interactive pattern recognition.'
    },
    {
      title: 'Robotics & Motion Animation',
      icon: <Sparkles className="w-6 h-6 text-orange-500" />,
      desc: 'Explore motion physics and character movement by animating custom virtual robots across interactive stages.'
    },
    {
      title: 'Presentation & Storytelling',
      icon: <Lightbulb className="w-6 h-6 text-emerald-500" />,
      desc: 'Build public speaking confidence by presenting completed mini-projects during end-of-term Show & Tell sessions.'
    }
  ];

  // Section 6: 8 Benefits
  const benefits = [
    { title: 'Creativity & Imagination', desc: 'Encourages children to turn their imaginative ideas into tangible digital creations.', icon: '🎨' },
    { title: 'Communication Skills', desc: 'Children practice explaining their project ideas clearly to classmates and mentors.', icon: '💬' },
    { title: 'Confidence & Independence', desc: 'Overcoming technical challenges instills self-assurance and grit.', icon: '🌟' },
    { title: 'Problem Solving Mindset', desc: 'Teaches children to approach obstacles methodically rather than getting frustrated.', icon: '🧩' },
    { title: 'Logical Thinking', desc: 'Strengthens mathematical and analytical comprehension through visual coding rules.', icon: '📐' },
    { title: 'Teamwork & Collaboration', desc: 'Students pair up on weekend group challenges, learning cooperation and empathy.', icon: '🤝' },
    { title: 'Constructive Screen Time', desc: 'Transforms passive video watching into active, productive, and educational learning.', icon: '💻' },
    { title: 'Digital Safety Awareness', desc: 'Equips kids with responsible habits regarding passwords, privacy, and online safety.', icon: '🛡️' }
  ];

  // Section 12: 10 FAQs for Parents
  const faqs = [
    {
      q: 'What is the 4 Kids programme?',
      a: 'The Digital Ghuru 4 Kids programme is a specialized technology and creative skills course designed to introduce children across 3 age pathways (Ages 6–12) to foundational digital awareness, visual coding, and safe AI exploration through fun, hands-on activities.'
    },
    {
      q: 'What are the three eligible age groups?',
      a: 'Children aged 6 to 12 learn in three dedicated age pathways: Early Explorers (Ages 6–8), AI Innovators (Ages 9–10), and AI Young Leaders (Ages 11–12).'
    },
    {
      q: 'What will children learn?',
      a: 'Children learn digital art creation, visual block coding, prompt craft fundamentals, pattern recognition, robot motion animations, and digital safety principles.'
    },
    {
      q: 'How long is the programme?',
      a: 'The foundation term runs for 8 to 12 weeks with weekly structured sessions, culminating in a student project showcase for parents.'
    },
    {
      q: 'What are the class timings?',
      a: 'Classes are held on weekends (Saturdays and Sundays) in 2-hour interactive sessions designed to avoid interfering with regular school homework.'
    },
    {
      q: 'Is this an offline programme?',
      a: 'Yes! We conduct classroom sessions at our Chennai learning campus with dedicated computer workstations. Interactive live online batches are also available.'
    },
    {
      q: 'Where is the centre located?',
      a: 'Our learning centre is located in Chennai, hosted in academic partnership with Jaighurudeva Academy. Parents are welcome to visit during our open-house hours.'
    },
    {
      q: 'What are the fees?',
      a: 'Course fees vary based on the age pathway. Please submit the enquiry form or WhatsApp our admissions team for the current seasonal batch fee structure.'
    },
    {
      q: 'How can parents enquire?',
      a: 'You can submit the form on this page, message our team on WhatsApp (+91 8825948859), or call our admissions desk directly for counseling.'
    },
    {
      q: 'How can we enrol?',
      a: 'After an initial orientation chat, parents can select a preferred weekend time slot and confirm enrolment before batch seats are filled.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Reusable Premium Navbar */}
      <Navbar activePage="kids" onOpenEnquiry={() => scrollToSection('enquiry-kids')} />

      <main className="pt-20">
        {/* ===================================================================
            SECTION 1: HERO SECTION
            =================================================================== */}
        <section id="hero-kids" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-sky-50/70 via-[#FAF8F5] to-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100/80 border border-amber-200 text-amber-900 shadow-2xs">
                  <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span>Digital Ghuru 4 Kids • 3 Age Pathways (Ages 6–12)</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Big Dreams Start with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600">
                    Little Steps!
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Discover an engaging learning experience where children can explore, learn and develop new skills in a safe, fun, and encouraging environment.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToSection('what-kids-learn')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:brightness-105 shadow-xl shadow-sky-500/25 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer btn-theme-cta"
                  >
                    <span>Explore 3 Age Pathways</span>
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
                    <span className="text-xs font-semibold text-slate-700">3 Age Cohorts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Creative Visual AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Child-Safe Lab</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Certified Mentors</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Banner */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-sky-300/30 to-purple-300/30 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />
                  <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl border-2 border-sky-100">
                    <img
                      src="/brand/banner-g1-6.png"
                      alt="Digital Ghuru 4 Kids Learning Program"
                      className="w-full h-auto object-cover cursor-pointer hover:scale-102 transition-transform duration-300"
                      onClick={() => handleOpenLightbox('/brand/banner-g1-6.png', '4 Kids Creative AI & Technology Program')}
                    />
                    <div className="p-4 bg-gradient-to-r from-sky-600 to-indigo-600 text-white flex items-center justify-between text-xs font-medium">
                      <span>Weekend Batches Open</span>
                      <span className="px-2 py-0.5 rounded bg-white/20 font-bold">Ages 6–12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: ABOUT THE 4 KIDS PROGRAMME
            =================================================================== */}
        <section id="about-kids" className="py-20 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Image side */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-stone-200 group">
                  <img
                    src="/brand/banner-g7-8.png"
                    alt="About Digital Ghuru 4 Kids"
                    className="w-full h-auto object-cover cursor-pointer group-hover:scale-102 transition-transform duration-300"
                    onClick={() => handleOpenLightbox('/brand/banner-g7-8.png', 'Young Innovators Visual Coding Journey')}
                  />
                  <div className="p-4 bg-sky-50 text-sky-900 text-xs font-medium border-t border-sky-100">
                    ✦ Fostering curiosity and technical confidence from an early age.
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-sky-100 text-sky-800">
                  <span>SECTION 02</span>
                  <span>•</span>
                  <span>ABOUT THE PROGRAMME</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Igniting Creativity and Logic in Young Minds
                </h2>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    <strong className="text-slate-900">What is the 4 Kids programme?</strong> It is an activity-driven learning curriculum designed to introduce children across three structured age cohorts to foundational technology, visual logic, and creative AI tools in a friendly, low-stress environment.
                  </p>
                  <p>
                    <strong className="text-slate-900">Why was it designed?</strong> Today's children grow up surrounded by digital screens. Rather than being passive consumers of technology, our programme empowers them to become active creators who understand how software and AI work.
                  </p>
                  <p>
                    <strong className="text-slate-900">What makes our approach useful?</strong> We avoid dry syntax memorization. Children learn through visual building blocks, colorful robots, digital drawing boards, and interactive team puzzles that keep learning genuinely enjoyable.
                  </p>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                    <h3 className="text-sm font-bold text-amber-900 mb-1">Small Batch Mentorship</h3>
                    <p className="text-xs text-amber-800">Only 8 students per mentor to ensure each child receives patient guidance.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200">
                    <h3 className="text-sm font-bold text-sky-900 mb-1">Safe Digital Habits</h3>
                    <p className="text-xs text-sky-800">Instills responsible screen time habits and essential online safety awareness.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: WHO CAN JOIN? (ONLY THREE AGES)
            =================================================================== */}
        <section id="who-can-join-kids" className="py-20 bg-[#FAF8F5] border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900">
                <span>SECTION 03</span>
                <span>•</span>
                <span>THREE AGE PATHWAYS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Three Age-Appropriate Learning Pathways
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Every child learns best alongside peers at the same developmental stage. Select the pathway designed for your child's age.
              </p>
            </div>

            {/* Exactly 3 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {agePathways.map((pathway, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border-2 ${pathway.borderColor} ${pathway.bgColor} shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group hover:-translate-y-1.5`}
                >
                  <div>
                    <div className="rounded-2xl overflow-hidden mb-5 border border-black/5 shadow-xs bg-white">
                      <img
                        src={pathway.banner}
                        alt={pathway.badge}
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/brand/card-g1-6.png';
                        }}
                      />
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-white text-slate-800 shadow-2xs mb-2">
                      {pathway.badge}
                    </span>
                    <h3 className="text-lg font-black text-slate-900">
                      {pathway.title}
                    </h3>
                    <p className="text-xs font-bold text-sky-700 mb-3">
                      {pathway.age}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-5">
                      {pathway.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-black/5 text-xs text-slate-700">
                    <span className="text-slate-900 font-bold block mb-1">Key Focus:</span>
                    {pathway.focus}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: WHAT WILL KIDS LEARN?
            =================================================================== */}
        <section id="what-kids-learn" className="py-20 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-sky-100 text-sky-800">
                <span>SECTION 04</span>
                <span>•</span>
                <span>LEARNING TOPICS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                What Will Children Learn?
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                A thoughtfully designed syllabus teaching creative digital skills, safe exploration, and logical thinking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 shadow-2xs hover:shadow-sm hover:border-sky-300 transition-all flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-white border border-stone-200 shrink-0 shadow-2xs">
                    {topic.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {topic.desc}
                    </p>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-purple-100 text-purple-800">
                <span>SECTION 05</span>
                <span>•</span>
                <span>HANDS-ON ACTIVITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Interactive Learning Activities
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Children learn best when they are actively building, drawing, collaborating, and experimenting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                <span className="text-3xl mb-3 block">🤖</span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Robot Animation Lab</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kids animate virtual robots, setting walking directions, dance moves, and sound effects using visual blocks.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                <span className="text-3xl mb-3 block">🎨</span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Digital Storybook Studio</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students craft short stories with creative digital illustrations and interactive clickable characters.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                <span className="text-3xl mb-3 block">🧩</span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Team Logic Puzzles</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pairs collaborate to solve algorithmic maze challenges, fostering communication and collective problem solving.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                <span className="text-3xl mb-3 block">🎤</span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Show & Tell Day</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students present their completed project to parents and peers at the end of every module, boosting self-confidence.
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
                <span>SECTION 06</span>
                <span>•</span>
                <span>CHILD DEVELOPMENT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Intended Benefits for Your Child
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                How technology education nurtures well-rounded creativity, logic, and self-confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 hover:border-sky-300 hover:bg-white transition-all shadow-2xs"
                >
                  <span className="text-2xl mb-2 block">{b.icon}</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{b.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
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
                <span>SECTION 07</span>
                <span>•</span>
                <span>PARENT PEACE OF MIND</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Why Parents Trust Digital Ghuru
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Verified attributes ensuring a secure, supportive, and enriching learning space.
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
                  We maintain strict caps of 8 students per batch so no child gets left behind or feels overlooked.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                <Heart className="w-8 h-8 text-rose-500 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-2">Regular Parent Updates</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Parents receive bi-weekly progress summaries highlighting newly completed projects and creative milestones.
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
                <span>SECTION 08</span>
                <span>•</span>
                <span>PROGRAMME SCHEDULE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Programme Information & Schedules
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Key logistical information for parents planning their child's extracurricular schedule.
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-3xl border border-stone-200 p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Programme Name</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">4 Kids Tech & AI Foundation</p>
                  <p className="text-xs text-slate-500 mt-0.5">3 Dedicated Age Pathways</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Eligible Ages</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">6 to 12 Years Old</p>
                  <p className="text-xs text-slate-500 mt-0.5">Ages 6–8, 9–10, 11–12</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Weekly Schedule</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">Weekend Batches</p>
                  <p className="text-xs text-slate-500 mt-0.5">Sat or Sun: 2 hours/session</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Learning Modes</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">Offline & Live Online</p>
                  <p className="text-xs text-slate-500 mt-0.5">Chennai Lab & Remote Streaming</p>
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
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Trial Session</span>
                  <p className="text-sm font-bold text-emerald-600 mt-1">Free Orientation Call</p>
                  <p className="text-xs text-slate-500 mt-0.5">Speak with a lead mentor</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 9: LEARNING ENVIRONMENT AND GALLERY (3 AGE BANNERS)
            =================================================================== */}
        <section id="gallery-kids" className="py-20 bg-[#FAF8F5] border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-pink-100 text-pink-800">
                <span>SECTION 09</span>
                <span>•</span>
                <span>LEARNING ENVIRONMENT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Our Learning Environment & Student Banners
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                A glimpse into our kid-friendly curriculum cards across the three age pathways. Click any banner to expand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="rounded-3xl overflow-hidden shadow-sm border border-stone-200 cursor-pointer bg-white group hover:shadow-md transition"
                onClick={() => handleOpenLightbox('/brand/banner-g1-6.png', 'Ages 6 to 8 — Early Explorers Learning Journey')}
              >
                <img
                  src="/brand/banner-g1-6.png"
                  alt="Early Explorers"
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h4 className="text-xs font-bold text-slate-900">Ages 6 – 8 Early Explorers</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Curiosity, digital safety & early AI awareness</p>
                </div>
              </div>

              <div
                className="rounded-3xl overflow-hidden shadow-sm border border-stone-200 cursor-pointer bg-white group hover:shadow-md transition"
                onClick={() => handleOpenLightbox('/brand/banner-g7-8.png', 'Ages 9 to 10 — AI Innovators Block Coding')}
              >
                <img
                  src="/brand/banner-g7-8.png"
                  alt="AI Innovators"
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h4 className="text-xs font-bold text-slate-900">Ages 9 – 10 AI Innovators</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Data literacy & prompt engineering</p>
                </div>
              </div>

              <div
                className="rounded-3xl overflow-hidden shadow-sm border border-stone-200 cursor-pointer bg-white group hover:shadow-md transition"
                onClick={() => handleOpenLightbox('/brand/banner-g11-12.png', 'Ages 11 to 12 — AI Young Leaders')}
              >
                <img
                  src="/brand/banner-g11-12.png"
                  alt="AI Young Leaders"
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h4 className="text-xs font-bold text-slate-900">Ages 11 – 12 Young Leaders</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Prototypes, automation logic & leadership</p>
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
                <span>SECTION 10</span>
                <span>•</span>
                <span>PARENT VOICES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Parent Feedback & Experiences
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Real reflections from parents whose children participated in our weekend digital awareness sessions.
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
                  "My 8-year-old son was spending hours watching random videos. After joining the weekend batch, he proudly created his own animated robot story. The change from passive screen time to active creativity has been remarkable."
                </p>
                <div className="border-t border-stone-200 pt-3">
                  <span className="text-xs font-bold text-slate-900 block">Kavitha R.</span>
                  <span className="text-[11px] text-slate-500">Parent of 8-Year-Old Student, Chennai</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200">
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  "The small batch size really matters. The trainers are extremely patient and encourage kids to ask questions without feeling judged. My daughter looks forward to Saturday classes."
                </p>
                <div className="border-t border-stone-200 pt-3">
                  <span className="text-xs font-bold text-slate-900 block">Venkatesh S.</span>
                  <span className="text-[11px] text-slate-500">Parent of 10-Year-Old Student, Chennai</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200">
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  "Teaching young minds about safe AI and digital literacy is so important right now. Digital Ghuru explains complex ideas in a very child-friendly manner. Highly recommended for school parents."
                </p>
                <div className="border-t border-stone-200 pt-3">
                  <span className="text-xs font-bold text-slate-900 block">Dr. Meenakshi N.</span>
                  <span className="text-[11px] text-slate-500">Parent of 12-Year-Old Student, Chennai</span>
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
                  <span>SECTION 11</span>
                  <span>•</span>
                  <span>PARENT ADMISSION DESK</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Give Your Child an Opportunity to Explore, Learn and Grow!
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Have questions about your child's age group, batch timings, or weekend schedules? Contact our academic counselor for personalized guidance.
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
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Call Centre Coordinator</span>
                      <span className="text-sm font-bold text-slate-900">+91 8825948859</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/918825948859?text=Hello%20Digital%20Ghuru,%20I%20am%20enquiring%20about%20the%204%20Kids%20technology%20programme.%20Please%20share%20the%20batch%20timings."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 shadow-xs hover:shadow transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Chat with Coordinator on WhatsApp</span>
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
                    Leave your details and our team will connect with you to discuss the best cohort timing.
                  </p>

                  {formSubmitted ? (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fade-in">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="text-sm font-bold text-emerald-900">Enquiry Initiated!</h4>
                      <p className="text-xs text-emerald-700 leading-relaxed">
                        WhatsApp was launched with your child's age group and details. Our coordinator will reply promptly!
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
                            Child's Name
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
                          Child's Age Group Pathway
                        </label>
                        <select
                          value={formData.childGrade}
                          onChange={(e) => setFormData({ ...formData, childGrade: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
                        >
                          <option>Ages 6–8 • Early Explorers</option>
                          <option>Ages 9–10 • AI Innovators</option>
                          <option>Ages 11–12 • AI Young Leaders</option>
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
                          placeholder="Tell us about your child's interests or ask about batch schedules..."
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
                <span>SECTION 12</span>
                <span>•</span>
                <span>PARENT QUESTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Parent Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Helpful answers addressing parent queries about child safety, weekly schedules, and teaching methods.
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

        {/* ===================================================================
            SECTION 13: FINAL PARENT CTA
            =================================================================== */}
        <section id="final-cta-kids" className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weekend Cohorts Enrolling Now</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Let's Make Learning an Exciting Journey for Your Child!
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Equip your child with genuine digital confidence, creativity, and problem-solving skills in a fun, mentor-guided setting.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => scrollToSection('enquiry-kids')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:brightness-105 shadow-xl shadow-sky-500/25 transition-all cursor-pointer"
              >
                Enquire for Your Child
              </button>

              <a
                href="https://wa.me/918825948859?text=Hello%20Digital%20Ghuru,%20I%20am%20ready%20to%20enquire%20for%20the%204%20Kids%20Programme."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm text-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/40 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href="tel:+918825948859"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm text-slate-300 bg-white/10 hover:bg-white/20 border border-white/15 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call: +91 8825948859</span>
              </a>
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
