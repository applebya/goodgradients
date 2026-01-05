import { useEffect, useState, useMemo } from 'react';
import { gradients } from '@/data/gradients';

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

// Hand-picked vibrant multi-color gradients for maximum impact
const splashGradientNames = [
  'Cyberpunk',      // cyan → pink
  'Vaporwave',      // pink → cyan
  'Sunset Beach',   // purple → pink
  'Northern Lights', // green → blue
  'Dusk',           // orange → pink
  'Candy Pop',      // pink → purple
  'Ocean Breeze',   // teal → blue
  'Fuchsia',        // bold fuchsia
  'Electric Blue',  // vibrant blue
  'Coral Sunset',   // coral warmth
];

export function SplashScreen({ onComplete, minDuration = 2000 }: SplashScreenProps) {
  const [phase, setPhase] = useState<'entrance' | 'hold' | 'exit'>('entrance');

  // Get gradient CSS strings from database
  const gradientStyles = useMemo(() => {
    return splashGradientNames.map((name) => {
      const preset = gradients.find((g) => g.name === name);
      return preset?.gradient ?? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)';
    });
  }, []);

  useEffect(() => {
    // Entrance animation complete
    const holdTimer = setTimeout(() => setPhase('hold'), 600);
    // Begin exit
    const exitTimer = setTimeout(() => setPhase('exit'), minDuration);
    // Complete
    const completeTimer = setTimeout(() => onComplete(), minDuration + 400);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [minDuration, onComplete]);

  const isEntrance = phase === 'entrance';
  const isExit = phase === 'exit';

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-400 ${
        isExit ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Base layer - rich dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        }}
      />

      {/* Gradient orbs - positioned blobs of color */}
      {gradientStyles.map((gradient, i) => {
        // Position each gradient as a large orb in different areas
        const positions = [
          { top: '-20%', left: '-10%', size: '80vmax' },
          { top: '-30%', right: '-20%', size: '90vmax' },
          { bottom: '-25%', left: '-15%', size: '85vmax' },
          { bottom: '-20%', right: '-10%', size: '75vmax' },
          { top: '10%', left: '20%', size: '60vmax' },
          { top: '20%', right: '15%', size: '55vmax' },
          { bottom: '15%', left: '25%', size: '50vmax' },
          { bottom: '10%', right: '20%', size: '45vmax' },
          { top: '40%', left: '-5%', size: '70vmax' },
          { top: '30%', right: '-10%', size: '65vmax' },
        ];
        const pos = positions[i] || positions[0];

        return (
          <div
            key={i}
            className="absolute rounded-full transition-all duration-1000 ease-out"
            style={{
              ...pos,
              width: pos.size,
              height: pos.size,
              background: gradient,
              opacity: isEntrance ? 0 : isExit ? 0.3 : 0.7,
              filter: 'blur(60px)',
              transform: isEntrance
                ? `scale(0.5) rotate(${i * 36}deg)`
                : `scale(1) rotate(${i * 36 + 10}deg)`,
              animation: !isEntrance && !isExit ? `splash-float-${i % 3} ${8 + i}s ease-in-out infinite` : 'none',
            }}
          />
        );
      })}

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Text glow */}
        <div
          className={`absolute transition-all duration-700 ${
            isEntrance ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
          }`}
          style={{
            width: '600px',
            height: '150px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, rgba(236,72,153,0.2) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Main title */}
        <h1
          className={`relative text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white transition-all duration-700 ${
            isEntrance ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            textShadow: '0 0 80px rgba(139,92,246,0.5), 0 0 40px rgba(236,72,153,0.3)',
          }}
        >
          Good Gradients
        </h1>

        {/* Loading dots */}
        <div
          className={`mt-8 flex gap-2 transition-all duration-500 delay-200 ${
            isEntrance ? 'opacity-0' : isExit ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white/60"
              style={{
                animation: 'splash-dot 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
