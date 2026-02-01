import { AnimatedLogo } from "./AnimatedLogo";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer className="border-t border-neutral-800 py-8 mt-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand - hidden on mobile since logo is in sticky header */}
          {!isMobile && (
            <div className="md:col-span-2">
              <div className="mb-2">
                <AnimatedLogo selectedAnimationId={null} />
              </div>
              <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
                500+ designer-curated gradients to make your UI stand out. Add
                eye-catching animations, export to CSS, Tailwind, SwiftUI,
                Kotlin, CSV, or AI-ready descriptions. Build memorable brands
                and delight your users.
              </p>
            </div>
          )}

          {/* Resources */}
          <div>
            <h4 className="text-neutral-300 font-medium text-sm mb-3">
              Good Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS/gradient"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  MDN CSS Gradients
                </a>
              </li>
              <li>
                <a
                  href="https://cssgradient.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  CSS Gradient Generator
                </a>
              </li>
              <li>
                <a
                  href="https://uigradients.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  uiGradients
                </a>
              </li>
              <li>
                <a
                  href="https://webgradients.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  WebGradients
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Project */}
          <div>
            <h4 className="text-neutral-300 font-medium text-sm mb-3">
              Project
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/applebya/goodgradients"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* SEO keyword tags */}
          {isMobile ? (
            <div
              className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-neutral-500"
              aria-label="Features"
            >
              <span>CSS Gradients</span>
              <span>Gradient Generator</span>
              <span>Tailwind Gradients</span>
              <span>Gradient Animations</span>
            </div>
          ) : (
            <div
              className="flex flex-wrap justify-start gap-x-3 gap-y-1 text-xs text-neutral-500"
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
          )}

          {/* Attribution */}
          <p className="text-xs text-neutral-500">
            An{" "}
            <a
              href="https://github.com/applebya/goodgradients"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              open source project
            </a>{" "}
            by{" "}
            <a
              href="https://github.com/applebya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Andrew Appleby
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
