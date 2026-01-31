import { useState, useCallback, useEffect, useRef } from "react";
import type {
  AppState,
  GradientCategory,
  GradientPreset,
  WizardColor,
  GradientTypeFilter,
  UIPreviewMode,
  ColorFormat,
} from "@/types";
import {
  getInitialState,
  updateURL,
  pushURL,
  getMinimalShareState,
  getShareableURL,
  parseURLState,
} from "@/lib/state";
import {
  getFavorites,
  toggleFavorite as toggleFavoriteStorage,
  isFavorite as isFavoriteStorage,
} from "@/lib/favorites";
import { encodeGradient, parseGradientCSS } from "@/lib/gradient-url";

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
  animationSpeed: 3000, // Default 3 seconds
};

const URL_DEBOUNCE_MS = 150;

// Check if the page was loaded with a gradient in the URL (direct link)
const hadGradientOnLoad =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("g");

export function useAppState() {
  const [state, setState] = useState<AppState>(() => getInitialState());
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());
  const urlUpdateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track if this is still the first modal open from a direct link
  const isFirstDirectLinkOpen = useRef(hadGradientOnLoad);
  // Track if we're handling a popstate event (to avoid pushing URL back)
  const isPopstateHandling = useRef(false);
  // Track previous gradient state to detect modal open/close
  const prevGradient = useRef(state.selectedGradient);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopstate = () => {
      isPopstateHandling.current = true;
      const urlState = parseURLState(
        new URLSearchParams(window.location.search),
      );
      setState((prev) => ({
        ...prev,
        selectedGradient: urlState.selectedGradient ?? null,
        selectedAnimationId:
          urlState.selectedAnimationId ?? prev.selectedAnimationId,
        view: urlState.selectedGradient ? "detail" : "gallery",
      }));
      // Reset flag after a tick
      setTimeout(() => {
        isPopstateHandling.current = false;
      }, 0);
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  // Sync URL on state changes with debouncing
  // Push to history when modal opens/closes, replace for other changes
  useEffect(() => {
    if (urlUpdateTimer.current) {
      clearTimeout(urlUpdateTimer.current);
    }

    urlUpdateTimer.current = setTimeout(() => {
      const minimalState = getMinimalShareState(state);

      // Check if modal state changed (opened or closed)
      const modalStateChanged = prevGradient.current !== state.selectedGradient;
      prevGradient.current = state.selectedGradient;

      // If this is from popstate or initial load, don't push (just sync)
      if (isPopstateHandling.current || isFirstDirectLinkOpen.current) {
        updateURL(minimalState);
      } else if (modalStateChanged) {
        // Modal opened or closed - push to history for back navigation
        pushURL(minimalState);
      } else {
        // Other changes (filters, etc.) - just replace
        updateURL(minimalState);
      }
    }, URL_DEBOUNCE_MS);

    return () => {
      if (urlUpdateTimer.current) {
        clearTimeout(urlUpdateTimer.current);
      }
    };
  }, [state]);

  // Actions
  const setView = useCallback((view: AppState["view"]) => {
    setState((prev) => ({ ...prev, view }));
  }, []);

  /**
   * Select a gradient by its encoded definition string
   */
  const selectGradient = useCallback((gradientDef: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedGradient: gradientDef,
      view: gradientDef ? "detail" : "gallery",
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
        view: "gallery",
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
        view: "detail",
      }));
    }
  }, []);

  const selectAnimation = useCallback((animationId: string | null) => {
    setState((prev) => ({ ...prev, selectedAnimationId: animationId }));
  }, []);

  const setCategory = useCallback(
    (category: GradientCategory | "All" | "Favorites") => {
      setState((prev) =>
        prev.category === category ? prev : { ...prev, category },
      );
    },
    [],
  );

  const setSearchQuery = useCallback((searchQuery: string) => {
    setState((prev) => ({ ...prev, searchQuery }));
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

  const setTags = useCallback((tags: string[]) => {
    setState((prev) => ({ ...prev, tags }));
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setState((prev) => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });
  }, []);

  const setGradientType = useCallback((gradientType: GradientTypeFilter) => {
    setState((prev) =>
      prev.gradientType === gradientType ? prev : { ...prev, gradientType },
    );
  }, []);

  const clearFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      colors: [],
      tags: [],
      gradientType: "linear",
      category: "All",
      searchQuery: "",
    }));
  }, []);

  const hasActiveFilters = useCallback(() => {
    return state.colors.length > 0 || state.tags.length > 0;
  }, [state.colors, state.tags]);

  const toggleAnimating = useCallback(() => {
    setState((prev) => ({ ...prev, isAnimating: !prev.isAnimating }));
  }, []);

  const setPreviewMode = useCallback((previewMode: UIPreviewMode) => {
    setState((prev) =>
      prev.previewMode === previewMode ? prev : { ...prev, previewMode },
    );
  }, []);

  const setColorFormat = useCallback((colorFormat: ColorFormat) => {
    setState((prev) =>
      prev.colorFormat === colorFormat ? prev : { ...prev, colorFormat },
    );
  }, []);

  const setAnimationSpeed = useCallback((animationSpeed: number) => {
    setState((prev) =>
      prev.animationSpeed === animationSpeed
        ? prev
        : { ...prev, animationSpeed },
    );
  }, []);

  const toggleFavorite = useCallback((gradientDef: string) => {
    const { favorites: newFavorites, added } =
      toggleFavoriteStorage(gradientDef);
    setFavorites(newFavorites);
    return added;
  }, []);

  const isFavorite = useCallback(
    (gradientDef: string) => isFavoriteStorage(gradientDef),
    [],
  );

  const closeModal = useCallback(() => {
    // After closing modal, we're no longer in direct link mode
    isFirstDirectLinkOpen.current = false;
    setState((prev) => ({
      ...prev,
      view: "gallery",
      selectedGradient: null,
    }));
  }, []);

  // Check if this is the first modal open from a direct link (skip animation)
  // Returns true once (for the initial direct link open), then resets to false
  const shouldSkipModalAnimation = useCallback(() => {
    const shouldSkip = isFirstDirectLinkOpen.current;
    // Reset after first check so subsequent opens animate normally
    if (isFirstDirectLinkOpen.current) {
      isFirstDirectLinkOpen.current = false;
    }
    return shouldSkip;
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
      setColors,
      toggleColor,
      setTags,
      toggleTag,
      setGradientType,
      setPreviewMode,
      setColorFormat,
      setAnimationSpeed,
      clearFilters,
      hasActiveFilters,
      toggleAnimating,
      toggleFavorite,
      isFavorite,
      closeModal,
      reset,
      getShareURL,
      updateGradient,
      shouldSkipModalAnimation,
    },
  };
}
