import { Link } from '@remix-run/react'
import type { Config } from 'tailwindcss'

const colors = {
  link: '#006ccc',
  primary: '#ff1493',
  base: '#333'
}

export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    colors: {
      'base': colors.base,
      'primary': colors.primary,
      'link': colors.link,
    },
    extend: {
      screens: {
        'pc-min': '1280px',
      },
      animation: {
        slideIn: "slideIn .4s ease-in forwards",
      },
      keyframes: {
        slideIn: {
          "0%": {
            opacity: 0,
            transform: "translateY(-4px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }
    },
    textColor: {
      white: "#FFF",
      base: colors.base,
      link: colors.link,
      primary: colors.primary,
      extend: {},
    },
  },
  plugins: [],
} satisfies Config

