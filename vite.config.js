import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    outDir: 'dist'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/assets/global.scss" as *;`,
      }
    }
  },
  resolve: {
    extensions: ['.vue', '.js', '.ts']
  },
  optimizeDeps: {
    exclude: ['chunk-64RHELSY']
  },
  devServer: {
    proxy: 'http://103.63.25.188:9000',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://103.63.25.188:9000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
