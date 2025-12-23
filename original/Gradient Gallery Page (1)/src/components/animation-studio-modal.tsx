import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';
import type { Gradient } from './gradient-app';

interface AnimationStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  gradients: Gradient[];
}

type AnimationStyle = {
  id: string;
  name: string;
  description: string;
  category: 'Rotation' | 'Movement' | 'Pulse' | 'Morph' | 'Wave';
  keyframes: string;
  animationCSS: string;
  preview: boolean;
};

const animationStyles: AnimationStyle[] = [
  {
    id: 'border-shine',
    name: 'Border Shine',
    description: 'Elegant shiny border glint effect',
    category: 'Wave',
    keyframes: `@keyframes border-shine {
  0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0); }
  50% { box-shadow: 0 0 20px 5px rgba(255,255,255,0.3), inset 0 0 20px 5px rgba(255,255,255,0.2); }
  100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0); }
}`,
    animationCSS: 'animation: border-shine 2s ease-in-out infinite;',
    preview: true,
  },
  {
    id: 'rotate-360',
    name: 'Full Rotation',
    description: 'Smooth 360° rotation of the gradient',
    category: 'Rotation',
    keyframes: `@keyframes rotate-360 {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}`,
    animationCSS: 'animation: rotate-360 4s linear infinite;',
    preview: true,
  },
  {
    id: 'gentle-rotate',
    name: 'Gentle Spin',
    description: 'Subtle back-and-forth rotation',
    category: 'Rotation',
    keyframes: `@keyframes gentle-rotate {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(20deg); }
}`,
    animationCSS: 'animation: gentle-rotate 3s ease-in-out infinite;',
    preview: true,
  },
  {
    id: 'slide-horizontal',
    name: 'Horizontal Slide',
    description: 'Gradient slides left to right',
    category: 'Movement',
    keyframes: `@keyframes slide-horizontal {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
    animationCSS: 'background-size: 200% 200%; animation: slide-horizontal 3s ease infinite;',
    preview: true,
  },
  {
    id: 'slide-diagonal',
    name: 'Diagonal Flow',
    description: 'Diagonal movement creating flow',
    category: 'Movement',
    keyframes: `@keyframes slide-diagonal {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}`,
    animationCSS: 'background-size: 200% 200%; animation: slide-diagonal 4s ease infinite;',
    preview: true,
  },
  {
    id: 'pulse-glow',
    name: 'Pulse Glow',
    description: 'Breathing effect with opacity change',
    category: 'Pulse',
    keyframes: `@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}`,
    animationCSS: 'animation: pulse-glow 2s ease-in-out infinite;',
    preview: true,
  },
  {
    id: 'heartbeat',
    name: 'Heartbeat',
    description: 'Rhythmic pulsing like a heartbeat',
    category: 'Pulse',
    keyframes: `@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.02); }
  28% { transform: scale(1); }
  42% { transform: scale(1.02); }
  70% { transform: scale(1); }
}`,
    animationCSS: 'animation: heartbeat 1.5s ease-in-out infinite;',
    preview: true,
  },
  {
    id: 'morph-colors',
    name: 'Color Morph',
    description: 'Morphs through color spectrum',
    category: 'Morph',
    keyframes: `@keyframes morph-colors {
  0% { filter: hue-rotate(0deg) saturate(100%); }
  25% { filter: hue-rotate(90deg) saturate(120%); }
  50% { filter: hue-rotate(180deg) saturate(100%); }
  75% { filter: hue-rotate(270deg) saturate(120%); }
  100% { filter: hue-rotate(360deg) saturate(100%); }
}`,
    animationCSS: 'animation: morph-colors 5s ease infinite;',
    preview: true,
  },
  {
    id: 'subtle-shift',
    name: 'Subtle Shift',
    description: 'Very subtle color shifting',
    category: 'Morph',
    keyframes: `@keyframes subtle-shift {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(10deg); }
}`,
    animationCSS: 'animation: subtle-shift 4s ease-in-out infinite;',
    preview: true,
  },
  {
    id: 'wave-ripple',
    name: 'Wave Ripple',
    description: 'Rippling wave effect',
    category: 'Wave',
    keyframes: `@keyframes wave-ripple {
  0%, 100% { background-position: 0% 50%; filter: brightness(100%); }
  33% { background-position: 50% 100%; filter: brightness(110%); }
  66% { background-position: 100% 50%; filter: brightness(90%); }
}`,
    animationCSS: 'background-size: 200% 200%; animation: wave-ripple 3s ease-in-out infinite;',
    preview: true,
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    description: 'Northern lights flowing effect',
    category: 'Wave',
    keyframes: `@keyframes aurora {
  0%, 100% { 
    background-position: 0% 50%; 
    filter: hue-rotate(0deg) brightness(100%);
  }
  25% { 
    background-position: 50% 100%; 
    filter: hue-rotate(15deg) brightness(105%);
  }
  50% { 
    background-position: 100% 50%; 
    filter: hue-rotate(0deg) brightness(110%);
  }
  75% { 
    background-position: 50% 0%; 
    filter: hue-rotate(-15deg) brightness(105%);
  }
}`,
    animationCSS: 'background-size: 300% 300%; animation: aurora 5s ease-in-out infinite;',
    preview: true,
  },
];

export function AnimationStudioModal({ isOpen, onClose, gradients }: AnimationStudioModalProps) {
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationStyle>(animationStyles[0]);
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(animationStyles.map(a => a.category)))];

  const filteredAnimations = filterCategory === 'All' 
    ? animationStyles 
    : animationStyles.filter(a => a.category === filterCategory);

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: selectedGradient?.colors || ['#ffffff'],
    });
  };

  const handleCopyCSS = () => {
    if (!selectedGradient || !selectedAnimation) return;
    
    const css = `/* ${selectedAnimation.name} Animation */
