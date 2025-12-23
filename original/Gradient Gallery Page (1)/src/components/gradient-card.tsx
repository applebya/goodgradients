import { motion } from 'motion/react';
import { Heart, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';
import type { Gradient } from './gradient-app';
import { getBestTextColor, getGradientMainColor } from '../lib/contrast-utils';
import { getGradientCSS, type GradientType } from '../lib/gradient-utils';

interface GradientCardProps {
  gradient: Gradient;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onSelect: (gradient: Gradient) => void;
  index?: number;
  globalAngle?: number;
  globalType?: GradientType;
}

export function GradientCard({ 
  gradient, 
  isFavorite, 
  onToggleFavorite, 
  onSelect, 
  index = 0,
  globalAngle = 135,
  globalType = 'linear'
}: GradientCardProps) {
  const fireConfetti = () => {
    const colors = gradient.colors;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const gradientCSS = getGradientCSS(gradient.gradient, globalType, globalAngle);
    navigator.clipboard.writeText(gradientCSS);
    toast.success('CSS copied to clipboard!');
    fireConfetti();
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(gradient.id);
    if (!isFavorite) {
      fireConfetti();
    }
  };

  // Get WCAG-compliant text color for the gradient
  const mainColor = getGradientMainColor(gradient.gradient);
  const bestTextColor = getBestTextColor(mainColor);
  
  // Apply global controls to gradient
  const displayGradient = getGradientCSS(gradient.gradient, globalType, globalAngle);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.2,
        delay: index * 0.01,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all cursor-pointer relative"
      onClick={() => onSelect(gradient)}
      style={{
        animation: 'border-shine-hover 2s ease-in-out infinite paused'
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.animationPlayState = 'running';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.animationPlayState = 'paused';
      }}
    >
      {/* Gradient Preview */}
      <div className="relative aspect-video" style={{ background: displayGradient }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-3 left-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              style={{ 
                backgroundColor: bestTextColor === '#ffffff' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)',
                color: bestTextColor,
                border: 'none'
              }}
              className="flex-1 backdrop-blur-sm hover:opacity-90 shadow-lg"
              onClick={handleCopy}
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy CSS
            </Button>
            <Button
              size="sm"
              variant="secondary"
              style={{ 
                backgroundColor: bestTextColor === '#ffffff' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)',
                color: isFavorite ? '#ef4444' : bestTextColor,
                border: 'none'
              }}
              className="backdrop-blur-sm hover:opacity-90 shadow-lg"
              onClick={handleFavorite}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white">{gradient.name}</h3>
          <Badge variant="secondary" className="bg-white/10 text-white border-0">
            {gradient.category}
          </Badge>
        </div>
        
        <p className="text-sm text-neutral-400 mb-3 line-clamp-2">
          {gradient.description}
        </p>

        {/* Color Swatches */}
        <div className="flex gap-2 mb-3">
          {gradient.colors.map((color, index) => (
            <div key={index} className="flex items-center gap-1.5 flex-1">
              <div
                className="w-6 h-6 rounded-md border border-white/20"
                style={{ background: color }}
              />
              <span className="text-xs text-neutral-500 font-mono">{color}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap">
          {gradient.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-white/10 text-neutral-400 bg-transparent"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}