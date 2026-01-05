import { useEffect, useState, useMemo } from 'react';
import { gradients } from '@/data/gradients';

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

// Curated gradient names for maximum visual impact
const splashGradientNames = [
  'Velvet Dream',
  'Ocean Depth',
  'Sunset Fire',
  'Cyberpunk',
  'Northern Lights',
  'Vaporwave',
];

// Panel configurations for dramatic layering
const panelConfigs = [
  { gradient: 0, rotate: -15, x: -20, y: -30, scale: 1.8, opacity: 0.9 },
  { gradient: 1, rotate: 25, x: 40, y: -20, scale: 1.6, opacity: 0.85 },
  { gradient: 2, rotate: -8, x: -30, y: 40, scale: 1.7, opacity: 0.8 },
  { gradient: 3, rotate: 18, x: 30, y: 20, scale: 1.5, opacity: 0.85 },
  { gradient: 4, rotate: -22, x: 10, y: -40, scale: 1.9, opacity: 0.75 },
  { gradient: 5, rotate: 12, x: -15, y: 35, scale: 1.6, opacity: 0.8 },
];

export function SplashScreen({ onComplete, minDuration = 1500 }: SplashScreenProps) {
  const [isSettling, setIsSettling] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Get actual gradient CSS from the database
  const splashGradients = useMemo(() => {
    return splashGradientNames.map((name) => {
      const preset = gradients.find((g) => g.name === name);
      return preset?.gradient ?? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    });
  }, []);

  useEffect(() => {
    // Start settling animation after initial dramatic phase
    const settleTimer = setTimeout(() => {
      setIsSettling(true);
    }, 800);

    // Mark as ready after minimum duration
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, minDuration);

    return () => {
      clearTimeout(settleTimer);
      clearTimeout(readyTimer);
    };
  }, [minDuration]);

  useEffect(() => {
    if (isReady) {
      setIsFadingOut(true);
      const fadeTimer = setTimeout(() => {
        onComplete();
      }, 500); // Fade out duration
      return () => clearTimeout(fadeTimer);
    }
  }, [isReady, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-neutral-950 transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Gradient panels */}
      {panelConfigs.map((config, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all ${
            isSettling ? 'duration-[2000ms] ease-out' : 'duration-0'
          }`}
          style={{
            background: splashGradients[config.gradient],
            opacity: isSettling ? config.opacity * 0.6 : config.opacity,
            transform: isSettling
              ? `rotate(${config.rotate * 0.3}deg) translate(${config.x * 0.3}%, ${config.y * 0.3}%) scale(${1 + (config.scale - 1) * 0.5})`
              : `rotate(${config.rotate}deg) translate(${config.x}%, ${config.y}%) scale(${config.scale})`,
            transformOrigin: 'center center',
            animation: isSettling ? 'none' : `splash-drift-${index % 3} ${3 + index * 0.5}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1
          className={`text-5xl sm:text-7xl font-bold text-white tracking-tight drop-shadow-2xl ${
            isSettling ? 'splash-text-settle' : 'splash-text-pulse'
          }`}
          style={{
            textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 0 60px rgba(255,255,255,0.1)',
          }}
        >
          Good Gradients
        </h1>
        <div
          className={`mt-6 flex items-center gap-2 text-white/70 text-sm transition-opacity duration-1000 ${
            isSettling ? 'opacity-60' : 'opacity-100'
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
          <span>Loading</span>
        </div>
      </div>
    </div>
  );
}
