import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/daily-daraz-deals/', // 👈 repo name
  plugins: [
    react(),
    tailwindcss(),
  ],
})
