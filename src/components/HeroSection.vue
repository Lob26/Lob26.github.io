<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { profile, ui } from '../data/profile'
import { useLinkedInAvatar } from '../composables/useLinkedInAvatar'
import { useI18n } from '../composables/useI18n'
import { useReveal } from '../composables/useReveal'

const { avatarUrl } = useLinkedInAvatar()
const { t } = useI18n()
const { el, isVisible } = useReveal({ threshold: 0.05 })

const parallaxEl = ref<HTMLElement | null>(null)
let rafId = 0
let ticking = false
let enabled = true

function onScroll(): void {
  if (!enabled || !parallaxEl.value) return
  if (ticking) return
  ticking = true
  rafId = requestAnimationFrame(() => {
    if (parallaxEl.value) {
      const y = window.scrollY * 0.3
      parallaxEl.value.style.setProperty('--parallax-y', `${y}px`)
    }
    ticking = false
  })
}

onMounted(() => {
  if (typeof window === 'undefined') return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 640px)').matches
  if (prefersReduced || isMobile) {
    enabled = false
    return
  }
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <section
    id="home"
    aria-labelledby="hero-heading"
    class="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24"
  >
    <!-- Decorative parallax layer: soft gradient blob, hidden on mobile. -->
    <div
      ref="parallaxEl"
      aria-hidden="true"
      class="parallax-layer pointer-events-none absolute inset-x-0 top-0 -z-10 hidden sm:block"
    >
      <div
        class="mx-auto h-72 w-[42rem] max-w-full rounded-full bg-gradient-to-br from-accent/15 via-accent-soft/10 to-transparent blur-3xl dark:from-accent/20 dark:via-accent-soft/10"
      />
    </div>

    <div
      ref="el"
      :class="['container-narrow reveal', { 'is-visible': isVisible }]"
    >
      <div class="flex flex-col items-start gap-10 sm:flex-row sm:items-center">
        <div class="shrink-0">
          <img
            :src="avatarUrl"
            :alt="`${t(ui.hero.portraitAlt)} ${profile.name}`"
            width="144"
            height="144"
            loading="eager"
            decoding="async"
            class="h-28 w-28 rounded-full border border-slate-200 bg-slate-100 object-cover shadow-sm transition-transform duration-500 hover:scale-[1.03] dark:border-slate-700 dark:bg-slate-800 sm:h-36 sm:w-36"
          />
        </div>
        <div class="flex-1">
          <p class="section-heading mb-3">{{ t(profile.tagline) }}</p>
          <h1
            id="hero-heading"
            class="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl"
          >
            {{ profile.name }}
          </h1>
          <p class="mt-2 text-lg font-medium text-accent dark:text-accent-soft">
            {{ t(profile.title) }}
            <span class="text-slate-400 dark:text-slate-500">·</span>
            <span class="text-slate-600 dark:text-slate-300">{{
              t(profile.subtitle)
            }}</span>
          </p>
          <p
            class="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300"
          >
            {{ t(profile.bio) }}
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a
              :href="`mailto:${profile.links.email}`"
              class="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-soft hover:shadow-md"
            >
              {{ t(ui.hero.getInTouch) }}
            </a>
            <a
              :href="profile.links.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {{ t(ui.hero.linkedin) }}
            </a>
            <a
              :href="profile.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {{ t(ui.hero.github) }}
            </a>
            <a
              :href="profile.links.resume"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {{ t(ui.hero.resume) }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
