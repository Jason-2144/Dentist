/**
 * Per-client branding + the automation service this dashboard talks to for
 * manual campaign triggers. Mirrors the config pattern in automation/config/*.json
 * so onboarding a new practice is "set two env vars," not "edit source."
 */

export const PRACTICE_NAME =
  (import.meta.env.VITE_PRACTICE_NAME as string) || 'Demo Dental Clinic';

export const STAFF_NAME =
  (import.meta.env.VITE_STAFF_NAME as string) || 'Practice Admin';

// Base URL of the deployed automation service (Railway/Render), no trailing slash.
// e.g. https://practice-abc.up.railway.app — leave unset in dev and the
// "run now" buttons will show a clear error instead of hanging.
export const AUTOMATION_URL = (import.meta.env.VITE_AUTOMATION_URL as string || '').replace(/\/$/, '');
