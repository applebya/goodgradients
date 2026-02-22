export const THEME_STORAGE_KEY = "goodgradients-theme";

export type Theme = "dark" | "light";

/**
 * Read theme from localStorage. Returns "dark" if not set or on error.
 */
export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light") return "light";
    return "dark";
  } catch {
    return "dark";
  }
}

/**
 * Persist theme choice to localStorage.
 */
export function setStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore localStorage errors (private browsing, quota exceeded, etc.)
  }
}

/**
 * Apply theme to the document root.
 * Dark mode = no class (default CSS variables in :root).
 * Light mode = .light class added to document.documentElement.
 */
export function applyTheme(theme: Theme): void {
  if (theme === "light") {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
  }
}
