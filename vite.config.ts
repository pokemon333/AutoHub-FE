import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve : {
    alias : {
      '@' : fileURLToPath(new URL('./src', import.meta.url)),
      'core@' : fileURLToPath(new URL('./src/app/core', import.meta.url)),
      'car@' : fileURLToPath(new URL('./src/app/modules/car', import.meta.url)),
      'landing@':fileURLToPath(new URL('./src/app/modules/landing',import.meta.url)),
      'search@':fileURLToPath(new URL('./src/app/modules/car/modules/search',import.meta.url)),
      'advanceSearch@':fileURLToPath(new URL('./src/app/modules/car/modules/advanceSearch',import.meta.url))
    }
  }
})
