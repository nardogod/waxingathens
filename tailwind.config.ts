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
        "apple-bg": "#F5F5F7",
        "apple-surface": "#FFFFFF",
        "apple-text": "#1D1D1F",
        "apple-text-secondary": "#86868B",
        "apple-accent": "#FF6B9D",
        "apple-success": "#34C759",
        "apple-border": "#E5E5EA",
        "apple-gray-100": "#F2F2F7",
        "apple-gray-200": "#E5E5EA",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        apple: "0 2px 8px rgba(0, 0, 0, 0.04)",
        "apple-lg": "0 4px 16px rgba(0, 0, 0, 0.08)",
        "apple-float": "0 8px 32px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        "apple": "16px",
        "apple-lg": "20px",
      },
    },
  },
  plugins: [],
};
export default config;
