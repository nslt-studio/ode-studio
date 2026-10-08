import { defineConfig } from 'vite'

// Défini par scripts/dev.js quand le tunnel Cloudflare est actif
const tunnelUrl = process.env.TUNNEL_URL

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    cors: true,
    allowedHosts: ['.trycloudflare.com', ...(tunnelUrl ? [new URL(tunnelUrl).hostname] : [])],
    origin: tunnelUrl,
    // Le client HMR se connecte en wss://<host du tunnel>:443
    hmr: tunnelUrl ? { protocol: 'wss', clientPort: 443 } : undefined,
  },
  build: {
    lib: {
      entry: 'src/main.js',
      formats: ['es'],
      fileName: () => 'main.js',
    },
    minify: true,
  },
})
