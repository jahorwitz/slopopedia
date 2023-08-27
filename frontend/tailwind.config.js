/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'arialBold':['Arial-Bold', 'sans-serif'],
      'arialRegular':['Arial-Regular', 'sans-serif'],
      'arialNarrow': ['Arial-NarrowBold', 'sans-serif']
    },
    screens: {
      'xs': {'min': '320px', 'max': '500px'},
      'sm': {'min': '501px', 'max':'1169px'},
      'md': {'min':'1170px' , 'max': '1304px'},
      'lg': {'min': '1305px', 'max': '1440px'},
      'xl' : {'min': '1441px', 'max': '1600px'}
    }
  },
  plugins: [],
};
