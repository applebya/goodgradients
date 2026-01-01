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
import { getGradientById, gradients } from './data/gradients';
import type { Gradient } from './types';

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
      if (state.selectedGradientId) {
        actions.selectGradient(null);
      } else {
        actions.setSearchQuery('');
      }
    },
    onCopy: async () => {
      if (state.selectedGradientId) {
        const gradient = getGradientById(state.selectedGradientId);
        if (gradient) {
          await navigator.clipboard.writeText(gradient.gradient);
          toast.success('Copied to clipboard');
        }
      }
    },
    onFavorite: () => {
      if (state.selectedGradientId) {
        actions.toggleFavorite(state.selectedGradientId);
      }
    },
    onToggleAnimation: () => {
      if (state.selectedGradientId) {
        actions.toggleAnimating();
      }
    },
  });

  // Handle random gradient selection
  const handleRandomGradient = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    const randomGradient = gradients[randomIndex];
    if (randomGradient) {
      actions.selectGradient(randomGradient.id);
    }
  }, [actions]);

  // Handle gradient selection from gallery
  const handleSelectGradient = useCallback(
    (gradient: Gradient) => {
      actions.selectGradient(gradient.id);
    },
    [actions]
  );

  // Handle share - returns the shareable URL
  const handleShare = useCallback(() => {
    return actions.getShareURL();
  }, [actions]);

  // Get selected gradient object
  const selectedGradient = state.selectedGradientId
    ? getGradientById(state.selectedGradientId)
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
        onClearFilters={wizard.clearFilters}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <GradientGallery
          category={state.category}
          searchQuery={state.searchQuery}
          favorites={favorites}
          gradientType={state.gradientType}
          gradientAngle={state.gradientAngle}
          onSelectGradient={handleSelectGradient}
          onToggleFavorite={actions.toggleFavorite}
          isFavorite={actions.isFavorite}
          wizardFilteredGradients={wizard.hasActiveFilters ? wizard.filteredGradients : undefined}
        />
      </main>

      <Footer />

      {/* Gradient Detail Modal */}
      <GradientDetail
        gradient={selectedGradient ?? null}
        isOpen={!!selectedGradient}
        onClose={actions.closeModal}
        gradientType={state.gradientType}
        gradientAngle={state.gradientAngle}
        selectedAnimationId={state.selectedAnimationId}
        isAnimating={state.isAnimating}
        isFavorite={state.selectedGradientId ? actions.isFavorite(state.selectedGradientId) : false}
        onGradientTypeChange={actions.setGradientType}
        onAngleChange={actions.setGradientAngle}
        onAnimationChange={actions.selectAnimation}
        onToggleAnimating={actions.toggleAnimating}
        onToggleFavorite={() => state.selectedGradientId && actions.toggleFavorite(state.selectedGradientId)}
        onShare={handleShare}
      />

      {/* Discovery Wizard Modal */}
      <DiscoveryWizard
        isOpen={wizard.isOpen}
        currentStep={wizard.currentStep}
        totalSteps={wizard.totalSteps}
        selections={wizard.selections}
        matchCount={wizard.matchCount}
        canGoBack={wizard.canGoBack}
        isLastStep={wizard.isLastStep}
        onClose={wizard.closeWizard}
        onNext={wizard.nextStep}
        onBack={wizard.prevStep}
        onApply={wizard.applyFilters}
        onSetVibe={wizard.setVibe}
        onToggleColor={wizard.toggleColor}
      />
    </div>
  );
}
