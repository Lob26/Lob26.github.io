<script setup lang="ts">
import { computed } from 'vue'
import { profile, ui } from './data/profile'
import HeroSection from './components/HeroSection.vue'
import ExperienceTimeline from './components/ExperienceTimeline.vue'
import ProjectsGrid from './components/ProjectsGrid.vue'
import SkillsCloud from './components/SkillsCloud.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import LocaleToggle from './components/LocaleToggle.vue'
import { useI18n } from './composables/useI18n'

const { t } = useI18n()
const year = new Date().getFullYear()

const navItems = computed(() => [
  { href: '#experience', label: t(ui.nav.experience) },
  { href: '#projects', label: t(ui.nav.projects) },
  { href: '#skills', label: t(ui.nav.skills) },
  { href: '#education', label: t(ui.nav.education) },
  { href: '#contact', label: t(ui.nav.contact) },
])
</script>

<template>
  <a
    href="#home"
    class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
  >
    {{ t(ui.skipToContent) }}
  </a>

  <header
    class="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/80"
  >
    <div class="container-narrow flex h-14 items-center justify-between">
      <a
        href="#home"
        class="font-mono text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50"
      >
        pedro.lobato<span class="text-accent">.</span>
      </a>
      <nav aria-label="Primary" class="flex items-center gap-1 sm:gap-2">
        <a
          v-for="(item, i) in navItems"
          :key="i"
          :href="item.href"
          class="hidden rounded-md px-3 py-1.5 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 sm:inline-block"
        >
          {{ item.label }}
        </a>
        <LocaleToggle />
        <ThemeToggle />
      </nav>
    </div>
  </header>

  <main>
    <HeroSection />
    <ExperienceTimeline />
    <ProjectsGrid />
    <SkillsCloud />
    <EducationSection />
    <ContactSection />
  </main>

  <footer class="border-t border-slate-200 py-8 dark:border-slate-800">
    <div
      class="container-narrow flex flex-col items-start justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center"
    >
      <p>© {{ year }} {{ profile.name }}. {{ t(ui.footer.builtWith) }}</p>
      <p class="font-mono">{{ t(profile.location) }}</p>
    </div>
  </footer>
</template>
