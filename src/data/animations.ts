import type { Animation } from '@/types';

// IMPORTANT: Animations must ONLY affect the gradient itself, NOT the container.
// Valid: background-position, background-size changes
// Invalid: opacity, transform, filter effects on the container

export const animations: Animation[] = [
  {
    id: 'none',
    name: 'Static',
    description: 'No animation',
    category: 'Movement',
    keyframes: '',
    property: '',
    preview: { duration: '0s', timing: 'linear' },
  },
  {
    id: 'shift',
    name: 'Shift',
    description: 'Horizontal slide',
    category: 'Movement',
    keyframes: 'gradient-shift',
    property: 'background-size: 200% 200%; animation: gradient-shift 3s ease infinite;',
    preview: { duration: '3s', timing: 'ease' },
  },
  {
    id: 'wave',
    name: 'Wave',
    description: 'Smooth back & forth',
    category: 'Wave',
    keyframes: 'gradient-wave',
    property: 'background-size: 300% 100%; animation: gradient-wave 3s ease-in-out infinite;',
    preview: { duration: '3s', timing: 'ease-in-out' },
  },
  {
    id: 'flow',
    name: 'Flow',
    description: 'Diagonal motion',
    category: 'Movement',
    keyframes: 'gradient-flow',
    property: 'background-size: 200% 200%; animation: gradient-flow 4s ease infinite;',
    preview: { duration: '4s', timing: 'ease' },
  },
  {
    id: 'shimmer',
    name: 'Shimmer',
    description: 'Quick sweep',
    category: 'Movement',
    keyframes: 'gradient-shimmer',
    property: 'background-size: 200% 100%; animation: gradient-shimmer 1.5s linear infinite;',
    preview: { duration: '1.5s', timing: 'linear' },
  },
  {
    id: 'sway',
    name: 'Sway',
    description: 'Circular motion',
    category: 'Movement',
    keyframes: 'gradient-sway',
    property: 'background-size: 200% 200%; animation: gradient-sway 5s ease-in-out infinite;',
    preview: { duration: '5s', timing: 'ease-in-out' },
  },
  {
    id: 'drift',
    name: 'Drift',
    description: 'Vertical float',
    category: 'Movement',
    keyframes: 'gradient-drift',
    property: 'background-size: 100% 200%; animation: gradient-drift 4s ease-in-out infinite;',
    preview: { duration: '4s', timing: 'ease-in-out' },
  },
  {
    id: 'pulse-move',
    name: 'Pulse',
    description: 'Size pulse',
    category: 'Pulse',
    keyframes: 'gradient-pulse-move',
    property: 'background-size: 200% 200%; animation: gradient-pulse-move 2s ease-in-out infinite;',
    preview: { duration: '2s', timing: 'ease-in-out' },
  },
  {
    id: 'breathe-move',
    name: 'Breathe',
    description: 'Slow inhale/exhale',
    category: 'Pulse',
    keyframes: 'gradient-breathe-move',
    property: 'background-size: 300% 300%; animation: gradient-breathe-move 6s ease-in-out infinite;',
    preview: { duration: '6s', timing: 'ease-in-out' },
  },
];

export function getAnimationById(id: string): Animation | undefined {
  return animations.find((a) => a.id === id);
}
