<script setup lang="ts">
import { projects, ui } from '../data/profile'
import { useI18n } from '../composables/useI18n'
import { useReveal } from '../composables/useReveal'

const { t } = useI18n()
const { el, isVisible } = useReveal()
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
      <header class="mb-10">
        <p class="section-heading">{{ t(ui.projects.eyebrow) }}</p>
        <h2
          id="projects-heading"
          class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
        >
          {{ t(ui.projects.heading) }}
        </h2>
      </header>
      <div
        :class="[
          'reveal-stagger grid gap-5 sm:grid-cols-2',
          { 'is-visible': isVisible },
        ]"
      >
        <article
          v-for="(p, i) in projects"
          :key="i"
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
