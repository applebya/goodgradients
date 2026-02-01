import {
  SlidersHorizontal,
  Check,
  Heart,
  Layout,
  Blend,
  Palette,
} from "./icons";
import { Button } from "./ui/button";
import { useColorSpelling } from "@/hooks/useLocale";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "./ui/sheet";
import {
  AnimationSpeedSlider,
  applyAnimationSpeed,
} from "./AnimationSpeedSlider";
import { cn } from "@/lib/utils";
import { COLOR_OPTIONS } from "@/lib/wizard";
import { COLOR_FORMAT_OPTIONS } from "@/lib/color-format";
import { allTags } from "@/data/gradients";
import { animations } from "@/data/animations";
import type {
  WizardColor,
  GradientTypeFilter,
  UIPreviewMode,
  ColorFormat,
  Animation,
} from "@/types";

// Priority tags for mobile - most useful/common ones
const MOBILE_PRIORITY_TAGS = [
  "elegant",
  "modern",
  "bold",
  "soft",
  "vibrant",
  "professional",
  "nature",
  "tech",
  "calm",
  "dark",
  "warm",
  "cool",
  "minimal",
  "luxury",
  "creative",
];

const getMobileFilteredTags = (): string[] => {
  // Show priority tags that exist in the actual tag list
  return MOBILE_PRIORITY_TAGS.filter((t) => allTags.includes(t));
};

interface MobileFilterSheetProps {
  colors: WizardColor[];
  tags: string[];
  gradientType: GradientTypeFilter;
  previewMode: UIPreviewMode;
  colorFormat: ColorFormat;
  selectedAnimationId: string | null;
  animationSpeed: number;
  showFavoritesOnly: boolean;
  onToggleColor: (color: WizardColor) => void;
  onToggleTag: (tag: string) => void;
  onGradientTypeChange: (type: GradientTypeFilter) => void;
  onPreviewModeChange: (mode: UIPreviewMode) => void;
  onColorFormatChange: (format: ColorFormat) => void;
  onAnimationChange: (id: string | null) => void;
  onAnimationSpeedChange: (speed: number) => void;
  onToggleFavorites: () => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

const GRADIENT_TYPES: { value: GradientTypeFilter; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "radial", label: "Radial" },
  { value: "conic", label: "Conic" },
];

const PREVIEW_MODES: {
  value: UIPreviewMode;
  label: string;
  icon: typeof Layout;
}[] = [
  { value: "background", label: "Background", icon: Layout },
  { value: "button", label: "Button", icon: Layout },
  { value: "badge", label: "Badge", icon: Layout },
  { value: "text", label: "Text", icon: Layout },
  { value: "border", label: "Border", icon: Layout },
];

