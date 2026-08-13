import React from 'react';
import { Activity, LayoutDashboard, Users, Calendar, MessageSquare, PhoneCall, FileText, Star, Settings } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Command Center' },
    { id: 'patients', icon: Users, label: 'Patients' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'calls', icon: PhoneCall, label: 'Call Logs' },
    { id: 'claims', icon: FileText, label: 'Claims' },
    { id: 'reputation', icon: Star, label: 'Reputation' },
  ];

  return (
    <aside className="w-16 lg:w-64 bg-[#0D1117] border-r border-white/5 h-full flex flex-col transition-all duration-300 z-20 shrink-0">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shrink-0">
          <Activity size={18} className="text-white" />
        </div>
        <span className="ml-3 font-semibold text-gray-100 hidden lg:block tracking-tight text-lg">Practice OS</span>
      </div>
      
      <nav className="flex-1 py-6 flex flex-col space-y-2 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex items-center px-3 py-2.5 rounded-lg transition-colors group ${
              activeView === item.id 
                ? 'bg-blue-500/10 text-blue-400' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            <item.icon size={20} className="shrink-0" />
            <span className="ml-3 font-medium text-sm hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="flex items-center px-2 py-2.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/5 w-full transition-colors">
          <Settings size={20} className="shrink-0" />
          <span className="ml-3 font-medium text-sm hidden lg:block">Settings</span>
        </button>
      </div>
    </aside>
  );
}
