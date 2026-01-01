// Core gradient type
export interface Gradient {
  id: string;
  name: string;
  description: string;
  category: GradientCategory;
  gradient: string; // CSS gradient value
  colors: string[]; // Hex colors
  tags: string[];
}

export type GradientCategory =
  | 'Purple'
  | 'Blue'
  | 'Green'
  | 'Pink'
  | 'Red'
  | 'Orange'
  | 'Yellow'
  | 'Teal'
  | 'Pastel'
  | 'Neutral'
  | 'Warm'
  | 'Cool'
  | 'Sunset'
  | 'Ocean'
  | 'Nature'
  | 'Abstract'
  | 'Subtle'
  | 'Dark'
  | 'Multi';

// Gradient customization
export type GradientType = 'linear' | 'radial' | 'conic';

export interface GradientConfig {
  type: GradientType;
  angle: number; // 0-360 for linear/conic
  colors: string[];
}

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

export type AnimationCategory = 'Movement' | 'Rotation' | 'Pulse' | 'Morph' | 'Wave';

// App state
export interface AppState {
  // View state
  view: 'gallery' | 'detail' | 'studio';

  // Selected items
  selectedGradientId: string | null;
  selectedAnimationId: string | null;

  // Customization
  gradientType: GradientType;
  gradientAngle: number;

  // Filters
  category: GradientCategory | 'All' | 'Favorites' | 'Animated';
  searchQuery: string;

  // UI state
  isAnimating: boolean;
}

// URL state (serialized subset of AppState)
export interface URLState {
  g?: string; // gradient ID
  a?: string; // animation ID
  t?: GradientType; // gradient type
  d?: number; // angle (degrees)
  v?: 'gallery' | 'detail' | 'studio'; // view
  c?: string; // category
  q?: string; // search query
}

// Export formats
export type ExportFormat = 'css' | 'tailwind' | 'ai';

export interface ExportResult {
  format: ExportFormat;
  code: string;
  language: string; // For syntax highlighting
}

// Favorites (persisted to localStorage)
export interface FavoritesState {
  gradientIds: string[];
}

// Discovery Wizard types (2-step wizard: Vibe → Colors)
export type WizardVibe = 'playful' | 'professional' | 'bold' | 'subtle' | 'warm' | 'cool';

// Color categories map to actual gradient categories
export type WizardColor = 'Purple' | 'Blue' | 'Green' | 'Pink' | 'Orange' | 'Teal' | 'Neutral' | 'Multi';

export interface WizardSelections {
  vibe: WizardVibe | null;
  colors: WizardColor[]; // Multi-select actual colors
}

export interface WizardState {
  isOpen: boolean;
  currentStep: number; // 0-1 (2 steps)
  selections: WizardSelections;
  hasCompletedOnce: boolean;
}
