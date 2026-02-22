# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-21)

**Core value:** A massive, well-curated gradient library with instant code export — beautiful to browse, fast to use, and genuinely fun to interact with.
**Current focus:** Phase 1 — Design Foundation

## Current Position

Phase: 1 of 3 (Design Foundation)
Plan: 2 of 3 in current phase
Status: In progress
Last activity: 2026-02-22 — Completed 01-02-PLAN.md (layout spacing + card redesign)

Progress: [██░░░░░░░░] 22%

## Performance Metrics

**Velocity:**

- Total plans completed: 2
- Average duration: 4 min
- Total execution time: 8 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
| ----- | ----- | ----- | -------- |
| 01    | 2     | 8 min | 4 min    |

**Recent Trend:**

- Last 5 plans: 3 min (01-01), 5 min (01-02)
- Trend: Slightly longer as component changes grow in scope

_Updated after each plan completion_

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Dark mode default — current aesthetic is dark, most dev tools are dark-first
- Static chunked JSON over backend — keeps hosting free, GitHub Pages compatible
- Algorithmic generation over scraping — own the content, control quality
- **Theme system pattern (01-01):** Dark as default via `:root` CSS variables, light mode adds `.light` class; no separate `.dark` class needed
- **Theme hook ownership (01-01):** `useTheme()` lives in ThemeToggle, not App root, due to early conditional return in App for privacy routing
- **Anti-flash pattern (01-01):** Inline `<script>` in `<head>` reads localStorage before CSS loads to prevent FOUC on light mode users
- **Card info minimum (01-02):** Browse cards show name + category only — hex codes, descriptions, tags belong in detail modal; keeps gallery fast to scan
- **colorFormat removed from card (01-02):** With color swatches gone from cards, colorFormat prop removed from GradientCard interface and GradientGallery forwarding; GradientDetail still uses it
- **max-w-[1400px] standard (01-02):** 1400px used consistently across header/main/footer — gives 4 landscape cards more room than max-w-7xl (1280px) at wide viewports
- **Light mode shadows via .light selector (01-02):** `.light .gradient-card` in index.css adds box-shadow; dark mode relies on border differentiation instead

### Pending Todos

None.

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-02-22T09:53:48Z
Stopped at: Completed 01-02-PLAN.md (layout spacing + card redesign)
Resume file: None
