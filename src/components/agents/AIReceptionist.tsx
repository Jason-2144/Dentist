import React, { useState } from 'react';
import { AgentCard } from '../AgentCard';
import { PhoneCall } from 'lucide-react';
import { useCollection } from '../../lib/useCollection';
import { COLLECTIONS, Query, startOfTodayISO } from '../../lib/appwrite';

interface CallRow {
  $id: string;
  patient_name: string;
  action?: string;
  summary: string;
  type: 'scheduling' | 'support' | 'conversion' | 'escalation';
  handled_at: string;
  missed: boolean;
}

const ACCENT = '#1B8C7A';

export function AIReceptionist() {
  const [isActive, setIsActive] = useState(true);

  const { data: today, loading, error } = useCollection<CallRow>(COLLECTIONS.CALLS_LOG, [
    Query.greaterThanEqual('handled_at', startOfTodayISO()),
    Query.orderDesc('handled_at'),
  ]);

  const handled = today.filter((c) => !c.missed).length;
  const missed = today.filter((c) => c.missed).length;
  const recent = today.slice(0, 3);

  const note = loading
    ? undefined
    : handled === 0
    ? "Phones have been quiet so far — I'll pick up the moment they ring."
    : missed === 0
    ? `Answered every call today — ${handled} patients, nobody on hold.`
    : `Answered ${handled} calls today. ${missed} slipped through — worth a callback.`;

  return (
    <AgentCard title="AI Receptionist" icon={PhoneCall} accentColor={ACCENT} isLive={isActive} error={error} note={note}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-light text-[var(--ink)] tracking-tight">{loading ? '—' : handled}</p>
              <p className="text-sm text-[var(--ink-muted)]">/ {loading ? '—' : missed} missed</p>
            </div>
            <p className="text-xs font-medium" style={{ color: ACCENT }}>calls handled today</p>
          </div>

          <button
            onClick={() => setIsActive(!isActive)}
            aria-label={isActive ? 'Receptionist is on duty — click to mark as off duty (display only)' : 'Receptionist marked off duty — click to mark as on duty (display only)'}
            title="Display only — does not stop the phone line. Deploy/redeploy the automation service to actually take the receptionist offline."
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isActive ? '' : 'bg-gray-300'}`}
            style={isActive ? { backgroundColor: ACCENT } : undefined}
          >
            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="space-y-3 mb-2 flex-1">
          {recent.length === 0 && !loading && (
            <p className="text-xs text-[var(--ink-muted)]">No calls handled yet today.</p>
          )}
          {recent.map((log) => (
            <div key={log.$id} className="flex flex-col space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--ink)] font-medium truncate pr-2">{log.summary}</span>
                <span className="text-[var(--ink-muted)] shrink-0">
                  {new Date(log.handled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <span className="text-[10px] capitalize" style={{ color: ACCENT }}>{log.type}</span>
            </div>
          ))}
        </div>
      </div>
    </AgentCard>
  );
}
