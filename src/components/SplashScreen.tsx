import { useEffect, useState, useMemo } from 'react';
import { gradients } from '@/data/gradients';

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

// Curated gradient names - diverse colors for maximum blend impact
const splashGradientNames = [
  // Warm spectrum
  'Sunset Fire',
  'Hot Pink',
  'Fuchsia',
  'Tangerine',
  // Cool spectrum
  'Ocean Depth',
  'Electric Blue',
  'Deep Teal',
  'Aqua Teal',
  // Purple/violet spectrum
  'Velvet Dream',
  'Cosmic Purple',
  'Violet Storm',
  // Accent colors
  'Emerald',
  'Lime Zest',
  'Coral Sunset',
];

// 14 panels with aggressive positioning for full coverage
const panelConfigs = [
  // Corner anchors - large and bold
  { gradient: 0, rotate: -25, x: -40, y: -50, scale: 2.2 },
  { gradient: 1, rotate: 30, x: 50, y: -45, scale: 2.0 },
  { gradient: 2, rotate: -20, x: -45, y: 55, scale: 2.1 },
  { gradient: 3, rotate: 25, x: 55, y: 50, scale: 2.0 },
  // Mid-layer fills
  { gradient: 4, rotate: 15, x: 0, y: -35, scale: 1.9 },
  { gradient: 5, rotate: -12, x: -30, y: 0, scale: 1.8 },
  { gradient: 6, rotate: 18, x: 35, y: 0, scale: 1.8 },
  { gradient: 7, rotate: -8, x: 0, y: 40, scale: 1.9 },
  // Inner intense layer
  { gradient: 8, rotate: -35, x: -15, y: -20, scale: 1.7 },
  { gradient: 9, rotate: 40, x: 20, y: -15, scale: 1.6 },
  { gradient: 10, rotate: -30, x: -20, y: 25, scale: 1.7 },
  { gradient: 11, rotate: 35, x: 15, y: 20, scale: 1.6 },
  // Center pop
  { gradient: 12, rotate: 5, x: 0, y: 0, scale: 1.5 },
  { gradient: 13, rotate: -5, x: 5, y: -5, scale: 1.4 },
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

  // Create animated gradient for text
  const textGradient = `linear-gradient(
    135deg,
    #f472b6 0%,
    #c084fc 25%,
    #60a5fa 50%,
    #34d399 75%,
    #fbbf24 100%
  )`;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-black transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Gradient panels with screen blend for color mixing */}
      {panelConfigs.map((config, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all ${
            isSettling ? 'duration-[2000ms] ease-out' : 'duration-0'
          }`}
          style={{
            background: splashGradients[config.gradient],
            mixBlendMode: 'screen',
            opacity: isSettling ? 0.7 : 0.9,
            transform: isSettling
              ? `rotate(${config.rotate * 0.2}deg) translate(${config.x * 0.2}%, ${config.y * 0.2}%) scale(${1 + (config.scale - 1) * 0.3})`
              : `rotate(${config.rotate}deg) translate(${config.x}%, ${config.y}%) scale(${config.scale})`,
            transformOrigin: 'center center',
            animation: isSettling ? 'none' : `splash-drift-${index % 3} ${2.5 + index * 0.3}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Glow overlay for bloom effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Glow behind text */}
        <div
          className="absolute w-[600px] h-[200px] blur-3xl opacity-60"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Gradient text */}
        <h1
          className={`relative text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter ${
            isSettling ? 'splash-text-settle' : 'splash-text-pulse'
          }`}
          style={{
            background: textGradient,
            backgroundSize: '200% 200%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.1)',
            filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.3)) drop-shadow(0 0 60px rgba(168,85,247,0.4))',
            animation: isSettling ? 'none' : 'gradient-shift 4s ease infinite',
          }}
        >
          Good Gradients
        </h1>

        {/* Loading indicator */}
        <div
          className={`mt-8 flex items-center gap-3 transition-opacity duration-1000 ${
            isSettling ? 'opacity-40' : 'opacity-80'
          }`}
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-white"
                style={{
                  animation: `splash-dot 1s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
