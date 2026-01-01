# GoodGradients: Discovery Wizard + PWA Implementation Plan

---

## SESSION HANDOFF CONTEXT (for laptop transfer)

### Project Overview
- **App Name**: GoodGradients (renamed from OnlyGradients)
- **Deployed At**: https://goodgradients.com (GitHub Pages)
- **Working Directory**: `/Users/andrewappleby/goodgradients`
- **Tech Stack**: React + TypeScript + Vite + Tailwind + Framer Motion + Playwright

### What Was Completed This Session

1. **Fixed laggy URL state updates** - Added 150ms debouncing to URL updates in `useAppState.ts`
2. **Made modal header sticky** - GradientDetail.tsx now has sticky header with favorite/share buttons
3. **Compressed preview height** - Changed from h-48 to h-32 in modal
4. **Added smooth category animations** - Spring physics in category pills with pill-pop keyframe
5. **Added 20 complex gradients** - Animation-optimized gradients (Aurora Borealis, Nebula Dream, Holographic, etc.)
6. **All changes pushed to production**

### Files Modified This Session
- `src/hooks/useAppState.ts` - Debounced URL updates (URL_DEBOUNCE_MS = 150)
- `src/components/GradientDetail.tsx` - Sticky header, scrollable content
- `src/components/GradientCard.tsx` - Spring layout transitions
- `src/index.css` - Category pill animations, pill-pop keyframe
- `src/data/gradients.ts` - Added 20 complex gradients (complex-1 through complex-20)

### Current Status
- **In PLAN MODE** - Plan created, awaiting user approval
- Plan covers: Discovery Wizard + PWA + Testing
- No implementation started yet

### User's Original Request (verbatim)
> "ok show me the roadmap. also I want this to sort of be a discovery thing where i'm working on an app, and already have an aesthetic/style and can pick from those styles, and certain color ranges, and then it shows results in the regular UI. But let's start users on a wizard, which they can skip to just browse in regular mode with no filters. make this creative and unique, and think of the user journey. also I want this to be offline-compatible, and once you're happy with the progress, do some design refinements, then write new e2e tests and get those going along with any basic jest tests needed."

### To Resume on New Laptop
1. Open Claude Code in `/Users/andrewappleby/goodgradients` (or wherever cloned)
2. Say: "Continue with the Discovery Wizard plan - I approve it, let's start implementation"
3. Or review plan below and request changes first

### Key Architecture Notes
- State: `useAppState` hook manages all app state with URL persistence
- localStorage: Pattern in `src/lib/favorites.ts` for persistence
- Modal pattern: See `AnimationStudio.tsx` for similar modal wizard
- 1000+ gradients in `src/data/gradients.ts`
- E2E tests in `e2e/gradients.spec.ts` using Playwright

---

## Overview
Add a discovery wizard that helps users find gradients based on their app's aesthetic, plus make the app offline-compatible as a PWA.

---

## Feature 1: Discovery Wizard

### User Journey
```
First Visit → Wizard auto-opens → User answers 3-4 questions → Gallery filtered to matches
Return Visit → Gallery loads normally → "Find My Gradient" button in header to restart
Skip Option → Available at any step → Goes to unfiltered gallery
```

### Wizard Steps (4 steps)

**Step 1: Vibe/Mood**
- "What vibe are you going for?"
- Options: Playful, Professional, Bold, Subtle, Futuristic, Natural
- Each option is a visual card with live gradient preview

**Step 2: Color Preference**
- "What colors fit your brand?"
- Quick picks: Warm, Cool, Neutral, Vibrant, Earth Tones
- Multi-select allowed

**Step 3: Use Case**
- "Where will you use this?"
- Options: Hero Section, Buttons/CTAs, Cards, Backgrounds, Accents
- Shows mini mockup previews

**Step 4: Animation**
- "Do you want animation?"
- Options: Subtle movement, Dynamic effects, Static only

### Results
- Filters applied to main gallery
- Header shows "X gradients match your style"
- "Clear filters" button to reset

### Files to Create
```
src/components/discovery-wizard/
  DiscoveryWizard.tsx       # Main wizard modal
  WizardProgress.tsx        # Step indicator
  steps/
    VibeStep.tsx
    ColorStep.tsx
    UseCaseStep.tsx
    AnimationStep.tsx
  WizardCard.tsx            # Reusable selection card

src/hooks/useDiscoveryWizard.ts
src/lib/wizard.ts           # Filter computation, localStorage
```

