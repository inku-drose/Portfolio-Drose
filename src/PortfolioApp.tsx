import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  careerExperience,
  cryoEmWorkflow,
  education,
  educationAchievements,
  profiles,
  profileContent,
  projectOrderForProfile,
  publications,
  projects,
  researchProjects,
  teachingTrainingVolunteering,
  toolkit,
  websiteBuildingStory,
  type PortfolioProject,
  type Profile,
  type ProfileId,
} from './data/portfolio';
import { ExperienceTransition } from './components/ExperienceScreens';
import { FontComparison } from './components/FontComparison';
import {
  Icon,
  ProjectModal,
  ProjectRail,
  ProjectSearchStatus,
  SiteHeader,
} from './components/PortfolioUI';

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

function getProfile(id: ProfileId | null): Profile {
  return profiles.find((profile) => profile.id === id) ?? profiles[2];
}

function SectionHeading({ id, kicker, title, detail }: { id?: string; kicker: string; title: string; detail?: string }) {
  return (
    <div className="catalogue-heading">
      <div><p className="section-kicker">{kicker}</p><h2 id={id}>{title}</h2></div>
      {detail && <span className="toolkit-aside">{detail}</span>}
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
  const sectionLabel = 'WEBSITES';
  return (
    <section className="catalogue-section projects-section" id="projects" aria-label={content.projectTitle}>
      <SectionHeading
        kicker={search ? 'SEARCH RESULTS' : content.projectKicker}
        title={search ? 'Matching projects and websites' : content.projectTitle}
        detail={content.projectNote}
      />
      {profile !== 'scientist' && <ProjectSearchStatus count={items.length} query={search} />}
      {(profile === 'scientist' || profile === 'full') && (
        <div className="research-projects">
          <div className="research-projects-heading">
            <h3>{profile === 'scientist' ? 'Three projects spanning cryo-EM, cell biology, and pharmacoinformatics' : 'Research projects'}</h3>
          </div>
          <div className="research-project-grid">
            {researchProjects.map((project, index) => (
              <article className="research-project-card" key={project.id}>
                <span className="research-project-index">0{index + 1}</span>
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
            </div>
          )}
          <ProjectRail title="" projects={items} onOpen={onOpen} />
          <div className="project-browse-note">
            <span>{content.projectNote}</span>
            <span>{items.length} / {projects.length} {sectionLabel} <i /></span>
          </div>
        </>
      )}
    </section>
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
        <SectionHeading id="experience-heading" kicker="EXPERIENCE · DIGITAL SYSTEMS" title="Turning hard work into smarter workflows" detail="Digital tools shaped around real needs." />
        <div className="profile-story-columns">
          <article className="profile-story-card">
            <p className="section-kicker">THE PRACTICAL NEED</p>
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
        <SectionHeading id="experience-heading" kicker="THE FULL STORY" title="Scientific practice, shaped into digital tools" detail="Bringing hands-on cryo-EM experience together with practical digital development." />
        <div className="profile-story-columns full-story-columns">
          <article className="profile-story-card">
            <p className="section-kicker">SCIENTIFIC PRACTICE</p>
            <h3>{currentRole.title}</h3>
            <p>{currentRole.organization} · {currentRole.detail}</p>
            <ol className="workflow-list">{cryoEmWorkflow.map((step) => <li key={step}>{step}</li>)}</ol>
            <details className="experience-details">
              <summary>Explore my responsibilities</summary>
              <ul>{currentRole.responsibilities?.map((item) => <li key={item}>{item}</li>)}</ul>
            </details>
          </article>
          <article className="profile-story-card">
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
      <SectionHeading id="experience-heading" kicker="PROFESSIONAL EXPERIENCE" title="Cryo-EM & facility operations" detail={currentRole.organization} />
      <div className="profile-story-columns scientist-experience-columns">
        <article className="profile-story-card">
          <p className="section-kicker">CURRENT ROLE · 3 YEARS</p>
          <h3>{currentRole.title}</h3>
          <p>{currentRole.detail}</p>
          <details className="experience-details">
            <summary>Explore my responsibilities</summary>
            <ul>{currentRole.responsibilities?.map((item) => <li key={item}>{item}</li>)}</ul>
          </details>
        </article>
        <article className="profile-story-card">
          <p className="section-kicker">CRYO-EM WORKFLOW</p>
          <h3>From sample preparation to data management</h3>
          <ol className="workflow-list">{cryoEmWorkflow.map((step) => <li key={step}>{step}</li>)}</ol>
        </article>
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

function PublicationsSection() {
  return (
    <section className="profile-content-section" id="publications" aria-labelledby="publications-heading">
      <SectionHeading id="publications-heading" kicker="RESEARCH OUTPUT" title="Publications" detail="Research publications and scientific contributions." />
      {publications.length ? (
        <div className="publication-list">
          {publications.map((publication) => (
            <article className="publication-item" key={`${publication.title}-${publication.year}`}>
              <p className="section-kicker">{publication.venue} · {publication.year}</p>
              <h3>{renderScientificNames(publication.title)}</h3>
              <p>
                {publication.authors.split(/(Drose Ignatious Shane)/g).map((author, index) =>
                  author === 'Drose Ignatious Shane'
                    ? <strong key={index}>{author}</strong>
                    : author,
                )}
              </p>
              <p className="publication-details">{publication.details}</p>
              <a href={publication.url} target="_blank" rel="noopener noreferrer">Read publication <Icon name="external" /></a>
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
      <SectionHeading id="education-heading" kicker="EDUCATION" title="Biotechnology foundations" detail="Academic training in biotechnology." />
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
          </article>
        ))}
      </div>
      <div className="education-achievements" aria-label="Academic achievements">
        <p className="section-kicker">ACHIEVEMENTS</p>
        {educationAchievements.map((achievement) => (
          <article className="education-achievement" key={achievement.title}>
            <span className="achievement-mark" aria-hidden="true">★</span>
            <div><h3>{achievement.title}</h3><p>{achievement.detail}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfileSectionTiles({ profile }: { profile: ProfileId }) {
  const sections = profile === 'scientist'
    ? [
        { id: 'experience', title: 'Experience', index: '01', description: 'Cryo-EM practice & facility operations' },
        { id: 'projects', title: 'Projects', index: '02', description: 'Selected scientific workflows' },
        { id: 'publications', title: 'Publications', index: '03', description: 'Research contributions' },
        { id: 'education', title: 'Education', index: '04', description: 'Biotechnology foundations' },
      ]
    : profile === 'builder'
      ? [
          { id: 'experience', title: 'Experience', index: '01', description: 'Digital systems & workflows' },
          { id: 'projects', title: 'Websites', index: '02', description: 'Live facility tools' },
        ]
      : [
          { id: 'experience', title: 'Experience', index: '01', description: 'Cryo-EM practice & digital development' },
          { id: 'projects', title: 'Projects', index: '02', description: 'Research & facility websites' },
          { id: 'publications', title: 'Publications', index: '03', description: 'Research contributions' },
          { id: 'education', title: 'Education', index: '04', description: 'Biotechnology foundations' },
        ];

  return (
    <nav className="scientist-section-tiles" aria-label={`Explore ${profile} portfolio sections`}>
      {sections.map((section) => (
        <a className="scientist-section-tile" href={`#${section.id}`} key={section.id}>
          <span className="scientist-tile-index">{section.index}</span>
          <span className="scientist-tile-copy"><strong>{section.title}</strong><span>{section.description}</span></span>
          <Icon name="arrow" />
        </a>
      ))}
    </nav>
  );
}

export default function PortfolioApp() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [selectedProfile, setSelectedProfile] = useState<ProfileId | null>(readStoredProfile);
  const [search, setSearch] = useState('');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const projectTriggerRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();
  const activeProfile = getProfile(selectedProfile);

  useEffect(() => {
    const trackPointerGlow = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !(event.target instanceof Element)) return;
      const tile = event.target.closest<HTMLElement>(
        '.profile-avatar, .scientist-section-tile, .project-card, .moment-card, .toolkit-card, .profile-story-card, .research-project-card, .teaching-training-card, .publication-item, .education-card, .education-achievement',
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
  const isFontComparison = window.location.hash === '#font-comparison';

  if (isFontComparison) return <FontComparison />;

  const openProject = (project: PortfolioProject, trigger: HTMLButtonElement) => {
    projectTriggerRef.current = trigger;
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

  if (screen !== 'home') {
    return (
      <ExperienceTransition
        screen={screen}
        onEnter={beginProfileSelect}
        profiles={profiles}
        selected={selectedProfile}
        onSelect={selectProfile}
        onBack={selectedProfile ? () => setScreen('home') : undefined}
      />
    );
  }

  const profileIntro = {
    scientist: profileContent.scientist.intro,
    builder: profileContent.builder.intro,
    full: profileContent.full.intro,
  }[activeProfile.id];
  const navigation = activeProfile.id === 'builder'
    ? [{ label: 'Home', href: '#home' }, { label: 'Experience', href: '#experience' }, { label: 'Websites', href: '#projects' }]
    : [
        { label: 'Home', href: '#home' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        { label: 'Publications', href: '#publications' },
        { label: 'Education', href: '#education' },
      ];

  return (
    <div className={`portfolio-app theme-${activeProfile.id}`}>
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
            src="/assets/drose-portrait-warm.webp"
            alt="Portrait of Drose Shane"
            initial={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.42, delay: reduceMotion ? 0 : 0.04, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="hero-content">
            <p className="profile-context">{activeProfile.descriptor}</p>
            <h1 className="hero-name" id="hero-name"><span>Drose</span> <em>Shane</em></h1>
            <h2 className="hero-tagline">{activeProfile.id === 'scientist' ? <>CRYO-EM SCIENCE<br />& FACILITY PRACTICE.</> : activeProfile.id === 'builder' ? <>DIGITAL SYSTEMS<br />FOR SCIENTIFIC WORK.</> : <>FROM MOLECULAR SCIENCE<br />TO DIGITAL SOLUTIONS.</>}</h2>
            <p className="hero-description">{profileIntro}</p>
            <div className="hero-cta">
              <a className="cta cta-primary" href={activeProfile.id === 'builder' ? '#projects' : '#experience'}><Icon name="play" />{activeProfile.id === 'builder' ? 'Explore websites' : 'Explore experience'}</a>
              <a className="cta cta-glass" href={activeProfile.id === 'scientist' ? '#education' : '#projects'}><Icon name="arrow" />{activeProfile.id === 'scientist' ? 'Education' : 'Selected projects'}</a>
            </div>
            <p className="hero-proof"><span>{activeProfile.id === 'builder' ? '4 LIVE SYSTEMS' : '3 YEARS'}</span> {activeProfile.id === 'builder' ? 'FACILITY WEBSITES & DIGITAL WORKFLOWS' : 'CRYO-EM & FACILITY OPERATIONS'} <i /> INDIAN INSTITUTE OF SCIENCE</p>
          </div>
          {activeProfile.id !== 'scientist' && <a className="hero-scroll" href="#experience"><span>EXPLORE THE STORY</span><i /></a>}
          <div className="hero-side-index" aria-hidden="true"><span>FIELD NOTE</span><b>01</b><i /></div>
        </motion.section>

        <ProfileSectionTiles profile={activeProfile.id} />

        <div className={`catalogue-wrap profile-page profile-page-${activeProfile.id}`}>
          <CareerSection profile={activeProfile.id} />
          <ProjectSection profile={activeProfile.id} search={search} items={filteredProjects} onOpen={openProject} />
          {activeProfile.id !== 'builder' && <PublicationsSection />}
          {activeProfile.id !== 'builder' && <EducationSection />}
        </div>
      </main>
      <footer className="site-footer" id="contact">
        <a className="brand-lockup" href="#home"><span className="brand-mark">DS</span><span className="brand-name">DROSE SHANE</span></a>
        <p>FROM MOLECULAR SCIENCE <span>TO DIGITAL SOLUTIONS.</span></p>
        <a href="#projects" className="footer-contact">Explore the projects <Icon name="arrow" /></a>
        <span className="footer-credit">PERSONAL PORTFOLIO · BENGALURU</span>
      </footer>
      <ProjectModal
        project={activeProject}
        onClose={closeProject}
        returnFocusRef={projectTriggerRef}
      />
    </div>
  );
}
