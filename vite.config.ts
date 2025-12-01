import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()] as any,
  base: '/rayoalmar/',
  build: {
    // Optimize production build
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React vendor code
          'react-vendor': ['react', 'react-dom'],
          // Split i18n vendor code
          'i18n-vendor': ['react-i18next', 'i18next', 'i18next-http-backend', 'i18next-browser-languagedetector'],
        },
      },
    },
    // Inline small assets as base64
    assetsInlineLimit: 4096,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
