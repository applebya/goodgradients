import { cn } from '@/lib/utils';
import { COLOR_OPTIONS } from '@/lib/wizard';
import type { WizardColor } from '@/types';

interface ColorsStepProps {
  selected: WizardColor[];
  onToggle: (color: WizardColor) => void;
}

export function ColorsStep({ selected, onToggle }: ColorsStepProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">Pick your colors</h3>
        <p className="text-neutral-400 text-sm">Select one or more color families</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {COLOR_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => onToggle(option.value)}
              className={cn(
                'group relative rounded-lg p-2 transition-all duration-150',
                'border hover:scale-[1.02] active:scale-[0.98]',
                isSelected
                  ? 'border-white bg-white/10'
                  : 'border-neutral-700 hover:border-neutral-500 bg-neutral-800/50'
              )}
            >
              <div
                className="w-full h-12 rounded mb-1.5"
                style={{ background: option.previewGradient }}
              />
              <div className="flex items-center justify-center gap-1">
                <span className={cn(
                  'text-xs font-medium',
                  isSelected ? 'text-white' : 'text-neutral-300'
                )}>
                  {option.label}
                </span>
                {isSelected && (
                  <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-2 h-2 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <p className="text-center text-xs text-neutral-400">
          {selected.length} color{selected.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  );
}
