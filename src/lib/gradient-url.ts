/**
 * Gradient URL Encoding/Decoding Utilities
 *
 * NEW URL format (clean, readable):
 *   g = colors separated by dashes: 667eea-764ba2
 *   type = linear | radial | conic (omit if linear)
 *   angle = 0-360 (omit if default: 135 for linear, 0 for radial/conic)
 *   stops = positions separated by dashes (omit if evenly distributed)
 *
 * Examples:
 *   ?g=667eea-764ba2                     (linear, 135deg, 0%-100%)
 *   ?g=667eea-764ba2&angle=90            (linear, 90deg)
 *   ?g=667eea-764ba2&type=radial         (radial gradient)
 *   ?g=667eea-764ba2-ffffff&stops=0-30-100  (custom stop positions)
 *
 * LEGACY format (still supported for backwards compatibility):
 *   type,angle,color1:stop1,color2:stop2,...
 *   Example: linear,135,667eea:0,764ba2:100
 */

export type GradientType = "linear" | "radial" | "conic";

export interface ColorStop {
  color: string; // Hex color without # (e.g., "667eea")
  position: number; // 0-100
}

export interface GradientDefinition {
  type: GradientType;
  angle: number; // 0-360 for linear/conic, ignored for radial
  stops: ColorStop[];
}

