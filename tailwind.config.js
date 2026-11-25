/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // deep greens
        forest: {
          50: '#f2f7f0', 100: '#dfeeda', 200: '#c2ddba', 300: '#97c58f',
          400: '#6aa761', 500: '#488a41', 600: '#356e30', 700: '#2b5828',
          800: '#244623', 900: '#1c381d', 950: '#0e2011',
        },
        // fresh leaf greens
        leaf: {
          50: '#f3f9ef', 100: '#e3f0da', 200: '#c8e1ba', 300: '#a1ca8d',
          400: '#75ac60', 500: '#548f41', 600: '#3e7232', 700: '#335a2a',
          800: '#2b4824', 900: '#243c20',
        },
        // soil browns
        soil: {
          50: '#f7f4f0', 100: '#ece3d8', 200: '#d8c4ad', 300: '#c0a07e',
          400: '#a87f5a', 500: '#926745', 600: '#785238', 700: '#5f4130',
          800: '#4a352a', 900: '#33241d',
        },
        // harvest yellow / grain
        harvest: {
          50: '#fdf9ec', 100: '#faf0cc', 200: '#f4de96', 300: '#eec65e',
          400: '#e8ae37', 500: '#dd9021', 600: '#c46f1a', 700: '#a25219',
          800: '#84411c', 900: '#6d361a',
        },
        // cream whites
        cream: {
          50: '#fdfcf7', 100: '#faf7ec', 200: '#f3edda', 300: '#eae1c2',
          DEFAULT: '#faf7ec',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
