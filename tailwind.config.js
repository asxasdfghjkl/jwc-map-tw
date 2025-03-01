/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}", './index.html'],
  theme: {
    extend: {},
    screens: {
      big: '1024px',
    }
  },
  plugins: [],
};
