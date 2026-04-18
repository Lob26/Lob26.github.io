import { ref, onMounted, type Ref } from 'vue'
import fallbackAvatar from '../assets/avatar.svg'

/**
 * useLinkedInAvatar
 * -----------------
 * Returns a reactive avatar URL. Strategy:
 *
 *   1. Try `<base>/avatar.jpg` — written to `public/avatar.jpg` by the
 *      weekly GitHub Action at `.github/workflows/update-avatar.yml`,
 *      which authenticates against the LinkedIn API using a repository
 *      secret and commits the fresh image back to the repo.
 *   2. If the file is missing (first deploy, failed sync, etc.), fall back
 *      to the bundled SVG monogram.
 *
 * Why not call LinkedIn from the browser?
 * ---------------------------------------
 * LinkedIn's API requires OAuth 2.0 (client_id + client_secret) and blocks
 * CORS. A purely static frontend would either leak credentials or need a
 * dedicated server-side proxy. Running the fetch in CI once a week is both
 * safer (secret stays in GitHub Actions) and cheaper (no live API hit per
 * page view).
 */
export interface UseLinkedInAvatarReturn {
  avatarUrl: Ref<string>
  loading: Ref<boolean>
}

export function useLinkedInAvatar(): UseLinkedInAvatarReturn {
  const avatarUrl = ref<string>(fallbackAvatar)
  const loading = ref<boolean>(true)

  function resolveRemotePath(): string {
    const base = import.meta.env.BASE_URL || '/'
    return `${base.replace(/\/$/, '')}/avatar.jpg`
  }

  function probe(): void {
    const candidate = resolveRemotePath()
    const img = new Image()
    img.onload = () => {
      avatarUrl.value = candidate
      loading.value = false
    }
    img.onerror = () => {
      loading.value = false
    }
    img.src = candidate
  }

  onMounted(probe)

  return { avatarUrl, loading }
}
