import { useEffect, useRef } from "react";
import {
  X,
  ChevronDown,
  Check,
  Tag,
  Layout,
  Blend,
  Palette,
  Heart,
} from "./icons";
import { useColorSpelling } from "@/hooks/useLocale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "./ui/popover";
import { AnimationPicker } from "./AnimationPicker";
import { cn } from "@/lib/utils";
import { COLOR_OPTIONS } from "@/lib/wizard";
import { COLOR_FORMAT_OPTIONS } from "@/lib/color-format";
import { allTags } from "@/data/gradients";
import type {
  WizardColor,
  GradientTypeFilter,
  UIPreviewMode,
  ColorFormat,
} from "@/types";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  colors: WizardColor[];
  tags: string[];
  gradientType: GradientTypeFilter;
  previewMode: UIPreviewMode;
  colorFormat: ColorFormat;
  selectedAnimationId: string | null;
  animationSpeed: number;
  showFavoritesOnly: boolean;
  onColorsChange: (colors: WizardColor[]) => void;
  onToggleColor: (color: WizardColor) => void;
  onToggleTag: (tag: string) => void;
  onGradientTypeChange: (type: GradientTypeFilter) => void;
  onPreviewModeChange: (mode: UIPreviewMode) => void;
  onColorFormatChange: (format: ColorFormat) => void;
  onAnimationChange: (id: string | null) => void;
  onAnimationSpeedChange: (speed: number) => void;
  onToggleFavorites: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const GRADIENT_TYPES: { value: GradientTypeFilter; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "radial", label: "Radial" },
  { value: "conic", label: "Conic" },
];

const PREVIEW_MODES: { value: UIPreviewMode; label: string }[] = [
  { value: "background", label: "Background" },
  { value: "button", label: "Button" },
  { value: "badge", label: "Badge" },
  { value: "text", label: "Text" },
  { value: "border", label: "Border" },
];

