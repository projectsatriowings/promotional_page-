export interface CurriculumModule {
  number: string;
  title: string;
  duration: string;
  topics: string[];
  handsOnTask: string;
}

export interface StudentProject {
  title: string;
  summary: string;
  tag: string;
  iconName: string;
  difficulty: string;
  previewUrl: string;
}

export interface Course {
  id: string;
  number: string;
  officialSlug: string;
  officialUrl: string;
  title: string;
  programName: string;
  gradeBadge: string;
  ageGroup: string;
  price: string;
  subtitle: string;
  tagline: string;
  level: string;
  accent: {
    primary: string;
    hex: string;
    lightHex: string;
    gradient: string;
    border: string;
    badgeBg: string;
    text: string;
  };
  cardImage: string;
  heroImage: string;
  shortDescription: string;
  fullDescription: string;
  outcomes: string[];
  skillsGained: string[];
  toolsMastered: string[];
  modules: CurriculumModule[];
  exampleProjects: StudentProject[];
  simulationData: {
    interactiveDemoTitle: string;
    demoPrompt: string;
    demoOutput: string;
    codeSnippet: string;
    previewVideoType: string;
  };
  logistics: {
    prerequisites: string;
    classFormat: string;
    cohortStatus: string;
    pricingNote: string;
  };
}

