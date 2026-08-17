import React from 'react';
import { AgentCard } from '../AgentCard';
import { RunButton } from '../RunButton';
import { Stethoscope } from 'lucide-react';
import { useCollection } from '../../lib/useCollection';
import { COLLECTIONS, Query } from '../../lib/appwrite';

interface TreatmentRow {
  patient_id: string;
  name: string;
  treatment: string;
  quoted_price: number;
  follow_up_count: number;
  status: 'pending' | 'booked' | 'declined' | 'logged_and_closed';
}

const ACCENT = '#6B5CD6';

export function TreatmentFollowUp() {
  const { data, loading, error } = useCollection<TreatmentRow>(COLLECTIONS.PENDING_TREATMENTS, [
    Query.equal('status', 'pending'),
  ]);

  const { data: bookedRecently } = useCollection<TreatmentRow>(COLLECTIONS.PENDING_TREATMENTS, [
    Query.equal('status', 'booked'),
    Query.orderDesc('$updatedAt'),
    Query.limit(1),
  ]);

  const pendingCount = data.length;
  const sentCount = data.filter((t) => t.follow_up_count > 0).length;
  const progressPct = pendingCount > 0 ? Math.round((sentCount / pendingCount) * 100) : 0;
  const lastUpsell = bookedRecently[0];

  const note = loading
    ? undefined
    : pendingCount === 0
    ? "Every recommended treatment has been followed up on — nothing sitting untouched."
    : `Gently nudging ${pendingCount} patient${pendingCount === 1 ? '' : 's'} who haven't booked their treatment yet.`;

  return (
    <AgentCard title="Treatment Follow-Up" icon={Stethoscope} accentColor={ACCENT} isLive={true} error={error} note={note}>
      <div className="flex flex-col h-full justify-between">

        <div>
          <p className="text-2xl font-light text-[var(--ink)] tracking-tight">{loading ? '—' : pendingCount}</p>
          <p className="text-xs font-medium" style={{ color: ACCENT }}>pending treatment plans</p>
        </div>

        <div className="mt-4 mb-5">
          <div className="flex justify-between text-[10px] text-[var(--ink-muted)] mb-1 font-medium">
            <span>Outreach Progress</span>
            <span>{sentCount} / {pendingCount} Sent</span>
          </div>
          <div className="h-1.5 w-full bg-[var(--surface-soft)] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${progressPct}%`, backgroundColor: ACCENT }}></div>
          </div>
        </div>

        <div className="rounded-xl p-3 mt-auto" style={{ backgroundColor: `${ACCENT}14`, border: `1px solid ${ACCENT}33` }}>
          <p className="text-[10px] font-medium uppercase tracking-wide mb-1" style={{ color: ACCENT }}>Last Converted Upsell</p>
          {lastUpsell ? (
            <>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--ink)] font-medium">{lastUpsell.treatment}</span>
                <span className="font-semibold" style={{ color: '#2F8F5B' }}>₹{lastUpsell.quoted_price.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-xs text-[var(--ink-muted)] mt-1">Accepted by {lastUpsell.name}</p>
            </>
          ) : (
            <p className="text-xs text-[var(--ink-muted)]">No conversions yet.</p>
          )}
        </div>

        <RunButton job="followup" label="Send Follow-Ups Now" className="text-white" style={{ backgroundColor: ACCENT }} />

      </div>
    </AgentCard>
  );
}
