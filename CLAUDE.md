# OnlyGradients - Claude Code Project Memory

## Project Overview
OnlyGradients is a production-quality CSS gradient & animation tool for frontend engineers. It prioritizes interoperability (Tailwind + vanilla CSS exports), visual sophistication, and URL-based shareability.

## Tech Stack
- **Framework**: Vite + React 18 + TypeScript (strict mode)
- **Styling**: Tailwind CSS 3 for UI, custom CSS for gradients/animations
- **State**: Custom state model with URL serialization
- **Testing**: Playwright E2E
- **Deployment**: GitHub Pages

## Architecture Decisions

### State Model
All application state is encoded in URL query parameters:
- `g`: Gradient ID
- `a`: Animation ID
- `t`: Gradient type (linear/radial/conic)
- `d`: Angle in degrees
- `c`: Category filter
- `q`: Search query

### Export Pipeline
Three export formats:
1. **Vanilla CSS** - Clean, commented, standards-compliant
2. **Tailwind** - Uses arbitrary values with actual hex colors, JIT-compatible
3. **AI Description** - Concise structured description for Claude/ChatGPT

### Component Structure
```
src/
├── components/
│   ├── ui/              # Minimal shadcn/ui components
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   └── tabs.tsx
│   ├── Header.tsx       # Search, categories, actions
│   ├── Footer.tsx       # Keyboard shortcuts display
│   ├── GradientCard.tsx # Gallery card with actions
│   ├── GradientGallery.tsx  # Grid layout with filtering
│   ├── GradientDetail.tsx   # Modal with export tabs
│   └── AnimationStudio.tsx  # Animation-first flow
├── data/
│   ├── gradients.ts     # 100 curated gradient presets
│   └── animations.ts    # 13 animation presets
├── lib/
│   ├── utils.ts         # clsx/tw-merge utilities
│   ├── state.ts         # URL state management
│   ├── export.ts        # Export pipeline
│   ├── gradient.ts      # Gradient transformation utilities
│   ├── contrast.ts      # WCAG contrast utilities
│   └── favorites.ts     # localStorage persistence
├── hooks/
│   ├── useAppState.ts   # Central state management
│   └── useKeyboard.ts   # Keyboard shortcuts
├── types.ts             # TypeScript definitions
├── App.tsx              # Main application
├── main.tsx             # Entry point
└── index.css            # Tailwind base + animations
```

## Key User Stories (All Implemented)
- US-1: Browse curated gradients for inspiration
- US-2: Start from gradient, add animation
- US-3: Start from animation, choose colors (Animation Studio)
- US-4: Fine-tune without overwhelm (presets first)
- US-5: Export usable code immediately (CSS/Tailwind)
- US-6: AI-friendly export for Claude/ChatGPT
- US-7: Save favorites locally (localStorage)
- US-8: Share via URL (full state serialization)

## Code Quality Standards
- Strict TypeScript with noUncheckedIndexedAccess
- Minimal dependencies (only 5 Radix components used)
- All exports are immediately usable
- Tailwind exports use actual color values
- WCAG contrast information for accessibility

## Keyboard Shortcuts
- `/` - Focus search
- `Esc` - Close modal / clear search
- `c` - Copy gradient CSS
- `f` - Toggle favorite
- `←/→` - Navigate gradients
- `Space` - Toggle animation

## Commands
```bash
npm run dev      # Development server (port 3000)
npm run build    # Production build
npm run preview  # Preview production build
npm run test     # Run Playwright tests
npm run test:ui  # Playwright with UI
npm run deploy   # Deploy to GitHub Pages
```

## Testing
Playwright E2E tests in `/e2e/gradients.spec.ts` cover:
- Gallery browsing and filtering
- Gradient detail modal
- Animation Studio workflow
- URL state restoration
- Export format correctness
- Favorites persistence
- Keyboard shortcuts

## Deployment
GitHub Actions workflow in `.github/workflows/deploy.yml`:
- Builds on push to main
- Deploys to GitHub Pages
- Runs Playwright tests in CI

## Fixes Applied (from original audit)
1. Fixed Tailwind export (now uses actual hex values)
2. Added URL state encoding (full state serialization)
3. Implemented localStorage persistence for favorites
4. Removed unused dependencies (40+ Radix components)
5. Added proper TypeScript types
6. Implemented Animation Studio (US-3)
7. Added keyboard shortcuts
