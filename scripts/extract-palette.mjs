#!/usr/bin/env node
/**
 * scripts/extract-palette.mjs
 * ----------------------------
 * Build-time palette extractor.
 *
 * Reads an avatar image, extracts color clusters, filters out skin tones and
 * low-chroma neutrals, and derives WCAG-compliant light and dark mode accent tokens.
 *
 * Emits:
 *   - src/data/palette.json (machine-readable tokens & metadata)
 *   - src/palette.css      (CSS variables for Tailwind and components)
 *
 * Usage:
 *   node scripts/extract-palette.mjs [path-to-image]
 * Default input: public/avatar.jpg
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const DEFAULT_INPUT = resolve(ROOT, 'public/avatar.jpg')
const JSON_OUTPUT = resolve(ROOT, 'src/data/palette.json')
const CSS_OUTPUT = resolve(ROOT, 'src/palette.css')

const FALLBACK_COLOR = {
  hex: '#2563eb',
  rgb: [37, 99, 235],
  h: 221,
  s: 0.83,
  l: 0.53,
}

// --- Color Science Utilities ------------------------------------------------

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return [h * 360, s, l]
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0

  if (h < 60) {
    r = c; g = x; b = 0
  } else if (h < 120) {
    r = x; g = c; b = 0
  } else if (h < 180) {
    r = 0; g = c; b = x
  } else if (h < 240) {
    r = 0; g = x; b = c
  } else if (h < 300) {
    r = x; g = 0; b = c
  } else {
    r = c; g = 0; b = x
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ]
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('')
}

function relativeLuminance(r, g, b) {
  const toLinear = (c) => {
    c /= 255
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function contrastRatio(rgb1, rgb2) {
  const l1 = relativeLuminance(...rgb1)
  const l2 = relativeLuminance(...rgb2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// --- Image Quantization & Cluster Scoring ------------------------------------

async function extractClusters(imagePath, k = 8) {
  const { data, info } = await sharp(imagePath)
    .resize(100, 100, { fit: 'cover' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const numPixels = info.width * info.height
  const pixels = []
  for (let i = 0; i < data.length; i += 3) {
    pixels.push([data[i], data[i + 1], data[i + 2]])
  }

  // Fast k-means
  const step = Math.floor(pixels.length / k)
  let centers = Array.from({ length: k }, (_, i) => [...pixels[i * step]])

  for (let iter = 0; iter < 12; iter++) {
    const sums = Array.from({ length: k }, () => [0, 0, 0])
    const counts = Array.from({ length: k }, () => 0)

    for (let pIdx = 0; pIdx < pixels.length; pIdx++) {
      const p = pixels[pIdx]
      let minDist = Infinity
      let best = 0
      for (let ci = 0; ci < k; ci++) {
        const c = centers[ci]
        const dist = (p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2 + (p[2] - c[2]) ** 2
        if (dist < minDist) {
          minDist = dist
          best = ci
        }
      }
      sums[best][0] += p[0]
      sums[best][1] += p[1]
      sums[best][2] += p[2]
      counts[best]++
    }

    for (let ci = 0; ci < k; ci++) {
      if (counts[ci] > 0) {
        centers[ci] = [
          sums[ci][0] / counts[ci],
          sums[ci][1] / counts[ci],
          sums[ci][2] / counts[ci],
        ]
      }
    }
  }

  // Final cluster assignments & counts
  const clusterCounts = Array(k).fill(0)
  for (let pIdx = 0; pIdx < pixels.length; pIdx++) {
    const p = pixels[pIdx]
    let minDist = Infinity
    let best = 0
    for (let ci = 0; ci < k; ci++) {
      const c = centers[ci]
      const dist = (p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2 + (p[2] - c[2]) ** 2
      if (dist < minDist) {
        minDist = dist
        best = ci
      }
    }
    clusterCounts[best]++
  }

  return centers
    .map((c, i) => {
      const [r, g, b] = c.map(Math.round)
      const [h, s, l] = rgbToHsl(r, g, b)
      return {
        rgb: [r, g, b],
        hex: rgbToHex(r, g, b),
        h,
        s,
        l,
        count: clusterCounts[i],
        share: clusterCounts[i] / numPixels,
      }
    })
    .sort((a, b) => b.share - a.share)
}

function selectAccent(clusters) {
  const candidates = []

  for (const c of clusters) {
    // 1. Extreme luminance check (near black / near white)
    const isExtreme = c.l < 0.12 || c.l > 0.90
    // 2. Skin tone window: H in 10-45 deg, moderate S and L
    const isSkin = c.h >= 10 && c.h <= 45 && c.s >= 0.15 && c.s <= 0.70 && c.l >= 0.25 && c.l <= 0.85
    // 3. Low chroma neutrals
    const isNeutral = c.s < 0.18

    if (!isExtreme && !isSkin && !isNeutral) {
      // Score favoring saturation and prevalence
      const score = Math.pow(c.s, 1.2) * Math.sqrt(c.share)
      candidates.push({ ...c, score })
    }
  }

  candidates.sort((a, b) => b.score - a.score)

  if (candidates.length > 0) {
    return {
      isFallback: false,
      cluster: candidates[0],
      candidates,
    }
  }

  return {
    isFallback: true,
    cluster: { ...FALLBACK_COLOR, count: 0, share: 0 },
    candidates: [],
  }
}

// --- Mode Token Derivation --------------------------------------------------

function deriveTokens(chosen) {
  const { h, s, isFallback } = chosen
  const white = [255, 255, 255]
  const slate950 = [2, 6, 23]

  // LIGHT MODE:
  // Must achieve contrast >= 4.5:1 against white (#ffffff)
  let lightRgb = hslToRgb(h, s, 0.45)
  let bestLightL = 0.45
  for (let testL = 0.50; testL >= 0.20; testL -= 0.01) {
    const candidateRgb = hslToRgb(h, Math.min(s * 1.05, 0.95), testL)
    if (contrastRatio(candidateRgb, white) >= 4.5) {
      lightRgb = candidateRgb
      bestLightL = testL
      break
    }
  }

  // Soft variant for hover / secondary (slightly lighter)
  const lightSoftRgb = hslToRgb(h, Math.min(s, 0.90), Math.min(bestLightL + 0.08, 0.55))

  // DARK MODE:
  // Must pop against slate-950 (rgb 2, 6, 23)
  let darkL = Math.max(0.55, Math.min(0.70, chosen.l || 0.60))
  let darkRgb = hslToRgb(h, Math.min(s, 0.90), darkL)
  if (contrastRatio(darkRgb, slate950) < 4.5) {
    for (let testL = 0.60; testL <= 0.85; testL += 0.02) {
      const candidateRgb = hslToRgb(h, Math.min(s, 0.90), testL)
      if (contrastRatio(candidateRgb, slate950) >= 4.5) {
        darkRgb = candidateRgb
        darkL = testL
        break
      }
    }
  }
  const darkSoftRgb = hslToRgb(h, Math.min(s, 0.85), Math.min(darkL + 0.10, 0.88))

  // Determine accessible text color on top of accent background.
  // Relative luminance > 0.40 requires dark text; <= 0.40 requires white.
  const lightContrastRgb = relativeLuminance(...lightRgb) > 0.40 ? slate950 : white
  const darkContrastRgb = relativeLuminance(...darkRgb) > 0.40 ? slate950 : white

  return {
    sourceHex: chosen.hex,
    isFallback,
    hue: Math.round(h),
    saturation: Number(s.toFixed(2)),
    light: {
      accent: rgbToHex(...lightRgb),
      accentSoft: rgbToHex(...lightSoftRgb),
      accentContrast: rgbToHex(...lightContrastRgb),
      rgb: lightRgb.join(' '),
      rgbSoft: lightSoftRgb.join(' '),
      rgbContrast: lightContrastRgb.join(' '),
      contrastRatioVsWhite: Number(contrastRatio(lightRgb, white).toFixed(2)),
    },
    dark: {
      accent: rgbToHex(...darkRgb),
      accentSoft: rgbToHex(...darkSoftRgb),
      accentContrast: rgbToHex(...darkContrastRgb),
      rgb: darkRgb.join(' '),
      rgbSoft: darkSoftRgb.join(' '),
      rgbContrast: darkContrastRgb.join(' '),
      contrastRatioVsSlate950: Number(contrastRatio(darkRgb, slate950).toFixed(2)),
    },
  }
}

// --- Main Runner ------------------------------------------------------------

export async function run(inputPath = DEFAULT_INPUT) {
  console.log(`\n[palette] Analyzing: ${inputPath}`)

  let clusters
  try {
    clusters = await extractClusters(inputPath)
  } catch (err) {
    console.error(`[palette] Failed to read ${inputPath}: ${err.message}`)
    console.log('[palette] Falling back to default theme.')
    clusters = []
  }

  console.log(`[palette] Found ${clusters.length} color clusters:`)
  for (const c of clusters) {
    const isSkin = c.h >= 10 && c.h <= 45 && c.s >= 0.15 && c.s <= 0.70 && c.l >= 0.25 && c.l <= 0.85
    const isNeutral = c.s < 0.18 || c.l < 0.12 || c.l > 0.90
    const tag = isSkin ? '[SKIN TONE]' : isNeutral ? '[NEUTRAL/GRAY]' : '[VIBRANT CANDIDATE]'
    console.log(`  ${c.hex}  ${(c.share * 100).toFixed(1).padStart(5)}%  H:${c.h.toFixed(0).padStart(3)}° S:${(c.s * 100).toFixed(0).padStart(3)}% L:${(c.l * 100).toFixed(0).padStart(3)}%  ${tag}`)
  }

  const selection = selectAccent(clusters)
  if (selection.isFallback) {
    console.log(`[palette] No qualified vibrant accent found (all neutral/skin). Using fallback ${FALLBACK_COLOR.hex}.`)
  } else {
    console.log(`[palette] Selected vibrant accent: ${selection.cluster.hex} (Hue: ${selection.cluster.h.toFixed(0)}°, Sat: ${(selection.cluster.s * 100).toFixed(0)}%, Share: ${(selection.cluster.share * 100).toFixed(1)}%)`)
  }

  const tokens = deriveTokens({
    ...selection.cluster,
    isFallback: selection.isFallback,
  })

  console.log('\n[palette] Derived tokens:')
  console.log(`  Light Mode Accent : ${tokens.light.accent} (Contrast vs White: ${tokens.light.contrastRatioVsWhite}:1)`)
  console.log(`  Light Contrast Text: ${tokens.light.accentContrast}`)
  console.log(`  Dark  Mode Accent : ${tokens.dark.accent} (Contrast vs Slate-950: ${tokens.dark.contrastRatioVsSlate950}:1)`)
  console.log(`  Dark  Contrast Text: ${tokens.dark.accentContrast}`)

  const relativeSource = relative(ROOT, inputPath)
  const jsonPayload = {
    source: relativeSource.startsWith('..') ? inputPath : relativeSource,
    isFallback: tokens.isFallback,
    sourceHex: tokens.sourceHex,
    hue: tokens.hue,
    saturation: tokens.saturation,
    tokens: {
      light: tokens.light,
      dark: tokens.dark,
    },
  }

  const cssPayload = `/**
 * Generated by scripts/extract-palette.mjs
 */
