import { cn } from '@/lib/utils';
import { ANIMATION_PREF_OPTIONS } from '@/lib/wizard';
import type { WizardAnimationPref } from '@/types';

interface AnimationStepProps {
  selected: WizardAnimationPref | null;
  onSelect: (pref: WizardAnimationPref | null) => void;
}

// Animation preview component
function AnimationPreview({ pref, gradient }: { pref: WizardAnimationPref; gradient: string }) {
  const animationStyle = pref === 'dynamic'
    ? { animation: 'pulse 1.5s ease-in-out infinite' }
    : pref === 'subtle'
    ? { animation: 'pulse 3s ease-in-out infinite' }
    : {};

  return (
    <div
      className="w-full h-24 rounded-lg transition-all"
      style={{
        background: gradient,
        ...animationStyle,
      }}
    />
  );
}

export function AnimationStep({ selected, onSelect }: AnimationStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">Do you want animation?</h3>
        <p className="text-neutral-400 text-sm">Choose how your gradients should move</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ANIMATION_PREF_OPTIONS.map((option) => {
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
              {/* Animation preview */}
              <div className="mb-3 overflow-hidden rounded-lg">
                <AnimationPreview pref={option.value} gradient={option.previewGradient} />
              </div>

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
