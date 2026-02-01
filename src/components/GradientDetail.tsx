import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "./Toast";
import {
  Copy,
  Check,
  Layers,
  Circle,
  RotateCw,
  Maximize2,
  Zap,
  X,
  ChevronDown,
  Palette,
} from "./icons";
import { ShareMenu } from "./ShareMenu";
import { HeartButton } from "./HeartButton";
import {
  AnimationSpeedSlider,
  applyAnimationSpeed,
} from "./AnimationSpeedSlider";
import { animations, getAnimationById } from "@/data/animations";
import type { Animation, ColorFormat, UIPreviewMode } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn, copyToClipboard } from "@/lib/utils";
import {
  getGradientAverageColor,
  getDiverseTextColors,
  formatContrastRatio,
  getContrastRatio,
  meetsWCAG,
  type ContrastInfo,
} from "@/lib/contrast";
import {
  encodeGradient,
  gradientToCSS,
  getGradientColors,
} from "@/lib/gradient-url";
import type { GradientDefinition, GradientType } from "@/lib/gradient-url";
import {
  convertColor,
  convertGradientColors,
  COLOR_FORMAT_OPTIONS,
} from "@/lib/color-format";
import { useColorSpelling } from "@/hooks/useLocale";

interface GradientDetailProps {
  gradientDef: GradientDefinition | null;
  gradientName: string | null;
  encodedGradient: string | null;
  isOpen: boolean;
  onClose: () => void;
  selectedAnimationId: string | null;
  animationSpeed: number;
  isAnimating: boolean;
  isFavorite: boolean;
  colorFormat: ColorFormat;
  previewMode: UIPreviewMode;
  skipAnimation?: boolean;
  onGradientChange: (encoded: string) => void;
  onAnimationChange: (id: string | null) => void;
  onAnimationSpeedChange: (speed: number) => void;
  onToggleAnimating: () => void;
  onToggleFavorite: () => void;
  onColorFormatChange: (format: ColorFormat) => void;
  onPreviewModeChange: (mode: UIPreviewMode) => void;
  onShare: () => string;
}

