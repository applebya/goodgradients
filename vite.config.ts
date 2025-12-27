import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'bundle-stats.html',
      open: false,
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Use root path since we have a custom domain (goodgradients.com)
  base: '/',
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: false,
  },
});
