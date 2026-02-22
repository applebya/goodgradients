---
phase: 01-design-foundation
plan: "01"
subsystem: ui
tags:
  [
    react,
    typescript,
    css-variables,
    tailwind,
    dark-mode,
    light-mode,
    theming,
    localStorage,
  ]

# Dependency graph
requires: []
provides:
  - Light/dark theme system with CSS custom properties
  - Theme persistence via localStorage
  - Floating ThemeToggle button (bottom-right corner)
  - 200ms crossfade transitions on theme switch
  - Anti-flash inline script preventing wrong theme on first paint
affects:
  - 01-02 (card layout, spacing polish - inherits CSS variable system)
  - 01-03 (brand/typography - builds on background/foreground variables)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Dark-as-default theme: no class on :root = dark; .light class = light mode"
    - "Anti-flash pattern: inline <script> in <head> reads localStorage before CSS loads"
    - "Theme via CSS custom properties: --background, --foreground, --card, --muted, --border"
    - "prefers-reduced-motion: disables all CSS transitions globally"

key-files:
  created:
    - src/lib/theme.ts
    - src/hooks/useTheme.ts
    - src/components/ThemeToggle.tsx
  modified:
    - src/index.css
    - src/App.tsx
    - index.html

key-decisions:
  - "Dark mode as default: :root has dark values, .light class overrides for light mode"
  - "ThemeToggle owns theme state: useTheme() called in ThemeToggle, not App root (avoids hooks-after-conditional-return)"
  - "Anti-flash script reads localStorage before CSS loads to prevent FOUC"
  - "Removed hardcoded class='dark' from <html> — class now managed purely by JS"

patterns-established:
  - "Theme: applyTheme() adds/removes .light on document.documentElement"
  - "Theme: getStoredTheme() returns 'dark' if nothing stored (dark-first default)"
  - "Theme: CSS transitions disabled via prefers-reduced-motion media query"

requirements-completed:
  - THEME-01

# Metrics
duration: 3min
completed: 2026-02-22
---

# Phase 1 Plan 01: Theme Infrastructure Summary

**Light/dark theme toggle via CSS custom properties, localStorage persistence, floating button with sun/moon icons, and anti-flash inline script**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-22T09:42:45Z
- **Completed:** 2026-02-22T09:45:49Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Created theme utility module (`src/lib/theme.ts`) with typed `getStoredTheme`, `setStoredTheme`, `applyTheme` functions
- Created `useTheme` React hook managing dark/light state with localStorage persistence
- Added `.light` CSS variable block to `src/index.css` alongside existing dark `:root` defaults
- Added 200ms crossfade transitions on `body` and `*` for smooth theme switching
- Created floating `ThemeToggle` component (bottom-right corner, z-50) with inline SVG sun/moon icons
- Wired ThemeToggle into App.tsx; changed root div from `bg-neutral-950 text-white` to CSS variable equivalents
- Added anti-flash `<script>` in `index.html <head>` to apply `.light` class before first paint
- Added `@media (prefers-reduced-motion: reduce)` guard to disable all transitions globally

## Task Commits

Each task was committed atomically:

1. **Task 1: Theme infrastructure (CSS variables + hook + utility)** - `d83d182` (feat)
2. **Task 2: Floating ThemeToggle and App wiring** - `82056a5` (feat)

## Files Created/Modified

- `src/lib/theme.ts` - Theme constants, getStoredTheme/setStoredTheme/applyTheme exports
- `src/hooks/useTheme.ts` - React hook returning `{ theme, toggleTheme }` with localStorage persistence
- `src/components/ThemeToggle.tsx` - Floating button with sun/moon SVG icons, 200ms hover transitions
- `src/index.css` - Added `.light` CSS variable block, body/`*` transitions, prefers-reduced-motion guard, light scrollbars
- `src/App.tsx` - Import ThemeToggle, render after GitHubCorner, update root div classes to use CSS variables
- `index.html` - Anti-flash script in `<head>`, removed hardcoded `class="dark"` from `<html>`

## Decisions Made

- **Dark as default without class:** `:root` holds dark values, `.light` class overrides for light mode. No need for a `.dark` class — dark is the natural default state.
- **ThemeToggle owns useTheme, not App:** App has a conditional early return before its hooks, which would violate React rules if `useTheme()` were called there. ThemeToggle is only rendered in the non-privacy path, so it's the correct owner of theme state.
- **Removed `class="dark"` from `<html>`:** Previous hardcoded class was incompatible with the new system. Theme is now fully JS-managed.
- **Inline SVG icons:** No external icon library needed — simple path/line SVG elements for sun and moon.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Moved useTheme() from App root to ThemeToggle component**

- **Found during:** Task 2 (App.tsx wiring)
- **Issue:** The plan said to call `useTheme()` at App root level, but App.tsx has an early conditional return for the privacy page before any hooks. Calling `useTheme()` after that return violates React Rules of Hooks.
- **Fix:** Removed the App-level `useTheme()` call. ThemeToggle already calls `useTheme()` internally and is only rendered in the non-privacy path, making it the correct state owner. The anti-flash script handles initial theme application before React mounts.
- **Files modified:** `src/App.tsx`
- **Verification:** Build passes, no TypeScript errors, functional behavior identical
- **Committed in:** `82056a5` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Necessary correctness fix. Functional outcome identical — theme initializes on mount and persists. No scope creep.

## Issues Encountered

None beyond the hooks-ordering deviation documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Theme system fully operational — CSS variables (`--background`, `--foreground`, `--card`, `--muted`, `--border`) available across all components
- Light mode card shadow treatment left to Phase 1 Plan 02 (card layout polish per CONTEXT.md)
- Ready for Plan 02: card layout, spacing, and visual density polish

---

_Phase: 01-design-foundation_
_Completed: 2026-02-22_
