import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader()
  ],
  resolve : {
    alias : {
      '@' : fileURLToPath(new URL('./src', import.meta.url)),
      'core@' : fileURLToPath(new URL('./src/app/core', import.meta.url)),
      'car@' : fileURLToPath(new URL('./src/app/modules/car', import.meta.url)),
      'evse@' : fileURLToPath(new URL('./src/app/modules/evse', import.meta.url)),
      'landing@':fileURLToPath(new URL('./src/app/modules/landing',import.meta.url)),
      'search@':fileURLToPath(new URL('./src/app/modules/car/modules/search',import.meta.url)),
      'advanceSearch@':fileURLToPath(new URL('./src/app/modules/car/modules/advanceSearch',import.meta.url)),
      'asset@'  : fileURLToPath(new URL('./src/assets',import.meta.url)),
      'auth@'   : fileURLToPath(new URL('./src/app/modules/auth',import.meta.url))
    }
  }
})
