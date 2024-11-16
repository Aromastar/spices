import { resolve } from 'path'
import { defineConfig } from 'vite'

const SRC_DIR = resolve(__dirname, 'src')

export default defineConfig({
  build: { outDir: resolve(__dirname, 'dist') },
  css: { preprocessorOptions: { sass: { api: 'modern' } } },
  resolve: {
    alias: {
      '@styles': resolve(SRC_DIR, 'styles')
    }
  },
  root: SRC_DIR
})
