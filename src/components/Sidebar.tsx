import React from 'react';
import { HeartPulse, LayoutDashboard, Users, Calendar, MessageSquare, PhoneCall, FileText, Star, Settings } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Today' },
    { id: 'patients', icon: Users, label: 'Patients' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'calls', icon: PhoneCall, label: 'Call Logs' },
    { id: 'claims', icon: FileText, label: 'Claims' },
    { id: 'reputation', icon: Star, label: 'Reviews' },
  ];

  return (
    <aside className="w-16 lg:w-64 bg-[var(--surface)] border-r border-[var(--hairline)] h-full flex flex-col transition-all duration-300 z-20 shrink-0">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[var(--hairline)]">
        <div className="w-8 h-8 rounded-lg bg-[var(--brand)] flex items-center justify-center shrink-0">
          <HeartPulse size={17} className="text-white" />
        </div>
        <span className="ml-3 font-display font-semibold text-[var(--ink)] hidden lg:block tracking-tight text-lg">
          Front Desk
        </span>
      </div>

      <nav className="flex-1 py-6 flex flex-col space-y-1 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex items-center px-3 py-2.5 rounded-xl transition-colors group ${
              activeView === item.id
                ? 'bg-[var(--brand)]/10 text-[var(--brand)]'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)]'
            }`}
          >
            <item.icon size={19} className="shrink-0" />
            <span className="ml-3 font-medium text-sm hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--hairline)]">
        <button className="flex items-center px-2 py-2.5 rounded-xl text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-soft)] w-full transition-colors">
          <Settings size={19} className="shrink-0" />
          <span className="ml-3 font-medium text-sm hidden lg:block">Settings</span>
        </button>
      </div>
    </aside>
  );
}
