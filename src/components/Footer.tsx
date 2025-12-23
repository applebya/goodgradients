import { KEYBOARD_SHORTCUTS } from '@/hooks/useKeyboard';

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Keyboard shortcuts hint */}
          <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
            {KEYBOARD_SHORTCUTS.slice(0, 4).map(({ key, description }) => (
              <div key={key} className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400">
                  {key}
                </kbd>
                <span>{description}</span>
              </div>
            ))}
          </div>

          {/* Branding */}
          <p className="text-sm text-neutral-500">
            Vibe-coded with{' '}
            <span className="text-red-400" aria-label="love">
              ❤️
            </span>{' '}
            by{' '}
            <a
              href="https://appleby.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Appleby Consulting
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
