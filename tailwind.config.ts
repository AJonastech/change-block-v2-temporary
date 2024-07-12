import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        generalSans: "var(--font-general-sans)",
        satoshi: "var(--font-satoshi)"
      },
      colors: {
        secondary: "#cfe8a6",
        "secondary-100": "#f3fae9",
        danger: "#ff2323",
        background: "#f3fae9",
        primary: "#8AC825",
        "primary-100": "#014022",
        "dark-100": "#5B5D58",
        "dark-200": "#3F423C",
        "dark-300": "#21241E",
        grey: {
          10: "#FAFAFA",
          20: "#F5F5F5",
          30: "#EBEBEB",
          50: "#C1C2C0",
          300: "#5B5D58",
          100: "#797A76",
          800: "#12150F",
          500: "#3F423C",
          700: "#21241E"
        },
        lemon: {
          50: "#F3FAE9"
        },
        G10: "#FAFAFA",
        G500: "#3F423C",
        G100: "#797A76",
        G700: "#21241E",
        green: {
          500: "#014022"
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
