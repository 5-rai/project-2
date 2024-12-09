/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      default: {
        white: "#FFFFFF",
        black: "#000000",
      },
      colors: {
        primary: "#FCC404",
        secondary: "#FBEFBF",
        "red-accent": "#FF2929",
        gray: {
          22: "#222222",
          c8: "#C8C8C8",
          ee: "#EEEEEE",
        },
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
