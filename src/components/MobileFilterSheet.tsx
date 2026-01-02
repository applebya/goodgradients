import { SlidersHorizontal, Check } from './icons';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from './ui/sheet';
import { cn } from '@/lib/utils';
import { VIBE_OPTIONS, COLOR_OPTIONS } from '@/lib/wizard';
import { gradientCategories } from '@/data/gradients';
import type { GradientCategory, WizardVibe, WizardColor, GradientTypeFilter } from '@/types';

interface MobileFilterSheetProps {
  category: GradientCategory | 'All' | 'Favorites';
  vibe: WizardVibe | null;
  colors: WizardColor[];
  gradientType: GradientTypeFilter | null;
  onCategoryChange: (category: GradientCategory | 'All' | 'Favorites') => void;
  onVibeChange: (vibe: WizardVibe | null) => void;
  onToggleColor: (color: WizardColor) => void;
  onGradientTypeChange: (type: GradientTypeFilter | null) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

const GRADIENT_TYPES: { value: GradientTypeFilter; label: string }[] = [
  { value: 'linear', label: 'Linear' },
  { value: 'radial', label: 'Radial' },
  { value: 'conic', label: 'Conic' },
];

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
        {title}
      </h3>
      {children}
    </div>
  );
}

function OptionPill({
  selected,
  onClick,
  children,
  preview,
  ariaLabel,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  preview?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={selected}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
        selected
          ? 'bg-white text-black font-medium'
          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
      )}
    >
      {preview && (
        <div
          className="w-4 h-4 rounded border border-white/20"
          style={{ background: preview }}
        />
      )}
      {children}
    </button>
  );
}

export function MobileFilterSheet({
  category,
  vibe,
  colors,
  gradientType,
  onCategoryChange,
  onVibeChange,
  onToggleColor,
  onGradientTypeChange,
  onClearFilters,
  activeFilterCount,
}: MobileFilterSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="relative" aria-label="Open filters">
          <SlidersHorizontal className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4 px-4">
          {/* Category */}
          <FilterSection title="Category">
            <div className="flex flex-wrap gap-2">
              {gradientCategories.map((cat) => (
                <OptionPill
                  key={cat}
                  selected={category === cat}
                  onClick={() => onCategoryChange(cat)}
                >
                  {cat}
                </OptionPill>
              ))}
            </div>
          </FilterSection>

          {/* Vibe */}
          <FilterSection title="Vibe">
            <div className="flex flex-wrap gap-2">
              <OptionPill
                selected={vibe === null}
                onClick={() => onVibeChange(null)}
              >
                Any
              </OptionPill>
              {VIBE_OPTIONS.map((opt) => (
                <OptionPill
                  key={opt.value}
                  selected={vibe === opt.value}
                  onClick={() => onVibeChange(opt.value)}
                  preview={opt.previewGradient}
                >
                  {opt.label}
                </OptionPill>
              ))}
            </div>
          </FilterSection>

          {/* Colors */}
          <FilterSection title="Colors (select multiple)">
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onToggleColor(opt.value)}
                  aria-label={`${opt.label} color`}
                  aria-pressed={colors.includes(opt.value)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                    colors.includes(opt.value)
                      ? 'bg-white text-black font-medium'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  )}
                >
                  <div
                    className="w-4 h-4 rounded border border-white/20"
                    style={{ background: opt.previewGradient }}
                  />
                  {opt.label}
                  {colors.includes(opt.value) && (
                    <Check className="w-3 h-3" />
                  )}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Gradient Type */}
          <FilterSection title="Type">
            <div className="flex flex-wrap gap-2">
              <OptionPill
                selected={gradientType === null}
                onClick={() => onGradientTypeChange(null)}
              >
                Any
              </OptionPill>
              {GRADIENT_TYPES.map((opt) => (
                <OptionPill
                  key={opt.value}
                  selected={gradientType === opt.value}
                  onClick={() => onGradientTypeChange(opt.value)}
                >
                  {opt.label}
                </OptionPill>
              ))}
            </div>
          </FilterSection>
        </div>

        <SheetFooter className="flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClearFilters}
          >
            Clear all
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
