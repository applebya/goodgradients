import { X, ChevronDown, Check, Tag } from './icons';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { COLOR_OPTIONS } from '@/lib/wizard';
import { allTags } from '@/data/gradients';
import type { WizardColor, GradientTypeFilter, UIPreviewMode } from '@/types';

interface FilterBarProps {
  colors: WizardColor[];
  tags: string[];
  gradientType: GradientTypeFilter;
  previewMode: UIPreviewMode;
  onColorsChange: (colors: WizardColor[]) => void;
  onToggleColor: (color: WizardColor) => void;
  onToggleTag: (tag: string) => void;
  onGradientTypeChange: (type: GradientTypeFilter) => void;
  onPreviewModeChange: (mode: UIPreviewMode) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const GRADIENT_TYPES: { value: GradientTypeFilter; label: string }[] = [
  { value: 'linear', label: 'Linear' },
  { value: 'radial', label: 'Radial' },
  { value: 'conic', label: 'Conic' },
];

const PREVIEW_MODES: { value: UIPreviewMode; label: string }[] = [
  { value: 'background', label: 'Background' },
  { value: 'button', label: 'Button' },
  { value: 'text', label: 'Text' },
  { value: 'badge', label: 'Badge' },
];

export function FilterBar({
  colors,
  tags,
  gradientType,
  previewMode,
  onToggleColor,
  onToggleTag,
  onGradientTypeChange,
  onPreviewModeChange,
  onClearFilters,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left: Filters */}
      <div className="flex flex-wrap items-center gap-2">
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
                <span className="text-neutral-400">All Colors</span>
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

        {/* Tags Multi-Select Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                'flex h-8 items-center justify-between gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white',
                'hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-600',
                tags.length > 0 && 'border-white/30'
              )}
              aria-label="Filter by tags"
            >
              <Tag className="h-3 w-3 text-neutral-500" />
              {tags.length === 0 ? (
                <span className="text-neutral-400">Tags</span>
              ) : tags.length <= 2 ? (
                <span>{tags.join(', ')}</span>
              ) : (
                <span>{tags.length} tags</span>
              )}
              <ChevronDown className="h-3 w-3 text-neutral-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2 max-h-64 overflow-y-auto" align="start">
            <div className="space-y-1">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm',
                    'hover:bg-neutral-800 transition-colors',
                    tags.includes(tag) && 'bg-neutral-800'
                  )}
                >
                  <span className="flex-1 text-left capitalize">{tag}</span>
                  {tags.includes(tag) && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

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

      {/* Right: Global Controls */}
      <div className="flex items-center gap-2">
        {/* Preview Mode Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex h-8 items-center justify-between gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-600"
              aria-label="Preview mode"
            >
              <span>{PREVIEW_MODES.find(m => m.value === previewMode)?.label ?? 'Background'}</span>
              <ChevronDown className="h-3 w-3 text-neutral-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-2" align="end">
            <div className="space-y-1">
              {PREVIEW_MODES.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onPreviewModeChange(opt.value)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm',
                    'hover:bg-neutral-800 transition-colors',
                    previewMode === opt.value && 'bg-neutral-800'
                  )}
                >
                  <span className="flex-1 text-left">{opt.label}</span>
                  {previewMode === opt.value && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Gradient Type Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex h-8 items-center justify-between gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-600"
              aria-label="Gradient type"
            >
              <span>{GRADIENT_TYPES.find(t => t.value === gradientType)?.label ?? 'Linear'}</span>
              <ChevronDown className="h-3 w-3 text-neutral-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-36 p-2" align="end">
            <div className="space-y-1">
              {GRADIENT_TYPES.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onGradientTypeChange(opt.value)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm',
                    'hover:bg-neutral-800 transition-colors',
                    gradientType === opt.value && 'bg-neutral-800'
                  )}
                >
                  <span className="flex-1 text-left">{opt.label}</span>
                  {gradientType === opt.value && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
