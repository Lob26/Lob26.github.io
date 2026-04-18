import { ref, watch, onMounted, type Ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch (_) {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const theme = ref<Theme>(getInitialTheme())

function applyTheme(value: Theme): void {
  const root = document.documentElement
  if (value === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

export interface UseThemeReturn {
  theme: Ref<Theme>
  toggle: () => void
}

export function useTheme(): UseThemeReturn {
  onMounted(() => {
    applyTheme(theme.value)
  })

  watch(theme, (value) => {
    applyTheme(value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch (_) {}
  })

  // Respect system changes when the user hasn't explicitly chosen a theme.
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (e: MediaQueryListEvent): void => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          theme.value = e.matches ? 'dark' : 'light'
        }
      } catch (_) {}
    }
    mql.addEventListener?.('change', listener)
  }

  function toggle(): void {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggle }
}
