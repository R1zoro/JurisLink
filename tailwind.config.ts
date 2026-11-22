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
        cream: {
          DEFAULT: "#FBF9F5",
          dark: "#F4EFE6",
          light: "#FFFFFF",
        },
        sand: {
          DEFAULT: "#EAE5DB",
          light: "#F5F2EB",
          dark: "#D6CEBF",
        },
        espresso: {
          DEFAULT: "#1C1917",
          light: "#292524",
          soft: "#44403C",
        },
        stone: {
          DEFAULT: "#78716C",
          light: "#A8A29E",
          dark: "#57534E",
        },
        cognac: {
          DEFAULT: "#7C4A27",
          hover: "#63391C",
          light: "#F7EFE9",
          border: "#D9C3B4",
        },
        ochre: {
          DEFAULT: "#B45309",
          light: "#FEF3C7",
          border: "#FDE68A",
        },
        terracotta: {
          DEFAULT: "#C2410C",
          light: "#FFEDD5",
          border: "#FED7AA",
        },
        forest: {
          DEFAULT: "#2D5A43",
          light: "#E8F0EC",
          border: "#C2D6CC",
        },
      },
    },
  },
  plugins: [],
};
export default config;
