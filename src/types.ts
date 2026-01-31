// Re-export gradient definition types from gradient-url
export type {
  GradientDefinition,
  ColorStop,
  GradientType,
} from "./lib/gradient-url";

// Core gradient preset type (for browsing presets)
export interface GradientPreset {
  id: string;
  name: string;
  description: string;
  category: GradientCategory;
  gradient: string; // CSS gradient value
  colors: string[]; // Hex colors
  tags: string[];
}

// Legacy alias for backwards compatibility
export type Gradient = GradientPreset;

// Consolidated categories - matches header UI
export type GradientCategory =
  | "Purple"
  | "Blue"
  | "Green"
  | "Pink"
  | "Orange"
  | "Teal"
  | "Warm"
  | "Cool"
  | "Neutral"
  | "Multi";

// Animation types
export interface Animation {
  id: string;
  name: string;
  description: string;
  category: AnimationCategory;
  keyframes: string; // CSS @keyframes
  property: string; // CSS animation property value
  preview: {
    duration: string;
    timing: string;
  };
}

export type AnimationCategory =
  | "Movement"
  | "Rotation"
  | "Pulse"
  | "Morph"
  | "Wave";

// Gradient type filter
export type GradientTypeFilter = "linear" | "radial" | "conic";

// UI preview mode for cards
export type UIPreviewMode =
  | "background"
  | "button"
  | "badge"
  | "text"
  | "border";

// Color format for display/export
export type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla";

// App state - now uses gradient definition instead of ID
export interface AppState {
  // View state
  view: "gallery" | "detail";

  // Selected gradient (full definition, not just ID)
  // Format: "linear,135,667eea:0,764ba2:100"
  selectedGradient: string | null;
  selectedAnimationId: string | null;

  // Filters
  category: GradientCategory | "All" | "Favorites";
  searchQuery: string;
  colors: WizardColor[]; // Color filters (multi-select)
  tags: string[]; // Tag filters (multi-select)
  gradientType: GradientTypeFilter; // Gradient type filter (defaults to 'linear')

  // UI state
  isAnimating: boolean;
  previewMode: UIPreviewMode; // How to display gradients in cards
  colorFormat: ColorFormat; // Color format for display/export
  animationSpeed: number; // Animation duration in milliseconds (500-10000)
}

// URL state (serialized subset of AppState)
export interface URLState {
  // Gradient definition: "linear,135,667eea:0,764ba2:100"
  g?: string;
  // Animation ID
  a?: string;
  // Category filter
  c?: string;
  // Search query
  q?: string;
  // Colors filter (comma-separated)
  colors?: string;
  // Gradient type filter
  t?: string;
  // Color format (hex, rgb, rgba, hsl, hsla)
  cf?: string;
}

// Export formats
export type ExportFormat = "css" | "tailwind" | "ai";

export interface ExportResult {
  format: ExportFormat;
  code: string;
  language: string; // For syntax highlighting
}

// Favorites - now stores gradient definitions, not IDs
export interface FavoritesState {
  gradients: string[]; // Array of encoded gradient definitions
}

// Wizard colors match the main categories
export type WizardColor =
  | "Purple"
  | "Blue"
  | "Green"
  | "Pink"
  | "Orange"
  | "Teal"
  | "Neutral"
  | "Multi";
