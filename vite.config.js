import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/generali',

  server: {
    host: true, 
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
    },
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
