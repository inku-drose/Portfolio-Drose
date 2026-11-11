export type ProfileId = 'scientist' | 'builder' | 'full';

export interface Profile {
  id: ProfileId;
  name: string;
  descriptor: string;
  bestFor: string;
  image: string;
  imageAlt: string;
}

export const profiles: Profile[] = [
  {
    id: 'scientist',
    name: 'The Scientist',
    descriptor: 'CRYO-EM · STRUCTURAL BIOLOGY · FACILITY OPERATIONS',
    bestFor: 'For researchers and collaborators',
    image: '/assets/drose-shane-cryo-em-specialist-profile.webp',
    imageAlt: 'Cryo-electron microscope and a blue molecular structure',
  },
  {
    id: 'builder',
    name: 'The Builder',
    descriptor: 'WEB APPS · DIGITAL SYSTEMS · AUTOMATION',
    bestFor: 'For anyone who needs a website or web app',
    image: '/assets/drose-shane-digital-systems-builder-profile.webp',
    imageAlt: 'Laptop displaying digital dashboards and workflow tools',
  },
  {
    id: 'full',
    name: 'The Full Story',
    descriptor: 'SCIENCE × DIGITAL × IMPACT',
    bestFor: 'Start here for the complete picture',
    image: '/assets/drose-shane-full-story-profile.webp',
    imageAlt: 'Molecular science connected to digital data systems',
  },
];

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  eyebrow: string;
  synopsis: string;
  problem: string;
  features: string[];
  impact: string;
  tags: string[];
  liveUrl: string;
  artwork: 'accem' | 'tem' | 'microtome' | 'facs';
}

export const projects: PortfolioProject[] = [
  {
    id: 'accem',
    title: 'ACCEM Facility Portal',
    category: 'Facility Operations',
    eyebrow: 'CRYO-EM FACILITY · OPERATIONS',
    synopsis:
      'An all-in-one operations portal for the Advanced Centre for Cryo-Electron Microscopy at IISc.',
    problem:
      'A national facility serving academic and industry users needs one place to manage instrument slots, user billing, and grid inventory, with clear oversight for administrators.',
    features: [
      'Instrument slot booking and queue management',
      'Administrator workflows and user records',
      'Billing, charge-sheet generation, and revenue reports',
      'Grid inventory tracking',
    ],
    impact:
      'Brings booking, billing, and inventory into one system for 180+ registered users, giving the facility real-time visibility into usage and revenue.',
    tags: [
      'Facility scheduling',
      'Grid inventory',
      'Billing',
      'Charge sheets',
      'Revenue reporting',
    ],
    liveUrl: 'https://accem-m4gy.onrender.com/',
    artwork: 'accem',
  },
  {
    id: 'tem',
    title: 'TEM Booking Terminal',
    category: 'Instrument Scheduling',
    eyebrow: 'INSTRUMENT SLOTS · BOOKING WORKFLOW',
    synopsis:
      'A structured booking system for TEM and ultramicrotome sessions.',
    problem:
      'Instrument slots were managed in a shared, first-come-first-served spreadsheet, which made fair access and timed working windows hard to enforce.',
    features: [
      'TEM slot scheduling',
      'Ultramicrotome slot scheduling',
      'Timed working windows',
    ],
    impact:
      'Replaces the shared spreadsheet with a structured booking flow that enforces working windows and makes slot availability clear to every user.',
    tags: [
      'TEM',
      'Ultramicrotomy',
      'Slot scheduling',
      'Working windows',
    ],
    liveUrl: 'https://tem-booking-page-tapo.onrender.com/',
    artwork: 'tem',
  },
  {
    id: 'microtome',
    title: 'Histopathology Facility Booking',
    category: 'Facility Scheduling',
    eyebrow: 'HISTOPATHOLOGY · FACILITY BOOKING',
    synopsis:
      'Slot booking for individual histopathology instruments, with the required user forms built in.',
    problem:
      'Researchers need to choose a specific instrument, book within set time windows, and submit the facility’s user forms, ideally in a single step.',
    features: [
      'Per-instrument slot booking',
      'Timed booking windows',
      'Built-in user forms',
    ],
    impact:
      'Combines instrument selection, timed booking, and user forms into one guided workflow.',
    tags: [
      'Histopathology',
      'Instrument booking',
      'Time windows',
      'User forms',
    ],
    liveUrl: 'https://microtome.onrender.com/',
    artwork: 'microtome',
  },
  {
    id: 'facs',
    title: 'FACS Booking Portal',
    category: 'Instrument Scheduling',
    eyebrow: 'MULTI-ROUTE BOOKING · LIVE CALENDARS',
    synopsis:
      'A flow cytometry booking portal that brings online bookings and bookings from a separate booking window into one live calendar.',
    problem:
      'Bookings arriving through two different routes need a shared live calendar, consistent user forms, and operator controls to avoid clashes.',
    features: [
      'Live calendars',
      'Online and separate-window booking',
      'Form-based booking requests',
      'Operator-assisted booking controls',
    ],
    impact:
      'Unifies both booking routes in one live calendar, with user forms and operator controls that keep every booking coordinated.',
    tags: [
      'Flow cytometry',
      'Live calendars',
      'Multi-route booking',
      'User forms',
      'Operator-assisted controls',
    ],
    liveUrl: 'https://facs-iisc.onrender.com/booking.html',
    artwork: 'facs',
  },
];

