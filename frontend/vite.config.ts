import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Vitest shares Vite config; test API matches Jest (`describe`, `it`, `expect`).
// https://vitest.dev/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    passWithNoTests: false,
    clearMocks: true,
  },
})
