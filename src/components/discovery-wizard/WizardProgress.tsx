import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ['Vibe', 'Colors', 'Use Case', 'Animation'];

export function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="relative h-1.5 bg-neutral-700 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {STEP_LABELS.slice(0, totalSteps).map((label, index) => (
          <div
            key={label}
            className={cn(
              'flex items-center gap-1.5 text-xs transition-colors',
              index <= currentStep ? 'text-white' : 'text-neutral-500'
            )}
          >
            <div
              className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors',
                index < currentStep
                  ? 'bg-gradient-to-br from-violet-500 to-pink-500 text-white'
                  : index === currentStep
                  ? 'bg-white text-neutral-900'
                  : 'bg-neutral-700 text-neutral-400'
              )}
            >
              {index < currentStep ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className="hidden sm:inline">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
