import type { GradientType } from '../components/gradient-controls';

/**
 * Convert a linear gradient to different types and angles
 */
export function transformGradient(
  originalGradient: string,
  type: GradientType,
  angle: number
): string {
  // Extract colors from the original gradient
  const colors = extractColorsFromGradient(originalGradient);
  
  if (!colors.length) return originalGradient;
  
  // Build new gradient based on type
  switch (type) {
    case 'linear':
      return buildLinearGradient(colors, angle);
    case 'radial':
      return buildRadialGradient(colors);
    case 'conic':
      return buildConicGradient(colors, angle);
    default:
      return originalGradient;
  }
}

/**
 * Extract color stops from a gradient string
 */
function extractColorsFromGradient(gradient: string): Array<{ color: string; position?: string }> {
  const colors: Array<{ color: string; position?: string }> = [];
  
  // Match hex colors with optional percentages
  const hexPattern = /(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3})(\s+\d+%)?/g;
  let match;
  
  while ((match = hexPattern.exec(gradient)) !== null) {
    colors.push({
      color: match[1],
      position: match[2]?.trim(),
    });
  }
  
  return colors;
}

/**
 * Build a linear gradient with specified angle
 */
function buildLinearGradient(
  colors: Array<{ color: string; position?: string }>,
  angle: number
): string {
  const colorStops = colors
    .map((c) => `${c.color}${c.position ? ' ' + c.position : ''}`)
    .join(', ');
  
  return `linear-gradient(${angle}deg, ${colorStops})`;
}

/**
 * Build a radial gradient
 */
function buildRadialGradient(
  colors: Array<{ color: string; position?: string }>
): string {
  const colorStops = colors
    .map((c) => `${c.color}${c.position ? ' ' + c.position : ''}`)
    .join(', ');
  
  return `radial-gradient(circle at center, ${colorStops})`;
}

/**
 * Build a conic gradient with specified angle
 */
function buildConicGradient(
  colors: Array<{ color: string; position?: string }>,
  angle: number
): string {
  const colorStops = colors
    .map((c) => `${c.color}${c.position ? ' ' + c.position : ''}`)
    .join(', ');
  
  return `conic-gradient(from ${angle}deg at center, ${colorStops})`;
}

/**
 * Get the appropriate gradient CSS for display
 */
export function getGradientCSS(
  originalGradient: string,
  type: GradientType = 'linear',
  angle: number = 135
): string {
  return transformGradient(originalGradient, type, angle);
}
