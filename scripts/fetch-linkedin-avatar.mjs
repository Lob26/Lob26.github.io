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

  let pictureUrl = null

  // Path A: OIDC product ("Sign In with LinkedIn using OpenID Connect").
  const oidcRes = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (oidcRes.ok) {
    const info = await oidcRes.json()
    pictureUrl = info.picture ?? null
  } else {
    console.error(`[avatar] /v2/userinfo ${oidcRes.status}: ${await oidcRes.text()}`)
  }

  // Path B: legacy "Sign In with LinkedIn" (r_liteprofile) fallback.
  if (!pictureUrl) {
    const meRes = await fetch(
      'https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))',
      { headers: { Authorization: `Bearer ${token}`, 'X-Restli-Protocol-Version': '2.0.0' } },
    )
    if (!meRes.ok) {
      throw new Error(`both /v2/userinfo and /v2/me failed; /v2/me returned ${meRes.status}: ${await meRes.text()}`)
    }
    const me = await meRes.json()
    const elements = me?.profilePicture?.['displayImage~']?.elements ?? []
    const largest = elements
      .filter((e) => e?.identifiers?.[0]?.identifier)
      .sort((a, b) => {
        const aw = a?.data?.['com.linkedin.digitalmedia.mediaartifact.StillImage']?.storageSize?.width ?? 0
        const bw = b?.data?.['com.linkedin.digitalmedia.mediaartifact.StillImage']?.storageSize?.width ?? 0
        return bw - aw
      })[0]
    pictureUrl = largest?.identifiers?.[0]?.identifier ?? null
  }

  if (!pictureUrl) throw new Error('No picture URL found in either endpoint')

  const imgRes = await fetch(pictureUrl)
  if (!imgRes.ok) throw new Error(`Image download responded ${imgRes.status}`)

  const buf = Buffer.from(await imgRes.arrayBuffer())
  await mkdir(dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, buf)
  console.log(`[avatar] wrote ${buf.length} bytes to ${OUTPUT_PATH}`)
} catch (err) {
  console.error('[avatar] failed:', err.message)
  process.exit(0)
}
