# Minimal React Portfolio (Modern + Minimal)

A clean portfolio template to showcase:
- UI/UX Design (Website UI, Dashboards, App screens)
- Software / Websites
- Photography gallery
- Optional Three.js hero accent

## Tech
- React + Vite
- TailwindCSS
- React Router
- Framer Motion (subtle animations)
- Lucide Icons
- Three.js (via @react-three/fiber) — optional but included

## Quick Start
```bash
npm install
npm run dev
```

## Customize Content
Edit these files:
- `src/data/projects.js` (projects + categories)
- `src/data/photos.js` (photography items)
- `src/content/profile.js` (your About + links)

## Build
```bash
npm run build
npm run preview
```

## Notes
- Add your real images into `public/works/` and update paths in data files.
- If you don’t want the Three.js hero background, set `threeHero: false` in `src/content/profile.js`.
