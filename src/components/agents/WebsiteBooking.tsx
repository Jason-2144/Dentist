import React from 'react';
import { AgentCard } from '../AgentCard';
import { Globe, Users, ArrowRight } from 'lucide-react';
import { useCollection } from '../../lib/useCollection';
import { COLLECTIONS, Query, startOfTodayISO } from '../../lib/appwrite';

interface AppointmentRow {
  appointment_id: string;
  source: string;
}

export function WebsiteBooking() {
  const { data, loading } = useCollection<AppointmentRow>(COLLECTIONS.APPOINTMENTS, [
    Query.equal('source', 'website'),
    Query.greaterThanEqual('$createdAt', startOfTodayISO()),
  ]);

  return (
    <AgentCard title="Website & Booking" icon={Globe} accentColor="#06B6D4" isLive={true}>
      <div className="flex flex-col h-full justify-between">

        <div className="flex items-center justify-between mb-4">
          <div>
            {/* Live visitor count needs a real analytics tool (Plausible/GA4) wired
                into Product 7's site — not covered by our 8 products. See
                APPWRITE_SCHEMA.md "Gaps" section. Left as a placeholder dash. */}
            <p className="text-3xl font-light text-gray-100 tracking-tight">—</p>
            <p className="text-xs text-cyan-400 font-medium">live visitors (needs analytics setup)</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping"></div>
            <Users size={18} className="text-cyan-500" />
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <div className="flex flex-col">
            <span className="text-xl font-medium text-gray-200">{loading ? '—' : data.length}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Bookings Made Today</span>
          </div>

          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium block mb-1.5">Top Traffic Source</span>
            <div className="inline-flex items-center px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-500 font-medium">
              Needs analytics integration
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-white/5 pt-3">
           <a href="#" className="text-cyan-400 text-xs font-medium flex items-center hover:text-cyan-300 transition-colors">
             View live heatmaps <ArrowRight size={12} className="ml-1" />
           </a>
        </div>

      </div>
    </AgentCard>
  );
}
