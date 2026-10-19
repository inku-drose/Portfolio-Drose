import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type MutableRefObject, type ReactNode } from 'react';
import type { PortfolioProject, Profile, Moment } from '../data/portfolio';

interface IconProps {
  name: 'search' | 'close' | 'play' | 'arrow' | 'external' | 'chevron' | 'microscope' | 'calendar';
}

export function Icon({ name }: IconProps) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<IconProps['name'], ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    play: <path d="m8 5 11 7-11 7z" fill="currentColor" stroke="none" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    external: <><path d="M14 4h6v6" /><path d="M10 14 20 4" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    microscope: <><path d="m6 18 6-6M9 4l4 4-6 6-4-4z" /><path d="M12 12a6 6 0 1 0 8 8H9" /><path d="M14 4h5M17 4v3" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" {...common}>{paths[name]}</svg>;
}

interface ArtworkProps {
  artwork: PortfolioProject['artwork'];
  compact?: boolean;
}

export function ProjectArtwork({ artwork, compact = false }: ArtworkProps) {
  const suppliedCovers: Partial<Record<PortfolioProject['artwork'], string>> = {
    accem: '/assets/project-covers/accem-homepage.png',
    tem: '/assets/project-covers/tem-homepage.png',
    microtome: '/assets/project-covers/histopathology-homepage.png',
    facs: '/assets/project-covers/facs-homepage.png',
  };
  const coverImage = suppliedCovers[artwork] ?? `/assets/project-covers/${artwork}.svg`;
  const isSuppliedCover = artwork in suppliedCovers;

  return (
    <div className={`project-art art-${artwork}${compact ? ' is-compact' : ''}${isSuppliedCover ? ' has-full-cover-image' : ''}`} aria-hidden="true">
      {isSuppliedCover && <img className="project-art-backdrop" src={coverImage} alt="" />}
      <img className="project-art-cover" src={coverImage} alt="" />
    </div>
  );
}

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
  onOpen: (project: PortfolioProject, trigger: HTMLButtonElement) => void;
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.button
      className={`project-card${project.artwork === 'accem' || project.artwork === 'tem' || project.artwork === 'facs' || project.artwork === 'microtome' ? ' has-screenshot-cover' : ''}`}
      type="button"
      onClick={(event) => onOpen(project, event.currentTarget)}
      aria-label={`View ${project.title} project details`}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.3, delay: reduceMotion ? 0 : (index % 4) * 0.035 }}
      whileHover={reduceMotion ? { scale: 1.02 } : { y: -7, scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
    >
      <ProjectArtwork artwork={project.artwork} compact />
      <span className="project-card-shade" />
      <span className="project-card-top"><span>{project.category}</span><span className="project-card-play"><Icon name="play" /></span></span>
      <span className="project-card-copy"><span className="project-card-eyebrow">{project.eyebrow}</span><strong>{project.title}</strong><span className="project-card-summary">{project.synopsis}</span></span>
    </motion.button>
  );
}

interface ProjectRailProps {
  title: string;
  subtitle?: string;
  projects: PortfolioProject[];
  onOpen: (project: PortfolioProject, trigger: HTMLButtonElement) => void;
}

