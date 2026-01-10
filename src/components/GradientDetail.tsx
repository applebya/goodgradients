import { useState, useCallback, useEffect } from 'react';
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
  X,
  ChevronDown,
  Palette,
} from './icons';
import { animations, getAnimationById } from '@/data/animations';
import type { Animation, ColorFormat } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn, copyToClipboard } from '@/lib/utils';
import { getGradientAverageColor, getContrastInfoForBackground, getDiverseTextColors, formatContrastRatio } from '@/lib/contrast';
import { encodeGradient, gradientToCSS, getGradientColors } from '@/lib/gradient-url';
import type { GradientDefinition, GradientType } from '@/lib/gradient-url';
import { convertColor, convertGradientColors, COLOR_FORMAT_OPTIONS } from '@/lib/color-format';

interface GradientDetailProps {
  gradientDef: GradientDefinition | null;
  encodedGradient: string | null;
  isOpen: boolean;
  onClose: () => void;
  selectedAnimationId: string | null;
  isAnimating: boolean;
  isFavorite: boolean;
  colorFormat: ColorFormat;
  onGradientChange: (encoded: string) => void;
  onAnimationChange: (id: string | null) => void;
  onToggleAnimating: () => void;
  onToggleFavorite: () => void;
  onColorFormatChange: (format: ColorFormat) => void;
  onShare: () => string;
}

