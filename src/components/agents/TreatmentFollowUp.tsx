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

  return (
    <AgentCard title="Treatment Follow-Up" icon={Stethoscope} accentColor="#6366F1" isLive={true} error={error}>
      <div className="flex flex-col h-full justify-between">

        <div>
          <p className="text-2xl font-light text-gray-100 tracking-tight">{loading ? '—' : pendingCount}</p>
          <p className="text-xs text-indigo-400 font-medium">pending treatment plans</p>
        </div>

        <div className="mt-4 mb-5">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1 font-medium">
            <span>Outreach Progress</span>
            <span>{sentCount} / {pendingCount} Sent</span>
          </div>
          <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3 mt-auto">
          <p className="text-[10px] text-indigo-300/70 font-medium uppercase tracking-wide mb-1">Last Converted Upsell</p>
          {lastUpsell ? (
            <>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-200 font-medium">{lastUpsell.treatment}</span>
                <span className="text-emerald-400 font-semibold">₹{lastUpsell.quoted_price.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Accepted by {lastUpsell.name}</p>
            </>
          ) : (
            <p className="text-xs text-gray-500">No conversions yet.</p>
          )}
        </div>

        <RunButton job="followup" label="Send Follow-Ups Now" className="bg-indigo-600 hover:bg-indigo-500 text-white" />

      </div>
    </AgentCard>
  );
}
