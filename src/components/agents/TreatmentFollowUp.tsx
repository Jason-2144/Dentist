import React from 'react';
import { AgentCard } from '../AgentCard';
import { Stethoscope } from 'lucide-react';

export function TreatmentFollowUp() {
  return (
    <AgentCard title="Treatment Follow-Up" icon={Stethoscope} accentColor="#6366F1" isLive={true}>
      <div className="flex flex-col h-full justify-between">
        
        <div>
          <p className="text-2xl font-light text-gray-100 tracking-tight">23</p>
          <p className="text-xs text-indigo-400 font-medium">pending treatment plans</p>
        </div>

        <div className="mt-4 mb-5">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1 font-medium">
            <span>Outreach Progress</span>
            <span>15 / 23 Sent</span>
          </div>
          <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full w-[65%]"></div>
          </div>
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3 mt-auto">
          <p className="text-[10px] text-indigo-300/70 font-medium uppercase tracking-wide mb-1">Last Converted Upsell</p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-200 font-medium">Invisalign Full</span>
            <span className="text-emerald-400 font-semibold">$4,500</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Accepted by J. Smith 14m ago</p>
        </div>

      </div>
    </AgentCard>
  );
}
