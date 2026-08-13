import React, { useState } from 'react';
import { AgentCard } from '../AgentCard';
import { PhoneCall } from 'lucide-react';

export function AIReceptionist() {
  const [isActive, setIsActive] = useState(true);

  return (
    <AgentCard title="AI Receptionist" icon={PhoneCall} accentColor="#14B8A6" isLive={isActive}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-light text-gray-100 tracking-tight">12</p>
              <p className="text-sm text-gray-400">/ 0 missed</p>
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
          {[
            { time: '10:42 AM', action: 'Rescheduled appointment', intent: 'Scheduling' },
            { time: '10:15 AM', action: 'Answered billing query', intent: 'Support' },
            { time: '09:30 AM', action: 'Booked new patient', intent: 'Conversion' }
          ].map((log, i) => (
            <div key={i} className="flex flex-col space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300 font-medium truncate pr-2">{log.action}</span>
                <span className="text-gray-500 shrink-0">{log.time}</span>
              </div>
              <span className="text-[10px] text-teal-500/70">{log.intent}</span>
            </div>
          ))}
        </div>
      </div>
    </AgentCard>
  );
}
