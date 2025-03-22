import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2']
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@app': resolve('src/renderer/src/app'),
        '@processes': resolve('src/renderer/src/processes'),
        '@pages': resolve('src/renderer/src/pages'),
        '@widgets': resolve('src/renderer/src/widgets'),
        '@features': resolve('src/renderer/src/features'),
        '@entities': resolve('src/renderer/src/entities'),
        '@shared': resolve('src/renderer/src/shared')
      }
    },
    plugins: [react()]
  }
})
