import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const baseURL = '/form-builder-fe/';

// https://vitejs.dev/config/
export default defineConfig({
  base: baseURL,
  plugins: [react()],
  resolve: {
    alias: [{ find: /^~/, replacement: '' }],
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
