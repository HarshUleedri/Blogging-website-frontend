import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FAFAFA",
        secondary: "#E5E7EB",
        dark: "#09090B",
        light: "#71717B",
        accent: "#193CB8",
      },
    },
  },
  plugins: [typography],
};