// Default angles for each gradient type
const DEFAULT_ANGLES: Record<GradientType, number> = {
  linear: 135,
  radial: 0,
  conic: 0,
};

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
  if (!["linear", "radial", "conic"].includes(def.type)) {
    return false;
  }

  if (typeof def.angle !== "number" || def.angle < 0 || def.angle > 360) {
    return false;
  }

  if (!Array.isArray(def.stops) || def.stops.length < 2) {
    return false;
  }

  for (const stop of def.stops) {
    if (!isValidHexColor(stop.color)) {
      return false;
    }
    if (
      typeof stop.position !== "number" ||
      stop.position < 0 ||
      stop.position > 100
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Check if stop positions are evenly distributed
 */
function areStopsEvenlyDistributed(stops: ColorStop[]): boolean {
  if (stops.length < 2) return false;

  for (let i = 0; i < stops.length; i++) {
    const expectedPosition = Math.round((i / (stops.length - 1)) * 100);
    if (stops[i]!.position !== expectedPosition) {
      return false;
    }
  }
  return true;
}

/**
 * Generate evenly distributed stop positions for N colors
 */
function generateEvenStops(count: number): number[] {
  return Array.from({ length: count }, (_, i) =>
    Math.round((i / (count - 1)) * 100),
  );
}

/**
 * Encodes a gradient definition to URL params object
 * Returns an object with g, type (optional), angle (optional), stops (optional)
 */
export function encodeGradientToParams(
  def: GradientDefinition,
): Record<string, string> {
  const params: Record<string, string> = {};

  // Colors (always required) - dash-separated hex colors
  const colors = def.stops.map((s) => s.color.toLowerCase()).join("-");
  params.g = colors;

  // Type (only if not linear)
  if (def.type !== "linear") {
    params.type = def.type;
  }

  // Angle (only if not default for the type)
  const defaultAngle = DEFAULT_ANGLES[def.type];
  if (def.angle !== defaultAngle) {
    params.angle = String(def.angle);
  }

  // Stops (only if not evenly distributed)
  if (!areStopsEvenlyDistributed(def.stops)) {
    params.stops = def.stops.map((s) => String(s.position)).join("-");
  }

  return params;
}

/**
 * Encodes a gradient definition to a simple string format for internal use
 * (Used for favorites storage, etc.)
 * Format: colors-joined|type|angle|stops-joined
 */
export function encodeGradient(def: GradientDefinition): string {
  const colors = def.stops.map((s) => s.color.toLowerCase()).join("-");
  const type = def.type;
  const angle = def.angle;

  // Only include stops if not evenly distributed
  if (areStopsEvenlyDistributed(def.stops)) {
    return `${colors}|${type}|${angle}`;
  }

  const stops = def.stops.map((s) => s.position).join("-");
  return `${colors}|${type}|${angle}|${stops}`;
}

/**
 * Decodes URL params to a gradient definition
 */
export function decodeGradientFromParams(
  params: URLSearchParams,
): GradientDefinition | null {
  const g = params.get("g");
  if (!g) return null;

  // Check if it's legacy format (contains comma - old format: type,angle,color:pos,...)
  if (g.includes(",")) {
    return decodeLegacyGradient(g);
  }

  // New format: g=color1-color2-color3
  const colorStrings = g.split("-");
  if (colorStrings.length < 2) return null;

  // Validate all colors
  for (const c of colorStrings) {
    if (!c || !isValidHexColor(c)) return null;
  }

  // Get type (default: linear)
  const typeParam = params.get("type");
  let type: GradientType = "linear";
  if (typeParam && ["linear", "radial", "conic"].includes(typeParam)) {
    type = typeParam as GradientType;
  }

  // Get angle (default based on type)
  const angleParam = params.get("angle");
  let angle = DEFAULT_ANGLES[type];
  if (angleParam) {
    const parsed = parseInt(angleParam, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 360) {
      angle = parsed;
    }
  }

  // Get stops (default: evenly distributed)
  const stopsParam = params.get("stops");
  let positions: number[];

  if (stopsParam) {
    const posStrings = stopsParam.split("-");
    if (posStrings.length !== colorStrings.length) {
      // Mismatch - use even distribution
      positions = generateEvenStops(colorStrings.length);
    } else {
      positions = [];
      for (const p of posStrings) {
        const parsed = parseInt(p, 10);
        if (isNaN(parsed) || parsed < 0 || parsed > 100) {
          // Invalid - use even distribution
          positions = generateEvenStops(colorStrings.length);
          break;
        }
        positions.push(parsed);
      }
    }
  } else {
    positions = generateEvenStops(colorStrings.length);
  }

  const stops: ColorStop[] = colorStrings.map((color, i) => ({
    color: color.toLowerCase(),
    position: positions[i]!,
  }));

  return { type, angle, stops };
}

/**
 * Decodes a simple string format back to gradient definition
 * Format: colors-joined|type|angle|stops-joined (optional)
 */
export function decodeGradient(encoded: string): GradientDefinition | null {
  if (!encoded || typeof encoded !== "string") {
    return null;
  }

  // Check for legacy format (comma-separated)
  if (encoded.includes(",") && !encoded.includes("|")) {
    return decodeLegacyGradient(encoded);
  }

  // New format: colors|type|angle|stops(optional)
  const parts = encoded.split("|");
  if (parts.length < 3) return null;

  const [colorsPart, typePart, anglePart, stopsPart] = parts;
  if (!colorsPart || !typePart || !anglePart) return null;

  // Parse colors
  const colorStrings = colorsPart.split("-");
  if (colorStrings.length < 2) return null;

  for (const c of colorStrings) {
    if (!c || !isValidHexColor(c)) return null;
  }

  // Parse type
  if (!["linear", "radial", "conic"].includes(typePart)) return null;
  const type = typePart as GradientType;

  // Parse angle
  const angle = parseInt(anglePart, 10);
  if (isNaN(angle) || angle < 0 || angle > 360) return null;

  // Parse stops (or generate even distribution)
  let positions: number[];
  if (stopsPart) {
    const posStrings = stopsPart.split("-");
    if (posStrings.length !== colorStrings.length) {
      positions = generateEvenStops(colorStrings.length);
    } else {
      positions = [];
      for (const p of posStrings) {
        const parsed = parseInt(p, 10);
        if (isNaN(parsed) || parsed < 0 || parsed > 100) {
          positions = generateEvenStops(colorStrings.length);
          break;
        }
        positions.push(parsed);
      }
    }
  } else {
    positions = generateEvenStops(colorStrings.length);
  }

  const stops: ColorStop[] = colorStrings.map((color, i) => ({
    color: color.toLowerCase(),
    position: positions[i]!,
  }));

  return { type, angle, stops };
}

/**
 * Decode legacy format: type,angle,color1:stop1,color2:stop2,...
 */
function decodeLegacyGradient(encoded: string): GradientDefinition | null {
  const parts = encoded.split(",");

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
  if (!["linear", "radial", "conic"].includes(type)) {
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

    const stopParts = part.split(":");
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
    .map((s) => `#${s.color.toUpperCase()} ${s.position}%`)
    .join(", ");

  switch (def.type) {
    case "linear":
      return `linear-gradient(${def.angle}deg, ${stops})`;
    case "radial":
      return `radial-gradient(circle, ${stops})`;
    case "conic":
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
  if (!css || typeof css !== "string") {
    return null;
  }

  const trimmed = css.trim();

  // Determine gradient type
  let type: GradientType;
  let innerContent: string;

  if (trimmed.startsWith("linear-gradient(")) {
    type = "linear";
    innerContent = trimmed.slice(16, -1); // Remove "linear-gradient(" and ")"
  } else if (trimmed.startsWith("radial-gradient(")) {
    type = "radial";
    innerContent = trimmed.slice(16, -1);
  } else if (trimmed.startsWith("conic-gradient(")) {
    type = "conic";
    innerContent = trimmed.slice(15, -1);
  } else {
    return null;
  }

  // Parse angle and color stops
  let angle = DEFAULT_ANGLES[type];
  const stops: ColorStop[] = [];

  // Split by comma, but handle nested functions
  const parts = splitGradientParts(innerContent);

  for (const part of parts) {
    const trimmedPart = part.trim();

    // Check if this is an angle (e.g., "135deg" or "to right")
    if (trimmedPart.endsWith("deg")) {
      const angleMatch = trimmedPart.match(/^(\d+)deg$/);
      if (angleMatch && angleMatch[1]) {
        angle = parseInt(angleMatch[1], 10);
      }
      continue;
    }

    // Check for "from Xdeg" (conic gradient)
    if (trimmedPart.startsWith("from ")) {
      const fromMatch = trimmedPart.match(/^from (\d+)deg$/);
      if (fromMatch && fromMatch[1]) {
        angle = parseInt(fromMatch[1], 10);
      }
      continue;
    }

    // Skip "circle" for radial gradients
    if (trimmedPart === "circle" || trimmedPart.startsWith("circle ")) {
      continue;
    }

    // Skip directional keywords
    if (trimmedPart.startsWith("to ")) {
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
  let current = "";
  let depth = 0;

  for (const char of content) {
    if (char === "(") {
      depth++;
      current += char;
    } else if (char === ")") {
      depth--;
      current += char;
    } else if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
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
  type: GradientType = "linear",
  angle: number = 135,
): GradientDefinition {
  if (colors.length < 2) {
    throw new Error("At least 2 colors are required");
  }

  const stops: ColorStop[] = colors.map((color, index) => ({
    color: color.replace("#", "").toLowerCase(),
    position: Math.round((index / (colors.length - 1)) * 100),
  }));

  return { type, angle, stops };
}

/**
 * Extracts hex colors from a gradient definition
 */
export function getGradientColors(def: GradientDefinition): string[] {
  return def.stops.map((s) => `#${s.color.toUpperCase()}`);
}
