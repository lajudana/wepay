import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Konfigurasi sedia untuk GitHub Pages
export default defineConfig({
  base: './',
  plugins: [vue()],
})
