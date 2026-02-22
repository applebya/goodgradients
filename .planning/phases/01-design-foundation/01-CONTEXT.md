# Phase 1: Design Foundation - Context

**Gathered:** 2026-02-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Premium visual identity, theming system, and layout polish for Good Gradients. This phase delivers light/dark theming with a UI toggle, improved spacing and visual rhythm, and a distinctive brand aesthetic. No new features — this is about elevating the existing tool's look and feel.

</domain>

<decisions>
## Implementation Decisions

### Layout & density

- 4 cards per row on desktop (medium density, balanced browsability and visual presence)
- Landscape aspect ratio cards (~16:9) — wider than tall, good for showing gradient range
- Cards show: gradient swatch, name, mood category badge, and quick actions (copy, favorite)
- No hex color codes on cards — color details belong in the detail view
- Gradient name stays on cards (useful for recognition when browsing)

### Theme & dark mode

- Dark mode is the default theme
- Theme toggle is a small floating control in a corner — always accessible, stays out of the way
- Smooth crossfade transition (~200ms) when switching themes — background, text, and card colors transition
- In light mode, gradient cards have subtle drop shadows (floating card feel)
- In dark mode, card treatment at Claude's discretion (whatever makes gradients pop best)

### Claude's Discretion

- Header/toolbar weight and balance — pick what feels premium and functional
- Dark theme background darkness level — optimize for making gradients look their best
- Dark mode card treatment (shadows, borders, or neither)
- Typography choices and hierarchy (covered by DSGN-02 but no specific user preferences)
- Exact spacing values and breathing room amounts
- Brand color palette for UI chrome (not gradients)

</decisions>

<specifics>
## Specific Ideas

- Cards should feel more minimal than heavy — information density kept light
- The premium reference is "Linear/Vercel clean" per the roadmap success criteria
- Floating theme toggle in a corner is preferred over header-integrated

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 01-design-foundation_
_Context gathered: 2026-02-22_
