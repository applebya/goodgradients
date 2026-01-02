import { useRef } from 'react';
import { Search, Shuffle, Sparkles } from './icons';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { gradientCategories } from '@/data/gradients';
import { VIBE_OPTIONS } from '@/lib/wizard';
import type { GradientCategory, WizardSelections, WizardColor } from '@/types';

interface HeaderProps {
  category: GradientCategory | 'All' | 'Favorites';
  searchQuery: string;
  onCategoryChange: (category: GradientCategory | 'All' | 'Favorites') => void;
  onSearchChange: (query: string) => void;
  onRandomGradient: () => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
  onOpenWizard?: () => void;
  hasActiveFilters?: boolean;
  wizardMatchCount?: number;
  wizardSelections?: WizardSelections;
  onClearFilters?: () => void;
  onRemoveWizardVibe?: () => void;
  onRemoveWizardColor?: (color: WizardColor) => void;
}

export function Header({
  category,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  onRandomGradient,
  searchInputRef,
  onOpenWizard,
  hasActiveFilters,
  wizardMatchCount,
  wizardSelections,
  onClearFilters,
  onRemoveWizardVibe,
  onRemoveWizardColor,
}: HeaderProps) {
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = searchInputRef || internalRef;

  return (
    <header className="sticky top-0 z-30 glass-header">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Single row: Logo + Search + Actions */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">GG</span>
            </div>
            <h1 className="text-base font-medium text-white hidden sm:block">GoodGradients</h1>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-9 pl-9 pr-8 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white caret-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 focus:bg-neutral-800"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline text-[10px] text-neutral-600">
              /
            </kbd>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {onOpenWizard && (
              <Button variant="ghost" size="icon-sm" onClick={onOpenWizard} title="Find gradients">
                <Sparkles className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon-sm" onClick={onRandomGradient} title="Random gradient">
              <Shuffle className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-1.5 mt-3 overflow-x-scroll pb-1 scrollbar-hide min-h-[32px]">
          {hasActiveFilters && wizardSelections ? (
            <>
              {wizardSelections.vibe && (
                <button
                  onClick={() => onRemoveWizardVibe?.()}
                  className="px-2.5 py-1 rounded-full text-sm whitespace-nowrap bg-white text-black font-medium flex items-center gap-1"
                >
                  {VIBE_OPTIONS.find(v => v.value === wizardSelections.vibe)?.label}
                  <span className="text-neutral-400 text-xs">×</span>
                </button>
              )}
              {wizardSelections.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => onRemoveWizardColor?.(color)}
                  className="px-2.5 py-1 rounded-full text-sm whitespace-nowrap bg-white text-black font-medium flex items-center gap-1"
                >
                  {color}
                  <span className="text-neutral-400 text-xs">×</span>
                </button>
              ))}
              <button
                onClick={onClearFilters}
                className="px-2.5 py-1 text-sm text-neutral-500 hover:text-white"
              >
                Clear
              </button>
            </>
          ) : (
              gradientCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-sm whitespace-nowrap',
                    category === cat
                      ? 'bg-white text-black font-medium'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  {cat}
                </button>
              ))
            )}
        </div>

        {/* Match count when wizard filters active */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="text-neutral-500">
              {wizardMatchCount} {wizardMatchCount === 1 ? 'gradient' : 'gradients'}
            </span>
            <button
              onClick={onOpenWizard}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Edit filters
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
