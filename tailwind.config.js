/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
       colors: {
      darkbg: "#2a2a2a",
      darkbg2: "#222",
    },
    }
  },
  plugins: [],
}
