import type { GradientType } from '@/types';

interface ColorStop {
  color: string;
  position?: string;
}

/**
 * Extract color stops from a gradient string
 */
export function extractColorsFromGradient(gradient: string): ColorStop[] {
  const colors: ColorStop[] = [];
  const hexPattern = /(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3})(\s+\d+%)?/g;
  let match;

  while ((match = hexPattern.exec(gradient)) !== null) {
    colors.push({
      color: match[1] ?? '',
      position: match[2]?.trim(),
    });
  }

  return colors;
}

/**
 * Build a linear gradient with specified angle
 */
function buildLinearGradient(colors: ColorStop[], angle: number): string {
  const colorStops = colors
    .map((c) => `${c.color}${c.position ? ' ' + c.position : ''}`)
    .join(', ');
  return `linear-gradient(${angle}deg, ${colorStops})`;
}

/**
 * Build a radial gradient
 */
function buildRadialGradient(colors: ColorStop[]): string {
  const colorStops = colors
    .map((c) => `${c.color}${c.position ? ' ' + c.position : ''}`)
    .join(', ');
  return `radial-gradient(circle at center, ${colorStops})`;
}

/**
 * Build a conic gradient with specified angle
 */
function buildConicGradient(colors: ColorStop[], angle: number): string {
  const colorStops = colors
    .map((c) => `${c.color}${c.position ? ' ' + c.position : ''}`)
    .join(', ');
  return `conic-gradient(from ${angle}deg at center, ${colorStops})`;
}

/**
 * Transform a gradient to different types and angles
 */
export function transformGradient(
  originalGradient: string,
  type: GradientType,
  angle: number
): string {
  const colors = extractColorsFromGradient(originalGradient);
  if (colors.length === 0) return originalGradient;

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
 * Parse a gradient string to extract its type and angle
 */
export function parseGradient(gradient: string): {
  type: GradientType;
  angle: number;
  colors: string[];
} {
  const colors = extractColorsFromGradient(gradient).map((c) => c.color);

  if (gradient.startsWith('radial-gradient')) {
    return { type: 'radial', angle: 0, colors };
  }

  if (gradient.startsWith('conic-gradient')) {
    const angleMatch = /from\s+(\d+)deg/i.exec(gradient);
    const angle = angleMatch ? parseInt(angleMatch[1] ?? '0', 10) : 0;
    return { type: 'conic', angle, colors };
  }

  // Default to linear
  const angleMatch = /(\d+)deg/i.exec(gradient);
  const angle = angleMatch ? parseInt(angleMatch[1] ?? '135', 10) : 135;
  return { type: 'linear', angle, colors };
}

/**
 * Generate CSS for a gradient with animation
 */
export function generateAnimatedGradientCSS(
  gradient: string,
  animationKeyframes: string,
  animationProperty: string
): string {
  return `${animationKeyframes}

.animated-gradient {
  background: ${gradient};
  ${animationProperty}
}`;
}
