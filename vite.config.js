import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, './config')
  return {
    resolve: {
        extensions: ['.cjs', '.js', '.mjs']
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    base: './',
    plugins: [react({ include: 'src/*.{jsx, tsx}' })],
    build: {
      lib: {
        entry: path.resolve(__dirname, './src/main.jsx'),
        formats: ['es'],
        name: 'Stats'
      },
      outDir: './dist',
      rollupOptions: {
        input: {
          app: path.resolve(__dirname, './index.html')
        }
      }
    },
    server: {
        port: 3000,
        open: true
    }
  }
})
