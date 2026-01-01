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

// Discovery Wizard types
export type WizardVibe = 'playful' | 'professional' | 'bold' | 'subtle' | 'futuristic' | 'natural';
export type WizardColorTemp = 'warm' | 'cool' | 'neutral' | 'vibrant' | 'earth';
export type WizardUseCase = 'hero' | 'buttons' | 'cards' | 'backgrounds' | 'accents';
export type WizardAnimationPref = 'subtle' | 'dynamic' | 'static';

export interface WizardSelections {
  vibe: WizardVibe | null;
  colorTemps: WizardColorTemp[]; // Multi-select
  useCase: WizardUseCase | null;
  animationPref: WizardAnimationPref | null;
}

export interface WizardState {
  isOpen: boolean;
  currentStep: number; // 0-3
  selections: WizardSelections;
  hasCompletedOnce: boolean;
}

export interface WizardFilters {
  vibes: WizardVibe[];
  colorTemps: WizardColorTemp[];
  useCases: WizardUseCase[];
}