export interface ResearchProject {
  id: string;
  degree: string;
  title: string;
  methods: string[];
  tags: string[];
}

export const researchProjects: ResearchProject[] = [
  {
    id: 'alpha-hemolysin',
    degree: 'MASTER’S THESIS',
    title: 'Structural and Functional Evaluation of Mutated Alpha Hemolysin using Cryo-EM',
    methods: [
      'Purified recombinant alpha-hemolysin by Ni-NTA affinity and size-exclusion chromatography (SEC).',
      'Compared mutant and wild-type assemblies using negative-stain TEM and cryo-EM single-particle analysis (SPA).',
    ],
    tags: ['Protein purification', 'NS-TEM', 'Cryo-EM SPA'],
  },
  {
    id: 'phage-proteins',
    degree: 'M.TECH · ADDITIONAL PROJECT',
    title: 'Cloning & Expression of Phage Proteins in Pseudomonas aeruginosa',
    methods: [
      'Cloned and expressed phage proteins in a bacterial host system.',
      'Used fluorescence microscopy of phage-infected cells to track morphological changes in the bacterial host.',
    ],
    tags: ['Cloning', 'Fluorescence microscopy', 'Phage biology'],
  },
  {
    id: 'aegle-marmelos',
    degree: 'BACHELOR’S PROJECT',
    title: 'Pharmacoinformatics Screening of Aegle marmelos Phytochemicals for IBS Targets',
    methods: [
      'Optimised Soxhlet extraction of phytochemicals from Aegle marmelos leaves.',
      'Screened the phytocompounds against IBS targets by molecular docking and simulation; published in the Journal of Computational Biophysics and Chemistry (2023).',
    ],
    tags: ['Soxhlet extraction', 'Molecular docking', 'Molecular simulation'],
  },
];

export interface Moment {
  title: string;
  label: string;
  description: string;
  icon: string;
  tone: 'cyan' | 'violet' | 'blue' | 'green';
}

export const topMoments: Moment[] = [
  {
    title: 'Inside the Cryo-EM workflow',
    label: 'SCIENTIFIC PRACTICE',
    description:
      'From sample preparation and grid freezing to acquisition and data management.',
    icon: '◉',
    tone: 'cyan',
  },
  {
    title: 'Facility operations, connected',
    label: 'SYSTEMS THINKING',
    description:
      'Designing digital workflows around the practical needs of shared scientific facilities.',
    icon: '⌘',
    tone: 'violet',
  },
  {
    title: 'Instruments meet workflows',
    label: 'INSTRUMENTATION',
    description:
      'Experience across electron microscopes, sample preparation equipment, and facility tools.',
    icon: '⌬',
    tone: 'blue',
  },
  {
    title: 'Science shared with others',
    label: 'TEACHING & OUTREACH',
    description:
      'Teaching-assistant experience for an NPTEL cryo-EM course and involvement in scientific outreach.',
    icon: '✳',
    tone: 'green',
  },
];

