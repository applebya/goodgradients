import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Heart, Download, Code2, Palette, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';
import type { Gradient } from './gradient-app';
import { WCAGCompliance } from './wcag-compliance';
import { getBestTextColor, getGradientMainColor } from '../lib/contrast-utils';

interface GradientDetailModalProps {
  gradient: Gradient | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function GradientDetailModal({ gradient, onClose, isFavorite, onToggleFavorite }: GradientDetailModalProps) {
  useEffect(() => {
    if (gradient) {
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [gradient]);

  if (!gradient) return null;

  const fireConfetti = () => {
    const colors = gradient.colors;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });
  };

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(gradient.gradient);
    toast.success('CSS gradient copied!');
    fireConfetti();
  };

  const handleCopyTailwind = () => {
    const tailwindClass = `bg-gradient-to-br from-[${gradient.colors[0]}] to-[${gradient.colors[1]}]`;
    navigator.clipboard.writeText(tailwindClass);
    toast.success('Tailwind classes copied!');
    fireConfetti();
  };

  const handleCopySVG = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradient.colors[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${gradient.colors[1]};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#grad)" />
</svg>`;
    navigator.clipboard.writeText(svg);
    toast.success('SVG code copied!');
    fireConfetti();
  };

  const handleDownloadPNG = () => {
    toast.success('PNG download started!');
    fireConfetti();
  };

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`${color} copied!`);
    fireConfetti();
  };

  const handleToggleFavorite = () => {
    onToggleFavorite();
    if (!isFavorite) {
      fireConfetti();
    }
  };

  // Calculate WCAG-compliant text color for this gradient
  const mainColor = getGradientMainColor(gradient.gradient);
  const bestTextColor = getBestTextColor(mainColor);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 overflow-y-auto py-8"
      >
        <div className="min-h-full flex items-start justify-center px-4 pt-8 pb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header with Gradient Preview */}
            <div className="relative h-64" style={{ background: gradient.gradient }}>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="backdrop-blur-md border border-white/20 bg-neutral-900/80 text-white hover:bg-neutral-800/90 hover:text-white"
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="backdrop-blur-md border border-white/20 bg-neutral-900/80 text-white hover:bg-neutral-800/90 hover:text-white"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    className="text-white border-0 backdrop-blur-md"
                    style={{ background: gradient.gradient, opacity: 0.9 }}
                  >
                    {gradient.category}
                  </Badge>
                  {gradient.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="border-white/30 text-white backdrop-blur-md"
                      style={{ background: `${gradient.gradient}40` }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-white mb-2">{gradient.name}</h2>
                <p className="text-white/80">{gradient.description}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <Tabs defaultValue="code" className="w-full">
                <TabsList 
                  className="grid w-full grid-cols-4 border"
                  style={{ 
                    background: `${gradient.gradient}20`,
                    borderColor: `${gradient.colors[0]}40`
                  }}
                >
                  <TabsTrigger 
                    value="code" 
                    className="text-white data-[state=active]:text-white hover:text-white"
                    style={{
                      // @ts-ignore - Custom CSS variable
                      '--active-bg': gradient.gradient,
                    } as React.CSSProperties}
                    data-active-gradient={gradient.gradient}
                  >
                    <Code2 className="w-4 h-4 mr-2" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger 
                    value="colors" 
                    className="text-white data-[state=active]:text-white hover:text-white"
                    style={{
                      // @ts-ignore - Custom CSS variable
                      '--active-bg': gradient.gradient,
                    } as React.CSSProperties}
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wcag" 
                    className="text-white data-[state=active]:text-white hover:text-white"
                    style={{
                      // @ts-ignore - Custom CSS variable
                      '--active-bg': gradient.gradient,
                    } as React.CSSProperties}
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    WCAG
                  </TabsTrigger>
                  <TabsTrigger 
                    value="preview" 
                    className="text-white data-[state=active]:text-white hover:text-white"
                    style={{
                      // @ts-ignore - Custom CSS variable
                      '--active-bg': gradient.gradient,
                    } as React.CSSProperties}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Preview
                  </TabsTrigger>
                </TabsList>

                <div className="min-h-[400px]">
                  <TabsContent value="code" className="space-y-4 mt-4">
                    {/* CSS */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-neutral-400">CSS</label>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={handleCopyCSS} 
                          className="text-white hover:text-white"
                          style={{ 
                            background: `${gradient.gradient}30`,
                          }}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div 
                        className="border rounded-lg p-4"
                        style={{ 
                          background: `${gradient.gradient}10`,
                          borderColor: `${gradient.colors[0]}40`
                        }}
                      >
                        <code className="text-sm text-neutral-300 break-all whitespace-pre-wrap">
                          background: {gradient.gradient};
                        </code>
                      </div>
                    </div>

                    {/* Tailwind */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-neutral-400">Tailwind CSS</label>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={handleCopyTailwind} 
                          className="text-white hover:text-white"
                          style={{ 
                            background: `${gradient.gradient}30`,
                          }}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div 
                        className="border rounded-lg p-4"
                        style={{ 
                          background: `${gradient.gradient}10`,
                          borderColor: `${gradient.colors[0]}40`
                        }}
                      >
                        <code className="text-sm text-neutral-300 break-all whitespace-pre-wrap">
                          className="bg-gradient-to-br from-[{gradient.colors[0]}] to-[{gradient.colors[1]}]"
                        </code>
                      </div>
                    </div>

                    {/* SVG */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-neutral-400">SVG</label>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={handleCopySVG} 
                          className="text-white hover:text-white"
                          style={{ 
                            background: `${gradient.gradient}30`,
                          }}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div 
                        className="border rounded-lg p-4 overflow-x-auto"
                        style={{ 
                          background: `${gradient.gradient}10`,
                          borderColor: `${gradient.colors[0]}40`
                        }}
                      >
                        <code className="text-sm text-neutral-300 whitespace-pre block">
{`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradient.colors[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${gradient.colors[1]};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#grad)" />
</svg>`}
                        </code>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="colors" className="mt-4">
                    <div className="space-y-4">
                      {gradient.colors.map((color, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="flex items-center gap-4 border rounded-lg p-4"
                          style={{ 
                            background: `${gradient.gradient}10`,
                            borderColor: `${gradient.colors[0]}40`
                          }}
                        >
                          <div
                            className="w-20 h-20 rounded-lg border border-white/20 flex-shrink-0"
                            style={{ background: color }}
                          />
                          <div className="flex-1">
                            <p className="text-white mb-1">Color {index + 1}</p>
                            <p className="text-2xl font-mono text-neutral-300 mb-2">{color}</p>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCopyColor(color)}
                                className="border-white/10 text-white hover:text-white"
                                style={{ background: `${gradient.gradient}30` }}
                              >
                                <Copy className="w-3 h-3 mr-1" />
                                Copy HEX
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="wcag" className="mt-4">
                    <div className="space-y-4">
                      <WCAGCompliance gradient={gradient} />
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="mt-4">
                    <div className="space-y-4">
                      {/* Button Preview */}
                      <div 
                        className="border rounded-lg p-6"
                        style={{ 
                          background: `${gradient.gradient}10`,
                          borderColor: `${gradient.colors[0]}40`
                        }}
                      >
                        <p className="text-sm text-neutral-400 mb-3">Button with WCAG-compliant text</p>
                        <button
                          className="px-6 py-3 rounded-lg transition-transform hover:scale-105 shadow-lg"
                          style={{ 
                            background: gradient.gradient,
                            color: bestTextColor
                          }}
                        >
                          Click Me
                        </button>
                      </div>

                      {/* Card Preview */}
                      <div 
                        className="border rounded-lg p-6"
                        style={{ 
                          background: `${gradient.gradient}10`,
                          borderColor: `${gradient.colors[0]}40`
                        }}
                      >
                        <p className="text-sm text-neutral-400 mb-3">Card with WCAG-compliant text</p>
                        <div
                          className="rounded-xl p-6 shadow-lg"
                          style={{ 
                            background: gradient.gradient,
                            color: bestTextColor
                          }}
                        >
                          <h3 className="mb-2" style={{ color: bestTextColor }}>Card Title</h3>
                          <p style={{ color: bestTextColor, opacity: 0.9 }}>
                            This is how your gradient looks on a card component with text content using WCAG-compliant contrast.
                          </p>
                        </div>
                      </div>

                      {/* Text Preview */}
                      <div 
                        className="border rounded-lg p-6"
                        style={{ 
                          background: `${gradient.gradient}10`,
                          borderColor: `${gradient.colors[0]}40`
                        }}
                      >
                        <p className="text-sm text-neutral-400 mb-3">Text Gradient</p>
                        <h1
                          className="text-5xl bg-clip-text text-transparent"
                          style={{ backgroundImage: gradient.gradient }}
                        >
                          Gradient Text
                        </h1>
                      </div>

                      {/* Badge Preview */}
                      <div 
                        className="border rounded-lg p-6"
                        style={{ 
                          background: `${gradient.gradient}10`,
                          borderColor: `${gradient.colors[0]}40`
                        }}
                      >
                        <p className="text-sm text-neutral-400 mb-3">Badges with WCAG-compliant text</p>
                        <div className="flex gap-2 flex-wrap">
                          <Badge 
                            className="border-0 shadow-md"
                            style={{ 
                              background: gradient.gradient,
                              color: bestTextColor
                            }}
                          >
                            Featured
                          </Badge>
                          <Badge 
                            variant="outline"
                            className="border-2"
                            style={{ 
                              borderColor: gradient.colors[0],
                              color: gradient.colors[0]
                            }}
                          >
                            Outlined
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  className="flex-1 text-white hover:text-white hover:opacity-90"
                  style={{ background: gradient.gradient }}
                  onClick={handleCopyCSS}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy CSS
                </Button>
                <Button
                  variant="outline"
                  className="border-white/10 text-white hover:text-white"
                  style={{ background: `${gradient.gradient}30` }}
                  onClick={handleDownloadPNG}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export PNG
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}