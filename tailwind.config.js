import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'media', // Enables dark mode based on user's system settings
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#b8ccc6',
      },
      container: {
        center: true,
        padding: '10rem',
      },
      screens: {
        xxs: '320px', 
        xs: '375px',   
        sm: '425px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
        '2xl': '1536px',
      },
      fontFamily: {
        abc: ['Lato', 'sans-serif'], 
        efg: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        'xl': '1rem',  
        '2xl': '1.5rem', 
      },
      boxShadow: {
        myShadow1: '4.1px -5px 0 0 white',
        myShadow2: '-4.1px -5px 0 0 white',
      }
      
    },
  },
  plugins: [],
};

export default withMT(config);
