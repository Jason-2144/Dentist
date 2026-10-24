import React, { useState } from 'react';
import {
  LayoutGrid,
  Calendar,
  Users,
  MessageCircle,
  CircleDollarSign,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  PhoneCall,
  RefreshCw,
  Zap,
  TrendingUp,
  ClipboardCheck,
  Star,
  Globe,
  ShieldCheck,
  Sparkles,
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
  ];

  const aiAgentsNav = [
    { id: 'agent-receptionist', label: 'AI Receptionist', icon: PhoneCall, dotColor: '#1B8C7A' },
    { id: 'agent-reengagement', label: 'Re-engagement', icon: RefreshCw, dotColor: '#3B6FE0' },
    { id: 'agent-noshow', label: 'No-Show Recovery', icon: Zap, dotColor: '#D97706' },
    { id: 'agent-analytics', label: 'Practice Performance', icon: TrendingUp, dotColor: '#8C1B5A' },
    { id: 'agent-treatment', label: 'Treatment Follow-up', icon: ClipboardCheck, dotColor: '#2F8F5B' },
    { id: 'agent-reputation', label: 'Reputation & Reviews', icon: Star, dotColor: '#F59E0B' },
    { id: 'agent-booking', label: 'Website 24/7 Booking', icon: Globe, dotColor: '#2563EB' },
    { id: 'agent-insurance', label: 'Insurance & Claims', icon: ShieldCheck, dotColor: '#059669' },
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
        isCollapsed ? 'w-[68px] p-2' : 'w-[215px] lg:w-[230px] p-3.5'
      } shrink-0 bg-[#16171A] text-[#9E9CA3] rounded-[26px] flex flex-col justify-between select-none shadow-xl border border-black/20 h-full transition-all duration-300 ease-in-out overflow-hidden`}
    >
      {/* Top Header (Pinned) */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} pb-3 pt-1 px-1 shrink-0 border-b border-white/5`}>
        {!isCollapsed && (
          <span className="text-[19px] font-bold text-white tracking-tight font-sans">
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
            className="md:hidden w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Scrollable Navigation Body */}
      <div
        className="flex-1 overflow-y-auto space-y-4 my-2 pr-0.5"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* General Section */}
        <div>
          {!isCollapsed && (
            <p className="text-[10px] font-bold text-[#5B5A60] tracking-wider px-2 mb-1.5 uppercase">
              General
            </p>
          )}
          <div className="space-y-0.5">
            {generalNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center px-0' : 'space-x-2.5 px-2.5'
                  } py-1.5 rounded-xl text-[12px] font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold shadow-2xs'
                      : 'text-[#8E8D93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon
                    size={16}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={isActive ? 'text-white' : 'text-[#8E8D93]'}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Autonomous Agents Section (All 8 Agents) */}
        <div>
          {!isCollapsed && (
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-bold text-[#6D6B73] tracking-wider uppercase flex items-center space-x-1.5">
                <Sparkles size={11} className="text-[#F094C6]" />
                <span>AI Agents (8)</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="8 Agents Live" />
            </div>
          )}
          <div className="space-y-0.5">
            {aiAgentsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center px-0' : 'justify-between px-2.5'
                  } py-1.5 rounded-xl text-[12px] font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold shadow-2xs'
                      : 'text-[#8E8D93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Icon
                      size={15}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className={isActive ? 'text-white' : 'text-[#8E8D93]'}
                    />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 ml-1.5"
                      style={{ backgroundColor: item.dotColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          {!isCollapsed && (
            <p className="text-[10px] font-bold text-[#5B5A60] tracking-wider px-2 mb-1.5 uppercase">
              Tools
            </p>
          )}
          <div className="space-y-0.5">
            {toolsNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center px-0' : 'space-x-2.5 px-2.5'
                  } py-1.5 rounded-xl text-[12px] font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold shadow-2xs'
                      : 'text-[#8E8D93] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon
                    size={16}
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

      {/* Log out at bottom (Pinned) */}
      <div className="pt-2 border-t border-white/5 shrink-0">
        <button
          onClick={() => setShowLogoutModal(true)}
          title={isCollapsed ? 'Log out' : undefined}
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center px-0' : 'space-x-3 px-2.5'
          } py-2 rounded-xl text-[12px] font-medium text-[#8E8D93] hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer`}
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
