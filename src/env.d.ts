/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

declare module '*.svg' {
  const src: string
  export default src
}

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly VITE_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
