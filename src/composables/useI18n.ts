import { ref, watch, type Ref } from 'vue'
import type { BilingualText } from '../data/profile'

export type Locale = 'en' | 'es'

const STORAGE_KEY = 'locale'

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es') return stored
  } catch (_) {}
  return 'en'
}

// Module-level singleton so every component sees the same value.
const locale = ref<Locale>(getInitialLocale())

watch(locale, (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch (_) {}
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', value)
  }
})

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', locale.value)
}

export interface UseI18nReturn {
  locale: Ref<Locale>
  toggle: () => void
  setLocale: (l: Locale) => void
  t: (text: BilingualText) => string
}

export function useI18n(): UseI18nReturn {
  function toggle(): void {
    locale.value = locale.value === 'en' ? 'es' : 'en'
  }

  function setLocale(l: Locale): void {
    locale.value = l
  }

  function t(text: BilingualText): string {
    return text[locale.value]
  }

  return { locale, toggle, setLocale, t }
}
