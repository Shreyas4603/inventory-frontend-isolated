import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port:3000,
    proxy: {
      '/api': {
        // target: '',
        target: 'https://inventory-backend-isolated.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
          '^/api': '', // Remove the '/api' prefix from the URL before forwarding
        },
      },
    },
  },

})
