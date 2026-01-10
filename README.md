# Good Gradients

A curated collection of 500+ beautiful CSS gradients with animations, ready to use in your projects. Export to CSS, Tailwind, SwiftUI, Kotlin, or get AI-friendly descriptions.

## Features

- **500+ Curated Gradients** - Hand-picked color combinations that look great together
- **Live Animations** - 13 animation presets (shift, pulse, wave, breathe, and more)
- **Multiple Export Formats**
  - CSS (vanilla)
  - Tailwind CSS (with arbitrary values)
  - SwiftUI
  - Kotlin/Jetpack Compose
  - AI Agent descriptions
- **Color Format Options** - HEX, RGB, HSL output
- **Accessibility Info** - WCAG contrast ratios and recommended text colors
- **Favorites** - Save your favorite gradients (stored locally)
- **URL Sharing** - Share any gradient configuration via URL
- **Fullscreen Preview** - See how gradients look as backgrounds with sample content
- **Keyboard Shortcuts** - Quick navigation with `/`, `Esc`, arrow keys

## Tech Stack

- **Framework**: React 18 + TypeScript (strict mode)
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Testing**: Playwright E2E
- **Deployment**: GitHub Pages (PWA-enabled)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/goodgradients.git
cd goodgradients

# Install dependencies
bun install

# Start development server
bun run dev
```

The app will be available at `http://localhost:3000`.

### Scripts

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run preview  # Preview production build
bun run test     # Run Playwright E2E tests
bun run test:ui  # Run tests with Playwright UI
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Base UI components (button, dialog, etc.)
│   ├── Header.tsx       # Search and filters
│   ├── Footer.tsx       # Keyboard shortcuts display
│   ├── GradientCard.tsx # Gallery card
│   ├── GradientGallery.tsx  # Main grid layout
│   └── GradientDetail.tsx   # Modal with exports
├── data/
│   ├── gradients.ts     # Gradient definitions
│   └── animations.ts    # Animation presets
├── lib/
│   ├── gradient-url.ts  # URL encoding/decoding
│   ├── contrast.ts      # WCAG contrast utilities
│   ├── color-format.ts  # Color format conversion
│   └── favorites.ts     # localStorage persistence
├── hooks/
│   └── useAppState.ts   # Central state management
└── types.ts             # TypeScript definitions
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search |
| `Esc` | Close modal / clear search |
| `←` `→` | Navigate gradients |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Adding New Gradients

Gradients are defined in `src/data/gradients.ts`. Each gradient includes:
- Name and description
- Color stops with positions
- Tags for filtering
- Default angle

### Running Tests

```bash
# Run all tests
bun run test

# Run tests with UI
bun run test:ui

# Run specific test file
bunx playwright test e2e/gradients.spec.ts
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- Gradient inspiration from various design resources
- Built with [Radix UI](https://www.radix-ui.com/) primitives
- Icons from [Lucide](https://lucide.dev/)
