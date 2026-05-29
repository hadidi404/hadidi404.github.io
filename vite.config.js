import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { createRequire } from 'module'
import { resolve } from 'path'

const _require = createRequire(import.meta.url)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    base: '/',
    plugins: [
      vue(),
      tailwindcss(),
      {
        name: 'api-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const match = req.url?.match(/^\/api\/([^?/#]+)/)
            if (!match) return next()

            const routeName = match[1]
            const handlerPath = resolve(process.cwd(), `api/${routeName}.js`)

            let body = ''
            req.on('data', chunk => { body += chunk.toString() })
            req.on('end', () => {
              req.body = body ? JSON.parse(body) : {}

              // Add Express-like helpers to native http.ServerResponse
              res.status = (code) => { res.statusCode = code; return res }
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              }

              try {
                delete _require.cache[handlerPath]
                const handler = _require(handlerPath)
                handler(req, res)
              } catch (e) {
                console.error('[api]', e.message)
                res.statusCode = 500
                res.end(JSON.stringify({ error: e.message }))
              }
            })
          })
        }
      }
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
          },
        },
      },
    },
  }
})
