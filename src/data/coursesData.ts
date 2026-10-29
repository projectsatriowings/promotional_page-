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
    id: 'ai-super-kids-grades-1-6',
    number: '01',
    officialSlug: 'ai-super-kids-grades-1-6',
    officialUrl: 'https://digitalghuru.com/courses/ai-super-kids-grades-1-6',
    title: 'AI Super Kids: Early Explorers',
    programName: 'AI Super Kids Program (Grades 1–6)',
    gradeBadge: 'Grades 1–6',
    ageGroup: 'Ages 6 – 11',
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
    shortDescription: 'Designed specifically for early learners in Grades 1-6. Explore "What is AI?", smart machines in daily life, and author "My First AI Story" with safe digital habits.',
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
    id: 'ai-super-kids-grade-7-8',
    number: '02',
    officialSlug: 'ai-super-kids',
    officialUrl: 'https://digitalghuru.com/courses/ai-super-kids',
    title: 'AI Super Kids: AI Innovators',
    programName: 'AI Super Kids Program (Grades 7–8)',
    gradeBadge: 'Grades 7–8',
    ageGroup: 'Ages 12 – 14',
    price: '₹10,000',
    subtitle: 'Data Literacy, Responsible Research & Solution Design',
    tagline: 'A structured middle-school program for data literacy, responsible research, and practical AI solution prototyping.',
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
    fullDescription: 'The AI Innovators program empowers middle schoolers to advance from casual AI users into rigorous problem solvers. Grounded in our four core pillars—Data Literacy & Quality, Advanced Prompt Engineering, Responsible AI, and Solution Design—students learn how to analyze datasets, interrogate algorithmic bias, and design working AI prototypes for real school and community challenges.',
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
      demoPrompt: 'Create a 3-step study plan for 8th Grade Photosynthesis with interactive questions.',
      demoOutput: 'Step 1: Light Reactions (Chlorophyll absorbs solar energy) -> Step 2: Calvin Cycle (CO2 converted to Glucose) -> Checkpoint Quiz: "Why do plants release Oxygen?"',
      codeSnippet: '// DigitalGhuru Innovator Study Assistant\nimport { AssistantBuilder } from "@digitalghuru/ai-kids";\n\nconst studyBot = new AssistantBuilder({\n  gradeLevel: "Grade 7-8",\n  tone: "Socratic Mentor",\n  mode: "Hint-First-No-Cheating"\n});\nstudyBot.generateConceptBreakdown("Photosynthesis Light & Dark Phases");',
      previewVideoType: 'Interactive Prompt & Logic Terminal'
    },
    logistics: {
      prerequisites: 'Basic computer literacy and interest in problem solving.',
      classFormat: 'Live mentor sessions, agency-style collaborative labs, and milestone reviews.',
      cohortStatus: 'Admissions Open • Official Course Fee: ₹10,000',
      pricingNote: 'Course Fee: ₹10,000 • Verified School Partnership Curriculum.'
    }
  },
  {
    id: 'ai-super-kids-grade-9-10',
    number: '03',
    officialSlug: 'ai-super-kids-grade-9-10',
    officialUrl: 'https://digitalghuru.com/courses/ai-super-kids-grade-9-10',
    title: 'AI Super Kids: AI Entrepreneurs',
    programName: 'AI Super Kids Program (Grades 9–10)',
    gradeBadge: 'Grades 9–10',
    ageGroup: 'Ages 14 – 16',
    price: '₹12,000',
    subtitle: 'Turn Real-World Problems into Responsible AI Startups',
    tagline: 'Explore key AI technologies, conduct customer research, architect solutions, and pitch your own AI startup concept.',
    level: 'Applied • Product Design & Entrepreneurship',
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
    shortDescription: 'Master the Startup Development Process: Problem & Users -> Solution Design -> Build Prototype -> Startup Pitch. Combine generative APIs and business thinking.',
    fullDescription: 'The AI Entrepreneurs program turns teenagers into tech founders. Students identify real-world community, educational, and market challenges, harness cutting-edge AI APIs, and navigate the full startup lifecycle: conducting customer discovery, designing intuitive user experiences, developing functional prototypes, and delivering a polished pitch deck to industry mentors.',
    outcomes: [
      'Navigate the 4-stage Startup Development Process from problem validation to pitch',
      'Integrate natural language, computer vision, and automation APIs into working MVPs',
      'Build realistic business models, customer journey maps, and ethical compliance audits',
      'Deliver an investor-ready 5-minute startup pitch presentation with live demo'
    ],
    skillsGained: ['Product Management', 'API Integration', 'Market Discovery', 'Pitch Deck Design', 'Ethical AI Governance'],
    toolsMastered: ['OpenAI APIs', 'Midjourney', 'Zapier Automation', 'Canva Pitch Builder', 'Figma Prototyping'],
    modules: [
      {
        number: 'Module 01',
        title: 'AI Fundamentals & Language Models',
        duration: 'Lessons 1–2',
        topics: ['LLM architecture and API tokens', 'Prompt chaining and function calling', 'Enterprise AI landscapes'],
        handsOnTask: 'Build a domain-specific market analysis generator.'
      },
      {
        number: 'Module 02',
        title: 'Vision & Prompt Engineering',
        duration: 'Lessons 3–4',
        topics: ['Computer vision APIs and multimodal tools', 'Image generation parameters and brand assets'],
        handsOnTask: 'Design complete visual branding and product mockups for a startup idea.'
      },
      {
        number: 'Module 03',
        title: 'Research & AI Automation',
        duration: 'Lessons 5–6',
        topics: ['Automating data extraction with Zapier', 'Competitive landscape analysis', 'User interview synthesis'],
        handsOnTask: 'Create an automated lead enrichment or customer intake bot.'
      },
      {
        number: 'Module 04',
        title: 'Problem Identification & Solution Design',
        duration: 'Lessons 7–8',
        topics: ['Target customer pain points and value propositions', 'Wireframing the MVP', 'Technical feasibility'],
        handsOnTask: 'Construct the functional interactive MVP prototype.'
      },
      {
        number: 'Module 05',
        title: 'Startup Pitch & Final Project',
        duration: 'Lessons 9–10',
        topics: ['Storytelling for founders', 'Financial basics and unit economics', 'Live Pitch Day before guest mentors'],
        handsOnTask: 'Pitch your AI startup concept with working demo and deck.'
      }
    ],
    exampleProjects: [
      {
        title: 'CareLink: Senior Companion AI',
        summary: 'A startup prototype providing voice-first daily check-ins, medication reminders, and family wellness updates for elders.',
        tag: 'HealthTech Startup',
        iconName: 'HeartHandshake',
        difficulty: 'Entrepreneur',
        previewUrl: '/brand/card-g9-10.png'
      },
      {
        title: 'SkillBridge: Peer Tutoring Bot',
        summary: 'An intelligent platform that pairs high-school peers for study sessions based on diagnostic skill gaps and availability.',
        tag: 'EdTech MVP',
        iconName: 'Zap',
        difficulty: 'Entrepreneur',
        previewUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80'
      }
    ],
    simulationData: {
      interactiveDemoTitle: 'Startup MVP Automation Builder',
      demoPrompt: 'Customer Action: Student registers with difficulty in Grade 10 Trigonometry.',
      demoOutput: 'Automation Triggered: [Zapier -> OpenAI] 1. Diagnostic diagnostic test generated; 2. Matched with Mentor Aarav; 3. Personalized revision schedule emailed.',
      codeSnippet: '// DigitalGhuru Startup Workflow Automation\nconst startupPipeline = new DigitalGhuru.Workflow({\n  trigger: "NewStudentOnboarding",\n  enrichmentModel: "gpt-4o-mini",\n  destination: "AirtableCRM"\n});\nawait startupPipeline.execute({\n  problem: "Trigonometric ratios confusion",\n  grade: 10\n});',
      previewVideoType: 'Live Startup Workflow Automation'
    },
    logistics: {
      prerequisites: 'Comfort with digital tools; entrepreneurial mindset and curiosity to build solutions.',
      classFormat: 'Studio accelerator, real founder case studies, and live investor-style Pitch Day.',
      cohortStatus: 'Admissions Open • Official Course Fee: ₹12,000',
      pricingNote: 'Course Fee: ₹12,000 • Includes Startup Pitch Deck evaluation & demo certificate.'
    }
  },
  {
    id: 'ai-super-kids-grade-11-12',
    number: '04',
    officialSlug: 'ai-super-kids-grade-11-12',
    officialUrl: 'https://digitalghuru.com/courses/ai-super-kids-grade-11-12',
    title: 'AI Super Kids: AI Future Leaders',
    programName: 'AI Super Kids Program (Grades 11–12)',
    gradeBadge: 'Grades 11–12',
    ageGroup: 'Ages 16 – 18',
    price: '₹15,000',
    subtitle: 'Advanced Learning for Higher Ed, AI Careers & Tech Leadership',
    tagline: 'Master technical Python foundations, machine learning models, autonomous agents, and assemble a professional tech portfolio.',
    level: 'Advanced • Python, ML & Career Readiness',
    accent: {
      primary: 'violet',
      hex: '#7C3AED',
      lightHex: '#FAF5FF',
      gradient: 'from-violet-600 to-purple-600',
      border: 'border-violet-300',
      badgeBg: 'bg-violet-100 text-violet-900',
      text: 'text-violet-700',
    },
    cardImage: '/brand/card-g11-12.png',
    heroImage: '/brand/banner-g11-12.png',
    shortDescription: 'The "From Learning to Leadership" Pathway: LEARN -> DEVELOP -> BUILD -> LEAD. Master Python, ML algorithms, API agents, and complete an AI Capstone Portfolio.',
    fullDescription: 'Future Leaders is our premier technical accelerator for high school juniors, seniors, and college-bound students. Students master Python programming, train predictive machine learning algorithms, build multi-agent autonomous pipelines, and engineer a verified GitHub & LinkedIn portfolio that sets them apart for university admissions and tech careers.',
    outcomes: [
      'Master object-oriented Python, NumPy, Pandas, and machine learning libraries',
      'Train, fine-tune, and evaluate predictive regression and classification models',
      'Architect autonomous multi-agent pipelines connecting APIs and external databases',
      'Publish a verified GitHub code repository and professional LinkedIn portfolio'
    ],
    skillsGained: ['Python Syntax', 'Machine Learning', 'API Agent Architecture', 'GitHub Version Control', 'College & Career Readiness'],
    toolsMastered: ['Python 3', 'GitHub', 'Google Colab', 'OpenAI APIs', 'LinkedIn Networking'],
    modules: [
      {
        number: 'Module 01',
        title: 'Python & Data Fundamentals',
        duration: 'Lessons 1–2',
        topics: ['Data structures, lists, dictionaries, functions', 'NumPy arrays and Pandas dataframes', 'Data cleaning'],
        handsOnTask: 'Analyze a 5,000-row global climate and temperature dataset.'
      },
      {
        number: 'Module 02',
        title: 'AI & Machine Learning Foundations',
        duration: 'Lessons 3–4',
        topics: ['Supervised vs. unsupervised learning', 'Linear regression, decision trees, neural networks', 'Accuracy metrics'],
        handsOnTask: 'Train a predictive housing price model with Scikit-Learn.'
      },
      {
        number: 'Module 03',
        title: 'APIs, Automation & Agents',
        duration: 'Lessons 5–6',
        topics: ['REST APIs and JSON payloads', 'Autonomous multi-agent collaboration', 'Retrieval-Augmented Generation (RAG)'],
        handsOnTask: 'Build an autonomous research agent that synthesizes academic papers.'
      },
      {
        number: 'Module 04',
        title: 'Product Development & Strategy',
        duration: 'Lessons 7–8',
        topics: ['Full-stack integration with Streamlit and Flask', 'Managing latency and token costs', 'System security'],
        handsOnTask: 'Deploy an interactive cloud AI web dashboard.'
      },
      {
        number: 'Module 05',
        title: 'Career Readiness & Professional Skills',
        duration: 'Lessons 9–10',
        topics: ['Technical resumes, GitHub portfolio structuring, LinkedIn positioning, university admissions essays'],
        handsOnTask: 'Publish your professional tech portfolio and GitHub repository.'
      },
      {
        number: 'Module 06',
        title: 'The AI Capstone Project',
        duration: 'Lessons 11–12',
        topics: ['End-to-end model development, validation, ethics audit, and live public defense'],
        handsOnTask: 'Deliver the comprehensive AI Capstone graduation project.'
      }
    ],
    exampleProjects: [
      {
        title: 'MediScan: Clinical Note Classifier',
        summary: 'A Python and NLP pipeline that classifies unstructured clinical summaries to predict patient follow-up urgency.',
        tag: 'Machine Learning & Python',
        iconName: 'Terminal',
        difficulty: 'Future Leader',
        previewUrl: '/brand/card-g11-12.png'
      },
      {
        title: 'AutoResearch Autonomous Agent',
        summary: 'An autonomous multi-agent Python system that queries arXiv APIs, generates paper summaries, and visualizes research citation graphs.',
        tag: 'Agentic AI',
        iconName: 'Cpu',
        difficulty: 'Future Leader',
        previewUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80'
      }
    ],
    simulationData: {
      interactiveDemoTitle: 'Python ML Agent Terminal',
      demoPrompt: 'python train_agent.py --dataset="student_performance_2026" --epochs=20',
      demoOutput: 'Epoch 20/20 [==============================] - Loss: 0.0412 - Val_Accuracy: 96.8% -> Model exported to production/model.onnx. Agent ready for deployment.',
      codeSnippet: '# DigitalGhuru AI Future Leaders Pipeline\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\ndata = pd.read_csv("career_interest_dataset.csv")\nX_train, X_test, y_train, y_test = train_test_split(data.drop("career", axis=1), data["career"])\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\nprint(f"Model Accuracy: {model.score(X_test, y_test):.2%}")',
      previewVideoType: 'Live Python Machine Learning Terminal'
    },
    logistics: {
      prerequisites: 'Foundational programming familiarity (Python or basic logic); laptop capable of running browser notebooks.',
      classFormat: 'Advanced technical lab, code reviews by industry practitioners, and GitHub portfolio defense.',
      cohortStatus: 'Admissions Open • Official Course Fee: ₹15,000',
      pricingNote: 'Course Fee: ₹15,000 • Includes GitHub portfolio verification & university profile review.'
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
    description: 'Students graduate with tangible achievements: from authored storybooks in Grade 1 to working Python machine learning models in Grade 12.',
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