export function GradientDetail({
  gradientDef,
  gradientName,
  isOpen,
  onClose,
  selectedAnimationId,
  animationSpeed,
  isAnimating,
  isFavorite,
  colorFormat,
  previewMode,
  skipAnimation,
  onGradientChange,
  onAnimationChange,
  onAnimationSpeedChange,
  onToggleAnimating,
  onToggleFavorite,
  onColorFormatChange,
  onPreviewModeChange,
  onShare,
}: GradientDetailProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState<
    "background" | "button" | "badge" | "text" | null
  >(null);
  const [codeTab, setCodeTab] = useState<
    "css" | "tailwind" | "swift" | "kotlin" | "ai"
  >("css");
  const [showSettings, setShowSettings] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // Locale-aware spelling
  const spelling = useColorSpelling();

  // Reset fullscreen state when modal closes or gradient changes
  useEffect(() => {
    if (!isOpen) {
      setIsFullscreen(false);
      setFullscreenMode(null);
    }
  }, [isOpen]);

  // Close fullscreen on Escape key
  useEffect(() => {
    if (!isFullscreen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isFullscreen]);

  const handleFullscreenPreview = (
    mode: "background" | "button" | "badge" | "text",
  ) => {
    setFullscreenMode(mode);
    setIsFullscreen(true);
  };

  // Get selected animation
  const selectedAnimation = selectedAnimationId
    ? getAnimationById(selectedAnimationId)
    : undefined;

  // Helper to parse animation properties from the property string
  const parseAnimationStyle = useCallback(
    (animation: Animation | undefined): React.CSSProperties => {
      if (!animation || !animation.property) {
        return {};
      }

      // Parse the property string to extract animation value
      const animMatch = animation.property.match(/animation:\s*([^;]+);?/);
      const animValue = animMatch ? animMatch[1] : undefined;

      // Check if needs expanded background-size
      const bgSizeMatch = animation.property.match(
        /background-size:\s*([^;]+);?/,
      );
      const bgSize = bgSizeMatch ? bgSizeMatch[1] : undefined;

      return {
        ...(bgSize ? { backgroundSize: bgSize } : {}),
        ...(animValue ? { animation: animValue } : {}),
      };
    },
    [],
  );

  // Helper to get animation inline styles (respects isAnimating state and speed)
  const getAnimationStyle = useCallback(
    (animation: Animation | undefined): React.CSSProperties => {
      if (!animation || !isAnimating) {
        return {};
      }
      const baseStyle = parseAnimationStyle(animation);
      return applyAnimationSpeed(baseStyle, animationSpeed);
    },
    [isAnimating, parseAnimationStyle, animationSpeed],
  );

  const handleCopy = useCallback(async (text: string, id: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    }
  }, []);

  const handleTypeChange = useCallback(
    (type: GradientType) => {
      if (!gradientDef) return;
      const newDef = { ...gradientDef, type };
      onGradientChange(encodeGradient(newDef));
    },
    [gradientDef, onGradientChange],
  );

  const handleAngleChange = useCallback(
    (angle: number) => {
      if (!gradientDef) return;
      const newDef = { ...gradientDef, angle };
      onGradientChange(encodeGradient(newDef));
    },
    [gradientDef, onGradientChange],
  );

  if (!gradientDef) return null;

  const displayGradient = gradientToCSS(gradientDef);
  const colors = getGradientColors(gradientDef);
  const avgColor = getGradientAverageColor(colors);

  // Get best text colors - picks diverse options (one light, one dark)
  const bestTextColors = getDiverseTextColors(avgColor);

  // Convert gradient to selected color format
  const formattedGradient = convertGradientColors(displayGradient, colorFormat);
  const formattedColors = colors.map((c) => convertColor(c, colorFormat));

  // Generate export code based on preview mode
  const generateCSSCode = () => {
    const animProps = selectedAnimation
      ? `\n  ${selectedAnimation.property}`
      : "";
    const keyframes = selectedAnimation
      ? `${selectedAnimation.keyframes}\n\n`
      : "";

    switch (previewMode) {
      case "button":
        return {
          simple: `background: ${formattedGradient};
color: ${bestTextColors[0]?.color || "#ffffff"};
border: none;
padding: 0.75rem 1.5rem;
border-radius: 0.5rem;
font-weight: 600;
cursor: pointer;${animProps}`,
          full: `${keyframes}.button.gradient {
  background: ${formattedGradient};
  color: ${bestTextColors[0]?.color || "#ffffff"};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;${animProps}
}

.button.gradient:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}`,
        };

      case "badge":
        return {
          simple: `display: inline-block;
background: ${formattedGradient};
color: ${bestTextColors[0]?.color || "#ffffff"};
padding: 0.25rem 0.75rem;
border-radius: 9999px;
font-size: 0.875rem;
font-weight: 500;${animProps}`,
          full: `${keyframes}.gradient-badge {
  display: inline-block;
  background: ${formattedGradient};
  color: ${bestTextColors[0]?.color || "#ffffff"};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;${animProps}
}`,
        };

      case "text":
        return {
          simple: `background: ${formattedGradient};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;${animProps}`,
          full: `${keyframes}.gradient-text {
  background: ${formattedGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;${animProps}
}`,
        };

      case "background":
      default:
        return {
          simple: `background: ${formattedGradient};${animProps}`,
          full: `${keyframes}.gradient-bg {
  background: ${formattedGradient};${animProps}
}`,
        };
    }
  };

  const { simple: cssCode, full: fullCSSCode } = generateCSSCode();

  // Tailwind CSS code - context-aware based on preview mode
  const tailwindCode = (() => {
    const textColor = bestTextColors[0]?.color || "#ffffff";
    const textColorClass =
      textColor === "#ffffff"
        ? "text-white"
        : textColor === "#000000"
          ? "text-black"
          : `text-[${textColor}]`;

    // Build gradient classes
    let gradientClasses: string;
    if (gradientDef.type === "linear" && formattedColors.length === 2) {
      const from = formattedColors[0]?.replace("#", "") ?? "";
      const to = formattedColors[1]?.replace("#", "") ?? "";
      gradientClasses = `bg-gradient-to-br from-[#${from}] to-[#${to}]`;
    } else {
      const encodedColors = formattedColors.join(",").replace(/#/g, "%23");
      const gradientType =
        gradientDef.type === "radial"
          ? `radial-gradient(circle_at_center,${encodedColors})`
          : gradientDef.type === "conic"
            ? `conic-gradient(from_${gradientDef.angle}deg_at_center,${encodedColors})`
            : `linear-gradient(${gradientDef.angle}deg,${encodedColors})`;
      gradientClasses = `bg-[${gradientType}]`;
    }

    switch (previewMode) {
      case "button":
        return `<button class="${gradientClasses} ${textColorClass} px-6 py-3 rounded-lg font-semibold border-0 cursor-pointer hover:opacity-90 transition-opacity">
  Click me
</button>`;

      case "badge":
        return `<span class="${gradientClasses} ${textColorClass} inline-block px-3 py-1 rounded-full text-sm font-medium">
  New
</span>`;

      case "text":
        return `<h1 class="${gradientClasses} bg-clip-text text-transparent font-bold text-4xl">
  Gradient Text
</h1>`;

      case "background":
      default:
        return `<div class="${gradientClasses}">
  <!-- Your content -->
</div>`;
    }
  })();

  // SwiftUI code
  const swiftUICode = `LinearGradient(
  gradient: Gradient(colors: [
    ${formattedColors.map((c) => `Color(hex: "${c}")`).join(",\n    ")}
  ]),
  startPoint: .topLeading,
  endPoint: .bottomTrailing
)`;

  // Kotlin/Jetpack Compose code
  const kotlinCode = `Brush.linearGradient(
  colors = listOf(
    ${formattedColors.map((c) => `Color(0xFF${c.replace("#", "").toUpperCase()})`).join(",\n    ")}
  ),
  start = Offset(0f, 0f),
  end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY)
)`;

  // AI Agent description
  const aiAgentCode = `A ${gradientDef.type} gradient with the following colors:
${formattedColors.map((c, i) => `- ${c} at ${gradientDef.stops[i]?.position ?? i * 100}%`).join("\n")}
${gradientDef.type === "linear" || gradientDef.type === "conic" ? `Angle: ${gradientDef.angle}°` : "Radiates from center"}
${selectedAnimation ? `Animation: ${selectedAnimation.name} - ${selectedAnimation.description}` : ""}`.trim();

  // Render fullscreen content based on mode
  const renderFullscreenContent = () => {
    switch (fullscreenMode) {
      case "background":
        return (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-8"
            style={{
              background: displayGradient,
              ...getAnimationStyle(selectedAnimation),
            }}
          >
            <h1
              className="text-5xl font-bold mb-4 drop-shadow-lg"
              style={{ color: bestTextColors[0]?.color || "#ffffff" }}
            >
              Your Headline Here
            </h1>
            <p
              className="text-xl opacity-80 mb-8 max-w-md text-center drop-shadow"
              style={{ color: bestTextColors[0]?.color || "#ffffff" }}
            >
              This is how your content looks on this gradient background.
            </p>
            <div className="flex gap-4">
              <button
                className="px-6 py-3 rounded-lg font-medium shadow-lg"
                style={{
                  background: bestTextColors[0]?.color || "#ffffff",
                  color: avgColor,
                }}
              >
                Primary Button
              </button>
              <button
                className="px-6 py-3 rounded-lg font-medium border-2"
                style={{
                  borderColor: bestTextColors[0]?.color || "#ffffff",
                  color: bestTextColors[0]?.color || "#ffffff",
                }}
              >
                Secondary
              </button>
            </div>
            {/* Text color suggestions */}
            <div className="absolute bottom-6 left-6 flex gap-2">
              <span
                className="text-xs opacity-60"
                style={{ color: bestTextColors[0]?.color || "#fff" }}
              >
                Recommended text:
              </span>
              {bestTextColors.map((tc, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(tc.color, `text-${i}`);
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-black/30 backdrop-blur-sm"
                >
                  <div
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ background: tc.color }}
                  />
                  <span
                    className="text-xs font-mono"
                    style={{ color: tc.color }}
                  >
                    {tc.color}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      case "button":
        return (
          <div className="w-full h-full flex items-center justify-center bg-neutral-900">
            <button
              className="px-12 py-6 rounded-xl text-2xl font-bold shadow-2xl hover:scale-105 transition-transform"
              style={{
                background: displayGradient,
                color: bestTextColors[0]?.color || "#ffffff",
                ...getAnimationStyle(selectedAnimation),
              }}
            >
              Gradient Button
            </button>
          </div>
        );
      case "badge":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-neutral-900">
            <div className="flex gap-4">
              <span
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: displayGradient,
                  color: bestTextColors[0]?.color || "#ffffff",
                  ...getAnimationStyle(selectedAnimation),
                }}
              >
                New Feature
              </span>
              <span
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: displayGradient,
                  color: bestTextColors[0]?.color || "#ffffff",
                  ...getAnimationStyle(selectedAnimation),
                }}
              >
                Popular
              </span>
              <span
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: displayGradient,
                  color: bestTextColors[0]?.color || "#ffffff",
                  ...getAnimationStyle(selectedAnimation),
                }}
              >
                Pro
              </span>
            </div>
            <div className="flex gap-4">
              <span
                className="px-6 py-3 rounded-lg text-lg font-semibold"
                style={{
                  background: displayGradient,
                  color: bestTextColors[0]?.color || "#ffffff",
                  ...getAnimationStyle(selectedAnimation),
                }}
              >
                Premium Badge
              </span>
            </div>
          </div>
        );
      case "text":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center gap-8 bg-neutral-900">
            <h1
              className="text-7xl font-black bg-clip-text text-transparent"
              style={{
                backgroundImage: displayGradient,
                ...getAnimationStyle(selectedAnimation),
              }}
            >
              Gradient Text
            </h1>
            <p
              className="text-3xl font-semibold bg-clip-text text-transparent max-w-2xl text-center"
              style={{
                backgroundImage: displayGradient,
                ...getAnimationStyle(selectedAnimation),
              }}
            >
              Beautiful typography with gradient colors
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  // Fullscreen overlay rendered via Portal to ensure it's above Dialog overlay
  // Uses z-[9999] to guarantee it's above all Radix Dialog layers
  // onPointerDown handlers prevent Radix Dialog from detecting "click outside"
  const fullscreenOverlay =
    isFullscreen &&
    isOpen &&
    fullscreenMode &&
    createPortal(
      <div
        data-testid="fullscreen-overlay"
        className="fixed inset-0 z-[9999] animate-fullscreen-fade-in cursor-pointer"
        style={{ pointerEvents: "auto" }}
        onClick={() => setIsFullscreen(false)}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Close button - explicit target for reliable closing */}
        <button
          data-testid="fullscreen-close"
          onClick={(e) => {
            e.stopPropagation();
            setIsFullscreen(false);
          }}
          className="absolute top-4 right-4 z-[10000] p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
          style={{ pointerEvents: "auto" }}
          aria-label="Close fullscreen preview"
        >
          <X className="w-6 h-6" />
        </button>
        {renderFullscreenContent()}
        <div className="absolute bottom-6 right-6">
          <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
            Click anywhere to close
          </Badge>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      {fullscreenOverlay}

      {/* Main dialog */}
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          className="max-w-2xl p-4 pb-8 sm:p-4 sm:pb-4 gap-3 sm:gap-3"
          hideCloseButton
          skipAnimation={skipAnimation}
        >
          {/* Header */}
          <DialogHeader className="pb-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2 text-base">
                {gradientName ?? "Custom Gradient"}
              </DialogTitle>
              <div className="flex items-center gap-1">
                <ShareMenu
                  getShareUrl={onShare}
                  gradientName={gradientName ?? `${gradientDef.type} gradient`}
                />
                <HeartButton
                  isFavorite={isFavorite}
                  onToggle={onToggleFavorite}
                />
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className="h-8 w-8 text-neutral-400 hover:text-white"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Use Cases - Each selectable with fullscreen option */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Background */}
            <button
              className={cn(
                "rounded-lg p-3 flex flex-col items-center justify-center min-h-[70px] cursor-pointer hover:scale-[1.02] transition-all relative group/preview",
                previewMode === "background"
                  ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-900"
                  : "ring-1 ring-transparent hover:ring-white/30",
              )}
              style={{
                background: displayGradient,
                ...getAnimationStyle(selectedAnimation),
              }}
              onClick={() => onPreviewModeChange("background")}
              aria-label="Select background display mode"
            >
              <span
                className="text-xs font-medium drop-shadow"
                style={{ color: bestTextColors[0]?.color || "#fff" }}
              >
                Background
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullscreenPreview("background");
                }}
                className="absolute top-1.5 right-1.5 p-1 rounded opacity-0 group-hover/preview:opacity-100 hover:bg-black/30 transition-all"
                aria-label="View background in fullscreen"
              >
                <Maximize2
                  className="w-3 h-3"
                  style={{ color: bestTextColors[0]?.color || "#fff" }}
                />
              </button>
            </button>

            {/* Button */}
            <button
              className={cn(
                "flex items-center justify-center bg-neutral-800 rounded-lg p-2 cursor-pointer hover:scale-[1.02] transition-all relative group/preview",
                previewMode === "button"
                  ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-900"
                  : "ring-1 ring-transparent hover:ring-white/30",
              )}
              onClick={() => onPreviewModeChange("button")}
              aria-label="Select button display mode"
            >
              <span
                className="px-3 py-1.5 rounded text-xs font-medium pointer-events-none"
                style={{
                  background: displayGradient,
                  color: bestTextColors[0]?.color || "#fff",
                  ...getAnimationStyle(selectedAnimation),
                }}
              >
                Button
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullscreenPreview("button");
                }}
                className="absolute top-1.5 right-1.5 p-1 rounded opacity-0 group-hover/preview:opacity-100 hover:bg-white/10 transition-all"
                aria-label="View button in fullscreen"
              >
                <Maximize2 className="w-3 h-3 text-neutral-400" />
              </button>
            </button>

            {/* Badge */}
            <button
              className={cn(
                "flex items-center justify-center bg-neutral-800 rounded-lg p-2 cursor-pointer hover:scale-[1.02] transition-all relative group/preview",
                previewMode === "badge"
                  ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-900"
                  : "ring-1 ring-transparent hover:ring-white/30",
              )}
              onClick={() => onPreviewModeChange("badge")}
              aria-label="Select badge display mode"
            >
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-medium pointer-events-none"
                style={{
                  background: displayGradient,
                  color: bestTextColors[0]?.color || "#fff",
                  ...getAnimationStyle(selectedAnimation),
                }}
              >
                Badge
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullscreenPreview("badge");
                }}
                className="absolute top-1.5 right-1.5 p-1 rounded opacity-0 group-hover/preview:opacity-100 hover:bg-white/10 transition-all"
                aria-label="View badge in fullscreen"
              >
                <Maximize2 className="w-3 h-3 text-neutral-400" />
              </button>
            </button>

            {/* Text */}
            <button
              className={cn(
                "flex items-center justify-center bg-neutral-800 rounded-lg p-2 cursor-pointer hover:scale-[1.02] transition-all relative group/preview",
                previewMode === "text"
                  ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-900"
                  : "ring-1 ring-transparent hover:ring-white/30",
              )}
              onClick={() => onPreviewModeChange("text")}
              aria-label="Select text display mode"
            >
              <span
                className="text-lg font-bold bg-clip-text text-transparent pointer-events-none"
                style={{
                  backgroundImage: displayGradient,
                  ...getAnimationStyle(selectedAnimation),
                }}
              >
                Text
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullscreenPreview("text");
                }}
                className="absolute top-1.5 right-1.5 p-1 rounded opacity-0 group-hover/preview:opacity-100 hover:bg-white/10 transition-all"
                aria-label="View text in fullscreen"
              >
                <Maximize2 className="w-3 h-3 text-neutral-400" />
              </button>
            </button>
          </div>

          {/* Colors Section */}
          <div className="space-y-3">
            <span className="text-sm text-neutral-400 font-medium">
              {spelling.Colors}
            </span>

            {/* Gradient Colors - quick copy chips */}
            <div className="flex gap-1.5 flex-wrap">
              {colors.map((color, i) => {
                const formattedColor = convertColor(color, colorFormat);
                return (
                  <button
                    key={i}
                    onClick={() => handleCopy(formattedColor, `color-${i}`)}
                    className="flex items-center gap-1.5 px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded hover:border-neutral-500 transition-colors"
                  >
                    <div
                      className="w-4 h-4 rounded"
                      style={{ background: color }}
                    />
                    <span className="text-xs font-mono text-neutral-300">
                      {formattedColor}
                    </span>
                    {copiedId === `color-${i}` && (
                      <Check className="w-3 h-3 text-green-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Text Colors & Accessibility */}
            <TooltipProvider>
              <div className="p-3 bg-neutral-800/60 rounded-lg border border-neutral-700">
                <span className="text-xs text-neutral-400 mb-2 block">
                  Text colors & accessibility:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    // Build consolidated list: up to 3 passing colors + always black & white
                    const passingColors = bestTextColors
                      .filter((tc) => tc.meetsAA)
                      .slice(0, 3);

                    // Create black & white info if not already in passing colors
                    const blackInfo: ContrastInfo = {
                      color: "#000000",
                      name: "Black",
                      ratio: getContrastRatio(avgColor, "#000000"),
                      meetsAA: meetsWCAG(
                        getContrastRatio(avgColor, "#000000"),
                        "AA",
                      ),
                      meetsAAA: meetsWCAG(
                        getContrastRatio(avgColor, "#000000"),
                        "AAA",
                      ),
                      meetsAALarge: meetsWCAG(
                        getContrastRatio(avgColor, "#000000"),
                        "AA",
                        true,
                      ),
                    };
                    const whiteInfo: ContrastInfo = {
                      color: "#ffffff",
                      name: "White",
                      ratio: getContrastRatio(avgColor, "#ffffff"),
                      meetsAA: meetsWCAG(
                        getContrastRatio(avgColor, "#ffffff"),
                        "AA",
                      ),
                      meetsAAA: meetsWCAG(
                        getContrastRatio(avgColor, "#ffffff"),
                        "AAA",
                      ),
                      meetsAALarge: meetsWCAG(
                        getContrastRatio(avgColor, "#ffffff"),
                        "AA",
                        true,
                      ),
                    };

                    // Combine: passing colors first, then ensure black & white are included
                    const allColors = [...passingColors];
                    if (!allColors.some((c) => c.color === "#000000")) {
                      allColors.push(blackInfo);
                    }
                    if (!allColors.some((c) => c.color === "#ffffff")) {
                      allColors.push(whiteInfo);
                    }

                    return allColors.map((tc, i) => (
                      <button
                        key={tc.color}
                        onClick={() => handleCopy(tc.color, `text-${i}`)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all",
                          "bg-neutral-900 border border-neutral-600 hover:border-neutral-400",
                        )}
                        title={`${tc.name}: ${formatContrastRatio(tc.ratio)} contrast`}
                      >
                        <div
                          className="w-5 h-5 rounded-md border border-white/20 flex items-center justify-center"
                          style={{ background: tc.color }}
                        >
                          <span
                            className="text-[9px] font-bold"
                            style={{
                              color: tc.color === "#ffffff" ? "#000" : "#fff",
                            }}
                          >
                            Aa
                          </span>
                        </div>
                        <span className="text-sm font-mono font-medium text-neutral-200">
                          {tc.color}
                        </span>
                        {tc.meetsAAA && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0 bg-green-900/50 text-green-400 border-green-700 cursor-help"
                              >
                                AAA
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-[200px]">
                                Excellent contrast (7:1+). Meets WCAG AAA for
                                all text sizes.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {!tc.meetsAAA && tc.meetsAA && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0 bg-yellow-900/50 text-yellow-400 border-yellow-700 cursor-help"
                              >
                                AA
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-[200px]">
                                Good contrast (4.5:1+). Meets WCAG AA for normal
                                text.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {!tc.meetsAA && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0 bg-red-900/50 text-red-400 border-red-700 cursor-help"
                              >
                                Fail
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-[200px]">
                                Low contrast (&lt;4.5:1). May be hard to read
                                for some users.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {copiedId === `text-${i}` && (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        )}
                      </button>
                    ));
                  })()}
                </div>
              </div>
            </TooltipProvider>
          </div>

          {/* Collapsible: Gradient Settings */}
          <div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex-1 flex items-center gap-2 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 ease-out",
                    !showSettings && "-rotate-90",
                  )}
                />
                <span>Gradient Settings</span>
              </button>
              {showSettings && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-neutral-500 hover:text-white h-7"
                  onClick={() => {
                    handleTypeChange("linear");
                    handleAngleChange(135);
                  }}
                >
                  Reset
                </Button>
              )}
            </div>
            <div
              className={cn(
                "grid transition-all duration-200 ease-out",
                showSettings
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-3 pb-2">
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    <Button
                      variant={
                        gradientDef.type === "linear" ? "default" : "outline"
                      }
                      onClick={() => handleTypeChange("linear")}
                      size="sm"
                    >
                      <Layers className="w-3 h-3 mr-1" /> Linear
                    </Button>
                    <Button
                      variant={
                        gradientDef.type === "radial" ? "default" : "outline"
                      }
                      onClick={() => handleTypeChange("radial")}
                      size="sm"
                    >
                      <Circle className="w-3 h-3 mr-1" /> Radial
                    </Button>
                    <Button
                      variant={
                        gradientDef.type === "conic" ? "default" : "outline"
                      }
                      onClick={() => handleTypeChange("conic")}
                      size="sm"
                    >
                      <RotateCw className="w-3 h-3 mr-1" /> Conic
                    </Button>
                  </div>
                  {(gradientDef.type === "linear" ||
                    gradientDef.type === "conic") && (
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-white w-10">
                        {gradientDef.angle}°
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={gradientDef.angle}
                        onChange={(e) =>
                          handleAngleChange(Number(e.target.value))
                        }
                        aria-label="Gradient angle"
                        className="flex-1 h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible: Animation */}
          <div>
            <button
              onClick={() => setShowAnimation(!showAnimation)}
              className="w-full flex items-center gap-2 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200 ease-out",
                  !showAnimation && "-rotate-90",
                )}
              />
              <Zap
                className={cn(
                  "w-4 h-4",
                  selectedAnimation && "text-amber-400 animate-icon-pulse",
                )}
              />
              Animate
              {selectedAnimation && (
                <Badge variant="secondary" className="text-xs">
                  {selectedAnimation.name}
                </Badge>
              )}
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-out",
                showAnimation
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-3 pb-2">
                  {/* Animation options with B&W preview for clarity */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {animations.map((anim) => {
                      const isSelected =
                        anim.id === "none"
                          ? !selectedAnimationId
                          : selectedAnimationId === anim.id;

                      // B&W gradient for clear animation visibility
                      const previewGradient =
                        "linear-gradient(135deg, #000 0%, #fff 100%)";

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
                              if (!isAnimating) onToggleAnimating();
                            }
                          }}
                          className={cn(
                            "rounded-lg border overflow-hidden",
                            isSelected
                              ? "border-white ring-2 ring-white/20"
                              : "border-neutral-700 hover:border-neutral-500",
                          )}
                        >
                          <div
                            className="h-14"
                            style={{
                              background: previewGradient,
                              ...styleWithSpeed,
                            }}
                          />
                          <div className="p-1.5 bg-neutral-900">
                            <p className="text-[11px] text-white font-medium truncate">
                              {anim.name}
                            </p>
                            <p className="text-[9px] text-neutral-500 truncate">
                              {anim.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Speed slider - only show when animation is selected */}
                  {selectedAnimationId && (
                    <AnimationSpeedSlider
                      speed={animationSpeed}
                      onChange={onAnimationSpeedChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Code Export */}
          <div className="border-t border-neutral-800 pt-3">
            {/* Tab Buttons + Copy + Color Format */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <div className="flex gap-1 overflow-x-auto pb-1 -mb-1">
                {(["css", "tailwind", "swift", "kotlin", "ai"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setCodeTab(tab)}
                      className={cn(
                        "px-2.5 sm:px-3 py-1.5 text-xs rounded transition-colors whitespace-nowrap flex-shrink-0",
                        codeTab === tab
                          ? "bg-neutral-700 text-white"
                          : "bg-neutral-800/50 text-neutral-400 hover:text-white hover:bg-neutral-800",
                      )}
                    >
                      {tab === "css"
                        ? "CSS"
                        : tab === "tailwind"
                          ? "Tailwind"
                          : tab === "swift"
                            ? "SwiftUI"
                            : tab === "kotlin"
                              ? "Kotlin"
                              : "AI Agent"}
                    </button>
                  ),
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Copy Code Button */}
                <button
                  onClick={() =>
                    handleCopy(
                      codeTab === "css"
                        ? selectedAnimation
                          ? fullCSSCode
                          : cssCode
                        : codeTab === "tailwind"
                          ? tailwindCode
                          : codeTab === "swift"
                            ? swiftUICode
                            : codeTab === "kotlin"
                              ? kotlinCode
                              : aiAgentCode,
                      codeTab,
                    )
                  }
                  className="flex h-7 items-center gap-1.5 rounded border border-neutral-700 bg-neutral-900 px-2 text-xs text-white hover:bg-neutral-800 transition-colors"
                  aria-label="Copy code"
                >
                  <span>Copy Code</span>
                  {copiedId === codeTab ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3 text-neutral-500" />
                  )}
                </button>
                {/* Color Format Dropdown */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="flex h-7 items-center gap-1.5 rounded border border-neutral-700 bg-neutral-900 px-2 text-xs text-white hover:bg-neutral-800 flex-shrink-0"
                      aria-label={`${spelling.Color} format`}
                    >
                      <Palette className="h-3 w-3 text-neutral-500" />
                      <span>
                        {COLOR_FORMAT_OPTIONS.find(
                          (f) => f.value === colorFormat,
                        )?.label ?? "HEX"}
                      </span>
                      <ChevronDown className="h-3 w-3 text-neutral-500" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-28 p-1" align="end">
                    {COLOR_FORMAT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => onColorFormatChange(opt.value)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded px-2 py-1 text-xs",
                          "hover:bg-neutral-800 transition-colors",
                          colorFormat === opt.value && "bg-neutral-800",
                        )}
                      >
                        <span className="flex-1 text-left">{opt.label}</span>
                        {colorFormat === opt.value && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {/* Tab Content */}
            <div className="bg-black rounded-lg overflow-hidden">
              <pre className="p-3 text-xs font-mono text-neutral-300 h-24 overflow-auto whitespace-pre-wrap break-words">
                {codeTab === "css" &&
                  (selectedAnimation ? fullCSSCode : cssCode)}
                {codeTab === "tailwind" && tailwindCode}
                {codeTab === "swift" && swiftUICode}
                {codeTab === "kotlin" && kotlinCode}
                {codeTab === "ai" && aiAgentCode}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
