import type { Animation } from "@/types";

// IMPORTANT: Animations must ONLY affect the gradient itself, NOT the container.
// Valid: background-position, background-size changes
// Invalid: opacity, transform, filter effects on the container

export const animations: Animation[] = [
  {
    id: "none",
    name: "No animation",
    description: "Static gradient",
    category: "Movement",
    keyframes: "",
    property: "",
    preview: { duration: "0s", timing: "linear" },
  },
  {
    id: "shift",
    name: "Shift",
    description: "Horizontal slide",
    category: "Movement",
    keyframes: `@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}`,
    property:
      "background-size: 200% 200%; animation: gradient-shift 3s ease infinite;",
    preview: { duration: "3s", timing: "ease" },
  },
  {
    id: "wave",
    name: "Wave",
    description: "Smooth back & forth",
    category: "Wave",
    keyframes: `@keyframes gradient-wave {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}`,
    property:
      "background-size: 300% 100%; animation: gradient-wave 3s ease-in-out infinite;",
    preview: { duration: "3s", timing: "ease-in-out" },
  },
  {
    id: "flow",
    name: "Flow",
    description: "Diagonal motion",
    category: "Movement",
    keyframes: `@keyframes gradient-flow {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}`,
    property:
      "background-size: 200% 200%; animation: gradient-flow 4s ease infinite;",
    preview: { duration: "4s", timing: "ease" },
  },
  {
    id: "shimmer",
    name: "Shimmer",
    description: "Quick sweep",
    category: "Movement",
    keyframes: `@keyframes gradient-shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
}`,
    property:
      "background-size: 200% 100%; animation: gradient-shimmer 1.5s linear infinite;",
    preview: { duration: "1.5s", timing: "linear" },
  },
  {
    id: "sway",
    name: "Sway",
    description: "Circular motion",
    category: "Movement",
    keyframes: `@keyframes gradient-sway {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 50% 0%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 100%; }
}`,
    property:
      "background-size: 200% 200%; animation: gradient-sway 5s ease-in-out infinite;",
    preview: { duration: "5s", timing: "ease-in-out" },
  },
  {
    id: "drift",
    name: "Drift",
    description: "Vertical float",
    category: "Movement",
    keyframes: `@keyframes gradient-drift {
  0%, 100% { background-position: 50% 0%; }
  50% { background-position: 50% 100%; }
}`,
    property:
      "background-size: 100% 200%; animation: gradient-drift 4s ease-in-out infinite;",
    preview: { duration: "4s", timing: "ease-in-out" },
  },
  {
    id: "pulse-move",
    name: "Pulse",
    description: "Size pulse",
    category: "Pulse",
    keyframes: `@keyframes gradient-pulse-move {
  0%, 100% { background-position: 50% 50%; background-size: 200% 200%; }
  50% { background-position: 50% 50%; background-size: 150% 150%; }
}`,
    property:
      "background-size: 200% 200%; animation: gradient-pulse-move 2s ease-in-out infinite;",
    preview: { duration: "2s", timing: "ease-in-out" },
  },
  {
    id: "breathe-move",
    name: "Breathe",
    description: "Slow inhale/exhale",
    category: "Pulse",
    keyframes: `@keyframes gradient-breathe-move {
  0%, 100% { background-position: 50% 50%; background-size: 300% 300%; }
  50% { background-position: 50% 50%; background-size: 200% 200%; }
}`,
    property:
      "background-size: 300% 300%; animation: gradient-breathe-move 6s ease-in-out infinite;",
    preview: { duration: "6s", timing: "ease-in-out" },
  },
];

export function getAnimationById(id: string): Animation | undefined {
  return animations.find((a) => a.id === id);
}
