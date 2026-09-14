import { memo, useCallback, useMemo, useState } from "react";
import { toast } from "./Toast";
import { Copy, Check } from "./icons";
import { HeartButton } from "./HeartButton";
import { applyAnimationSpeed } from "./AnimationSpeedSlider";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { transformGradient } from "@/lib/gradient";
import { getAnimationById } from "@/data/animations";
import { getGradientAverageColor, getBestTextColor } from "@/lib/contrast";
import type {
  GradientPreset,
  UIPreviewMode,
  GradientTypeFilter,
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
        "group gradient-card bg-card/50 border border-border/50 rounded-xl overflow-hidden will-change-transform",
        "hover:scale-[1.02] hover:shadow-lg hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all duration-200 cursor-pointer",
      )}
      onClick={() => onSelect(gradient)}
      onKeyDown={handleKeyDown}
      onMouseEnter={preloadGradientDetail}
      onFocus={preloadGradientDetail}
    >
      {/* Gradient Preview - landscape 16:9 aspect ratio */}
      <div
        className="relative aspect-[16/9]"
        style={{
          background:
            previewMode === "background" ? displayGradient : "hsl(var(--card))",
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

      {/* Card Content - minimal: name + category badge, single row */}
      <div className="px-4 py-3 relative card-shimmer card-shimmer-content rounded-b-xl">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-card-foreground font-semibold tracking-tight text-sm truncate">
            {gradient.name}
          </h2>
          <Badge
            variant="outline"
            className="text-[10px] px-1.5 py-0 flex-shrink-0 font-medium tracking-wide uppercase text-muted-foreground border-border/50"
          >
            {gradient.category}
          </Badge>
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
      className="bg-card/50 border border-border rounded-xl overflow-hidden"
    >
      {/* Gradient Preview Skeleton */}
      <div className="aspect-[16/9] loading-shimmer" />

      {/* Card Content Skeleton - single row: name + badge */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="h-4 w-28 rounded loading-shimmer" />
          <div className="h-4 w-14 rounded-full loading-shimmer" />
        </div>
      </div>
    </div>
  );
}
