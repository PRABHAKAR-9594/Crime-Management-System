/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bright-dark-red': '#ff0000', // Example hex code for a bright dark red
        'text-bg-bright-dark-red':'#ff0000',
      },
    },
  },
  plugins: [],
}

