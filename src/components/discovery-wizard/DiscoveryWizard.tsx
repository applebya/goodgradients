import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { WizardProgress } from './WizardProgress';
import { VibeStep } from './steps/VibeStep';
import { ColorsStep } from './steps/ColorsStep';
import type { WizardVibe, WizardColor, WizardSelections } from '@/types';

interface DiscoveryWizardProps {
  isOpen: boolean;
  currentStep: number;
  totalSteps: number;
  selections: WizardSelections;
  matchCount: number;
  canGoBack: boolean;
  isLastStep: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  onApply: () => void;
  onSetVibe: (vibe: WizardVibe | null) => void;
  onToggleColor: (color: WizardColor) => void;
}

export function DiscoveryWizard({
  isOpen,
  currentStep,
  totalSteps,
  selections,
  matchCount,
  canGoBack,
  isLastStep,
  onClose,
  onNext,
  onBack,
  onApply,
  onSetVibe,
  onToggleColor,
}: DiscoveryWizardProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg p-4 gap-3">
        {/* Header */}
        <div className="text-center pt-1">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            Find Your Gradient
          </h2>
        </div>

        {/* Progress */}
        <WizardProgress currentStep={currentStep} totalSteps={totalSteps} />

        {/* Step content */}
        <div className="py-2">
          {currentStep === 0 && (
            <VibeStep selected={selections.vibe} onSelect={onSetVibe} />
          )}
          {currentStep === 1 && (
            <ColorsStep selected={selections.colors} onToggle={onToggleColor} />
          )}
        </div>

        {/* Match counter & Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
          <span className="text-xs text-neutral-400">
            <span className="text-white font-medium">{matchCount}</span> matches
          </span>

          <div className="flex items-center gap-2">
            {canGoBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                Back
              </Button>
            )}

            {isLastStep ? (
              <Button
                size="sm"
                onClick={onApply}
                className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white border-0"
              >
                Show Gradients
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={onNext}
                className="bg-white text-neutral-900 hover:bg-neutral-200"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
