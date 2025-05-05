import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Define environment variables for client-side access
  define: {
    
  }
}));