export function ProjectRail({ title, subtitle, projects, onOpen }: ProjectRailProps) {
  const rail = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={title ? 'catalogue-section' : 'project-results'}
      role={title ? 'region' : undefined}
      aria-label={title || undefined}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.36 }}
    >
      {title && (
        <div className="catalogue-heading">
          <div><p className="section-kicker">{subtitle}</p><h2>{title}</h2></div>
          <div className="rail-arrows">
            <button type="button" aria-label={`Scroll ${title} left`} onClick={() => rail.current?.scrollBy({ left: -rail.current.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' })}>‹</button>
            <button type="button" aria-label={`Scroll ${title} right`} onClick={() => rail.current?.scrollBy({ left: rail.current.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' })}>›</button>
          </div>
        </div>
      )}
      {projects.length ? (
        <div className="project-rail" ref={rail} role="list">
          {projects.map((project, index) => (
            <div className="project-rail-item" role="listitem" key={project.id}>
              <ProjectCard project={project} index={index} onOpen={onOpen} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-search">
          <span className="empty-search-icon"><Icon name="search" /></span>
          <strong>No projects found</strong>
          <p>Try another search term, or clear the search to see all four projects.</p>
        </div>
      )}
    </motion.div>
  );
}

interface MomentRailProps {
  moments: Moment[];
}

export function MomentRail({ moments }: MomentRailProps) {
  const rail = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  return (
    <section className="catalogue-section moments-section" aria-label="Top moments">
      <div className="catalogue-heading">
        <div><p className="section-kicker">THE HIGHLIGHTS</p><h2>Top Moments</h2></div>
        <div className="rail-arrows">
          <button type="button" aria-label="Scroll top moments left" onClick={() => rail.current?.scrollBy({ left: -rail.current.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' })}>‹</button>
          <button type="button" aria-label="Scroll top moments right" onClick={() => rail.current?.scrollBy({ left: rail.current.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' })}>›</button>
        </div>
      </div>
      <div className="moment-rail" ref={rail}>
        {moments.map((moment, index) => (
          <motion.article
            className={`moment-card tone-${moment.tone}`}
            key={moment.title}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reduceMotion ? 0 : index * 0.035, duration: reduceMotion ? 0.01 : 0.3 }}
          >
            <span className="moment-art" aria-hidden="true"><i>{moment.icon}</i><b /><b /><b /></span>
            <span className="moment-label">{moment.label}</span>
            <h3>{moment.title}</h3>
            <p>{moment.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  returnFocusRef: MutableRefObject<HTMLButtonElement | null>;
}

export function ProjectModal({ project, onClose, returnFocusRef }: ProjectModalProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) {
      returnFocusRef.current?.focus();
      return;
    }
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [project, returnFocusRef]);

  useEffect(() => {
    if (!project) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const modal = document.querySelector<HTMLElement>('.project-modal');
        if (!modal) return;
        const focusable = [...modal.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.16 }}>
          <button className="modal-backdrop" type="button" aria-label="Close project details" onClick={onClose} />
          <motion.article
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14, scale: reduceMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.99 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectArtwork artwork={project.artwork} />
            <button className="modal-close" ref={closeButton} type="button" onClick={onClose} aria-label="Close project details"><Icon name="close" /></button>
            <div className="modal-body">
              <p className="modal-kicker">{project.eyebrow}</p>
              <h2 id="project-modal-title">{project.title}</h2>
              <p className="modal-synopsis">{project.synopsis}</p>
              <div className="modal-actions">
                <a className="action-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer"><Icon name="external" /> Open live website</a>
              </div>
              <div className="project-facts">
                <div><h3>THE OPERATIONAL NEED</h3><p>{project.problem}</p></div>
                <div><h3>WHAT IT SUPPORTS</h3><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
                <div><h3>FACILITY IMPACT</h3><p>{project.impact}</p></div>
              </div>
              <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface HeaderProps {
  profile: Profile;
  navigation: { label: string; href: string }[];
  showSearch?: boolean;
  search: string;
  onSearch: (value: string) => void;
  onSwitchProfile: () => void;
}

export function SiteHeader({ profile, navigation, showSearch = true, search, onSearch, onSwitchProfile }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(navigation[0]?.href ?? '#home');
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();
  const navigationSignature = navigation.map(({ href }) => href).join('|');

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);
      const current = visibleSections[0]?.target;
      if (current instanceof HTMLElement && current.id) setActiveHref(`#${current.id}`);
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navigationSignature]);

  useEffect(() => {
    const handleScroll = () => document.querySelector('.site-header')?.classList.toggle('is-scrolled', window.scrollY > 22);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <a className="brand-lockup" href="#home" aria-label="Drose Shane home">
        <span className="brand-mark">DS</span><span className="brand-name">DROSE SHANE</span>
      </a>
      <button className="mobile-menu-toggle" type="button" aria-expanded={mobileOpen} aria-controls="primary-navigation" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? '×' : '☰'}</button>
      {navigation.length > 0 && (
        <nav className={`primary-nav${mobileOpen ? ' is-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <a className={activeHref === item.href ? 'active' : undefined} aria-current={activeHref === item.href ? 'location' : undefined} href={item.href} key={item.href} onClick={() => setMobileOpen(false)}>{item.label}</a>
          ))}
        </nav>
      )}
      <div className="header-tools">
        {showSearch && (
          <>
            <AnimatePresence initial={false}>
              {searchOpen && (
                <motion.label className="search-control" initial={{ opacity: 0, width: 34 }} animate={{ opacity: 1, width: 210 }} exit={{ opacity: 0, width: 34 }} transition={{ duration: reduceMotion ? 0.01 : 0.22 }}>
                  <Icon name="search" />
                  <input ref={inputRef} type="search" aria-label="Search projects" placeholder="Search projects" value={search} onChange={(event) => onSearch(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') { onSearch(''); setSearchOpen(false); } }} />
                  {search && <button type="button" aria-label="Clear search" onClick={() => onSearch('')}><Icon name="close" /></button>}
                </motion.label>
              )}
            </AnimatePresence>
            {!searchOpen && <button className="search-toggle" type="button" aria-label="Search projects" onClick={() => setSearchOpen(true)}><Icon name="search" /></button>}
          </>
        )}
        <button className="profile-switch" type="button" onClick={() => { setMobileOpen(false); onSwitchProfile(); }} aria-label={`Switch profile, current profile: ${profile.name}`}>
          <span className={`profile-mini profile-mini-${profile.id}`}>{profile.monogram}</span>
          <span className="profile-switch-label">{profile.name}</span>
          <span className="profile-chevron">⌄</span>
        </button>
      </div>
    </header>
  );
}

export function ProjectSearchStatus({ count, query }: { count: number; query: string }) {
  if (!query.trim()) return null;
  return <p className="search-status" aria-live="polite">{count} {count === 1 ? 'project' : 'projects'} matching <strong>“{query}”</strong></p>;
}
