import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{tsx}"],
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
} satisfies Config

