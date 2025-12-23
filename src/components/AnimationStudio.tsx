import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { Zap, X, Copy, Play, Pause, Check } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { cn, copyToClipboard } from '@/lib/utils';
import { animations, animationCategories } from '@/data/animations';
import { gradients } from '@/data/gradients';
import type { Animation, Gradient } from '@/types';

interface AnimationStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCombination: (gradientId: string, animationId: string) => void;
}

export function AnimationStudio({ isOpen, onClose, onSelectCombination }: AnimationStudioProps) {
  const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null);
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isPlaying, setIsPlaying] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAnimations = useMemo(() => {
    if (filterCategory === 'All') return animations;
    return animations.filter((a) => a.category === filterCategory);
  }, [filterCategory]);

  const handleCopy = async (text: string, id: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleApply = () => {
    if (selectedGradient && selectedAnimation) {
      onSelectCombination(selectedGradient.id, selectedAnimation.id);
      onClose();
    }
  };

  const getFullCSS = () => {
    if (!selectedGradient || !selectedAnimation) return '';
    return `/* ${selectedAnimation.name} Animation */
${selectedAnimation.keyframes}

.animated-gradient {
  background: ${selectedGradient.gradient};
  ${selectedAnimation.property}
}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-br from-neutral-800 to-neutral-900 border-b border-neutral-700 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Animation Studio</h2>
            </div>
            <p className="text-sm text-neutral-400">
              Start from an animation, then choose your gradient
            </p>
          </div>
          <Button
            size="icon-sm"
            variant="ghost"
            className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 8rem - 5rem)' }}>
          <Tabs defaultValue="animation">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="animation">1. Choose Animation</TabsTrigger>
              <TabsTrigger value="gradient" disabled={!selectedAnimation}>
                2. Choose Gradient
              </TabsTrigger>
              <TabsTrigger value="preview" disabled={!selectedAnimation || !selectedGradient}>
                3. Preview & Export
              </TabsTrigger>
            </TabsList>

            {/* Step 1: Choose Animation */}
            <TabsContent value="animation" className="mt-0">
              {/* Category filters */}
              <div className="flex gap-2 flex-wrap mb-4">
                {animationCategories.map((cat) => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={filterCategory === cat ? 'default' : 'outline'}
                    onClick={() => setFilterCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Animation grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredAnimations.map((anim) => (
                  <button
                    key={anim.id}
                    onClick={() => setSelectedAnimation(anim)}
                    className={cn(
                      'text-left p-4 rounded-xl border transition-all',
                      selectedAnimation?.id === anim.id
                        ? 'border-white bg-neutral-800'
                        : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{anim.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {anim.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-400 mb-3">{anim.description}</p>

                    {/* Preview */}
                    <div
                      className="h-12 rounded-lg border border-neutral-700"
                      style={{
                        background: 'linear-gradient(135deg, #374151 0%, #9CA3AF 100%)',
                        backgroundSize: anim.property.includes('background-size') ? '200% 200%' : 'auto',
                        animation: isPlaying ? anim.property.split('animation: ')[1] : 'none',
                      }}
                    />
                    <style dangerouslySetInnerHTML={{ __html: anim.keyframes }} />
                  </button>
                ))}
              </div>
            </TabsContent>

            {/* Step 2: Choose Gradient */}
            <TabsContent value="gradient" className="mt-0">
              <p className="text-neutral-400 mb-4">
                Select a gradient to apply <strong className="text-white">{selectedAnimation?.name}</strong>
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {gradients.slice(0, 30).map((gradient) => (
                  <button
                    key={gradient.id}
                    onClick={() => setSelectedGradient(gradient)}
                    className={cn(
                      'rounded-xl overflow-hidden border transition-all',
                      selectedGradient?.id === gradient.id
                        ? 'border-white ring-2 ring-white'
                        : 'border-neutral-700 hover:border-neutral-600'
                    )}
                  >
                    <div
                      className="h-20"
                      style={{
                        background: gradient.gradient,
                        backgroundSize: selectedAnimation?.property.includes('background-size') ? '200% 200%' : 'auto',
                        animation: isPlaying && selectedAnimation
                          ? selectedAnimation.property.split('animation: ')[1]
                          : 'none',
                      }}
                    />
                    <div className="p-2 bg-neutral-800">
                      <p className="text-xs text-white truncate">{gradient.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>

            {/* Step 3: Preview & Export */}
            <TabsContent value="preview" className="mt-0">
              {selectedGradient && selectedAnimation && (
                <div className="space-y-4">
                  {/* Live Preview */}
                  <div className="border border-neutral-700 rounded-xl p-4 bg-neutral-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-neutral-700">{selectedAnimation.name}</Badge>
                        <span className="text-neutral-500">+</span>
                        <Badge className="bg-neutral-700">{selectedGradient.name}</Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div
                      className="h-48 rounded-xl"
                      style={{
                        background: selectedGradient.gradient,
                        backgroundSize: selectedAnimation.property.includes('background-size') ? '300% 300%' : 'auto',
                        animation: isPlaying ? selectedAnimation.property.split('animation: ')[1] : 'none',
                      }}
                    />
                  </div>

                  {/* Code */}
                  <div className="border border-neutral-700 rounded-xl p-4 bg-neutral-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-neutral-400">Complete CSS</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(getFullCSS(), 'full-css')}
                      >
                        {copiedId === 'full-css' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span className="ml-1">Copy</span>
                      </Button>
                    </div>
                    <pre className="bg-black/50 border border-neutral-700 rounded-lg p-4 overflow-x-auto text-sm text-neutral-300">
                      <code>{getFullCSS()}</code>
                    </pre>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-700 p-4 flex justify-between items-center bg-neutral-900">
          <p className="text-sm text-neutral-500">
            {selectedAnimation && selectedGradient
              ? 'Ready to apply!'
              : selectedAnimation
              ? 'Now choose a gradient'
              : 'Select an animation to begin'}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={!selectedAnimation || !selectedGradient}
            >
              Apply to Gallery
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
