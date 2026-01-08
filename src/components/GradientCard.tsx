import { memo, useCallback } from 'react';
import { Heart } from './icons';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { transformGradient } from '@/lib/gradient';
import { convertColor } from '@/lib/color-format';
import type { GradientPreset, UIPreviewMode, GradientTypeFilter, ColorFormat } from '@/types';

interface GradientCardProps {
  gradient: GradientPreset;
  gradientType: GradientTypeFilter;
  previewMode: UIPreviewMode;
  colorFormat: ColorFormat;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: (gradient: GradientPreset) => void;
}

export const GradientCard = memo(function GradientCard({
  gradient,
  gradientType,
  previewMode,
  colorFormat,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: GradientCardProps) {
  // Transform gradient to the selected type (linear/radial/conic)
  const displayGradient = transformGradient(gradient.gradient, gradientType, 135);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(gradient);
    }
  };

  const handleCopyColor = useCallback((e: React.MouseEvent, color: string) => {
    e.stopPropagation();
    const formattedColor = convertColor(color, colorFormat);
    navigator.clipboard.writeText(formattedColor);
  }, [colorFormat]);

  // Render the preview content based on mode
  const renderPreviewContent = () => {
    switch (previewMode) {
      case 'button':
        return (
          <div className="flex items-center justify-center h-full">
            <div
              className="px-6 py-2.5 rounded-lg text-white font-medium text-sm shadow-lg"
              style={{ background: displayGradient }}
            >
              Click me
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="flex items-center justify-center h-full">
            <span
              className="text-3xl font-bold"
              style={{
                background: displayGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Gradient
            </span>
          </div>
        );
      case 'badge':
        return (
          <div className="flex items-center justify-center h-full gap-2">
            <span
              className="px-3 py-1 rounded-full text-white text-xs font-medium"
              style={{ background: displayGradient }}
            >
              New
            </span>
            <span
              className="px-3 py-1 rounded-full text-white text-xs font-medium"
              style={{ background: displayGradient }}
            >
              Featured
            </span>
          </div>
        );
      case 'background':
      default:
        return null; // Background mode just uses the container background
    }
  };

  return (
    <article
      data-testid="gradient-card"
      tabIndex={0}
      aria-label={`${gradient.name} gradient - ${gradient.description}`}
      className={cn(
        'group bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden card-shimmer',
        'hover:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors cursor-pointer'
      )}
      onClick={() => onSelect(gradient)}
      onKeyDown={handleKeyDown}
    >
      {/* Gradient Preview */}
      <div
        className="relative aspect-video"
        style={{ background: previewMode === 'background' ? displayGradient : '#171717' }}
      >
        {renderPreviewContent()}
        {/* Favorite button - visible on hover/focus or when favorited */}
        <Button
          size="icon-sm"
          variant="ghost"
          className={cn(
            'absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 transition-all',
            isFavorite
              ? 'text-red-400 opacity-100'
              : 'text-white/70 hover:text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
          )}
          onClick={handleFavorite}
          aria-label={isFavorite ? `Remove ${gradient.name} from favorites` : `Add ${gradient.name} to favorites`}
        >
          <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
        </Button>
      </div>

      {/* Card Content - with shimmer overlay */}
      <div className="p-4 relative card-shimmer-content">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-medium">{gradient.name}</h3>
          <Badge variant="secondary">{gradient.category}</Badge>
        </div>

        <p className="text-sm text-neutral-400 mb-3 line-clamp-2">
          {gradient.description}
        </p>

        {/* Color Swatches - clickable to copy */}
        <div className="flex gap-2 mb-3">
          {gradient.colors.slice(0, 3).map((color, i) => (
            <button
              key={i}
              onClick={(e) => handleCopyColor(e, color)}
              className="flex items-center gap-1.5 flex-1 min-w-0 group/color hover:bg-white/5 rounded-md p-1 -m-1 transition-colors"
              title={`Copy ${convertColor(color, colorFormat)}`}
            >
              <div
                className="w-5 h-5 rounded-md border border-white/20 flex-shrink-0 group-hover/color:border-white/40 transition-colors"
                style={{ background: color }}
              />
              <span className="text-xs text-neutral-400 font-mono truncate group-hover/color:text-neutral-300 transition-colors">
                {convertColor(color, colorFormat)}
              </span>
            </button>
          ))}
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap">
          {gradient.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
});
