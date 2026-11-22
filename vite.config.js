import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes the build work on any GitHub Pages URL
// (https://username.github.io/repo-name/) without editing this file.
export default defineConfig({
  plugins: [react()],
  base: './',
});
