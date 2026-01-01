import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VIBE_OPTIONS, COLOR_OPTIONS } from '@/lib/wizard';
import type { WizardVibe, WizardColor, WizardSelections } from '@/types';

interface DiscoveryWizardProps {
  isOpen: boolean;
  selections: WizardSelections;
  matchCount: number;
  onClose: () => void;
  onApply: () => void;
  onSetVibe: (vibe: WizardVibe | null) => void;
  onToggleColor: (color: WizardColor) => void;
}

export function DiscoveryWizard({
  isOpen,
  selections,
  matchCount,
  onClose,
  onApply,
  onSetVibe,
  onToggleColor,
}: DiscoveryWizardProps) {
  const hasSelections = selections.vibe !== null || selections.colors.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-5 gap-0">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-lg font-medium text-white">Find your gradient</h2>
          <p className="text-sm text-neutral-400 mt-0.5">Pick a mood and colors to narrow down results</p>
        </div>

        {/* Vibe section */}
        <div className="mb-5">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Mood</p>
          <div className="grid grid-cols-3 gap-1.5">
            {VIBE_OPTIONS.map((option) => {
              const isSelected = selections.vibe === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => onSetVibe(isSelected ? null : option.value)}
                  className={cn(
                    'rounded-md p-2 text-left transition-colors',
                    'border',
                    isSelected
                      ? 'border-white/40 bg-white/10'
                      : 'border-transparent hover:bg-white/5'
                  )}
                >
                  <div
                    className="w-full h-6 rounded-sm mb-1.5"
                    style={{ background: option.previewGradient }}
                  />
                  <span className={cn(
                    'text-xs',
                    isSelected ? 'text-white' : 'text-neutral-400'
                  )}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Colors section */}
        <div className="mb-5">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Colors</p>
          <div className="grid grid-cols-4 gap-1.5">
            {COLOR_OPTIONS.map((option) => {
              const isSelected = selections.colors.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => onToggleColor(option.value)}
                  className={cn(
                    'rounded-md p-1.5 transition-colors',
                    'border',
                    isSelected
                      ? 'border-white/40 bg-white/10'
                      : 'border-transparent hover:bg-white/5'
                  )}
                >
                  <div
                    className="w-full h-8 rounded-sm mb-1"
                    style={{ background: option.previewGradient }}
                  />
                  <span className={cn(
                    'text-[10px]',
                    isSelected ? 'text-white' : 'text-neutral-400'
                  )}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
          <span className="text-xs text-neutral-500">
            {matchCount} {matchCount === 1 ? 'match' : 'matches'}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-neutral-400 hover:text-white"
            >
              {hasSelections ? 'Skip' : 'Close'}
            </Button>
            <Button
              size="sm"
              onClick={onApply}
              disabled={!hasSelections}
              className="bg-white text-black hover:bg-neutral-200 disabled:opacity-40"
            >
              Show results
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
