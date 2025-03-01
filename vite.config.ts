import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine the base path dynamically
const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? '/form-builder-fe/' : '/',
  plugins: [react()],
  resolve: {
    alias: [
      {find: /^~/, replacement:''}
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        relativeUrls: true,
      },
    },
  },
});
