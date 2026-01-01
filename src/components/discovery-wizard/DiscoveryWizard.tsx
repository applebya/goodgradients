import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { WizardProgress } from './WizardProgress';
import { VibeStep } from './steps/VibeStep';
import { ColorStep } from './steps/ColorStep';
import { UseCaseStep } from './steps/UseCaseStep';
import { AnimationStep } from './steps/AnimationStep';
import type { WizardVibe, WizardColorTemp, WizardUseCase, WizardAnimationPref, WizardSelections } from '@/types';

interface DiscoveryWizardProps {
  isOpen: boolean;
  currentStep: number;
  totalSteps: number;
  selections: WizardSelections;
  matchCount: number;
  canGoBack: boolean;
  isLastStep: boolean;
  onClose: () => void;
  onSkip: () => void;
  onNext: () => void;
  onBack: () => void;
  onApply: () => void;
  onSetVibe: (vibe: WizardVibe | null) => void;
  onToggleColorTemp: (colorTemp: WizardColorTemp) => void;
  onSetUseCase: (useCase: WizardUseCase | null) => void;
  onSetAnimationPref: (pref: WizardAnimationPref | null) => void;
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
  onSkip,
  onNext,
  onBack,
  onApply,
  onSetVibe,
  onToggleColorTemp,
  onSetUseCase,
  onSetAnimationPref,
}: DiscoveryWizardProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            Find Your Perfect Gradient
          </DialogTitle>
          <DialogDescription>
            Answer a few questions to discover gradients that match your style
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <WizardProgress currentStep={currentStep} totalSteps={totalSteps} />

        {/* Step content */}
        <div className="min-h-[300px] py-4">
          {currentStep === 0 && (
            <VibeStep selected={selections.vibe} onSelect={onSetVibe} />
          )}
          {currentStep === 1 && (
            <ColorStep selected={selections.colorTemps} onToggle={onToggleColorTemp} />
          )}
          {currentStep === 2 && (
            <UseCaseStep selected={selections.useCase} onSelect={onSetUseCase} />
          )}
          {currentStep === 3 && (
            <AnimationStep selected={selections.animationPref} onSelect={onSetAnimationPref} />
          )}
        </div>

        {/* Match counter */}
        <div className="text-center py-2">
          <span className="text-sm text-neutral-400">
            <span className="text-white font-medium">{matchCount}</span> gradients match your style
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="text-neutral-400 hover:text-white"
          >
            Skip wizard
          </Button>

          <div className="flex items-center gap-2">
            {canGoBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
              >
                Back
              </Button>
            )}

            {isLastStep ? (
              <Button
                size="sm"
                onClick={onApply}
                className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white border-0"
              >
                Show {matchCount} Gradients
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
