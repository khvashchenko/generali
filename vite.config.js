import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, 
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
    },
  },
  
  build: {
    outDir: 'dist', 
    sourcemap: true,
  }
});
