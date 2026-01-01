/**
 * Gradient URL Encoding/Decoding Utilities
 *
 * URL format: type,angle,color1:stop1,color2:stop2,...
 * Example: linear,135,667eea:0,764ba2:100
 *
 * This enables:
 * - Sharing any gradient via URL (not just presets)
 * - Future-proof: no dependency on preset IDs
 * - Full gradient definition in a compact format
 */

export type GradientType = 'linear' | 'radial' | 'conic';

export interface ColorStop {
  color: string; // Hex color without # (e.g., "667eea")
  position: number; // 0-100
}

export interface GradientDefinition {
  type: GradientType;
  angle: number; // 0-360 for linear/conic, ignored for radial
  stops: ColorStop[];
}

/**
 * Validates a hex color string (without #)
 */
export function isValidHexColor(color: string): boolean {
  return /^[0-9a-fA-F]{6}$/.test(color);
}

/**
 * Validates a gradient definition
 */
export function isValidGradientDefinition(def: GradientDefinition): boolean {
  if (!['linear', 'radial', 'conic'].includes(def.type)) {
    return false;
  }

  if (typeof def.angle !== 'number' || def.angle < 0 || def.angle > 360) {
    return false;
  }

  if (!Array.isArray(def.stops) || def.stops.length < 2) {
    return false;
  }

  for (const stop of def.stops) {
    if (!isValidHexColor(stop.color)) {
      return false;
    }
    if (typeof stop.position !== 'number' || stop.position < 0 || stop.position > 100) {
      return false;
    }
  }

  return true;
}

/**
 * Encodes a gradient definition to a URL-safe string
 * Format: type,angle,color1:stop1,color2:stop2,...
 */
export function encodeGradient(def: GradientDefinition): string {
  const stops = def.stops
    .map(s => `${s.color.toLowerCase()}:${s.position}`)
    .join(',');

  return `${def.type},${def.angle},${stops}`;
}

/**
 * Decodes a URL string to a gradient definition
 * Returns null if the string is invalid
 */
export function decodeGradient(encoded: string): GradientDefinition | null {
  if (!encoded || typeof encoded !== 'string') {
    return null;
  }

  const parts = encoded.split(',');

  // Minimum: type, angle, color1:stop1, color2:stop2
  if (parts.length < 4) {
    return null;
  }

  const typePart = parts[0];
  const anglePart = parts[1];

  if (!typePart || !anglePart) {
    return null;
  }

  const type = typePart as GradientType;
  if (!['linear', 'radial', 'conic'].includes(type)) {
    return null;
  }

  const angle = parseInt(anglePart, 10);
  if (isNaN(angle) || angle < 0 || angle > 360) {
    return null;
  }

  const stops: ColorStop[] = [];
  for (let i = 2; i < parts.length; i++) {
    const part = parts[i];
    if (!part) {
      return null;
    }

    const stopParts = part.split(':');
    if (stopParts.length !== 2) {
      return null;
    }

    const colorPart = stopParts[0];
    const positionPart = stopParts[1];

    if (!colorPart || !positionPart) {
      return null;
    }

    const color = colorPart.toLowerCase();
    if (!isValidHexColor(color)) {
      return null;
    }

    const position = parseInt(positionPart, 10);
    if (isNaN(position) || position < 0 || position > 100) {
      return null;
    }

    stops.push({ color, position });
  }

  if (stops.length < 2) {
    return null;
  }

  return { type, angle, stops };
}

/**
 * Converts a gradient definition to a CSS gradient string
 */
export function gradientToCSS(def: GradientDefinition): string {
  const stops = def.stops
    .map(s => `#${s.color.toUpperCase()} ${s.position}%`)
    .join(', ');

  switch (def.type) {
    case 'linear':
      return `linear-gradient(${def.angle}deg, ${stops})`;
    case 'radial':
      return `radial-gradient(circle, ${stops})`;
    case 'conic':
      return `conic-gradient(from ${def.angle}deg, ${stops})`;
    default:
      return `linear-gradient(${def.angle}deg, ${stops})`;
  }
}

/**
 * Parses a CSS gradient string to a gradient definition
 * Supports: linear-gradient, radial-gradient, conic-gradient
 */
export function parseGradientCSS(css: string): GradientDefinition | null {
  if (!css || typeof css !== 'string') {
    return null;
  }

  const trimmed = css.trim();

  // Determine gradient type
  let type: GradientType;
  let innerContent: string;

  if (trimmed.startsWith('linear-gradient(')) {
    type = 'linear';
    innerContent = trimmed.slice(16, -1); // Remove "linear-gradient(" and ")"
  } else if (trimmed.startsWith('radial-gradient(')) {
    type = 'radial';
    innerContent = trimmed.slice(16, -1);
  } else if (trimmed.startsWith('conic-gradient(')) {
    type = 'conic';
    innerContent = trimmed.slice(15, -1);
  } else {
    return null;
  }

  // Parse angle and color stops
  let angle = 135; // Default angle
  const stops: ColorStop[] = [];

  // Split by comma, but handle nested functions
  const parts = splitGradientParts(innerContent);

  for (const part of parts) {
    const trimmedPart = part.trim();

    // Check if this is an angle (e.g., "135deg" or "to right")
    if (trimmedPart.endsWith('deg')) {
      const angleMatch = trimmedPart.match(/^(\d+)deg$/);
      if (angleMatch && angleMatch[1]) {
        angle = parseInt(angleMatch[1], 10);
      }
      continue;
    }

    // Check for "from Xdeg" (conic gradient)
    if (trimmedPart.startsWith('from ')) {
      const fromMatch = trimmedPart.match(/^from (\d+)deg$/);
      if (fromMatch && fromMatch[1]) {
        angle = parseInt(fromMatch[1], 10);
      }
      continue;
    }

    // Skip "circle" for radial gradients
    if (trimmedPart === 'circle' || trimmedPart.startsWith('circle ')) {
      continue;
    }

    // Skip directional keywords
    if (trimmedPart.startsWith('to ')) {
      continue;
    }

    // Parse color stop (e.g., "#667eea 0%" or "#764ba2 100%")
    const colorStopMatch = trimmedPart.match(/^#([0-9a-fA-F]{6})\s+(\d+)%$/);
    if (colorStopMatch && colorStopMatch[1] && colorStopMatch[2]) {
      stops.push({
        color: colorStopMatch[1].toLowerCase(),
        position: parseInt(colorStopMatch[2], 10),
      });
    }
  }

  if (stops.length < 2) {
    return null;
  }

  return { type, angle, stops };
}

/**
 * Helper to split gradient parts by comma, respecting nested parentheses
 */
function splitGradientParts(content: string): string[] {
  const parts: string[] = [];
  let current = '';
  let depth = 0;

  for (const char of content) {
    if (char === '(') {
      depth++;
      current += char;
    } else if (char === ')') {
      depth--;
      current += char;
    } else if (char === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  return parts;
}

/**
 * Creates a gradient definition from hex colors (convenience function)
 */
export function createGradient(
  colors: string[],
  type: GradientType = 'linear',
  angle: number = 135
): GradientDefinition {
  if (colors.length < 2) {
    throw new Error('At least 2 colors are required');
  }

  const stops: ColorStop[] = colors.map((color, index) => ({
    color: color.replace('#', '').toLowerCase(),
    position: Math.round((index / (colors.length - 1)) * 100),
  }));

  return { type, angle, stops };
}

/**
 * Extracts hex colors from a gradient definition
 */
export function getGradientColors(def: GradientDefinition): string[] {
  return def.stops.map(s => `#${s.color.toUpperCase()}`);
}
