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

export function AIReceptionist() {
  const [isActive, setIsActive] = useState(true);

  const { data: today, loading } = useCollection<CallRow>(COLLECTIONS.CALLS_LOG, [
    Query.greaterThanEqual('handled_at', startOfTodayISO()),
    Query.orderDesc('handled_at'),
  ]);

  const handled = today.filter((c) => !c.missed).length;
  const missed = today.filter((c) => c.missed).length;
  const recent = today.slice(0, 3);

  return (
    <AgentCard title="AI Receptionist" icon={PhoneCall} accentColor="#14B8A6" isLive={isActive}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-light text-gray-100 tracking-tight">{loading ? '—' : handled}</p>
              <p className="text-sm text-gray-400">/ {loading ? '—' : missed} missed</p>
            </div>
            <p className="text-xs text-teal-400 font-medium">calls handled today</p>
          </div>

          <button
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isActive ? 'bg-teal-500' : 'bg-gray-600'}`}
          >
            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="space-y-3 mb-2 flex-1">
          {recent.length === 0 && !loading && (
            <p className="text-xs text-gray-500">No calls handled yet today.</p>
          )}
          {recent.map((log) => (
            <div key={log.$id} className="flex flex-col space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300 font-medium truncate pr-2">{log.summary}</span>
                <span className="text-gray-500 shrink-0">
                  {new Date(log.handled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <span className="text-[10px] text-teal-500/70 capitalize">{log.type}</span>
            </div>
          ))}
        </div>
      </div>
    </AgentCard>
  );
}
