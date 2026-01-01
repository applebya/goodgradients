import { useCallback, useRef } from 'react';
import { toast, useToastRegister } from './components/Toast';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GradientGallery } from './components/GradientGallery';
import { GradientDetail } from './components/GradientDetail';
import { DiscoveryWizard } from './components/discovery-wizard';
import { useAppState } from './hooks/useAppState';
import { useKeyboard } from './hooks/useKeyboard';
import { useDiscoveryWizard } from './hooks/useDiscoveryWizard';
import { gradients } from './data/gradients';
import { decodeGradient, gradientToCSS } from './lib/gradient-url';
import type { GradientPreset } from './types';

export default function App() {
  const { state, favorites, actions } = useAppState();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Discovery Wizard
  const wizard = useDiscoveryWizard(gradients);

  // Register toast function
  useToastRegister();

  // Set up keyboard shortcuts
  useKeyboard({
    onSearch: () => searchInputRef.current?.focus(),
    onEscape: () => {
      if (state.selectedGradient) {
        actions.selectGradient(null);
      } else {
        actions.setSearchQuery('');
      }
    },
    onCopy: async () => {
      if (state.selectedGradient) {
        const gradientDef = decodeGradient(state.selectedGradient);
        if (gradientDef) {
          await navigator.clipboard.writeText(gradientToCSS(gradientDef));
          toast.success('Copied to clipboard');
        }
      }
    },
    onFavorite: () => {
      if (state.selectedGradient) {
        actions.toggleFavorite(state.selectedGradient);
      }
    },
    onToggleAnimation: () => {
      if (state.selectedGradient) {
        actions.toggleAnimating();
      }
    },
  });

  // Handle random gradient selection
  const handleRandomGradient = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    const randomGradient = gradients[randomIndex];
    if (randomGradient) {
      actions.selectPreset(randomGradient);
    }
  }, [actions]);

  // Handle gradient selection from gallery
  const handleSelectGradient = useCallback(
    (gradient: GradientPreset) => {
      actions.selectPreset(gradient);
    },
    [actions]
  );

  // Handle share - returns the shareable URL
  const handleShare = useCallback(() => {
    return actions.getShareURL();
  }, [actions]);

  // Get selected gradient definition (decoded from URL-encoded string)
  const selectedGradientDef = state.selectedGradient
    ? decodeGradient(state.selectedGradient)
    : null;

  return (
    <div className="min-h-screen bg-neutral-950 text-white bg-page-gradient bg-grid-pattern">
      <Header
        category={state.category}
        searchQuery={state.searchQuery}
        onCategoryChange={actions.setCategory}
        onSearchChange={actions.setSearchQuery}
        onRandomGradient={handleRandomGradient}
        searchInputRef={searchInputRef}
        onOpenWizard={wizard.openWizard}
        hasActiveFilters={wizard.hasActiveFilters}
        wizardMatchCount={wizard.matchCount}
        wizardSelections={wizard.appliedSelections ?? undefined}
        onClearFilters={wizard.clearFilters}
        onRemoveWizardVibe={wizard.removeAppliedVibe}
        onRemoveWizardColor={wizard.removeAppliedColor}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <GradientGallery
          category={state.category}
          searchQuery={state.searchQuery}
          favorites={favorites}
          onSelectGradient={handleSelectGradient}
          onToggleFavorite={actions.toggleFavorite}
          isFavorite={actions.isFavorite}
          wizardFilteredGradients={wizard.hasActiveFilters ? wizard.filteredGradients : undefined}
        />
      </main>

      <Footer />

      {/* Gradient Detail Modal */}
      <GradientDetail
        gradientDef={selectedGradientDef}
        encodedGradient={state.selectedGradient}
        isOpen={!!selectedGradientDef}
        onClose={actions.closeModal}
        selectedAnimationId={state.selectedAnimationId}
        isAnimating={state.isAnimating}
        isFavorite={state.selectedGradient ? actions.isFavorite(state.selectedGradient) : false}
        onGradientChange={actions.updateGradient}
        onAnimationChange={actions.selectAnimation}
        onToggleAnimating={actions.toggleAnimating}
        onToggleFavorite={() => state.selectedGradient && actions.toggleFavorite(state.selectedGradient)}
        onShare={handleShare}
      />

      {/* Discovery Wizard Modal */}
      <DiscoveryWizard
        isOpen={wizard.isOpen}
        selections={wizard.selections}
        matchCount={wizard.matchCount}
        onClose={wizard.closeWizard}
        onApply={wizard.applyFilters}
        onSetVibe={wizard.setVibe}
        onToggleColor={wizard.toggleColor}
      />
    </div>
  );
}
