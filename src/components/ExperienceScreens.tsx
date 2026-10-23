import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Profile, ProfileId } from '../data/portfolio';

interface IntroScreenProps {
  onEnter: () => void;
}

export function IntroScreen({ onEnter }: IntroScreenProps) {
  const reduceMotion = useReducedMotion();
  const [introStage, setIntroStage] = useState<'title' | 'reveal'>('title');
  const [showAction, setShowAction] = useState(false);
  const screenRef = useRef<HTMLElement>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartProgress = useRef(0);
  const touchDeltaY = useRef(0);
  const actionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const actionVisible = useRef(false);
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    stiffness: reduceMotion ? 1000 : 105,
    damping: reduceMotion ? 100 : 25,
    mass: 0.65,
  });
  const nameY = useTransform(smoothProgress, [0, 0.55, 1], ['0vh', '-18vh', '-37vh']);
  const nameScale = useTransform(smoothProgress, [0, 1], [1, 0.9]);
  const portraitOpacity = useTransform(smoothProgress, [0, 0.06, 0.38, 0.8], [0, 0.72, 0.96, 1]);
  const portraitClip = useTransform(
    smoothProgress,
    [0, 0.8, 1],
    ['inset(30% 28% 42% 28% round 42%)', 'inset(0% 0% 0% 0% round 0%)', 'inset(0% 0% 0% 0% round 0%)'],
  );

  useMotionValueEvent(smoothProgress, 'change', (value) => {
    setIntroStage(value > 0.5 ? 'reveal' : 'title');
    if (value >= 0.8) {
      if (!actionVisible.current && actionTimer.current === null) {
        actionTimer.current = setTimeout(() => {
          actionTimer.current = null;
          actionVisible.current = true;
          setShowAction(true);
        }, reduceMotion ? 0 : 1500);
      }
      return;
    }

    if (actionTimer.current !== null) {
      clearTimeout(actionTimer.current);
      actionTimer.current = null;
    }
    if (actionVisible.current) {
      actionVisible.current = false;
      setShowAction(false);
    }
  });

  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;

    const setProgress = (delta: number, distance: number) => {
      progress.set(Math.max(0, Math.min(1, progress.get() + delta / distance)));
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setProgress(event.deltaY, 1100);
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
      touchStartProgress.current = progress.get();
      touchDeltaY.current = 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0]?.clientY;
      if (touchStartY.current === null || touchY === undefined) return;
      event.preventDefault();
      const deltaY = touchStartY.current - touchY;
      touchDeltaY.current = deltaY;
      progress.set(Math.max(0, Math.min(1, touchStartProgress.current + deltaY / 420)));
    };
    const onTouchEnd = () => {
      if (Math.abs(touchDeltaY.current) >= 70) {
        progress.set(touchDeltaY.current > 0 ? 1 : 0);
      }
      touchStartY.current = null;
      touchDeltaY.current = 0;
    };

    screen.addEventListener('wheel', onWheel, { passive: false });
    screen.addEventListener('touchstart', onTouchStart, { passive: true });
    screen.addEventListener('touchmove', onTouchMove, { passive: false });
    screen.addEventListener('touchend', onTouchEnd);
    screen.addEventListener('touchcancel', onTouchEnd);
    return () => {
      if (actionTimer.current !== null) {
        clearTimeout(actionTimer.current);
        actionTimer.current = null;
      }
      screen.removeEventListener('wheel', onWheel);
      screen.removeEventListener('touchstart', onTouchStart);
      screen.removeEventListener('touchmove', onTouchMove);
      screen.removeEventListener('touchend', onTouchEnd);
      screen.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [progress]);

  return (
    <motion.section
      ref={screenRef}
      className={`intro-screen ${introStage === 'title' ? 'is-title-stage' : 'is-reveal-stage'}`}
      aria-label="Opening title. Scroll or swipe down to reveal your portrait."
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === ' ' && event.target instanceof HTMLButtonElement) return;
        const increments: Record<string, number> = {
          ArrowDown: 0.16,
          PageDown: 0.35,
          ' ': 0.35,
          ArrowUp: -0.16,
          PageUp: -0.35,
        };
        if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          progress.set(event.key === 'Home' ? 0 : 1);
        }
        if (event.key in increments) {
          event.preventDefault();
          progress.set(Math.max(0, Math.min(1, progress.get() + increments[event.key])));
        }
      }}
      style={{ touchAction: 'none' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.68, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        className="intro-portrait"
        src="/assets/drose-shane-cryo-em-specialist-portrait-warm.webp"
        alt=""
        aria-hidden="true"
        style={{ opacity: portraitOpacity, clipPath: portraitClip }}
      />
      <div className="intro-content">
        <motion.h1
          className="name-display"
          style={{ y: nameY, scale: nameScale }}
        >
          <motion.span
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.12, duration: reduceMotion ? 0.01 : 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            DROSE
          </motion.span>{' '}
          <motion.em
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0.01 : 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            SHANE
          </motion.em>
        </motion.h1>
      </div>
      {introStage === 'title' && (
        <motion.button
          className="intro-scroll-hint"
          type="button"
          aria-label="Scroll down to reveal the portrait"
          onClick={() => progress.set(1)}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.6, duration: reduceMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="intro-scroll-label">SCROLL DOWN</span>
          <span className="intro-scroll-mouse" aria-hidden="true"><i /></span>
          <span className="intro-scroll-chevrons" aria-hidden="true"><i /><i /><i /></span>
        </motion.button>
      )}
      {showAction && (
        <motion.div
          className="intro-action"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.36, ease: [0.22, 1, 0.36, 1] }}
        >
          <button className="intro-next-button" type="button" onClick={onEnter}>
            My Portfolio
          </button>
        </motion.div>
      )}
    </motion.section>
  );
}

