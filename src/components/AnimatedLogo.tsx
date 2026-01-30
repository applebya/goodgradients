import { useMemo } from "react";

interface AnimatedLogoProps {
  selectedAnimationId: string | null;
}

// Hand-picked vibrant colors for the logo gradient
const logoColors = [
  "#ec4899", // pink
  "#8b5cf6", // purple
  "#3b82f6", // blue
  "#06b6d4", // cyan
  "#22c55e", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#ec4899", // pink (repeat for seamless loop)
];

export function AnimatedLogo({ selectedAnimationId }: AnimatedLogoProps) {
  // Build a long gradient with all colors for smooth scrolling
  const gradientString = useMemo(() => {
    const stops = logoColors
      .map((color, i) => `${color} ${(i / (logoColors.length - 1)) * 100}%`)
      .join(", ");
    return `linear-gradient(90deg, ${stops})`;
  }, []);

  // Determine animation speed based on selected animation
  const animationDuration = useMemo(() => {
    if (!selectedAnimationId || selectedAnimationId === "none") return "8s";
    // Match the feel of the selected animation
    switch (selectedAnimationId) {
      case "shimmer":
        return "3s";
      case "breathe-move":
        return "12s";
      case "pulse-move":
        return "4s";
      default:
        return "6s";
    }
  }, [selectedAnimationId]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes logo-gradient-shift {
              0% { background-position: 0% 50%; }
              100% { background-position: 200% 50%; }
            }
          `,
        }}
      />
      <span
        className="text-xl sm:text-2xl select-none"
        style={{
          fontFamily: '"Molle", cursive',
          fontStyle: "italic",
          background: gradientString,
          backgroundSize: "200% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          animation: `logo-gradient-shift ${animationDuration} linear infinite`,
        }}
      >
        GoodGradients
      </span>
    </>
  );
}
