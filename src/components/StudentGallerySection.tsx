import React, { useState } from 'react';
import { Sparkles, Maximize2, X, BookOpen } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  gradeBadge: string;
  trackName: string;
  category: string;
  image: string;
  description: string;
  toolsUsed: string;
}

const DIGITALGHURU_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'My First AI Story: The Cloud Treehouse',
    gradeBadge: 'Ages 6–8',
    trackName: 'AI Super Kids: Early Explorers',
    category: 'Creative Storytelling',
    image: '/brand/card-g1-6.png',
    description: 'An illustrated digital storybook authored through kid-safe prompt coaching, exploring character consistency and safe digital habits.',
    toolsUsed: 'OpenAI Kid Sandbox, Canva for Education'
  },
  {
    id: 'proj-2',
    title: 'Interactive Study Assistant & Homework Bot',
    gradeBadge: 'Ages 9–10',
    trackName: 'AI Super Kids: AI Innovators',
    category: 'Study Assistant',
    image: '/brand/card-g7-8.png',
    description: 'A customized logic bot that provides Socratic step-by-step math and science hints without giving away homework answers directly.',
    toolsUsed: 'OpenAI APIs, Prompt Chaining'
  },
  {
    id: 'proj-3',
    title: 'CareLink: Senior Companion AI Prototype',
    gradeBadge: 'Ages 11–12',
    trackName: 'AI Super Kids: AI Young Leaders',
    category: 'Community AI Prototype',
    image: '/brand/card-g9-10.png',
    description: 'A complete problem-solving prototype featuring user discovery, voice-first daily check-ins, and a 5-minute project pitch presentation.',
    toolsUsed: 'Zapier, OpenAI, Canva Prototyping'
  },
  {
    id: 'proj-4',
    title: 'EcoWatch: School Waste & Energy Classifier',
    gradeBadge: 'Ages 11–12',
    trackName: 'AI Super Kids: AI Young Leaders',
    category: 'Environmental AI',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80',
    description: 'A machine-learning vision prototype that classifies recyclable materials with audio feedback and automated logs.',
    toolsUsed: 'Computer Vision APIs, Logic Automation'
  }
];

interface StudentGallerySectionProps {
  onOpenEnquiry: (courseId?: string) => void;
}

export const StudentGallerySection: React.FC<StudentGallerySectionProps> = ({ onOpenEnquiry }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Creative Storytelling', 'Study Assistant', 'Startup MVP', 'Python Machine Learning'];

  const filteredProjects = activeCategory === 'All'
    ? DIGITALGHURU_PROJECTS
    : DIGITALGHURU_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="learning-experience" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Learning Experience & Deliverables</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Tangible Student Milestone Projects
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Every grade level at DigitalGhuru culminates in a tangible, verified portfolio deliverable—from illustrated digital literature to working Python algorithms.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="group relative rounded-3xl overflow-hidden bg-stone-50 border border-stone-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-xs text-slate-900">
                    {item.gradeBadge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-orange-600/90 text-white">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] font-semibold text-amber-300 mb-0.5">
                    {item.trackName}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 bg-white flex flex-col justify-between flex-grow">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span className="text-slate-400 font-semibold">Tools:</span>
                    <span className="font-semibold text-slate-800">{item.toolsUsed}</span>
                  </div>
                  <span className="text-orange-600 font-bold group-hover:underline">
                    View Project Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Lightbox Modal */}
        {selectedProject && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-600 text-white mb-2 inline-block">
                    {selectedProject.gradeBadge} • {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-orange-600" />
                    <span>Curriculum Track: <strong className="text-slate-800">{selectedProject.trackName}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Tools: <strong className="text-slate-800">{selectedProject.toolsUsed}</strong></span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Verified DigitalGhuru Capstone Deliverable
                  </span>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onOpenEnquiry();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    Enquire for This Grade
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
