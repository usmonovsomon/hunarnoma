import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eafaf4",
          100: "#cdf3e4",
          200: "#9de7cb",
          300: "#66d5ac",
          400: "#35bd8e",
          500: "#1ba374",
          600: "#167a5e",
          700: "#12634c",
          800: "#114f3f",
          900: "#0f4235",
        },
        ember: {
          50: "#fdf3e9",
          100: "#fbe3c8",
          200: "#f7c68e",
          300: "#f0a459",
          400: "#e8862f",
          500: "#dd6f16",
          600: "#c25d10",
          700: "#9c4a0d",
          800: "#7c3c0f",
          900: "#66330f",
        },
        wine: {
          50: "#fbeaec",
          100: "#f3cbd0",
          200: "#e293a0",
          300: "#c85a6c",
          400: "#a83345",
          500: "#8c1f30",
          600: "#7a1425",
          700: "#5c0f1c",
          800: "#4a0d17",
          900: "#3a0a12",
        },
        ink: {
          DEFAULT: "#211712",
          soft: "#4a3a32",
          muted: "#7a685f",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
