/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      // ─────────────────────────────────────────────
      // FONT SYSTEM
      // ─────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'Geist', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },

      // ─────────────────────────────────────────────
      // COLOR PALETTE — Accessible (WCAG AA minimum)
      // Primary: Blue-600 (#2563EB) on white → 4.54:1 ✅
      // Text:    Slate-900 on white → 17.7:1 ✅ (AAA)
      // Subtle:  Slate-500 on white → 4.6:1 ✅ (AA)
      // ─────────────────────────────────────────────
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',  // primary
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        surface: {
          // Light mode surfaces
          base: '#ffffff',
          subtle: '#f8fafc',  // slate-50
          muted: '#f1f5f9',  // slate-100
          border: '#e2e8f0',  // slate-200
          // Dark mode surfaces (bg-* utilities use these via CSS vars)
          'dark-base': '#030712',  // gray-950
          'dark-subtle': '#0f172a',  // slate-900
          'dark-muted': '#1e293b',  // slate-800
          'dark-border': '#334155',  // slate-700
        },
        ink: {
          primary: '#0f172a',  // slate-900 — main body text
          secondary: '#475569',  // slate-600 — secondary text
          muted: '#94a3b8',  // slate-400 — placeholders
          inverse: '#f8fafc',  // light text on dark bg
        },
      },

      // ─────────────────────────────────────────────
      // BORDER RADIUS — Consistent curvature scale
      // ─────────────────────────────────────────────
      borderRadius: {
        'sm': '0.375rem',  //  6px — subtle, badges
        'md': '0.5rem',    //  8px — inputs, small cards
        'lg': '0.75rem',   // 12px — default cards
        'xl': '1rem',      // 16px — prominent cards
        '2xl': '1.25rem',   // 20px — modals, large cards
        '3xl': '1.5rem',    // 24px — hero elements
        'pill': '9999px',    //        tags, chips, avatars
      },

      // ─────────────────────────────────────────────
      // BOX SHADOWS — Layered depth system
      // ─────────────────────────────────────────────
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.14)',
        // Brand glow — use on CTAs and focused states
        'brand': '0 0 0 3px rgb(37 99 235 / 0.15), 0 4px 12px -2px rgb(37 99 235 / 0.25)',
        'brand-lg': '0 8px 32px -4px rgb(37 99 235 / 0.35)',
        // Inner shadows
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
        // Dark mode cards
        'dark-card': '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
        'dark-lg': '0 10px 30px -8px rgb(0 0 0 / 0.6)',
      },

      // ─────────────────────────────────────────────
      // SPACING — 4-point grid extension
      // ─────────────────────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ─────────────────────────────────────────────
      // TYPOGRAPHY — Fluid type scale
      // ─────────────────────────────────────────────
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],  // 10px
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],    // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1.1' }],       // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],         // 60px
      },

      // ─────────────────────────────────────────────
      // TRANSITIONS — Consistent motion
      // ─────────────────────────────────────────────
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in-quad': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
        'out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      // ─────────────────────────────────────────────
      // ANIMATIONS
      // ─────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s cubic-bezier(0.4,0,0.2,1) forwards',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },

      // ─────────────────────────────────────────────
      // BACKDROP BLUR — Glassmorphism
      // ─────────────────────────────────────────────
      backdropBlur: {
        'xs': '2px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '40px',
      },
    },
  },
  plugins: [],
};
