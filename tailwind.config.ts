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
        background: "var(--background)", // Colore di sfondo
        foreground: "var(--foreground)", // Colore principale del testo
        primary: "var(--primary)", // Colore primario
        secondary: "var(--secondary)", // Colore secondario
        accent: "var(--accent)", // Colore di accento
        error: "var(--error)", // Colore per gli errori
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"], // Font principale
      },
    },
  },
  plugins: [],
};

export default config;

