import { useCallback, useState, lazy, Suspense, useMemo } from "react";
import { toast, useToastRegister } from "./components/Toast";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GradientGallery } from "./components/GradientGallery";
import { ScrollToTop } from "./components/ScrollToTop";
import { GitHubCorner } from "./components/GitHubCorner";
import { SplashScreen } from "./components/SplashScreen";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Lazy load the modal - it's not needed until user clicks a gradient
const GradientDetail = lazy(() =>
  import("./components/GradientDetail").then((m) => ({
    default: m.GradientDetail,
  })),
);
import { useAppState } from "./hooks/useAppState";
import { useKeyboard } from "./hooks/useKeyboard";
import { gradients } from "./data/gradients";
import {
  decodeGradient,
  gradientToCSS,
  encodeGradient,
  parseGradientCSS,
} from "./lib/gradient-url";
import type { GradientPreset } from "./types";

// Pre-compute encoded gradients for name lookup
const encodedToNameMap = new Map<string, string>();
gradients.forEach((g) => {
  const def = parseGradientCSS(g.gradient);
  if (def) {
    encodedToNameMap.set(encodeGradient(def), g.name);
  }
});

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { state, favorites, actions } = useAppState();

  // Register toast function
  useToastRegister();

  // Set up keyboard shortcuts
  useKeyboard({
    onEscape: () => {
      if (state.selectedGradient) {
        actions.selectGradient(null);
      }
    },
    onCopy: async () => {
      if (state.selectedGradient) {
        const gradientDef = decodeGradient(state.selectedGradient);
        if (gradientDef) {
          await navigator.clipboard.writeText(gradientToCSS(gradientDef));
          toast.success("Copied to clipboard");
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

  // Get the gradient name from the encoded gradient
  const selectedGradientName = useMemo(() => {
    if (!state.selectedGradient) return null;
    return encodedToNameMap.get(state.selectedGradient) ?? null;
  }, [state.selectedGradient]);

  // Handle gradient selection from gallery
  const handleSelectGradient = useCallback(
    (gradient: GradientPreset) => {
      actions.selectPreset(gradient);
    },
    [actions],
  );

  // Handle share - returns the shareable URL
  const handleShare = useCallback(() => {
    return actions.getShareURL();
  }, [actions]);

  // Toggle favorites filter
  const handleToggleFavorites = useCallback(() => {
    actions.setCategory(state.category === "Favorites" ? "All" : "Favorites");
  }, [actions, state.category]);

  // Get selected gradient definition (decoded from URL-encoded string)
  const selectedGradientDef = state.selectedGradient
    ? decodeGradient(state.selectedGradient)
    : null;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {showSplash && (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
          minDuration={2000}
        />
      )}
      <Header
        colors={state.colors}
        tags={state.tags}
        gradientType={state.gradientType}
        previewMode={state.previewMode}
        colorFormat={state.colorFormat}
        selectedAnimationId={state.selectedAnimationId}
        animationSpeed={state.animationSpeed}
        showFavoritesOnly={state.category === "Favorites"}
        onColorsChange={actions.setColors}
        onToggleColor={actions.toggleColor}
        onToggleTag={actions.toggleTag}
        onGradientTypeChange={actions.setGradientType}
        onPreviewModeChange={actions.setPreviewMode}
        onColorFormatChange={actions.setColorFormat}
        onAnimationChange={actions.selectAnimation}
        onAnimationSpeedChange={actions.setAnimationSpeed}
        onToggleFavorites={handleToggleFavorites}
        onClearFilters={actions.clearFilters}
        hasActiveFilters={actions.hasActiveFilters()}
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
            animationSpeed={state.animationSpeed}
            favorites={favorites}
            onSelectGradient={handleSelectGradient}
            onToggleFavorite={actions.toggleFavorite}
            isFavorite={actions.isFavorite}
          />
        </ErrorBoundary>
      </main>

      <Footer />

      <ScrollToTop />
      <GitHubCorner />

      {/* Gradient Detail Modal - lazy loaded */}
      {selectedGradientDef && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <GradientDetail
              gradientDef={selectedGradientDef}
              gradientName={selectedGradientName}
              encodedGradient={state.selectedGradient}
              isOpen={!!selectedGradientDef}
              onClose={actions.closeModal}
              selectedAnimationId={state.selectedAnimationId}
              animationSpeed={state.animationSpeed}
              isAnimating={state.isAnimating}
              isFavorite={
                state.selectedGradient
                  ? actions.isFavorite(state.selectedGradient)
                  : false
              }
              colorFormat={state.colorFormat}
              skipAnimation={actions.shouldSkipModalAnimation()}
              onGradientChange={actions.updateGradient}
              onAnimationChange={actions.selectAnimation}
              onAnimationSpeedChange={actions.setAnimationSpeed}
              onToggleAnimating={actions.toggleAnimating}
              onToggleFavorite={() =>
                state.selectedGradient &&
                actions.toggleFavorite(state.selectedGradient)
              }
              onColorFormatChange={actions.setColorFormat}
              onShare={handleShare}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}
