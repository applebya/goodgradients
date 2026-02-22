# Codebase Structure

**Analysis Date:** 2026-02-21

## Directory Layout

```
goodgradients/
├── src/                       # Application source code
│   ├── components/            # React UI components
│   ├── data/                  # Preset gradients and animations
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and transformations
│   ├── index.css              # Tailwind + animation keyframes
│   ├── types.ts               # TypeScript type definitions
│   ├── App.tsx                # Main app component (routes, layout)
│   └── main.tsx               # React entry point
├── e2e/                       # Playwright E2E tests
├── public/                    # Static assets (favicons, OG images, etc.)
├── .github/workflows/         # CI/CD (deploy.yml)
├── index.html                 # HTML entry point (SEO meta tags)
├── vite.config.ts             # Build config (React, Tailwind, PWA)
├── tsconfig.json              # TypeScript strict mode
├── playwright.config.ts       # E2E test config
└── package.json               # Dependencies (React 18, Vite, Tailwind, shadcn/ui)
```

## Directory Purposes

**`src/components/`:**

- Purpose: React UI components for rendering
- Contains: Page layout, filters, gallery grid, detail modal, headers, footers
- Key files:
  - `App.tsx` - Main app wrapper, routing logic, layout
  - `Header.tsx` - Search bar, category/color/tag filters (desktop)
  - `FilterBar.tsx` - Filter controls (desktop only)
  - `MobileFilterSheet.tsx` - Filter sheet (mobile only)
  - `GradientGallery.tsx` - Grid layout with filtering and virtualization
  - `GradientCard.tsx` - Single gradient card in gallery
  - `GradientDetail.tsx` - Modal (lazy-loaded) with export tabs
  - `AnimationSpeedSlider.tsx` - Animation duration picker
  - `ShareMenu.tsx` - Share button with URL copy
  - `Footer.tsx` - Keyboard shortcuts display
  - `PrivacyPolicy.tsx` - Privacy page
  - `ErrorBoundary.tsx` - Error fallback UI
  - `ui/` - Minimal shadcn/ui components (button, dialog, tabs, badge, tooltip, etc.)

**`src/data/`:**

- Purpose: Preset data (gradients and animations)
- Contains: 500+ gradient definitions and 13 animation presets
- Key files:
  - `gradients.ts` - All gradient presets (organized by category: Purple, Blue, Green, etc.)
  - `animations.ts` - Animation presets (Movement, Rotation, Pulse, Morph, Wave)

**`src/hooks/`:**

- Purpose: Custom React hooks for state and behavior
- Key files:
  - `useAppState.ts` - Central state management (returns state + actions)
  - `useKeyboard.ts` - Keyboard shortcut handling
  - `useMediaQuery.ts` - Responsive breakpoint detection (mobile/desktop)
  - `useLocale.ts` - Color naming (British vs. American spelling)

**`src/lib/`:**

- Purpose: Utility functions and transformations (no React)
- Key files:
  - `state.ts` - URL serialization/parsing, history management
  - `gradient-url.ts` - Gradient encoding/decoding (definition ↔ URL-safe string)
  - `gradient.ts` - CSS generation utilities
  - `export.ts` - Code generation (vanilla CSS, Tailwind, AI)
  - `color-format.ts` - Color space conversion (hex ↔ rgb ↔ hsl, etc.)
  - `contrast.ts` - WCAG contrast ratio calculations
  - `favorites.ts` - localStorage persistence for favorites
  - `wizard.ts` - Color filter utilities
  - `csv-export.ts` - Bulk export utility
  - `utils.ts` - UI utilities (clsx, tw-merge)
  - `analytics.ts` - PostHog initialization

**`e2e/`:**

- Purpose: End-to-end tests (Playwright)
- Contains: User flow tests covering gallery browsing, modal, exports, sharing
- Key files:
  - `gradients.spec.ts` - Main E2E test suite

**`public/`:**

- Purpose: Static assets (not processed by bundler)
- Contains: Favicons (icon-192.svg, icon-512.svg), touch icons, manifest.json

## Key File Locations

**Entry Points:**

- `index.html` - HTML document with root div, SEO meta tags, JSON-LD schema
- `src/main.tsx` - React root initialization
- `src/App.tsx` - App component tree

**Configuration:**

- `vite.config.ts` - Vite + React + Tailwind + PWA plugin config
- `tsconfig.json` - Strict TypeScript settings
- `package.json` - Dependencies and scripts

**Core Logic:**

- `src/types.ts` - All type definitions (AppState, GradientDefinition, etc.)
- `src/hooks/useAppState.ts` - State management (central hub)
- `src/lib/state.ts` - URL ↔ state serialization
- `src/lib/gradient-url.ts` - Gradient encoding/decoding
- `src/data/gradients.ts` - All 500+ gradient presets

**Testing:**

- `e2e/gradients.spec.ts` - E2E tests
- `src/lib/contrast.test.ts` - Unit test example
- `src/lib/gradient-url.test.ts` - URL encoding unit tests

## Naming Conventions

**Files:**

- Components: PascalCase (e.g., `GradientCard.tsx`)
- Utilities: camelCase (e.g., `formatContrastRatio.ts`)
- Types: Use `types.ts` barrel or co-located with component/utility
- Tests: `.test.ts` or `.spec.ts` suffix

