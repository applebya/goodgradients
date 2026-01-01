import { cn } from '@/lib/utils';
import { COLOR_TEMP_OPTIONS } from '@/lib/wizard';
import type { WizardColorTemp } from '@/types';

interface ColorStepProps {
  selected: WizardColorTemp[];
  onToggle: (colorTemp: WizardColorTemp) => void;
}

export function ColorStep({ selected, onToggle }: ColorStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">What colors fit your brand?</h3>
        <p className="text-neutral-400 text-sm">Select one or more color palettes</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {COLOR_TEMP_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => onToggle(option.value)}
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
                className="w-full h-16 rounded-lg mb-3 transition-transform group-hover:scale-[1.02]"
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

      {selected.length > 0 && (
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {selected.map(colorTemp => {
              const option = COLOR_TEMP_OPTIONS.find(o => o.value === colorTemp);
              return (
                <span
                  key={colorTemp}
                  className="px-3 py-1 rounded-full bg-white/10 text-white text-sm"
                >
                  {option?.label}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
