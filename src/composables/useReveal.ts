import { onMounted, onBeforeUnmount, ref, type Ref } from 'vue'

export interface UseRevealOptions {
  /** Threshold for IntersectionObserver. Default 0.12. */
  threshold?: number
  /** Root margin. Default '0px 0px -10% 0px' so reveals trigger slightly before fully in view. */
  rootMargin?: string
  /** Once true, stay revealed. Default true. */
  once?: boolean
}

export interface UseRevealReturn {
  el: Ref<HTMLElement | null>
  isVisible: Ref<boolean>
}

/**
 * Attach `ref="el"` on the element and use `isVisible` to toggle a CSS class.
 * Respects prefers-reduced-motion: returns `isVisible = true` immediately.
 */
export function useReveal(options: UseRevealOptions = {}): UseRevealReturn {
  const { threshold = 0.12, rootMargin = '0px 0px -10% 0px', once = true } = options
  const el = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      isVisible.value = true
      return
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      isVisible.value = true
      return
    }

    if (!el.value) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            isVisible.value = true
            if (once && observer && el.value) observer.unobserve(el.value)
          } else if (!once) {
            isVisible.value = false
          }
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return { el, isVisible }
}
