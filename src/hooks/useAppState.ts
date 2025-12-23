import { useState, useCallback, useEffect } from 'react';
import type { AppState, GradientType, GradientCategory } from '@/types';
import { getInitialState, updateURL, getMinimalShareState, getShareableURL } from '@/lib/state';
import { getFavoriteIds, toggleFavorite as toggleFavoriteStorage } from '@/lib/favorites';

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

export function useAppState() {
  const [state, setState] = useState<AppState>(() => getInitialState());
  const [favorites, setFavorites] = useState<string[]>(() => getFavoriteIds());

  // Sync URL on state changes
  useEffect(() => {
    const minimalState = getMinimalShareState(state);
    updateURL(minimalState);
  }, [state]);

  // Actions
  const setView = useCallback((view: AppState['view']) => {
    setState((prev) => ({ ...prev, view }));
  }, []);

  const selectGradient = useCallback((gradientId: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedGradientId: gradientId,
      view: gradientId ? 'detail' : 'gallery',
    }));
  }, []);

  const selectAnimation = useCallback((animationId: string | null) => {
    setState((prev) => ({ ...prev, selectedAnimationId: animationId }));
  }, []);

  const setGradientType = useCallback((gradientType: GradientType) => {
    setState((prev) => ({ ...prev, gradientType }));
  }, []);

  const setGradientAngle = useCallback((gradientAngle: number) => {
    setState((prev) => ({ ...prev, gradientAngle }));
  }, []);

  const setCategory = useCallback((category: GradientCategory | 'All' | 'Favorites' | 'Animated') => {
    setState((prev) => ({ ...prev, category }));
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setState((prev) => ({ ...prev, searchQuery }));
  }, []);

  const toggleAnimating = useCallback(() => {
    setState((prev) => ({ ...prev, isAnimating: !prev.isAnimating }));
  }, []);

  const toggleFavorite = useCallback((gradientId: string) => {
    const { store, added } = toggleFavoriteStorage(gradientId);
    setFavorites(store.gradientIds);
    return added;
  }, []);

  const isFavorite = useCallback(
    (gradientId: string) => favorites.includes(gradientId),
    [favorites]
  );

  const openStudio = useCallback(() => {
    setState((prev) => ({ ...prev, view: 'studio' }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      view: 'gallery',
      selectedGradientId: null,
    }));
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  const getShareURL = useCallback(() => {
    return getShareableURL(getMinimalShareState(state));
  }, [state]);

  return {
    state,
    favorites,
    actions: {
      setView,
      selectGradient,
      selectAnimation,
      setGradientType,
      setGradientAngle,
      setCategory,
      setSearchQuery,
      toggleAnimating,
      toggleFavorite,
      isFavorite,
      openStudio,
      closeModal,
      reset,
      getShareURL,
    },
  };
}
