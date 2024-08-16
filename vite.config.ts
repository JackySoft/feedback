import { defineConfig } from 'vite'
import path from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// 引入 process 模块来访问 __dirname
import process from 'process';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(process.cwd(), 'lib/main.ts'),
      name: 'feedback',
      fileName: (format) => `feedback.${format}.js`
    }
  },
  plugins: [svelte()],
})
