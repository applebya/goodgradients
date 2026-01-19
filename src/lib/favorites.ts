/**
 * Favorites management - stores gradient definitions (not IDs)
 *
 * Gradient definitions are encoded strings like "linear,135,667eea:0,764ba2:100"
 * This allows favoriting any gradient, not just presets.
 */

const STORAGE_KEY = "goodgradients_favorites_v2";

export interface FavoritesStore {
  gradients: string[]; // Encoded gradient definitions
  version: number;
}

const DEFAULT_STORE: FavoritesStore = {
  gradients: [],
  version: 2,
};

/**
 * Load favorites from localStorage
 */
export function loadFavorites(): FavoritesStore {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initialize storage with empty state to prevent first-click failure
      const initial: FavoritesStore = { ...DEFAULT_STORE };
      saveFavorites(initial);
      return initial;
    }

    const parsed = JSON.parse(stored) as FavoritesStore;
    // Validate structure
    if (!Array.isArray(parsed.gradients)) {
      // Re-initialize with default store if structure is invalid
      const initial: FavoritesStore = { ...DEFAULT_STORE };
      saveFavorites(initial);
      return initial;
    }
    return parsed;
  } catch {
    // On any error, initialize with default store
    const initial: FavoritesStore = { ...DEFAULT_STORE };
    saveFavorites(initial);
    return initial;
  }
}

/**
 * Save favorites to localStorage
 */
export function saveFavorites(store: FavoritesStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.warn("Failed to save favorites to localStorage:", error);
  }
}

/**
 * Add a gradient to favorites
 */
export function addFavorite(gradientDef: string): FavoritesStore {
  const store = loadFavorites();
  if (!store.gradients.includes(gradientDef)) {
    store.gradients.push(gradientDef);
    saveFavorites(store);
  }
  return store;
}

/**
 * Remove a gradient from favorites
 */
export function removeFavorite(gradientDef: string): FavoritesStore {
  const store = loadFavorites();
  store.gradients = store.gradients.filter((g) => g !== gradientDef);
  saveFavorites(store);
  return store;
}

/**
 * Toggle a gradient's favorite status
 */
export function toggleFavorite(gradientDef: string): {
  favorites: string[];
  added: boolean;
} {
  const store = loadFavorites();
  const isCurrentlyFavorite = store.gradients.includes(gradientDef);

  if (isCurrentlyFavorite) {
    store.gradients = store.gradients.filter((g) => g !== gradientDef);
  } else {
    store.gradients.push(gradientDef);
  }

  saveFavorites(store);
  return { favorites: store.gradients, added: !isCurrentlyFavorite };
}

/**
 * Check if a gradient is favorited
 */
export function isFavorite(gradientDef: string): boolean {
  const store = loadFavorites();
  return store.gradients.includes(gradientDef);
}

/**
 * Get all favorite gradients (encoded definitions)
 */
export function getFavorites(): string[] {
  return loadFavorites().gradients;
}

/**
 * Clear all favorites
 */
export function clearFavorites(): void {
  saveFavorites(DEFAULT_STORE);
}
