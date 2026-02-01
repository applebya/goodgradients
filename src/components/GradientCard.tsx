import { memo, useCallback, useMemo, useState } from "react";
import { toast } from "./Toast";
import { Copy, Check, Tag } from "./icons";
import { HeartButton } from "./HeartButton";
import { applyAnimationSpeed } from "./AnimationSpeedSlider";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { transformGradient } from "@/lib/gradient";
import { convertColor } from "@/lib/color-format";
import { getAnimationById } from "@/data/animations";
import { getGradientAverageColor, getBestTextColor } from "@/lib/contrast";
import type {
  GradientPreset,
  UIPreviewMode,
  GradientTypeFilter,
  ColorFormat,
} from "@/types";

// Preload the GradientDetail chunk on hover for instant modal opening
let detailPreloaded = false;
function preloadGradientDetail() {
  if (detailPreloaded) return;
  detailPreloaded = true;
  import("./GradientDetail");
}

interface GradientCardProps {
  gradient: GradientPreset;
  gradientType: GradientTypeFilter;
  previewMode: UIPreviewMode;
  colorFormat: ColorFormat;
  selectedAnimationId: string | null;
  animationSpeed: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: (gradient: GradientPreset) => void;
}

export const GradientCard = memo(function GradientCard({
  gradient,
  gradientType,
  previewMode,
  colorFormat,
  selectedAnimationId,
  animationSpeed,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: GradientCardProps) {
  // Transform gradient to the selected type (linear/radial/conic)
  const displayGradient = transformGradient(
    gradient.gradient,
    gradientType,
    135,
  );

  // Get animation and parse its styles
  const selectedAnimation = selectedAnimationId
    ? getAnimationById(selectedAnimationId)
    : undefined;

  const animationStyle = useMemo((): React.CSSProperties => {
    if (!selectedAnimation || !selectedAnimation.property) {
      return {};
    }
    const animMatch = selectedAnimation.property.match(
      /animation:\s*([^;]+);?/,
    );
    const animValue = animMatch ? animMatch[1] : undefined;
    const bgSizeMatch = selectedAnimation.property.match(
      /background-size:\s*([^;]+);?/,
    );
    const bgSize = bgSizeMatch ? bgSizeMatch[1] : undefined;

    const baseStyle: React.CSSProperties = {
      ...(bgSize ? { backgroundSize: bgSize } : {}),
      ...(animValue ? { animation: animValue } : {}),
    };

    return applyAnimationSpeed(baseStyle, animationSpeed);
  }, [selectedAnimation, animationSpeed]);

  const [copied, setCopied] = useState(false);

  const handleQuickCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      navigator.clipboard.writeText(`background: ${displayGradient};`);
      setCopied(true);
      toast.success("CSS copied");
      setTimeout(() => setCopied(false), 1500);
    },
    [displayGradient],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(gradient);
    }
  };

  const handleCopyColor = useCallback(
    (e: React.MouseEvent, color: string) => {
      e.stopPropagation();
      const formattedColor = convertColor(color, colorFormat);
      navigator.clipboard.writeText(formattedColor);
      toast.success("Copied to clipboard");
    },
    [colorFormat],
  );

  // Calculate best text color for contrast
  const textColor = useMemo(() => {
    const avgColor = getGradientAverageColor(gradient.colors);
    return getBestTextColor(avgColor);
  }, [gradient.colors]);

  // Render the preview content based on mode
  const renderPreviewContent = () => {
    switch (previewMode) {
      case "button":
        return (
          <div className="flex items-center justify-center h-full">
            <div
              className="px-6 py-2.5 rounded-lg font-medium text-sm shadow-lg"
              style={{
                background: displayGradient,
                color: textColor,
                ...animationStyle,
              }}
            >
              Click me
            </div>
          </div>
        );
      case "text":
        return (
          <div className="flex items-center justify-center h-full">
            <span
              className="text-3xl font-bold"
              style={{
                background: displayGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                ...animationStyle,
              }}
            >
              Gradient
            </span>
          </div>
        );
      case "badge":
        return (
          <div className="flex items-center justify-center h-full gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: displayGradient,
                color: textColor,
                ...animationStyle,
              }}
            >
              New
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: displayGradient,
                color: textColor,
                ...animationStyle,
              }}
            >
              Featured
            </span>
          </div>
        );
      case "border":
        return (
          <div className="flex items-center justify-center h-full">
            <div
              className="relative rounded-xl p-[3px]"
              style={{ background: displayGradient, ...animationStyle }}
            >
              <div className="bg-neutral-900 rounded-[9px] px-6 py-3">
                <span className="text-white text-sm font-medium">Card</span>
              </div>
            </div>
          </div>
        );
      case "background":
      default:
        return null; // Background mode just uses the container background
    }
  };

  return (
    <article
      data-testid="gradient-card"
      tabIndex={0}
      aria-label={`${gradient.name} gradient - ${gradient.description}`}
      className={cn(
        "group bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden",
        "hover:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors cursor-pointer",
      )}
      onClick={() => onSelect(gradient)}
      onKeyDown={handleKeyDown}
      onMouseEnter={preloadGradientDetail}
      onFocus={preloadGradientDetail}
    >
      {/* Gradient Preview */}
      <div
        className="relative aspect-video"
        style={{
          background:
            previewMode === "background" ? displayGradient : "#171717",
          ...(previewMode === "background" ? animationStyle : {}),
        }}
      >
        {renderPreviewContent()}
        {/* Action buttons - visible on hover/focus */}
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          {/* Quick copy button */}
          <Button
            size="icon-sm"
            variant="ghost"
            className={cn(
              "h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 transition-all",
              "text-white/70 hover:text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
            )}
            onClick={handleQuickCopy}
            aria-label="Copy gradient CSS"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
          {/* Favorite button */}
          <HeartButton
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
            variant="overlay"
            ariaLabel={
              isFavorite
                ? `Remove ${gradient.name} from favorites`
                : `Add ${gradient.name} to favorites`
            }
          />
        </div>
      </div>

      {/* Card Content - with shimmer overlay (shimmer limited to this area) */}
      <div className="p-4 relative card-shimmer card-shimmer-content rounded-b-xl">
        {/* Title row with tags on right */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-white font-medium">{gradient.name}</h3>
          {/* Tags - right-aligned, wrap if needed */}
          <div className="flex gap-1 flex-wrap justify-end flex-shrink-0">
            {gradient.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] gap-0.5 px-1.5 py-0"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <p className="text-sm text-neutral-400 mb-3 line-clamp-2">
          {gradient.description}
        </p>

        {/* Color Swatches - clickable to copy */}
        <div className="flex gap-2">
          {gradient.colors.slice(0, 3).map((color, i) => (
            <button
              key={i}
              onClick={(e) => handleCopyColor(e, color)}
              className="flex items-center gap-1.5 flex-1 min-w-0 group/color hover:bg-white/5 rounded-md p-1 -m-1 transition-colors"
              title={`Copy ${convertColor(color, colorFormat)}`}
            >
              <div
                className="w-5 h-5 rounded-md border border-white/20 flex-shrink-0 group-hover/color:border-white/40 transition-colors"
                style={{ background: color }}
              />
              <span className="text-xs text-neutral-400 font-mono truncate group-hover/color:text-neutral-300 transition-colors">
                {convertColor(color, colorFormat)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
});

// Skeleton card for loading states
export function SkeletonCard() {
  return (
    <div
      data-testid="skeleton-card"
      className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden"
    >
      {/* Gradient Preview Skeleton */}
      <div className="aspect-video loading-shimmer" />

      {/* Card Content Skeleton */}
      <div className="p-4">
        {/* Title row with tags */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="h-5 w-24 rounded loading-shimmer" />
          <div className="flex gap-1">
            {[0, 1].map((i) => (
              <div key={i} className="h-4 w-10 rounded-full loading-shimmer" />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5 mb-3">
          <div className="h-3.5 w-full rounded loading-shimmer" />
          <div className="h-3.5 w-3/4 rounded loading-shimmer" />
        </div>

        {/* Color Swatches */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-1.5 flex-1">
              <div className="w-5 h-5 rounded-md loading-shimmer" />
              <div className="h-3 flex-1 rounded loading-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
