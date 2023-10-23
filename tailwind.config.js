/** @type {import('tailwindcss').Config} */
import error from './color-palette/error'
import info from './color-palette/info'
import primary from './color-palette/primary'
import secondary from './color-palette/secondary'
import success from './color-palette/success'
import text from './color-palette/text'
import warning from './color-palette/warning'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
        fontSize: {
          'card-title' : '12px',
          'card-item' : '11px',
          'card-price':'14px',
          'main-header' : '96px'
        },
        fontFamily: {
          poppins: ['Poppins'],
        },
        colors : {
          'primary' : primary,
          'info' :info,
          'secondary':secondary,
          'success' : success,
          'error' : error,
          'text' : text,
          'white' : 'white',
          'warning' : warning
        },
    },
  },
  plugins: [
    
  ],
}

