import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GradientCard } from './GradientCard';
import { gradients, getGradientsByCategory } from '@/data/gradients';
import type { Gradient, GradientType, GradientCategory } from '@/types';

interface GradientGalleryProps {
  category: GradientCategory | 'All' | 'Favorites' | 'Animated';
  searchQuery: string;
  favorites: string[];
  gradientType: GradientType;
  gradientAngle: number;
  onSelectGradient: (gradient: Gradient) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export function GradientGallery({
  category,
  searchQuery,
  favorites,
  gradientType,
  gradientAngle,
  onSelectGradient,
  onToggleFavorite,
  isFavorite,
}: GradientGalleryProps) {
  const filteredGradients = useMemo(() => {
    let result: Gradient[];

    // Apply category filter first
    if (category === 'Favorites') {
      result = gradients.filter((g) => favorites.includes(g.id));
    } else if (category === 'Animated') {
      result = gradients.filter((g) => g.tags.includes('animated'));
    } else if (category === 'All') {
      result = gradients;
    } else {
      result = getGradientsByCategory(category);
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
  }, [category, searchQuery, favorites]);

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
        {filteredGradients.map((gradient, index) => (
          <GradientCard
            key={gradient.id}
            gradient={gradient}
            index={index}
            isFavorite={isFavorite(gradient.id)}
            onToggleFavorite={onToggleFavorite}
            onSelect={onSelectGradient}
            gradientType={gradientType}
            gradientAngle={gradientAngle}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
