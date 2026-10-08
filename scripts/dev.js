// Lance un tunnel Cloudflare vers Vite, puis Vite configuré pour servir via ce tunnel.
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import { bin, install } from 'cloudflared'
import { createServer } from 'vite'

const LOCAL = 'http://127.0.0.1:5173'

try { process.loadEnvFile('.env') } catch {}

if (!fs.existsSync(bin)) await install(bin)

const named = process.env.CLOUDFLARE_TUNNEL_TOKEN && process.env.TUNNEL_URL
const args = named
  ? ['tunnel', '--no-autoupdate', 'run', '--url', LOCAL, '--token', process.env.CLOUDFLARE_TUNNEL_TOKEN]
  : ['tunnel', '--no-autoupdate', '--url', LOCAL]

const tunnel = spawn(bin, args, { stdio: ['ignore', 'pipe', 'pipe'] })

const tunnelUrl = named
  ? process.env.TUNNEL_URL
  : await new Promise((resolve, reject) => {
      const onData = (chunk) => {
        const match = chunk.toString().match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/)
        if (match) resolve(match[0])
      }
      tunnel.stdout.on('data', onData)
      tunnel.stderr.on('data', onData)
      tunnel.once('exit', (code) => reject(new Error(`cloudflared exited (${code})`)))
    })

process.env.TUNNEL_URL = tunnelUrl

const server = await createServer()
await server.listen()

console.log(`
  Vite     ${LOCAL}
  Tunnel   ${tunnelUrl}

  À coller dans Webflow (Site settings > Custom code > Footer) :

  <script type="module" src="${tunnelUrl}/src/main.js"></script>
`)

const stop = async () => {
  tunnel.kill()
  await server.close()
  process.exit(0)
}
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
