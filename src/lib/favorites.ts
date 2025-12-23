const STORAGE_KEY = 'onlygradients_favorites';

export interface FavoritesStore {
  gradientIds: string[];
  version: number;
}

const DEFAULT_STORE: FavoritesStore = {
  gradientIds: [],
  version: 1,
};

/**
 * Load favorites from localStorage
 */
export function loadFavorites(): FavoritesStore {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_STORE;

    const parsed = JSON.parse(stored) as FavoritesStore;
    // Validate structure
    if (!Array.isArray(parsed.gradientIds)) {
      return DEFAULT_STORE;
    }
    return parsed;
  } catch {
    return DEFAULT_STORE;
  }
}

/**
 * Save favorites to localStorage
 */
export function saveFavorites(store: FavoritesStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.warn('Failed to save favorites to localStorage:', error);
  }
}

/**
 * Add a gradient to favorites
 */
export function addFavorite(gradientId: string): FavoritesStore {
  const store = loadFavorites();
  if (!store.gradientIds.includes(gradientId)) {
    store.gradientIds.push(gradientId);
    saveFavorites(store);
  }
  return store;
}

/**
 * Remove a gradient from favorites
 */
export function removeFavorite(gradientId: string): FavoritesStore {
  const store = loadFavorites();
  store.gradientIds = store.gradientIds.filter((id) => id !== gradientId);
  saveFavorites(store);
  return store;
}

/**
 * Toggle a gradient's favorite status
 */
export function toggleFavorite(gradientId: string): { store: FavoritesStore; added: boolean } {
  const store = loadFavorites();
  const isCurrentlyFavorite = store.gradientIds.includes(gradientId);

  if (isCurrentlyFavorite) {
    store.gradientIds = store.gradientIds.filter((id) => id !== gradientId);
  } else {
    store.gradientIds.push(gradientId);
  }

  saveFavorites(store);
  return { store, added: !isCurrentlyFavorite };
}

/**
 * Check if a gradient is favorited
 */
export function isFavorite(gradientId: string): boolean {
  const store = loadFavorites();
  return store.gradientIds.includes(gradientId);
}

/**
 * Get all favorite gradient IDs
 */
export function getFavoriteIds(): string[] {
  return loadFavorites().gradientIds;
}

/**
 * Clear all favorites
 */
export function clearFavorites(): void {
  saveFavorites(DEFAULT_STORE);
}
