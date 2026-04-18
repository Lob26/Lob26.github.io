<script setup lang="ts">
import { education, ui } from '../data/profile'
import { useI18n } from '../composables/useI18n'
import { useReveal } from '../composables/useReveal'

const { t } = useI18n()
const { el, isVisible } = useReveal()
</script>

<template>
  <section
    id="education"
    aria-labelledby="education-heading"
    class="py-16 sm:py-20"
  >
    <div
      ref="el"
      :class="['container-narrow reveal', { 'is-visible': isVisible }]"
    >
      <header class="mb-10">
        <p class="section-heading">{{ t(ui.education.eyebrow) }}</p>
        <h2
          id="education-heading"
          class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
        >
          {{ t(ui.education.heading) }}
        </h2>
      </header>
      <div
        :class="['reveal-stagger space-y-5', { 'is-visible': isVisible }]"
      >
        <article
          v-for="(e, i) in education"
          :key="i"
          class="card card-hover"
        >
          <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {{ e.school }}
            </h3>
            <span class="font-mono text-xs text-slate-500 dark:text-slate-400">
              {{ t(e.period) }}
            </span>
          </div>
          <p class="mt-1 text-sm font-medium text-accent dark:text-accent-soft">
            {{ t(e.degree) }}
          </p>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {{ t(e.location) }}
          </p>
          <p
            class="mt-4 font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            {{ t(e.courseworkLabel) }}
          </p>
          <ul class="mt-2 flex flex-wrap gap-1.5">
            <li v-for="h in e.highlights" :key="h">
              <span class="tag">{{ h }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
