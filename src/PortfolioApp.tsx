import { lazy, Suspense, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import {
  careerExperience,
  cryoEmPractice,
  education,
  educationAchievements,
  profiles,
  profileContent,
  projectOrderForProfile,
  publications,
  projects,
  researchProjects,
  servicePackages,
  highlightStats,
  studio,
  teachingTrainingVolunteering,
  toolkit,
  websiteBuildingStory,
  type PortfolioProject,
  type Profile,
  type ProfileId,
} from './data/portfolio';
import { ExperienceTransition } from './components/ExperienceScreens';
import {
  Icon,
  ProjectRail,
  ProjectSearchStatus,
  SiteHeader,
} from './components/PortfolioUI';

const LazyProjectModal = lazy(() => import('./components/ProjectModal').then(({ ProjectModal }) => ({ default: ProjectModal })));

type Screen = 'intro' | 'profiles' | 'home';
const PROFILE_STORAGE_KEY = 'drose-shane-viewing-profile';
const SCIENTIFIC_NAME_PATTERN = /(Aegle marmelos|Morinda citrifolia|Pseudomonas aeruginosa)/g;
const SCIENTIFIC_NAMES = new Set([
  'Aegle marmelos',
  'Morinda citrifolia',
  'Pseudomonas aeruginosa',
]);

function renderScientificNames(text: string): ReactNode {
  return text.split(SCIENTIFIC_NAME_PATTERN).map((part, index) =>
    SCIENTIFIC_NAMES.has(part)
      ? <em className="scientific-name" key={`${part}-${index}`}>{part}</em>
      : part,
  );
}

function readStoredProfile(): ProfileId | null {
  try {
    const stored = window.sessionStorage.getItem(PROFILE_STORAGE_KEY);
    return profiles.some((profile) => profile.id === stored) ? (stored as ProfileId) : null;
  } catch {
    return null;
  }
}

// A link such as /?view=builder opens that profile directly, skipping the intro.
function readLinkedProfile(): ProfileId | null {
  try {
    const view = new URLSearchParams(window.location.search).get('view');
    return profiles.some((profile) => profile.id === view) ? (view as ProfileId) : null;
  } catch {
    return null;
  }
}

function getProfile(id: ProfileId | null): Profile {
  return profiles.find((profile) => profile.id === id) ?? profiles[2];
}

function SectionHeading({ id, kicker, title, detail, controls }: { id?: string; kicker: string; title: string; detail?: ReactNode; controls?: ReactNode }) {
  return (
    <div className="catalogue-heading">
      <div><p className="section-kicker">{kicker}</p><h2 id={id}>{title}</h2></div>
      {(detail || controls) && (
        <div className="catalogue-heading-tools">
          {detail && <span className="toolkit-aside">{detail}</span>}
          {controls}
        </div>
      )}
    </div>
  );
}

function ProjectSection({
  profile,
  search,
  items,
  onOpen,
}: {
  profile: ProfileId;
  search: string;
  items: PortfolioProject[];
  onOpen: (project: PortfolioProject, trigger: HTMLButtonElement) => void;
}) {
  const content = profileContent[profile];
  const projectRail = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const sectionLabel = 'WEBSITES';
  return (
    <section className="catalogue-section projects-section" id="projects" aria-label={content.projectTitle}>
      <SectionHeading
        kicker={search ? 'SEARCH RESULTS' : content.projectKicker}
        title={search ? 'Matching projects and websites' : content.projectTitle}
        detail={content.projectNote}
        controls={profile === 'builder' && items.length > 1 && (
          <div className="rail-arrows">
            <button type="button" aria-label={`Scroll ${content.projectTitle} left`} onClick={() => projectRail.current?.scrollBy({ left: -projectRail.current.clientWidth * 0.85, behavior: reduceMotion ? 'auto' : 'smooth' })}>‹</button>
            <button type="button" aria-label={`Scroll ${content.projectTitle} right`} onClick={() => projectRail.current?.scrollBy({ left: projectRail.current.clientWidth * 0.85, behavior: reduceMotion ? 'auto' : 'smooth' })}>›</button>
          </div>
        )}
      />
      {profile !== 'scientist' && <ProjectSearchStatus count={items.length} query={search} />}
      {(profile === 'scientist' || profile === 'full') && (
        <div className="research-projects">
          <div className="research-projects-heading">
            <h3>{profile === 'scientist' ? 'Three projects across structural biology, microbiology, and pharmacoinformatics' : 'Research projects'}</h3>
          </div>
          <div className="research-project-grid">
            {researchProjects.map((project) => (
              <article className="research-project-card" key={project.id}>
                <p className="section-kicker">{project.degree}</p>
                <h4>{renderScientificNames(project.title)}</h4>
                <ul>{project.methods.map((method) => <li key={method}>{renderScientificNames(method)}</li>)}</ul>
                <div className="toolkit-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      )}
      {profile !== 'scientist' && (
        <>
          {profile === 'full' && (
            <div className="facility-projects-heading">
              <h3>Facility websites &amp; digital workflows</h3>
              {items.length > 1 && (
                <div className="rail-arrows">
                  <button type="button" aria-label="Scroll facility websites left" onClick={() => projectRail.current?.scrollBy({ left: -projectRail.current.clientWidth * 0.85, behavior: reduceMotion ? 'auto' : 'smooth' })}>‹</button>
                  <button type="button" aria-label="Scroll facility websites right" onClick={() => projectRail.current?.scrollBy({ left: projectRail.current.clientWidth * 0.85, behavior: reduceMotion ? 'auto' : 'smooth' })}>›</button>
                </div>
              )}
            </div>
          )}
          <ProjectRail title="" projects={items} onOpen={onOpen} railRef={projectRail} />
          <div className="project-browse-note">
            <span>{content.projectNote}</span>
            <span>{items.length} / {projects.length} {sectionLabel} <i /></span>
          </div>
        </>
      )}
    </section>
  );
}

function CryoEmPracticeCard({
  currentRole,
  showOrganization,
}: {
  currentRole: (typeof careerExperience)[number];
  showOrganization: boolean;
}) {
  return (
    <article className="profile-story-card workflow-card featured-role scientific-practice-card">
      <p className="section-kicker">SCIENTIFIC PRACTICE</p>
      <h3 className="practice-heading">From sample to structure</h3>
      <div className="scientific-practice-layout">
        <section className="practice-role-details">
          <p className="section-kicker">CURRENT ROLE</p>
          <h4>{currentRole.title}</h4>
          <p>{showOrganization ? `${currentRole.organization}. ` : ''}{currentRole.detail}</p>
          <ul className="role-responsibilities">{currentRole.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <div className="practice-technical-details">
          {[
            { id: 'practice-prep-heading', heading: 'Sample preparation', items: cryoEmPractice.samplePreparation },
            { id: 'practice-data-heading', heading: 'Data collection', items: cryoEmPractice.dataCollection },
            { id: 'practice-processing-heading', heading: 'Processing & analysis', items: cryoEmPractice.processing },
          ].map((group, groupIndex) => (
            <section className={`practice-data-section${groupIndex === 0 ? ' practice-first-section' : ''}`} aria-labelledby={group.id} key={group.id}>
              <h4 id={group.id}>{group.heading}</h4>
              <div className="practice-spec-grid">
                {group.items.map((practice) => (
                  <section className="practice-spec" key={practice.category}>
                    <h5>{practice.category}</h5>
                    <ul>{practice.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  </section>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

function CareerSection({ profile }: { profile: ProfileId }) {
  const currentRole = careerExperience[0];

  if (profile === 'builder') {
    const digitalToolkit = toolkit.filter((item) =>
      ['Digital development', 'People-first problem solving'].includes(item.title),
    );
    return (
      <section className="profile-content-section" id="experience" aria-labelledby="experience-heading">
        <SectionHeading id="experience-heading" kicker="MY APPROACH" title="Turning facility friction into working tools" detail="Software built around how scientific facilities actually work." />
        <div className="profile-story-columns">
          <article className="profile-story-card">
            <p className="section-kicker">THE STARTING POINT</p>
            <h3>{websiteBuildingStory.title}</h3>
            <p>{websiteBuildingStory.description}</p>
          </article>
          {digitalToolkit.map((item) => (
            <article className="profile-story-card" key={item.title}>
              <p className="section-kicker">{item.title === 'Digital development' ? 'MY APPROACH' : 'WHAT I FOCUS ON'}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="toolkit-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (profile === 'full') {
    const digitalToolkit = toolkit.filter((item) =>
      ['Digital development', 'People-first problem solving'].includes(item.title),
    );
    return (
      <section className="profile-content-section" id="experience" aria-labelledby="experience-heading">
        <SectionHeading id="experience-heading" kicker="THE FULL STORY" title="Scientific practice, shaped into digital tools" detail="Hands-on cryo-EM expertise, combined with practical digital development." />
        <div className="profile-story-columns full-story-columns">
          <CryoEmPracticeCard currentRole={currentRole} showOrganization />
          <article className="profile-story-card digital-development-card">
            <p className="section-kicker">DIGITAL DEVELOPMENT</p>
            <h3>{websiteBuildingStory.title}</h3>
            <p>{websiteBuildingStory.description}</p>
            <div className="full-story-approach-grid">
              {digitalToolkit.map((item) => (
                <div className="full-story-approach-card" key={item.title}>
                  <p className="section-kicker">{item.title}</p>
                  <p>{item.description}</p>
                  <div className="toolkit-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              ))}
            </div>
          </article>
        </div>
        <TeachingTrainingSection />
      </section>
    );
  }

  return (
    <section className="profile-content-section" id="experience" aria-labelledby="experience-heading">
      <SectionHeading
        id="experience-heading"
        kicker="PROFESSIONAL EXPERIENCE"
        title="Cryo-EM & facility operations"
        detail={<><span className="institution-name">Advanced Centre for Cryo-Electron Microscopy <span className="institution-acronym">(ACCEM)</span></span><span>Indian Institute of Science, Bengaluru</span></>}
      />
      <div className="profile-story-columns scientist-experience-columns">
        <CryoEmPracticeCard currentRole={currentRole} showOrganization={false} />
      </div>
      <TeachingTrainingSection />
    </section>
  );
}

function TeachingTrainingSection() {
  return (
    <div className="teaching-training" aria-labelledby="teaching-training-heading">
      <div className="teaching-training-heading">
        <p className="section-kicker">COMMUNITY CONTRIBUTIONS</p>
        <h3 id="teaching-training-heading">Teaching, training &amp; volunteering</h3>
      </div>
      <div className="teaching-training-grid">
        {teachingTrainingVolunteering.map((activity) => (
          <article className="teaching-training-card" key={activity.title}>
            <div className="teaching-training-card-meta">
              <p className="section-kicker">{activity.role}</p>
              <span>{activity.year}</span>
            </div>
            <h4>{activity.title}</h4>
            <p className="teaching-training-organization">{activity.organization}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function HighlightStrip({ profile }: { profile: ProfileId }) {
  return (
    <section className="highlight-strip" aria-label="Highlights">
      {highlightStats[profile].map((stat) => (
        <div className="highlight-stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}

function PricingSection() {
  return (
    <section className="profile-content-section pricing-section" id="pricing" aria-labelledby="pricing-heading">
      <SectionHeading
        id="pricing-heading"
        kicker="TEKVARA STUDIO · SERVICES & PRICING"
        title="Websites, stores, and web apps"
        detail={<>Built through <a className="inline-link" href={studio.url} target="_blank" rel="noopener noreferrer">Tekvara Studio</a>, my web studio. Starting prices in INR, with a fixed quote before any work begins.</>}
      />
      <div className="pricing-grid">
        {servicePackages.map((item) => (
          <article className={`pricing-card${item.badge ? ' is-featured' : ''}`} key={item.name}>
            {item.badge && <span className="pricing-badge">{item.badge}</span>}
            <p className="section-kicker">{item.category}</p>
            <h3>{item.name}</h3>
            <p className="pricing-price"><small>from</small> {item.price}</p>
            <p className="pricing-timeline">Ready in {item.timeline}</p>
            <ul>{item.highlights.map((point) => <li key={point}>{point}</li>)}</ul>
          </article>
        ))}
      </div>
      <div className="pricing-footer">
        <p>Every project includes 30 days of free support. Care plans start at ₹499 a month, and add-ons such as payments, a blog, or billing start at ₹1,499. You own the code and data. Build your own estimate on the Tekvara Studio site.</p>
        <div className="pricing-actions">
          <a className="closing-link closing-link-primary" href={studio.estimateUrl} target="_blank" rel="noopener noreferrer">Estimate your cost <Icon name="external" /></a>
          <a className="closing-link" href={studio.whatsappUrl} target="_blank" rel="noopener noreferrer">Chat on WhatsApp <Icon name="external" /></a>
          <a className="closing-link" href={studio.url} target="_blank" rel="noopener noreferrer">Visit Tekvara Studio <Icon name="external" /></a>
        </div>
      </div>
    </section>
  );
}

function PublicationsSection() {
  return (
    <section className="profile-content-section" id="publications" aria-labelledby="publications-heading">
      <SectionHeading id="publications-heading" kicker="RESEARCH OUTPUT" title="Publications" detail="Journal articles and manuscripts, newest first." />
      {publications.length ? (
        <div className="publication-list">
          {publications.map((publication) => (
            <article className="publication-item" key={`${publication.title}-${publication.year}`}>
              <p className="section-kicker">{publication.venue} · {publication.year}</p>
              <h3>{renderScientificNames(publication.title)}</h3>
              <p>
                {publication.authors.split(/(Drose Ignatious Shane(?: Michaelson)?)/g).map((author, index) =>
                  author.startsWith('Drose Ignatious Shane')
                    ? <strong key={index}>{author}</strong>
                    : author,
                )}
              </p>
              <p className="publication-details">{publication.details}{publication.status ? ` · ${publication.status}` : ''}</p>
              {publication.url && <a className="publication-link" href={publication.url} target="_blank" rel="noopener noreferrer">Read publication <Icon name="external" /></a>}
            </article>
          ))}
        </div>
      ) : (
        <p className="publications-pending">Publication details will be added here.</p>
      )}
    </section>
  );
}

function EducationSection() {
  return (
    <section className="profile-content-section" id="education" aria-labelledby="education-heading">
      <SectionHeading id="education-heading" kicker="EDUCATION" title="Biotechnology foundations" detail="M.Tech and B.Tech in Biotechnology, with a university gold medal." />
      <div className="education-list">
        {education.map((item) => (
          <article className="education-card" key={item.title}>
            <p className="section-kicker">{item.label}</p>
            <h3>{item.title}</h3>
            <p className="education-institution">{item.organization}</p>
            <dl className="education-facts">
              <div><dt>Specialization</dt><dd>{item.specialization}</dd></div>
              <div><dt>Years</dt><dd>{item.years}</dd></div>
              <div><dt>CGPA</dt><dd>{item.gpa}</dd></div>
            </dl>
            {item.title === 'M.Tech in Biotechnology' && educationAchievements.map((achievement) => (
              <div className="education-medal-badge" key={achievement.title}>
                <span className="achievement-mark" aria-hidden="true">★</span>
                <span><strong>{achievement.title}</strong><small>{achievement.detail}</small></span>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

function ClosingSection({ profile }: { profile: Profile }) {
  const profileLabel = profile.name.toUpperCase();
  const closingLine = profile.id === 'scientist'
    ? 'Open to research collaborations and cryo-EM projects. Let’s talk.'
    : profile.id === 'builder'
      ? 'Need a website, an online store, or a custom web app? Let’s talk.'
      : 'From scientific discovery to digital solutions: let’s build what comes next.';

  const updateClosingTextGlow = (event: ReactPointerEvent<HTMLHeadingElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--closing-text-glow-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--closing-text-glow-y', `${event.clientY - bounds.top}px`);
    event.currentTarget.style.setProperty('--closing-text-glow-opacity', '1');
  };

  const clearClosingTextGlow = (event: ReactPointerEvent<HTMLHeadingElement>) => {
    event.currentTarget.style.removeProperty('--closing-text-glow-opacity');
  };

  return (
    <section className="closing-section" id="contact" aria-labelledby="closing-heading">
      <div className="closing-content">
        <h2
          id="closing-heading"
          onPointerMove={updateClosingTextGlow}
          onPointerLeave={clearClosingTextGlow}
        >
          TO BE CONTINUED...<span className="closing-text-glow" aria-hidden="true">TO BE CONTINUED...</span>
        </h2>
        <p className="closing-name">Drose Shane</p>
        <p className="closing-role">{profileLabel}</p>
        <p className="closing-copy">{closingLine}</p>
        <nav className="closing-links" aria-label="Contact and professional links">
          <a className="closing-link closing-link-primary" href="mailto:ignatious9894@gmail.com">
            Email me <Icon name="arrow" />
          </a>
          <a className="closing-link" href="https://www.linkedin.com/in/drose-ignatious-shane" target="_blank" rel="noopener noreferrer">
            LinkedIn <Icon name="external" />
          </a>
          {profile.id !== 'builder' && (
            <a className="closing-link" href="https://orcid.org/0000-0002-5329-0748" target="_blank" rel="noopener noreferrer">
              ORCID <Icon name="external" />
            </a>
          )}
          {profile.id !== 'scientist' && (
            <a className="closing-link" href={studio.url} target="_blank" rel="noopener noreferrer">
              Tekvara Studio <Icon name="external" />
            </a>
          )}
          {profile.id === 'builder' && (
            <a className="closing-link" href={studio.whatsappUrl} target="_blank" rel="noopener noreferrer">
              WhatsApp <Icon name="external" />
            </a>
          )}
          <a className="closing-link" href="/drose-shane-resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume <Icon name="external" />
          </a>
        </nav>
        <a className="closing-replay" href="#home">↑ &nbsp; Back to the beginning</a>
      </div>
    </section>
  );
}

function updateHeroNameGlow(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType === 'touch') return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--hero-glow-x', `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty('--hero-glow-y', `${event.clientY - bounds.top}px`);
  event.currentTarget.style.setProperty('--hero-glow-opacity', '1');
}

function clearHeroNameGlow(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty('--hero-glow-opacity');
}

export default function PortfolioApp() {
  const [screen, setScreen] = useState<Screen>(() => (readLinkedProfile() ? 'home' : 'intro'));
  const [selectedProfile, setSelectedProfile] = useState<ProfileId | null>(() => readLinkedProfile() ?? readStoredProfile());
  const [search, setSearch] = useState('');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [modalLoaded, setModalLoaded] = useState(false);
  const projectTriggerRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();
  const activeProfile = getProfile(selectedProfile);
  const { scrollY } = useScroll();
  const heroPortraitY = useTransform(scrollY, [0, 650], [0, reduceMotion ? 0 : 90]);
  const heroNameScale = useTransform(scrollY, [0, 650], [1, reduceMotion ? 1 : 0.9]);

  useEffect(() => {
    if (reduceMotion) return;
    const lenis = new Lenis({ autoRaf: true });
    return () => lenis.destroy();
  }, [reduceMotion]);

  useEffect(() => {
    const trackPointerGlow = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !(event.target instanceof Element)) return;
      const tile = event.target.closest<HTMLElement>(
        '.profile-avatar, .project-card, .pricing-card, .moment-card, .toolkit-card, .profile-story-card, .research-project-card, .teaching-training-card, .publication-item, .education-card',
      );
      if (!tile) return;

      const bounds = tile.getBoundingClientRect();
      const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
      tile.style.setProperty('--pointer-shadow-x', `${pointerX * 24}px`);
      tile.style.setProperty('--pointer-shadow-y', `${pointerY * 16}px`);
    };

    document.addEventListener('pointermove', trackPointerGlow, { passive: true });
    return () => document.removeEventListener('pointermove', trackPointerGlow);
  }, []);

  const orderedProjects = useMemo(
    () => projectOrderForProfile(selectedProfile ?? 'full'),
    [selectedProfile],
  );
  const filteredProjects = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    if (!term) return orderedProjects;
    return orderedProjects.filter((project) =>
      [
        project.title,
        project.category,
        project.eyebrow,
        project.synopsis,
        project.problem,
        project.features.join(' '),
        project.tags.join(' '),
      ]
        .join(' ')
        .toLocaleLowerCase()
        .includes(term),
    );
  }, [orderedProjects, search]);
  const openProject = (project: PortfolioProject, trigger: HTMLButtonElement) => {
    projectTriggerRef.current = trigger;
    setModalLoaded(true);
    setActiveProject(project);
  };
  const closeProject = () => setActiveProject(null);
  const beginProfileSelect = () => setScreen('profiles');
  const selectProfile = (profileId: ProfileId) => {
    setSelectedProfile(profileId);
    try {
      window.sessionStorage.setItem(PROFILE_STORAGE_KEY, profileId);
    } catch {
      // The in-memory selection remains active when session storage is unavailable.
    }
    setScreen('home');
  };
  const profileIntro = {
    scientist: profileContent.scientist.intro,
    builder: profileContent.builder.intro,
    full: profileContent.full.intro,
  }[activeProfile.id];
  const navigation = activeProfile.id === 'builder'
    ? [
        { label: 'Home', href: '#home' },
        { label: 'Work', href: '#projects' },
        { label: 'Approach', href: '#experience' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Contact', href: '#contact' },
      ]
    : [
        { label: 'Home', href: '#home' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        ...(activeProfile.id === 'full' ? [{ label: 'Pricing', href: '#pricing' }] : []),
        { label: 'Publications', href: '#publications' },
        { label: 'Education', href: '#education' },
        { label: 'Contact', href: '#contact' },
      ];
  const heroProof = activeProfile.id === 'builder'
    ? 'Founder, Tekvara Studio · Bengaluru'
    : activeProfile.id === 'full'
      ? 'Indian Institute of Science · Founder, Tekvara Studio'
      : 'Indian Institute of Science · Bengaluru';

  return (
    <AnimatePresence mode="wait" initial={false}>
      {screen === 'home' ? (
    <motion.div
      key={`portfolio-${activeProfile.id}`}
      className={`portfolio-app theme-${activeProfile.id}`}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <SiteHeader
        profile={activeProfile}
        navigation={navigation}
        showSearch={activeProfile.id !== 'scientist'}
        search={search}
        onSearch={setSearch}
        onSwitchProfile={beginProfileSelect}
      />
      <main>
        <motion.section
          className="featured-hero"
          id="home"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.48, ease: [0.22, 1, 0.36, 1] }}
          aria-labelledby="hero-name"
        >
          <div className="hero-image-field" aria-hidden="true">
          </div>
          <div className="hero-vignette" aria-hidden="true" />
          <motion.img
            className="hero-portrait"
            src="/assets/drose-shane-cryo-em-specialist-portrait-warm.webp"
            alt="Portrait of Drose Shane"
            style={{ y: heroPortraitY }}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.42, delay: reduceMotion ? 0 : 0.04, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="hero-content">
            <p className="profile-context">{activeProfile.descriptor}</p>
            <motion.h1 className="hero-name" id="hero-name" style={{ scale: heroNameScale }}>
              <span
                className="hero-name-word hero-name-first"
                onPointerMove={updateHeroNameGlow}
                onPointerLeave={clearHeroNameGlow}
              >
                Drose<span className="hero-name-glow" aria-hidden="true">Drose</span>
              </span>{' '}
              <em
                className="hero-name-word hero-name-last"
                onPointerMove={updateHeroNameGlow}
                onPointerLeave={clearHeroNameGlow}
              >
                Shane<span className="hero-name-glow" aria-hidden="true">Shane</span>
              </em>
            </motion.h1>
            <h2 className="hero-tagline">{activeProfile.id === 'scientist' ? <>CRYO-EM SCIENCE<br />& FACILITY PRACTICE.</> : activeProfile.id === 'builder' ? <>WEBSITES &amp; WEB APPS<br />BUILT AROUND REAL NEEDS.</> : <>FROM MOLECULAR SCIENCE<br />TO DIGITAL SOLUTIONS.</>}</h2>
            <p className="hero-description">{profileIntro}</p>
            <div className="hero-cta">
              <a className="cta cta-primary" href={activeProfile.id === 'builder' ? '#projects' : '#experience'}><Icon name="play" />{activeProfile.id === 'builder' ? 'View live projects' : 'Explore experience'}</a>
              <a className="cta cta-glass" href={activeProfile.id === 'scientist' ? '#publications' : activeProfile.id === 'builder' ? '#pricing' : '#projects'}><Icon name="arrow" />{activeProfile.id === 'scientist' ? 'Publications' : activeProfile.id === 'builder' ? 'See pricing' : 'Selected projects'}</a>
            </div>
            <p className="hero-proof">{heroProof}</p>
          </div>
        </motion.section>

        <div className={`catalogue-wrap profile-page profile-page-${activeProfile.id}`}>
          <HighlightStrip profile={activeProfile.id} />
          {activeProfile.id === 'builder' ? (
            <>
              <ProjectSection profile={activeProfile.id} search={search} items={filteredProjects} onOpen={openProject} />
              <CareerSection profile={activeProfile.id} />
            </>
          ) : (
            <>
              <CareerSection profile={activeProfile.id} />
              <ProjectSection profile={activeProfile.id} search={search} items={filteredProjects} onOpen={openProject} />
            </>
          )}
          {activeProfile.id !== 'scientist' && <PricingSection />}
          {activeProfile.id !== 'builder' && <PublicationsSection />}
          {activeProfile.id !== 'builder' && <EducationSection />}
        </div>
        <ClosingSection profile={activeProfile} />
      </main>
      <footer className="site-footer">
        <a className="brand-lockup" href="#home" aria-label="Drose Shane home"><img className="brand-logo" src="/assets/drose-shane-logo-blended.webp" alt="" /></a>
        <p>{activeProfile.descriptor}</p>
        <a href="#home" className="footer-contact">Back to top <Icon name="arrow" /></a>
        <span className="footer-credit">© {new Date().getFullYear()} Drose Ignatious Shane. All rights reserved.</span>
      </footer>
      {modalLoaded && (
        <Suspense fallback={activeProject ? <div className="modal-loading-layer" role="status">Loading project details…</div> : null}>
          <LazyProjectModal
            project={activeProject}
            onClose={closeProject}
            returnFocusRef={projectTriggerRef}
          />
        </Suspense>
      )}
    </motion.div>
      ) : (
        <motion.div
          key={`screen-${screen}`}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ExperienceTransition
            screen={screen}
            onEnter={beginProfileSelect}
            profiles={profiles}
            selected={selectedProfile}
            onSelect={selectProfile}
            onBack={selectedProfile ? () => setScreen('home') : undefined}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
