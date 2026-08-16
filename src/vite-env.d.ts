/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_DATABASE_ID?: string;
  readonly VITE_PRACTICE_NAME?: string;
  readonly VITE_STAFF_NAME?: string;
  readonly VITE_AUTOMATION_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
