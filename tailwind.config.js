/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "Apple Color Emoji", "Segoe UI Emoji"]
      },
      boxShadow: {
        soft: "0 12px 40px rgba(0,0,0,0.18)"
      }
    }
  },
  plugins: []
};