export const toolkit = [
  {
    title: 'Cryo-EM practice',
    description:
      'Sample preparation, grid freezing, single-particle acquisition, and cryo-electron tomography.',
    tags: ['Sample preparation', 'Grid freezing', 'SPA', 'Cryo-ET'],
    tone: 'cyan',
  },
  {
    title: 'Digital development',
    description:
      'I begin by mapping exactly what slows people down, and where. With AI-assisted development, I turn that understanding into working tools and take them all the way to deployment and everyday use.',
    tags: ['Problem-first design', 'AI-assisted development', 'Built to deployment'],
    tone: 'violet',
  },
  {
    title: 'People-first problem solving',
    description:
      'I start with the people doing the work: what is difficult, what takes too long, and what would make their day easier. The goal is a tool people actually use, not technology for its own sake.',
    tags: ['User needs first', 'Less manual effort', 'Practical impact'],
    tone: 'blue',
  },
  {
    title: 'Instruments',
    description:
      'Experience with cryo-EM microscopes and sample preparation instrumentation.',
    tags: [
      'Talos Arctica 200 kV',
      'Talos L120C',
      'Vitrobot Mark IV',
      'Leica EM GP2',
      'Pelco easiGLOW',
    ],
    tone: 'green',
  },
  {
    title: 'Software',
    description:
      'Image processing and instrument software used in cryo-EM workflows.',
    tags: ['RELION', 'CryoSPARC', 'cisTEM', 'Gatan software'],
    tone: 'cyan',
  },
];

export const careerExperience = [
  {
    label: 'CURRENT ROLE',
    title: 'Cryo-EM Technical Specialist & Facility Manager',
    organization:
      'Advanced Centre for Cryo Electron Microscopy · Indian Institute of Science, Bengaluru',
    detail:
      'Since 2023, supporting 30+ active users and 85+ EMDB-deposited structures, with data reaching 2.8 Å resolution.',
    responsibilities: [
      'Run day-to-day operations of a national cryo-EM facility for academic and industry users',
      'Maintain the Talos Arctica and Talos L120C at 95% uptime, coordinating Thermo Fisher and Gatan service',
      'Screen grids, optimise vitrification, and have trained 50+ users in cryo-EM workflows',
      'Oversee data storage and transfer, LN2 supply, consumables, and facility safety',
    ],
  },
];

export const teachingTrainingVolunteering = [
  {
    role: 'TEACHING ASSISTANT',
    title:
      'Fundamentals of Cryo-Electron Microscopy (Cryo-EM) and 3D Image Processing in Structural Biology',
    organization: 'NPTEL · IISc Bengaluru',
    year: '2025–2026',
  },
  {
    role: 'STUDENT VOLUNTEER',
    title: 'Electron microscopy training programme',
    organization: 'Electron Microscope Society of India (EMSI)',
    year: '2025',
  },
  {
    role: 'STUDENT VOLUNTEER',
    title:
      'EMBO Practical Course on Cryo-Electron Microscopy and 3D Image Processing (CEM3DIP)',
    organization: 'European Molecular Biology Organization (EMBO)',
    year: '2024',
  },
];

export const education = [
  {
    label: 'MASTER’S DEGREE',
    title: 'M.Tech in Biotechnology',
    organization: 'Kalasalingam Academy of Research and Education',
    specialization: 'Biotechnology',
    years: '2022–2024',
    gpa: '9.17 / 10 CGPA',
  },
  {
    label: 'BACHELOR’S DEGREE',
    title: 'B.Tech in Biotechnology',
    organization: 'Kalasalingam Academy of Research and Education',
    specialization: 'Biotechnology',
    years: '2018–2022',
    gpa: '8.7 / 10 CGPA',
  },
];

export const educationAchievements = [
  {
    title: 'University Gold Medalist',
    detail: 'M.Tech in Biotechnology',
  },
];

