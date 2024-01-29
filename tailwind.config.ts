import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "primary": "2px 4px 12px rgba(0,0,0,.08)",
      },
      textColor: {
        primary: '#fbda61' ,
        secondary: '#ff5acd',
      },
      colors: {
        dark: "#121215",
      },
      borderColor: {
        primary: '#fbda61' ,
        secondary: '#ff5acd',
      },
      screens: {
        "2xl": "1440px",
        '3xl': '1600px',
        '4xl': '1920px',
      },
    },
  },
  plugins: [],
};
export default config;
