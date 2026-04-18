<script setup lang="ts">
import { experience, ui } from '../data/profile'
import { useI18n } from '../composables/useI18n'
import { useReveal } from '../composables/useReveal'

const { t } = useI18n()
const { el, isVisible } = useReveal()
</script>

<template>
  <section
    id="experience"
    aria-labelledby="experience-heading"
    class="py-16 sm:py-20"
  >
    <div
      ref="el"
      :class="['container-narrow reveal', { 'is-visible': isVisible }]"
    >
      <header class="mb-10">
        <p class="section-heading">{{ t(ui.experience.eyebrow) }}</p>
        <h2
          id="experience-heading"
          class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
        >
          {{ t(ui.experience.heading) }}
        </h2>
      </header>
      <ol
        :class="[
          'reveal-stagger relative border-l border-slate-200 pl-8 dark:border-slate-800',
          { 'is-visible': isVisible },
        ]"
      >
        <li
          v-for="(role, i) in experience"
          :key="i"
          class="relative pb-10 last:pb-0"
        >
          <span
            aria-hidden="true"
            class="absolute -left-[33px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-accent dark:border-slate-950"
          />
          <div class="card card-hover">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {{ t(role.role) }}
              </h3>
              <span class="font-mono text-xs text-slate-500 dark:text-slate-400">
                {{ t(role.period) }}
              </span>
            </div>
            <p class="mt-1 text-sm font-medium text-accent dark:text-accent-soft">
              {{ role.company }}
              <span class="text-slate-400 dark:text-slate-500">·</span>
              <span class="text-slate-500 dark:text-slate-400">{{
                t(role.location)
              }}</span>
            </p>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{ t(role.summary) }}
            </p>
            <ul class="mt-5 space-y-3">
              <li
                v-for="(h, j) in role.highlights"
                :key="j"
                class="flex gap-4"
              >
                <span
                  v-if="h.metric"
                  class="shrink-0 font-mono text-lg font-semibold tabular-nums text-accent dark:text-accent-soft"
                  :aria-label="`${h.metric} metric`"
                >
                  {{ h.metric }}
                </span>
                <span
                  v-else
                  aria-hidden="true"
                  class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600"
                />
                <div>
                  <p class="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {{ t(h.label) }}
                  </p>
                  <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {{ t(h.detail) }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