:root {
  --color-accent: ${tokens.light.rgb};
  --color-accent-soft: ${tokens.light.rgbSoft};
  --color-accent-contrast: ${tokens.light.rgbContrast};
}

.dark {
  --color-accent: ${tokens.dark.rgb};
  --color-accent-soft: ${tokens.dark.rgbSoft};
  --color-accent-contrast: ${tokens.dark.rgbContrast};
}
`

  await mkdir(dirname(JSON_OUTPUT), { recursive: true })
  await mkdir(dirname(CSS_OUTPUT), { recursive: true })

  const jsonStr = JSON.stringify(jsonPayload, null, 2) + '\n'
  const existingJson = await readFile(JSON_OUTPUT, 'utf-8').catch(() => null)
  if (existingJson !== jsonStr) {
    await writeFile(JSON_OUTPUT, jsonStr, 'utf-8')
  }

  const existingCss = await readFile(CSS_OUTPUT, 'utf-8').catch(() => null)
  if (existingCss !== cssPayload) {
    await writeFile(CSS_OUTPUT, cssPayload, 'utf-8')
  }

  console.log(`\n[palette] Wrote tokens to:\n  - ${JSON_OUTPUT}\n  - ${CSS_OUTPUT}\n`)
  return jsonPayload
}

// Run directly if invoked from CLI
const isDirectCall = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))
if (isDirectCall) {
  const argPath = process.argv[2] ? resolve(process.cwd(), process.argv[2]) : DEFAULT_INPUT
  run(argPath).catch((err) => {
    console.error('[palette] Fatal error:', err)
    process.exit(1)
  })
}
