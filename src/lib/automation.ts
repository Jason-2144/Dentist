import { AUTOMATION_URL } from './config';

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
