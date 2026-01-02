import { useState, useCallback, useMemo } from 'react';
import { toast } from './Toast';
import {
  Copy,
  Heart,
  Share2,
  Check,
  Layers,
  Circle,
  RotateCw,
  Maximize2,
  ChevronRight,
  Zap,
  Play,
  Pause,
} from './icons';
import { animations, animationCategories, getAnimationById } from '@/data/animations';
import type { Animation } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn, copyToClipboard } from '@/lib/utils';
import { getGradientAverageColor, getContrastInfoForBackground, formatContrastRatio } from '@/lib/contrast';
import { encodeGradient, gradientToCSS, getGradientColors } from '@/lib/gradient-url';
import type { GradientDefinition, GradientType } from '@/lib/gradient-url';

interface GradientDetailProps {
  gradientDef: GradientDefinition | null;
  encodedGradient: string | null;
  isOpen: boolean;
  onClose: () => void;
  selectedAnimationId: string | null;
  isAnimating: boolean;
  isFavorite: boolean;
  onGradientChange: (encoded: string) => void;
  onAnimationChange: (id: string | null) => void;
  onToggleAnimating: () => void;
  onToggleFavorite: () => void;
  onShare: () => string;
}

export function GradientDetail({
  gradientDef,
  isOpen,
  onClose,
  selectedAnimationId,
  isAnimating,
  isFavorite,
  onGradientChange,
  onAnimationChange,
  onToggleAnimating,
  onToggleFavorite,
  onShare,
}: GradientDetailProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationCategory, setAnimationCategory] = useState<string>('All');

  // Get selected animation
  const selectedAnimation = selectedAnimationId ? getAnimationById(selectedAnimationId) : undefined;

  // Filter animations by category
  const filteredAnimations = useMemo(() => {
    if (animationCategory === 'All') return animations;
    return animations.filter(a => a.category === animationCategory);
  }, [animationCategory]);

  // Helper to get animation inline styles
  const getAnimationStyle = useCallback((animation: Animation | undefined): React.CSSProperties => {
    if (!animation || !isAnimating) {
      return {};
    }

    // Parse the property string to extract animation value
    const animMatch = animation.property.match(/animation:\s*([^;]+);?/);
    const animValue = animMatch ? animMatch[1] : undefined;

    // Check if needs expanded background-size
    const bgSizeMatch = animation.property.match(/background-size:\s*([^;]+);?/);
    const bgSize = bgSizeMatch ? bgSizeMatch[1] : undefined;

    return {
      ...(bgSize ? { backgroundSize: bgSize } : {}),
      ...(animValue ? { animation: animValue } : {}),
    };
  }, [isAnimating]);

  const handleCopy = useCallback(
    async (text: string, id: string) => {
      const success = await copyToClipboard(text);
      if (success) {
        setCopiedId(id);
        toast.success('Copied to clipboard');
        setTimeout(() => setCopiedId(null), 2000);
      }
    },
    []
  );

  const handleShare = useCallback(async () => {
    const url = onShare();
    const success = await copyToClipboard(url);
    if (success) {
      toast.success('Share URL copied');
    }
  }, [onShare]);

  const handleTypeChange = useCallback((type: GradientType) => {
    if (!gradientDef) return;
    const newDef = { ...gradientDef, type };
    onGradientChange(encodeGradient(newDef));
  }, [gradientDef, onGradientChange]);

  const handleAngleChange = useCallback((angle: number) => {
    if (!gradientDef) return;
    const newDef = { ...gradientDef, angle };
    onGradientChange(encodeGradient(newDef));
  }, [gradientDef, onGradientChange]);

  if (!gradientDef) return null;

  const displayGradient = gradientToCSS(gradientDef);
  const colors = getGradientColors(gradientDef);
  const avgColor = getGradientAverageColor(colors);
  const contrastInfo = getContrastInfoForBackground(avgColor);

  // Get best text colors
  const bestTextColors = contrastInfo
    .filter(c => c.meetsAA)
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 2);

  // Generate export code
  const cssCode = selectedAnimation
    ? `background: ${displayGradient};\n${selectedAnimation.property}`
    : `background: ${displayGradient};`;

  const fullCSSCode = selectedAnimation
    ? `/* Gradient with Animation */\n${selectedAnimation.keyframes}\n\n.animated-gradient {\n  background: ${displayGradient};\n  ${selectedAnimation.property}\n}`
    : cssCode;

  // Tailwind: Use CSS variable approach or provide inline style
  const tailwindCode = `/* Add to your CSS/Tailwind config */
.bg-gradient-custom {
  background: ${displayGradient};
}

/* Or use inline style */
style={{ background: '${displayGradient}' }}`;

  // Fullscreen preview
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100]" onClick={() => setIsFullscreen(false)}>
        {/* Inject animation keyframes */}
        {selectedAnimation && (
          <style dangerouslySetInnerHTML={{ __html: selectedAnimation.keyframes }} />
        )}
        <div
          className="w-full h-full flex flex-col items-center justify-center p-8"
          style={{
            background: displayGradient,
            ...getAnimationStyle(selectedAnimation),
          }}
        >
          {/* Sample content */}
          <h1
            className="text-5xl font-bold mb-4 drop-shadow-lg"
            style={{ color: bestTextColors[0]?.color || '#ffffff' }}
          >
            Your Headline Here
          </h1>
          <p
            className="text-xl opacity-80 mb-8 max-w-md text-center drop-shadow"
            style={{ color: bestTextColors[0]?.color || '#ffffff' }}
          >
            This is how your content looks on this gradient background.
          </p>
          <div className="flex gap-4">
            <button
              className="px-6 py-3 rounded-lg font-medium shadow-lg"
              style={{
                background: bestTextColors[0]?.color || '#ffffff',
                color: avgColor
              }}
            >
              Primary Button
            </button>
            <button
              className="px-6 py-3 rounded-lg font-medium border-2"
              style={{
                borderColor: bestTextColors[0]?.color || '#ffffff',
                color: bestTextColors[0]?.color || '#ffffff'
              }}
            >
              Secondary
            </button>
          </div>

          {/* Text color suggestions */}
          <div className="absolute bottom-6 left-6 flex gap-2">
            <span className="text-xs opacity-60" style={{ color: bestTextColors[0]?.color || '#fff' }}>
              Recommended text:
            </span>
            {bestTextColors.map((tc, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); handleCopy(tc.color, `text-${i}`); }}
                className="flex items-center gap-1 px-2 py-1 rounded bg-black/30 backdrop-blur-sm"
              >
                <div className="w-3 h-3 rounded-full border border-white/30" style={{ background: tc.color }} />
                <span className="text-xs font-mono" style={{ color: tc.color }}>{tc.color}</span>
              </button>
            ))}
          </div>

          <div className="absolute bottom-6 right-6">
            <Badge className="bg-black/50 backdrop-blur-sm text-white border-0">
              Click anywhere to close
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-4 gap-3">
        {/* Header */}
        <DialogHeader className="pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-base">
              Gradient
              <Badge variant="secondary" className="text-xs">
                {gradientDef.type}
              </Badge>
            </DialogTitle>
            <div className="flex gap-1">
              <Button
                size="icon-sm"
                variant="ghost"
                className={cn('h-8 w-8', isFavorite && 'text-red-400')}
                onClick={onToggleFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
              </Button>
              <Button
                size="icon-sm"
                variant="ghost"
                className="h-8 w-8"
                onClick={handleShare}
                aria-label="Share gradient"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Inject animation keyframes for main modal */}
        {selectedAnimation && (
          <style dangerouslySetInnerHTML={{ __html: selectedAnimation.keyframes }} />
        )}

        {/* Preview with fullscreen option */}
        <div
          className="rounded-xl relative overflow-hidden h-28 cursor-pointer group"
          style={{
            background: displayGradient,
            ...getAnimationStyle(selectedAnimation),
          }}
          onClick={() => setIsFullscreen(true)}
        >
          {/* Text preview */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-lg font-semibold drop-shadow-md opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ color: bestTextColors[0]?.color || '#ffffff' }}
            >
              Click to preview fullscreen
            </span>
          </div>

          {/* Expand button */}
          <Button
            size="icon-xs"
            variant="ghost"
            className="absolute top-2 right-2 bg-black/40 text-white hover:bg-black/60 h-7 w-7"
            onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
            aria-label="Fullscreen preview"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>

          {/* Recommended text colors */}
          <div className="absolute bottom-2 left-2 flex gap-1.5">
            {bestTextColors.map((tc, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); handleCopy(tc.color, `text-${i}`); }}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-xs"
                title={`${tc.name}: ${formatContrastRatio(tc.ratio)} contrast`}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: tc.color }} />
                <span className="font-mono" style={{ color: tc.color }}>{tc.color}</span>
                {tc.meetsAAA && <Check className="w-2.5 h-2.5 text-green-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Use Cases - Most Prominent */}
        <div className="grid grid-cols-4 gap-2">
          {/* Background */}
          <div
            className="rounded-lg p-3 flex flex-col items-center justify-center min-h-[70px] cursor-pointer hover:scale-[1.02] transition-transform"
            style={{
              background: displayGradient,
              ...getAnimationStyle(selectedAnimation),
            }}
            onClick={() => setIsFullscreen(true)}
          >
            <span className="text-xs font-medium drop-shadow" style={{ color: bestTextColors[0]?.color || '#fff' }}>
              Background
            </span>
          </div>

          {/* Button */}
          <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-2">
            <button
              className="px-3 py-1.5 rounded text-xs font-medium text-white"
              style={{ background: displayGradient }}
            >
              Button
            </button>
          </div>

          {/* Text */}
          <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-2">
            <span
              className="text-lg font-bold bg-clip-text text-transparent"
              style={{ backgroundImage: displayGradient }}
            >
              Text
            </span>
          </div>

          {/* Badge */}
          <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-2">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] text-white font-medium"
              style={{ background: displayGradient }}
            >
              Badge
            </span>
          </div>
        </div>

        {/* Color chips - quick copy */}
        <div className="flex gap-1.5 flex-wrap">
          {colors.map((color, i) => (
            <button
              key={i}
              onClick={() => handleCopy(color, `color-${i}`)}
              className="flex items-center gap-1.5 px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded hover:border-neutral-500 transition-colors"
            >
              <div className="w-4 h-4 rounded" style={{ background: color }} />
              <span className="text-xs font-mono text-neutral-300">{color}</span>
              {copiedId === `color-${i}` && <Check className="w-3 h-3 text-green-500" />}
            </button>
          ))}
        </div>

        {/* Collapsible: Gradient Settings */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center justify-between w-full py-2 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <span>Gradient Settings</span>
          <ChevronRight className={cn('w-4 h-4 transition-transform', showSettings && 'rotate-90')} />
        </button>
        {showSettings && (
          <div className="space-y-3 pb-2">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={gradientDef.type === 'linear' ? 'default' : 'outline'}
                onClick={() => handleTypeChange('linear')}
                size="sm"
              >
                <Layers className="w-3 h-3 mr-1" /> Linear
              </Button>
              <Button
                variant={gradientDef.type === 'radial' ? 'default' : 'outline'}
                onClick={() => handleTypeChange('radial')}
                size="sm"
              >
                <Circle className="w-3 h-3 mr-1" /> Radial
              </Button>
              <Button
                variant={gradientDef.type === 'conic' ? 'default' : 'outline'}
                onClick={() => handleTypeChange('conic')}
                size="sm"
              >
                <RotateCw className="w-3 h-3 mr-1" /> Conic
              </Button>
            </div>
            {(gradientDef.type === 'linear' || gradientDef.type === 'conic') && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 w-12">Angle</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={gradientDef.angle}
                  onChange={(e) => handleAngleChange(Number(e.target.value))}
                  className="flex-1 h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
                <span className="text-xs text-white w-8 text-right">{gradientDef.angle}°</span>
              </div>
            )}
          </div>
        )}

        {/* Collapsible: Animation */}
        <button
          onClick={() => setShowAnimation(!showAnimation)}
          className="flex items-center justify-between w-full py-2 text-sm text-neutral-400 hover:text-white transition-colors border-t border-neutral-800 pt-3"
        >
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Animate Gradient
            {selectedAnimation && (
              <Badge variant="secondary" className="text-xs">
                {selectedAnimation.name}
              </Badge>
            )}
          </span>
          <div className="flex items-center gap-2">
            {selectedAnimation && (
              <Button
                size="icon-xs"
                variant="ghost"
                className="h-6 w-6"
                onClick={(e) => { e.stopPropagation(); onToggleAnimating(); }}
                aria-label={isAnimating ? 'Pause animation' : 'Play animation'}
              >
                {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </Button>
            )}
            <ChevronRight className={cn('w-4 h-4 transition-transform', showAnimation && 'rotate-90')} />
          </div>
        </button>
        {showAnimation && (
          <div className="space-y-3 pb-2">
            {/* Category filter pills */}
            <div className="flex gap-1.5 flex-wrap">
              {animationCategories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={animationCategory === cat ? 'default' : 'outline'}
                  onClick={() => setAnimationCategory(cat)}
                  className="text-xs px-2 py-0.5 h-6"
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Animation grid */}
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {/* "None" option to clear animation */}
              <button
                onClick={() => onAnimationChange(null)}
                className={cn(
                  'p-2 rounded-lg border text-left transition-all',
                  !selectedAnimationId
                    ? 'border-white bg-neutral-800'
                    : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
                )}
              >
                <p className="text-xs text-white font-medium">None</p>
                <p className="text-[10px] text-neutral-500">Static gradient</p>
              </button>

              {filteredAnimations.map((anim) => (
                <button
                  key={anim.id}
                  onClick={() => {
                    onAnimationChange(anim.id);
                    if (!isAnimating) onToggleAnimating();
                  }}
                  className={cn(
                    'p-2 rounded-lg border text-left transition-all',
                    selectedAnimationId === anim.id
                      ? 'border-white bg-neutral-800'
                      : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
                  )}
                >
                  <p className="text-xs text-white font-medium">{anim.name}</p>
                  <p className="text-[10px] text-neutral-500 line-clamp-1">{anim.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collapsible: Code Export */}
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center justify-between w-full py-2 text-sm text-neutral-400 hover:text-white transition-colors border-t border-neutral-800 pt-3"
        >
          <span>Copy Code</span>
          <ChevronRight className={cn('w-4 h-4 transition-transform', showCode && 'rotate-90')} />
        </button>
        {showCode && (
          <div className="space-y-2 pb-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCopy(cssCode, 'css')}
                className="flex items-center justify-between px-3 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <span className="text-sm text-white">CSS</span>
                {copiedId === 'css' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-neutral-400" />}
              </button>
              <button
                onClick={() => handleCopy(tailwindCode, 'tailwind')}
                className="flex items-center justify-between px-3 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <span className="text-sm text-white">Tailwind</span>
                {copiedId === 'tailwind' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-neutral-400" />}
              </button>
            </div>

            {/* Show full CSS with animation when animation is selected */}
            {selectedAnimation && (
              <button
                onClick={() => handleCopy(fullCSSCode, 'full-css')}
                className="w-full flex items-center justify-between px-3 py-2 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors"
              >
                <span className="text-sm text-white flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Full CSS with Animation
                </span>
                {copiedId === 'full-css' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-neutral-400" />}
              </button>
            )}
          </div>
        )}

        {/* Accessibility - Compact */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
          <span className="text-xs text-neutral-500">Accessibility:</span>
          {contrastInfo.slice(0, 2).map((info) => (
            <div
              key={info.color}
              className="flex items-center gap-1 px-2 py-1 bg-neutral-800/50 rounded text-xs"
            >
              <div className="w-3 h-3 rounded" style={{ background: info.color }} />
              <span className={cn(info.meetsAA ? 'text-green-400' : 'text-neutral-500')}>
                {info.meetsAAA ? 'AAA' : info.meetsAA ? 'AA' : 'Fail'}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
