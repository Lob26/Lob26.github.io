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

// --- CV format menu ---------------------------------------------------------
// Two layouts of the same CV. A plain Vue menu rather than a component library:
// the only runtime dependency here is Vue itself, and pulling in a UI kit for a
// single dropdown would outweigh the whole bundle.
const resumeMenuOpen = ref(false)
const resumeMenuEl = ref<HTMLElement | null>(null)

function toggleResumeMenu(): void {
  resumeMenuOpen.value = !resumeMenuOpen.value
}

function closeResumeMenu(): void {
  resumeMenuOpen.value = false
}

function onDocumentPointerDown(event: PointerEvent): void {
  if (!resumeMenuOpen.value) return
  const target = event.target as Node | null
  if (target && resumeMenuEl.value && !resumeMenuEl.value.contains(target)) {
    closeResumeMenu()
  }
}

function onDocumentKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') closeResumeMenu()
}

onMounted(() => {
  if (typeof document === 'undefined') return
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (rafId) cancelAnimationFrame(rafId)
  if (typeof document !== 'undefined') {
    document.removeEventListener('pointerdown', onDocumentPointerDown)
    document.removeEventListener('keydown', onDocumentKeydown)
  }
})
</script>

<template>
  <section
    id="home"
    aria-labelledby="hero-heading"
    class="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24"
  >
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

          <!-- Pillars: Role and education as visual anchors. -->
          <dl
            class="mt-8 grid gap-3 sm:grid-cols-2"
            :aria-label="profile.name"
          >
            <div
              v-for="(p, i) in profile.pillars"
              :key="i"
              class="rounded-lg border border-slate-200 bg-white/60 p-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
            >
              <dt
                class="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                {{ t(p.label) }}
              </dt>
              <dd class="mt-1.5 text-sm font-semibold text-slate-900 dark:text-slate-50">
                {{ t(p.value) }}
              </dd>
              <dd class="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {{ t(p.detail) }}
              </dd>
            </div>
          </dl>

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
            <div ref="resumeMenuEl" class="relative">
              <button
                type="button"
                :aria-expanded="resumeMenuOpen"
                aria-haspopup="menu"
                :aria-label="t(ui.hero.resumeMenuLabel)"
                class="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                @click="toggleResumeMenu"
              >
                {{ t(ui.hero.resume) }}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-4 w-4 transition-transform duration-200"
                  :class="resumeMenuOpen ? 'rotate-180' : ''"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div
                v-if="resumeMenuOpen"
                role="menu"
                :aria-label="t(ui.hero.resumeMenuLabel)"
                class="absolute left-0 top-full z-20 mt-2 min-w-[15rem] overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
              >
                <a
                  v-for="format in profile.links.resumes"
                  :key="format.id"
                  role="menuitem"
                  :href="format.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block px-4 py-2 text-left text-sm text-slate-700 transition-colors duration-150 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                  @click="closeResumeMenu"
                >
                  <span class="block font-medium">{{ t(ui.hero.resumeFormats[format.id].name) }}</span>
                  <span class="block text-xs text-slate-500 dark:text-slate-400">
                    {{ t(ui.hero.resumeFormats[format.id].hint) }}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
