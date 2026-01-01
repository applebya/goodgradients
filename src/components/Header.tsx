import { useRef } from 'react';
import { Search, Shuffle, Zap, Sparkles, X } from './icons';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { gradientCategories } from '@/data/gradients';
import type { GradientCategory } from '@/types';

interface HeaderProps {
  category: GradientCategory | 'All' | 'Favorites' | 'Animated';
  searchQuery: string;
  onCategoryChange: (category: GradientCategory | 'All' | 'Favorites' | 'Animated') => void;
  onSearchChange: (query: string) => void;
  onRandomGradient: () => void;
  onOpenStudio: () => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
  onOpenWizard?: () => void;
  hasActiveFilters?: boolean;
  wizardMatchCount?: number;
  onClearFilters?: () => void;
}

export function Header({
  category,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  onRandomGradient,
  onOpenStudio,
  searchInputRef,
  onOpenWizard,
  hasActiveFilters,
  wizardMatchCount,
  onClearFilters,
}: HeaderProps) {
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = searchInputRef || internalRef;

  return (
    <header className="sticky top-0 z-30 glass-header">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">GG</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">GoodGradients</h1>
              <p className="text-xs text-neutral-500">CSS gradients for developers</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenWizard && (
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenWizard}
                className="btn-shine bg-gradient-to-r from-violet-500/10 to-pink-500/10 border-violet-500/30 hover:border-violet-400"
              >
                <Sparkles className="w-4 h-4 mr-1 text-violet-400" />
                <span className="hidden sm:inline">Find My Gradient</span>
                <span className="sm:hidden">Find</span>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onRandomGradient}
              className="hidden sm:flex btn-shine"
            >
              <Shuffle className="w-4 h-4 mr-1" />
              Random
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenStudio}
              className="btn-shine"
            >
              <Zap className="w-4 h-4 mr-1" />
              Animation Studio
            </Button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search gradients, colors, or tags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-12 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 text-xs text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded">
              /
            </kbd>
          </div>

          {/* Category pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {gradientCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  'category-pill px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all',
                  category === cat
                    ? 'bg-white text-black font-medium active'
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Wizard filter indicator */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between py-2 px-3 mt-3 rounded-lg bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-white">
                <span className="font-medium">{wizardMatchCount}</span> gradients match your style
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenWizard}
                className="text-xs text-violet-300 hover:text-violet-200 transition-colors"
              >
                Edit preferences
              </button>
              <button
                onClick={onClearFilters}
                className="p-1 rounded hover:bg-white/10 transition-colors"
                title="Clear filters"
              >
                <X className="w-4 h-4 text-neutral-400 hover:text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
