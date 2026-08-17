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

function greeting(d: Date) {
  const h = d.getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function Topbar() {
  // Refreshes at local midnight instead of freezing on whatever date the tab
  // happened to load — this dashboard is meant to stay open on a front-desk
  // screen for days at a time.
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const msUntilMidnight = new Date().setHours(24, 0, 0, 0) - Date.now();
    const timeout = setTimeout(() => setNow(new Date()), msUntilMidnight + 1000);
    return () => clearTimeout(timeout);
  }, [now]);

  const firstName = STAFF_NAME.split(' ')[0];

  return (
    <header className="h-16 border-b border-[var(--hairline)] bg-[var(--surface)]/90 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h1 className="font-display text-xl font-semibold text-[var(--ink)] tracking-tight">
          {greeting(now)}, {firstName} 👋
        </h1>
        <p className="text-xs text-[var(--ink-muted)] font-medium mt-0.5">
          {PRACTICE_NAME} · {formatDate(now)}
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center bg-[var(--surface-soft)] rounded-full px-4 py-1.5 border border-[var(--hairline)]">
          <Search size={14} className="text-[var(--ink-muted)]" aria-hidden="true" />
          <label htmlFor="dashboard-search" className="sr-only">Search patients, claims</label>
          <input
            id="dashboard-search"
            type="text"
            placeholder="Find a patient, claim…"
            className="bg-transparent border-none outline-none text-sm text-[var(--ink)] ml-2 w-48 placeholder-[var(--ink-muted)]"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="relative p-2 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            aria-label="Notifications"
            title="Notifications (coming soon)"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent)] rounded-full border border-[var(--surface)]"></span>
          </button>
          <div className="h-6 w-px bg-[var(--hairline)]"></div>
          <button
            className="flex items-center space-x-2 text-[var(--ink)] hover:text-[var(--brand)] transition-colors"
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
