import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GradientCard } from './GradientCard';
import { gradients } from '@/data/gradients';
import { encodeGradient, parseGradientCSS } from '@/lib/gradient-url';
import type { GradientPreset, GradientCategory } from '@/types';

interface GradientGalleryProps {
  category: GradientCategory | 'All' | 'Favorites';
  searchQuery: string;
  favorites: string[]; // Encoded gradient definitions
  onSelectGradient: (gradient: GradientPreset) => void;
  onToggleFavorite: (encodedGradient: string) => void;
  isFavorite: (encodedGradient: string) => boolean;
  wizardFilteredGradients?: GradientPreset[]; // Optional: wizard-filtered gradients take priority
}

/**
 * Get encoded gradient string from a preset for favorites comparison
 */
function getEncodedGradient(preset: GradientPreset): string | null {
  const def = parseGradientCSS(preset.gradient);
  return def ? encodeGradient(def) : null;
}

export function GradientGallery({
  category,
  searchQuery,
  favorites,
  onSelectGradient,
  onToggleFavorite,
  isFavorite,
  wizardFilteredGradients,
}: GradientGalleryProps) {
  const filteredGradients = useMemo(() => {
    // Start with wizard-filtered gradients if provided, otherwise use all gradients
    let baseGradients = wizardFilteredGradients ?? gradients;
    let result: GradientPreset[];

    // Apply category filter first
    if (category === 'Favorites') {
      // Filter by encoded gradient definitions in favorites
      result = baseGradients.filter((g) => {
        const encoded = getEncodedGradient(g);
        return encoded && favorites.includes(encoded);
      });
    } else if (category === 'All') {
      result = baseGradients;
    } else {
      // When using wizard filters with a category, filter from the base
      result = baseGradients.filter((g) => g.category === category);
    }

    // Then apply search filter
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
  }, [category, searchQuery, favorites, wizardFilteredGradients]);

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
            : 'Try adjusting your search or category filter.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {filteredGradients.map((gradient, index) => {
          const encoded = getEncodedGradient(gradient);
          return (
            <GradientCard
              key={gradient.id}
              gradient={gradient}
              index={index}
              isFavorite={encoded ? isFavorite(encoded) : false}
              onToggleFavorite={() => encoded && onToggleFavorite(encoded)}
              onSelect={onSelectGradient}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
