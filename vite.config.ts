import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.VITE_PORT || env.PORT || 5173)

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port,
      host: true,
    },
  }
})
