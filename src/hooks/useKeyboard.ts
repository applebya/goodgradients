import { useEffect, useCallback } from 'react';

interface KeyboardShortcuts {
  onEscape?: () => void;
  onSearch?: () => void;
  onCopy?: () => void;
  onFavorite?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onToggleAnimation?: () => void;
}

export function useKeyboard(shortcuts: KeyboardShortcuts) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ignore if typing in an input
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Only handle Escape in inputs
        if (event.key === 'Escape' && shortcuts.onEscape) {
          target.blur();
          shortcuts.onEscape();
        }
        return;
      }

      // Prevent default for handled shortcuts
      const handled = (): void => {
        event.preventDefault();
        event.stopPropagation();
      };

      switch (event.key) {
        case 'Escape':
          if (shortcuts.onEscape) {
            handled();
            shortcuts.onEscape();
          }
          break;
        case '/':
          if (shortcuts.onSearch) {
            handled();
            shortcuts.onSearch();
          }
          break;
        case 'c':
          if (!event.metaKey && !event.ctrlKey && shortcuts.onCopy) {
            handled();
            shortcuts.onCopy();
          }
          break;
        case 'f':
          if (!event.metaKey && !event.ctrlKey && shortcuts.onFavorite) {
            handled();
            shortcuts.onFavorite();
          }
          break;
        case 'ArrowRight':
          if (shortcuts.onNext) {
            handled();
            shortcuts.onNext();
          }
          break;
        case 'ArrowLeft':
          if (shortcuts.onPrevious) {
            handled();
            shortcuts.onPrevious();
          }
          break;
        case ' ':
          if (shortcuts.onToggleAnimation) {
            handled();
            shortcuts.onToggleAnimation();
          }
          break;
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// Keyboard shortcut hints for display
export const KEYBOARD_SHORTCUTS = [
  { key: '/', description: 'Focus search' },
  { key: 'Esc', description: 'Close modal' },
  { key: 'c', description: 'Copy CSS' },
  { key: 'f', description: 'Toggle favorite' },
  { key: '←/→', description: 'Navigate gradients' },
  { key: 'Space', description: 'Toggle animation' },
] as const;
