import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJSX()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['.out'],
  },
  server: {
    port: 3000,
  },
})