export const cryoEmPractice = {
  samplePreparation: [
    {
      category: 'Negative-stain screening (NS-TEM)',
      details: ['Talos L120C', 'Pelco easiGLOW'],
    },
    {
      category: 'Vitrification',
      details: ['Vitrobot Mark IV', 'Leica EM GP2', 'VitriFlex'],
    },
  ],
  dataCollection: [
    {
      category: 'Microscopes & software',
      details: ['Talos Arctica 200 kV', 'EPU', 'Latitude (Gatan)'],
    },
    {
      category: 'Acquisition methods',
      details: ['Single-particle analysis (SPA)', 'Cryo-electron tomography (cryo-ET)'],
    },
  ],
  processing: [
    {
      category: 'Image processing',
      details: ['RELION', 'CryoSPARC', 'cisTEM', 'EMAN'],
    },
    {
      category: 'Model building & validation',
      details: ['UCSF ChimeraX', 'Coot', 'Phenix', 'MolProbity'],
    },
  ],
};

export const websiteBuildingStory = {
  title: 'Why I build tools',
  description:
    'Running a shared facility showed me how much time goes into scheduling, billing, and record-keeping that software could handle. I started building tools to remove that friction for my own facility, and that work now continues as Tekvara Studio, building websites and web apps for clients of every size.',
};

export const studio = {
  name: 'Tekvara Studio',
  url: 'https://tekvara-studio.onrender.com/',
  estimateUrl: 'https://tekvara-studio.onrender.com/#estimate',
  whatsappUrl: 'https://wa.me/917826032427',
};

export interface HighlightStat {
  value: string;
  label: string;
}

export const highlightStats: Record<ProfileId, HighlightStat[]> = {
  scientist: [
    { value: '85+', label: 'EMDB-deposited structures supported' },
    { value: '2.8 Å', label: 'Best resolution from facility data' },
    { value: '30+', label: 'Active academic and industry users' },
    { value: '50+', label: 'Users trained in cryo-EM workflows' },
  ],
  builder: [
    { value: '4', label: 'Live systems in daily use at IISc facilities' },
    { value: '180+', label: 'Registered users on the ACCEM portal' },
    { value: '₹4,999', label: 'Websites from, with a fixed quote first' },
    { value: '30 days', label: 'Free support after every launch' },
  ],
  full: [
    { value: '85+', label: 'EMDB-deposited structures supported' },
    { value: '2.8 Å', label: 'Best resolution from facility data' },
    { value: '4', label: 'Live web systems built for IISc facilities' },
    { value: '180+', label: 'Registered users on the ACCEM portal' },
  ],
};

export interface ServicePackage {
  category: string;
  name: string;
  price: string;
  timeline: string;
  highlights: string[];
  badge?: string;
}

// Keep these prices in sync with public/rate-card.html.
export const servicePackages: ServicePackage[] = [
  {
    category: 'Personal',
    name: 'Landing page',
    price: '₹4,999',
    timeline: '3–5 days',
    highlights: ['One scrolling page for an offer or event', 'Contact form and social links'],
  },
  {
    category: 'Personal',
    name: 'Portfolio website',
    price: '₹7,999',
    timeline: '1–2 weeks',
    highlights: ['Up to 6 sections with custom design', 'Resume download and project gallery'],
  },
  {
    category: 'Business',
    name: 'Business website',
    price: '₹14,999',
    timeline: '2–3 weeks',
    highlights: ['Up to 8 pages', 'Enquiry form, Google Maps, and WhatsApp button'],
    badge: 'Most popular',
  },
  {
    category: 'E-commerce',
    name: 'Starter online store',
    price: '₹29,999',
    timeline: '3–5 weeks',
    highlights: ['Up to 50 products with cart and checkout', 'UPI, card, and net-banking payments'],
    badge: 'Best value',
  },
  {
    category: 'E-commerce',
    name: 'Advanced online store',
    price: '₹69,999',
    timeline: '6–10 weeks',
    highlights: ['Unlimited products, variants, and coupons', 'Customer accounts and sales reports'],
  },
  {
    category: 'Web app',
    name: 'Booking system',
    price: '₹34,999',
    timeline: '4–6 weeks',
    highlights: ['Live calendars, time slots, and approvals', 'Admin dashboard with Excel export'],
  },
  {
    category: 'Web app',
    name: 'Custom management system',
    price: '₹99,999',
    timeline: '8–12 weeks',
    highlights: ['Bookings, billing, invoices, and charge sheets', 'Inventory and revenue reports'],
  },
];

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  details: string;
  url?: string;
  status?: string;
}