**Directories:**

- Feature folders: lowercase plural (e.g., `components/`, `data/`, `hooks/`)
- Sub-folders: lowercase (e.g., `ui/` for base components)

**Functions:**

- Actions: verb-first (e.g., `selectGradient`, `toggleFavorite`, `exportVanillaCSS`)
- Getters: `get` prefix (e.g., `getInitialState`, `getShareableURL`)
- Hooks: `use` prefix (e.g., `useAppState`, `useKeyboard`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `URL_DEBOUNCE_MS`, `STORAGE_KEY`)

**Variables:**

- State variables: descriptive noun (e.g., `selectedGradient`, `animationSpeed`)
- Booleans: `is`/`has`/`show` prefix (e.g., `isAnimating`, `hasActiveFilters`, `showSplash`)
- Enums/unions: PascalCase values (e.g., `GradientCategory`, `ColorFormat`)

**Types:**

- Interfaces: CapitalCase, often suffixed with type context (e.g., `GradientPreset`, `AppState`, `GradientDefinition`)
- Type unions: CapitalCase values (e.g., `"hex" | "rgb" | "rgba"`)

## Where to Add New Code

**New Feature (e.g., new filter type):**

- Primary code: Add to `src/hooks/useAppState.ts` (new action) + `src/lib/state.ts` (URL serialization)
- Component changes: Update `src/components/FilterBar.tsx` or `src/components/Header.tsx`
- Tests: Add to `e2e/gradients.spec.ts`

**New Component/Module:**

- Implementation: `src/components/YourComponent.tsx`
- Import utilities from `src/lib/` and hooks from `src/hooks/`
- Use types from `src/types.ts`

**Utilities:**

- Shared helpers: `src/lib/utils.ts`
- Domain-specific (color): `src/lib/color-format.ts`
- Domain-specific (export): `src/lib/export.ts`
- Domain-specific (state): `src/lib/state.ts`

**New Data (gradients or animations):**

- Gradients: Add to `src/data/gradients.ts` (must include id, name, description, category, gradient CSS, colors, tags)
- Animations: Add to `src/data/animations.ts` (must include id, name, description, keyframes CSS, property)

**Tests:**

- E2E: `e2e/gradients.spec.ts` (Playwright)
- Unit: Co-located `*.test.ts` file (e.g., `src/lib/contrast.test.ts`)

## Special Directories

**`dist/`:**

- Purpose: Production build output (compiled HTML, CSS, JS)
- Generated: Yes (by `bun run build`)
- Committed: No (in `.gitignore`)

**`node_modules/`:**

- Purpose: Installed dependencies
- Generated: Yes (by `bun install`)
- Committed: No

**`public/`:**

- Purpose: Static assets served as-is (not bundled)
- Contains: Favicons, OG images, manifest.json
- Committed: Yes (these don't change often)

**`.planning/`:**

- Purpose: GSD planning documents (architecture, structure, concerns)
- Contains: ARCHITECTURE.md, STRUCTURE.md, etc.
- Committed: Yes

**`.github/workflows/`:**

- Purpose: CI/CD automation
- Contains: deploy.yml (builds and deploys to GitHub Pages on push to main)
- Committed: Yes

**`.claude/`:**

- Purpose: Claude-specific configuration
- Contains: Project instructions and settings
- Committed: Yes (shared context for Claude)

## URL State Structure

The app uses URL query parameters to encode all browseable state. Understanding this is critical for adding features:

**Current URL Format:**

```
?g=667eea-764ba2              # Gradient colors (dash-separated hex)
&type=radial                   # Gradient type (linear|radial|conic)
&angle=90                      # Gradient angle (0-360)
&a=shift                       # Animation ID
&c=Purple                      # Category filter
&q=sunset                      # Search query
&colors=purple,blue            # Color filters (comma-separated)
&tags=modern,vibrant           # Tag filters (comma-separated)
&t=linear                      # Gradient type filter (for gallery preview)
&cf=rgb                        # Color format (hex|rgb|rgba|hsl|hsla)
&pm=button                     # Preview mode (background|button|badge|text|border)
```

**Adding a new filter:**

1. Add to `AppState` in `src/types.ts`
2. Add parsing in `src/lib/state.ts` `parseURLState()`
3. Add serialization in `src/lib/state.ts` `serializeStateToURL()`
4. Add action in `src/hooks/useAppState.ts`
5. Add UI control in `src/components/FilterBar.tsx`
6. Update tests in `e2e/gradients.spec.ts`

## Component Hierarchy

```
App.tsx
├── Header.tsx
│   ├── FilterBar.tsx (desktop)
│   └── MobileFilterSheet.tsx (mobile)
├── GradientGallery.tsx
│   └── GradientCard.tsx (×100s, virtualized)
├── GradientDetail.tsx (lazy-loaded modal)
│   ├── AnimationSpeedSlider.tsx
│   ├── ShareMenu.tsx
│   └── export tabs (vanilla, tailwind, ai)
├── Footer.tsx
├── ScrollToTop.tsx
└── GitHubCorner.tsx
```

---

_Structure analysis: 2026-02-21_
