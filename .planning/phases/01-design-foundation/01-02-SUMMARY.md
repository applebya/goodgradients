---
phase: 01-design-foundation
plan: "02"
subsystem: ui
tags:
  [
    react,
    typescript,
    tailwind,
    css-variables,
    layout,
    grid,
    responsive,
    theming,
    card-design,
  ]

# Dependency graph
requires:
  - phase: 01-01
    provides: "CSS variable theme system (--card, --border, --foreground, --muted-foreground, etc.)"
provides:
  - Landscape 16:9 GradientCard with minimal info (name + category badge only)
  - 4-column desktop grid with gap-6 spacing
  - Theme-aware header, footer, filter bar, and mobile filter sheet
  - Light mode card shadow via .light .gradient-card CSS rule
  - Increased app container padding and max-width (max-w-[1400px], px-6 py-12)
affects:
  - 01-03 (brand/typography - builds on established layout rhythm and spacing)
  - 02-xx (any future phases touching card/gallery components)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Card info hierarchy: swatch (16:9) + single-row name/badge only — no hex codes, descriptions, or tags on browse cards"
    - "CSS variable-based color classes: bg-card, text-card-foreground, text-muted-foreground, border-border throughout UI chrome"
    - "Light mode card elevation: .light .gradient-card { box-shadow } in index.css for theme-differentiated shadows"
    - "Max-width alignment: max-w-[1400px] used consistently across header, main, footer for wide-screen comfort"

key-files:
  created: []
  modified:
    - src/components/GradientCard.tsx
    - src/components/GradientGallery.tsx
    - src/components/Header.tsx
    - src/components/FilterBar.tsx
    - src/components/MobileFilterSheet.tsx
    - src/components/Footer.tsx
    - src/App.tsx
    - src/index.css

key-decisions:
  - "Card content stripped to name + category badge only: hex color swatches, description, and tag badges removed from browse surface per DSGN-01"
  - "colorFormat prop removed from GradientCard interface: card no longer displays colors, so format is irrelevant at browse level"
  - "max-w-[1400px] over max-w-7xl: gives 4 landscape cards more horizontal room at wide viewports without feeling stretched"
  - "Light mode shadows on cards only (not dark): .light .gradient-card in index.css — dark mode uses border differentiation instead"

patterns-established:
  - "Theme-aware chrome: all UI chrome (header, footer, filter controls) use CSS variable classes not hardcoded neutrals"
  - "Gap-6 grid: 24px gaps between cards provide breathing room without wasting viewport space"
  - "aspect-[16/9]: explicit landscape ratio on cards — intent is clear, not reliant on aspect-video alias"

requirements-completed:
  - DSGN-01

# Metrics
duration: 5min
completed: 2026-02-22
---

# Phase 1 Plan 02: Layout Spacing and Card Design Summary

**Landscape 16:9 gradient cards with minimal browse info (name + category only), 4-column gap-6 desktop grid, and full theme-aware UI chrome via CSS custom properties**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-22T09:48:01Z
- **Completed:** 2026-02-22T09:53:48Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Redesigned GradientCard: landscape swatch (aspect-[16/9]), single-row content area (name + category badge), overlay copy/favorite actions — hex swatches, descriptions, and tag badges removed
- Updated SkeletonCard to match minimal layout (one row, no description/swatch skeletons)
- GradientGallery grid gaps: gap-4 → gap-6 across skeleton, static, and virtualized renderers
- Header, FilterBar, MobileFilterSheet, Footer: all hardcoded neutral-\* colors replaced with CSS variable equivalents (bg-card, bg-background, border-border, text-muted-foreground, etc.)
- App.tsx main container: max-w-7xl → max-w-[1400px], px-4 py-8 → px-6 py-12 for more breathing room
- Added `.light .gradient-card` box-shadow rule to index.css for subtle elevation in light mode
- Virtualizer row height estimate updated to 240px (landscape card proportions)

## Task Commits

Each task was committed atomically:

1. **Task 1: Redesign GradientCard for landscape layout and minimal info** - `d1c9a31` (feat)
2. **Task 2: Update grid layout, app spacing, and header/footer for breathing room** - `b8dd8d4` (feat)

## Files Created/Modified

- `src/components/GradientCard.tsx` - Landscape 16:9 card, minimal info layout, theme-aware classes, .gradient-card CSS class
- `src/components/GradientGallery.tsx` - gap-6 grid, removed colorFormat forwarding, updated virtualizer estimate
- `src/components/Header.tsx` - Theme-aware colors, max-w-[1400px], increased padding
- `src/components/FilterBar.tsx` - All neutral-\* colors → CSS variable equivalents
- `src/components/MobileFilterSheet.tsx` - All neutral-\* colors → CSS variable equivalents
- `src/components/Footer.tsx` - Theme-aware colors, max-w-[1400px], increased spacing
- `src/App.tsx` - max-w-[1400px], px-6 py-12 for main container
- `src/index.css` - Added .light .gradient-card box-shadow and .light .gradient-card:hover box-shadow

## Decisions Made

- **Card info stripped to minimum:** Per user decision in DSGN-01, cards show name + category only during browsing. Hex codes, descriptions, and tags belong in the detail modal. This keeps the gallery clean and fast to scan.
- **colorFormat removed from GradientCard props:** With color swatches removed from cards, the `colorFormat` prop served no purpose. Removed from interface and GradientGallery forwarding. GradientDetail still uses colorFormat.
- **max-w-[1400px] over max-w-7xl:** 1280px max-width felt tight with 4 landscape cards plus gap-6. 1400px gives ~50px more horizontal room per card at wide viewports while still constraining ultra-wide displays.
- **Shadows only in light mode:** Dark mode cards rely on border differentiation (`border-border`). Light mode needs elevation to distinguish cards from the white background. Applied via CSS selector `.light .gradient-card` in index.css rather than Tailwind dark: variants (which don't apply because our dark mode uses no class on root).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed colorFormat from GradientCard props and GradientGallery forwarding**

- **Found during:** Task 1 (GradientCard redesign)
- **Issue:** After removing hex color swatches from GradientCard, `colorFormat` prop was still being forwarded from GradientGallery → GradientCard. TypeScript correctly flagged this as an error (`Property 'colorFormat' does not exist on type GradientCardProps`).
- **Fix:** Removed `colorFormat` from GradientCardProps interface, removed from both GradientCard usages in GradientGallery (static and virtualized renderers), and removed from GradientGallery destructuring.
- **Files modified:** `src/components/GradientCard.tsx`, `src/components/GradientGallery.tsx`
- **Verification:** Build passes, no TypeScript errors
- **Committed in:** `d1c9a31` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Necessary correctness fix surfaced by TypeScript. No scope creep — directly caused by the card redesign removing color display.

## Issues Encountered

None beyond the colorFormat TypeScript deviation documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Layout rhythm established: 4-column gap-6 grid, landscape cards, generous padding
- Theme system fully exercised: all UI chrome now uses CSS variable classes
- Ready for Plan 03: brand and typography polish (color palette, font choices, visual identity)

---

_Phase: 01-design-foundation_
_Completed: 2026-02-22_
