<script setup lang="ts">
import { skills, ui } from '../data/profile'
import { useI18n } from '../composables/useI18n'
import { useReveal } from '../composables/useReveal'

const { t } = useI18n()
const { el, isVisible } = useReveal()
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
      <header class="mb-10">
        <p class="section-heading">{{ t(ui.skills.eyebrow) }}</p>
        <h2
          id="skills-heading"
          class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
        >
          {{ t(ui.skills.heading) }}
        </h2>
      </header>
      <dl
        :class="[
          'reveal-stagger grid gap-6 sm:grid-cols-2',
          { 'is-visible': isVisible },
        ]"
      >
        <div v-for="group in skills" :key="group.group.en" class="card card-hover">
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
