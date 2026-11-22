import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#080c14",
          card: "#0f1626",
          border: "#1e293b",
          primary: "#06b6d4", // Cyan
          accent: "#8b5cf6",  // Violet
          warning: "#f59e0b", // Amber (for pending legislation)
          danger: "#ef4444",  // Red
          success: "#10b981", // Emerald
        },
      },
    },
  },
  plugins: [],
};
export default config;
