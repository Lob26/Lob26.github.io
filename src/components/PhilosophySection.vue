<script setup lang="ts">
import { profile, ui } from '../data/profile'
import { useI18n } from '../composables/useI18n'
import { useReveal } from '../composables/useReveal'

const { t } = useI18n()
const { el, isVisible } = useReveal()
</script>

<template>
  <section
    id="philosophy"
    aria-labelledby="philosophy-heading"
    class="border-y border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 py-20 dark:border-slate-800 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 sm:py-24"
  >
    <div
      ref="el"
      :class="['container-narrow reveal', { 'is-visible': isVisible }]"
    >
      <div class="mx-auto max-w-3xl text-center">
        <p class="section-heading">{{ t(ui.philosophy.eyebrow) }}</p>
        <h2
          id="philosophy-heading"
          class="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
        >
          {{ t(ui.philosophy.heading) }}
        </h2>

        <figure class="mt-10">
          <!-- Decorative quote mark, grey so the words carry the weight. -->
          <span
            aria-hidden="true"
            class="block font-serif text-6xl leading-none text-slate-300 dark:text-slate-700"
          >&ldquo;</span>
          <blockquote
            class="-mt-4 text-xl font-medium leading-relaxed text-slate-800 dark:text-slate-100 sm:text-2xl"
          >
            {{ t(profile.philosophyQuote) }}
          </blockquote>
          <figcaption class="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {{ t(profile.philosophy) }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
