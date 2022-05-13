import { defineConfig } from 'vite';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json'],
    },
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@helpers': path.resolve(__dirname, '../helpers'),
      '@assets': path.resolve(__dirname, '../assets'),
    },
  },
});
