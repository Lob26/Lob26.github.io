import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages serves project sites at /<repo>/. Drive the base path via env
// so this config works for both project sites and custom domains.
//   VITE_BASE=/my-page/  npm run build   -> project page
//   VITE_BASE=/          npm run build   -> user/custom-domain
// The GitHub Actions workflow injects VITE_BASE automatically.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue()],
    base: env.VITE_BASE ?? './',
  }
})