${selectedAnimation.keyframes}

.animated-gradient {
  background: ${selectedGradient.gradient};
  ${selectedAnimation.animationCSS}
}`;
    
    navigator.clipboard.writeText(css);
    toast.success('Animated CSS copied!');
    fireConfetti();
  };

  const handleCopyKeyframes = () => {
    if (!selectedAnimation) return;
    navigator.clipboard.writeText(selectedAnimation.keyframes);
    toast.success('Keyframes copied!');
    fireConfetti();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto py-8"
      >
        <div className="min-h-full flex items-start justify-center px-4 pt-8 pb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="relative h-48 bg-gradient-to-br from-neutral-800 to-neutral-900 border-b border-neutral-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Zap className="w-8 h-8 text-white" />
                    <h2 className="text-white">Animation Studio</h2>
                  </div>
                  <p className="text-neutral-400">Create dynamic animated gradients</p>
                </div>
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-4 right-4 text-neutral-400 hover:text-white hover:bg-neutral-800"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              <Tabs defaultValue="select" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-neutral-800 border border-neutral-700">
                  <TabsTrigger value="select" className="text-neutral-400 data-[state=active]:text-white data-[state=active]:bg-neutral-700">
                    1. Select Animation
                  </TabsTrigger>
                  <TabsTrigger value="gradient" className="text-neutral-400 data-[state=active]:text-white data-[state=active]:bg-neutral-700">
                    2. Choose Gradient
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="text-neutral-400 data-[state=active]:text-white data-[state=active]:bg-neutral-700">
                    3. Preview & Export
                  </TabsTrigger>
                </TabsList>

                {/* Step 1: Select Animation Style */}
                <TabsContent value="select" className="mt-6">
                  <div className="mb-4 flex gap-2 flex-wrap">
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        size="sm"
                        variant={filterCategory === cat ? 'default' : 'outline'}
                        onClick={() => setFilterCategory(cat)}
                        className={
                          filterCategory === cat
                            ? 'bg-white text-black'
                            : 'border-neutral-700 bg-neutral-800/50 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                        }
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                    {filteredAnimations.map((anim) => (
                      <motion.div
                        key={anim.id}
                        whileHover={{ y: -2 }}
                        onClick={() => setSelectedAnimation(anim)}
                        className={`cursor-pointer border rounded-xl p-4 transition-all ${
                          selectedAnimation.id === anim.id
                            ? 'border-white bg-neutral-800'
                            : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-white mb-1">{anim.name}</h4>
                            <Badge variant="outline" className="text-xs border-neutral-600 text-neutral-400">
                              {anim.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-neutral-400 mb-3">{anim.description}</p>
                        
                        {/* Animation Preview */}
                        <div 
                          className="h-16 rounded-lg border border-neutral-700"
                          style={{
                            background: 'linear-gradient(135deg, #333333 0%, #ffffff 100%)',
                            backgroundSize: '200% 200%',
                            animation: isPlaying && anim.id !== 'border-shine' ? anim.animationCSS.split('animation: ')[1] : anim.id === 'border-shine' && isPlaying ? anim.animationCSS.split('animation: ')[1] : 'none',
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Step 2: Choose Gradient */}
                <TabsContent value="gradient" className="mt-6">
                  <p className="text-neutral-400 mb-4">Select a gradient to apply the animation</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2">
                    {gradients.slice(0, 40).map((gradient) => (
                      <motion.div
                        key={gradient.id}
                        whileHover={{ y: -2 }}
                        onClick={() => setSelectedGradient(gradient)}
                        className={`cursor-pointer border rounded-xl overflow-hidden transition-all ${
                          selectedGradient?.id === gradient.id
                            ? 'border-white ring-2 ring-white'
                            : 'border-neutral-700 hover:border-neutral-600'
                        }`}
                      >
                        <div 
                          className="h-24"
                          style={{ background: gradient.gradient }}
                        />
                        <div className="p-2 bg-neutral-800">
                          <p className="text-xs text-white truncate">{gradient.name}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Step 3: Preview & Export */}
                <TabsContent value="preview" className="mt-6">
                  {selectedGradient && selectedAnimation ? (
                    <div className="space-y-4">
                      {/* Large Preview */}
                      <div className="border border-neutral-700 rounded-xl p-6 bg-neutral-800/50">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-neutral-400">Live Preview</p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="border-neutral-700 text-neutral-300 hover:text-white"
                            >
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setIsPlaying(false)}
                              className="border-neutral-700 text-neutral-300 hover:text-white"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div 
                          className="h-64 rounded-xl shadow-2xl"
                          style={{
                            background: selectedGradient.gradient,
                            backgroundSize: '200% 200%',
                            animation: isPlaying ? selectedAnimation.animationCSS.split('animation: ')[1] : 'none',
                          }}
                        />
                        <div className="mt-4 flex items-center gap-2">
                          <Badge className="bg-neutral-700 text-white">
                            {selectedAnimation.name}
                          </Badge>
                          <span className="text-neutral-500">+</span>
                          <Badge className="bg-neutral-700 text-white">
                            {selectedGradient.name}
                          </Badge>
                        </div>
                      </div>

                      {/* CSS Code */}
                      <div className="border border-neutral-700 rounded-xl p-4 bg-neutral-800/50">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-neutral-400">Complete CSS</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCopyCSS}
                            className="text-white hover:bg-neutral-700"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy All
                          </Button>
                        </div>
                        <div className="bg-black/50 border border-neutral-700 rounded-lg p-4 overflow-x-auto">
                          <code className="text-sm text-neutral-300 whitespace-pre block">
{`/* ${selectedAnimation.name} Animation */
${selectedAnimation.keyframes}

.animated-gradient {
  background: ${selectedGradient.gradient};
  ${selectedAnimation.animationCSS}
}`}
                          </code>
                        </div>
                      </div>

                      {/* Keyframes Only */}
                      <div className="border border-neutral-700 rounded-xl p-4 bg-neutral-800/50">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-neutral-400">Keyframes Only</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCopyKeyframes}
                            className="text-white hover:bg-neutral-700"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-black/50 border border-neutral-700 rounded-lg p-4 overflow-x-auto">
                          <code className="text-sm text-neutral-300 whitespace-pre block">
{selectedAnimation.keyframes}
                          </code>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-neutral-500">Select an animation and gradient to preview</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {/* Footer Actions */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-neutral-700">
                <Button
                  className="flex-1 bg-white text-black hover:bg-neutral-200"
                  onClick={handleCopyCSS}
                  disabled={!selectedGradient || !selectedAnimation}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Complete CSS
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Inject keyframes into document */}
      {selectedAnimation && (
        <style>
          {selectedAnimation.keyframes}
        </style>
      )}
    </AnimatePresence>
  );
}