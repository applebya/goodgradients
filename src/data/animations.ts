import type { Animation } from '@/types';

export const animations: Animation[] = [
  // Movement animations
  {
    id: 'shift-horizontal',
    name: 'Horizontal Shift',
    description: 'Smooth left-to-right gradient movement',
    category: 'Movement',
    keyframes: `@keyframes shift-horizontal {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}`,
    property: 'background-size: 200% 200%; animation: shift-horizontal 3s ease infinite;',
    preview: { duration: '3s', timing: 'ease' },
  },
  {
    id: 'shift-diagonal',
    name: 'Diagonal Flow',
    description: 'Elegant diagonal gradient movement',
    category: 'Movement',
    keyframes: `@keyframes shift-diagonal {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
}`,
    property: 'background-size: 200% 200%; animation: shift-diagonal 4s ease infinite;',
    preview: { duration: '4s', timing: 'ease' },
  },
  {
    id: 'shift-vertical',
    name: 'Vertical Flow',
    description: 'Top-to-bottom gradient movement',
    category: 'Movement',
    keyframes: `@keyframes shift-vertical {
  0%, 100% { background-position: 50% 0%; }
  50% { background-position: 50% 100%; }
}`,
    property: 'background-size: 200% 200%; animation: shift-vertical 3s ease infinite;',
    preview: { duration: '3s', timing: 'ease' },
  },

  // Rotation animations
  {
    id: 'hue-rotate',
    name: 'Color Cycle',
    description: 'Smooth rotation through color spectrum',
    category: 'Rotation',
    keyframes: `@keyframes hue-rotate {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}`,
    property: 'animation: hue-rotate 4s linear infinite;',
    preview: { duration: '4s', timing: 'linear' },
  },
  {
    id: 'gentle-rotate',
    name: 'Gentle Shift',
    description: 'Subtle color oscillation',
    category: 'Rotation',
    keyframes: `@keyframes gentle-rotate {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(20deg); }
}`,
    property: 'animation: gentle-rotate 3s ease-in-out infinite;',
    preview: { duration: '3s', timing: 'ease-in-out' },
  },

  // Pulse animations
  {
    id: 'pulse-glow',
    name: 'Pulse Glow',
    description: 'Breathing opacity effect',
    category: 'Pulse',
    keyframes: `@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}`,
    property: 'animation: pulse-glow 2s ease-in-out infinite;',
    preview: { duration: '2s', timing: 'ease-in-out' },
  },
  {
    id: 'heartbeat',
    name: 'Heartbeat',
    description: 'Rhythmic pulsing scale effect',
    category: 'Pulse',
    keyframes: `@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.02); }
  28% { transform: scale(1); }
  42% { transform: scale(1.02); }
  70% { transform: scale(1); }
}`,
    property: 'animation: heartbeat 1.5s ease-in-out infinite;',
    preview: { duration: '1.5s', timing: 'ease-in-out' },
  },
  {
    id: 'brightness-pulse',
    name: 'Brightness Pulse',
    description: 'Subtle brightness variation',
    category: 'Pulse',
    keyframes: `@keyframes brightness-pulse {
  0%, 100% { filter: brightness(100%); }
  50% { filter: brightness(110%); }
}`,
    property: 'animation: brightness-pulse 2s ease-in-out infinite;',
    preview: { duration: '2s', timing: 'ease-in-out' },
  },

  // Morph animations
  {
    id: 'color-morph',
    name: 'Color Morph',
    description: 'Full spectrum color transformation',
    category: 'Morph',
    keyframes: `@keyframes color-morph {
  0%, 100% { filter: hue-rotate(0deg) saturate(100%); }
  25% { filter: hue-rotate(90deg) saturate(120%); }
  50% { filter: hue-rotate(180deg) saturate(100%); }
  75% { filter: hue-rotate(270deg) saturate(120%); }
}`,
    property: 'animation: color-morph 5s ease infinite;',
    preview: { duration: '5s', timing: 'ease' },
  },
  {
    id: 'subtle-shift',
    name: 'Subtle Shift',
    description: 'Very gentle color variation',
    category: 'Morph',
    keyframes: `@keyframes subtle-shift {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(10deg); }
}`,
    property: 'animation: subtle-shift 4s ease-in-out infinite;',
    preview: { duration: '4s', timing: 'ease-in-out' },
  },

  // Wave animations
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Northern lights flowing effect',
    category: 'Wave',
    keyframes: `@keyframes aurora {
  0%, 100% {
    background-position: 0% 50%;
    filter: hue-rotate(0deg) brightness(100%);
  }
  25% {
    background-position: 50% 100%;
    filter: hue-rotate(15deg) brightness(105%);
  }
  50% {
    background-position: 100% 50%;
    filter: hue-rotate(0deg) brightness(110%);
  }
  75% {
    background-position: 50% 0%;
    filter: hue-rotate(-15deg) brightness(105%);
  }
}`,
    property: 'background-size: 300% 300%; animation: aurora 5s ease-in-out infinite;',
    preview: { duration: '5s', timing: 'ease-in-out' },
  },
  {
    id: 'wave-ripple',
    name: 'Wave Ripple',
    description: 'Rippling wave with brightness',
    category: 'Wave',
    keyframes: `@keyframes wave-ripple {
  0%, 100% { background-position: 0% 50%; filter: brightness(100%); }
  33% { background-position: 50% 100%; filter: brightness(110%); }
  66% { background-position: 100% 50%; filter: brightness(90%); }
}`,
    property: 'background-size: 200% 200%; animation: wave-ripple 3s ease-in-out infinite;',
    preview: { duration: '3s', timing: 'ease-in-out' },
  },
  {
    id: 'border-glow',
    name: 'Border Glow',
    description: 'Elegant glowing border effect',
    category: 'Wave',
    keyframes: `@keyframes border-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255,255,255,0.1),
                inset 0 0 0 1px rgba(255,255,255,0);
  }
  50% {
    box-shadow: 0 0 20px 3px rgba(255,255,255,0.2),
                inset 0 0 20px 3px rgba(255,255,255,0.15);
  }
}`,
    property: 'animation: border-glow 2s ease-in-out infinite;',
    preview: { duration: '2s', timing: 'ease-in-out' },
  },
];

export const animationCategories = ['All', 'Movement', 'Rotation', 'Pulse', 'Morph', 'Wave'] as const;

export function getAnimationById(id: string): Animation | undefined {
  return animations.find((a) => a.id === id);
}

export function getAnimationsByCategory(category: string): Animation[] {
  if (category === 'All') return animations;
  return animations.filter((a) => a.category === category);
}
