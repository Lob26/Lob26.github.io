#!/usr/bin/env node
/**
 * scripts/local-deploy.mjs
 * ------------------------
 * One-shot local deployment tester.
 *
 * Takes an image path (WSL or Windows format like C:\Users\...), extracts the
 * dynamic color palette, installs the image into public/avatar.jpg, builds the
 * production bundle, and fires up Vite's preview server.
 *
 * Usage:
 *   npm run deploy:local -- "C:\Users\DELLPHOTO\Downloads\pfp1mb.jpg"
 *   npm run deploy:local -- /mnt/c/Users/DELLPHOTO/Downloads/pfp1mb.jpg
 *   npm run deploy:local -- restore  (Restores the original committed avatar)
 */

import { existsSync } from 'node:fs'
import { copyFile, stat } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { run as extractPalette } from './extract-palette.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const AVATAR_PATH = resolve(ROOT, 'public/avatar.jpg')
const BACKUP_PATH = resolve(ROOT, 'public/avatar.original.jpg')

function normalizePath(inputPath) {
  if (!inputPath) return null

  // Handle Windows paths: e.g. C:\Users\... or C:/Users/...
  const winMatch = inputPath.match(/^([a-zA-Z]):[\\/](.*)/)
  if (winMatch) {
    const drive = winMatch[1].toLowerCase()
    const rest = winMatch[2].replace(/\\/g, '/')
    return `/mnt/${drive}/${rest}`
  }

  // Already a Unix or relative path
  return resolve(process.cwd(), inputPath)
}

function runCommand(command, args) {
  return new Promise((resolvePromise, rejectPromise) => {
    const proc = spawn(command, args, {
      cwd: ROOT,
      stdio: 'inherit',
      shell: true,
    })
    proc.on('close', (code) => {
      if (code === 0) resolvePromise()
      else rejectPromise(new Error(`Command "${command} ${args.join(' ')}" exited with code ${code}`))
    })
    proc.on('error', rejectPromise)
  })
}

async function main() {
  const rawArg = process.argv[2]

  if (!rawArg) {
    console.error('\n[deploy:local] Missing image argument!')
    console.error('Usage: npm run deploy:local -- "<path-to-image>"')
    console.error('Example: npm run deploy:local -- "C:\\Users\\DELLPHOTO\\Downloads\\pfp1mb.jpg"\n')
    process.exit(1)
  }

  // Handle restore command
  if (rawArg === 'restore' || rawArg === '--restore') {
    if (!existsSync(BACKUP_PATH)) {
      console.log('\n[deploy:local] No backup found at public/avatar.original.jpg. Avatar is already original.')
    } else {
      await copyFile(BACKUP_PATH, AVATAR_PATH)
      console.log('\n[deploy:local] Restored public/avatar.jpg from backup.')
    }
    console.log('[deploy:local] Extracting palette from restored avatar...')
    await extractPalette(AVATAR_PATH)
    console.log('[deploy:local] Building production bundle...')
    await runCommand('npm', ['run', 'build'])
    console.log('\n[deploy:local] Launching preview server...')
    await runCommand('npx', ['vite', 'preview'])
    return
  }

  const targetPath = normalizePath(rawArg)
  console.log(`\n[deploy:local] Target image: ${targetPath}`)

  if (!existsSync(targetPath)) {
    console.error(`[deploy:local] Error: File does not exist at "${targetPath}"`)
    process.exit(1)
  }

  // Preserve initial backup if not already preserved
  if (!existsSync(BACKUP_PATH) && existsSync(AVATAR_PATH)) {
    await copyFile(AVATAR_PATH, BACKUP_PATH)
    console.log('[deploy:local] Saved initial backup of avatar to public/avatar.original.jpg')
  }

  // 1. Copy the target image to public/avatar.jpg
  await copyFile(targetPath, AVATAR_PATH)
  const imageStats = await stat(AVATAR_PATH)
  console.log(`[deploy:local] Updated public/avatar.jpg (${(imageStats.size / 1024).toFixed(1)} KB)`)

  // 2. Extract dynamic palette
  console.log('[deploy:local] Extracting color palette...')
  await extractPalette(AVATAR_PATH)

  // 3. Build project
  console.log('\n[deploy:local] Building production bundle...')
  await runCommand('npm', ['run', 'build'])

  // 4. Trigger local deployment server
  console.log('\n[deploy:local] Launching local deployment (Vite preview)...')
  console.log('[deploy:local] Press Ctrl+C in terminal when done to stop the server.\n')
  await runCommand('npx', ['vite', 'preview'])
}

main().catch((err) => {
  console.error('\n[deploy:local] Fatal error:', err.message)
  process.exit(1)
})
