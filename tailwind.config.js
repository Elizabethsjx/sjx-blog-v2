/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary corporate navy palette
        'evercore-navy': {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',  // Primary dark navy
        },
        // Neutral grays
        'evercore-gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Accent colors (used very sparingly)
        'evercore-accent': {
          red: '#c41230',      // For negative indicators
          green: '#007a5a',    // For positive indicators
          blue: '#0057b8',     // For links and buttons
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#334e68',
            h1: {
              fontFamily: 'Georgia, serif',
              fontWeight: '600',
            },
            h2: {
              fontFamily: 'Georgia, serif',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'Georgia, serif',
              fontWeight: '600',
            },
            a: {
              color: '#0057b8',
              '&:hover': {
                color: '#102a43',
              },
            },
          },
        },
      },
      backgroundImage: {
        'evercore-gradient': 'linear-gradient(to right, var(--color-evercore-navy-800), var(--color-evercore-navy-900))',
      },
    },
  },
  plugins: [],
}
