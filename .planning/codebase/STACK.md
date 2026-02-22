# Technology Stack

**Analysis Date:** 2025-02-21

## Languages

**Primary:**

- TypeScript 5.7.2 - Application code, strict mode enabled
- JavaScript - Build configuration and scripts
- CSS 3 - Custom gradient and animation styles (not Tailwind)
- HTML 5 - Static markup in `index.html`

**Secondary:**

- YAML - GitHub Actions workflows

## Runtime

**Environment:**

- Node.js (via bun)
- Browser (ES2020 target)

**Package Manager:**

- bun (latest) - Primary package manager
- Lockfile: `bun.lockb` (binary lockfile format)

## Frameworks

**Core:**

- React 19.2.0 - UI framework
- Vite 6.0.5 - Build tool and dev server
- Tailwind CSS 4.1.18 - UI component styling (not gradient styling)

**UI Components:**

- Radix UI (multiple packages) - Unstyled, accessible component primitives
  - `@radix-ui/react-dialog` ^1.1.6 - Modal dialogs
  - `@radix-ui/react-label` ^2.1.2 - Form labels
  - `@radix-ui/react-popover` ^1.1.15 - Popover positioning
  - `@radix-ui/react-select` ^2.2.6 - Dropdown selects
  - `@radix-ui/react-slot` ^1.1.2 - Component composition
  - `@radix-ui/react-tabs` ^1.1.3 - Tabbed interfaces
  - `@radix-ui/react-tooltip` ^1.1.8 - Tooltip overlays

**Build & Dev:**

- @vitejs/plugin-react-swc 3.7.2 - React JSX transform using SWC (faster than Babel)
- @tailwindcss/vite 4.1.18 - Tailwind CSS Vite plugin
- vite-plugin-pwa 1.2.0 - Progressive Web App support (Workbox)
- rollup-plugin-visualizer 6.0.5 - Bundle size analysis

**Testing:**

- Playwright 1.57.0 - E2E testing (`@playwright/test`)
- Vitest 4.0.16 - Unit testing framework
- @axe-core/playwright 4.11.0 - Accessibility testing

**Linting & Type Checking:**

- TypeScript 5.7.2 - Type checking via `tsc -b`
- ESLint 9.39.1 - Code linting
- typescript-eslint 8.46.4 - TypeScript ESLint rules
- eslint-plugin-react-hooks 7.0.1 - React hooks linting
- eslint-plugin-react-refresh 0.4.24 - React refresh linting

## Key Dependencies

**Critical:**

- react 19.2.0 - Core UI rendering
- react-dom 19.2.0 - DOM rendering
- posthog-js 1.244.0 - Analytics and feature flags
- @tanstack/react-virtual 3.13.18 - Virtual scrolling (optimization for large lists)

**Utilities:**

- clsx 2.1.1 - Conditional CSS class composition
- tailwind-merge 3.4.0 - Tailwind class deduplication and conflict resolution

**Deployment:**

- gh-pages 6.2.0 - GitHub Pages deployment helper

## Configuration

**Environment:**

- Environment variables are Vite public (prefixed `VITE_PUBLIC_`)
- `VITE_PUBLIC_POSTHOG_KEY` - PostHog analytics key
- `VITE_PUBLIC_POSTHOG_HOST` - PostHog ingestion endpoint (defaults to `https://us.i.posthog.com`)
- Set via GitHub Actions at build time in `.github/workflows/deploy.yml`
- No `.env` file in production (values injected at build)

**Build:**

- `vite.config.ts` - Vite configuration with PWA, alias, and build target
- `tsconfig.json` - TypeScript strict mode, ES2020 target, path aliases (`@/*`)
- `tsconfig.node.json` - Config for build-time TypeScript (Vite config)
- `playwright.config.ts` - E2E test configuration (Chromium only)
- `eslint.config.js` - ESLint configuration
- `vitest.config.ts` - Unit test configuration

## Platform Requirements

**Development:**

- Node.js 18+ (bun compatible)
- bun package manager
- Playwright browsers (installed via `bunx playwright install`)

**Production:**

- Static hosting (GitHub Pages)
- Custom domain: goodgradients.com
- HTTPS required (GitHub Pages enforces)
- Root path `/` (not a subdirectory)

## Build & Deployment Pipeline

**Development Server:**

```bash
bun run dev
```

- Port: 3000
- Auto-reload on changes
- Source maps enabled

**Production Build:**

```bash
bun run build
```

- TypeScript type checking (`tsc -b`)
- Vite bundling to `dist/` directory
- PWA service worker generated
- Bundle analysis report: `bundle-stats.html`
- Environment variables injected at build time

**Deployment:**

- GitHub Actions (`.github/workflows/deploy.yml`)
- Triggered on push to main
- Builds with bun
- Runs Playwright tests (non-blocking)
- Deploys to GitHub Pages using `actions/deploy-pages@v4`

**Uptime Monitoring:**

- Cron job daily at 6am PT (`.github/workflows/uptime.yml`)
- Checks HTTPS, HTTP redirect, and www redirect
- Creates GitHub issue on failure

---

_Stack analysis: 2025-02-21_
