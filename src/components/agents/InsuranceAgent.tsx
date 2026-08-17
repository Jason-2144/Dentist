import React from 'react';
import { AgentCard } from '../AgentCard';
import { RunButton } from '../RunButton';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { useCollection } from '../../lib/useCollection';
import { COLLECTIONS, Query } from '../../lib/appwrite';

interface ClaimRow {
  claim_id: string;
  patient_name: string;
  insurer: string;
  amount: number;
  tier: 'needs_followup' | 'urgent_forgotten' | null;
}

const ACCENT = '#D2495A';

function formatLakhs(amount: number): string {
  if (amount >= 100000) return `Rs ${(amount / 100000).toFixed(1)}L`;
  return `Rs ${amount.toLocaleString('en-IN')}`;
}

export function InsuranceAgent() {
  const { data, loading, error } = useCollection<ClaimRow>(COLLECTIONS.CLAIMS, [
    Query.equal('status', 'pending'),
  ]);

  const totalOpen = data.reduce((sum, c) => sum + (c.amount || 0), 0);
  const urgent = data.filter((c) => c.tier === 'urgent_forgotten');

  const note = loading
    ? undefined
    : urgent.length === 0
    ? "No claims have been forgotten about — everything open is still on schedule."
    : `Chasing ${urgent.length} claim${urgent.length === 1 ? '' : 's'} that's gone quiet for 30+ days — that's money owed to you.`;

  return (
    <AgentCard title="Insurance Agent" icon={ShieldCheck} accentColor={ACCENT} isLive={true} error={error} note={note}>
      <div className="flex flex-col h-full justify-between">

        <div className="mb-4">
          <span className="text-xs text-[var(--ink-muted)] uppercase tracking-wider font-medium">Open Claims</span>
          <p className="text-2xl font-light text-[var(--ink)] tracking-tight mt-1">{loading ? '—' : formatLakhs(totalOpen)}</p>
        </div>

        <div className="rounded-xl p-3 mb-4 flex-1" style={{ backgroundColor: `${ACCENT}14`, border: `1px solid ${ACCENT}33` }}>
          <div className="flex items-start space-x-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: ACCENT }} />
            <div>
              <span className="text-sm font-semibold block" style={{ color: ACCENT }}>{urgent.length} claims overdue</span>
              <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: `${ACCENT}CC` }}>30+ days pending</span>
              {urgent.slice(0, 2).map((c) => (
                <p key={c.claim_id} className="text-xs text-[var(--ink-muted)] mt-2 line-clamp-1">{c.insurer} • {c.patient_name}</p>
              ))}
              {urgent.length === 0 && !loading && <p className="text-xs text-[var(--ink-muted)] mt-2">None right now.</p>}
            </div>
          </div>
        </div>

        <RunButton job="claims" label="Re-Check Claims Now" className="text-white" style={{ backgroundColor: ACCENT }} />

      </div>
    </AgentCard>
  );
}
