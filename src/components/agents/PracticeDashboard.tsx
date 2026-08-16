import React from 'react';
import { AgentCard } from '../AgentCard';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

// NOTE: Revenue / chairs occupied / avg wait time are live PMS + ops data —
// none of the 8 AI products built produce this. It needs a direct PMS API
// integration (Dentrix/Curve/OpenDental) or manual entry, which is separate
// work from the Appwrite wiring done for the other 7 cards. Left as mock
// data intentionally until that PMS integration exists. See
// APPWRITE_SCHEMA.md "Gaps" section.
export function PracticeDashboard() {
  return (
    <AgentCard title="Practice Dashboard" icon={BarChart3} accentColor="#10B981" isLive={false} badge="Preview data">
      <div className="flex flex-col h-full justify-between space-y-4">
        
        <div className="flex flex-col space-y-1 mt-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Today's Revenue</span>
          <div className="flex items-end space-x-3">
            <span className="text-3xl font-light text-gray-100 tracking-tight">$8,450</span>
            <div className="flex items-center text-emerald-400 text-xs font-medium pb-1">
              <TrendingUp size={12} className="mr-1" />
              <span>+14% vs ytd</span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/5"></div>

        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1">Chairs Occupied</span>
            <div className="flex items-end space-x-2">
              <span className="text-xl font-medium text-gray-200">5 / 6</span>
              <div className="flex items-center text-emerald-400 text-[10px] font-medium pb-0.5">
                <TrendingUp size={10} className="mr-0.5" />
                <span>+1</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center border-l border-white/5 pl-4">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1">Avg Wait Time</span>
            <div className="flex items-end space-x-2">
              <span className="text-xl font-medium text-gray-200">4m</span>
              <div className="flex items-center text-emerald-400 text-[10px] font-medium pb-0.5">
                <TrendingDown size={10} className="mr-0.5" />
                <span>-2m</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AgentCard>
  );
}
