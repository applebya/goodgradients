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
import { COLOR_OPTIONS } from '@/lib/wizard';
import { allTags } from '@/data/gradients';
import type { WizardColor, GradientTypeFilter } from '@/types';

interface MobileFilterSheetProps {
  colors: WizardColor[];
  tags: string[];
  gradientType: GradientTypeFilter;
  onToggleColor: (color: WizardColor) => void;
  onToggleTag: (tag: string) => void;
  onGradientTypeChange: (type: GradientTypeFilter) => void;
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
  ariaLabel,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
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
      {children}
    </button>
  );
}

export function MobileFilterSheet({
  colors,
  tags,
  gradientType,
  onToggleColor,
  onToggleTag,
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

          {/* Tags */}
          <FilterSection title="Tags (select multiple)">
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  aria-label={`${tag} tag`}
                  aria-pressed={tags.includes(tag)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors capitalize',
                    tags.includes(tag)
                      ? 'bg-white text-black font-medium'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  )}
                >
                  {tag}
                  {tags.includes(tag) && (
                    <Check className="w-3 h-3" />
                  )}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Gradient Type */}
          <FilterSection title="Type">
            <div className="flex flex-wrap gap-2">
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
