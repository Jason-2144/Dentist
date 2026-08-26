import { AUTOMATION_URL } from './config';

export interface ImportedPatient {
  name: string;
  phone: string;
  last_visit_date?: string;
  last_treatment?: string;
  status?: string;
}

/**
 * Manually triggers one of the automation service's scheduled jobs
 * (POST /run/:job — see automation/src/index.js). Used by every "Run Now"
 * button on the dashboard so a staff member doesn't have to wait for the
 * next cron slot to test or force a campaign.
 */
export async function runJob(job: string): Promise<{ ok: boolean; message: string }> {
  if (!AUTOMATION_URL) {
    return {
      ok: false,
      message: 'Automation service not configured — set VITE_AUTOMATION_URL.',
    };
  }

  try {
    const res = await fetch(`${AUTOMATION_URL}/run/${job}`, { method: 'POST' });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.ok === false) {
      return { ok: false, message: body.error || `Failed (${res.status})` };
    }
    return { ok: true, message: 'Done' };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : 'Network error' };
  }
}

/**
 * Uploads a parsed patient list to the automation service, which writes them
 * into the `patients` Appwrite table (the same one the Re-Engagement Agent's
 * "Run Campaign Now" button reads from — upload here, then run the campaign).
 */
export async function importPatients(
  patients: ImportedPatient[]
): Promise<{ ok: boolean; imported: number; total: number; errors: { name: string; phone: string; error: string }[]; message?: string }> {
  if (!AUTOMATION_URL) {
    return { ok: false, imported: 0, total: patients.length, errors: [], message: 'Automation service not configured — set VITE_AUTOMATION_URL.' };
  }

  try {
    const res = await fetch(`${AUTOMATION_URL}/patients/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patients }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.ok === false) {
      return { ok: false, imported: 0, total: patients.length, errors: [], message: body.error || `Failed (${res.status})` };
    }
    return { ok: true, imported: body.imported, total: body.total, errors: body.errors || [] };
  } catch (err) {
    return { ok: false, imported: 0, total: patients.length, errors: [], message: err instanceof Error ? err.message : 'Network error' };
  }
}
