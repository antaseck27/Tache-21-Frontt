import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(), 
 
  ],
    build: {
    chunkSizeWarningLimit: 1000, // passe la limite à 1000 KB par exemple
  },

})
