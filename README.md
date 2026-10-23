# Drose Shane — From Molecular Science to Digital Solutions

A cinematic portfolio for Cryo-EM specialist and scientific-facility systems builder Drose Shane. Built with React, TypeScript, Vite, Framer Motion, and Lenis. Profile cards and project artwork use supplied imagery and original CSS/DOM artwork, with project cards linking to the live systems.

## Requirements

- Node.js 18 or newer
- npm

## Install and run

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build and preview

```sh
npm run build
npm run preview
```

The production site is generated in `dist/` and can be deployed to a static host such as Render, Netlify, or Vercel.

## Portfolio content

- `src/data/portfolio.ts` is the structured source of truth for profiles, current experience, teaching/training/volunteering, cryo-EM preparation equipment and data-collection methods, three research projects, separate degree records and academic achievement, publications, and all four live projects.
- `public/assets/project-covers/` contains four single-image project covers for ACCEM, TEM, Histopathology Facility Booking, and FACS. All four covers use homepage screenshots supplied by the portfolio owner. Public facility statistics are included only where displayed by those sites.
- `src/PortfolioApp.tsx` assembles a profile-specific portfolio: Scientist shows cryo-EM experience, projects, publications, and education; Builder focuses on digital workflows and live websites; Full Story combines both paths.
- `src/components/ExperienceScreens.tsx` contains the cinematic intro and viewer profile selector.
- `src/components/PortfolioUI.tsx` contains navigation, search, original project artwork, carousels, and shared-element project detail dialogs.
- `src/styles.css` contains responsive styling, animation, focus states, and reduced-motion fallbacks.
- `public/assets/protein-rotation.mp4` and `drose-shane-protein-rotation-poster.jpg` are supplied media assets.
- `public/assets/drose-shane-cryo-em-specialist-portrait-warm.webp` is the alternate optimized portrait layered into the home hero.
- The `public/assets/drose-shane-*-profile.webp` files are resized, optimized profile-card images for The Scientist, The Builder, and The Full Story. Project-cover screenshots are served as resized WebP files.

No technology stack, impact metrics, or personal contact address is invented. Facility project details link to the live websites and do not expose source repository links.

## Accessibility and behavior

- The opening and closing display titles use Georgia for a consistent visual identity.
- The cinematic intro and profile selector are shown on every page load; the selected profile is retained for the browser session and preselected in the profile selector.
- Profile choices use large image-led cards with profile-specific “best for” guidance, a “Start here” Full Story option, restrained tilt/zoom hover behavior, and readable vertical stacking on small screens.
- The Scientist profile focuses its Projects section on the three research projects; facility website cards and project search are shown in Builder and Full Story. Full Story brings the research cards and facility websites together in one section, alongside cryo-EM experience, digital development, publications, and education.
- Profile choices and portfolio cards share a theme-matched pointer-following shadow, with the glow shifting as the pointer moves across each tile.
- Each portfolio has a single top navigation; redundant numbered section tiles have been removed.
- Teaching, training, and volunteering contributions appear beneath professional experience in Scientist and Full Story.
- Selecting The Scientist, The Builder, or The Full Story applies a smoothly transitioning electric-blue, violet, or green theme across the portfolio.
- The intro has an animated “Scroll up” cue and a visible “Skip intro” button. Visitors may also press Enter or Escape to continue; scrolling or swiping reveals the portrait. The “My Portfolio” button appears after the portrait is revealed.
- Search filters all four projects by their titles, categories, descriptions, features, and tags.
- Project details include the operational need, supported workflows, tags, and the provided live website links.
- Publication entries, including DOI links, are data-driven in `src/data/portfolio.ts`.
- External project links use a new tab with `noopener noreferrer`.
- Dialogs support Escape, focus restoration, and a keyboard focus loop.
- Smooth scrolling, hero parallax, card entrances, and shared-element project transitions are reduced or disabled for visitors who prefer reduced motion.
