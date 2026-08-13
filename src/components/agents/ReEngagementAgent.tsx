import React from 'react';
import { AgentCard } from '../AgentCard';
import { Mail } from 'lucide-react';

export function ReEngagementAgent() {
  return (
    <AgentCard title="Re-Engagement Agent" icon={Mail} accentColor="#3B82F6" isLive={true}>
      <div className="flex flex-col h-full justify-between">
        <div className="mb-4">
          <p className="text-3xl font-light text-gray-100 tracking-tight">47</p>
          <p className="text-xs text-blue-400 font-medium">lapsed patients messaged today</p>
        </div>

        <div className="space-y-2.5 mb-4">
          {[
            { name: 'Michael C.', status: 'Booked', color: 'text-emerald-400 bg-emerald-400/10' },
            { name: 'Emma W.', status: 'Shared Referral', color: 'text-purple-400 bg-purple-400/10' },
            { name: 'David L.', status: 'No Response', color: 'text-gray-400 bg-white/5' }
          ].map((patient, i) => (
            <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
              <span className="text-gray-300 font-medium">{patient.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${patient.color}`}>
                {patient.status}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors mt-auto">
          Run Campaign
        </button>
      </div>
    </AgentCard>
  );
}
