/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F63D68",
        secondary: "#363F72",
        light: "#F8F9FC",
      },
    },
  },
  plugins: [],
}