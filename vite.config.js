import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'
import fs from 'fs';


const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [vue(),
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve(projectRootDir, './src')
        }
      ]
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})
