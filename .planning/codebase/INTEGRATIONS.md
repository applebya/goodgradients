# External Integrations

**Analysis Date:** 2025-02-21

## APIs & External Services

**Analytics & Feature Flags:**

- PostHog - User behavior tracking and feature flag management
  - SDK/Client: `posthog-js` 1.244.0
  - Configuration: `src/lib/analytics.ts`
  - Auth: `VITE_PUBLIC_POSTHOG_KEY` (public API key)
  - Host: `VITE_PUBLIC_POSTHOG_HOST` (defaults to `https://us.i.posthog.com`)
  - Features: Automatic pageview tracking, pageleave tracking, custom event capture
  - Disabled: Development mode and when key not configured

**GitHub API:**

- GitHub Repository API - Fetch GitHub star count for repository badge
  - Endpoint: `https://api.github.com/repos/applebya/goodgradients`
  - Client: Fetch API (no SDK)
  - Component: `src/components/GitHubStars.tsx`
  - Features: Public API (no auth required), 1-hour local cache via localStorage
  - Fails gracefully: Badge shows "Star" text if fetch fails

**Fonts:**

- Google Fonts - Molle italic font for branding
  - URL: `https://fonts.googleapis.com/css2?family=Molle:ital@1&display=swap`
  - Usage: `index.html` preconnect + link tags
  - Caching: PWA service worker caches fonts for 1 year (`.gstatic.com` origin)

## Data Storage

**Databases:**

- None - Application is stateless (client-only)

**Local Storage:**

- Browser localStorage - Persists user data
  - `goodgradients_favorites_v2` - Favorite gradients (encoded definitions)
  - `github-stars-cache` - Cached GitHub star count with 1-hour TTL
  - Keys managed in `src/lib/favorites.ts` and `src/components/GitHubStars.tsx`

**File Storage:**

- None - No file upload capability
- Gradient definitions stored as URL parameters or localStorage strings

**Caching:**

- PWA Service Worker (Workbox) configured in `vite-plugin-pwa` (`vite.config.ts`)
  - Caches: `*.js`, `*.css`, `*.html`, `*.ico`, `*.png`, `*.svg`, `*.woff`, `*.woff2`
  - Google Fonts runtime caching: Cache-First strategy, 1-year expiry
  - Auto-update on new deployment

## Authentication & Identity

**Auth Provider:**

- None - Application is fully public with no user accounts

**Access Control:**

- No authentication required
- All features available to all users

## Monitoring & Observability

**Error Tracking:**

- None configured - No error tracking service integrated
- Console errors logged to browser dev tools only

**Logs:**

- Browser console logs for analytics initialization
- PostHog automatic event capture for user behavior
- GitHub Actions workflow logs for deployments

**Uptime Monitoring:**

- GitHub Actions cron job (`.github/workflows/uptime.yml`)
  - Runs daily at 6am PT
  - Checks: HTTPS, HTTP redirect, WWW redirect
  - Creates GitHub issue on failure
  - Monitors: `https://goodgradients.com`, `http://goodgradients.com`, `https://www.goodgradients.com`

## CI/CD & Deployment

**Hosting:**

- GitHub Pages - Static site hosting
  - Custom domain: `goodgradients.com`
  - HTTPS: Automatic via GitHub
  - Root path: `/`

**CI Pipeline:**

- GitHub Actions (`.github/workflows/deploy.yml`)
  - Trigger: Push to main branch or manual workflow_dispatch
  - Steps:
    1. Checkout code
    2. Setup bun
    3. Install dependencies
    4. Build (TypeScript + Vite)
    5. Run Playwright E2E tests (non-blocking)
    6. Deploy to GitHub Pages
  - Environment injection: PostHog keys injected at build time
  - Test results: Uploaded as artifact (30-day retention)

## Environment Configuration

**Required env vars (build-time):**

- `VITE_PUBLIC_POSTHOG_KEY` - PostHog public API key (from GitHub Actions secrets)
- `VITE_PUBLIC_POSTHOG_HOST` - PostHog host endpoint (optional, defaults to US)

**Secrets location:**

- GitHub Actions secrets (`.github/workflows/deploy.yml`)
- No local `.env` file in version control
- `.env.example` documents the expected variables

**Build-time injection:**

- Variables prefixed `VITE_PUBLIC_` are injected at build time
- Available in browser via `import.meta.env`
- Non-public vars would be stripped in client build

## Webhooks & Callbacks

**Incoming:**

- None - No backend to receive webhooks

**Outgoing:**

- None - Application makes no outbound webhooks
- GitHub Actions can create issues on uptime failure

**GitHub Integration:**

- GitHub Pages deployment (automatic on push to main)
- GitHub API calls for star count (read-only, public)
- GitHub Actions for CI/CD

## Third-Party Services Integration Summary

| Service        | Purpose                   | Auth Method     | Status                    |
| -------------- | ------------------------- | --------------- | ------------------------- |
| PostHog        | Analytics & feature flags | Public API key  | Active in production      |
| GitHub Pages   | Static hosting            | Repo access     | Active                    |
| GitHub API     | Star count badge          | Public endpoint | Active, graceful fallback |
| Google Fonts   | Typography (Molle)        | Public URL      | Active, PWA cached        |
| GitHub Actions | CI/CD & uptime monitoring | Repo access     | Active                    |

---

_Integration audit: 2025-02-21_
