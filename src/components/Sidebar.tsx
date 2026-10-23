import React from 'react';
import {
  LayoutGrid,
  Calendar,
  Users,
  PieChart,
  Stethoscope,
  Bookmark,
  MessageCircle,
  CircleDollarSign,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const generalNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'statistics', label: 'Statistics & reports', icon: PieChart },
    { id: 'education', label: 'Education', icon: Stethoscope },
    { id: 'articles', label: 'My articles', icon: Bookmark },
  ];

  const toolsNav = [
    { id: 'calls', label: 'Chats & calls', icon: MessageCircle },
    { id: 'claims', label: 'Billing', icon: CircleDollarSign },
    { id: 'documents', label: 'Documents base', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-[200px] lg:w-[215px] shrink-0 bg-[#16171A] text-[#9E9CA3] rounded-[26px] p-4 flex flex-col justify-between select-none shadow-lg border border-black/20 m-3 h-[calc(100vh-42px)]">
      <div>
        {/* Logo Header */}
        <div className="flex items-center justify-between pb-6 pt-1 px-1">
          <span className="text-[20px] font-bold text-white tracking-tight font-sans">
            DentistOS
          </span>
          <button
            className="w-[18px] h-[18px] rounded-full bg-[#F094C6] text-white flex items-center justify-center hover:bg-[#E26AA8] transition-colors shadow-xs"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft size={12} strokeWidth={2.8} />
          </button>
        </div>

        {/* General Section */}
        <div>
          <p className="text-[11px] font-semibold text-[#5B5A60] tracking-wider px-2.5 mb-2 uppercase">
            General
          </p>
          <div className="space-y-0.5">
            {generalNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-2.5 py-2 rounded-xl text-[12.5px] font-medium transition-all ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#8E8D93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon
                    size={16}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={isActive ? 'text-white' : 'text-[#8E8D93]'}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-6">
          <p className="text-[11px] font-semibold text-[#5B5A60] tracking-wider px-2.5 mb-2 uppercase">
            Tools
          </p>
          <div className="space-y-0.5">
            {toolsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-2.5 py-2 rounded-xl text-[12.5px] font-medium transition-all ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#8E8D93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon
                    size={16}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={isActive ? 'text-white' : 'text-[#8E8D93]'}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Log out at bottom */}
      <div className="pt-2">
        <button
          onClick={() => setActiveView('dashboard')}
          className="w-full flex items-center space-x-3 px-2.5 py-2 rounded-xl text-[12.5px] font-medium text-[#8E8D93] hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut size={16} strokeWidth={1.8} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