### Files to Modify
- `src/App.tsx` - Add wizard state, auto-show on first visit
- `src/components/Header.tsx` - Add "Find My Gradient" button
- `src/components/GradientGallery.tsx` - Accept wizard filters
- `src/hooks/useAppState.ts` - Add wizard view state
- `src/types.ts` - Add wizard types
- `src/data/gradients.ts` - Add vibe/usecase tag mappings

### localStorage Keys
- `goodgradients_wizard_completed` - Boolean, first-visit detection
- `goodgradients_wizard_prefs` - Last wizard selections

---

## Feature 2: PWA / Offline Support

### Implementation
1. Install `vite-plugin-pwa`
2. Configure service worker with Workbox
3. Create manifest.json via plugin config
4. Add PWA icons (192x192, 512x512, maskable)

### Files to Modify
- `vite.config.ts` - Add VitePWA plugin
- `index.html` - Add apple-touch-icon, meta tags

### Files to Create
```
public/
  icon-192.png
  icon-512.png
  icon-512-maskable.png
  apple-touch-icon.png
```

### Service Worker Strategy
- Precache: All static assets (already bundled)
- Runtime cache: Google Fonts (if used)
- Offline: App works fully offline (data is bundled)

---

## Feature 3: Testing

### E2E Tests (Playwright)
Add to `e2e/gradients.spec.ts`:
- Wizard opens on first visit
- Wizard can be skipped
- Wizard filters apply correctly
- "Find My Gradient" button reopens wizard
- Wizard persists completion state

### Unit Tests (Vitest - new setup)
1. Install vitest + @testing-library/react
2. Create tests for:
   - `src/lib/wizard.test.ts` - Filter computation
   - `src/lib/gradient.test.ts` - Gradient transforms
   - `src/lib/contrast.test.ts` - WCAG calculations
   - `src/lib/utils.test.ts` - Utility functions

### Files to Create
```
src/lib/__tests__/
  wizard.test.ts
  gradient.test.ts
  contrast.test.ts
  utils.test.ts
vitest.config.ts
```

### Files to Modify
- `package.json` - Add vitest scripts
- `vite.config.ts` - Add vitest config (or separate file)

---

## Implementation Order

### Phase 1: Wizard Core (Day 1)
1. Create wizard types and state hook
2. Build DiscoveryWizard modal shell
3. Add step navigation (back/next/skip)
4. Implement localStorage persistence

### Phase 2: Wizard Steps (Day 1-2)
5. Build VibeStep with gradient previews
6. Build ColorStep with category selection
7. Build UseCaseStep with mockups
8. Build AnimationStep with live previews

### Phase 3: Integration (Day 2)
9. Add filter computation logic
10. Modify GradientGallery for wizard filters
11. Add first-visit auto-show logic
12. Add "Find My Gradient" to header

### Phase 4: PWA (Day 2)
13. Install and configure vite-plugin-pwa
14. Create PWA icons
15. Test offline functionality

### Phase 5: Testing (Day 3)
16. Set up Vitest
17. Write unit tests for lib functions
18. Write e2e tests for wizard flow

### Phase 6: Polish (Day 3)
19. Add animations/transitions
20. Mobile responsiveness
21. Design refinements

---

## Critical Files Reference

| Purpose | File Path |
|---------|-----------|
| App state hook | `src/hooks/useAppState.ts` |
| Wizard pattern | `src/components/AnimationStudio.tsx` |
| Gradient data | `src/data/gradients.ts` |
| localStorage pattern | `src/lib/favorites.ts` |
| Vite config | `vite.config.ts` |
| E2E tests | `e2e/gradients.spec.ts` |
| Types | `src/types.ts` |

---

## Design Notes

### Wizard UX
- Modal uses existing Dialog component
- Cards have hover animations (like gradient cards)
- Progress bar shows gradient animation
- Live counter: "X gradients match" updates as you select
- Skip is always visible but styled subtly

### Visual Style
- Dark theme consistent with app
- Gradient previews are live/animated
- Cards follow existing GradientCard styling
- Accent colors shift based on vibe selection
