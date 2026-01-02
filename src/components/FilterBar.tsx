import { X, ChevronDown, Check } from './icons';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { VIBE_OPTIONS, COLOR_OPTIONS } from '@/lib/wizard';
import { gradientCategories } from '@/data/gradients';
import type { GradientCategory, WizardVibe, WizardColor, GradientTypeFilter } from '@/types';

interface FilterBarProps {
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
}

const GRADIENT_TYPES: { value: GradientTypeFilter; label: string }[] = [
  { value: 'linear', label: 'Linear' },
  { value: 'radial', label: 'Radial' },
  { value: 'conic', label: 'Conic' },
];

export function FilterBar({
  category,
  vibe,
  colors,
  gradientType,
  onCategoryChange,
  onVibeChange,
  onToggleColor,
  onGradientTypeChange,
  onClearFilters,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Category Select */}
      <Select
        value={category}
        onValueChange={(val) => onCategoryChange(val as GradientCategory | 'All' | 'Favorites')}
      >
        <SelectTrigger className="w-[130px] h-8 text-xs" aria-label="Filter by category">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {gradientCategories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Vibe Select */}
      <Select
        value={vibe ?? 'any'}
        onValueChange={(val) => onVibeChange(val === 'any' ? null : (val as WizardVibe))}
      >
        <SelectTrigger className="w-[130px] h-8 text-xs" aria-label="Filter by vibe">
          <SelectValue placeholder="Vibe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any vibe</SelectItem>
          {VIBE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Colors Multi-Select Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'flex h-8 items-center justify-between gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white',
              'hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-600',
              colors.length > 0 && 'border-white/30'
            )}
            aria-label="Filter by colors"
          >
            {colors.length === 0 ? (
              <span className="text-neutral-400">Colors</span>
            ) : colors.length <= 2 ? (
              <span>{colors.join(', ')}</span>
            ) : (
              <span>{colors.length} colors</span>
            )}
            <ChevronDown className="h-3 w-3 text-neutral-500" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="start">
          <div className="space-y-1">
            {COLOR_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onToggleColor(opt.value)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm',
                  'hover:bg-neutral-800 transition-colors',
                  colors.includes(opt.value) && 'bg-neutral-800'
                )}
              >
                <div
                  className="w-4 h-4 rounded border border-white/20"
                  style={{ background: opt.previewGradient }}
                />
                <span className="flex-1 text-left">{opt.label}</span>
                {colors.includes(opt.value) && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Type Select */}
      <Select
        value={gradientType ?? 'any'}
        onValueChange={(val) => onGradientTypeChange(val === 'any' ? null : (val as GradientTypeFilter))}
      >
        <SelectTrigger className="w-[110px] h-8 text-xs" aria-label="Filter by gradient type">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any type</SelectItem>
          {GRADIENT_TYPES.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-8 px-2 text-xs text-neutral-400 hover:text-white"
        >
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
