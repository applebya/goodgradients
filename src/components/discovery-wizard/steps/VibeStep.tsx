import { cn } from '@/lib/utils';
import { VIBE_OPTIONS } from '@/lib/wizard';
import type { WizardVibe } from '@/types';

interface VibeStepProps {
  selected: WizardVibe | null;
  onSelect: (vibe: WizardVibe | null) => void;
}

export function VibeStep({ selected, onSelect }: VibeStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">What vibe are you going for?</h3>
        <p className="text-neutral-400 text-sm">Choose the mood that matches your project</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {VIBE_OPTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onSelect(isSelected ? null : option.value)}
              className={cn(
                'group relative rounded-xl p-4 transition-all duration-200 text-left',
                'border-2 hover:scale-[1.02] active:scale-[0.98]',
                isSelected
                  ? 'border-white bg-white/10'
                  : 'border-neutral-700 hover:border-neutral-500 bg-neutral-800/50'
              )}
            >
              {/* Gradient preview */}
              <div
                className="w-full h-20 rounded-lg mb-3 transition-transform group-hover:scale-[1.02]"
                style={{ background: option.previewGradient }}
              />

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    'font-medium',
                    isSelected ? 'text-white' : 'text-neutral-200'
                  )}>
                    {option.label}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <svg className="w-3 h-3 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-neutral-400">{option.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
