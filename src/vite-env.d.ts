/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PORT?: string;
  readonly VITE_PORT?: string;
  readonly VITE_APP_ENV?: string;
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_DESCRIPTION?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_ADMISSIONS_EMAIL?: string;
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
