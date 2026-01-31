import { animations } from "@/data/animations";

/**
 * Global animation keyframes injection.
 * Renders all animation keyframes once at the app level to avoid
 * CSS animation interruptions during component re-renders.
 *
 * Note: keyframes are from internal animations.ts, not user input - safe to inject.
 */
export function AnimationStyles() {
  // Combine all keyframes into a single style block
  const allKeyframes = animations
    .map((anim) => anim.keyframes)
    .filter(Boolean)
    .join("\n");

  if (!allKeyframes) return null;

  return (
    <style
      id="gradient-animation-keyframes"
      dangerouslySetInnerHTML={{ __html: allKeyframes }}
    />
  );
}
