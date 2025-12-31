# GoodGradients - Roadmap

## Phase 1: Animation Integration (Current Sprint)

### 1.1 Consolidate Animation into Modal
- [ ] Remove standalone Animation Studio modal
- [ ] Add "Animate" toggle/checkbox in gradient detail modal header
- [ ] When enabled, show animation controls panel
- [ ] Animation preview shows in the main gradient preview area
- [ ] Smooth transition when toggling animation on/off

### 1.2 Animation Controls Panel
- [ ] Animation type selector (Shift, Pulse, Rotate, Aurora, Wave, Morph)
- [ ] Speed slider (0.5x - 3x)
- [ ] Direction toggle (normal/reverse/alternate)
- [ ] Easing curve selector (linear, ease, ease-in-out, custom bezier)
- [ ] Play/pause button with keyboard shortcut (Space)
- [ ] Preview in different sizes (sm/md/lg/full viewport)

### 1.3 Color Customization
- [ ] Editable color stops in gradient
- [ ] Add/remove color stops (up to 8 colors)
- [ ] Drag to reorder colors
- [ ] Color picker with hex/rgb input
- [ ] Preset color palettes (complementary, analogous, triadic)
- [ ] "Randomize colors" button

### 1.4 URI State (Performant)
- [ ] Debounce URL updates (300ms)
- [ ] Compress state using base64 encoding
- [ ] Only store diff from original gradient
- [ ] Parameters: `g` (gradient id), `t` (type), `a` (angle), `anim` (animation), `speed`, `colors` (custom)
- [ ] Shareable URLs that recreate exact state

## Phase 2: Complex Gradients Library

### 2.1 Research & Curate Premium Gradients
- [ ] Multi-stop gradients (4-8 colors)
- [ ] Mesh-style gradients (layered radials)
- [ ] Glassmorphism gradients
- [ ] Holographic/iridescent effects
- [ ] Aurora borealis inspired
- [ ] Sunset/sunrise palettes
- [ ] Deep space/nebula themes
- [ ] Metallic gradients (gold, silver, copper)
- [ ] Neon glow gradients
- [ ] Duotone combinations

### 2.2 Animation-Optimized Gradients
- [ ] Gradients designed specifically for animation
- [ ] Color combinations that transition smoothly
- [ ] High contrast options for dramatic effects
- [ ] Subtle variations for backgrounds
- [ ] Tag gradients with recommended animations

### 2.3 Categories Expansion
- [ ] "Complex" category for multi-stop gradients
- [ ] "Animated" category for animation-optimized
- [ ] "Glass" category for glassmorphism
- [ ] "Neon" category for glow effects
- [ ] "Nature" category (aurora, sunset, ocean)

## Phase 3: Advanced Features

### 3.1 Gradient Builder
- [ ] Start from scratch or from existing gradient
- [ ] Visual gradient editor with drag handles
- [ ] Real-time CSS output
- [ ] Save custom gradients to favorites

### 3.2 Export Enhancements
- [ ] Export with animation CSS included
- [ ] React component export
- [ ] Figma plugin compatibility
- [ ] SVG gradient export
- [ ] PNG/WebP image export

### 3.3 Collections
- [ ] User-created collections
- [ ] Share collections via URL
- [ ] Popular collections showcase

## Technical Debt

- [ ] Remove Animation Studio component (replaced by modal integration)
- [ ] Optimize re-renders when customizing colors
- [ ] Lazy load color picker component
- [ ] Add e2e tests for new animation flow
- [ ] Performance audit for URL state updates

## Completed
- [x] GitHub Pages deployment
- [x] Custom domain (goodgradients.com)
- [x] Bundle optimization (396KB)
- [x] Card shimmer effects (border only)
- [x] Rename to GoodGradients
