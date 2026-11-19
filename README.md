# Tzoni Litsai — Portfolio

Personal site for Tzoni Litsai, software developer and founder of LitsAI Technologies.

**Stack:** React 18 · Vite · [Motion](https://motion.dev) (animation) · [Lenis](https://lenis.darkroom.engineering) (smooth scroll) · plain CSS with design tokens.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Editing content

All copy lives in **`src/data/site.js`**: profile, projects, experience, stack, stats and the ⌘K quick answers. You shouldn't need to touch components to update the site.

Project screenshots live in `src/assets/work/` (16:10-ish JPEGs, ~1600px wide).

## Structure

```
src/
  data/site.js          content
  styles/globals.css    tokens, type, buttons, shared effects
  components/           Nav, CommandMenu (⌘K), motion primitives, icons
  sections/             Hero, Work, About, Experience, Stack, Contact (+ footer)
  hooks/                smooth scroll, active section, spotlight, clock, copy email
```

Animations respect `prefers-reduced-motion`.
