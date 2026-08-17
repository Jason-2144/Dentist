import React from 'react';
import { AgentCard } from '../AgentCard';
import { RunButton } from '../RunButton';
import { Mail } from 'lucide-react';
import { useCollection } from '../../lib/useCollection';
import { COLLECTIONS, Query, startOfTodayISO } from '../../lib/appwrite';

interface ReengagementRow {
  patient_id: string;
  name: string;
  status: 'sent' | 'booked' | 'referral_sent' | 'no_response';
  sent_at: string;
}

const ACCENT = '#3B6FE0';

const STATUS_LABEL: Record<ReengagementRow['status'], { label: string; color: string; bg: string }> = {
  booked: { label: 'Booked', color: '#2F8F5B', bg: '#2F8F5B1A' },
  referral_sent: { label: 'Shared Referral', color: '#6B5CD6', bg: '#6B5CD61A' },
  sent: { label: 'Sent', color: 'var(--ink-muted)', bg: 'var(--surface-soft)' },
  no_response: { label: 'No Response', color: 'var(--ink-muted)', bg: 'var(--surface-soft)' },
};

export function ReEngagementAgent() {
  const { data, loading, error } = useCollection<ReengagementRow>(COLLECTIONS.REENGAGEMENT_LOG, [
    Query.greaterThanEqual('sent_at', startOfTodayISO()),
    Query.orderDesc('sent_at'),
    Query.limit(3),
  ]);

  // Separate call just for today's total count (limit(1) above would undercount).
  const { data: allToday } = useCollection<ReengagementRow>(COLLECTIONS.REENGAGEMENT_LOG, [
    Query.greaterThanEqual('sent_at', startOfTodayISO()),
  ]);

  const booked = allToday.filter((p) => p.status === 'booked').length;
  const note = loading
    ? undefined
    : allToday.length === 0
    ? "Haven't reached out to anyone yet today — starting with your longest-gone patients."
    : booked > 0
    ? `Reached ${allToday.length} patients who'd drifted away — ${booked} already rebooked.`
    : `Reached ${allToday.length} patients who'd drifted away. No bookings yet — I'll keep trying.`;

  return (
    <AgentCard title="Re-Engagement Agent" icon={Mail} accentColor={ACCENT} isLive={true} error={error} note={note}>
      <div className="flex flex-col h-full justify-between">
        <div className="mb-4">
          <p className="text-3xl font-light text-[var(--ink)] tracking-tight">
            {loading ? '—' : allToday.length}
          </p>
          <p className="text-xs font-medium" style={{ color: ACCENT }}>lapsed patients messaged today</p>
        </div>

        <div className="space-y-2.5 mb-4">
          {data.length === 0 && !loading && (
            <p className="text-xs text-[var(--ink-muted)]">No messages sent yet today.</p>
          )}
          {data.map((patient) => {
            const meta = STATUS_LABEL[patient.status] ?? STATUS_LABEL.sent;
            return (
              <div key={patient.patient_id} className="flex justify-between items-center text-sm border-b border-[var(--hairline)] pb-2 last:border-0 last:pb-0">
                <span className="text-[var(--ink)] font-medium">{patient.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ color: meta.color, backgroundColor: meta.bg }}>
                  {meta.label}
                </span>
              </div>
            );
          })}
        </div>

        <RunButton job="reengagement" label="Run Campaign Now" className="text-white" style={{ backgroundColor: ACCENT }} />
      </div>
    </AgentCard>
  );
}
