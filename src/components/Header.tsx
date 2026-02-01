import { FilterBar } from "./FilterBar";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { AnimatedLogo } from "./AnimatedLogo";
import { useIsMobile } from "@/hooks/useMediaQuery";
import type {
  WizardColor,
  GradientTypeFilter,
  UIPreviewMode,
  ColorFormat,
} from "@/types";

interface HeaderProps {
  // Filters
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

export function Header({
  colors,
  tags,
  gradientType,
  previewMode,
  colorFormat,
  selectedAnimationId,
  animationSpeed,
  showFavoritesOnly,
  onColorsChange,
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
}: HeaderProps) {
  const isMobile = useIsMobile();

  // Count active filters for mobile badge
  const activeFilterCount =
    colors.length + tags.length + (showFavoritesOnly ? 1 : 0);

  if (isMobile) {
    // Mobile: Single sticky header with filters left, logo center
    return (
      <header className="sticky top-0 z-20 bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Left: Filter sheet trigger */}
            <div className="w-10">
              <MobileFilterSheet
                colors={colors}
                tags={tags}
                gradientType={gradientType}
                previewMode={previewMode}
                colorFormat={colorFormat}
                selectedAnimationId={selectedAnimationId}
                animationSpeed={animationSpeed}
                showFavoritesOnly={showFavoritesOnly}
                onToggleColor={onToggleColor}
                onToggleTag={onToggleTag}
                onGradientTypeChange={onGradientTypeChange}
                onPreviewModeChange={onPreviewModeChange}
                onColorFormatChange={onColorFormatChange}
                onAnimationChange={onAnimationChange}
                onAnimationSpeedChange={onAnimationSpeedChange}
                onToggleFavorites={onToggleFavorites}
                onClearFilters={onClearFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>

            {/* Center: Logo */}
            <a
              href="/"
              className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity"
            >
              <AnimatedLogo selectedAnimationId={selectedAnimationId} />
            </a>

            {/* Right: Spacer for balance */}
            <div className="w-10" />
          </div>
        </div>
      </header>
    );
  }

  // Desktop: Two-row layout (logo scrolls, filters sticky)
  return (
    <>
      {/* Top bar: Logo - scrolls with page */}
      <div className="bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <a
            href="/"
            className="inline-flex items-center hover:opacity-80 transition-opacity"
          >
            <AnimatedLogo selectedAnimationId={selectedAnimationId} />
          </a>
        </div>
      </div>

      {/* Filter bar - sticky */}
      <header className="sticky top-0 z-20 bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <FilterBar
            colors={colors}
            tags={tags}
            gradientType={gradientType}
            previewMode={previewMode}
            colorFormat={colorFormat}
            selectedAnimationId={selectedAnimationId}
            animationSpeed={animationSpeed}
            showFavoritesOnly={showFavoritesOnly}
            onColorsChange={onColorsChange}
            onToggleColor={onToggleColor}
            onToggleTag={onToggleTag}
            onGradientTypeChange={onGradientTypeChange}
            onPreviewModeChange={onPreviewModeChange}
            onColorFormatChange={onColorFormatChange}
            onAnimationChange={onAnimationChange}
            onAnimationSpeedChange={onAnimationSpeedChange}
            onToggleFavorites={onToggleFavorites}
            onClearFilters={onClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </header>
    </>
  );
}
