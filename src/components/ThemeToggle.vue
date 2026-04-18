<script setup lang="ts">
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'
import { ui } from '../data/profile'

const { theme, toggle } = useTheme()
const { t } = useI18n()
</script>

<template>
  <button
    type="button"
    :aria-label="
      theme === 'dark' ? t(ui.toggles.theme.toLight) : t(ui.toggles.theme.toDark)
    "
    :aria-pressed="theme === 'dark'"
    @click="toggle"
    class="toggle-btn w-9"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 rotate-[-90deg] scale-75"
      leave-to-class="opacity-0 rotate-90 scale-75"
    >
      <svg
        v-if="theme === 'dark'"
        key="sun"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        />
      </svg>
      <svg
        v-else
        key="moon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    </Transition>
  </button>
</template>
