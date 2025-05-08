import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from 'dotenv';
import fs from 'fs';

// Load env vars
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Create a _redirects file in the dist folder during build
  if (mode === 'production') {
    const buildFinishHook = () => {
      // Ensure the dist directory exists
      if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist');
      }

      // Create _redirects file for SPA routing
      fs.writeFileSync('dist/_redirects', '/* /index.html 200');

      // Copy vercel.json to dist folder
      if (fs.existsSync('vercel.json')) {
        fs.copyFileSync('vercel.json', 'dist/vercel.json');
      }
    };

    return {
      server: {
        host: "::",
        port: 8080,
      },
      plugins: [
        react(),
        {
          name: 'generate-redirects',
          closeBundle: buildFinishHook
        }
      ],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
            },
          },
        },
      },
      define: {}
    };
  }

  return {
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
    define: {}
  };
});