export function FilterBar({
  searchQuery,
  onSearchChange,
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
  hasActiveFilters,
}: FilterBarProps) {
  const spelling = useColorSpelling();
  const searchRef = useRef<HTMLInputElement>(null);

  /*
    "/" jumps to search, the convention the gallery has always advertised.
    Ignored while the caret is already in a field, so typing a slash into a
    search or a colour value does not get stolen.
  */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      const tag = el?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (el as HTMLElement | null)?.isContentEditable
      )
        return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left: Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          Filter
        </span>
        <input
          ref={searchRef}
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          aria-label="Search gradients"
          className="h-7 w-36 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {/* Colors Multi-Select Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex h-7 items-center justify-between gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground",
                "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
                colors.length > 0 && "border-ring/50",
              )}
              aria-label="Filter by colors"
            >
              {colors.length === 0 ? (
                <span className="text-muted-foreground">Any Colors</span>
              ) : (
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1">
                    {colors.slice(0, 3).map((color) => {
                      const opt = COLOR_OPTIONS.find((o) => o.value === color);
                      return (
                        <div
                          key={color}
                          className="w-3.5 h-3.5 rounded-full border border-border"
                          style={{ background: opt?.previewGradient }}
                        />
                      );
                    })}
                  </div>
                  <span>
                    {colors.length === 1
                      ? colors[0]
                      : `${colors.length} colors`}
                  </span>
                </div>
              )}
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-2" align="start">
            <div className="space-y-1">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onToggleColor(opt.value)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm whitespace-nowrap",
                    "hover:bg-muted transition-colors",
                    colors.includes(opt.value) && "bg-muted",
                  )}
                >
                  <div
                    className="w-4 h-4 rounded border border-border shrink-0"
                    style={{ background: opt.previewGradient }}
                  />
                  <span className="text-left">{opt.label}</span>
                  {colors.includes(opt.value) && (
                    <Check className="h-4 w-4 text-foreground shrink-0" />
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
                "flex h-7 items-center justify-between gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground",
                "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
                tags.length > 0 && "border-ring/50",
              )}
              aria-label="Filter by tags"
            >
              <Tag className="h-3 w-3 text-muted-foreground" />
              {tags.length === 0 ? (
                <span className="text-muted-foreground">Tags</span>
              ) : tags.length <= 2 ? (
                <span>{tags.join(", ")}</span>
              ) : (
                <span>{tags.length} tags</span>
              )}
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="p-2 max-h-64 overflow-y-auto"
            align="start"
          >
            <div className="space-y-1">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm whitespace-nowrap",
                    "hover:bg-muted transition-colors",
                    tags.includes(tag) && "bg-muted",
                  )}
                >
                  <span className="text-left capitalize">{tag}</span>
                  {tags.includes(tag) && (
                    <Check className="h-4 w-4 text-foreground shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Favorites Toggle */}
        <button
          onClick={onToggleFavorites}
          className={cn(
            "flex h-7 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs",
            "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
            showFavoritesOnly
              ? "border-red-500/50 text-red-400"
              : "text-foreground",
          )}
          aria-label={
            showFavoritesOnly ? "Show all gradients" : "Show favorites only"
          }
          aria-pressed={showFavoritesOnly}
        >
          <Heart
            className={cn(
              "h-3 w-3",
              showFavoritesOnly ? "fill-current" : "text-muted-foreground",
            )}
          />
          <span>{showFavoritesOnly ? "Favorites" : "Favorites"}</span>
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Clear all filters"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {/* Right: Global Controls */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          Display
        </span>
        {/* Preview Mode Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex h-7 items-center justify-between gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Preview mode"
            >
              <Layout className="h-3 w-3 text-muted-foreground" />
              <span>
                {PREVIEW_MODES.find((m) => m.value === previewMode)?.label ??
                  "Background UI"}
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-2" align="end">
            <div className="space-y-1">
              {PREVIEW_MODES.map((opt) => (
                <PopoverClose key={opt.value} asChild>
                  <button
                    onClick={() => onPreviewModeChange(opt.value)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm whitespace-nowrap",
                      "hover:bg-muted transition-colors",
                      previewMode === opt.value && "bg-muted",
                    )}
                  >
                    <span className="text-left">{opt.label}</span>
                    {previewMode === opt.value && (
                      <Check className="h-4 w-4 text-foreground shrink-0" />
                    )}
                  </button>
                </PopoverClose>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Gradient Type Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex h-7 items-center justify-between gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Gradient type"
            >
              <Blend className="h-3 w-3 text-muted-foreground" />
              <span>
                {GRADIENT_TYPES.find((t) => t.value === gradientType)?.label ??
                  "Linear"}
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-2" align="end">
            <div className="space-y-1">
              {GRADIENT_TYPES.map((opt) => (
                <PopoverClose key={opt.value} asChild>
                  <button
                    onClick={() => onGradientTypeChange(opt.value)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm whitespace-nowrap",
                      "hover:bg-muted transition-colors",
                      gradientType === opt.value && "bg-muted",
                    )}
                  >
                    <span className="text-left">{opt.label}</span>
                    {gradientType === opt.value && (
                      <Check className="h-4 w-4 text-foreground shrink-0" />
                    )}
                  </button>
                </PopoverClose>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Color Format Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex h-7 items-center justify-between gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={`${spelling.Color} format`}
            >
              <Palette className="h-3 w-3 text-muted-foreground" />
              <span>
                {COLOR_FORMAT_OPTIONS.find((f) => f.value === colorFormat)
                  ?.label ?? "HEX"}
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-2" align="end">
            <div className="space-y-1">
              {COLOR_FORMAT_OPTIONS.map((opt) => (
                <PopoverClose key={opt.value} asChild>
                  <button
                    onClick={() => onColorFormatChange(opt.value)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm whitespace-nowrap",
                      "hover:bg-muted transition-colors",
                      colorFormat === opt.value && "bg-muted",
                    )}
                  >
                    <span className="text-left">{opt.label}</span>
                    {colorFormat === opt.value && (
                      <Check className="h-4 w-4 text-foreground shrink-0" />
                    )}
                  </button>
                </PopoverClose>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Animation Picker */}
        <AnimationPicker
          selectedAnimationId={selectedAnimationId}
          animationSpeed={animationSpeed}
          onAnimationChange={onAnimationChange}
          onSpeedChange={onAnimationSpeedChange}
        />
      </div>
    </div>
  );
}
