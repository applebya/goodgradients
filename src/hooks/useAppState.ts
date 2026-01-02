import { useState, useCallback, useEffect, useRef } from 'react';
import type { AppState, GradientCategory, GradientPreset, WizardVibe, WizardColor, GradientTypeFilter } from '@/types';
import { getInitialState, updateURL, getMinimalShareState, getShareableURL } from '@/lib/state';
import { getFavorites, toggleFavorite as toggleFavoriteStorage, isFavorite as isFavoriteStorage } from '@/lib/favorites';
import { encodeGradient, parseGradientCSS } from '@/lib/gradient-url';

const DEFAULT_STATE: AppState = {
  view: 'gallery',
  selectedGradient: null,
  selectedAnimationId: null,
  category: 'All',
  searchQuery: '',
  vibe: null,
  colors: [],
  gradientType: null,
  isAnimating: true,
};

const URL_DEBOUNCE_MS = 150;

export function useAppState() {
  const [state, setState] = useState<AppState>(() => getInitialState());
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());
  const urlUpdateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync URL on state changes with debouncing
  useEffect(() => {
    if (urlUpdateTimer.current) {
      clearTimeout(urlUpdateTimer.current);
    }

    urlUpdateTimer.current = setTimeout(() => {
      const minimalState = getMinimalShareState(state);
      updateURL(minimalState);
    }, URL_DEBOUNCE_MS);

    return () => {
      if (urlUpdateTimer.current) {
        clearTimeout(urlUpdateTimer.current);
      }
    };
  }, [state]);

  // Actions
  const setView = useCallback((view: AppState['view']) => {
    setState((prev) => ({ ...prev, view }));
  }, []);

  /**
   * Select a gradient by its encoded definition string
   */
  const selectGradient = useCallback((gradientDef: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedGradient: gradientDef,
      view: gradientDef ? 'detail' : 'gallery',
    }));
  }, []);

  /**
   * Select a gradient from a preset (converts CSS to encoded definition)
   */
  const selectPreset = useCallback((preset: GradientPreset | null) => {
    if (!preset) {
      setState((prev) => ({
        ...prev,
        selectedGradient: null,
        view: 'gallery',
      }));
      return;
    }

    // Parse the CSS gradient and encode it
    const definition = parseGradientCSS(preset.gradient);
    if (definition) {
      const encoded = encodeGradient(definition);
      setState((prev) => ({
        ...prev,
        selectedGradient: encoded,
        view: 'detail',
      }));
    }
  }, []);

  const selectAnimation = useCallback((animationId: string | null) => {
    setState((prev) => ({ ...prev, selectedAnimationId: animationId }));
  }, []);

  const setCategory = useCallback((category: GradientCategory | 'All' | 'Favorites') => {
    setState((prev) => ({ ...prev, category }));
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setState((prev) => ({ ...prev, searchQuery }));
  }, []);

  const setVibe = useCallback((vibe: WizardVibe | null) => {
    setState((prev) => ({ ...prev, vibe }));
  }, []);

  const setColors = useCallback((colors: WizardColor[]) => {
    setState((prev) => ({ ...prev, colors }));
  }, []);

  const toggleColor = useCallback((color: WizardColor) => {
    setState((prev) => {
      const newColors = prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color];
      return { ...prev, colors: newColors };
    });
  }, []);

  const setGradientType = useCallback((gradientType: GradientTypeFilter | null) => {
    setState((prev) => ({ ...prev, gradientType }));
  }, []);

  const clearFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      vibe: null,
      colors: [],
      gradientType: null,
      category: 'All',
      searchQuery: '',
    }));
  }, []);

  const hasActiveFilters = useCallback(() => {
    return state.vibe !== null || state.colors.length > 0 || state.gradientType !== null;
  }, [state.vibe, state.colors, state.gradientType]);

  const toggleAnimating = useCallback(() => {
    setState((prev) => ({ ...prev, isAnimating: !prev.isAnimating }));
  }, []);

  const toggleFavorite = useCallback((gradientDef: string) => {
    const { favorites: newFavorites, added } = toggleFavoriteStorage(gradientDef);
    setFavorites(newFavorites);
    return added;
  }, []);

  const isFavorite = useCallback(
    (gradientDef: string) => isFavoriteStorage(gradientDef),
    []
  );

  const closeModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      view: 'gallery',
      selectedGradient: null,
    }));
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  const getShareURL = useCallback(() => {
    return getShareableURL(getMinimalShareState(state));
  }, [state]);

  /**
   * Update the current gradient definition (e.g., change angle or type)
   */
  const updateGradient = useCallback((newDef: string) => {
    setState((prev) => ({
      ...prev,
      selectedGradient: newDef,
    }));
  }, []);

  return {
    state,
    favorites,
    actions: {
      setView,
      selectGradient,
      selectPreset,
      selectAnimation,
      setCategory,
      setSearchQuery,
      setVibe,
      setColors,
      toggleColor,
      setGradientType,
      clearFilters,
      hasActiveFilters,
      toggleAnimating,
      toggleFavorite,
      isFavorite,
      closeModal,
      reset,
      getShareURL,
      updateGradient,
    },
  };
}
