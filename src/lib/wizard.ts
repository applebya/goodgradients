import type { GradientPreset, WizardColor } from "@/types";

// Color options with display info
export interface ColorOption {
  value: WizardColor;
  label: string;
  previewGradient: string;
}

export const COLOR_OPTIONS: ColorOption[] = [
  {
    value: "Purple",
    label: "Purple",
    previewGradient: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
  },
  {
    value: "Blue",
    label: "Blue",
    previewGradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
  },
  {
    value: "Green",
    label: "Green",
    previewGradient: "linear-gradient(135deg, #22C55E 0%, #10B981 100%)",
  },
  {
    value: "Pink",
    label: "Pink",
    previewGradient: "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
  },
  {
    value: "Orange",
    label: "Orange",
    previewGradient: "linear-gradient(135deg, #F97316 0%, #FBBF24 100%)",
  },
  {
    value: "Teal",
    label: "Teal",
    previewGradient: "linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)",
  },
  {
    value: "Neutral",
    label: "Neutral",
    previewGradient: "linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)",
  },
  {
    value: "Multi",
    label: "Colorful",
    previewGradient:
      "linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #06B6D4 100%)",
  },
];

// Parse hex color to HSL for better color family detection
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  return { h: h * 360, s, l };
}

// Determine which color family a hex color belongs to
function getColorFamily(hex: string): WizardColor | null {
  const { h, s, l } = hexToHSL(hex);

  // Neutral colors (low saturation or very dark/light)
  if (s < 0.15 || l < 0.1 || l > 0.95) {
    return "Neutral";
  }

  // Map hue to color families (hue is 0-360)
  if (h >= 330 || h < 15) return "Pink"; // Red-pink range
  if (h >= 15 && h < 45) return "Orange";
  if (h >= 45 && h < 75) return "Orange"; // Yellow-orange
  if (h >= 75 && h < 165) return "Green";
  if (h >= 165 && h < 195) return "Teal";
  if (h >= 195 && h < 255) return "Blue";
  if (h >= 255 && h < 330) return "Purple"; // Purple-pink

  return null;
}

// Check if a gradient contains colors from a specific family
function gradientHasColorFamily(
  gradient: GradientPreset,
  family: WizardColor,
): boolean {
  // Multi matches gradients with 3+ colors or the Multi category
  if (family === "Multi") {
    return gradient.category === "Multi" || gradient.colors.length >= 3;
  }

  // Check actual colors in the gradient
  return gradient.colors.some((hex) => {
    const colorFamily = getColorFamily(hex);
    return colorFamily === family;
  });
}

// Filter gradients by selected colors (AND logic - must match ALL selected colors)
export function filterGradientsByColors(
  gradients: GradientPreset[],
  colors: WizardColor[],
): GradientPreset[] {
  if (colors.length === 0) {
    return gradients;
  }

  // AND logic: gradient must contain colors from ALL selected families
  return gradients.filter((g) =>
    colors.every((color) => gradientHasColorFamily(g, color)),
  );
}
