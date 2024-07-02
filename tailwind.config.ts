import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.dark-100"),
            "--tw-prose-headings": theme("colors.dark-00"),
            "--tw-prose-lead": theme("colors.dark-300"),
            "--tw-prose-links": theme("colors.dark.100"),
            "--tw-prose-bold": theme("colors.dark-300"),
            "--tw-prose-counters": theme("colors.dark-300"),
            "--tw-prose-bullets": theme("colors.dark-300"),
            "--tw-prose-hr": theme("colors.dark-300"),
            "--tw-prose-quotes": theme("colors.dark-300"),
            "--tw-prose-quote-borders": theme("colors.dark-300"),
            "--tw-prose-captions": theme("colors.dark-300"),
            "--tw-prose-code": theme("colors.dark-300"),
            "--tw-prose-pre-code": theme("colors.dark-300"),
            "--tw-prose-pre-bg": theme("colors.dark-300"),
            "--tw-prose-th-borders": theme("colors.dark-300"),
            "--tw-prose-td-borders": theme("colors.dark-300"),
            "--tw-prose-invert-body": theme("colors.dark-100"),
            "--tw-prose-invert-headings": theme("colors.dark-200"),
            "--tw-prose-invert-lead": theme("colors.dark-300"),
            "--tw-prose-invert-links": theme("colors.primary"),
            "--tw-prose-invert-bold": theme("colors.dark-300"),
            "--tw-prose-invert-counters": theme("colors.dark-300"),
            "--tw-prose-invert-bullets": theme("colors.dark-300"),
            "--tw-prose-invert-hr": theme("colors.dark-300"),
            "--tw-prose-invert-quotes": theme("colors.dark-300"),
            "--tw-prose-invert-quote-borders": theme("colors.dark-300"),
            "--tw-prose-invert-captions": theme("colors.dark-300"),
            "--tw-prose-invert-code": theme("colors.dark-300"),
            "--tw-prose-invert-pre-code": theme("colors.dark-300"),
            "--tw-prose-invert-pre-bg": theme("colors.dark-300"),
            "--tw-prose-invert-th-borders": theme("colors.dark-300"),
            "--tw-prose-invert-td-borders": theme("colors.dark-300"),
          },
        },
        h1: {
          css: {
            fontFamily: "Inter, sans-serif",
            fontWeight: "400",
            fontSize: "54px",
            lineHeight: "120%",
            letterSpacing: "0%",
          },
        },
        h2: {
          css: {
            fontFamily: "Inter, sans-serif",
            fontWeight: "400",
            fontSize: "45px",
            lineHeight: "120%",
            letterSpacing: "0%",
          },
        },
        h3: {
          css: {
            fontFamily: "Inter, sans-serif",
            fontWeight: "400",
            fontSize: "37px",
            lineHeight: "120%",
            letterSpacing: "0%",
          },
        },
        h4: {
          css: {
            fontFamily: "Inter, sans-serif",
            fontWeight: "400",
            fontSize: "31px",
            lineHeight: "120%",
            letterSpacing: "0%",
          },
        },
        body: {
          css: {
            fontFamily: "Inter, sans-serif",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "120%",
            letterSpacing: "0%",
          },
        },
        small: {
          css: {
            fontFamily: "Inter, sans-serif",
            fontWeight: "400",
            fontSize: "15px",
            lineHeight: "120%",
            letterSpacing: "0%",
          },
        },
        a: {
          css: {
            fontFamily: "Inter, sans-serif",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "120%",
            letterSpacing: "0%",
            textDecoration: "none",
          },
        },
        xsmall: {
          css: {
            fontFamily: "Inter, sans-serif",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "120%",
            letterSpacing: "0%",
          },
        },
      }),
    },
  },
  darkMode: "class",
  plugins: [nextui(), typography],
};

export default config;
