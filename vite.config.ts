import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          ui: ['@/components/ui'],
          sections: [
            '@/sections/Products',
            '@/sections/Hero',
            '@/sections/Navigation',
            '@/sections/CartDrawer',
            '@/sections/Footer'
          ]
        }
      }
    }
  },
  esbuild: {
    removeWhitespace: true,
    treeShaking: true,
  }
})
