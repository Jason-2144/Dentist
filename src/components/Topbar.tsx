import React, { useEffect, useState } from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';
import { PRACTICE_NAME, STAFF_NAME } from '../lib/config';

function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function Topbar() {
  // Refreshes at local midnight instead of freezing on whatever date the tab
  // happened to load — this dashboard is meant to stay open on a front-desk
  // screen for days at a time.
  const [date, setDate] = useState(() => formatDate(new Date()));

  useEffect(() => {
    const msUntilMidnight = new Date().setHours(24, 0, 0, 0) - Date.now();
    const timeout = setTimeout(() => setDate(formatDate(new Date())), msUntilMidnight + 1000);
    return () => clearTimeout(timeout);
  }, [date]);

  return (
    <header className="h-16 border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-semibold text-gray-100 tracking-tight">{PRACTICE_NAME}</h1>
        <p className="text-xs text-gray-400 font-medium mt-0.5">{date}</p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center bg-[#161B22] rounded-full px-4 py-1.5 border border-white/5">
          <Search size={14} className="text-gray-500" aria-hidden="true" />
          <label htmlFor="dashboard-search" className="sr-only">Search patients, claims</label>
          <input
            id="dashboard-search"
            type="text"
            placeholder="Search patients, claims..."
            className="bg-transparent border-none outline-none text-sm text-gray-300 ml-2 w-48 placeholder-gray-600"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="relative p-2 text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Notifications"
            title="Notifications (coming soon)"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-[#0D1117]"></span>
          </button>
          <div className="h-6 w-px bg-white/10"></div>
          <button
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Account menu"
            title="Account settings (coming soon)"
          >
            <UserCircle size={24} aria-hidden="true" />
            <span className="text-sm font-medium hidden sm:block">{STAFF_NAME}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
