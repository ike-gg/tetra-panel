import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./app/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        tetra: {
          50: "#000000",
          100: "#e7960b",
          200: "#f6a00b",
          300: "#f6970d",
          400: "#f68e0e",
          500: "#f57c11",
          600: "#F56B1A",
          700: "#f45a22",
          800: "#f4492b",
          900: "#f33733",
        },
        truedark: "#080808",
        discord: {
          bg: "#383A40",
          text: "#EBEEF1",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scale-x": {
          from: { transform: `scaleX(0)` },
          to: { transform: `scaleX(1)` },
        },
      },
      transitionTimingFunction: {
        "ease-out-quad": "cubic-bezier(.25, .46, .45, .94)",
        "ease-out-cubic": "cubic-bezier(.215, .61, .355, 1)",
        "ease-out-quart": "cubic-bezier(.165, .84, .44, 1)",
        "ease-out-quint": "cubic-bezier(.23, 1, .32, 1)",
        "ease-out-expo": "cubic-bezier(.19, 1, .22, 1)",
        "ease-out-circ": "cubic-bezier(.075, .82, .165, 1)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scale-x": "scale-x 2s cubic-bezier(.165, .84, .44, 1) both",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["Monument Extended", "sans-serif"],
        // sans: ["Clash Display", `sans-serif`],
        discord: ["gg sans Normal", "sans-serif"],
      },
      backgroundImage: {
        grainy: "url(https://grainy-gradients.vercel.app/noise.svg)",
        radar:
          "radial-gradient(circle, rgba(0, 0, 0, 0), var(--tw-gradient-to) 5%, var(--tw-gradient-from) 25%, var(--tw-gradient-to) 25%, var(--tw-gradient-from) 45%, var(--tw-gradient-to) 45%, var(--tw-gradient-from) 65%, var(--tw-gradient-to) 65%, var(--tw-gradient-from) 85%, var(--tw-gradient-to) 85%, var(--tw-gradient-from) 100%, var(--tw-gradient-to) 100%)",
      },
      gridTemplateColumns: {
        "16": "repeat(16, minmax(0, 1fr))",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-animation-delay"),
  ],
} satisfies Config;
