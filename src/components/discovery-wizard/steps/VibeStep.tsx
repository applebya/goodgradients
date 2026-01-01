import { cn } from '@/lib/utils';
import { VIBE_OPTIONS } from '@/lib/wizard';
import type { WizardVibe } from '@/types';

interface VibeStepProps {
  selected: WizardVibe | null;
  onSelect: (vibe: WizardVibe | null) => void;
}

export function VibeStep({ selected, onSelect }: VibeStepProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">What's the vibe?</h3>
        <p className="text-neutral-400 text-sm">Pick the mood that fits your project</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {VIBE_OPTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onSelect(isSelected ? null : option.value)}
              className={cn(
                'group relative rounded-lg p-3 transition-all duration-150 text-left',
                'border hover:scale-[1.02] active:scale-[0.98]',
                isSelected
                  ? 'border-white bg-white/10'
                  : 'border-neutral-700 hover:border-neutral-500 bg-neutral-800/50'
              )}
            >
              <div
                className="w-full h-10 rounded mb-2"
                style={{ background: option.previewGradient }}
              />
              <div className="flex items-center justify-between">
                <div>
                  <span className={cn(
                    'text-sm font-medium',
                    isSelected ? 'text-white' : 'text-neutral-200'
                  )}>
                    {option.label}
                  </span>
                  <p className="text-[10px] text-neutral-500">{option.description}</p>
                </div>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
