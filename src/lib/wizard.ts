import type { Gradient, WizardVibe, WizardColorTemp, WizardUseCase, WizardAnimationPref, WizardSelections } from '@/types';

// Wizard step options with display info and example gradient preview
export interface WizardOption<T extends string> {
  value: T;
  label: string;
  description: string;
  previewGradient: string; // CSS gradient for visual preview
}

export const VIBE_OPTIONS: WizardOption<WizardVibe>[] = [
  { value: 'playful', label: 'Playful', description: 'Fun, energetic, and lighthearted', previewGradient: 'linear-gradient(135deg, #F472B6 0%, #EC4899 50%, #A855F7 100%)' },
  { value: 'professional', label: 'Professional', description: 'Clean, corporate, and trustworthy', previewGradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' },
  { value: 'bold', label: 'Bold', description: 'Strong, dramatic, and attention-grabbing', previewGradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #7C3AED 100%)' },
  { value: 'subtle', label: 'Subtle', description: 'Soft, understated, and elegant', previewGradient: 'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 50%, #D1D5DB 100%)' },
  { value: 'futuristic', label: 'Futuristic', description: 'Tech-forward, neon, and modern', previewGradient: 'linear-gradient(135deg, #22D3EE 0%, #A855F7 50%, #EC4899 100%)' },
  { value: 'natural', label: 'Natural', description: 'Organic, earthy, and calming', previewGradient: 'linear-gradient(135deg, #22C55E 0%, #16A34A 50%, #15803D 100%)' },
];

export const COLOR_TEMP_OPTIONS: WizardOption<WizardColorTemp>[] = [
  { value: 'warm', label: 'Warm', description: 'Reds, oranges, yellows', previewGradient: 'linear-gradient(135deg, #F97316 0%, #EF4444 50%, #F59E0B 100%)' },
  { value: 'cool', label: 'Cool', description: 'Blues, purples, teals', previewGradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)' },
  { value: 'neutral', label: 'Neutral', description: 'Grays, blacks, whites', previewGradient: 'linear-gradient(135deg, #6B7280 0%, #374151 50%, #9CA3AF 100%)' },
  { value: 'vibrant', label: 'Vibrant', description: 'Bright, saturated colors', previewGradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #22D3EE 100%)' },
  { value: 'earth', label: 'Earth Tones', description: 'Browns, greens, natural colors', previewGradient: 'linear-gradient(135deg, #78716C 0%, #65A30D 50%, #A16207 100%)' },
];

export const USE_CASE_OPTIONS: WizardOption<WizardUseCase>[] = [
  { value: 'hero', label: 'Hero Section', description: 'Large, impactful headers', previewGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { value: 'buttons', label: 'Buttons & CTAs', description: 'Clickable elements that pop', previewGradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)' },
  { value: 'cards', label: 'Cards', description: 'Content containers', previewGradient: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)' },
  { value: 'backgrounds', label: 'Backgrounds', description: 'Full-page or section backgrounds', previewGradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)' },
  { value: 'accents', label: 'Accents', description: 'Highlights and decorative elements', previewGradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)' },
];

export const ANIMATION_PREF_OPTIONS: WizardOption<WizardAnimationPref>[] = [
  { value: 'subtle', label: 'Subtle Movement', description: 'Gentle, barely-there animations', previewGradient: 'linear-gradient(135deg, #A78BFA 0%, #818CF8 100%)' },
  { value: 'dynamic', label: 'Dynamic Effects', description: 'Eye-catching, energetic motion', previewGradient: 'linear-gradient(135deg, #22D3EE 0%, #A855F7 50%, #EC4899 100%)' },
  { value: 'static', label: 'Static Only', description: 'No animation, just colors', previewGradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' },
];

// Tag mappings for filtering
const VIBE_TAGS: Record<WizardVibe, string[]> = {
  playful: ['fun', 'playful', 'candy', 'bubblegum', 'sweet', 'cheerful', 'happy', 'energetic', 'flamingo', 'tropical', 'fruit', 'summer'],
  professional: ['professional', 'corporate', 'elegant', 'luxury', 'premium', 'clean', 'modern', 'business', 'navy', 'sapphire'],
  bold: ['bold', 'dramatic', 'vibrant', 'intense', 'power', 'energy', 'strong', 'dynamic', 'charged', 'electric', 'deep', 'rich'],
  subtle: ['subtle', 'soft', 'gentle', 'delicate', 'whisper', 'minimal', 'calm', 'light', 'mist', 'cream', 'faint', 'airy'],
  futuristic: ['futuristic', 'tech', 'neon', 'cyber', 'cyberpunk', 'digital', 'matrix', 'synthwave', 'vaporwave', 'holographic', 'electric', 'glitch'],
  natural: ['nature', 'forest', 'ocean', 'earth', 'meadow', 'garden', 'organic', 'botanical', 'mountain', 'rainforest', 'tree', 'flower'],
};

const COLOR_TEMP_CATEGORIES: Record<WizardColorTemp, string[]> = {
  warm: ['Orange', 'Red', 'Yellow', 'Sunset', 'Warm'],
  cool: ['Blue', 'Purple', 'Teal', 'Ocean', 'Cool'],
  neutral: ['Neutral', 'Subtle', 'Dark'],
  vibrant: ['Pink', 'Abstract', 'Multi'],
  earth: ['Green', 'Nature'],
};

const COLOR_TEMP_TAGS: Record<WizardColorTemp, string[]> = {
  warm: ['warm', 'sunset', 'fire', 'flame', 'hot', 'autumn', 'copper', 'gold', 'honey', 'peach', 'coral', 'tangerine'],
  cool: ['cool', 'ice', 'cold', 'ocean', 'sea', 'water', 'atlantic', 'pacific', 'frost', 'arctic'],
  neutral: ['neutral', 'gray', 'slate', 'stone', 'minimal', 'clean', 'white', 'black', 'steel', 'industrial'],
  vibrant: ['vibrant', 'neon', 'bright', 'electric', 'glow', 'pop', 'saturated', 'intense', 'punch'],
  earth: ['earth', 'forest', 'jungle', 'moss', 'olive', 'pine', 'fern', 'botanical', 'organic', 'meadow'],
};

const USE_CASE_TAGS: Record<WizardUseCase, string[]> = {
  hero: ['hero', 'dramatic', 'premium', 'luxury', 'majestic', 'vast', 'cosmic', 'space', 'deep'],
  buttons: ['bold', 'vibrant', 'energy', 'power', 'electric', 'pop', 'cta', 'action', 'bright', 'animated'],
  cards: ['soft', 'subtle', 'gentle', 'delicate', 'cream', 'light', 'pastel', 'whisper', 'mist'],
  backgrounds: ['deep', 'dark', 'midnight', 'space', 'minimal', 'subtle', 'neutral', 'clean'],
  accents: ['vibrant', 'bright', 'accent', 'highlight', 'pop', 'glow', 'shimmer', 'metallic'],
};

// Scoring function - how well a gradient matches selections
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

  // Color temp matching (0-40 points) - multi-select, so any match is good
  if (selections.colorTemps.length > 0) {
    let colorScore = 0;
    for (const colorTemp of selections.colorTemps) {
      // Check category match (20 points)
      if (COLOR_TEMP_CATEGORIES[colorTemp].includes(category)) {
        colorScore += 20;
        break; // Only count category once
      }
    }
    for (const colorTemp of selections.colorTemps) {
      // Check tag matches (up to 20 points)
      const tempTags = COLOR_TEMP_TAGS[colorTemp];
      const tempMatches = tags.filter(t => tempTags.some(tt => t.includes(tt) || tt.includes(t))).length;
      colorScore += Math.min(tempMatches * 5, 20);
    }
    score += Math.min(colorScore, 40);
  }

  // Use case matching (0-20 points)
  if (selections.useCase) {
    const useTags = USE_CASE_TAGS[selections.useCase];
    const useMatches = tags.filter(t => useTags.some(ut => t.includes(ut) || ut.includes(t))).length;
    score += Math.min(useMatches * 7, 20);
  }

  // Animation preference (0-10 points)
  if (selections.animationPref) {
    const hasAnimatedTag = tags.includes('animated');
    if (selections.animationPref === 'dynamic' && hasAnimatedTag) {
      score += 10;
    } else if (selections.animationPref === 'subtle' && hasAnimatedTag) {
      score += 5; // Animated gradients can work for subtle too
    } else if (selections.animationPref === 'static' && !hasAnimatedTag) {
      score += 5; // Slight preference for non-animated when static selected
    }
  }

  return score;
}

// Filter and sort gradients by wizard selections
export function filterGradientsBySelections(gradients: Gradient[], selections: WizardSelections): Gradient[] {
  // If no selections, return all
  if (!selections.vibe && selections.colorTemps.length === 0 && !selections.useCase && !selections.animationPref) {
    return gradients;
  }

  // Score all gradients
  const scored = gradients.map(g => ({
    gradient: g,
    score: scoreGradient(g, selections),
  }));

  // Filter to those with any score, sort by score descending
  const filtered = scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);

  // If we have good matches, return them. Otherwise return top-scored with lower threshold
  if (filtered.length >= 10) {
    return filtered.map(s => s.gradient);
  }

  // Fallback: return all gradients sorted by score (even zero scores)
  return scored.sort((a, b) => b.score - a.score).map(s => s.gradient);
}

// Count matching gradients (for live preview in wizard)
export function countMatchingGradients(gradients: Gradient[], selections: WizardSelections): number {
  const filtered = filterGradientsBySelections(gradients, selections);
  // Only count those with actual scores
  if (!selections.vibe && selections.colorTemps.length === 0 && !selections.useCase && !selections.animationPref) {
    return gradients.length;
  }
  return filtered.filter(g => scoreGradient(g, selections) > 0).length;
}

// localStorage keys
const WIZARD_COMPLETED_KEY = 'goodgradients_wizard_completed';
const WIZARD_PREFS_KEY = 'goodgradients_wizard_prefs';

// Check if wizard has been completed before
export function hasCompletedWizard(): boolean {
  try {
    return localStorage.getItem(WIZARD_COMPLETED_KEY) === 'true';
  } catch {
    return false;
  }
}

// Mark wizard as completed
export function setWizardCompleted(): void {
  try {
    localStorage.setItem(WIZARD_COMPLETED_KEY, 'true');
  } catch {
    // Ignore localStorage errors
  }
}

// Save wizard preferences
export function saveWizardPrefs(selections: WizardSelections): void {
  try {
    localStorage.setItem(WIZARD_PREFS_KEY, JSON.stringify(selections));
  } catch {
    // Ignore localStorage errors
  }
}

// Load wizard preferences
export function loadWizardPrefs(): WizardSelections | null {
  try {
    const saved = localStorage.getItem(WIZARD_PREFS_KEY);
    if (saved) {
      return JSON.parse(saved) as WizardSelections;
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

// Clear wizard preferences
export function clearWizardPrefs(): void {
  try {
    localStorage.removeItem(WIZARD_PREFS_KEY);
  } catch {
    // Ignore localStorage errors
  }
}

// Default empty selections
export function getDefaultSelections(): WizardSelections {
  return {
    vibe: null,
    colorTemps: [],
    useCase: null,
    animationPref: null,
  };
}
