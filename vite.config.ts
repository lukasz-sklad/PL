import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  root: 'app',
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app/src'),
    },
  },
  build: {
    outDir: '../dist/web',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
});
