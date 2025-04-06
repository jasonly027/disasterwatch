/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GMAP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
