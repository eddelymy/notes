/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        gridColmn: 'auto, 1fr', 
        gridColmnFilter: '1fr, auto',
      }
    },
  },
  plugins: [],
}

