import { useMemo } from 'react';
import { GradientCard } from './GradientCard';
import { gradients } from '@/data/gradients';
import { encodeGradient, parseGradientCSS } from '@/lib/gradient-url';
import { filterGradientsByColors } from '@/lib/wizard';
import type { GradientPreset, GradientCategory, WizardColor, GradientTypeFilter, UIPreviewMode } from '@/types';

interface GradientGalleryProps {
  category: GradientCategory | 'All' | 'Favorites';
  searchQuery: string;
  colors: WizardColor[];
  tags: string[];
  gradientType: GradientTypeFilter;
  previewMode: UIPreviewMode;
  favorites: string[]; // Encoded gradient definitions
  onSelectGradient: (gradient: GradientPreset) => void;
  onToggleFavorite: (encodedGradient: string) => void;
  isFavorite: (encodedGradient: string) => boolean;
}

/**
 * Get encoded gradient string from a preset for favorites comparison
 */
function getEncodedGradient(preset: GradientPreset): string | null {
  const def = parseGradientCSS(preset.gradient);
  return def ? encodeGradient(def) : null;
}

/**
 * Detect gradient type from CSS string
 */
function getGradientType(css: string): GradientTypeFilter | null {
  if (css.includes('linear-gradient')) return 'linear';
  if (css.includes('radial-gradient')) return 'radial';
  if (css.includes('conic-gradient')) return 'conic';
  return null;
}

export function GradientGallery({
  category,
  searchQuery,
  colors,
  tags,
  gradientType,
  previewMode,
  favorites,
  onSelectGradient,
  onToggleFavorite,
  isFavorite,
}: GradientGalleryProps) {
  const filteredGradients = useMemo(() => {
    let result: GradientPreset[] = gradients;

    // Apply category filter first
    if (category === 'Favorites') {
      // Filter by encoded gradient definitions in favorites
      result = result.filter((g) => {
        const encoded = getEncodedGradient(g);
        return encoded && favorites.includes(encoded);
      });
    } else if (category !== 'All') {
      result = result.filter((g) => g.category === category);
    }

    // Apply colors filter
    if (colors.length > 0) {
      result = filterGradientsByColors(result, colors);
    }

    // Apply tags filter (gradient must have ANY selected tag - OR logic)
    if (tags.length > 0) {
      result = result.filter((g) =>
        tags.some((tag) => g.tags.includes(tag))
      );
    }

    // Apply gradient type filter (always applied, defaults to 'linear')
    result = result.filter((g) => getGradientType(g.gradient) === gradientType);

    // Apply search filter
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(searchLower) ||
          g.description.toLowerCase().includes(searchLower) ||
          g.tags.some((t) => t.toLowerCase().includes(searchLower)) ||
          g.colors.some((c) => c.toLowerCase().includes(searchLower))
      );
    }

    return result;
  }, [category, searchQuery, colors, tags, gradientType, favorites]);

  if (filteredGradients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-neutral-800 flex items-center justify-center">
          <span className="text-2xl">🎨</span>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">
          {category === 'Favorites' ? 'No favorites yet' : 'No gradients found'}
        </h3>
        <p className="text-neutral-400 max-w-sm">
          {category === 'Favorites'
            ? 'Start adding gradients to your favorites by clicking the heart icon.'
            : 'Try adjusting your filters or search query.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredGradients.map((gradient) => {
        const encoded = getEncodedGradient(gradient);
        return (
          <GradientCard
            key={gradient.id}
            gradient={gradient}
            previewMode={previewMode}
            isFavorite={encoded ? isFavorite(encoded) : false}
            onToggleFavorite={() => encoded && onToggleFavorite(encoded)}
            onSelect={onSelectGradient}
          />
        );
      })}
    </div>
  );
}
