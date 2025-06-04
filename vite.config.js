import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


export default defineConfig({
  base: "/My-Portifolio/",
  plugins: [react()],
  publicDir: 'public',
})
