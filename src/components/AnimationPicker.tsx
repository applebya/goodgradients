import { useCallback } from 'react';
import { Zap, ChevronDown } from './icons';
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from './ui/popover';
import { cn } from '@/lib/utils';
import { animations, getAnimationById } from '@/data/animations';
import type { Animation } from '@/types';

interface AnimationPickerProps {
  selectedAnimationId: string | null;
  onAnimationChange: (id: string | null) => void;
}

export function AnimationPicker({
  selectedAnimationId,
  onAnimationChange,
}: AnimationPickerProps) {
  const selectedAnimation = selectedAnimationId ? getAnimationById(selectedAnimationId) : undefined;

  // Parse animation properties from the property string
  const parseAnimationStyle = useCallback((animation: Animation | undefined): React.CSSProperties => {
    if (!animation || !animation.property) {
      return {};
    }

    const animMatch = animation.property.match(/animation:\s*([^;]+);?/);
    const animValue = animMatch ? animMatch[1] : undefined;
    const bgSizeMatch = animation.property.match(/background-size:\s*([^;]+);?/);
    const bgSize = bgSizeMatch ? bgSizeMatch[1] : undefined;

    return {
      ...(bgSize ? { backgroundSize: bgSize } : {}),
      ...(animValue ? { animation: animValue } : {}),
    };
  }, []);

  // B&W gradient for clear animation visibility
  const previewGradient = 'linear-gradient(135deg, #000 0%, #fff 100%)';

  // CSS keyframes are from internal animations.ts, not user input - safe to inject
  const keyframesCSS = animations
    .filter(a => a.keyframes)
    .map(a => a.keyframes)
    .join('\n');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex h-7 items-center justify-between gap-1.5 rounded-md border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-xs text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-600"
          aria-label="Select animation"
        >
          <Zap className="h-3 w-3 text-neutral-500" />
          <span>{selectedAnimation?.name ?? 'Static'}</span>
          <ChevronDown className="h-3 w-3 text-neutral-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2" align="end">
        {/* Inject animation keyframes - sourced from internal animations.ts, safe */}
        <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />

        <div className="grid grid-cols-3 gap-2">
          {animations.map((anim) => {
            const isSelected = anim.id === 'none'
              ? !selectedAnimationId
              : selectedAnimationId === anim.id;

            return (
              <PopoverClose key={anim.id} asChild>
                <button
                  onClick={() => {
                    if (anim.id === 'none') {
                      onAnimationChange(null);
                    } else {
                      onAnimationChange(anim.id);
                    }
                  }}
                  className={cn(
                    'rounded-lg border overflow-hidden transition-all',
                    isSelected
                      ? 'border-white ring-2 ring-white/20'
                      : 'border-neutral-700 hover:border-neutral-500'
                  )}
                >
                  <div
                    className="h-12"
                    style={{
                      background: previewGradient,
                      ...parseAnimationStyle(anim.id !== 'none' ? anim : undefined),
                    }}
                  />
                  <div className="p-1.5 bg-neutral-900">
                    <p className="text-[10px] text-white font-medium truncate">{anim.name}</p>
                  </div>
                </button>
              </PopoverClose>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
