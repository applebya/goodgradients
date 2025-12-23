import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import {
  Copy,
  Heart,
  Share2,
  Check,
  X,
  Play,
  Pause,
  Layers,
  Circle,
  RotateCw,
  Maximize2,
  Minus,
  Plus,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { cn, copyToClipboard } from '@/lib/utils';
import { transformGradient } from '@/lib/gradient';
import { exportVanillaCSS, exportTailwind, exportAIDescription } from '@/lib/export';
import { getGradientAverageColor, getContrastInfoForBackground, formatContrastRatio } from '@/lib/contrast';
import { animations, getAnimationById } from '@/data/animations';
import type { Gradient, GradientType } from '@/types';

interface GradientDetailProps {
  gradient: Gradient | null;
  isOpen: boolean;
  onClose: () => void;
  gradientType: GradientType;
  gradientAngle: number;
  selectedAnimationId: string | null;
  isAnimating: boolean;
  isFavorite: boolean;
  onGradientTypeChange: (type: GradientType) => void;
  onAngleChange: (angle: number) => void;
  onAnimationChange: (id: string | null) => void;
  onToggleAnimating: () => void;
  onToggleFavorite: () => void;
  onShare: () => string;
}

export function GradientDetail({
  gradient,
  isOpen,
  onClose,
  gradientType,
  gradientAngle,
  selectedAnimationId,
  isAnimating,
  isFavorite,
  onGradientTypeChange,
  onAngleChange,
  onAnimationChange,
  onToggleAnimating,
  onToggleFavorite,
  onShare,
}: GradientDetailProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1); // 1 = normal, 0.5 = slow, 2 = fast
  const [isFullscreen, setIsFullscreen] = useState(false);

  const animation = selectedAnimationId ? getAnimationById(selectedAnimationId) : undefined;

  // Parse animation properties
  const getAnimationStyle = useCallback(() => {
    if (!animation || !isAnimating) return {};

    // Extract animation name and timing from property string
    const animMatch = animation.property.match(/animation:\s*([^;]+)/);
    const bgSizeMatch = animation.property.match(/background-size:\s*([^;]+)/);

    if (animMatch && animMatch[1]) {
      // Parse the animation value and adjust speed
      const animParts = animMatch[1].trim().split(/\s+/);
      const name = animParts[0];
      const duration = animParts[1] || '3s';
      const timing = animParts[2] || 'ease';
      const iteration = animParts[3] || 'infinite';

      // Adjust duration based on speed
      const durationMs = parseFloat(duration) * 1000 / animationSpeed;

      return {
        backgroundSize: bgSizeMatch ? bgSizeMatch[1] : undefined,
        animation: `${name} ${durationMs}ms ${timing} ${iteration}`,
      };
    }
    return {};
  }, [animation, isAnimating, animationSpeed]);

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
      toast.success('Share URL copied to clipboard');
    }
  }, [onShare]);

  if (!gradient) return null;

  const displayGradient = transformGradient(gradient.gradient, gradientType, gradientAngle);
  const avgColor = getGradientAverageColor(gradient.colors);
  const contrastInfo = getContrastInfoForBackground(avgColor);

  const cssExport = exportVanillaCSS(gradient, gradientType, gradientAngle, animation);
  const tailwindExport = exportTailwind(gradient, gradientType, gradientAngle, animation);
  const aiExport = exportAIDescription(gradient, gradientType, gradientAngle, animation);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {gradient.name}
            <Badge variant="secondary" className="ml-2">
              {gradient.category}
            </Badge>
          </DialogTitle>
          <DialogDescription>{gradient.description}</DialogDescription>
        </DialogHeader>

        {/* Preview */}
        <div
          className={cn(
            'rounded-xl relative overflow-hidden transition-all duration-300',
            isFullscreen ? 'fixed inset-4 z-50 h-auto' : 'h-48'
          )}
          style={{
            background: displayGradient,
            ...getAnimationStyle(),
          }}
        >
          {/* Controls overlay */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="icon-sm"
              variant="ghost"
              className="bg-black/40 text-white hover:bg-black/60"
              onClick={onToggleAnimating}
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              size="icon-sm"
              variant="ghost"
              className={cn('bg-black/40 hover:bg-black/60', isFavorite ? 'text-red-400' : 'text-white')}
              onClick={onToggleFavorite}
            >
              <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
            </Button>
            <Button
              size="icon-sm"
              variant="ghost"
              className="bg-black/40 text-white hover:bg-black/60"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              size="icon-sm"
              variant="ghost"
              className="bg-black/40 text-white hover:bg-black/60"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Animation badge and speed controls */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            {animation && (
              <Badge className="bg-black/60 text-white border-0">
                {animation.name}
              </Badge>
            )}
            {animation && (
              <div className="flex items-center gap-2 bg-black/60 rounded-full px-2 py-1">
                <Button
                  size="icon-xs"
                  variant="ghost"
                  className="text-white h-5 w-5"
                  onClick={() => setAnimationSpeed(Math.max(0.25, animationSpeed - 0.25))}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="text-xs text-white min-w-[3ch] text-center">{animationSpeed}x</span>
                <Button
                  size="icon-xs"
                  variant="ghost"
                  className="text-white h-5 w-5"
                  onClick={() => setAnimationSpeed(Math.min(3, animationSpeed + 0.25))}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>

          {/* Fullscreen close hint */}
          {isFullscreen && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-black/60 text-white border-0">
                Click Maximize or press Escape to exit
              </Badge>
            </div>
          )}
        </div>

        {/* Fullscreen backdrop */}
        {isFullscreen && (
          <div
            className="fixed inset-0 bg-black/80 z-40"
            onClick={() => setIsFullscreen(false)}
          />
        )}

        {/* Gradient Controls */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={gradientType === 'linear' ? 'default' : 'outline'}
            onClick={() => onGradientTypeChange('linear')}
            className="flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Linear
          </Button>
          <Button
            variant={gradientType === 'radial' ? 'default' : 'outline'}
            onClick={() => onGradientTypeChange('radial')}
            className="flex items-center gap-2"
          >
            <Circle className="w-4 h-4" />
            Radial
          </Button>
          <Button
            variant={gradientType === 'conic' ? 'default' : 'outline'}
            onClick={() => onGradientTypeChange('conic')}
            className="flex items-center gap-2"
          >
            <RotateCw className="w-4 h-4" />
            Conic
          </Button>
        </div>

        {/* Angle slider for linear/conic */}
        {(gradientType === 'linear' || gradientType === 'conic') && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Angle</span>
              <span className="text-white">{gradientAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={gradientAngle}
              onChange={(e) => onAngleChange(Number(e.target.value))}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex gap-1">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <button
                  key={angle}
                  onClick={() => onAngleChange(angle)}
                  className={cn(
                    'flex-1 text-xs py-1 rounded border transition-all',
                    gradientAngle === angle
                      ? 'border-white bg-neutral-800 text-white'
                      : 'border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-white'
                  )}
                >
                  {angle}°
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Animation Selection */}
        <div className="space-y-2">
          <label className="text-sm text-neutral-400">Animation</label>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => onAnimationChange(null)}
              className={cn(
                'text-xs py-2 px-3 rounded border transition-all',
                !selectedAnimationId
                  ? 'border-white bg-neutral-800 text-white'
                  : 'border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-white'
              )}
            >
              None
            </button>
            {animations.slice(0, 7).map((anim) => (
              <button
                key={anim.id}
                onClick={() => onAnimationChange(anim.id)}
                className={cn(
                  'text-xs py-2 px-3 rounded border transition-all truncate',
                  selectedAnimationId === anim.id
                    ? 'border-white bg-neutral-800 text-white'
                    : 'border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-white'
                )}
              >
                {anim.name}
              </button>
            ))}
          </div>
        </div>

        {/* Export Tabs */}
        <Tabs defaultValue="usecases" className="w-full">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="usecases">Use Cases</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
            <TabsTrigger value="ai">AI Desc</TabsTrigger>
            <TabsTrigger value="wcag">WCAG</TabsTrigger>
          </TabsList>

          <TabsContent value="usecases" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Background Example */}
              <div className="space-y-2">
                <p className="text-xs text-neutral-400 font-medium">Background</p>
                <div
                  className="rounded-xl p-6 flex flex-col items-center justify-center min-h-[120px]"
                  style={{ background: displayGradient, ...getAnimationStyle() }}
                >
                  <p className="text-white font-semibold text-lg drop-shadow-md">Hero Section</p>
                  <p className="text-white/80 text-sm drop-shadow">Beautiful gradient background</p>
                </div>
              </div>

              {/* Card Example */}
              <div className="space-y-2">
                <p className="text-xs text-neutral-400 font-medium">Card</p>
                <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-700">
                  <div
                    className="h-16 rounded-lg mb-3"
                    style={{ background: displayGradient, ...getAnimationStyle() }}
                  />
                  <h4 className="text-white font-medium">Card Title</h4>
                  <p className="text-neutral-400 text-sm">Content with gradient accent</p>
                </div>
              </div>

              {/* Button Examples */}
              <div className="space-y-2">
                <p className="text-xs text-neutral-400 font-medium">Buttons</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="px-4 py-2 rounded-lg text-white font-medium text-sm shadow-lg"
                    style={{ background: displayGradient }}
                  >
                    Primary Action
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-transparent font-medium text-sm bg-clip-text"
                    style={{ backgroundImage: displayGradient }}
                  >
                    Gradient Text
                  </button>
                </div>
              </div>

              {/* Text Example */}
              <div className="space-y-2">
                <p className="text-xs text-neutral-400 font-medium">Text & Border</p>
                <div className="space-y-3">
                  <h3
                    className="text-2xl font-bold bg-clip-text text-transparent"
                    style={{ backgroundImage: displayGradient }}
                  >
                    Gradient Heading
                  </h3>
                  <div
                    className="p-3 rounded-lg border-2"
                    style={{ borderImage: `${displayGradient} 1` }}
                  >
                    <p className="text-neutral-300 text-sm">Border gradient example</p>
                  </div>
                </div>
              </div>

              {/* Badge/Tag Examples */}
              <div className="space-y-2">
                <p className="text-xs text-neutral-400 font-medium">Badges & Tags</p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-white text-xs font-medium"
                    style={{ background: displayGradient }}
                  >
                    Featured
                  </span>
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
                    Pro
                  </span>
                </div>
              </div>

              {/* Avatar/Icon Example */}
              <div className="space-y-2">
                <p className="text-xs text-neutral-400 font-medium">Avatar & Icons</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: displayGradient }}
                  >
                    JD
                  </div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: displayGradient }}
                  >
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center"
                    style={{ background: displayGradient }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="css">
            <div className="relative">
              <pre className="bg-black/50 border border-neutral-700 rounded-lg p-4 overflow-x-auto text-sm text-neutral-300">
                <code>{cssExport.code}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-white"
                onClick={() => handleCopy(cssExport.code, 'css')}
              >
                {copiedId === 'css' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="tailwind">
            <div className="relative">
              <pre className="bg-black/50 border border-neutral-700 rounded-lg p-4 overflow-x-auto text-sm text-neutral-300">
                <code>{tailwindExport.code}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-white"
                onClick={() => handleCopy(tailwindExport.code, 'tailwind')}
              >
                {copiedId === 'tailwind' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="relative">
              <pre className="bg-black/50 border border-neutral-700 rounded-lg p-4 overflow-x-auto text-sm text-neutral-300 whitespace-pre-wrap">
                <code>{aiExport.code}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-white"
                onClick={() => handleCopy(aiExport.code, 'ai')}
              >
                {copiedId === 'ai' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="wcag">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg">
                <div className="w-12 h-12 rounded-lg" style={{ background: avgColor }} />
                <div>
                  <p className="text-xs text-neutral-400">Average Color</p>
                  <p className="text-sm text-white font-mono">{avgColor}</p>
                </div>
              </div>

              <div className="space-y-2">
                {contrastInfo.map((info) => (
                  <div
                    key={info.color}
                    className="flex items-center justify-between p-3 bg-neutral-800/30 border border-neutral-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded flex items-center justify-center text-sm font-medium"
                        style={{ background: displayGradient, color: info.color }}
                      >
                        Aa
                      </div>
                      <div>
                        <p className="text-sm text-white">{info.name}</p>
                        <p className="text-xs text-neutral-500">
                          {info.color} · {formatContrastRatio(info.ratio)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {[
                        { label: 'AA', pass: info.meetsAA },
                        { label: 'AA+', pass: info.meetsAALarge },
                        { label: 'AAA', pass: info.meetsAAA },
                      ].map(({ label, pass }) => (
                        <div key={label} className="flex items-center gap-1">
                          {pass ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <X className="w-3 h-3 text-neutral-600" />
                          )}
                          <span className={cn('text-xs', pass ? 'text-green-500' : 'text-neutral-600')}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Colors */}
        <div className="flex gap-2 flex-wrap">
          {gradient.colors.map((color, i) => (
            <button
              key={i}
              onClick={() => handleCopy(color, `color-${i}`)}
              className="flex items-center gap-2 px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg hover:border-neutral-600 transition-colors"
            >
              <div className="w-5 h-5 rounded" style={{ background: color }} />
              <span className="text-sm font-mono text-neutral-300">{color}</span>
              {copiedId === `color-${i}` ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 text-neutral-500" />
              )}
            </button>
          ))}
        </div>
      </DialogContent>

      {/* Inject keyframes */}
      {animation && (
        <style dangerouslySetInnerHTML={{ __html: animation.keyframes }} />
      )}
    </Dialog>
  );
}
