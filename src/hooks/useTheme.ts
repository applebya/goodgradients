import { useState, useEffect, useCallback } from "react";
import {
  type Theme,
  getStoredTheme,
  setStoredTheme,
  applyTheme,
} from "@/lib/theme";

export interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Hook for managing light/dark theme state.
 * - Initializes from localStorage on mount (defaults to "dark")
 * - Applies theme class to document.documentElement
 * - Persists choice to localStorage on toggle
 */
export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  // Apply theme class on mount and whenever theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      setStoredTheme(next);
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
