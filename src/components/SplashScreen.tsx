import { useEffect, useState, useMemo, useCallback } from "react";
import { gradients } from "@/data/gradients";

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

// Hand-picked vibrant multi-color gradients for maximum impact
const splashGradientNames = [
  "Cyberpunk", // cyan → pink
  "Vaporwave", // pink → cyan
  "Sunset Beach", // purple → pink
  "Northern Lights", // green → blue
  "Dusk", // orange → pink
  "Candy Pop", // pink → purple
  "Ocean Breeze", // teal → blue
  "Fuchsia", // bold fuchsia
  "Electric Blue", // vibrant blue
  "Coral Sunset", // coral warmth
];

// Check if we should skip splash (cached/returning user)
function shouldSkipSplash(): boolean {
  // Always show splash on localhost for development
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return false;
  }

  const CACHE_KEY = "goodgradients_splash_seen";
  const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const timestamp = parseInt(cached, 10);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return true;
      }
    }
    // Mark as seen
    sessionStorage.setItem(CACHE_KEY, Date.now().toString());
  } catch {
    // sessionStorage not available
  }
  return false;
}

export function SplashScreen({
  onComplete,
  minDuration = 2000,
}: SplashScreenProps) {
  const [phase, setPhase] = useState<"entrance" | "hold" | "exit">("entrance");
  const [shouldRender, setShouldRender] = useState(true);

  // Get gradient CSS strings from database
  const gradientStyles = useMemo(() => {
    return splashGradientNames.map((name) => {
      const preset = gradients.find((g) => g.name === name);
      return (
        preset?.gradient ?? "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)"
      );
    });
  }, []);

  // Handle fade out completion
  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.propertyName === "opacity" && phase === "exit") {
        setShouldRender(false);
        onComplete();
      }
    },
    [phase, onComplete],
  );

  useEffect(() => {
    // Skip splash for cached users
    if (shouldSkipSplash()) {
      setShouldRender(false);
      onComplete();
      return;
    }

    // Entrance animation complete
    const holdTimer = setTimeout(() => setPhase("hold"), 600);
    // Begin exit
    const exitTimer = setTimeout(() => setPhase("exit"), minDuration);
    // Fallback complete (in case transition doesn't fire)
    const completeTimer = setTimeout(() => {
      setShouldRender(false);
      onComplete();
    }, minDuration + 800);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [minDuration, onComplete]);

  const isEntrance = phase === "entrance";
  const isExit = phase === "exit";

  if (!shouldRender) return null;

  // Simple breathe animation with staggered durations for each layer
  const getBreatheDuration = (index: number) => 15 + index * 3; // 15s, 18s, 21s, etc.

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-500 ease-out ${
        isExit ? "opacity-0" : "opacity-100"
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Base layer - rich dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)",
        }}
      />

      {/* Layer 1: Large background orbs - slow drift */}
      {gradientStyles.slice(0, 4).map((gradient, i) => {
        const positions = [
          { top: "-30%", left: "-20%", size: "100vmax" },
          { top: "-40%", right: "-30%", size: "110vmax" },
          { bottom: "-35%", left: "-25%", size: "105vmax" },
          { bottom: "-30%", right: "-20%", size: "95vmax" },
        ];
        const pos = positions[i]!;
        return (
          <div
            key={`bg-${i}`}
            className="absolute rounded-full"
            style={{
              ...pos,
              width: pos.size,
              height: pos.size,
              background: gradient,
              opacity: isEntrance ? 0 : isExit ? 0.2 : 0.5,
              filter: "blur(80px)",
              transform: isEntrance ? "scale(0.6)" : "scale(1)",
              transition: "opacity 800ms ease-out, transform 1000ms ease-out",
              animation: !isEntrance
                ? `splash-breathe ${getBreatheDuration(i)}s ease-in-out infinite`
                : "none",
            }}
          />
        );
      })}

      {/* Layer 2: Mid-layer orbs - medium movement */}
      {gradientStyles.slice(4, 7).map((gradient, i) => {
        const positions = [
          { top: "5%", left: "10%", size: "70vmax" },
          { top: "15%", right: "5%", size: "65vmax" },
          { bottom: "10%", left: "15%", size: "60vmax" },
        ];
        const pos = positions[i]!;
        return (
          <div
            key={`mid-${i}`}
            className="absolute rounded-full"
            style={{
              ...pos,
              width: pos.size,
              height: pos.size,
              background: gradient,
              opacity: isEntrance ? 0 : isExit ? 0.15 : 0.4,
              filter: "blur(50px)",
              transform: isEntrance ? "scale(0.5)" : "scale(1)",
              transition:
                "opacity 600ms ease-out 100ms, transform 800ms ease-out 100ms",
              animation: !isEntrance
                ? `splash-breathe ${getBreatheDuration(i + 4)}s ease-in-out infinite`
                : "none",
            }}
          />
        );
      })}

      {/* Layer 3: Foreground accent orbs - faster, more vibrant */}
      {gradientStyles.slice(7, 10).map((gradient, i) => {
        const positions = [
          { top: "30%", left: "25%", size: "45vmax" },
          { bottom: "25%", right: "20%", size: "50vmax" },
          { top: "45%", right: "30%", size: "40vmax" },
        ];
        const pos = positions[i]!;
        return (
          <div
            key={`fg-${i}`}
            className="absolute rounded-full"
            style={{
              ...pos,
              width: pos.size,
              height: pos.size,
              background: gradient,
              opacity: isEntrance ? 0 : isExit ? 0.1 : 0.35,
              filter: "blur(35px)",
              transform: isEntrance ? "scale(0.4)" : "scale(1)",
              transition:
                "opacity 500ms ease-out 200ms, transform 700ms ease-out 200ms",
              animation: !isEntrance
                ? `splash-breathe ${getBreatheDuration(i + 7)}s ease-in-out infinite`
                : "none",
            }}
          />
        );
      })}

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Text glow */}
        <div
          className="absolute transition-all duration-700"
          style={{
            width: "700px",
            height: "180px",
            background:
              "radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, rgba(236,72,153,0.3) 40%, transparent 70%)",
            filter: "blur(50px)",
            opacity: isEntrance ? 0 : isExit ? 0 : 1,
            transform: isEntrance ? "scale(0.8)" : "scale(1)",
          }}
        />

        {/* Main title - letter by letter animation */}
        <h1
          className="relative text-5xl sm:text-7xl lg:text-8xl text-white"
          style={{
            fontFamily: '"Molle", cursive',
            fontStyle: "italic",
            textShadow:
              "0 0 100px rgba(139,92,246,0.6), 0 0 50px rgba(236,72,153,0.4), 0 0 25px rgba(255,255,255,0.2)",
          }}
        >
          {"GoodGradients.com".split("").map((letter, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-300"
              style={{
                opacity: isEntrance ? 0 : 1,
                transform: isEntrance ? "translateY(30px)" : "translateY(0)",
                transitionDelay: `${i * 40}ms`,
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Loading dots */}
        <div
          className="mt-8 flex gap-2 transition-all duration-500"
          style={{
            opacity: isEntrance ? 0 : isExit ? 0 : 1,
            transform: isEntrance ? "translateY(10px)" : "translateY(0)",
            transitionDelay: "200ms",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white/70"
              style={{
                animation: "splash-dot 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
