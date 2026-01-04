import type { GradientPreset, WizardColor, GradientCategory } from '@/types';

// Color options with display info
export interface ColorOption {
  value: WizardColor;
  label: string;
  previewGradient: string;
}

export const COLOR_OPTIONS: ColorOption[] = [
  { value: 'Purple', label: 'Purple', previewGradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)' },
  { value: 'Blue', label: 'Blue', previewGradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)' },
  { value: 'Green', label: 'Green', previewGradient: 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)' },
  { value: 'Pink', label: 'Pink', previewGradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)' },
  { value: 'Orange', label: 'Orange', previewGradient: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)' },
  { value: 'Teal', label: 'Teal', previewGradient: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)' },
  { value: 'Neutral', label: 'Neutral', previewGradient: 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)' },
  { value: 'Multi', label: 'Colorful', previewGradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #06B6D4 100%)' },
];

// Map wizard colors to gradient categories
const COLOR_TO_CATEGORIES: Record<WizardColor, GradientCategory[]> = {
  Purple: ['Purple', 'Cool'],
  Blue: ['Blue', 'Cool'],
  Green: ['Green', 'Teal'],
  Pink: ['Pink', 'Warm'],
  Orange: ['Orange', 'Warm'],
  Teal: ['Teal', 'Cool'],
  Neutral: ['Neutral'],
  Multi: ['Multi'],
};

// Filter gradients by selected colors
export function filterGradientsByColors(gradients: GradientPreset[], colors: WizardColor[]): GradientPreset[] {
  if (colors.length === 0) {
    return gradients;
  }

  const allowedCategories = new Set<GradientCategory>();
  for (const color of colors) {
    for (const cat of COLOR_TO_CATEGORIES[color]) {
      allowedCategories.add(cat);
    }
  }
  return gradients.filter(g => allowedCategories.has(g.category));
}
