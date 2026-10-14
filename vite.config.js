import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://zkevinbai.github.io/tictactoe_two/ via gh-pages
export default defineConfig({
  plugins: [react()],
  base: '/tictactoe_two/',
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
