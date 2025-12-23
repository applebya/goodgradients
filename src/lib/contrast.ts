/**
 * WCAG contrast utilities for accessible color selection
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1] ?? '0', 16),
        g: parseInt(result[2] ?? '0', 16),
        b: parseInt(result[3] ?? '0', 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 */
export function meetsWCAG(
  ratio: number,
  level: 'AA' | 'AAA',
  isLargeText = false
): boolean {
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Get the best text color (white or black) for a given background
 */
export function getBestTextColor(backgroundColor: string): '#ffffff' | '#000000' {
  const whiteContrast = getContrastRatio(backgroundColor, '#ffffff');
  const blackContrast = getContrastRatio(backgroundColor, '#000000');
  return whiteContrast > blackContrast ? '#ffffff' : '#000000';
}

/**
 * Get average color from gradient colors
 */
export function getGradientAverageColor(colors: string[]): string {
  if (colors.length === 0) return '#000000';
  if (colors.length === 1) return colors[0] ?? '#000000';

  const rgbs = colors.map(hexToRgb).filter((rgb): rgb is RGB => rgb !== null);
  if (rgbs.length === 0) return '#000000';

  const avg = rgbs.reduce(
    (acc, rgb) => ({
      r: acc.r + rgb.r / rgbs.length,
      g: acc.g + rgb.g / rgbs.length,
      b: acc.b + rgb.b / rgbs.length,
    }),
    { r: 0, g: 0, b: 0 }
  );

  const toHex = (n: number) =>
    Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(avg.r)}${toHex(avg.g)}${toHex(avg.b)}`;
}

/**
 * Format contrast ratio for display
 */
export function formatContrastRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

export interface ContrastInfo {
  color: string;
  name: string;
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  meetsAALarge: boolean;
}

/**
 * Get contrast info for common text colors against a background
 */
export function getContrastInfoForBackground(backgroundColor: string): ContrastInfo[] {
  const testColors = [
    { color: '#ffffff', name: 'White' },
    { color: '#000000', name: 'Black' },
    { color: '#f5f5f5', name: 'Off-White' },
    { color: '#171717', name: 'Near Black' },
    { color: '#737373', name: 'Gray' },
  ];

  return testColors.map(({ color, name }) => {
    const ratio = getContrastRatio(backgroundColor, color);
    return {
      color,
      name,
      ratio,
      meetsAA: meetsWCAG(ratio, 'AA'),
      meetsAAA: meetsWCAG(ratio, 'AAA'),
      meetsAALarge: meetsWCAG(ratio, 'AA', true),
    };
  });
}
