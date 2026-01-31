import { useState, useCallback } from "react";
import { Heart } from "./icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface HeartButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
  size?: "sm" | "default";
  variant?: "ghost" | "overlay";
  ariaLabel?: string;
}

export function HeartButton({
  isFavorite,
  onToggle,
  className,
  size = "default",
  variant = "ghost",
  ariaLabel,
}: HeartButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      // Only animate when adding to favorites (not when removing)
      if (!isFavorite) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 700); // Match animation duration
      }
      onToggle();
    },
    [isFavorite, onToggle],
  );

  const sizeClasses = size === "sm" ? "h-8 w-8" : "h-8 w-8";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-4 h-4";

  const variantClasses =
    variant === "overlay"
      ? cn(
          "rounded-full bg-black/40 hover:bg-black/60 transition-all",
          isFavorite
            ? "text-red-400 opacity-100"
            : "text-white/70 hover:text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
        )
      : cn(isFavorite && "text-red-400");

  return (
    <Button
      size="icon-sm"
      variant="ghost"
      className={cn(sizeClasses, variantClasses, className)}
      onClick={handleClick}
      aria-label={
        ariaLabel ?? (isFavorite ? "Remove from favorites" : "Add to favorites")
      }
    >
      <Heart
        className={cn(
          iconSize,
          isFavorite && "fill-current",
          isAnimating && "heart-animate",
        )}
      />
    </Button>
  );
}
