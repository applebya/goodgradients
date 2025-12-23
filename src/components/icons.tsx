// Inline SVG icons to replace lucide-react (~5KB vs ~40KB+)
// All icons are 24x24 with stroke-width 2, matching lucide defaults

import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const iconProps: IconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function Copy(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export function Heart(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export function Share2(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function X(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function Play(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

export function Pause(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

export function Layers(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12-8.58 3.91a2 2 0 0 1-1.66 0L3.18 12" />
      <path d="m22 17-8.58 3.91a2 2 0 0 1-1.66 0L3.18 17" />
    </svg>
  );
}

export function Circle(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export function RotateCw(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}

export function Maximize2(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" x2="14" y1="3" y2="10" />
      <line x1="3" x2="10" y1="21" y2="14" />
    </svg>
  );
}

export function Minus(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export function Search(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function Shuffle(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
      <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
      <path d="m18 14 4 4-4 4" />
    </svg>
  );
}

export function Zap(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}
