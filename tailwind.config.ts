import type { Config } from 'tailwindcss'
import type { PluginCreator } from 'tailwindcss/types/config';
const plugin = require('tailwindcss/plugin')

export default {
  content: ["./app/**/*.{tsx}"],
  theme: {
    colors: {
      'primary': '#ff1493'
    },
    extend: {},
  },
  plugins: [
    plugin(function({ addComponents }):PluginCreator {
      addComponents({
        '.base-btn': {
          backgroundColor: '#f00',
        }
      })
    })
  ],
} satisfies Config