export const COURSES: Course[] = [
  {
    id: 'ai-super-kids-ages-6-8',
    number: '01',
    officialSlug: 'ai-super-kids-grades-1-6',
    officialUrl: 'https://digitalghuru.com/courses/ai-super-kids-grades-1-6',
    title: 'AI Super Kids: Early Explorers',
    programName: 'AI Super Kids Program (Ages 6–8)',
    gradeBadge: 'Ages 6–8',
    ageGroup: 'Ages 6–8',
    price: '₹8,000',
    subtitle: 'Building Curiosity, Digital Safety & Early AI Awareness',
    tagline: 'Introduce young children to smart technology through interactive stories, visual games, and safe creative play.',
    level: 'Foundational • No Coding Required',
    accent: {
      primary: 'orange',
      hex: '#EA580C',
      lightHex: '#FFF7ED',
      gradient: 'from-orange-500 to-amber-500',
      border: 'border-orange-300',
      badgeBg: 'bg-orange-100 text-orange-900',
      text: 'text-orange-700',
    },
    cardImage: '/brand/card-g1-6.png',
    heroImage: '/brand/banner-g1-6.png',
    shortDescription: 'Designed specifically for early learners in Ages 6–8. Explore "What is AI?", smart machines in daily life, and author "My First AI Story" with safe digital habits.',
    fullDescription: 'Designed specifically for early learners, the AI Explorers course introduces children to the smart world around them. Through fun, interactive stories, games, and guided activities, young students build curiosity, observation skills, and logical thinking. They explore topics like "What is AI?", "Smart Machines", and "Digital Safety", completing projects like "My First AI Story" where imagination and safety always come first.',
    outcomes: [
      'Recognize smart technology and everyday AI algorithms in home and classroom tools',
      'Build early computational thinking through pattern recognition and sorting puzzles',
      'Understand foundational digital safety, screen-time balance, and ethical media sharing',
      'Create and illustrate "My First AI Story" using guided, kid-safe creative prompts'
    ],
    skillsGained: ['AI Awareness', 'Logical Thinking', 'Digital Safety', 'Creative Storytelling', 'Visual Sequencing'],
    toolsMastered: ['OpenAI Kid Sandbox', 'Canva for Education', 'Visual Sorting Labs', 'Kid-Safe Audio Canvas'],
    modules: [
      {
        number: 'Module 01',
        title: 'Discovering Technology & AI',
        duration: 'Lessons 1–2',
        topics: ['What is AI vs. standard tools?', 'How computers see and hear patterns', 'Asking smart questions'],
        handsOnTask: 'Create a digital avatar character that learns your favorite colors.'
      },
      {
        number: 'Module 02',
        title: 'Smart Machines in Everyday Life',
        duration: 'Lessons 3–4',
        topics: ['Voice assistants, recommendation feeds, and robots', 'How cameras identify shapes', 'Machine sensors'],
        handsOnTask: 'Build a shape and animal recognition card game.'
      },
      {
        number: 'Module 03',
        title: 'Patterns, Sorting & Human Creativity',
        duration: 'Lessons 5–6',
        topics: ['How humans train machines with examples', 'Classification puzzles', 'Why human imagination is unique'],
        handsOnTask: 'Train a playful visual classifier to sort healthy vs. treat snacks.'
      },
      {
        number: 'Module 04',
        title: 'Creation, Digital Safety & Final Story',
        duration: 'Lessons 7–8',
        topics: ['Digital manners and privacy protection', 'Iterative prompt storytelling', 'Final project exhibition'],
        handsOnTask: 'Author and present "My First AI Story" illustrated digital book.'
      }
    ],
    exampleProjects: [
      {
        title: 'My First AI Storybook',
        summary: 'A child-crafted illustrated story about a friendly helper robot that visits the jungle, created with kid-safe prompt coaching.',
        tag: 'Creative AI & Storytelling',
        iconName: 'BookOpen',
        difficulty: 'Early Explorer',
        previewUrl: '/brand/card-g1-6.png'
      },
      {
        title: 'Smart Snack Sorter Game',
        summary: 'A visual classification activity where learners teach an algorithm to distinguish between fruits, veggies, and picnic snacks.',
        tag: 'Visual Logic',
        iconName: 'Sparkles',
        difficulty: 'Foundational',
        previewUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=80'
      }
    ],
    simulationData: {
      interactiveDemoTitle: 'AI Story Studio Playground',
      demoPrompt: 'A playful puppy and an AI robot explorer building a colorful treehouse in the clouds.',
      demoOutput: 'Story Studio generated: "Meet Sparky and Robi! With glowing digital blueprints, they built a luminous treehouse among cotton-candy clouds..."',
      codeSnippet: '// DigitalGhuru Early Explorer Logic\nconst storyBook = new DigitalGhuru.StoryEngine({\n  character: "Friendly Robot Robi",\n  theme: "Cooperation and Kindness",\n  safetyFilter: "Strict-Minor-Protection"\n});\nstoryBook.generateIllustratedScene("Building the cloud sanctuary");',
      previewVideoType: 'Guided Creative Story Canvas'
    },
    logistics: {
      prerequisites: 'Basic reading readiness and enthusiasm to explore technology.',
      classFormat: 'Interactive small cohorts, live mentor demonstrations, and creative activity sheets.',
      cohortStatus: 'Admissions Open • Special Introductory Fee: ₹8,000',
      pricingNote: 'Course Fee: ₹8,000 • Includes digital workbook & completion certificate.'
    }
  },
  {
    id: 'ai-super-kids-ages-9-10',
    number: '02',
    officialSlug: 'ai-super-kids-grade-7-8',
    officialUrl: 'https://digitalghuru.com/courses/ai-super-kids',
    title: 'AI Super Kids: AI Innovators',
    programName: 'AI Super Kids Program (Ages 9–10)',
    gradeBadge: 'Ages 9–10',
    ageGroup: 'Ages 9–10',
    price: '₹10,000',
    subtitle: 'Data Literacy, Responsible Research & Solution Design',
    tagline: 'A structured program for data literacy, responsible research, and practical AI solution prototyping.',
    level: 'Intermediate • Visual & Computational Logic',
    accent: {
      primary: 'blue',
      hex: '#2563EB',
      lightHex: '#EFF6FF',
      gradient: 'from-blue-600 to-indigo-600',
      border: 'border-blue-300',
      badgeBg: 'bg-blue-100 text-blue-900',
      text: 'text-blue-700',
    },
    cardImage: '/brand/card-g7-8.png',
    heroImage: '/brand/banner-g7-8.png',
    shortDescription: 'Master the 4 Pillars of AI Innovation: Data Literacy, Advanced Prompting, Responsible AI, and Solution Design. Build an AI Study Assistant and Career Explorer.',
    fullDescription: 'The AI Innovators program empowers children aged 9–10 to advance from casual AI users into rigorous problem solvers. Grounded in our four core pillars—Data Literacy & Quality, Advanced Prompt Engineering, Responsible AI, and Solution Design—students learn how to analyze datasets, interrogate algorithmic bias, and design working AI prototypes for real school and community challenges.',
    outcomes: [
      'Master structured multi-turn prompt engineering and verification workflows',
      'Evaluate data quality, sample bias, and hallucination risks in language models',
      'Apply human-centered design thinking to build functional student study assistants',
      'Prototype workflow automations addressing environmental and school challenges'
    ],
    skillsGained: ['Data Literacy', 'Advanced Prompting', 'Design Thinking', 'Algorithmic Ethics', 'Workflow Automation'],
    toolsMastered: ['OpenAI APIs', 'Canva Prototyping', 'Google Colab Labs', 'Notion AI Workspaces'],
    modules: [
      {
        number: 'Module 01',
        title: 'AI Knowledge and Data Literacy',
        duration: 'Lessons 1–2',
        topics: ['Neural network fundamentals', 'How models ingest training data', 'Detecting inaccurate responses'],
        handsOnTask: 'Conduct a bias audit on a sample historical dataset.'
      },
      {
        number: 'Module 02',
        title: 'Advanced Prompting & Research',
        duration: 'Lessons 3–4',
        topics: ['Role prompting, system instructions, few-shot examples', 'Iterative fact checking and cross-referencing'],
        handsOnTask: 'Build a personalized Study Buddy for science and math.'
      },
      {
        number: 'Module 03',
        title: 'Design Thinking & Prototyping',
        duration: 'Lessons 5–6',
        topics: ['User interviews and empathy maps', 'Wireframing an AI solution interface', 'Handling user inputs'],
        handsOnTask: 'Prototype the "AI Career Explorer" student discovery app.'
      },
      {
        number: 'Module 04',
        title: 'Testing & Responsible Innovation',
        duration: 'Lessons 7–8',
        topics: ['Edge cases and red-teaming', 'Data privacy compliance', 'Final prototype showcase & peer review'],
        handsOnTask: 'Deliver the AI for Environment & School Workflows Capstone.'
      }
    ],
    exampleProjects: [
      {
        title: 'AI Homework & Study Assistant',
        summary: 'A personalized bot that breaks down complex science topics into intuitive analogies and generates progressive quiz challenges.',
        tag: 'Study Assistant',
        iconName: 'Terminal',
        difficulty: 'Innovator',
        previewUrl: '/brand/card-g7-8.png'
      },
      {
        title: 'EcoWatch School Resource Audit',
        summary: 'An AI-assisted audit tool that tracks cafeteria food waste and recommends energy-saving schedules for campus lighting.',
        tag: 'Environmental AI',
        iconName: 'Globe',
        difficulty: 'Innovator',
        previewUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80'
      }
    ],
    simulationData: {
      interactiveDemoTitle: 'Innovator AI Assistant Lab',
      demoPrompt: 'Create a 3-step study plan for Photosynthesis with interactive questions.',
      demoOutput: 'Step 1: Light Reactions (Chlorophyll absorbs solar energy) -> Step 2: Calvin Cycle (CO2 converted to Glucose) -> Checkpoint Quiz: "Why do plants release Oxygen?"',
      codeSnippet: '// DigitalGhuru Innovator Study Assistant\nimport { AssistantBuilder } from "@digitalghuru/ai-kids";\n\nconst studyBot = new AssistantBuilder({\n  ageGroup: "Ages 9-10",\n  tone: "Socratic Mentor",\n  mode: "Hint-First-No-Cheating"\n});\nstudyBot.generateConceptBreakdown("Photosynthesis Light & Dark Phases");',
      previewVideoType: 'Interactive Prompt & Logic Terminal'
    },
    logistics: {
      prerequisites: 'Basic computer literacy and interest in problem solving.',
      classFormat: 'Live mentor sessions, collaborative labs, and milestone reviews.',
      cohortStatus: 'Admissions Open • Official Course Fee: ₹10,000',
      pricingNote: 'Course Fee: ₹10,000 • Verified School Partnership Curriculum.'
    }
  },
  {
    id: 'ai-super-kids-ages-11-12',
    number: '03',
    officialSlug: 'ai-super-kids-grade-9-10',
    officialUrl: 'https://digitalghuru.com/courses/ai-super-kids-grade-9-10',
    title: 'AI Super Kids: AI Young Leaders',
    programName: 'AI Super Kids Program (Ages 11–12)',
    gradeBadge: 'Ages 11–12',
    ageGroup: 'Ages 11–12',
    price: '₹12,000',
    subtitle: 'Turn Real-World Problems into Responsible AI Prototypes',
    tagline: 'Explore key AI technologies, conduct user research, architect solutions, and build working AI prototypes.',
    level: 'Applied • Prototyping & Problem Solving',
    accent: {
      primary: 'teal',
      hex: '#0D9488',
      lightHex: '#F0FDFA',
      gradient: 'from-teal-600 to-emerald-600',
      border: 'border-teal-300',
      badgeBg: 'bg-teal-100 text-teal-900',
      text: 'text-teal-700',
    },
    cardImage: '/brand/card-g9-10.png',
    heroImage: '/brand/banner-g9-10.png',
    shortDescription: 'Master the Innovation Process: Problem & Users -> Solution Design -> Build Prototype -> Presentation. Combine generative APIs, computer vision, and logic automation.',
    fullDescription: 'The AI Young Leaders program turns pre-teens into creative problem solvers. Students identify real-world community, educational, and environmental challenges, harness cutting-edge AI APIs, and navigate the full project lifecycle: conducting user discovery, designing intuitive user experiences, developing functional prototypes, and delivering a polished presentation.',
    outcomes: [
      'Navigate the 4-stage Innovation Process from problem validation to final prototype',
      'Integrate natural language, computer vision, and automation APIs into working projects',
      'Build realistic solutions, user journey maps, and ethical compliance audits',
      'Deliver a polished 5-minute project pitch presentation with a live prototype demo'
    ],
    skillsGained: ['Product Thinking', 'API Integration', 'Research & Synthesis', 'Presentation Skills', 'Ethical AI Governance'],
    toolsMastered: ['OpenAI APIs', 'Canva Prototyping', 'Zapier Automation', 'Visual Logic Engines', 'Figma Prototyping'],
    modules: [
      {
        number: 'Module 01',
        title: 'AI Fundamentals & Language Models',
        duration: 'Lessons 1–2',
        topics: ['LLM architecture and prompts', 'Chaining instructions', 'How AI handles complex queries'],
        handsOnTask: 'Build a domain-specific quiz and research generator.'
      },
      {
        number: 'Module 02',
        title: 'Vision & Multimodal AI',
        duration: 'Lessons 3–4',
        topics: ['Computer vision APIs and multimodal tools', 'Image recognition parameters', 'Object classification'],
        handsOnTask: 'Design complete visual branding and prototype screens for a school solution.'
      },
      {
        number: 'Module 03',
        title: 'Automation & Workflow Logic',
        duration: 'Lessons 5–6',
        topics: ['Automating data flows with Zapier', 'Smart notifications', 'User feedback intake'],
        handsOnTask: 'Create an automated study reminder or student assistance bot.'
      },
      {
        number: 'Module 04',
        title: 'Problem Identification & Prototype Build',
        duration: 'Lessons 7–8',
        topics: ['Target user pain points', 'Wireframing the prototype', 'Technical feasibility'],
        handsOnTask: 'Construct the functional interactive prototype.'
      },
      {
        number: 'Module 05',
        title: 'Project Showcase & Demo Day',
        duration: 'Lessons 9–10',
        topics: ['Presenting your tech project', 'Live demo testing', 'Demo Day before mentors and peers'],
        handsOnTask: 'Deliver your AI prototype presentation and receive feedback.'
      }
    ],
    exampleProjects: [
      {
        title: 'CareLink: Senior Companion AI',
        summary: 'A project providing voice-first daily check-ins, gentle reminders, and family wellness updates for elders.',
        tag: 'Community AI Prototype',
        iconName: 'HeartHandshake',
        difficulty: 'Young Leader',
        previewUrl: '/brand/card-g9-10.png'
      },
      {
        title: 'SkillBridge: Peer Study Partner',
        summary: 'An intelligent helper that pairs classmates for study sessions based on topic strengths and availability.',
        tag: 'Student Productivity',
        iconName: 'Zap',
        difficulty: 'Young Leader',
        previewUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80'
      }
    ],
    simulationData: {
      interactiveDemoTitle: 'Young Leaders AI Workflow Builder',
      demoPrompt: 'Trigger: Student requests help with Grade 6 Science project on Renewable Energy.',
      demoOutput: 'Workflow Executed: 1. Outlined 3 clean energy topics (Solar, Wind, Hydro); 2. Generated interactive experiment instructions; 3. Summary emailed.',
      codeSnippet: '// DigitalGhuru Young Leaders Workflow\nconst projectPipeline = new DigitalGhuru.Workflow({\n  trigger: "ScienceProjectAssistance",\n  model: "gpt-4o-mini",\n  targetAge: "Ages 11-12"\n});\nawait projectPipeline.execute({\n  topic: "Renewable energy experiments",\n  format: "Step-by-step experiment"\n});',
      previewVideoType: 'Live AI Workflow Automation'
    },
    logistics: {
      prerequisites: 'Comfort with digital tools; curiosity to solve problems with technology.',
      classFormat: 'Studio accelerator, real project briefs, and live Demo Day.',
      cohortStatus: 'Admissions Open • Official Course Fee: ₹12,000',
      pricingNote: 'Course Fee: ₹12,000 • Includes project evaluation & completion certificate.'
    }
  }
];

