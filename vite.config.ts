import { resolve } from 'path'
import { defineConfig } from 'vite'
import nunjucksPlugin from 'vite-plugin-nunjucks'

const SRC_DIR = resolve(__dirname, 'src')

export default defineConfig({
  build: { outDir: resolve(__dirname, 'dist') },
  css: { preprocessorOptions: { sass: { api: 'modern' } } },
  plugins: [nunjucksPlugin()],
  resolve: {
    alias: {
      '@styles': resolve(SRC_DIR, 'styles')
    }
  },
  root: SRC_DIR
})
