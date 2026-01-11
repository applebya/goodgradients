import { KEYBOARD_SHORTCUTS } from '@/hooks/useKeyboard';

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
            Good Gradients is a free gradient generator tool with 500+ curated CSS gradients.
            Browse beautiful gradient backgrounds, linear gradients, radial gradients, and conic gradients.
            Export gradient code instantly for CSS, Tailwind CSS, SwiftUI, and Kotlin.
            Perfect for web designers, frontend developers, and UI/UX professionals.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-neutral-400" aria-label="Features">
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

          {/* Branding & Open Source */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-neutral-400">
            <p>
              Open source project by{' '}
              <span className="text-neutral-300">Appleby Web Services Ltd.</span>
            </p>
            <span className="hidden sm:inline" aria-hidden="true">•</span>
            <a
              href="https://github.com/applebya/goodgradients"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
