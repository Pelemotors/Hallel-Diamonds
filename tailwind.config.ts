import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Jewelry Design System
        background: "#FFFFFF",
        surface: "#FAFAFA",
        text: {
          primary: "#0B0B0C",
          secondary: "#5B5B60",
        },
        border: "#E7E7EA",
        gold: {
          DEFAULT: "#C8A24A",
          hover: "#B38C34",
        },
        success: "#1A7F5A",
        error: "#B42318",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Playfair Display", "serif"],
        body: ["var(--font-body)", "Assistant", "Heebo", "sans-serif"],
        'body-hebrew': ["var(--font-body-hebrew)", "Heebo", "sans-serif"],
        'body-arabic': ["var(--font-body-arabic)", "Noto Sans Arabic", "sans-serif"],
      },
      fontSize: {
        // Desktop / Mobile
        'h1': ['48px', { lineHeight: '1.1', fontWeight: '600' }],
        'h2': ['36px', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.2', fontWeight: '500' }],
        'body': ['18px', { lineHeight: '1.7' }],
        'small': ['14px', { lineHeight: '1.6' }],
        'button': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
      },
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1200px',
      },
      maxWidth: {
        'container': '1200px',
      },
      spacing: {
        'section-mobile': '24px',
        'section-desktop': '64px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;

