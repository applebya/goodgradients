import { useCallback, useRef, useState, lazy, Suspense } from 'react';
import { toast, useToastRegister } from './components/Toast';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GradientGallery } from './components/GradientGallery';
import { ScrollToTop } from './components/ScrollToTop';
import { SplashScreen } from './components/SplashScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load the modal - it's not needed until user clicks a gradient
const GradientDetail = lazy(() =>
  import('./components/GradientDetail').then(m => ({ default: m.GradientDetail }))
);
import { useAppState } from './hooks/useAppState';
import { useKeyboard } from './hooks/useKeyboard';
import { gradients } from './data/gradients';
import { decodeGradient, gradientToCSS } from './lib/gradient-url';
import type { GradientPreset } from './types';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { state, favorites, actions } = useAppState();
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Toggle favorites filter
  const handleToggleFavorites = useCallback(() => {
    actions.setCategory(state.category === 'Favorites' ? 'All' : 'Favorites');
  }, [actions, state.category]);

  // Get selected gradient definition (decoded from URL-encoded string)
  const selectedGradientDef = state.selectedGradient
    ? decodeGradient(state.selectedGradient)
    : null;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} minDuration={2000} />
      )}
      <Header
        searchQuery={state.searchQuery}
        onSearchChange={actions.setSearchQuery}
        searchInputRef={searchInputRef}
        colors={state.colors}
        tags={state.tags}
        gradientType={state.gradientType}
        previewMode={state.previewMode}
        colorFormat={state.colorFormat}
        selectedAnimationId={state.selectedAnimationId}
        showFavoritesOnly={state.category === 'Favorites'}
        onColorsChange={actions.setColors}
        onToggleColor={actions.toggleColor}
        onToggleTag={actions.toggleTag}
        onGradientTypeChange={actions.setGradientType}
        onPreviewModeChange={actions.setPreviewMode}
        onColorFormatChange={actions.setColorFormat}
        onAnimationChange={actions.selectAnimation}
        onToggleFavorites={handleToggleFavorites}
        onClearFilters={actions.clearFilters}
        hasActiveFilters={actions.hasActiveFilters()}
        onRandomGradient={handleRandomGradient}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <ErrorBoundary>
          <GradientGallery
            category={state.category}
            searchQuery={state.searchQuery}
            colors={state.colors}
            tags={state.tags}
            gradientType={state.gradientType}
            previewMode={state.previewMode}
            colorFormat={state.colorFormat}
            selectedAnimationId={state.selectedAnimationId}
            favorites={favorites}
            onSelectGradient={handleSelectGradient}
            onToggleFavorite={actions.toggleFavorite}
            isFavorite={actions.isFavorite}
          />
        </ErrorBoundary>
      </main>

      <Footer />

      <ScrollToTop />

      {/* Gradient Detail Modal - lazy loaded */}
      {selectedGradientDef && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <GradientDetail
              gradientDef={selectedGradientDef}
              encodedGradient={state.selectedGradient}
              isOpen={!!selectedGradientDef}
              onClose={actions.closeModal}
              selectedAnimationId={state.selectedAnimationId}
              isAnimating={state.isAnimating}
              isFavorite={state.selectedGradient ? actions.isFavorite(state.selectedGradient) : false}
              colorFormat={state.colorFormat}
              onGradientChange={actions.updateGradient}
              onAnimationChange={actions.selectAnimation}
              onToggleAnimating={actions.toggleAnimating}
              onToggleFavorite={() => state.selectedGradient && actions.toggleFavorite(state.selectedGradient)}
              onColorFormatChange={actions.setColorFormat}
              onShare={handleShare}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}
