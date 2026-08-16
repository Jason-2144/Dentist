import React from 'react';
import { AgentCardProps } from '../types';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export function AgentCard({ title, icon: Icon, accentColor, isLive, error, badge, children }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-[#161B22] rounded-xl flex flex-col h-full border-l-[3px] border-y border-r border-y-white/5 border-r-white/5 overflow-hidden`}
      style={{ borderLeftColor: accentColor }}
    >
      {/* Subtle glow effect behind the card content */}
      <div
        className="absolute -top-10 -left-10 w-24 h-24 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 rounded-md bg-black/20" style={{ color: accentColor }}>
            <Icon size={18} />
          </div>
          <h2 className="text-gray-200 font-medium text-sm tracking-wide">{title}</h2>
          {badge && (
            <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>
        {isLive && !error && (
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Live</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: accentColor }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: accentColor }}></span>
            </span>
          </div>
        )}
        {error && (
          <div className="flex items-center space-x-1.5 text-rose-400" title={error}>
            <AlertTriangle size={12} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Data unavailable</span>
          </div>
        )}
      </div>

      {error && (
        <div className="mx-4 mt-3 flex items-start gap-2 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          <AlertTriangle size={13} className="text-rose-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-rose-300 leading-snug">
            Couldn't reach this data. Numbers below may be stale or blank — this isn't
            necessarily zero activity. ({error})
          </p>
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
