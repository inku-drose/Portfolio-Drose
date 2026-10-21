# Drose Shane — From Molecular Science to Digital Solutions

A cinematic, Netflix-inspired portfolio for Cryo-EM specialist and scientific-facility systems builder Drose Shane. Built with React, TypeScript, Vite, and Framer Motion. The featured title card uses a supplied, optimized looping protein-rotation video; project cards use original CSS/DOM artwork and link to the supplied live systems and repositories.

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

- `src/data/portfolio.ts` is the structured source of truth for profiles, current experience, teaching/training/volunteering, cryo-EM workflow, three research projects, separate degree records and academic achievement, publications, and all four live projects.
- `public/assets/project-covers/` contains four single-image project covers for ACCEM, TEM, Histopathology Facility Booking, and FACS. All four covers use homepage screenshots supplied by the portfolio owner. Public facility statistics are included only where displayed by those sites.
- `src/PortfolioApp.tsx` assembles a profile-specific portfolio: Scientist shows cryo-EM experience, projects, publications, and education; Builder focuses on digital workflows and live websites; Full Story combines both paths.
- `src/components/ExperienceScreens.tsx` contains the cinematic intro and viewer profile selector.
- `src/components/PortfolioUI.tsx` contains navigation, search, original project artwork, carousels, and the project detail dialog.
- `src/styles.css` contains responsive styling, animation, focus states, and reduced-motion fallbacks.
- `public/assets/protein-rotation.mp4` and `drose-shane-protein-rotation-poster.jpg` provide the 60 fps title-card background video and its still fallback.
- `public/assets/drose-shane-cryo-em-specialist-portrait-warm.webp` is the alternate optimized portrait layered into the home hero.
- The `public/assets/drose-shane-*-profile.png` files are the supplied profile-card images for The Scientist, The Builder, and The Full Story.

No technology stack, impact metrics, or personal contact address is invented. Facility project details link to the live websites and do not expose source repository links.

## Accessibility and behavior

- Compare the thirteen opening-title font options at `/#font-comparison`; use “Return to portfolio” to go back to the intro. Google Sans is attempted from locally installed fonts only, with an Outfit fallback.
- The opening name uses Georgia; the comparison sheet remains available for reference.
- The cinematic intro and profile selector are shown on every page load; the selected profile is retained for the browser session and preselected in the profile selector.
- Profile choices use large image-led cards with profile-colored hover and focus states; on small screens they stack vertically for readable descriptions and easier selection.
- The Scientist profile focuses its Projects section on the three research projects; facility website cards and project search are shown in Builder and Full Story. Full Story brings the research cards and facility websites together in one section, alongside cryo-EM experience, digital development, publications, and education.
- Profile choices and portfolio cards share a theme-matched pointer-following shadow, with the glow shifting as the pointer moves across each tile.
- The Scientist hero text is positioned lower over the portrait, and its section navigation appears as rectangular clickable tiles below the hero. Builder and Full Story also use profile-specific rectangular section tiles, alongside their top navigation.
- Teaching, training, and volunteering contributions appear beneath professional experience in Scientist and Full Story.
- Selecting The Scientist, The Builder, or The Full Story applies a smoothly transitioning electric-blue, violet, or green theme across the portfolio.
- The intro opens on the name alone with an animated “Scroll down” cue. Scroll or swipe to reveal the centered, softly blended portrait; the cue disappears as the uppercase name scales down and settles at the top. The “My Portfolio” button appears automatically 1.5 seconds after the portrait is fully revealed.
- Search filters all four projects by their titles, categories, descriptions, features, and tags.
- Project details include the operational need, supported workflows, tags, and the provided live website links.
- Publication entries, including DOI links, are data-driven in `src/data/portfolio.ts`.
- External project links use a new tab with `noopener noreferrer`.
- Dialogs support Escape, focus restoration, and a keyboard focus loop.
- The title-card video loops silently when motion is allowed; visitors with `prefers-reduced-motion` see its still poster instead.
- Screen, card, and modal transitions animate opacity and transforms for efficient rendering at the display's available refresh rate. The browser and device determine whether that is 60 Hz, 120 Hz, or another rate.
