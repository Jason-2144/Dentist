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

const STATUS_LABEL: Record<ReengagementRow['status'], { label: string; color: string }> = {
  booked: { label: 'Booked', color: 'text-emerald-400 bg-emerald-400/10' },
  referral_sent: { label: 'Shared Referral', color: 'text-purple-400 bg-purple-400/10' },
  sent: { label: 'Sent', color: 'text-gray-400 bg-white/5' },
  no_response: { label: 'No Response', color: 'text-gray-400 bg-white/5' },
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

  return (
    <AgentCard title="Re-Engagement Agent" icon={Mail} accentColor="#3B82F6" isLive={true} error={error}>
      <div className="flex flex-col h-full justify-between">
        <div className="mb-4">
          <p className="text-3xl font-light text-gray-100 tracking-tight">
            {loading ? '—' : allToday.length}
          </p>
          <p className="text-xs text-blue-400 font-medium">lapsed patients messaged today</p>
        </div>

        <div className="space-y-2.5 mb-4">
          {data.length === 0 && !loading && (
            <p className="text-xs text-gray-500">No messages sent yet today.</p>
          )}
          {data.map((patient) => {
            const meta = STATUS_LABEL[patient.status] ?? STATUS_LABEL.sent;
            return (
              <div key={patient.patient_id} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <span className="text-gray-300 font-medium">{patient.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${meta.color}`}>
                  {meta.label}
                </span>
              </div>
            );
          })}
        </div>

        <RunButton job="reengagement" label="Run Campaign Now" className="bg-blue-600 hover:bg-blue-500 text-white" />
      </div>
    </AgentCard>
  );
}
