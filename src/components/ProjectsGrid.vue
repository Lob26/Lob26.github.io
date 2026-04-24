<script setup lang="ts">
import { computed } from 'vue'
import { projects, ui } from '../data/profile'
import { useI18n } from '../composables/useI18n'
import { useReveal } from '../composables/useReveal'

const { t } = useI18n()
const { el, isVisible } = useReveal()

// Impact cards are projects with a human-problem / technical-solution pair.
// Everything else renders as a compact card below.
const impactProjects = computed(() =>
  projects.filter((p) => p.humanProblem && p.technicalSolution),
)
const supportingProjects = computed(() =>
  projects.filter((p) => !(p.humanProblem && p.technicalSolution)),
)
</script>

<template>
  <section
    id="projects"
    aria-labelledby="projects-heading"
    class="py-16 sm:py-20"
  >
    <div
      ref="el"
      :class="['container-narrow reveal', { 'is-visible': isVisible }]"
    >
      <header class="mb-12 max-w-2xl">
        <p class="section-heading">{{ t(ui.projects.eyebrow) }}</p>
        <h2
          id="projects-heading"
          class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
        >
          {{ t(ui.projects.heading) }}
        </h2>
      </header>

      <!-- Impact cards: problem / solution two-pane, metric ribbon. -->
      <div
        :class="[
          'reveal-stagger grid gap-6 lg:grid-cols-2',
          { 'is-visible': isVisible },
        ]"
      >
        <article
          v-for="(p, i) in impactProjects"
          :key="`impact-${i}`"
          class="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <header class="flex items-start justify-between gap-4 border-b border-slate-100 p-6 pb-5 dark:border-slate-800">
            <div class="min-w-0">
              <h3 class="text-base font-semibold text-slate-900 dark:text-slate-50">
                <a
                  v-if="p.link"
                  :href="p.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-accent"
                >
                  {{ t(p.title) }}
                  <span aria-hidden="true" class="ml-1 inline-block">↗</span>
                </a>
                <span v-else>{{ t(p.title) }}</span>
              </h3>
              <p
                v-if="p.stakeholders"
                class="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                <span class="text-slate-400 dark:text-slate-500">{{ t(ui.projects.stakeholders) }} · </span>
                <span class="text-slate-600 dark:text-slate-300">{{ t(p.stakeholders) }}</span>
              </p>
            </div>
            <div
              v-if="p.metric"
              class="shrink-0 rounded-lg bg-accent/10 px-3 py-2 text-right dark:bg-accent/15"
            >
              <p class="font-mono text-2xl font-semibold tabular-nums leading-none text-accent dark:text-accent-soft">
                {{ p.metric.value }}
              </p>
              <p class="mt-1 text-[10px] leading-tight text-slate-600 dark:text-slate-400">
                {{ t(p.metric.label) }}
              </p>
            </div>
          </header>

          <div class="grid flex-1 gap-0 sm:grid-cols-2">
            <div class="border-b border-slate-100 p-6 sm:border-b-0 sm:border-r dark:border-slate-800">
              <p class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span aria-hidden="true" class="inline-block h-1.5 w-1.5 rounded-full bg-rose-400 dark:bg-rose-500" />
                {{ t(ui.projects.humanProblem) }}
              </p>
              <p class="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {{ t(p.humanProblem!) }}
              </p>
            </div>
            <div class="p-6">
              <p class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span aria-hidden="true" class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500" />
                {{ t(ui.projects.technicalSolution) }}
              </p>
              <p class="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {{ t(p.technicalSolution!) }}
              </p>
            </div>
          </div>

          <footer class="border-t border-slate-100 px-6 py-4 dark:border-slate-800">
            <ul class="flex flex-wrap gap-1.5">
              <li v-for="tag in p.tags" :key="tag">
                <span class="tag">{{ tag }}</span>
              </li>
            </ul>
          </footer>
        </article>
      </div>

      <!-- Supporting projects: compact, secondary visual weight. -->
      <div
        v-if="supportingProjects.length"
        :class="[
          'reveal-stagger mt-8 grid gap-5 sm:grid-cols-2',
          { 'is-visible': isVisible },
        ]"
      >
        <article
          v-for="(p, i) in supportingProjects"
          :key="`support-${i}`"
          class="card card-hover flex flex-col"
        >
          <h3 class="text-base font-semibold text-slate-900 dark:text-slate-50">
            <a
              v-if="p.link"
              :href="p.link"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-accent"
            >
              {{ t(p.title) }}
              <span aria-hidden="true" class="ml-1 inline-block">↗</span>
            </a>
            <span v-else>{{ t(p.title) }}</span>
          </h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {{ t(p.description) }}
          </p>
          <ul class="mt-4 flex flex-wrap gap-1.5">
            <li v-for="tag in p.tags" :key="tag">
              <span class="tag">{{ tag }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
