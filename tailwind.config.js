/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'border-shine': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0)',
          },
          '50%': {
            boxShadow: '0 0 20px 3px rgba(255,255,255,0.2), inset 0 0 20px 3px rgba(255,255,255,0.15)',
          },
        },
      },
      animation: {
        'border-shine': 'border-shine 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
