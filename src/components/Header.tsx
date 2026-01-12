import { useRef } from 'react';
import { Search, Shuffle } from './icons';
import { Button } from './ui/button';
import { FilterBar } from './FilterBar';
import { MobileFilterSheet } from './MobileFilterSheet';
import { useIsMobile } from '@/hooks/useMediaQuery';
import type { WizardColor, GradientTypeFilter, UIPreviewMode, ColorFormat } from '@/types';

interface HeaderProps {
  // Search
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;

  // Filters
  colors: WizardColor[];
  tags: string[];
  gradientType: GradientTypeFilter;
  previewMode: UIPreviewMode;
  colorFormat: ColorFormat;
  selectedAnimationId: string | null;
  showFavoritesOnly: boolean;
  onColorsChange: (colors: WizardColor[]) => void;
  onToggleColor: (color: WizardColor) => void;
  onToggleTag: (tag: string) => void;
  onGradientTypeChange: (type: GradientTypeFilter) => void;
  onPreviewModeChange: (mode: UIPreviewMode) => void;
  onColorFormatChange: (format: ColorFormat) => void;
  onAnimationChange: (id: string | null) => void;
  onToggleFavorites: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;

  // Actions
  onRandomGradient: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  searchInputRef,
  colors,
  tags,
  gradientType,
  previewMode,
  colorFormat,
  selectedAnimationId,
  showFavoritesOnly,
  onColorsChange,
  onToggleColor,
  onToggleTag,
  onGradientTypeChange,
  onPreviewModeChange,
  onColorFormatChange,
  onAnimationChange,
  onToggleFavorites,
  onClearFilters,
  hasActiveFilters,
  onRandomGradient,
}: HeaderProps) {
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = searchInputRef ?? internalRef;
  const isMobile = useIsMobile();

  // Count active filters for mobile badge
  const activeFilterCount = colors.length + tags.length;

  return (
    <header className="bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Top row: Logo + Search + Actions */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1.5 flex-shrink-0 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">GG</span>
            </div>
            <span className="text-sm font-medium text-white hidden sm:block">
              Good Gradients
            </span>
          </a>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-7 pl-8 pr-6 bg-neutral-900 border border-neutral-800 rounded-md text-xs text-white caret-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 focus:bg-neutral-800"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline text-[10px] text-neutral-600">
              /
            </kbd>
          </div>

          {/* Actions - pr-14 to avoid GitHub corner overlap */}
          <div className="flex items-center gap-1 flex-shrink-0 pr-14 sm:pr-12">
            {/* Mobile: Filter sheet trigger */}
            {isMobile && (
              <MobileFilterSheet
                colors={colors}
                tags={tags}
                gradientType={gradientType}
                onToggleColor={onToggleColor}
                onToggleTag={onToggleTag}
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
          <div className="mt-2">
            <FilterBar
              colors={colors}
              tags={tags}
              gradientType={gradientType}
              previewMode={previewMode}
              colorFormat={colorFormat}
              selectedAnimationId={selectedAnimationId}
              showFavoritesOnly={showFavoritesOnly}
              onColorsChange={onColorsChange}
              onToggleColor={onToggleColor}
              onToggleTag={onToggleTag}
              onGradientTypeChange={onGradientTypeChange}
              onPreviewModeChange={onPreviewModeChange}
              onColorFormatChange={onColorFormatChange}
              onAnimationChange={onAnimationChange}
              onToggleFavorites={onToggleFavorites}
              onClearFilters={onClearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        )}
      </div>
    </header>
  );
}