export const LEARNING_JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Discover & Spark Curiosity',
    tagline: 'Understand the "Why"',
    description: 'Learners interact with live AI demos and unplugged games to demystify how artificial intelligence senses patterns.',
    outcome: 'Curiosity ignited without tech anxiety'
  },
  {
    step: '02',
    title: 'Interactive Guided Concepts',
    tagline: 'Hands-on Playground',
    description: 'Small cohort live sessions break complex data, vision, or prompt concepts into digestible, playful visual challenges.',
    outcome: 'Deep conceptual grasp of underlying logic'
  },
  {
    step: '03',
    title: 'Build Real-World Projects',
    tagline: 'From Consumer to Creator',
    description: 'Students code chatbots, train image classifiers, or produce digital books using kid-safe engineering toolkits.',
    outcome: 'Tangible portfolio of completed AI projects'
  },
  {
    step: '04',
    title: 'Share, Reflect & Celebrate',
    tagline: 'Demo Day & Feedback',
    description: 'Young creators present their inventions to parents and peers, reflecting on ethics, improvements, and real-world impact.',
    outcome: 'Confidence to speak and innovate with technology'
  }
];

export const DIGITALGHURU_BENEFITS = [
  {
    id: 'agency-style',
    title: 'Agency-Style Practical Learning',
    description: 'We replace textbook theory with real execution. Students work directly with industry tools, creative briefs, and genuine datasets.',
    icon: 'Hammer',
    accent: 'orange'
  },
  {
    id: 'school-partnership',
    title: 'Academic Partnership with Jaighurudeva',
    description: 'Developed in proud collaboration with Jaighurudeva Educational Academy, combining digital innovation with academic excellence.',
    icon: 'Award',
    accent: 'blue'
  },
  {
    id: 'responsible-ai',
    title: 'Strict Focus on Responsible AI & Safety',
    description: 'Every grade level incorporates ethical guardrails, data privacy, bias identification, and healthy digital screen-time habits.',
    icon: 'ShieldCheck',
    accent: 'teal'
  },
  {
    id: 'future-ready',
    title: 'Future-Ready Portfolio & Leadership',
    description: 'Students graduate with tangible achievements: from authored storybooks in Ages 6–8 to working project prototypes in Ages 11–12.',
    icon: 'Sparkles',
    accent: 'violet'
  }
];

