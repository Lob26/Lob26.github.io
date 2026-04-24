<script setup lang="ts">
import { computed } from 'vue'
import { experience, ui } from '../data/profile'
import { useI18n } from '../composables/useI18n'
import { useReveal } from '../composables/useReveal'

const { t } = useI18n()
const { el, isVisible } = useReveal()

// Render chronologically (earliest first) so the reader watches responsibility grow.
const growthPath = computed(() => [...experience].reverse())
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
      <header class="mb-12 max-w-2xl">
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
          'reveal-stagger relative border-l-2 border-dashed border-slate-200 pl-8 dark:border-slate-800',
          { 'is-visible': isVisible },
        ]"
      >
        <li
          v-for="(role, i) in growthPath"
          :key="i"
          class="relative pb-12 last:pb-0"
        >
          <!-- Node: size and fill grow with seniority level. -->
          <span
            aria-hidden="true"
            :class="[
              'absolute flex items-center justify-center rounded-full border-2 border-white shadow-sm dark:border-slate-950',
              role.level === 3
                ? '-left-[37px] top-1 h-6 w-6 bg-accent ring-4 ring-accent/15'
                : role.level === 2
                  ? '-left-[34px] top-1 h-5 w-5 bg-accent/80'
                  : '-left-[31px] top-2 h-3.5 w-3.5 bg-slate-400 dark:bg-slate-500',
            ]"
          >
            <span
              v-if="role.level === 3"
              class="font-mono text-[10px] font-bold text-white"
              aria-hidden="true"
            >★</span>
          </span>

          <!-- Seniority ribbon: visual cue of responsibility growth. -->
          <p
            :class="[
              'mb-2 inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider',
              role.level === 3
                ? 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-soft'
                : role.level === 2
                  ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400',
            ]"
          >
            <span aria-hidden="true">{{ role.level === 3 ? '03' : role.level === 2 ? '02' : '01' }}</span>
            <span>{{ t(role.seniority) }}</span>
          </p>

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
            <ul class="mt-5 space-y-4">
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
                <div class="min-w-0">
                  <p class="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {{ t(h.label) }}
                  </p>
                  <p
                    v-if="h.stakeholders"
                    class="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400"
                  >
                    <span class="text-slate-400 dark:text-slate-500">{{ t(ui.experience.stakeholdersLabel) }} · </span>
                    <span>{{ t(h.stakeholders) }}</span>
                  </p>
                  <p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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
