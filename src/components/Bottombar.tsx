import React from 'react';
import { PauseCircle, CheckCircle2 } from 'lucide-react';

export function Bottombar() {
  const agents = [
    { name: 'Re-Engagement', color: '#3B6FE0' },
    { name: 'Receptionist', color: '#1B8C7A' },
    { name: 'No-Show', color: '#D97B1F' },
    { name: 'Dashboard', color: '#2F8F5B' },
    { name: 'Follow-Up', color: '#6B5CD6' },
    { name: 'Reviews', color: '#B0559A' },
    { name: 'Website', color: '#1D8FA6' },
    { name: 'Insurance', color: '#D2495A' },
  ];

  return (
    <footer className="h-14 border-t border-[var(--hairline)] bg-[var(--surface)] flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center space-x-3">
        <CheckCircle2 size={16} className="text-[var(--brand)]" />
        <span className="text-sm font-medium text-[var(--ink)]">Your team is all caught up</span>

        <div className="hidden md:flex items-center space-x-1.5 ml-6 border-l border-[var(--hairline)] pl-6" role="list" aria-label="Agent status">
          {agents.map((agent, i) => (
            <div
              key={i}
              role="listitem"
              aria-label={`${agent.name}: working`}
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: agent.color }}
              title={agent.name}
            />
          ))}
        </div>
      </div>

      <button
        className="flex items-center space-x-2 text-xs font-medium bg-rose-50 text-rose-600 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors border border-rose-200"
        title="Not yet wired to the automation service — pauses nothing yet"
      >
        <PauseCircle size={14} aria-hidden="true" />
        <span>Pause everything</span>
      </button>
    </footer>
  );
}
