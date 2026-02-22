# Roadmap: Good Gradients v2

## Overview

Good Gradients v2 transforms a functional side project into a premium gradient tool — distinctive visual identity first, then a massive algorithmically generated collection, then motion polish that makes browsing genuinely delightful. Three phases, each delivering a coherent and verifiable leap in quality.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design Foundation** - Premium visual identity, theming system, and layout polish
- [ ] **Phase 2: Gradient Collection** - 1000+ algorithmically generated, named, and categorized gradients
- [ ] **Phase 3: Motion & Delight** - Entrance animations, view transitions, and global hover preview

## Phase Details

### Phase 1: Design Foundation

**Goal**: Users experience a premium, polished tool with light/dark theming and a distinctive visual identity
**Depends on**: Nothing (first phase)
**Requirements**: THEME-01, DSGN-01, DSGN-02
**Success Criteria** (what must be TRUE):

1. User can switch between light and dark mode via a visible UI control, and dark is the default
2. The UI has visual rhythm — breathing room between elements, clear hierarchy, no cramped sections
3. The overall aesthetic reads as premium and distinctive (Linear/Vercel clean), not generic shadcn template

**Plans:** 3 plans

Plans:

- [ ] 01-01-PLAN.md — Light/dark theme system with floating UI toggle (THEME-01)
- [ ] 01-02-PLAN.md — Layout and spacing audit: landscape cards, 4-col grid, breathing room (DSGN-01)
- [ ] 01-03-PLAN.md — Brand identity pass: Inter typography, accent colors, premium polish (DSGN-02)

### Phase 2: Gradient Collection

**Goal**: Users can browse 1000+ algorithmically generated gradients, each with an evocative name and mood category
**Depends on**: Phase 1
**Requirements**: GRAD-01, GRAD-02, GRAD-03
**Success Criteria** (what must be TRUE):

1. Gallery contains 1000+ gradients generated from color theory at build time (no backend)
2. User can filter gradients by mood category (Warm, Cool, Vibrant, Muted, Pastel, Dark, Neon, Earth)
3. Each gradient displays an evocative name that feels crafted, not generated (e.g., "Ember Dusk", not "Gradient 347")
   **Plans**: TBD

Plans:

- [ ] 02-01: Build-time gradient generator — algorithmic generation from color theory (GRAD-01)
- [ ] 02-02: Mood categorization system and filter UI (GRAD-02)
- [ ] 02-03: Gradient naming pipeline — evocative names for all 1000+ gradients (GRAD-03)

### Phase 3: Motion & Delight

**Goal**: Users feel the gallery is alive — smooth transitions, animated entrances, and a playful hover preview system
**Depends on**: Phase 2
**Requirements**: MOTN-01, MOTN-02, MOTN-03
**Success Criteria** (what must be TRUE):

1. Opening the gallery, cards animate in with a staggered fade/slide entrance effect
2. Navigating from gallery to gradient detail (and back) transitions smoothly rather than snapping
3. When hovering an animation option in the animation picker, ALL visible gallery cards temporarily animate with that effect
   **Plans**: TBD

Plans:

- [ ] 03-01: Staggered entrance animations for gallery cards (MOTN-01)
- [ ] 03-02: Gallery-to-detail view transitions (MOTN-02)
- [ ] 03-03: Global animation hover preview system (MOTN-03)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase                  | Plans Complete | Status      | Completed |
| ---------------------- | -------------- | ----------- | --------- |
| 1. Design Foundation   | 0/3            | Not started | -         |
| 2. Gradient Collection | 0/3            | Not started | -         |
| 3. Motion & Delight    | 0/3            | Not started | -         |
