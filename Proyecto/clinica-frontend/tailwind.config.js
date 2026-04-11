/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#60A5FA",
        accent: "#10B981",
        background: "#F9FAFB",
        textMain: "#1F2937",
      },
    },
  },
  plugins: [],
};