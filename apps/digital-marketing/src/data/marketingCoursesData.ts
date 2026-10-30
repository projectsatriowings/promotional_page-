export interface MarketingModule {
  number: string;
  title: string;
  duration: string;
  topics: string[];
  toolsUsed: string[];
  handsOnTask: string;
}

export interface MarketingCourse {
  id: string;
  number: string;
  title: string;
  price: string;
  duration: string;
  format: string;
  badge: string;
  officialUrl: string;
  heroImage: string;
  cardImage: string;
  shortDescription: string;
  fullDescription: string;
  keyOutcomes: string[];
  targetAudience: string[];
  tools: string[];
  modules: MarketingModule[];
}

export const MARKETING_COURSES: MarketingCourse[] = [
  {
    id: 'ai-powered-digital-marketing',
    number: '01',
    title: 'AI-Powered Digital Marketing Course',
    price: '₹25,000',
    duration: '3 Months (Weekend & Weekday Batches)',
    format: 'Hybrid (Campuses in Chennai, Hyderabad & Live Online)',
    badge: 'Flagship Certification • 100% Placement',
    officialUrl: 'https://digitalghuru.com/courses/ai-powered-digital-marketing',
    heroImage: '/brand/dm-banner.jpg',
    cardImage: '/brand/dm-card.png',
    shortDescription: 'Master modern digital marketing combined with AI tools like ChatGPT, Midjourney, and Zapier. 12 comprehensive modules covering SEO, Paid Ads, Social Media, Automation, and 100% placement support.',
    fullDescription: 'Digital Ghuru’s flagship certification combines deep marketing strategy with cutting-edge AI acceleration. You will move beyond basic social posting and learn how top marketing agencies generate leads, run profitable paid ad campaigns on Meta and Google, rank on search engines with technical SEO, and automate multi-channel campaigns using AI.',
    keyOutcomes: [
      'Master prompt engineering for marketing: copy, design briefs, audience personas, and campaign schedules',
      'Manage live ad budgets on Meta Ads Manager and Google Ads with data-driven ROAS optimization',
      'Conduct complete technical SEO audits using Semrush, Google Search Console, and Google Analytics 4',
      'Build automated lead capture funnels connecting landing pages, CRMs, and email sequences via Zapier'
    ],
    targetAudience: [
      'College Graduates seeking high-paying digital marketing roles',
      'Working Professionals transitioning into AI and growth marketing',
      'Entrepreneurs & Business Owners scaling their own brand revenue',
      'Freelancers aiming for international high-ticket client retainers'
    ],
    tools: [
      'OpenAI (ChatGPT)', 'Midjourney', 'Google Ads', 'Meta Ads Manager', 
      'Semrush', 'Google Analytics 4', 'Zapier', 'WordPress', 'Canva Pro', 'Mailchimp'
    ],
    modules: [
      {
        number: 'Module 01',
        title: 'Audience Research & Consumer Psychology',
        duration: 'Week 1',
        topics: ['Customer empathy maps', 'Buyer persona generation with AI', 'Competitor keyword intelligence'],
        toolsUsed: ['Semrush', 'ChatGPT', 'Google Trends'],
        handsOnTask: 'Build an exhaustive audience dossier for a real D2C retail client.'
      },
      {
        number: 'Module 02',
        title: 'AI Content Mastery & Copywriting',
        duration: 'Week 2',
        topics: ['High-converting ad copy frameworks (AIDA, PAS)', 'AI image prompting for ad creative', 'Content calendar automation'],
        toolsUsed: ['ChatGPT', 'Midjourney', 'Claude'],
        handsOnTask: 'Generate 15 multi-format creative assets and copy variations for a live product launch.'
      },
      {
        number: 'Module 03',
        title: 'Social Media Strategy & Community Growth',
        duration: 'Week 3',
        topics: ['Algorithm mechanics of organic platforms', 'Video hook generation', 'Brand voice guidelines'],
        toolsUsed: ['Canva', 'Metricool', 'CapCut'],
        handsOnTask: 'Design a 30-day viral content blueprint for a tech startup.'
      },
      {
        number: 'Module 04',
        title: 'Instagram & Viral Reel Marketing',
        duration: 'Week 4',
        topics: ['Viral reel scripting and pacing', 'Hashtag architecture & shadowban avoidance', 'Influencer outreach'],
        toolsUsed: ['Meta Creator Studio', 'AI Scripting Tools'],
        handsOnTask: 'Execute an Instagram growth sprint measuring reach and engagement.'
      },
      {
        number: 'Module 05',
        title: 'LinkedIn Marketing & B2B Lead Generation',
        duration: 'Week 5',
        topics: ['Executive personal branding', 'High-ticket B2B outreach messaging', 'Company page SEO'],
        toolsUsed: ['LinkedIn Sales Navigator', 'AI Personalization'],
        handsOnTask: 'Launch a direct B2B lead generation workflow targeting CMOs and founders.'
      },
      {
        number: 'Module 06',
        title: 'Landing Pages & Conversion Funnels',
        duration: 'Week 6',
        topics: ['Hero wireframing and conversion copywriting', 'Form friction reduction', 'A/B split testing'],
        toolsUsed: ['WordPress', 'Elementor', 'Hotjar'],
        handsOnTask: 'Design and publish a mobile-responsive landing page with lead magnets.'
      },
      {
        number: 'Module 07',
        title: 'Marketing Automation & CRM Workflows',
        duration: 'Week 7',
        topics: ['Trigger-based email sequences', 'Zapier webhook connections', 'Lead scoring in CRM'],
        toolsUsed: ['Zapier', 'Mailchimp', 'HubSpot'],
        handsOnTask: 'Automate a 5-step abandoned lead nurturing email sequence.'
      },
      {
        number: 'Module 08',
        title: 'Facebook & Instagram Paid Ads (Meta)',
        duration: 'Week 8',
        topics: ['Meta Business Manager setup and pixel tracking', 'Lookalike and Custom Audiences', 'Scaling winning ad sets'],
        toolsUsed: ['Meta Ads Manager', 'Pixel Helper'],
        handsOnTask: 'Deploy live ad campaigns with real budgets and analyze Cost Per Acquisition.'
      },
      {
        number: 'Module 09',
        title: 'Website Development for Marketers',
        duration: 'Week 9',
        topics: ['CMS architecture and domain hosting', 'Speed optimization & Core Web Vitals', 'Tracking tag insertion'],
        toolsUsed: ['WordPress', 'Google Tag Manager'],
        handsOnTask: 'Set up an end-to-end e-commerce or agency showcase website.'
      },
      {
        number: 'Module 10',
        title: 'Search Engine Optimization (SEO)',
        duration: 'Week 10',
        topics: ['Keyword intent clustering', 'On-page schema markup', 'Backlink acquisition and digital PR'],
        toolsUsed: ['Semrush', 'Google Search Console', 'Ahrefs'],
        handsOnTask: 'Perform a full technical SEO audit and rank a target pillar page.'
      },
      {
        number: 'Module 11',
        title: 'Search Engine Marketing (Google Ads)',
        duration: 'Week 11',
        topics: ['High-intent search campaigns', 'Negative keyword management', 'Performance Max (PMax) strategies'],
        toolsUsed: ['Google Ads', 'Google Keyword Planner'],
        handsOnTask: 'Build search ad campaigns targeting high-intent commercial keywords.'
      },
      {
        number: 'Module 12',
        title: 'Digital Design & Portfolio Presentation',
        duration: 'Week 12',
        topics: ['Client reporting dashboards', 'Agency-style pitch deck presentation', 'Resume and interview prep'],
        toolsUsed: ['Google Looker Studio', 'Canva'],
        handsOnTask: 'Defend your live campaign capstone portfolio before hiring managers.'
      }
    ]
  },
  {
    id: 'post-graduate-ai-marketing',
    number: '02',
    title: 'Post Graduate Program in AI Marketing & Growth',
    price: '₹45,000',
    duration: '6 Months (Intensive Diploma with Agency Internship)',
    format: 'Full-time / Weekend Immersion',
    badge: 'Advanced Diploma • Guaranteed Internship',
    officialUrl: 'https://digitalghuru.com/about-us',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Comprehensive 6-month career accelerator featuring 50+ industry tools, live client internships, agency-style weekly evaluations, and guaranteed interview placements.',
    fullDescription: 'The Post Graduate Program is designed for ambitious graduates and career switchers looking to enter marketing leadership. Working directly in an agency simulator, students handle real client budgets, run omnichannel campaigns, and build a defensible growth portfolio.',
    keyOutcomes: [
      'Master 50+ marketing, analytics, and AI workflow tools',
      'Manage live brand budgets through guaranteed agency internships',
      'Build automated multi-channel growth systems',
      'Direct interview access with 100+ hiring agency partners'
    ],
    targetAudience: ['Career switchers', 'Recent college graduates', 'Marketing professionals seeking promotion'],
    tools: ['Semrush', 'Google Analytics 4', 'Meta Ads', 'Google Ads', 'Zapier', 'Midjourney', 'Looker Studio'],
    modules: [
      {
        number: 'Stage 1',
        title: 'Full-Funnel Strategic Foundations',
        duration: 'Month 1–2',
        topics: ['Market research and consumer psychology', 'AI content architecture', 'SEO and organic authority'],
        toolsUsed: ['Semrush', 'ChatGPT', 'WordPress'],
        handsOnTask: 'Formulate an end-to-end go-to-market plan for an enterprise client.'
      },
      {
        number: 'Stage 2',
        title: 'Performance Marketing & Paid Acquisition',
        duration: 'Month 3–4',
        topics: ['Meta, Google, and LinkedIn paid media', 'Conversion rate optimization (CRO)', 'Budget scaling'],
        toolsUsed: ['Meta Ads Manager', 'Google Ads', 'Hotjar'],
        handsOnTask: 'Manage real ad spend on live agency accounts with ROAS targets.'
      },
      {
        number: 'Stage 3',
        title: 'Agency Internship & Capstone Defense',
        duration: 'Month 5–6',
        topics: ['Live client internship placement', 'Advanced growth reporting', 'Executive interview preparation'],
        toolsUsed: ['Looker Studio', 'Zapier', 'HubSpot'],
        handsOnTask: 'Present complete ROI audit to client stakeholders.'
      }
    ]
  },
  {
    id: 'performance-marketing-bootcamp',
    number: '03',
    title: 'Performance Marketing & Paid Ads Mastery',
    price: '₹18,000',
    duration: '6 Weeks (Fast-Track Weekend Lab)',
    format: 'Live Interactive Studio Lab',
    badge: 'Specialist Bootcamp • High-ROI Media Buying',
    officialUrl: 'https://digitalghuru.com/courses/ai-powered-digital-marketing',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Laser-focused media buying bootcamp. Master Meta Ads Manager, Google Performance Max, conversion tracking pixels, custom audience lookalikes, and unit economics.',
    fullDescription: 'Designed for marketers who want to become elite media buyers. Learn how to structure scalable campaigns, audit attribution tracking, write high-converting AI hooks, and scale profitable client accounts.',
    keyOutcomes: [
      'Set up bulletproof server-side tracking (CAPI) and Google Tag Manager',
      'Optimize ad accounts for maximum Return On Ad Spend (ROAS)',
      'Scale ad budgets profitably without account performance drops',
      'Build automated reporting dashboards for clients'
    ],
    targetAudience: ['Media buyers', 'E-commerce store owners', 'Agency account managers'],
    tools: ['Meta Ads Manager', 'Google Ads', 'Google Tag Manager', 'Looker Studio', 'Midjourney'],
    modules: [
      {
        number: 'Week 1–2',
        title: 'Tracking, Pixels & CAPI Architecture',
        duration: 'Week 1–2',
        topics: ['Conversions API (CAPI)', 'Event tracking with GTM', 'Attribution models'],
        toolsUsed: ['Google Tag Manager', 'Meta Pixel Helper'],
        handsOnTask: 'Audit and repair a broken multi-channel attribution pixel.'
      },
      {
        number: 'Week 3–4',
        title: 'Meta Ads Precision & Creative Scaling',
        duration: 'Week 3–4',
        topics: ['Dynamic creative testing', 'Broad targeting vs Lookalikes', 'AI-generated ad iterations'],
        toolsUsed: ['Meta Ads Manager', 'Midjourney', 'Canva'],
        handsOnTask: 'Launch a 3-tier prospecting, engagement, and retargeting funnel.'
      },
      {
        number: 'Week 5–6',
        title: 'Google PMax & ROAS Scaling',
        duration: 'Week 5–6',
        topics: ['Performance Max asset groups', 'Negative keyword lists', 'Budget scaling rules'],
        toolsUsed: ['Google Ads', 'Looker Studio'],
        handsOnTask: 'Scale a live ad account budget by 200% while sustaining target ROAS.'
      }
    ]
  }
];

