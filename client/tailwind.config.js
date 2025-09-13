/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // scan your files for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#de2a25", // primary brand red
          light: "#f15c58",
          dark: "#a61d1a",
        },
      },
    },
  },
  plugins: [],
};
