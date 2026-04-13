import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/birthday-bingbing/', 
  server: {
    port: 5173,
    open: true // 启动时自动打开浏览器
  },
  build: {
    outDir: 'dist', 
    assetsDir: 'assets',
    sourcemap: false
  }
})