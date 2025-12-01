import { Elysia } from 'elysia'

const app = new Elysia()

app.get('/greet', () => ({ greeting: 'Hello from Elysia (bun)!' }))

// Determine port: prefer --port <n>, then PORT env var, then default 3421
let port = 3421
const argv = process.argv.slice(2)
for (let i = 0; i < argv.length; i++) {
  if ((argv[i] === '--port' || argv[i] === '-p') && argv[i+1]) {
    const p = Number(argv[i+1])
    if (!Number.isNaN(p)) {
      port = p
    }
  }
}
if (process.env.PORT) {
  const p = Number(process.env.PORT)
  if (!Number.isNaN(p)) port = p
}

app.listen(port)
console.log(`Elysia listening on ${port}`)
