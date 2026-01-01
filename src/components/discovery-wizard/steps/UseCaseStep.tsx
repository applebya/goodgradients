import { cn } from '@/lib/utils';
import { USE_CASE_OPTIONS } from '@/lib/wizard';
import type { WizardUseCase } from '@/types';

interface UseCaseStepProps {
  selected: WizardUseCase | null;
  onSelect: (useCase: WizardUseCase | null) => void;
}

// Mini mockup component for visual preview
function UseCaseMockup({ useCase, gradient }: { useCase: WizardUseCase; gradient: string }) {
  switch (useCase) {
    case 'hero':
      return (
        <div className="w-full h-20 rounded-lg bg-neutral-800 overflow-hidden p-1.5">
          <div
            className="w-full h-8 rounded-t"
            style={{ background: gradient }}
          />
          <div className="mt-1.5 space-y-1 px-1">
            <div className="h-1.5 w-12 bg-neutral-600 rounded" />
            <div className="h-1 w-16 bg-neutral-700 rounded" />
          </div>
        </div>
      );
    case 'buttons':
      return (
        <div className="w-full h-20 rounded-lg bg-neutral-800 flex items-center justify-center gap-2 p-2">
          <div
            className="px-3 py-1.5 rounded-md text-[8px] text-white font-medium"
            style={{ background: gradient }}
          >
            Button
          </div>
          <div
            className="px-3 py-1.5 rounded-md text-[8px] text-white font-medium"
            style={{ background: gradient }}
          >
            CTA
          </div>
        </div>
      );
    case 'cards':
      return (
        <div className="w-full h-20 rounded-lg bg-neutral-800 flex items-center justify-center gap-1.5 p-2">
          <div
            className="w-10 h-14 rounded-md"
            style={{ background: gradient }}
          />
          <div
            className="w-10 h-14 rounded-md opacity-80"
            style={{ background: gradient }}
          />
        </div>
      );
    case 'backgrounds':
      return (
        <div
          className="w-full h-20 rounded-lg flex items-center justify-center"
          style={{ background: gradient }}
        >
          <div className="bg-neutral-900/50 backdrop-blur-sm rounded px-2 py-1">
            <div className="h-1.5 w-8 bg-white/70 rounded mb-1" />
            <div className="h-1 w-10 bg-white/40 rounded" />
          </div>
        </div>
      );
    case 'accents':
      return (
        <div className="w-full h-20 rounded-lg bg-neutral-800 p-2">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ background: gradient }}
            />
            <div className="h-1.5 w-12 bg-neutral-600 rounded" />
          </div>
          <div className="h-1 w-full bg-neutral-700 rounded mb-1" />
          <div className="h-1 w-3/4 bg-neutral-700 rounded mb-2" />
          <div
            className="h-0.5 w-full rounded"
            style={{ background: gradient }}
          />
        </div>
      );
    default:
      return null;
  }
}

export function UseCaseStep({ selected, onSelect }: UseCaseStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">Where will you use this?</h3>
        <p className="text-neutral-400 text-sm">This helps us recommend the right gradients</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {USE_CASE_OPTIONS.map((option) => {
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
              {/* Mockup preview */}
              <div className="mb-3 transition-transform group-hover:scale-[1.02]">
                <UseCaseMockup useCase={option.value} gradient={option.previewGradient} />
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
