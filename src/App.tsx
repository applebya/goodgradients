import { useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GradientGallery } from './components/GradientGallery';
import { GradientDetail } from './components/GradientDetail';
import { AnimationStudio } from './components/AnimationStudio';
import { useAppState } from './hooks/useAppState';
import { useKeyboard } from './hooks/useKeyboard';
import { getGradientById, gradients } from './data/gradients';
import type { Gradient } from './types';

export default function App() {
  const { state, favorites, actions } = useAppState();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Set up keyboard shortcuts
  useKeyboard({
    onSearch: () => searchInputRef.current?.focus(),
    onEscape: () => {
      if (state.selectedGradientId) {
        actions.selectGradient(null);
      } else if (state.view === 'studio') {
        actions.closeModal();
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

  // Handle animation studio combination selection
  const handleStudioCombination = useCallback(
    (gradientId: string, animationId: string) => {
      actions.selectGradient(gradientId);
      actions.selectAnimation(animationId);
    },
    [actions]
  );

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
        onOpenStudio={actions.openStudio}
        searchInputRef={searchInputRef}
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

      {/* Animation Studio Modal */}
      <AnimationStudio
        isOpen={state.view === 'studio'}
        onClose={actions.closeModal}
        onSelectCombination={handleStudioCombination}
      />
    </div>
  );
}
