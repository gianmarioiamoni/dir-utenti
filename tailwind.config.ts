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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        error: "var(--error)",
        hover: "var(--hover)",
        "card-bg": "var(--card-bg)",
        "card-border": "var(--card-border)",
        "initials-bg": "var(--initials-bg)",
        "initials-text": "var(--initials-text)",
        "name-text": "var(--name-text)",
        "card-hover-bg": "var(--card-hover-bg)",
        "accent-hover": "var(--accent-hover)",
        "modal-bg": "var(--modal-bg)",
        "modal-border": "var(--modal-border)",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      screens: {
        xs: "320px", // add customer breakpoint for small screens
      },
    },
  },
  plugins: [],
};

export default config;

