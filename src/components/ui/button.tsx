import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

// Inlined CVA - variant classes mapped directly
const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variantStyles = {
  default: 'bg-white text-black hover:bg-neutral-200',
  secondary: 'bg-neutral-800 text-white hover:bg-neutral-700',
  ghost: 'hover:bg-neutral-800 text-neutral-400 hover:text-white',
  outline: 'border border-neutral-700 bg-transparent hover:bg-neutral-800 text-neutral-400 hover:text-white',
} as const;

const sizeStyles = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-12 rounded-lg px-8',
  icon: 'h-10 w-10',
  'icon-sm': 'h-8 w-8',
  'icon-xs': 'h-5 w-5',
} as const;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
