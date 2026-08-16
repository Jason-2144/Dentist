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

  return (
    <AgentCard title="Insurance Agent" icon={ShieldCheck} accentColor="#F43F5E" isLive={true} error={error}>
      <div className="flex flex-col h-full justify-between">

        <div className="mb-4">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Open Claims</span>
          <p className="text-2xl font-light text-gray-100 tracking-tight mt-1">{loading ? '—' : formatLakhs(totalOpen)}</p>
        </div>

        <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 mb-4 flex-1">
          <div className="flex items-start space-x-2">
            <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-rose-400 block">{urgent.length} claims overdue</span>
              <span className="text-[10px] text-rose-300/70 uppercase tracking-wider font-medium">30+ days pending</span>
              {urgent.slice(0, 2).map((c) => (
                <p key={c.claim_id} className="text-xs text-gray-400 mt-2 line-clamp-1">{c.insurer} • {c.patient_name}</p>
              ))}
              {urgent.length === 0 && !loading && <p className="text-xs text-gray-500 mt-2">None right now.</p>}
            </div>
          </div>
        </div>

        <RunButton job="claims" label="Re-Check Claims Now" className="bg-rose-600 hover:bg-rose-500 text-white" />

      </div>
    </AgentCard>
  );
}
