import * as React from 'react';
import { cn } from '@/lib/utils';

// Inlined CVA - variant classes mapped directly
const baseStyles = 'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors';

const variantStyles = {
  default: 'bg-neutral-800 text-white',
  secondary: 'bg-white/10 text-white',
  outline: 'border border-neutral-700 text-neutral-400',
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantStyles;
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} {...props} />
  );
}

export { Badge };
