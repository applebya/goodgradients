/**
 * Locale detection for Canadian vs American English spelling
 * Canadians get "colour", Americans/others get "color"
 */

// Check if user's locale is Canadian English
function isCanadian(): boolean {
  try {
    const languages = navigator.languages || [navigator.language];
    return languages.some(
      (lang) =>
        lang.toLowerCase() === "en-ca" || lang.toLowerCase() === "en_ca",
    );
  } catch {
    return false;
  }
}

// Cache the result since locale doesn't change during a session
const canadian = isCanadian();

/**
 * Returns localized spelling: "colour" for Canadians, "color" for others
 */
export function useColorSpelling(): {
  color: string;
  colors: string;
  Color: string;
  Colors: string;
} {
  if (canadian) {
    return {
      color: "colour",
      colors: "colours",
      Color: "Colour",
      Colors: "Colours",
    };
  }
  return {
    color: "color",
    colors: "colors",
    Color: "Color",
    Colors: "Colors",
  };
}

/**
 * Non-hook version for use outside components
 */
export const colorSpelling = canadian
  ? { color: "colour", colors: "colours", Color: "Colour", Colors: "Colours" }
  : { color: "color", colors: "colors", Color: "Color", Colors: "Colors" };
