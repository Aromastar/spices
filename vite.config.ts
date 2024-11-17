import { resolve } from 'path'
import { defineConfig } from 'vite'
import nunjucksPlugin from 'vite-plugin-nunjucks'
import NjkIconExtension from './src/templates/extensions/icon'

const SRC_DIR = resolve(__dirname, 'src')

export default defineConfig({
  build: { outDir: resolve(__dirname, 'dist') },
  css: { preprocessorOptions: { sass: { api: 'modern' } } },
  plugins: [
    nunjucksPlugin({
      nunjucksEnvironment: {
        extensions: { icon: new NjkIconExtension(resolve(SRC_DIR, 'svg')) }
      }
    })
  ],
  resolve: {
    alias: {
      '@styles': resolve(SRC_DIR, 'styles')
    }
  },
  root: SRC_DIR
})