// Parse animation properties from the property string
function parseAnimationStyle(
  animation: Animation | undefined,
): React.CSSProperties {
  if (!animation || !animation.property) {
    return {};
  }

  const animMatch = animation.property.match(/animation:\s*([^;]+);?/);
  const animValue = animMatch ? animMatch[1] : undefined;
  const bgSizeMatch = animation.property.match(/background-size:\s*([^;]+);?/);
  const bgSize = bgSizeMatch ? bgSizeMatch[1] : undefined;

  return {
    ...(bgSize ? { backgroundSize: bgSize } : {}),
    ...(animValue ? { animation: animValue } : {}),
  };
}

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
        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
        selected
          ? "bg-white text-black font-medium"
          : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700",
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
  previewMode,
  colorFormat,
  selectedAnimationId,
  animationSpeed,
  showFavoritesOnly,
  onToggleColor,
  onToggleTag,
  onGradientTypeChange,
  onPreviewModeChange,
  onColorFormatChange,
  onAnimationChange,
  onAnimationSpeedChange,
  onToggleFavorites,
  onClearFilters,
  activeFilterCount,
}: MobileFilterSheetProps) {
  const spelling = useColorSpelling();
  const previewGradient = "linear-gradient(135deg, #000 0%, #fff 100%)";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="relative"
          aria-label="Open filters"
        >
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
          <FilterSection title={`${spelling.Colors} (select multiple)`}>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onToggleColor(opt.value)}
                  aria-label={`${opt.label} color`}
                  aria-pressed={colors.includes(opt.value)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                    colors.includes(opt.value)
                      ? "bg-white text-black font-medium"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700",
                  )}
                >
                  <div
                    className="w-4 h-4 rounded border border-white/20"
                    style={{ background: opt.previewGradient }}
                  />
                  {opt.label}
                  {colors.includes(opt.value) && <Check className="w-3 h-3" />}
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
                  <Blend className="w-3.5 h-3.5" />
                  {opt.label}
                </OptionPill>
              ))}
            </div>
          </FilterSection>

          {/* Favorites Toggle */}
          <FilterSection title="Favorites">
            <button
              onClick={onToggleFavorites}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-full justify-center",
                showFavoritesOnly
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700",
              )}
              aria-pressed={showFavoritesOnly}
            >
              <Heart
                className={cn("w-4 h-4", showFavoritesOnly && "fill-current")}
              />
              {showFavoritesOnly
                ? "Showing Favorites Only"
                : "Show Favorites Only"}
            </button>
          </FilterSection>

          {/* Preview Mode */}
          <FilterSection title="Preview">
            <div className="flex flex-wrap gap-2">
              {PREVIEW_MODES.map((opt) => (
                <OptionPill
                  key={opt.value}
                  selected={previewMode === opt.value}
                  onClick={() => onPreviewModeChange(opt.value)}
                >
                  <Layout className="w-3.5 h-3.5" />
                  {opt.label}
                </OptionPill>
              ))}
            </div>
          </FilterSection>

          {/* Color Format */}
          <FilterSection title={`${spelling.Color} Format`}>
            <div className="flex flex-wrap gap-2">
              {COLOR_FORMAT_OPTIONS.map((opt) => (
                <OptionPill
                  key={opt.value}
                  selected={colorFormat === opt.value}
                  onClick={() => onColorFormatChange(opt.value)}
                >
                  <Palette className="w-3.5 h-3.5" />
                  {opt.label}
                </OptionPill>
              ))}
            </div>
          </FilterSection>

          {/* Animation Picker */}
          <FilterSection title="Animation">
            <div className="grid grid-cols-3 gap-2">
              {animations.map((anim) => {
                const isSelected =
                  anim.id === "none"
                    ? !selectedAnimationId
                    : selectedAnimationId === anim.id;

                const baseStyle = parseAnimationStyle(
                  anim.id !== "none" ? anim : undefined,
                );
                const styleWithSpeed =
                  anim.id !== "none"
                    ? applyAnimationSpeed(baseStyle, animationSpeed)
                    : baseStyle;

                return (
                  <button
                    key={anim.id}
                    onClick={() => {
                      if (anim.id === "none") {
                        onAnimationChange(null);
                      } else {
                        onAnimationChange(anim.id);
                      }
                    }}
                    className={cn(
                      "rounded-lg border overflow-hidden transition-all",
                      isSelected
                        ? "border-white ring-2 ring-white/20"
                        : "border-neutral-700 hover:border-neutral-500",
                    )}
                  >
                    <div
                      className="h-10"
                      style={{
                        background: previewGradient,
                        ...styleWithSpeed,
                      }}
                    />
                    <div className="p-1.5 bg-neutral-900">
                      <p className="text-[10px] text-white font-medium truncate">
                        {anim.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Speed slider - only show when animation is selected */}
            {selectedAnimationId && (
              <div className="mt-3 pt-3 border-t border-neutral-800">
                <AnimationSpeedSlider
                  speed={animationSpeed}
                  onChange={onAnimationSpeedChange}
                />
              </div>
            )}
          </FilterSection>

          {/* Tags - with reduced set for mobile */}
          <FilterSection title="Style">
            <div className="flex flex-wrap gap-2">
              {getMobileFilteredTags().map((tag) => (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  aria-label={`${tag} tag`}
                  aria-pressed={tags.includes(tag)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors capitalize",
                    tags.includes(tag)
                      ? "bg-white text-black font-medium"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700",
                  )}
                >
                  {tag}
                  {tags.includes(tag) && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </FilterSection>
        </div>

        <SheetFooter className="flex-row gap-2">
          <Button variant="outline" className="flex-1" onClick={onClearFilters}>
            Clear all
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
