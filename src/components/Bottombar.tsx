import React from 'react';
import { PauseCircle, CheckCircle2 } from 'lucide-react';

export function Bottombar() {
  const agents = [
    { name: 'Re-Engagement', color: '#3B82F6' },
    { name: 'Receptionist', color: '#14B8A6' },
    { name: 'No-Show', color: '#F59E0B' },
    { name: 'Dashboard', color: '#10B981' },
    { name: 'Follow-Up', color: '#6366F1' },
    { name: 'Reputation', color: '#A855F7' },
    { name: 'Website', color: '#06B6D4' },
    { name: 'Insurance', color: '#F43F5E' },
  ];

  return (
    <footer className="h-14 border-t border-white/5 bg-[#0D1117] flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center space-x-3">
        <CheckCircle2 size={16} className="text-emerald-500" />
        <span className="text-sm font-medium text-gray-300">All Agents Running</span>
        
        <div className="hidden md:flex items-center space-x-1.5 ml-6 border-l border-white/10 pl-6">
          {agents.map((agent, i) => (
            <div 
              key={i} 
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: agent.color }}
              title={agent.name}
            />
          ))}
        </div>
      </div>

      <button className="flex items-center space-x-2 text-xs font-medium bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 px-3 py-1.5 rounded-md transition-colors border border-rose-500/20">
        <PauseCircle size={14} />
        <span className="uppercase tracking-wider">Pause All</span>
      </button>
    </footer>
  );
}
