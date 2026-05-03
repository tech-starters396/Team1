import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev server (`npm run dev` / Docker) must not import Vitest — the optional named volume
// `frontend_node_modules` may not include devDependencies Vitest pulls in from `vite.config`.
// See `vitest.config.ts` for test settings (used only by `npm run test`).
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
