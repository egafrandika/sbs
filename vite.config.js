import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// import API_BASE_URL from './src/services/axios/stages';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());
  return {
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
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://103.63.25.188:9000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
