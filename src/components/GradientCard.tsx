import { memo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Copy } from './icons';
import { toast } from './Toast';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn, copyToClipboard } from '@/lib/utils';
import { getBestTextColor, getGradientAverageColor } from '@/lib/contrast';
import type { GradientPreset } from '@/types';

interface GradientCardProps {
  gradient: GradientPreset;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: (gradient: GradientPreset) => void;
  index?: number;
}

export const GradientCard = memo(function GradientCard({
  gradient,
  isFavorite,
  onToggleFavorite,
  onSelect,
  index = 0,
}: GradientCardProps) {
  // Use the gradient CSS as-is from the preset
  const displayGradient = gradient.gradient;
  const avgColor = getGradientAverageColor(gradient.colors);
  const textColor = getBestTextColor(avgColor);
  const buttonBg = textColor === '#ffffff' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)';

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(displayGradient);
    if (success) {
      toast.success('CSS copied to clipboard');
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.15,
        delay: Math.min(index * 0.01, 0.2),
      }}
      data-testid="gradient-card"
      className={cn(
        'group bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden',
        'hover:border-neutral-600 transition-colors cursor-pointer'
      )}
      onClick={() => onSelect(gradient)}
    >
      {/* Gradient Preview */}
      <div className="relative aspect-video" style={{ background: displayGradient }}>
        {/* Always-visible favorite indicator */}
        {isFavorite && (
          <div className="absolute top-3 right-3 z-10">
            <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </div>
          </div>
        )}

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-3 left-3 right-3 flex gap-2">
            <Button
              size="sm"
              style={{ backgroundColor: buttonBg, color: textColor }}
              className="flex-1 shadow-lg hover:opacity-90"
              onClick={handleCopy}
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy CSS
            </Button>
            <Button
              size="icon-sm"
              style={{
                backgroundColor: buttonBg,
                color: isFavorite ? '#EF4444' : textColor,
              }}
              className="shadow-lg hover:opacity-90"
              onClick={handleFavorite}
            >
              <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
            </Button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-medium">{gradient.name}</h3>
          <Badge variant="secondary">{gradient.category}</Badge>
        </div>

        <p className="text-sm text-neutral-400 mb-3 line-clamp-2">
          {gradient.description}
        </p>

        {/* Color Swatches */}
        <div className="flex gap-2 mb-3">
          {gradient.colors.slice(0, 3).map((color, i) => (
            <div key={i} className="flex items-center gap-1.5 flex-1 min-w-0">
              <div
                className="w-5 h-5 rounded-md border border-white/20 flex-shrink-0"
                style={{ background: color }}
              />
              <span className="text-xs text-neutral-500 font-mono truncate">
                {color}
              </span>
            </div>
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
    </motion.div>
  );
});
