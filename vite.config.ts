import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'bundle-stats.html',
      open: false,
      gzipSize: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      /* Inline the registration snippet instead of emitting registerSW.js.
         As a separate file it was a render-blocking request for ~300 ms to do
         nothing but call navigator.serviceWorker.register. */
      injectRegister: 'inline',
      includeAssets: ['icon-192.svg', 'icon-512.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Good Gradients',
        short_name: 'Gradients',
        description: 'CSS gradients for developers. Browse, customize, and export beautiful gradients.',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: 'icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        /* Fonts are deliberately excluded from the precache. Each is declared
           with a unicode-range, so the browser downloads only the subset it
           needs; the glob pulled every one of them regardless. They are picked
           up by the runtime cache below on first real use instead. */
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            /* Self-hosted fonts, cached on first use. The google-fonts rule
               that used to live here went out with the CDN. */
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: {
                maxEntries: 12,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
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
    /* Lighthouse best-practices wants a source map for the first-party
       bundle, and finds it via the //# sourceMappingURL comment — so this has
       to be `true`, not `hidden`. Browsers only fetch a .map with devtools
       open, so a real visitor pays for the comment and nothing else. */
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: false,
  },
});
