import React, { useState } from 'react';
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
  ChevronRight,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ activeView, setActiveView, mobileOpen, onCloseMobile }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  const handleNavClick = (id: string) => {
    setActiveView(id);
    onCloseMobile?.();
  };

  const sidebarContent = (
    <aside
      className={`${
        isCollapsed ? 'w-[68px] p-2.5' : 'w-[200px] lg:w-[215px] p-4'
      } shrink-0 bg-[#16171A] text-[#9E9CA3] rounded-[26px] flex flex-col justify-between select-none shadow-xl border border-black/20 h-full transition-all duration-300 ease-in-out`}
    >
      <div>
        {/* Logo Header */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} pb-6 pt-1 px-1`}>
          {!isCollapsed && (
            <span className="text-[20px] font-bold text-white tracking-tight font-sans">
              DentistOS
            </span>
          )}

          <div className="flex items-center space-x-1.5">
            {/* Desktop collapse toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex w-5 h-5 rounded-full bg-[#F094C6] text-white items-center justify-center hover:bg-[#E26AA8] transition-transform hover:scale-110 shadow-xs cursor-pointer"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight size={13} strokeWidth={2.8} />
              ) : (
                <ChevronLeft size={13} strokeWidth={2.8} />
              )}
            </button>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="md:hidden w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* General Section */}
        <div>
          {!isCollapsed && (
            <p className="text-[11px] font-semibold text-[#5B5A60] tracking-wider px-2.5 mb-2 uppercase">
              General
            </p>
          )}
          <div className="space-y-1">
            {generalNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center px-0' : 'space-x-3 px-2.5'
                  } py-2 rounded-xl text-[12.5px] font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-[#8E8D93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon
                    size={17}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={isActive ? 'text-white' : 'text-[#8E8D93]'}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-5">
          {!isCollapsed && (
            <p className="text-[11px] font-semibold text-[#5B5A60] tracking-wider px-2.5 mb-2 uppercase">
              Tools
            </p>
          )}
          <div className="space-y-1">
            {toolsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center px-0' : 'space-x-3 px-2.5'
                  } py-2 rounded-xl text-[12.5px] font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-[#8E8D93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon
                    size={17}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={isActive ? 'text-white' : 'text-[#8E8D93]'}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Log out at bottom */}
      <div className="pt-2">
        <button
          onClick={() => setShowLogoutModal(true)}
          title={isCollapsed ? 'Log out' : undefined}
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center px-0' : 'space-x-3 px-2.5'
          } py-2 rounded-xl text-[12.5px] font-medium text-[#8E8D93] hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer`}
        >
          <LogOut size={16} strokeWidth={1.8} />
          {!isCollapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop / Tablet Sidebar (in-flow) */}
      <div className="hidden md:block h-[calc(100vh-20px)] my-2.5 ml-2.5 shrink-0 z-20">
        {sidebarContent}
      </div>

      {/* Mobile Drawer (off-canvas) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />
          {/* Drawer content */}
          <div className="relative z-10 w-[240px] h-full p-2.5 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[#FAF6EF] rounded-3xl p-6 max-w-sm w-full border border-[#E9DDD0] shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <LogOut size={22} />
            </div>
            <h3 className="text-base font-bold text-[#16171A]">End Clinical Session?</h3>
            <p className="text-xs text-[#7A7369] mt-1.5 leading-relaxed">
              Dr. Samskruti's active shift will be locked. Your autonomous agents will continue operating in the background.
            </p>
            <div className="flex space-x-2 mt-5">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-[#EBE2D7] text-[#544F46] hover:bg-[#E0D5C7]"
              >
                Stay Logged In
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  setActiveView('dashboard');
                }}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-[#16171A] text-white hover:bg-black"
              >
                Lock Session
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
