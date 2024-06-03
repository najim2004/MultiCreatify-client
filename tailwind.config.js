const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
// export default {};

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        openSans: '"Open Sans", sans-serif',
      },
      colors: {
        titleClr: "#050748",
        desClr: "#6a6a8e",
      },
    },
  },
  plugins: [require("daisyui")],
});
