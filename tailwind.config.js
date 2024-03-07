/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#CBCBCB",
        lightGray: "#EFEFEF",
        green: "#48FF50",
        yellow: "#FFD913",
        danger: "#FF4040",
        dark: "#101010",
        background: "#EFEFEF",
      },
      fontFamily: {
        arial: "Arial, sans-serif, Roboto",
      },
      maxWidth: {
        "sm-card": "224px",
        "md-card": "468px",
        "lg-card": "712px",
      },
    },
    fontFamily: {
      arialBold: ["Arial-Bold", "sans-serif"],
      arialRegular: ["Arial-Regular", "sans-serif"],
      arialNarrow: ["Arial-NarrowBold", "sans-serif"],
    },
    screens: {
      xs: { min: "320px", max: "500px" },
      sm: { min: "501px", max: "1169px" },
      md: { min: "1170px", max: "1304px" },
      lg: { min: "1305px", max: "1440px" },
      xl: { min: "1441px" },
    },
    scale: {
      2: "2.0",
    },
    backgroundImage: {
      minus: "url('/minus-sign.svg')",
      plus: "url('/plus-sign.svg')",
    },
  },
  plugins: [],
};
