import { cn } from "@/lib/utils";

interface AnimationSpeedSliderProps {
  speed: number; // in milliseconds
  onChange: (speed: number) => void;
  className?: string;
  compact?: boolean;
}

// Range: 500ms (0.5s) to 10000ms (10s)
const MIN_SPEED = 500;
const MAX_SPEED = 10000;

export function AnimationSpeedSlider({
  speed,
  onChange,
  className,
  compact = false,
}: AnimationSpeedSliderProps) {
  const speedInSeconds = (speed / 1000).toFixed(1);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {!compact && (
        <span className="text-xs text-neutral-400 whitespace-nowrap">
          Speed
        </span>
      )}
      <div className="flex items-center gap-2 flex-1">
        <span className="text-[10px] text-neutral-500">Fast</span>
        <input
          type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          step={100}
          value={speed}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Animation speed"
          className="flex-1 h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        />
        <span className="text-[10px] text-neutral-500">Slow</span>
      </div>
      <span className="text-xs font-mono text-white w-10 text-right">
        {speedInSeconds}s
      </span>
    </div>
  );
}

/**
 * Helper to apply animation speed override to animation style
 * Parses the animation property and replaces the duration
 */
export function applyAnimationSpeed(
  animationStyle: React.CSSProperties,
  speedMs: number,
): React.CSSProperties {
  if (!animationStyle.animation) {
    return animationStyle;
  }

  const animation = animationStyle.animation as string;
  // Animation format: "name duration timing iteration" e.g. "gradient-shift 3s ease infinite"
  // Replace the duration (e.g., "3s" or "0.5s") with the custom speed
  const speedInSeconds = speedMs / 1000;
  const modifiedAnimation = animation.replace(
    /\b(\d+\.?\d*)(s|ms)\b/,
    `${speedInSeconds}s`,
  );

  return {
    ...animationStyle,
    animation: modifiedAnimation,
  };
}