export const DIGITALGHURU_CONTACT = {
  brandName: 'DigitalGhuru',
  parentCompany: 'Digital Ghuru & Jaighurudeva Educational Academy',
  phone: '+91 8825948859',
  email: 'contact@digitalghuru.com',
  officialWebsite: 'https://digitalghuru.com',
  campuses: [
    {
      name: 'Anna Nagar Campus (Chennai)',
      address: '45, A Block, 3rd Avenue, Kumaran Nagar, Anna Nagar East, Chennai - 600102'
    },
    {
      name: 'Korattur Campus (Chennai)',
      address: '2nd Floor, No. 1A, "Gurudev Complex", S1, 57th St, Venkatraman Nagar, Korattur, Chennai - 600050'
    },
    {
      name: 'Ameerpet Campus (Hyderabad)',
      address: 'F8, First Floor, Kallu Compound Rd, Pratap Nagar, Nagarjuna Nagar Colony, Ameerpet, Hyderabad - 500073'
    }
  ],
  socials: {
    facebook: 'https://www.facebook.com/share/1D1vTjqQWX/',
    instagram: 'https://www.instagram.com/digitalghuru?igsi=MWlqanV6MnZ4cW1vYg==',
    linkedin: 'https://linkedin.com/company/digitalghuru',
    twitter: 'https://x.com/digital_ghuru?s=20'
  }
};
