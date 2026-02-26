import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy':       '#1A2238',  // Primary dark — header, hero overlay, footer
        'navy-deep':  '#111828',  // Deepest dark — hero bg, footer bg
        'navy-mid':   '#263352',  // Hover state for dark elements
        'red':        '#C8462A',  // Primary CTA — buttons, links, accents
        'red-hover':  '#D95A3E',  // Red hover state
        'gold':       '#D49B2C',  // "Join Now" — nav CTA, badge accents
        'gold-hover': '#E5AD3E',  // Gold hover
        'teal':       '#1B4D5C',  // Section bg — membership, advocacy panels
        'teal-light': '#245E6F',  // Teal hover
        'cream':      '#F7F5F0',  // Page background
        'warm-gray':  '#E3E0D9',  // Borders, dividers
        'slate':      '#4A5568',  // Secondary text
        'light-slate':'#718096',  // Tertiary text
        'charcoal':   '#1A202C',  // Body text
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(17,24,40,0.72) 0%, rgba(26,34,56,0.60) 60%, rgba(26,34,56,0.80) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
