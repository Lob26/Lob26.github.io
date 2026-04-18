<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
import { ui } from '../data/profile'

const { locale, toggle, t } = useI18n()
</script>

<template>
  <button
    type="button"
    :aria-label="t(ui.toggles.locale.aria)"
    :aria-pressed="locale === 'es'"
    @click="toggle"
    class="toggle-btn px-2.5 font-mono text-xs font-semibold tracking-wider"
  >
    <span
      :class="[
        'transition-colors duration-200',
        locale === 'en' ? 'text-accent' : 'text-slate-400 dark:text-slate-500',
      ]"
      >EN</span
    >
    <span aria-hidden="true" class="mx-1 text-slate-300 dark:text-slate-600">/</span>
    <span
      :class="[
        'transition-colors duration-200',
        locale === 'es' ? 'text-accent' : 'text-slate-400 dark:text-slate-500',
      ]"
      >ES</span
    >
  </button>
</template>
