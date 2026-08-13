import React from 'react';
import { AgentCard } from '../AgentCard';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export function InsuranceAgent() {
  return (
    <AgentCard title="Insurance Agent" icon={ShieldCheck} accentColor="#F43F5E" isLive={true}>
      <div className="flex flex-col h-full justify-between">
        
        <div className="mb-4">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Open Claims</span>
          <p className="text-2xl font-light text-gray-100 tracking-tight mt-1">Rs 1.8L</p>
        </div>

        <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 mb-4 flex-1">
          <div className="flex items-start space-x-2">
            <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-rose-400 block">3 claims overdue</span>
              <span className="text-[10px] text-rose-300/70 uppercase tracking-wider font-medium">30+ days pending</span>
              <p className="text-xs text-gray-400 mt-2 line-clamp-1">Bajaj Allianz • Root Canal (Dr. S)</p>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">HDFC Ergo • Extraction</p>
            </div>
          </div>
        </div>

        <button className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg transition-colors mt-auto">
          Send Follow-Up
        </button>

      </div>
    </AgentCard>
  );
}
