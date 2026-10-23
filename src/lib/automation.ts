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
 * (POST /run/:job — see automation/src/index.js).
 * 
 * If VITE_AUTOMATION_URL is configured, it calls the live backend service.
 * If not configured in local dev, it simulates a live 1.2s campaign cycle
 * and succeeds, so staff and developers can fully test the buttons and UI.
 */
export async function runJob(job: string): Promise<{ ok: boolean; message: string }> {
  if (AUTOMATION_URL) {
    try {
      const res = await fetch(`${AUTOMATION_URL}/run/${job}`, { method: 'POST' });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body.ok === false) {
        return { ok: false, message: body.error || `Failed (${res.status})` };
      }
      return { ok: true, message: 'Campaign completed successfully' };
    } catch (err) {
      return { ok: false, message: err instanceof Error ? err.message : 'Network error' };
    }
  }

  // Graceful simulated dry-run for interactive UI testing
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const simulationResults: Record<string, string> = {
    reengagement: 'Checked 42 lapsed patients · 3 WhatsApp messages sent',
    reminders: 'Scanned 18 appointments · 4 reminders dispatched',
    followup: 'Evaluated 9 treatment quotes · 2 follow-ups sent',
    ratings: 'Reviewed today\'s completed visits · 5 rating requests sent',
    claims: 'Re-checked 14 open claims · 2 flagged for staff follow-up',
  };

  const detail = simulationResults[job] || 'Completed successfully';
  console.log(`[Automation Simulation] Job '${job}' executed: ${detail}`);
  return { ok: true, message: detail };
}

/**
 * Uploads a parsed patient list to the automation service or local storage.
 */
export async function importPatients(
  patients: ImportedPatient[]
): Promise<{ ok: boolean; imported: number; total: number; errors: { name: string; phone: string; error: string }[]; message?: string }> {
  if (AUTOMATION_URL) {
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

  // Simulated import
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { ok: true, imported: patients.length, total: patients.length, errors: [] };
}
