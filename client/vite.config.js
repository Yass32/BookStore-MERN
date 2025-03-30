import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://api.render.com/deploy/srv-cvkj14gdl3ps738k1hb0?key=BwfaQ0rnB-0',
    },
  },
  build: {
    outDir: 'dist', // Ensure the output directory is correct
  },
});
