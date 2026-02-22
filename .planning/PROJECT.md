# Good Gradients v2: Design Overhaul & Scale

## What This Is

Good Gradients is a CSS gradient & animation tool for frontend engineers. v2 transforms it from a functional side project into a premium, polished product with 1000+ algorithmically generated gradients, light/dark theming, delightful motion design, and a distinctive visual identity that doesn't look AI-generated.

## Core Value

A massive, well-curated gradient library with instant code export — beautiful to browse, fast to use, and genuinely fun to interact with.

## Requirements

### Validated

- ✓ Browse curated gradients in a searchable, filterable gallery — existing
- ✓ Select gradient and view detail modal with preview — existing
- ✓ Export to Vanilla CSS, Tailwind, and AI description — existing
- ✓ Apply animations to gradients (13 presets) — existing
- ✓ Animation Studio flow (animation-first) — existing
- ✓ Save favorites to localStorage — existing
- ✓ Share via URL (full state serialization) — existing
- ✓ Keyboard shortcuts for power users — existing
- ✓ WCAG contrast information — existing
- ✓ Virtual scrolling for large lists — existing
- ✓ PWA support — existing

### Active

- [ ] Light & dark mode with system detection (dark default)
- [ ] 1000+ algorithmically generated gradients from color theory
- [ ] Gradient categorization by mood (Warm, Cool, Vibrant, etc.) AND use case (Hero, Card, Button, etc.)
- [ ] Chunked static JSON for lazy loading at scale (no backend)
- [ ] Premium visual identity — Linear/Vercel aesthetic, not generic shadcn
- [ ] Motion & delight — page transitions, spring animations, entrance effects
- [ ] Global animation hover preview — hovering an animation option temporarily applies it to all visible cards
- [ ] Full design audit — typography, spacing, card design, overall personality
- [ ] Gradient naming with craft — evocative names inspired by nature, materials, trends

### Out of Scope

- Backend/API — staying static on GitHub Pages
- User-submitted gradients — future feature
- Scraping external gradient sites — generating our own instead
- Community features — no accounts, comments, or sharing beyond URL

## Context

- **Current state:** ~500 gradient presets in a static JSON array, 13 animation presets, dark-only UI
- **Architecture:** URL-driven SPA with React 19, Vite, Tailwind CSS 4, virtual scrolling
- **Hosting:** GitHub Pages (static, free) — must stay static
- **Pain points:** UI feels generic/AI-generated, gradient collection doesn't feel curated enough, lacks personality and delight
- **Existing codebase map:** Available at `.planning/codebase/`

## Constraints

- **Hosting**: GitHub Pages (static only) — no server-side rendering, no API endpoints
- **Build-time generation**: All 1000+ gradients must be generated at build time and served as static assets
- **Performance**: Virtual scrolling already exists but must handle 10x more items smoothly
- **Bundle size**: Gradient data should be chunked and lazy-loaded, not bundled into main JS

## Key Decisions

| Decision                                     | Rationale                                                     | Outcome   |
| -------------------------------------------- | ------------------------------------------------------------- | --------- |
| Dark mode default                            | Current aesthetic is dark, most dev tools are dark-first      | — Pending |
| Static chunked JSON over backend             | Keeps hosting free, GitHub Pages compatible                   | — Pending |
| Algorithmic generation over scraping         | Own the content, control quality, avoid legal issues          | — Pending |
| Premium/clean aesthetic (Linear/Vercel vibe) | Differentiate from generic tool look, build trust             | — Pending |
| Global hover preview for animations          | "Try before you commit" — all cards animate together on hover | — Pending |

---

_Last updated: 2026-02-21 after initialization_
