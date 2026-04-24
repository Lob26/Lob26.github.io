<script setup lang="ts">
import { computed } from 'vue'
import { skills, ui } from '../data/profile'
import { useI18n } from '../composables/useI18n'
import { useReveal } from '../composables/useReveal'

const { t } = useI18n()
const { el, isVisible } = useReveal()

// Business capabilities is the hero card; technical groups slot underneath.
const featuredGroup = computed(() =>
  skills.find((g) => g.emphasis === 'business'),
)
const technicalGroups = computed(() =>
  skills.filter((g) => g.emphasis === 'technical'),
)
</script>

<template>
  <section
    id="skills"
    aria-labelledby="skills-heading"
    class="py-16 sm:py-20"
  >
    <div
      ref="el"
      :class="['container-narrow reveal', { 'is-visible': isVisible }]"
    >
      <header class="mb-10 max-w-2xl">
        <p class="section-heading">{{ t(ui.skills.eyebrow) }}</p>
        <h2
          id="skills-heading"
          class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
        >
          {{ t(ui.skills.heading) }}
        </h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {{ t(ui.skills.businessCaption) }}
        </p>
      </header>

      <!-- Featured: Business Capabilities, full-width card. -->
      <dl
        v-if="featuredGroup"
        :class="[
          'reveal-stagger grid gap-5',
          { 'is-visible': isVisible },
        ]"
      >
        <div
          class="rounded-xl border border-accent/30 bg-accent/5 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 dark:border-accent/25 dark:bg-accent/10"
        >
          <dt class="flex items-center justify-between gap-3">
            <span class="font-mono text-xs uppercase tracking-wider text-accent dark:text-accent-soft">
              {{ t(featuredGroup.group) }}
            </span>
            <span
              v-if="featuredGroup.caption"
              class="hidden text-right text-[11px] leading-tight text-slate-500 dark:text-slate-400 sm:block"
            >
              {{ t(featuredGroup.caption) }}
            </span>
          </dt>
          <dd class="mt-4">
            <ul class="flex flex-wrap gap-2">
              <li v-for="item in featuredGroup.items" :key="item">
                <span class="inline-flex items-center rounded-md bg-white px-2.5 py-1 text-sm font-medium text-slate-800 shadow-sm dark:bg-slate-900 dark:text-slate-100">
                  {{ item }}
                </span>
              </li>
            </ul>
          </dd>
        </div>
      </dl>

      <!-- Technical groups, quieter visual weight. -->
      <dl
        :class="[
          'reveal-stagger mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
          { 'is-visible': isVisible },
        ]"
      >
        <div v-for="group in technicalGroups" :key="group.group.en" class="card card-hover">
          <dt
            class="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            {{ t(group.group) }}
          </dt>
          <dd class="mt-3">
            <ul class="flex flex-wrap gap-1.5">
              <li v-for="item in group.items" :key="item">
                <span class="tag">{{ item }}</span>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
