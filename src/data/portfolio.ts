export type ProfileId = 'scientist' | 'builder' | 'full';

export interface Profile {
  id: ProfileId;
  name: string;
  descriptor: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const profiles: Profile[] = [
  {
    id: 'scientist',
    name: 'The Biologist',
    descriptor: 'CRYO-EM · STRUCTURE · FACILITY OPERATIONS',
    description: 'A closer look at the science, instruments, and facility work.',
    image: '/assets/drose-shane-cryo-em-specialist-profile.png',
    imageAlt: 'Cryo-electron microscope and a blue molecular structure',
  },
  {
    id: 'builder',
    name: 'The Web Developer',
    descriptor: 'WEB APPS · DIGITAL SYSTEMS · AUTOMATION',
    description: 'Explore practical tools built around real scientific workflows.',
    image: '/assets/drose-shane-digital-systems-builder-profile.png',
    imageAlt: 'Laptop displaying digital dashboards and workflow tools',
  },
  {
    id: 'full',
    name: 'The Full Story',
    descriptor: 'SCIENCE × DIGITAL × IMPACT',
    description: 'The complete story, from molecular science to digital solutions.',
    image: '/assets/drose-shane-full-story-profile.png',
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
      'A facility operations portal for the Advanced Centre for Cryo Electron Microscopy.',
    problem:
      'A shared facility needs coordinated access to instrument slots and clear workflows for administrators, billing follow-up, and grid inventory.',
    features: [
      'Facility slot booking',
      'Administrator workflows',
      'Billing, chart-sheet generation, and revenue reports',
      'Grid inventory tracking',
    ],
    impact:
      'Brings key operational workflows for the facility into one digital system.',
    tags: [
      'Facility scheduling',
      'Grid inventory',
      'Billing',
      'Chart-sheet generation',
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
      'A structured booking workflow for TEM and ultramicrotome instrument slots.',
    problem:
      'Spreadsheet-based, first-come-first-served scheduling makes it difficult to manage instrument slots and timed working windows.',
    features: [
      'TEM slots scheduling',
      'Ultramicrotome slots scheduling',
      'Timed working windows',
    ],
    impact:
      'Replaces the spreadsheet-based first-come-first-served process with a workflow for managing instrument slots and working windows.',
    tags: [
      'TEM slots scheduling',
      'Ultramicrotome slots scheduling',
      'Timed working windows',
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
      'A booking workflow for individual histopathology instrument slots and facility access.',
    problem:
      'Researchers need to select an individual instrument slot, book within timed windows, and submit the required user forms.',
    features: [
      'Individual instrument slots',
      'Instrument slot booking',
      'Timed booking windows',
      'User forms',
    ],
    impact:
      'Brings instrument-slot selection, timed booking, and user forms together in one workflow.',
    tags: [
      'Individual instrument slots',
      'Instrument slot booking',
      'Timed booking windows',
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
      'A flow cytometry booking portal that brings website bookings and bookings from a separate window into one coordinated workflow.',
    problem:
      'Bookings made through separate routes need shared calendar visibility, user forms, and operator-assisted controls to stay coordinated.',
    features: [
      'Live calendars',
      'Website and separate-window booking',
      'User-form-based booking',
      'Operator-assisted booking controls',
    ],
    impact:
      'Integrates both booking routes with live calendar visibility, user forms, and operator-assisted controls.',
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
      'Purified recombinant protein using Ni-NTA affinity chromatography and size-exclusion chromatography (SEC).',
      'Evaluated structure using NS-TEM and cryo-EM single-particle analysis (SPA), comparing mutants with wild-type strains.',
    ],
    tags: ['Protein purification', 'NS-TEM', 'Cryo-EM SPA'],
  },
  {
    id: 'phage-proteins',
    degree: 'M.TECH · ADDITIONAL PROJECT',
    title: 'Cloning & Expression of Phage Proteins in Pseudomonas aeruginosa',
    methods: [
      'Cloned phage proteins in a host system.',
      'Used fluorescence microscopy of phage-infected cells to identify morphological changes in the bacterial host.',
    ],
    tags: ['Cloning', 'Fluorescence microscopy', 'Phage biology'],
  },
  {
    id: 'aegle-marmelos',
    degree: 'BACHELOR’S PROJECT',
    title: 'Pharmacoinformatics Screening of Aegle marmelos Phytochemicals for IBS Targets',
    methods: [
      'Optimised extraction of Aegle marmelos leaf extract using Soxhlet extraction.',
      'Carried out molecular docking and simulation studies of phytocompounds.',
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
      'I start with a clear idea of what needs to improve and where. Using AI-assisted development, I turn that understanding into practical tools and build through to a complete, working process.',
    tags: ['Problem-first ideas', 'AI-assisted development', 'Working solutions'],
    tone: 'violet',
  },
  {
    title: 'People-first problem solving',
    description:
      'I focus on the real concern: what is difficult, what takes too much effort, and what would make the work easier for the people doing it. The aim is a useful solution, not technology for its own sake.',
    tags: ['Understand the need', 'Make work easier', 'Practical impact'],
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
    detail: 'Three years of experience in cryo-EM and facility operations.',
    responsibilities: [
      'Sample preparation and grid freezing',
      'Single-particle acquisition',
      'Cryo-electron tomography',
      'Grid storage and data management',
      'Shared instrument and facility workflows',
    ],
  },
];

export const teachingTrainingVolunteering = [
  {
    role: 'TEACHING ASSISTANT',
    title:
      'Fundamentals of Cryo-Electron Microscopy (Cryo-EM) and 3D Image Processing in Structural Biology',
    organization: 'NPTEL course · IISc Bangalore',
    year: '2025–2026',
  },
  {
    role: 'STUDENT VOLUNTEER',
    title:
      'EMBO Practical Course on Cryo-Electron Microscopy and 3D Image Processing (CEM3DIP)',
    organization: 'EMBO Practical Course',
    year: '2024',
  },
  {
    role: 'STUDENT VOLUNTEER',
    title: 'Electron Microscope Society of India (EMSI) training programme',
    organization: 'Electron Microscope Society of India',
    year: '2025',
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

export const cryoEmWorkflow = [
  'Sample preparation',
  'Grid freezing',
  'Single-particle acquisition',
  'Cryo-electron tomography',
  'Grid storage',
  'Data management',
];

export const websiteBuildingStory = {
  title: 'Making demanding work smarter',
  description:
    'I saw how much effort everyday tasks can demand, even when digital tools can make the work smarter. I began learning to build these tools to make work and daily life easier for me and for people around me facing similar challenges.',
};

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  details: string;
  url: string;
}

export const publications: Publication[] = [
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
];

export const profileContent = {
  scientist: {
    intro:
      'Cryo-EM practice, facility operations, research projects, and biotechnology education.',
    projectTitle: 'Projects & research',
    projectKicker: 'ACADEMIC & RESEARCH PROJECTS',
    projectNote: 'Biotechnology and cryo-EM research projects.',
  },
  builder: {
    intro:
      'Websites and digital workflows shaped around the needs of shared scientific facilities.',
    projectTitle: 'Live websites & digital projects',
    projectKicker: 'TOOLS BUILT FROM FACILITY NEEDS',
    projectNote: 'Live facility websites and booking systems.',
  },
  full: {
    intro:
      'A unified view of my biotechnology education, cryo-EM experience and research, and digital tools built around facility needs.',
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
