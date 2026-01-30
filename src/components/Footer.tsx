import { KEYBOARD_SHORTCUTS } from "@/hooks/useKeyboard";
import { GitHubStars } from "./GitHubStars";

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* SEO Content - visible to search engines */}
        <div className="mb-8 text-center">
          <h2 className="text-lg font-semibold text-neutral-200 mb-3">
            Free CSS Gradient Generator
          </h2>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Good Gradients is a free gradient generator tool with 500+ curated
            CSS gradients. Browse beautiful gradient backgrounds, linear
            gradients, radial gradients, and conic gradients. Export gradient
            code instantly for CSS, Tailwind CSS, SwiftUI, and Kotlin. Perfect
            for web designers, frontend developers, and UI/UX professionals.
          </p>
          <div
            className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-neutral-400"
            aria-label="Features"
          >
            <span>CSS Gradients</span>
            <span aria-hidden="true">•</span>
            <span>Gradient Backgrounds</span>
            <span aria-hidden="true">•</span>
            <span>Tailwind Gradients</span>
            <span aria-hidden="true">•</span>
            <span>Gradient Animations</span>
            <span aria-hidden="true">•</span>
            <span>Color Palettes</span>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="mb-8 pt-6 border-t border-neutral-800/50">
          <h3 className="text-sm font-medium text-neutral-300 mb-3 text-center">
            Privacy
          </h3>
          <p className="text-xs text-neutral-400 max-w-2xl mx-auto text-center leading-relaxed">
            Your favorites are stored locally in your browser. We use PostHog
            for anonymous usage analytics (page views, feature usage) to improve
            the app. No personal data is collected or sold. You can opt out
            using a browser extension like uBlock Origin.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-neutral-800/50">
          {/* Keyboard shortcuts hint */}
          <div className="flex flex-wrap gap-3 text-xs text-neutral-400">
            {KEYBOARD_SHORTCUTS.slice(0, 4).map(({ key, description }) => (
              <div key={key} className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400">
                  {key}
                </kbd>
                <span>{description}</span>
              </div>
            ))}
          </div>

          {/* Branding & GitHub Stars */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-neutral-400">
            <p>
              Open source by{" "}
              <span className="text-neutral-300">
                Appleby Web Services Ltd.
              </span>
            </p>
            <GitHubStars />
          </div>
        </div>
      </div>
    </footer>
  );
}
