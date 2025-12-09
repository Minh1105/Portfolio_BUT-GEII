import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Portfolio_Ly_Minh-Quan/', // Remplacez par le nom de votre dépôt
  plugins: [react()],
})