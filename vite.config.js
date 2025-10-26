import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
<<<<<<< HEAD


export default defineConfig({
  plugins: [react(), tailwindcss()],
=======
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(), tailwindcss(), basicSsl()],
>>>>>>> 3d31dbee9eabd86f80e2a8e434ca6cdccea93a26
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
<<<<<<< HEAD
=======
  server: {
    port: parseInt(process.env.VITE_BASE_URL?.split(':')[2] || '5173'),
    host: true
  }
>>>>>>> 3d31dbee9eabd86f80e2a8e434ca6cdccea93a26
})
