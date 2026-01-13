import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { GradientCard, SkeletonCard } from './GradientCard';
import { gradients } from '@/data/gradients';
import { encodeGradient, parseGradientCSS } from '@/lib/gradient-url';
import { filterGradientsByColors } from '@/lib/wizard';
import type { GradientPreset, GradientCategory, WizardColor, GradientTypeFilter, UIPreviewMode, ColorFormat } from '@/types';

interface GradientGalleryProps {
  category: GradientCategory | 'All' | 'Favorites';
  searchQuery: string;
  colors: WizardColor[];
  tags: string[];
  gradientType: GradientTypeFilter;
  previewMode: UIPreviewMode;
  colorFormat: ColorFormat;
  selectedAnimationId: string | null;
  favorites: string[]; // Encoded gradient definitions
  onSelectGradient: (gradient: GradientPreset) => void;
  onToggleFavorite: (encodedGradient: string) => void;
  isFavorite: (encodedGradient: string) => boolean;
}

// Pre-compute encoded gradients once at module load for performance
const encodedGradientMap = new Map<string, string>();
gradients.forEach((g) => {
  const def = parseGradientCSS(g.gradient);
  if (def) {
    encodedGradientMap.set(g.id, encodeGradient(def));
  }
});

function getEncodedGradient(preset: GradientPreset): string | null {
  return encodedGradientMap.get(preset.id) ?? null;
}

// Hook to get responsive column count
function useColumnCount() {
  const [columns, setColumns] = useState(() => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    if (width < 1280) return 3;
    return 4;
  });

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else if (width < 1280) setColumns(3);
      else setColumns(4);
    };

    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return columns;
}

// Threshold for when to use virtualization (only for large lists)
const VIRTUALIZATION_THRESHOLD = 100;

export function GradientGallery({
  category,
  searchQuery,
  colors,
  tags,
  gradientType,
  previewMode,
  colorFormat,
  selectedAnimationId,
  favorites,
  onSelectGradient,
  onToggleFavorite,
  isFavorite,
}: GradientGalleryProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const columns = useColumnCount();
  const [isHydrated, setIsHydrated] = useState(false);

  // Brief skeleton display on initial mount for smooth perceived loading
  useEffect(() => {
    // Use requestAnimationFrame to ensure we show skeleton for at least one frame
    const frame = requestAnimationFrame(() => {
      setIsHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const filteredGradients = useMemo(() => {
    let result: GradientPreset[] = gradients;

    // Apply category filter first
    if (category === 'Favorites') {
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
  }, [category, searchQuery, colors, tags, favorites]);

  // Calculate row count for virtualization
  const rowCount = Math.ceil(filteredGradients.length / columns);
  const useVirtualization = filteredGradients.length > VIRTUALIZATION_THRESHOLD;

  // Window virtualizer for large lists
  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: useCallback(() => 220, []), // Row height estimate
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
    enabled: useVirtualization,
  });

  // Show skeleton grid during initial hydration
  if (!isHydrated) {
    const skeletonCount = columns * 3; // 3 rows of skeletons
    return (
      <section aria-label="Loading gradients">
        <header className="mb-6">
          <div className="h-8 w-64 rounded loading-shimmer mb-2" />
          <div className="h-4 w-32 rounded loading-shimmer" />
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

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

  // For small lists, render without virtualization
  if (!useVirtualization) {
    return (
      <section aria-label="Gradient gallery">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredGradients.map((gradient) => {
            const encoded = getEncodedGradient(gradient);
            return (
              <GradientCard
                key={gradient.id}
                gradient={gradient}
                gradientType={gradientType}
                previewMode={previewMode}
                colorFormat={colorFormat}
                selectedAnimationId={selectedAnimationId}
                isFavorite={encoded ? isFavorite(encoded) : false}
                onToggleFavorite={() => encoded && onToggleFavorite(encoded)}
                onSelect={onSelectGradient}
              />
            );
          })}
        </div>
      </section>
    );
  }

  // Virtualized rendering for large lists
  const virtualItems = virtualizer.getVirtualItems();

  return (
    <section aria-label="Gradient gallery">
      <div ref={listRef}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualItems.map((virtualRow) => {
            const startIndex = virtualRow.index * columns;
            const rowGradients = filteredGradients.slice(startIndex, startIndex + columns);

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
                  {rowGradients.map((gradient) => {
                    const encoded = getEncodedGradient(gradient);
                    return (
                      <GradientCard
                        key={gradient.id}
                        gradient={gradient}
                        gradientType={gradientType}
                        previewMode={previewMode}
                        colorFormat={colorFormat}
                        selectedAnimationId={selectedAnimationId}
                        isFavorite={encoded ? isFavorite(encoded) : false}
                        onToggleFavorite={() => encoded && onToggleFavorite(encoded)}
                        onSelect={onSelectGradient}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