export function GradientDetail({
  gradientDef,
  isOpen,
  onClose,
  selectedAnimationId,
  isAnimating,
  isFavorite,
  colorFormat,
  onGradientChange,
  onAnimationChange,
  onToggleAnimating,
  onToggleFavorite,
  onColorFormatChange,
  onShare,
}: GradientDetailProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [codeTab, setCodeTab] = useState<'css' | 'swift' | 'kotlin' | 'ai'>('css');
  const [showSettings, setShowSettings] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // Reset fullscreen state when modal closes or gradient changes
  useEffect(() => {
    if (!isOpen) {
      setIsFullscreen(false);
    }
  }, [isOpen]);

  // Get selected animation
  const selectedAnimation = selectedAnimationId ? getAnimationById(selectedAnimationId) : undefined;

  // Helper to parse animation properties from the property string
  const parseAnimationStyle = useCallback((animation: Animation | undefined): React.CSSProperties => {
    if (!animation || !animation.property) {
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
  }, []);

  // Helper to get animation inline styles (respects isAnimating state)
  const getAnimationStyle = useCallback((animation: Animation | undefined): React.CSSProperties => {
    if (!animation || !isAnimating) {
      return {};
    }
    return parseAnimationStyle(animation);
  }, [isAnimating, parseAnimationStyle]);

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

  // Get best text colors - picks diverse options (one light, one dark)
  const bestTextColors = getDiverseTextColors(avgColor);

  // Convert gradient to selected color format
  const formattedGradient = convertGradientColors(displayGradient, colorFormat);
  const formattedColors = colors.map(c => convertColor(c, colorFormat));

  // Generate export code
  const cssCode = selectedAnimation
    ? `background: ${formattedGradient};\n${selectedAnimation.property}`
    : `background: ${formattedGradient};`;

  const fullCSSCode = selectedAnimation
    ? `/* Gradient with Animation */\n${selectedAnimation.keyframes}\n\n.animated-gradient {\n  background: ${formattedGradient};\n  ${selectedAnimation.property}\n}`
    : cssCode;

  // SwiftUI code
  const swiftUICode = `LinearGradient(
  gradient: Gradient(colors: [
    ${formattedColors.map(c => `Color(hex: "${c}")`).join(',\n    ')}
  ]),
  startPoint: .topLeading,
  endPoint: .bottomTrailing
)`;

  // Kotlin/Jetpack Compose code
  const kotlinCode = `Brush.linearGradient(
  colors = listOf(
    ${formattedColors.map(c => `Color(0xFF${c.replace('#', '').toUpperCase()})`).join(',\n    ')}
  ),
  start = Offset(0f, 0f),
  end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY)
)`;

  // AI Agent description
  const aiAgentCode = `A ${gradientDef.type} gradient with the following colors:
${formattedColors.map((c, i) => `- ${c} at ${gradientDef.stops[i]?.position ?? i * 100}%`).join('\n')}
${gradientDef.type === 'linear' || gradientDef.type === 'conic' ? `Angle: ${gradientDef.angle}°` : 'Radiates from center'}
${selectedAnimation ? `Animation: ${selectedAnimation.name} - ${selectedAnimation.description}` : ''}`.trim();

  return (
    <>
      {/* Fullscreen preview overlay - renders on top of dialog */}
      {isFullscreen && isOpen && (
        <div
          data-testid="fullscreen-overlay"
          className="fixed inset-0 z-[100] animate-fullscreen-fade-in"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Inject animation keyframes - sourced from internal animations.ts, safe */}
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
      )}

      {/* Main dialog */}
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-3 sm:p-4 gap-2 sm:gap-3" hideCloseButton>
        {/* Header */}
        <DialogHeader className="pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-base">
              Gradient
            </DialogTitle>
            <div className="flex items-center gap-1">
              <Button
                size="icon-sm"
                variant="ghost"
                className="h-8 w-8"
                onClick={handleShare}
                aria-label="Share gradient"
              >
                <Share2 className="w-4 h-4" />
              </Button>
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
                className="h-8 w-8 text-neutral-400 hover:text-white"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
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
        </div>

        {/* Recommended Text Color - Prominent */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 bg-neutral-800/60 rounded-lg border border-neutral-700">
          <span className="text-sm text-neutral-300 font-medium whitespace-nowrap">Best text colors:</span>
          <div className="flex flex-wrap gap-2 flex-1">
            {bestTextColors.map((tc, i) => (
              <button
                key={i}
                onClick={() => handleCopy(tc.color, `text-${i}`)}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-md transition-all',
                  'bg-neutral-900 border border-neutral-600 hover:border-neutral-400'
                )}
                title={`${tc.name}: ${formatContrastRatio(tc.ratio)} contrast`}
              >
                <div
                  className="w-5 h-5 rounded-md border border-white/20 flex items-center justify-center"
                  style={{ background: tc.color }}
                >
                  <span className="text-[9px] font-bold" style={{ color: tc.color === '#ffffff' ? '#000' : '#fff' }}>
                    Aa
                  </span>
                </div>
                <div
                  className="w-3 h-3 rounded-full border border-white/30 hidden sm:block"
                  style={{ background: tc.color }}
                />
                <span className="text-sm font-mono font-medium text-neutral-200">{tc.color}</span>
                {tc.meetsAAA && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-green-900/50 text-green-400 border-green-700">
                    AAA
                  </Badge>
                )}
                {!tc.meetsAAA && tc.meetsAA && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-yellow-900/50 text-yellow-400 border-yellow-700">
                    AA
                  </Badge>
                )}
                {copiedId === `text-${i}` && <Check className="w-3.5 h-3.5 text-green-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Use Cases - Most Prominent */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
          {colors.map((color, i) => {
            const formattedColor = convertColor(color, colorFormat);
            return (
              <button
                key={i}
                onClick={() => handleCopy(formattedColor, `color-${i}`)}
                className="flex items-center gap-1.5 px-2 py-1 bg-neutral-800/50 border border-neutral-700 rounded hover:border-neutral-500 transition-colors"
              >
                <div className="w-4 h-4 rounded" style={{ background: color }} />
                <span className="text-xs font-mono text-neutral-300">{formattedColor}</span>
                {copiedId === `color-${i}` && <Check className="w-3 h-3 text-green-500" />}
              </button>
            );
          })}
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
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
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
                  aria-label="Gradient angle"
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
            {/* Animation options with B&W preview for clarity */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {animations.map((anim) => {
                const isSelected = anim.id === 'none'
                  ? !selectedAnimationId
                  : selectedAnimationId === anim.id;

                // B&W gradient for clear animation visibility
                const previewGradient = 'linear-gradient(135deg, #000 0%, #fff 100%)';

                return (
                  <button
                    key={anim.id}
                    onClick={() => {
                      if (anim.id === 'none') {
                        onAnimationChange(null);
                      } else {
                        onAnimationChange(anim.id);
                        if (!isAnimating) onToggleAnimating();
                      }
                    }}
                    className={cn(
                      'rounded-lg border overflow-hidden',
                      isSelected
                        ? 'border-white ring-2 ring-white/20'
                        : 'border-neutral-700 hover:border-neutral-500'
                    )}
                  >
                    <div
                      className="h-14"
                      style={{
                        background: previewGradient,
                        ...parseAnimationStyle(anim.id !== 'none' ? anim : undefined),
                      }}
                    />
                    <div className="p-1.5 bg-neutral-900">
                      <p className="text-[11px] text-white font-medium truncate">{anim.name}</p>
                      <p className="text-[9px] text-neutral-500 truncate">{anim.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Code Export - Always Visible Tabs */}
        <div className="border-t border-neutral-800 pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-400">Copy Code</span>
            {/* Color Format Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex h-6 items-center gap-1.5 rounded border border-neutral-700 bg-neutral-900 px-2 text-xs text-white hover:bg-neutral-800"
                  aria-label="Color format"
                >
                  <Palette className="h-3 w-3 text-neutral-500" />
                  <span>{COLOR_FORMAT_OPTIONS.find(f => f.value === colorFormat)?.label ?? 'HEX'}</span>
                  <ChevronDown className="h-3 w-3 text-neutral-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-28 p-1" align="end">
                {COLOR_FORMAT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onColorFormatChange(opt.value)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded px-2 py-1 text-xs',
                      'hover:bg-neutral-800 transition-colors',
                      colorFormat === opt.value && 'bg-neutral-800'
                    )}
                  >
                    <span className="flex-1 text-left">{opt.label}</span>
                    {colorFormat === opt.value && <Check className="h-3 w-3 text-white" />}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
          {/* Tab Buttons */}
          <div className="flex gap-1 mb-2 overflow-x-auto pb-1 -mx-1 px-1">
            {(['css', 'swift', 'kotlin', 'ai'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setCodeTab(tab)}
                className={cn(
                  'px-2.5 sm:px-3 py-1.5 text-xs rounded transition-colors whitespace-nowrap flex-shrink-0',
                  codeTab === tab
                    ? 'bg-neutral-700 text-white'
                    : 'bg-neutral-800/50 text-neutral-400 hover:text-white hover:bg-neutral-800'
                )}
              >
                {tab === 'css' ? 'CSS' : tab === 'swift' ? 'SwiftUI' : tab === 'kotlin' ? 'Kotlin' : 'AI Agent'}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <div className="relative">
            <pre className="p-3 bg-neutral-900 rounded-lg text-xs font-mono text-neutral-300 overflow-x-auto max-h-32">
              {codeTab === 'css' && (selectedAnimation ? fullCSSCode : cssCode)}
              {codeTab === 'swift' && swiftUICode}
              {codeTab === 'kotlin' && kotlinCode}
              {codeTab === 'ai' && aiAgentCode}
            </pre>
            <button
              onClick={() => handleCopy(
                codeTab === 'css' ? (selectedAnimation ? fullCSSCode : cssCode) :
                codeTab === 'swift' ? swiftUICode :
                codeTab === 'kotlin' ? kotlinCode : aiAgentCode,
                codeTab
              )}
              className="absolute top-2 right-2 p-1.5 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors"
              aria-label="Copy code"
            >
              {copiedId === codeTab ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
            </button>
          </div>
        </div>

        {/* Accessibility - Compact */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800">
          <span className="text-xs text-neutral-400">Accessibility:</span>
          {contrastInfo.slice(0, 2).map((info) => (
            <div
              key={info.color}
              className="flex items-center gap-1 px-2 py-1 bg-neutral-800/50 rounded text-xs"
            >
              <div className="w-3 h-3 rounded" style={{ background: info.color }} />
              <span className={cn(info.meetsAA ? 'text-green-400' : 'text-red-400')}>
                {info.meetsAAA ? 'AAA' : info.meetsAA ? 'AA' : 'Fail'}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
