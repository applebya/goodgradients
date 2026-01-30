import type {
  AppState,
  URLState,
  GradientCategory,
  WizardColor,
  GradientTypeFilter,
  ColorFormat,
} from "@/types";
import { decodeGradient } from "./gradient-url";

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

/**
 * Parse URL search params into app state
 */
export function parseURLState(
  searchParams: URLSearchParams,
): Partial<AppState> {
  const urlState: URLState = {
    g: searchParams.get("g") ?? undefined,
    a: searchParams.get("a") ?? undefined,
    c: searchParams.get("c") ?? undefined,
    q: searchParams.get("q") ?? undefined,
    colors: searchParams.get("colors") ?? undefined,
    t: searchParams.get("t") ?? undefined,
    cf: searchParams.get("cf") ?? undefined,
  };

  const state: Partial<AppState> = {};

  // Validate and set gradient definition
  if (urlState.g) {
    const decoded = decodeGradient(urlState.g);
    if (decoded) {
      state.selectedGradient = urlState.g;
      state.view = "detail";
    }
  }

  if (urlState.a) state.selectedAnimationId = urlState.a;
  if (urlState.c)
    state.category = urlState.c as GradientCategory | "All" | "Favorites";
  if (urlState.q) state.searchQuery = urlState.q;

  // Parse colors filter (comma-separated, case-insensitive)
  if (urlState.colors) {
    const colorList = urlState.colors
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

  // Parse gradient type filter
  if (
    urlState.t &&
    VALID_GRADIENT_TYPES.includes(urlState.t as GradientTypeFilter)
  ) {
    state.gradientType = urlState.t as GradientTypeFilter;
  }

  // Parse color format
  if (urlState.cf && VALID_COLOR_FORMATS.includes(urlState.cf as ColorFormat)) {
    state.colorFormat = urlState.cf as ColorFormat;
  }

  return state;
}

/**
 * Serialize app state to URL search params
 */
export function serializeStateToURL(state: Partial<AppState>): URLSearchParams {
  const params = new URLSearchParams();

  if (state.selectedGradient) params.set("g", state.selectedGradient);
  if (state.selectedAnimationId) params.set("a", state.selectedAnimationId);
  if (state.category && state.category !== "All")
    params.set("c", state.category);
  if (state.searchQuery) params.set("q", state.searchQuery);
  if (state.colors && state.colors.length > 0)
    params.set("colors", state.colors.map((c) => c.toLowerCase()).join(","));
  if (state.gradientType) params.set("t", state.gradientType);
  if (state.colorFormat && state.colorFormat !== "hex")
    params.set("cf", state.colorFormat);

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
 * Update URL without triggering navigation
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

  // Gradient type filter (only if not default)
  if (state.gradientType && state.gradientType !== "linear")
    minimal.gradientType = state.gradientType;

  // Color format (only if not default)
  if (state.colorFormat && state.colorFormat !== "hex")
    minimal.colorFormat = state.colorFormat;

  return minimal;
}
