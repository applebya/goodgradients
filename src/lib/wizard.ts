import type { Gradient, WizardVibe, WizardColor, WizardSelections } from '@/types';

// Wizard step options with display info
export interface WizardOption<T extends string> {
  value: T;
  label: string;
  description: string;
  previewGradient: string;
}

export const VIBE_OPTIONS: WizardOption<WizardVibe>[] = [
  { value: 'playful', label: 'Playful', description: 'Fun & energetic', previewGradient: 'linear-gradient(135deg, #F472B6 0%, #A855F7 100%)' },
  { value: 'professional', label: 'Professional', description: 'Clean & trustworthy', previewGradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' },
  { value: 'bold', label: 'Bold', description: 'Strong & dramatic', previewGradient: 'linear-gradient(135deg, #EF4444 0%, #7C3AED 100%)' },
  { value: 'subtle', label: 'Subtle', description: 'Soft & understated', previewGradient: 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)' },
  { value: 'warm', label: 'Warm', description: 'Cozy & inviting', previewGradient: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)' },
  { value: 'cool', label: 'Cool', description: 'Calm & refreshing', previewGradient: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)' },
];

export const COLOR_OPTIONS: WizardOption<WizardColor>[] = [
  { value: 'Purple', label: 'Purple', description: 'Violet & lavender', previewGradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)' },
  { value: 'Blue', label: 'Blue', description: 'Ocean & sky', previewGradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)' },
  { value: 'Green', label: 'Green', description: 'Nature & fresh', previewGradient: 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)' },
  { value: 'Pink', label: 'Pink', description: 'Rose & coral', previewGradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)' },
  { value: 'Orange', label: 'Orange', description: 'Sunset & warm', previewGradient: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)' },
  { value: 'Teal', label: 'Teal', description: 'Aqua & mint', previewGradient: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)' },
  { value: 'Neutral', label: 'Neutral', description: 'Gray & minimal', previewGradient: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)' },
  { value: 'Multi', label: 'Colorful', description: 'Rainbow & vibrant', previewGradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #06B6D4 100%)' },
];

// Tag mappings for vibe filtering
const VIBE_TAGS: Record<WizardVibe, string[]> = {
  playful: ['fun', 'playful', 'candy', 'sweet', 'cheerful', 'happy', 'energetic', 'tropical', 'summer', 'bubblegum', 'flamingo'],
  professional: ['professional', 'corporate', 'elegant', 'luxury', 'premium', 'clean', 'modern', 'business', 'navy', 'sapphire', 'minimal'],
  bold: ['bold', 'dramatic', 'vibrant', 'intense', 'power', 'energy', 'strong', 'dynamic', 'electric', 'deep', 'neon', 'cyberpunk'],
  subtle: ['subtle', 'soft', 'gentle', 'delicate', 'whisper', 'minimal', 'calm', 'light', 'mist', 'cream', 'pastel'],
  warm: ['warm', 'sunset', 'fire', 'flame', 'autumn', 'copper', 'gold', 'honey', 'peach', 'coral', 'tangerine', 'cozy'],
  cool: ['cool', 'ice', 'cold', 'ocean', 'sea', 'water', 'frost', 'arctic', 'refreshing', 'calm', 'serene'],
};

// Map wizard colors to gradient categories
const COLOR_TO_CATEGORIES: Record<WizardColor, string[]> = {
  Purple: ['Purple', 'Abstract'],
  Blue: ['Blue', 'Ocean', 'Cool'],
  Green: ['Green', 'Nature', 'Teal'],
  Pink: ['Pink', 'Pastel'],
  Orange: ['Orange', 'Yellow', 'Warm', 'Sunset'],
  Teal: ['Teal', 'Ocean'],
  Neutral: ['Neutral', 'Subtle', 'Dark'],
  Multi: ['Multi', 'Abstract'],
};

// Scoring function
export function scoreGradient(gradient: Gradient, selections: WizardSelections): number {
  let score = 0;
  const tags = gradient.tags.map(t => t.toLowerCase());
  const category = gradient.category;

  // Vibe matching (0-30 points)
  if (selections.vibe) {
    const vibeTags = VIBE_TAGS[selections.vibe];
    const vibeMatches = tags.filter(t => vibeTags.some(vt => t.includes(vt) || vt.includes(t))).length;
    score += Math.min(vibeMatches * 10, 30);
  }

  // Color matching (0-50 points) - direct category match is strong signal
  if (selections.colors.length > 0) {
    for (const color of selections.colors) {
      const categories = COLOR_TO_CATEGORIES[color];
      if (categories.includes(category)) {
        score += 50;
        break;
      }
    }
  }

  return score;
}

// Filter and sort gradients
export function filterGradientsBySelections(gradients: Gradient[], selections: WizardSelections): Gradient[] {
  if (!selections.vibe && selections.colors.length === 0) {
    return gradients;
  }

  // If only colors selected, filter by category directly
  if (!selections.vibe && selections.colors.length > 0) {
    const allowedCategories = new Set<string>();
    for (const color of selections.colors) {
      for (const cat of COLOR_TO_CATEGORIES[color]) {
        allowedCategories.add(cat);
      }
    }
    return gradients.filter(g => allowedCategories.has(g.category));
  }

  // Score and filter
  const scored = gradients.map(g => ({
    gradient: g,
    score: scoreGradient(g, selections),
  }));

  const filtered = scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (filtered.length >= 10) {
    return filtered.map(s => s.gradient);
  }

  return scored.sort((a, b) => b.score - a.score).map(s => s.gradient);
}

// Count matching gradients
export function countMatchingGradients(gradients: Gradient[], selections: WizardSelections): number {
  if (!selections.vibe && selections.colors.length === 0) {
    return gradients.length;
  }
  return filterGradientsBySelections(gradients, selections).length;
}

// localStorage
const WIZARD_COMPLETED_KEY = 'goodgradients_wizard_completed';
const WIZARD_PREFS_KEY = 'goodgradients_wizard_prefs';

export function hasCompletedWizard(): boolean {
  try {
    return localStorage.getItem(WIZARD_COMPLETED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setWizardCompleted(): void {
  try {
    localStorage.setItem(WIZARD_COMPLETED_KEY, 'true');
  } catch {}
}

export function saveWizardPrefs(selections: WizardSelections): void {
  try {
    localStorage.setItem(WIZARD_PREFS_KEY, JSON.stringify(selections));
  } catch {}
}

export function loadWizardPrefs(): WizardSelections | null {
  try {
    const saved = localStorage.getItem(WIZARD_PREFS_KEY);
    if (saved) {
      return JSON.parse(saved) as WizardSelections;
    }
  } catch {}
  return null;
}

export function clearWizardPrefs(): void {
  try {
    localStorage.removeItem(WIZARD_PREFS_KEY);
  } catch {}
}

export function getDefaultSelections(): WizardSelections {
  return {
    vibe: null,
    colors: [],
  };
}
