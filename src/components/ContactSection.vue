<script setup lang="ts">
import { profile, ui } from '../data/profile'
import { useI18n } from '../composables/useI18n'
import { useReveal } from '../composables/useReveal'

const { t } = useI18n()
const { el, isVisible } = useReveal()
</script>

<template>
  <section id="contact" aria-labelledby="contact-heading" class="py-16 sm:py-24">
    <div
      ref="el"
      :class="['container-narrow reveal', { 'is-visible': isVisible }]"
    >
      <header class="mb-10">
        <p class="section-heading">{{ t(ui.contact.eyebrow) }}</p>
        <h2
          id="contact-heading"
          class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
        >
          {{ t(ui.contact.heading) }}
        </h2>
        <p class="mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-300">
          {{ t(ui.contact.blurb) }}
        </p>
      </header>
      <ul
        :class="[
          'reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
          { 'is-visible': isVisible },
        ]"
      >
        <li>
          <a
            :href="`mailto:${profile.links.email}`"
            class="card card-hover flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              class="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <div class="min-w-0">
              <p
                class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                {{ t(ui.contact.emailLabel) }}
              </p>
              <p
                class="truncate text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                {{ profile.links.email }}
              </p>
            </div>
          </a>
        </li>
        <li>
          <a
            :href="`tel:${profile.links.phone.replace(/\s+/g, '')}`"
            class="card card-hover flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              class="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"
                />
              </svg>
            </span>
            <div class="min-w-0">
              <p
                class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                {{ t(ui.contact.phoneLabel) }}
              </p>
              <p
                class="truncate text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                {{ profile.links.phone }}
              </p>
            </div>
          </a>
        </li>
        <li>
          <a
            :href="profile.links.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="card card-hover flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              class="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-4 w-4"
              >
                <path
                  d="M20.45 20.45h-3.55v-5.56c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.65H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.42v6.32zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45zM22.23 0H1.77C.79 0 0 .78 0 1.73v20.53C0 23.22.79 24 1.77 24h20.46c.98 0 1.77-.78 1.77-1.73V1.73C24 .78 23.21 0 22.23 0z"
                />
              </svg>
            </span>
            <div class="min-w-0">
              <p
                class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                {{ t(ui.contact.linkedinLabel) }}
              </p>
              <p
                class="truncate text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                /in/{{ profile.linkedinVanity }}
              </p>
            </div>
          </a>
        </li>
        <li>
          <a
            :href="profile.links.github"
            target="_blank"
            rel="noopener noreferrer"
            class="card card-hover flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              class="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-4 w-4"
              >
                <path
                  d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.8-.25.8-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.3-1.68-1.3-1.68-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.74-1.56-2.55-.3-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.3-.52-1.47.12-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.65 1.6.24 2.77.12 3.07.74.8 1.19 1.83 1.19 3.08 0 4.41-2.7 5.37-5.27 5.66.42.36.78 1.05.78 2.13v3.16c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"
                />
              </svg>
            </span>
            <div class="min-w-0">
              <p
                class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                {{ t(ui.contact.githubLabel) }}
              </p>
              <p
                class="truncate text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                @{{ profile.githubVanity }}
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
