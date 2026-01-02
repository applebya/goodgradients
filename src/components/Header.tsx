import { useRef } from 'react';
import { Search, Shuffle } from './icons';
import { Button } from './ui/button';
import { FilterBar } from './FilterBar';
import { MobileFilterSheet } from './MobileFilterSheet';
import { useIsMobile } from '@/hooks/useMediaQuery';
import type { GradientCategory, WizardVibe, WizardColor, GradientTypeFilter } from '@/types';

interface HeaderProps {
  // Search
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;

  // Filters
  category: GradientCategory | 'All' | 'Favorites';
  vibe: WizardVibe | null;
  colors: WizardColor[];
  gradientType: GradientTypeFilter | null;
  onCategoryChange: (category: GradientCategory | 'All' | 'Favorites') => void;
  onVibeChange: (vibe: WizardVibe | null) => void;
  onColorsChange: (colors: WizardColor[]) => void;
  onToggleColor: (color: WizardColor) => void;
  onGradientTypeChange: (type: GradientTypeFilter | null) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;

  // Actions
  onRandomGradient: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  searchInputRef,
  category,
  vibe,
  colors,
  gradientType,
  onCategoryChange,
  onVibeChange,
  onColorsChange,
  onToggleColor,
  onGradientTypeChange,
  onClearFilters,
  hasActiveFilters,
  onRandomGradient,
}: HeaderProps) {
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = searchInputRef ?? internalRef;
  const isMobile = useIsMobile();

  // Count active filters for mobile badge
  const activeFilterCount = [
    category !== 'All' ? 1 : 0,
    vibe ? 1 : 0,
    colors.length,
    gradientType ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <header className="sticky top-0 z-30 glass-header">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Top row: Logo + Search + Actions */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">GG</span>
            </div>
            <h1 className="text-base font-medium text-white hidden sm:block">
              GoodGradients
            </h1>
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
            {/* Mobile: Filter sheet trigger */}
            {isMobile && (
              <MobileFilterSheet
                category={category}
                vibe={vibe}
                colors={colors}
                gradientType={gradientType}
                onCategoryChange={onCategoryChange}
                onVibeChange={onVibeChange}
                onToggleColor={onToggleColor}
                onGradientTypeChange={onGradientTypeChange}
                onClearFilters={onClearFilters}
                activeFilterCount={activeFilterCount}
              />
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onRandomGradient}
              title="Random gradient"
              aria-label="Select random gradient"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop: Filter bar */}
        {!isMobile && (
          <div className="mt-3">
            <FilterBar
              category={category}
              vibe={vibe}
              colors={colors}
              gradientType={gradientType}
              onCategoryChange={onCategoryChange}
              onVibeChange={onVibeChange}
              onColorsChange={onColorsChange}
              onToggleColor={onToggleColor}
              onGradientTypeChange={onGradientTypeChange}
              onClearFilters={onClearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        )}
      </div>
    </header>
  );
}
