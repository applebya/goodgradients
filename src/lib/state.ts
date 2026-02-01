import type {
  AppState,
  GradientCategory,
  WizardColor,
  GradientTypeFilter,
  ColorFormat,
  UIPreviewMode,
} from "@/types";
import {
  decodeGradient,
  decodeGradientFromParams,
  encodeGradient,
  encodeGradientToParams,
} from "./gradient-url";

const DEFAULT_STATE: AppState = {
  view: "gallery",
  selectedGradient: null,
  selectedAnimationId: null,
  category: "All",
  searchQuery: "",
  colors: [],
  tags: [],
  gradientType: "linear",
  isAnimating: true,
  previewMode: "background",
  colorFormat: "hex",
  animationSpeed: 3000,
};

// Valid values for validation
const VALID_COLORS: WizardColor[] = [
  "Purple",
  "Blue",
  "Green",
  "Pink",
  "Orange",
  "Teal",
  "Neutral",
  "Multi",
];
const VALID_GRADIENT_TYPES: GradientTypeFilter[] = [
  "linear",
  "radial",
  "conic",
];
const VALID_COLOR_FORMATS: ColorFormat[] = [
  "hex",
  "rgb",
  "rgba",
  "hsl",
  "hsla",
];
const VALID_PREVIEW_MODES: UIPreviewMode[] = [
  "background",
  "button",
  "badge",
  "text",
  "border",
];

/**
 * Parse URL search params into app state
 * Supports both new format (?g=color1-color2&type=linear&angle=135)
 * and legacy format (?g=linear,135,color1:0,color2:100)
 */
export function parseURLState(
  searchParams: URLSearchParams,
): Partial<AppState> {
  const state: Partial<AppState> = {};

  // Parse gradient from URL params (supports both new and legacy formats)
  const gradientDef = decodeGradientFromParams(searchParams);
  if (gradientDef) {
    // Convert to internal storage format
    state.selectedGradient = encodeGradient(gradientDef);
    state.view = "detail";
  }

  // Animation
  const animation = searchParams.get("a");
  if (animation) state.selectedAnimationId = animation;

  // Category
  const category = searchParams.get("c");
  if (category)
    state.category = category as GradientCategory | "All" | "Favorites";

  // Search query
  const query = searchParams.get("q");
  if (query) state.searchQuery = query;

  // Parse colors filter (comma-separated, case-insensitive)
  const colorsParam = searchParams.get("colors");
  if (colorsParam) {
    const colorList = colorsParam
      .split(",")
      .map((c) => {
        // Case-insensitive match against valid colors
        const match = VALID_COLORS.find(
          (valid) => valid.toLowerCase() === c.toLowerCase(),
        );
        return match;
      })
      .filter((c): c is WizardColor => c !== undefined);
    if (colorList.length > 0) {
      state.colors = colorList;
    }
  }

  // Parse tags filter (comma-separated)
  const tagsParam = searchParams.get("tags");
  if (tagsParam) {
    const tagList = tagsParam.split(",").filter((t) => t.length > 0);
    if (tagList.length > 0) {
      state.tags = tagList;
    }
  }

  // Parse gradient type filter (for preview, not the selected gradient's type)
  const typeFilter = searchParams.get("t");
  if (
    typeFilter &&
    VALID_GRADIENT_TYPES.includes(typeFilter as GradientTypeFilter)
  ) {
    state.gradientType = typeFilter as GradientTypeFilter;
  }

  // Parse color format
  const colorFormat = searchParams.get("cf");
  if (colorFormat && VALID_COLOR_FORMATS.includes(colorFormat as ColorFormat)) {
    state.colorFormat = colorFormat as ColorFormat;
  }

  // Parse preview mode
  const previewMode = searchParams.get("pm");
  if (
    previewMode &&
    VALID_PREVIEW_MODES.includes(previewMode as UIPreviewMode)
  ) {
    state.previewMode = previewMode as UIPreviewMode;
  }

  return state;
}

/**
 * Serialize app state to URL search params
 * Uses the new clean URL format: ?g=color1-color2&type=radial&angle=90
 */
export function serializeStateToURL(state: Partial<AppState>): URLSearchParams {
  const params = new URLSearchParams();

  // Serialize gradient to clean URL params
  if (state.selectedGradient) {
    const gradientDef = decodeGradient(state.selectedGradient);
    if (gradientDef) {
      const gradientParams = encodeGradientToParams(gradientDef);
      // Add each gradient param
      for (const [key, value] of Object.entries(gradientParams)) {
        params.set(key, value);
      }
    }
  }

  // Animation
  if (state.selectedAnimationId) params.set("a", state.selectedAnimationId);

  // Category
  if (state.category && state.category !== "All")
    params.set("c", state.category);

  // Search query
  if (state.searchQuery) params.set("q", state.searchQuery);

  // Colors filter
  if (state.colors && state.colors.length > 0)
    params.set("colors", state.colors.map((c) => c.toLowerCase()).join(","));

  // Tags filter
  if (state.tags && state.tags.length > 0)
    params.set("tags", state.tags.join(","));

  // Gradient type filter (for preview)
  if (state.gradientType && state.gradientType !== "linear")
    params.set("t", state.gradientType);

  // Color format
  if (state.colorFormat && state.colorFormat !== "hex")
    params.set("cf", state.colorFormat);

  // Preview mode
  if (state.previewMode && state.previewMode !== "background")
    params.set("pm", state.previewMode);

  return params;
}

/**
 * Get the full URL for sharing
 */
export function getShareableURL(state: Partial<AppState>): string {
  const params = serializeStateToURL(state);
  const baseURL = window.location.origin + window.location.pathname;
  const queryString = params.toString();
  return queryString ? `${baseURL}?${queryString}` : baseURL;
}

/**
 * Update URL without triggering navigation (replaceState)
 */
export function updateURL(state: Partial<AppState>): void {
  const params = serializeStateToURL(state);
  const queryString = params.toString();
  const newURL = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname;

  window.history.replaceState(null, "", newURL);
}

/**
 * Push URL state to browser history (for modal open/close)
 * This enables browser back/forward navigation
 */
export function pushURL(state: Partial<AppState>): void {
  const params = serializeStateToURL(state);
  const queryString = params.toString();
  const newURL = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname;

  window.history.pushState(null, "", newURL);
}

/**
 * Get initial state from URL + defaults
 */
export function getInitialState(): AppState {
  const urlState = parseURLState(new URLSearchParams(window.location.search));
  return { ...DEFAULT_STATE, ...urlState };
}

/**
 * Create a minimal state for URL sharing (only non-default values)
 */
export function getMinimalShareState(state: AppState): Partial<AppState> {
  const minimal: Partial<AppState> = {};

  // Core selection
  if (state.selectedGradient) minimal.selectedGradient = state.selectedGradient;
  if (state.selectedAnimationId)
    minimal.selectedAnimationId = state.selectedAnimationId;

  // Category filter
  if (state.category && state.category !== "All")
    minimal.category = state.category;

  // Color filter
  if (state.colors && state.colors.length > 0) minimal.colors = state.colors;

  // Tags filter
  if (state.tags && state.tags.length > 0) minimal.tags = state.tags;

  // Gradient type filter (only if not default)
  if (state.gradientType && state.gradientType !== "linear")
    minimal.gradientType = state.gradientType;

  // Color format (only if not default)
  if (state.colorFormat && state.colorFormat !== "hex")
    minimal.colorFormat = state.colorFormat;

  // Preview mode (only if not default)
  if (state.previewMode && state.previewMode !== "background")
    minimal.previewMode = state.previewMode;

  return minimal;
}
