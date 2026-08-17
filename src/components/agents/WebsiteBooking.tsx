import React from 'react';
import { AgentCard } from '../AgentCard';
import { Globe, Users, ArrowRight } from 'lucide-react';
import { useCollection } from '../../lib/useCollection';
import { COLLECTIONS, Query, startOfTodayISO } from '../../lib/appwrite';

interface AppointmentRow {
  appointment_id: string;
  source: string;
}

const ACCENT = '#1D8FA6';

export function WebsiteBooking() {
  const { data, loading, error } = useCollection<AppointmentRow>(COLLECTIONS.APPOINTMENTS, [
    Query.equal('source', 'website'),
    Query.greaterThanEqual('$createdAt', startOfTodayISO()),
  ]);

  const note = loading
    ? undefined
    : data.length === 0
    ? "Nobody's booked through the website yet today — the door's open when they are."
    : `${data.length} patient${data.length === 1 ? '' : 's'} found and booked you straight from the website today.`;

  return (
    <AgentCard title="Website & Booking" icon={Globe} accentColor={ACCENT} isLive={true} error={error} note={note}>
      <div className="flex flex-col h-full justify-between">

        <div className="flex items-center justify-between mb-4">
          <div>
            {/* Live visitor count needs a real analytics tool (Plausible/GA4) wired
                into Product 7's site — not covered by our 8 products. See
                APPWRITE_SCHEMA.md "Gaps" section. Left as a placeholder dash. */}
            <p className="text-3xl font-light text-[var(--ink)] tracking-tight">—</p>
            <p className="text-xs font-medium" style={{ color: ACCENT }}>live visitors (needs analytics setup)</p>
          </div>
          <div className="h-10 w-10 rounded-full flex items-center justify-center relative" style={{ backgroundColor: `${ACCENT}1A` }}>
            <div className="absolute inset-0 rounded-full border animate-ping" style={{ borderColor: `${ACCENT}55` }}></div>
            <Users size={18} style={{ color: ACCENT }} />
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <div className="flex flex-col">
            <span className="text-xl font-medium text-[var(--ink)]">{loading ? '—' : data.length}</span>
            <span className="text-[10px] text-[var(--ink-muted)] uppercase tracking-wider font-medium">Bookings Made Today</span>
          </div>

          <div>
            <span className="text-[10px] text-[var(--ink-muted)] uppercase tracking-wider font-medium block mb-1.5">Top Traffic Source</span>
            <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[var(--surface-soft)] border border-[var(--hairline)] text-xs text-[var(--ink-muted)] font-medium">
              Needs analytics integration
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-[var(--hairline)] pt-3">
           <span className="text-[var(--ink-muted)] text-xs font-medium flex items-center cursor-not-allowed" title="Requires an analytics integration (Plausible/GA4) — not yet connected">
             Heatmaps unavailable <ArrowRight size={12} className="ml-1" />
           </span>
        </div>

      </div>
    </AgentCard>
  );
}
