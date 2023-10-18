import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve : {
    alias : {
      '@' : fileURLToPath(new URL('./src', import.meta.url)),
      'car@' : fileURLToPath(new URL('./src/app/modules/car', import.meta.url)),
      'core@' : fileURLToPath(new URL('./src/app/core', import.meta.url))
    }
  }
})
