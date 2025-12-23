/**
 * Utilities for calculating color contrast ratios and WCAG compliance
 */

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
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
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
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
export function meetsWCAG(ratio: number, level: 'AA' | 'AAA', isLargeText: boolean = false): boolean {
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
  // AA
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
 * Get average color from gradient (approximation using first color)
 * For more accurate results, we'd need to sample multiple points
 */
export function getGradientMainColor(gradient: string): string {
  // Extract all hex colors from gradient string
  const hexMatches = gradient.match(/#[a-fA-F0-9]{6}/g);
  if (!hexMatches || hexMatches.length === 0) return '#000000';
  
  // For better accuracy, blend the first two colors if available
  // This gives us a better representation of the gradient's overall tone
  if (hexMatches.length === 1) {
    return hexMatches[0];
  }
  
  // Calculate average of first two colors for better representation
  const color1 = hexToRgb(hexMatches[0]);
  const color2 = hexToRgb(hexMatches[1]);
  
  if (!color1 || !color2) return hexMatches[0];
  
  const avgR = Math.round((color1.r + color2.r) / 2);
  const avgG = Math.round((color1.g + color2.g) / 2);
  const avgB = Math.round((color1.b + color2.b) / 2);
  
  return `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
}

/**
 * Get contrast info for common text colors against a background
 */
export interface ContrastInfo {
  color: string;
  name: string;
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  meetsAALarge: boolean;
  meetsAAALarge: boolean;
}

export function getContrastInfoForBackground(backgroundColor: string): ContrastInfo[] {
  const testColors = [
    { color: '#ffffff', name: 'White' },
    { color: '#000000', name: 'Black' },
    { color: '#f5f5f5', name: 'Off-White' },
    { color: '#171717', name: 'Near Black' },
    { color: '#737373', name: 'Gray' },
    { color: '#a3a3a3', name: 'Light Gray' },
    { color: '#404040', name: 'Dark Gray' },
  ];
  
  return testColors.map(({ color, name }) => {
    const ratio = getContrastRatio(backgroundColor, color);
    return {
      color,
      name,
      ratio,
      meetsAA: meetsWCAG(ratio, 'AA', false),
      meetsAAA: meetsWCAG(ratio, 'AAA', false),
      meetsAALarge: meetsWCAG(ratio, 'AA', true),
      meetsAAALarge: meetsWCAG(ratio, 'AAA', true),
    };
  });
}

/**
 * Format contrast ratio for display
 */
export function formatContrastRatio(ratio: number): string {
  return ratio.toFixed(2) + ':1';
}