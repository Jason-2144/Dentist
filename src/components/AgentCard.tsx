import React from 'react';
import { AgentCardProps } from '../types';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export function AgentCard({ title, icon: Icon, accentColor, isLive, error, badge, note, children }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-[var(--surface)] rounded-2xl flex flex-col h-full border border-[var(--hairline)] shadow-[0_1px_2px_rgba(33,38,31,0.04)] overflow-hidden"
    >
      {/* A quiet band of color instead of a neon left rail — reads as "whose desk this is," not a status LED */}
      <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }} />

      <div className="px-4 pt-3.5 pb-3 flex items-center justify-between border-b border-[var(--hairline)]">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div
            className="p-1.5 rounded-lg shrink-0"
            style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}
          >
            <Icon size={16} />
          </div>
          <h2 className="text-[var(--ink)] font-semibold text-sm tracking-tight truncate">{title}</h2>
          {badge && (
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--ink-muted)] bg-[var(--surface-soft)] border border-[var(--hairline)] px-1.5 py-0.5 rounded shrink-0">
              {badge}
            </span>
          )}
        </div>
        {isLive && !error && (
          <div className="flex items-center space-x-1.5 shrink-0" title="Working in the background right now">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: accentColor }}></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: accentColor }}></span>
            </span>
            <span className="text-[10px] text-[var(--ink-muted)] font-medium">On it</span>
          </div>
        )}
        {error && (
          <div className="flex items-center space-x-1.5 text-rose-600 shrink-0" title={error}>
            <AlertTriangle size={12} />
            <span className="text-[10px] font-medium">Can't see this right now</span>
          </div>
        )}
      </div>

      {error && (
        <div className="mx-4 mt-3 flex items-start gap-2 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
          <AlertTriangle size={13} className="text-rose-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-rose-700 leading-snug">
            We couldn't reach this data just now. What's below may be out of date, not zero. ({error})
          </p>
        </div>
      )}

      <div className="px-4 pt-3 pb-4 flex-1 flex flex-col justify-between">
        {children}
      </div>

      {note && (
        <div className="px-4 pb-4 -mt-1">
          <p className="font-display italic text-[13px] leading-snug text-[var(--ink-muted)] border-t border-[var(--hairline)] pt-3">
            "{note}"
          </p>
        </div>
      )}
    </motion.div>
  );
}
