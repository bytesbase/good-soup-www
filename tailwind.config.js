module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gs-green": "#8B9F9F",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
