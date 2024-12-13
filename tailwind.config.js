/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#E6F9EE",
          100: "#C1ECC8",
          200: "#9DE0A4",
          400: "#5AB75E",
          500: "#22c55e",
          600: "#1FA855",
          700: "#15803d",
        },
        blue: {
          100: "#CCF0FF",
          200: "#99E2FF",
          500: "#3BB3FF",
          700: "#0284C7",
        },
      },
      fontFamily: {
        sans: ['"Poppins"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
