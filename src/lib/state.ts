import type { AppState, URLState, GradientType, GradientCategory } from '@/types';

const DEFAULT_STATE: AppState = {
  view: 'gallery',
  selectedGradientId: null,
  selectedAnimationId: null,
  gradientType: 'linear',
  gradientAngle: 135,
  category: 'All',
  searchQuery: '',
  isAnimating: true,
};

/**
 * Parse URL search params into app state
 */
export function parseURLState(searchParams: URLSearchParams): Partial<AppState> {
  const urlState: URLState = {
    g: searchParams.get('g') ?? undefined,
    a: searchParams.get('a') ?? undefined,
    t: (searchParams.get('t') as GradientType) ?? undefined,
    d: searchParams.has('d') ? parseInt(searchParams.get('d') ?? '135', 10) : undefined,
    v: (searchParams.get('v') as AppState['view']) ?? undefined,
    c: searchParams.get('c') ?? undefined,
    q: searchParams.get('q') ?? undefined,
  };

  const state: Partial<AppState> = {};

  if (urlState.g) state.selectedGradientId = urlState.g;
  if (urlState.a) state.selectedAnimationId = urlState.a;
  if (urlState.t) state.gradientType = urlState.t;
  if (urlState.d !== undefined) state.gradientAngle = urlState.d;
  if (urlState.v) state.view = urlState.v;
  if (urlState.c) state.category = urlState.c as GradientCategory | 'All' | 'Favorites' | 'Animated';
  if (urlState.q) state.searchQuery = urlState.q;

  return state;
}

/**
 * Serialize app state to URL search params
 */
export function serializeStateToURL(state: Partial<AppState>): URLSearchParams {
  const params = new URLSearchParams();

  if (state.selectedGradientId) params.set('g', state.selectedGradientId);
  if (state.selectedAnimationId) params.set('a', state.selectedAnimationId);
  if (state.gradientType && state.gradientType !== 'linear') {
    params.set('t', state.gradientType);
  }
  if (state.gradientAngle !== undefined && state.gradientAngle !== 135) {
    params.set('d', state.gradientAngle.toString());
  }
  if (state.view && state.view !== 'gallery') params.set('v', state.view);
  if (state.category && state.category !== 'All') params.set('c', state.category);
  if (state.searchQuery) params.set('q', state.searchQuery);

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

  window.history.replaceState(null, '', newURL);
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

  if (state.selectedGradientId) minimal.selectedGradientId = state.selectedGradientId;
  if (state.selectedAnimationId) minimal.selectedAnimationId = state.selectedAnimationId;
  if (state.gradientType !== 'linear') minimal.gradientType = state.gradientType;
  if (state.gradientAngle !== 135) minimal.gradientAngle = state.gradientAngle;

  return minimal;
}