export const MARKETING_WHY_POINTS = [
  {
    title: 'Agency-Style Practical Learning',
    description: 'Real client briefs, live advertising budgets, and genuine client reporting dashboards rather than textbook theory.',
    icon: 'Briefcase'
  },
  {
    title: 'AI-Integrated Fast Execution',
    description: 'Learn to use ChatGPT, Midjourney, Claude, and Zapier to create campaigns in minutes that previously took entire teams days.',
    icon: 'Sparkles'
  },
  {
    title: '100% Placement & Freelance Support',
    description: 'Dedicated placement cell offering mock interviews, AI-optimized resumes, portfolio reviews, and direct hiring partner referrals.',
    icon: 'Trophy'
  },
  {
    title: 'Academic Partnership with Jaighurudeva',
    description: 'In proud collaboration with Jaighurudeva Educational Academy, combining digital industry expertise with academic prestige.',
    icon: 'Award'
  }
];

export const MARKETING_STATS = [
  { number: '500+', label: 'Students Trained' },
  { number: '100%', label: 'Placement Support' },
  { number: '15+', label: 'Industry AI Tools' },
  { number: '3', label: 'Physical Campuses' }
];

export const MARKETING_FAQS = [
  {
    q: 'Do I need prior marketing or technical experience to enroll?',
    a: 'No prior experience is necessary. Our AI-Powered Digital Marketing Course starts from fundamental consumer psychology and audience discovery before advancing to AI tools, SEO, and paid performance advertising.'
  },
  {
    q: 'How does the placement assistance work?',
    a: 'Our dedicated placement cell provides resume optimization with AI, LinkedIn personal branding, portfolio website reviews, mock technical and HR interviews, and direct interviews with our network of digital agencies and corporate hiring partners.'
  },
  {
    q: 'What is the schedule and batch timings?',
    a: 'We offer flexible weekend batches (Saturday & Sunday) and weekday batches (morning and evening slots) across our Chennai and Hyderabad campuses, as well as live interactive online streaming.'
  },
  {
    q: 'Do students work on real budgets and live client campaigns?',
    a: 'Yes! Students participate in agency-style simulations where they deploy real ad campaigns on Meta and Google, perform live SEO audits with Semrush, and build functional lead funnels.'
  }
];

