/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-button": "#CBCBCB",
        "yellow-button": "#FFD913",
        "error-message": "#FF4040",
        "gray-text": "#10101099",
      },
      fontFamily: {
        arial: "Arial, sans-serif, Roboto",
      },
      fontSize: {
        "movie-card-captions": [
          "1.125rem",
          {
            lineHeight: "1rem",
          },
        ],
        "goblins-want-it": [
          "1rem",
          {
            lineHeight: "0.875rem",
          },
        ],
      },
      lineHeight: {
        3.5: "0.93rem",
      },
      height: {
        keyword: "31px",
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
      xl: { min: "1441px", max: "1600px" },
    },
    scale: {
      2: "2.0",
    },
    // padding: {
    //   15: "60px",
    // },
  },
  plugins: [],
};
