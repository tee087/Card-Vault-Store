import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import inspect from 'kimi-plugin-inspect-react'

export default defineConfig({
  base: './',
  plugins: [inspect(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          styles: ['src/index.css']
        }
      }
    }
  },
  esbuild: {
    removeWhitespace: true,
    treeShaking: true,
  }
})
