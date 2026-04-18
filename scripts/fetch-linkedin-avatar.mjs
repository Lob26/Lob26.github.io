#!/usr/bin/env node
/**
 * Fetch the LinkedIn profile picture via OIDC and write it to public/avatar.jpg.
 *
 * Runs in GitHub Actions weekly (see .github/workflows/update-avatar.yml).
 *
 * Auth strategy (in order of preference):
 *   1. If LINKEDIN_CLIENT_ID + LINKEDIN_CLIENT_SECRET + LINKEDIN_REFRESH_TOKEN
 *      are all present, exchange refresh_token → fresh access_token.
 *      (Note: LinkedIn only issues refresh_tokens to apps on the Marketing
 *      Developer Platform tier. Most personal apps do NOT get one.)
 *   2. Otherwise, fall back to LINKEDIN_ACCESS_TOKEN directly.
 *      These tokens last ~60 days — rotate via `node scripts/linkedin-auth.mjs`
 *      when the workflow starts returning 401.
 *
 * Uses the OIDC /v2/userinfo endpoint (scope: openid profile email),
 * which returns the profile picture URL directly — no REST projection dance.
 *
 * Failure is always non-fatal: exits 0 so the committed fallback persists.
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = resolve(__dirname, '../public/avatar.jpg')

async function getAccessToken() {
  const {
    LINKEDIN_CLIENT_ID: id,
    LINKEDIN_CLIENT_SECRET: secret,
    LINKEDIN_REFRESH_TOKEN: refresh,
    LINKEDIN_ACCESS_TOKEN: direct,
  } = process.env

  if (id && secret && refresh) {
    const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh,
        client_id: id,
        client_secret: secret,
      }),
    })
    if (!res.ok) throw new Error(`refresh_token exchange failed: ${res.status} ${await res.text()}`)
    const json = await res.json()
    return json.access_token
  }

  if (direct) return direct
  return null
}

try {
  const token = await getAccessToken()
  if (!token) {
    console.log('[avatar] no credentials configured — skipping.')
    process.exit(0)
  }

  const userInfoRes = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!userInfoRes.ok) {
    throw new Error(`/v2/userinfo responded ${userInfoRes.status}: ${await userInfoRes.text()}`)
  }
  const info = await userInfoRes.json()
  if (!info.picture) throw new Error('userinfo did not include a picture URL')

  const imgRes = await fetch(info.picture)
  if (!imgRes.ok) throw new Error(`Image download responded ${imgRes.status}`)

  const buf = Buffer.from(await imgRes.arrayBuffer())
  await mkdir(dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, buf)
  console.log(`[avatar] wrote ${buf.length} bytes to ${OUTPUT_PATH}`)
} catch (err) {
  console.error('[avatar] failed:', err.message)
  process.exit(0)
}
