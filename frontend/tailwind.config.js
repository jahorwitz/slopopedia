/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-button": "#CBCBCB",
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
      height: {
        keyword: "31px",
      },
      maxWidth: {
        "sm-card": "224px",
        "md-card": "468px",
        "lg-card": "712px",
      },
    },
  },
  plugins: [],
};
