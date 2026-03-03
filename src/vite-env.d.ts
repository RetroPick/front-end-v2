/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WLD_APP_ID: string
    readonly VITE_WLD_ACTION: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
