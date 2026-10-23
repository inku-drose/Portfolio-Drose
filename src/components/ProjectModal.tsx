import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type MutableRefObject } from 'react';
import type { PortfolioProject } from '../data/portfolio';
import { Icon, ProjectArtwork } from './PortfolioUI';

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
            <ProjectArtwork artwork={project.artwork} layoutId={`project-artwork-${project.id}`} />
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
