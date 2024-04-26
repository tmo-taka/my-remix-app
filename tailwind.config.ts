import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    colors: {
      'primary': '#ff1493'
    },
    extend: {},
    textColor: {
      white: "#FFF",
      extend: {},
    },
  },
  plugins: [],
} satisfies Config
