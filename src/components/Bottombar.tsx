import React, { useState } from 'react';
import { PauseCircle, PlayCircle, CheckCircle2 } from 'lucide-react';

export function Bottombar() {
  const [isPaused, setIsPaused] = useState(false);

  const agents = [
    { name: 'Re-Engagement Agent', color: '#3B6FE0' },
    { name: 'AI Receptionist', color: '#1B8C7A' },
    { name: 'No-Show Recovery', color: '#D97B1F' },
    { name: 'Practice Dashboard', color: '#2F8F5B' },
    { name: 'Treatment Follow-Up', color: '#6B5CD6' },
    { name: 'Reputation Agent', color: '#B0559A' },
    { name: 'Website Booking', color: '#1D8FA6' },
    { name: 'Insurance Recovery', color: '#D2495A' },
  ];

  return (
    <footer className="h-12 border-t border-[#E8DDCE] bg-[#FAF6EE] flex items-center justify-between px-6 shrink-0 z-10 text-xs">
      <div className="flex items-center space-x-3">
        <CheckCircle2 size={15} className="text-[#2F6F63]" />
        <span className="font-semibold text-[#181A1D]">
          {isPaused ? 'AI Automations are paused' : 'AI Team active — all 8 agents on schedule'}
        </span>

        <div className="hidden md:flex items-center space-x-2 ml-4 border-l border-[#E2D6C7] pl-4" role="list" aria-label="Agent status">
          {agents.map((agent, i) => (
            <div
              key={i}
              role="listitem"
              aria-label={`${agent.name}: active`}
              className={`w-2.5 h-2.5 rounded-full transition-transform hover:scale-125 ${isPaused ? 'opacity-40' : ''}`}
              style={{ backgroundColor: agent.color }}
              title={agent.name}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => setIsPaused(!isPaused)}
        className={`flex items-center space-x-1.5 text-[11px] font-bold px-3 py-1 rounded-full transition-all border ${
          isPaused
            ? 'bg-[#181A1D] text-white border-[#181A1D] shadow-xs'
            : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200'
        }`}
      >
        {isPaused ? <PlayCircle size={13} /> : <PauseCircle size={13} />}
        <span>{isPaused ? 'Resume agents' : 'Pause everything'}</span>
      </button>
    </footer>
  );
}
