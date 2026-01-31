export function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* SEO Content - compact but keyword-rich */}
        <div className="text-center space-y-4">
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            <span className="text-neutral-200 font-medium">Good Gradients</span>{" "}
            — Free CSS gradient generator with 500+ curated gradients. Export to
            CSS, Tailwind, SwiftUI, and Kotlin. Browse linear, radial, and conic
            gradients with animations.
          </p>

          {/* SEO keyword tags */}
          <div
            className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-neutral-500"
            aria-label="Features"
          >
            <span>CSS Gradients</span>
            <span aria-hidden="true">•</span>
            <span>Gradient Generator</span>
            <span aria-hidden="true">•</span>
            <span>Tailwind Gradients</span>
            <span aria-hidden="true">•</span>
            <span>Gradient Animations</span>
          </div>

          {/* Privacy note */}
          <p className="text-xs text-neutral-500 max-w-xl mx-auto">
            Favorites stored locally. Anonymous analytics via PostHog.
          </p>

          {/* Attribution */}
          <p className="text-xs text-neutral-500 pt-2">
            An open source project by{" "}
            <span className="text-neutral-400">Andrew</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