export const publications: Publication[] = [
  {
    title:
      'A unified cryo-EM workflow for high-resolution characterization of liposomes and cargo-loaded liposomes',
    authors: 'Drose Ignatious Shane, A. Chatterjee, P. P. Das, et al.',
    venue: 'Small',
    year: '2026',
    details: 'First author',
    status: 'In revision',
  },
  {
    title:
      'In Silico Analysis of Phytocompounds from Aegle marmelos Against Potential Targets of Irritable Bowel Syndrome',
    authors:
      'Gopikrishna Gopakumar, Bhavani Ramesh, Drose Ignatious Shane Michaelson, Selvaraj Kunjiappan, Shanmugampillai Jeyarajaguru Kabilan, and Parasuraman Pavadai',
    venue: 'Journal of Computational Biophysics and Chemistry',
    year: '2023',
    details: 'Volume 22, Issue 7, Pages 863–879',
    url: 'https://doi.org/10.1142/S273741652350045X',
  },
  {
    title:
      'Docking simulation and ADMET prediction based investigation on the phytochemical constituents of Noni (Morinda citrifolia) fruit as a potential anticancer drug',
    authors:
      'Kaliraj Chandran, Drose Ignatious Shane, Azar Zochedh, Asath Bahadur Sultan, and Thandavarayan Kathiresan',
    venue: 'In Silico Pharmacology',
    year: '2022',
    details: 'Volume 10, Issue 1, Article 14',
    url: 'https://doi.org/10.1007/s40203-022-00130-4',
  },
];

export const profileContent = {
  scientist: {
    intro:
      'I manage a national cryo-EM facility at IISc Bengaluru, running the instruments, workflows, and user support behind high-resolution structural biology.',
    projectTitle: 'Research projects',
    projectKicker: 'ACADEMIC RESEARCH',
    projectNote: 'From protein purification and cryo-EM to pharmacoinformatics.',
  },
  builder: {
    intro:
      'As founder of Tekvara Studio, I build portfolios, business websites, online stores, and custom web apps, including booking and billing systems running in research facilities at IISc.',
    projectTitle: 'Live websites & digital projects',
    projectKicker: 'TOOLS BUILT FROM FACILITY NEEDS',
    projectNote: 'Live facility websites and booking systems.',
  },
  full: {
    intro:
      'A biotechnologist by training and a cryo-EM specialist by profession. I run facility operations at IISc and, through Tekvara Studio, build the websites and web apps that help people and facilities work better.',
    projectTitle: 'Research & digital projects',
    projectKicker: 'SCIENCE MEETS DIGITAL PRACTICE',
    projectNote: 'Research projects and facility websites built around real scientific workflows.',
  },
} satisfies Record<ProfileId, {
  intro: string;
  projectTitle: string;
  projectKicker: string;
  projectNote: string;
}>;

export function projectOrderForProfile(profile: ProfileId): PortfolioProject[] {
  if (profile === 'scientist') {
    return [...projects].sort(
      (a, b) =>
        ['accem', 'facs', 'microtome', 'tem'].indexOf(a.id) -
        ['accem', 'facs', 'microtome', 'tem'].indexOf(b.id),
    );
  }
  if (profile === 'builder') {
    return [...projects].sort(
      (a, b) =>
        ['tem', 'accem', 'microtome', 'facs'].indexOf(a.id) -
        ['tem', 'accem', 'microtome', 'facs'].indexOf(b.id),
    );
  }
  return projects;
}