interface ProfileScreenProps {
  profiles: Profile[];
  selected: ProfileId | null;
  onSelect: (profile: ProfileId) => void;
  onBack?: () => void;
}

function ProfileArtwork({ profile }: { profile: Profile }) {
  return (
    <img
      className={`profile-artwork profile-${profile.id}-image`}
      src={profile.image}
      alt={profile.imageAlt}
      decoding="async"
      fetchPriority={profile.id === 'scientist' ? 'high' : 'low'}
    />
  );
}

export function ProfileScreen({ profiles, selected, onSelect, onBack }: ProfileScreenProps) {
  const reduceMotion = useReducedMotion();
  const firstChoice = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstChoice.current?.focus();
  }, []);

  return (
    <motion.section
      className="profile-screen"
      aria-labelledby="profile-heading"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -14 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="profile-screen-top">
        <a className="brand-lockup" href="#home" aria-label="Drose Shane">
          <img className="brand-logo" src="/assets/drose-shane-logo-blended.webp" alt="" />
        </a>
        {onBack && <button className="text-button" type="button" onClick={onBack}>← Back to portfolio</button>}
      </div>
      <div className="profile-picker">
        <h1 id="profile-heading">Explore <em>my world</em></h1>
        <p className="profile-explainer">From molecular science to digital solutions. Choose a journey to discover my work, expertise, and ideas.</p>
        <div className="profile-options">
          {profiles.map((profile, index) => (
            <motion.button
              className={`profile-choice profile-${profile.id}${selected === profile.id ? ' is-selected' : ''}`}
              key={profile.id}
              ref={index === 0 ? firstChoice : undefined}
              type="button"
              onClick={() => onSelect(profile.id)}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.04 + index * 0.045, duration: reduceMotion ? 0.01 : 0.3 }}
            >
              <span className="profile-avatar">
                <ProfileArtwork profile={profile} />
                <span className="profile-card-shade" />
                <span className="profile-card-content">
                  <span className="profile-index">0{index + 1}<i /></span>
                  <strong><span>The</span> <em>{profile.name.replace(/^The /, '')}</em></strong>
                  <span className="profile-descriptor">{profile.descriptor}</span>
                  <span className="profile-description">{profile.description}</span>
                </span>
                <span className="profile-arrow" aria-hidden="true">→</span>
              </span>
            </motion.button>
          ))}
        </div>
        <p className="profile-footer">YOUR EXPERIENCE, YOUR WAY <span>·</span> PRESS A PROFILE TO BEGIN</p>
      </div>
      <p className="profile-screen-footer">© {new Date().getFullYear()} Drose Ignatious Shane. All rights reserved.</p>
    </motion.section>
  );
}

interface ExperienceTransitionProps {
  screen: 'intro' | 'profiles' | 'home';
  onEnter: () => void;
  profiles: Profile[];
  selected: ProfileId | null;
  onSelect: (profile: ProfileId) => void;
  onBack?: () => void;
}

export function ExperienceTransition(props: ExperienceTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      {props.screen === 'intro' ? (
        <IntroScreen key="intro" onEnter={props.onEnter} />
      ) : (
        <ProfileScreen
          key="profiles"
          profiles={props.profiles}
          selected={props.selected}
          onSelect={props.onSelect}
          onBack={props.onBack}
        />
      )}
    </AnimatePresence>
  );
}
