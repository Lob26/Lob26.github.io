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

  let buf = null

  // Tier 1: Try legacy /v2/me with projection for largest native stream (up to 800x800).
  try {
    const meRes = await fetch(
      'https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))',
      { headers: { Authorization: `Bearer ${token}`, 'X-Restli-Protocol-Version': '2.0.0' } },
    )
    if (meRes.ok) {
      const me = await meRes.json()
      const elements = me?.profilePicture?.['displayImage~']?.elements ?? []
      const largest = elements
        .filter((e) => e?.identifiers?.[0]?.identifier)
        .sort((a, b) => {
          const aw = a?.data?.['com.linkedin.digitalmedia.mediaartifact.StillImage']?.storageSize?.width ?? 0
          const bw = b?.data?.['com.linkedin.digitalmedia.mediaartifact.StillImage']?.storageSize?.width ?? 0
          return bw - aw
        })[0]
      const largestUrl = largest?.identifiers?.[0]?.identifier ?? null
      if (largestUrl) {
        console.log('[avatar] Tier 1: Found largest stream from /v2/me, downloading...')
        const imgRes = await fetch(largestUrl)
        if (imgRes.ok) {
          buf = Buffer.from(await imgRes.arrayBuffer())
        }
      }
    } else {
      console.log(`[avatar] Tier 1 (/v2/me) skipped: status ${meRes.status}`)
    }
  } catch (err) {
    console.log(`[avatar] Tier 1 failed (${err.message}), falling back to OIDC...`)
  }

  // Tier 2: OIDC /v2/userinfo with progressive high-res resolution ladder.
  if (!buf) {
    const oidcRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!oidcRes.ok) {
      throw new Error(`/v2/userinfo failed: ${oidcRes.status} ${await oidcRes.text()}`)
    }
    const info = await oidcRes.json()
    const basePic = info.picture ?? null
    if (!basePic) throw new Error('No picture claim found in OIDC userinfo')

    // Try candidates in order: 800x800, 400x400, original
    const candidates = [
      basePic.replace(/shrink_\d+_\d+/g, 'shrink_800_800'),
      basePic.replace(/shrink_\d+_\d+/g, 'shrink_400_400'),
      basePic,
    ]
    const uniqueCandidates = [...new Set(candidates)]

    for (const candUrl of uniqueCandidates) {
      try {
        console.log(`[avatar] Tier 2: Attempting download (${candUrl.replace(/\?.*$/, '')})...`)
        const res = await fetch(candUrl)
        if (res.ok) {
          buf = Buffer.from(await res.arrayBuffer())
          console.log(`[avatar] Successfully downloaded candidate (${buf.length} bytes)`)
          break
        } else {
          console.log(`[avatar] Candidate responded ${res.status}, trying next fallback...`)
        }
      } catch (err) {
        console.log(`[avatar] Candidate fetch failed: ${err.message}`)
      }
    }
  }

  if (!buf) throw new Error('Could not download image from any candidate URL')

  await mkdir(dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, buf)
  console.log(`[avatar] wrote ${buf.length} bytes to ${OUTPUT_PATH}`)
} catch (err) {
  console.error('[avatar] failed:', err.message)
  process.exit(0)
}
