# Architecture

**Analysis Date:** 2026-02-21

## Pattern Overview

**Overall:** URL-driven State Management (Single Page Application)

**Key Characteristics:**

- All application state is serialized to and from URL query parameters
- Browser history (back/forward) drives view changes via popstate events
- Component state remains minimal—UI derives from URL state + localStorage
- Export pipeline transforms gradient definitions into multiple formats (CSS, Tailwind, AI descriptions)
- Lazy-loaded detail modal (not needed until gradient is selected)

## Layers

**Presentation Layer:**

- Location: `src/components/`
- Contains: React components for UI rendering
- Depends on: State management (`useAppState`), utilities (`lib/`), data (`data/`)
- Used by: React root in `main.tsx`
- Key components: `App.tsx` (router), `Header.tsx` (filters), `GradientGallery.tsx` (grid), `GradientDetail.tsx` (modal), `GradientCard.tsx` (item)

**State Management Layer:**

- Location: `src/hooks/useAppState.ts`, `src/lib/state.ts`
- Contains: URL serialization/deserialization, state actions, browser history handling
- Depends on: Utilities (`lib/gradient-url.ts`, `lib/favorites.ts`)
- Used by: All components that need to read or modify state
- Pattern: Custom React hook (`useAppState`) + pure functions (`state.ts`)

**Data Layer:**

- Location: `src/data/`
- Contains: Gradient presets (500+ entries) and animation presets (13 entries)
- Depends on: Types (`types.ts`)
- Used by: Gallery filtering, encoding maps
- Note: Pre-computed encoding maps at module load for O(1) lookups

**Utility/Transformation Layer:**

- Location: `src/lib/`
- Contains: Encoding/decoding, color conversion, contrast calculation, export generation, favorites persistence
- Depends on: Types (`types.ts`)
- Used by: Components, state management
- Key modules:
  - `gradient-url.ts` - Gradient definition encoding/decoding (supports legacy format)
  - `export.ts` - Code generation (CSS, Tailwind, AI)
  - `favorites.ts` - localStorage persistence
  - `contrast.ts` - WCAG accessibility calculations
  - `color-format.ts` - Color space conversions

## Data Flow

**User Interaction → State Update → URL Sync:**

1. User clicks gradient card or toggles filter
2. Component calls action from `useAppState` (e.g., `selectGradient`, `setCategory`)
3. State update triggers URL effect with 150ms debounce (`URL_DEBOUNCE_MS`)
4. URL is pushed (modal open/close) or replaced (filter changes)
5. Components re-render from new state

**Browser Navigation → State Recovery:**

1. User clicks browser back/forward
2. `popstate` event fires in `useAppState`
3. URL params are parsed with `parseURLState`
4. State is updated to match URL
5. Components re-render from recovered state

**Export Pipeline:**

1. User selects gradient and animation
2. Gradient definition is decoded from URL-encoded string
3. Export function transforms definition into target format
4. Code is displayed or copied to clipboard

**State Management:**

- **Source of truth:** URL query parameters (+ localStorage for favorites)
- **Storage:** React state + browser history API
- **Favorites:** localStorage (`goodgradients_favorites_v2`) stores encoded gradient definitions
- **Debouncing:** 150ms delay on URL updates to batch state changes

## Key Abstractions

**GradientDefinition:**

- Purpose: Internal representation of a gradient (not tied to presets)
- Format: `{ type, angle, stops[] }`
- Examples: `src/lib/gradient-url.ts`
- Pattern: Immutable data structure passed through encoding/decoding pipeline

**Encoded Gradient String:**

- Purpose: Compact URL-safe representation of gradient definition
- Format: `"linear,135,667eea:0,764ba2:100"` (legacy) or URL params (new)
- Examples: Used in URL, localStorage favorites, state
- Pattern: Stateless encoding/decoding functions

**GradientPreset:**

- Purpose: Curated gallery entry with metadata (name, description, category, tags)
- Contains: Preset gradient CSS, not a definition (allows only browser-parsed values)
- Examples: `src/data/gradients.ts`
- Pattern: Immutable array of presets, pre-computed encoding map

**Export Pipeline:**

- Purpose: Convert gradient definition to usable code
- Formats: Vanilla CSS, Tailwind arbitrary values, AI description
- Examples: `src/lib/export.ts`
- Pattern: Stateless transformation functions (definition → code string)

## Entry Points

**Application Root:**

- Location: `src/main.tsx`
- Triggers: Page load (Vite entry point in `index.html`)
- Responsibilities: React app initialization, analytics, providers

**App Component:**

- Location: `src/App.tsx`
- Triggers: Main render after React hydration
- Responsibilities: Route selection (privacy page vs. main), state setup, layout structure, lazy-loaded modal

**Browser Navigation:**

- Handler: `popstate` event listener in `useAppState`
- Triggers: User back/forward navigation
- Responsibilities: Parse URL, recover state, re-render

## Error Handling

**Strategy:** Defensive parsing + graceful degradation

**Patterns:**

- Invalid URL params → Fall back to defaults (e.g., `getInitialState` merges parsed state with `DEFAULT_STATE`)
- Invalid gradient encoding → Return `null`, don't render detail modal
- localStorage unavailable → Skip persistence, app still works
- Invalid color in favorites → Filter out, continue with valid favorites
- Component errors → `ErrorBoundary` catches, displays error message without crashing

**Example from `state.ts`:**

```typescript
// Parse gradient safely, validate before using
const gradientDef = decodeGradient(state.selectedGradient);
if (gradientDef) {
  // Use definition
}
```

## Cross-Cutting Concerns

**Logging:** Console in development only (checked via `isDevMode` in `analytics.ts`)

**Validation:**

- URL params validated against allowed values (colors, preview modes, etc.) in `state.ts`
- Gradient definitions validated with type checks before encoding/decoding
- Hex colors validated with regex in `gradient-url.ts`

**Authentication:** Not applicable (public tool)

**Accessibility:**

- Contrast ratio calculations in `contrast.ts` for WCAG compliance
- Semantic HTML in components (headings, landmarks, labels)
- Keyboard navigation via `useKeyboard` hook
- ARIA labels on interactive elements

**Performance:**

- Lazy loading: `GradientDetail` modal split to separate chunk
- Virtualization: `GradientGallery` uses `@tanstack/react-virtual` for 100+ items
- Memoization: Gradient encoding maps computed once at module load
- URL debounce: 150ms prevents excessive history updates
- Animation CSS injected once via `AnimationStyles` component

---

_Architecture analysis: 2026-02-21_
