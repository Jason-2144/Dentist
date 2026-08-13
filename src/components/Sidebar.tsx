import React from 'react';
import { Activity, LayoutDashboard, Users, Calendar, MessageSquare, PhoneCall, FileText, Star, Settings } from 'lucide-react';

export function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Command Center', active: true },
    { icon: Users, label: 'Patients', active: false },
    { icon: Calendar, label: 'Schedule', active: false },
    { icon: MessageSquare, label: 'Messages', active: false },
    { icon: PhoneCall, label: 'Call Logs', active: false },
    { icon: FileText, label: 'Claims', active: false },
    { icon: Star, label: 'Reputation', active: false },
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
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center px-3 py-2.5 rounded-lg transition-colors group ${
              item.active 
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
