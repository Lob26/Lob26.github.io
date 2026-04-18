#!/usr/bin/env node
/**
 * One-time LinkedIn authorization helper.
 *
 * Runs locally, NOT in CI. Uses CLIENT_ID + CLIENT_SECRET from .env,
 * walks you through the OAuth 2.0 authorization-code flow, and prints
 * the resulting access_token (and refresh_token, if LinkedIn grants one)
 * so you can paste them into the repository secrets as:
 *
 *   LINKEDIN_ACCESS_TOKEN   (required, ~60-day lifetime)
 *   LINKEDIN_REFRESH_TOKEN  (optional, only if your app has the
 *                             "Marketing Developer Platform" access tier —
 *                             most personal apps do NOT)
 *
 * Usage:
 *   1. Ensure .env contains:
 *        LINKEDIN_CLIENT_ID=xxx
 *        LINKEDIN_CLIENT_SECRET=xxx
 *   2. In the LinkedIn app settings, add redirect URL:
 *        http://localhost:53682/callback
 *   3. Make sure the "Sign In with LinkedIn using OpenID Connect" product
 *      is enabled on the app.
 *   4. Run:  node scripts/linkedin-auth.mjs
 *   5. A browser window opens — consent — the script captures the code,
 *      exchanges it for tokens, and prints them.
 */
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomBytes } from 'node:crypto'
import { exec } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const JSON_MODE = process.argv.includes('--json')
const log = JSON_MODE ? (...a) => console.error(...a) : (...a) => console.log(...a)

// Minimal .env loader (avoids adding a dependency).
try {
  const envText = await readFile(resolve(__dirname, '../.env'), 'utf8')
  for (const line of envText.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
    }
  }
} catch {
  /* no .env — rely on process env */
}

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET in .env')
  process.exit(1)
}

const PORT = 53682
const REDIRECT_URI = `http://localhost:${PORT}/callback`
const SCOPES = 'openid profile email'
const STATE = randomBytes(16).toString('hex')

const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization')
authUrl.searchParams.set('response_type', 'code')
authUrl.searchParams.set('client_id', CLIENT_ID)
authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
authUrl.searchParams.set('state', STATE)
authUrl.searchParams.set('scope', SCOPES)

log('\nOpen this URL in your browser if it does not open automatically:\n')
log(authUrl.toString(), '\n')

const opener =
  process.platform === 'darwin' ? 'open'
  : process.platform === 'win32' ? 'start ""'
  : 'xdg-open'
exec(`${opener} "${authUrl.toString()}"`, () => {})

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  if (url.pathname !== '/callback') {
    res.writeHead(404).end()
    return
  }

  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')

  if (error) {
    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end(`LinkedIn returned error: ${error}`)
    console.error(`\nAuth failed: ${error} — ${url.searchParams.get('error_description')}`)
    server.close()
    process.exit(1)
  }

  if (state !== STATE) {
    res.writeHead(400).end('State mismatch — possible CSRF. Aborting.')
    console.error('\nState mismatch.')
    server.close()
    process.exit(1)
  }

  try {
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    })
    const tokenJson = await tokenRes.json()

    if (!tokenRes.ok) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end(`Token exchange failed: ${JSON.stringify(tokenJson)}`)
      console.error('\nToken exchange failed:', tokenJson)
      server.close()
      process.exit(1)
    }

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>Done.</h1><p>You can close this tab and return to the terminal.</p>')

    if (JSON_MODE) {
      process.stdout.write(JSON.stringify(tokenJson) + '\n')
    } else {
      log('\n=== LinkedIn tokens ===')
      log('access_token :', tokenJson.access_token)
      log('expires_in   :', tokenJson.expires_in, 'seconds (~' + Math.round(tokenJson.expires_in / 86400) + ' days)')
      if (tokenJson.refresh_token) {
        log('refresh_token:', tokenJson.refresh_token)
        log('refresh_expires_in:', tokenJson.refresh_token_expires_in, 'seconds')
      } else {
        log('refresh_token: (not issued — your app lacks Marketing Developer Platform access)')
      }
      log('scopes       :', tokenJson.scope)
      log('\nNext step: copy the access_token into the repo secret LINKEDIN_ACCESS_TOKEN.')
      log('  gh secret set LINKEDIN_ACCESS_TOKEN --body "<paste-token>"')
      if (tokenJson.refresh_token) {
        log('  gh secret set LINKEDIN_REFRESH_TOKEN --body "<paste-refresh-token>"')
        log('  gh secret set LINKEDIN_CLIENT_ID --body "' + CLIENT_ID + '"')
        log('  gh secret set LINKEDIN_CLIENT_SECRET --body "<your-secret>"')
      }
    }

    server.close()
    process.exit(0)
  } catch (err) {
    res.writeHead(500).end(String(err))
    console.error('\nUnexpected error:', err)
    server.close()
    process.exit(1)
  }
})

server.listen(PORT, () => {
  log(`Waiting for LinkedIn callback on ${REDIRECT_URI} ...`)
})
