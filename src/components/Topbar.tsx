import React, { useState } from 'react';
import { Search, User, Bell, Settings, X, Check, ShieldCheck, Clock, Menu } from 'lucide-react';

interface TopbarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filter: string) => void;
  onOpenSettings?: () => void;
  onOpenMobileMenu?: () => void;
}

export function Topbar({ onSearch, onFilterChange, onOpenSettings, onOpenMobileMenu }: TopbarProps) {
  const [activeFilter, setActiveFilter] = useState('Patients');
  const [searchVal, setSearchVal] = useState('Lis');
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const filters = ['Patients', 'Education', 'Prescriptions', 'Test results'];

  const notifications = [
    { id: 1, title: 'New Web Booking', text: 'Tyler Young requested a routine consultation for Friday 09:45 AM.', time: '10m ago', unread: true },
    { id: 2, title: 'AI Receptionist Alert', text: 'Escalated incoming patient call from Sarah Jenkins (Post-Op query).', time: '45m ago', unread: true },
    { id: 3, title: 'Claim Payment Received', text: 'HDFC Ergo settled claim #CLM-9924 ($5,500).', time: '2h ago', unread: false },
  ];

  const handleFilterClick = (f: string) => {
    setActiveFilter(f);
    onFilterChange?.(f);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <>
      <header className="w-full flex items-center justify-between pt-3 pb-2 px-3 sm:px-6 shrink-0 gap-3 relative">
        <div className="flex items-center space-x-2.5 flex-1 max-w-[600px]">
          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden w-9 h-9 rounded-full bg-[#16171A] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
            aria-label="Open menu"
          >
            <Menu size={16} />
          </button>

          {/* Pill Search Bar with Inline Filters */}
          <div className="flex-1">
            <div className="flex items-center bg-[#F6EFE5] border border-[#EBE1D4] rounded-full px-3 sm:px-3.5 py-1.5 shadow-2xs focus-within:ring-2 focus-within:ring-[#F094C6]/30">
              {/* Pink search circle icon */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F094C6]/20 text-[#E26AA8] flex items-center justify-center shrink-0 mr-2">
                <Search size={13} strokeWidth={2.5} />
              </div>

              <div className="flex-1 flex items-center min-w-0">
                <input
                  type="text"
                  value={searchVal}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-xs sm:text-[13px] text-[#16171A] font-medium w-full placeholder:text-[#A1988C]"
                />

                {/* Scope Filter Tags (hidden on small phones, visible on tablets/desktops) */}
                <div className="hidden sm:flex items-center space-x-1 shrink-0 ml-auto">
                  <span className="text-[11px] font-semibold text-[#8B8479] mr-1">In:</span>
                  {filters.map((f) => {
                    const isSelected = activeFilter === f;
                    return (
                      <button
                        key={f}
                        onClick={() => handleFilterClick(f)}
                        className={`text-[10.5px] font-medium px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#16171A] text-white shadow-2xs font-semibold'
                            : 'border border-[#DECDBE] text-[#615A4F] hover:border-[#16171A]'
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Circular Dark Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#16171A] text-white flex items-center justify-center hover:bg-black transition-transform hover:scale-105 shadow-2xs cursor-pointer"
            title="Dr. Samskruti's Profile"
          >
            <User size={14} strokeWidth={2} />
          </button>

          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#16171A] text-white flex items-center justify-center hover:bg-black transition-transform hover:scale-105 shadow-2xs relative cursor-pointer"
            title="Notifications"
          >
            <Bell size={14} strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F094C6] rounded-full ring-2 ring-[#16171A]" />
          </button>

          <button
            onClick={onOpenSettings}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#16171A] text-white flex items-center justify-center hover:bg-black transition-transform hover:scale-105 shadow-2xs cursor-pointer"
            title="Settings"
          >
            <Settings size={14} strokeWidth={2} />
          </button>
        </div>

        {/* Notifications Dropdown Panel */}
        {showNotifications && (
          <div className="absolute right-2 sm:right-16 top-14 w-72 sm:w-80 max-w-[calc(100vw-24px)] bg-[#FAF6EF] rounded-2xl border border-[#E9DDD0] shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#EADFD1]">
              <span className="text-xs font-bold text-[#16171A]">Notifications (3)</span>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-[#8C8479] hover:text-black cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
            <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="p-2.5 rounded-xl bg-white/70 border border-[#ECE0D2] hover:bg-white transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#16171A]">{n.title}</span>
                    <span className="text-[9px] text-[#8C8479]">{n.time}</span>
                  </div>
                  <p className="text-[10.5px] text-[#696155] mt-1 leading-snug">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Card Modal */}
        {showProfile && (
          <div className="absolute right-2 sm:right-6 top-14 w-72 max-w-[calc(100vw-24px)] bg-[#FAF6EF] rounded-2xl border border-[#E9DDD0] shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#EADFD1]">
              <span className="text-xs font-bold text-[#16171A]">Doctor Profile</span>
              <button onClick={() => setShowProfile(false)} className="text-[#8C8479] hover:text-black cursor-pointer">
                <X size={14} />
              </button>
            </div>
            <div className="text-center py-3">
              <div className="w-14 h-14 rounded-full bg-[#16171A] text-white flex items-center justify-center mx-auto text-lg font-bold">
                DS
              </div>
              <h4 className="text-sm font-bold text-[#16171A] mt-2">Dr. Samskruti</h4>
              <p className="text-[11px] text-[#7A7369]">Lead Dental Surgeon & Orthodontist</p>
              <div className="inline-flex items-center space-x-1 bg-[#AACB77]/25 text-[#3D5B1A] text-[9.5px] font-bold px-2 py-0.5 rounded-full mt-2">
                <ShieldCheck size={11} />
                <span>Active Practitioner · License #DDS-8921</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#EADFD1] space-y-1 text-xs">
              <div className="flex justify-between py-1 text-[#696155]">
                <span>Today's Shift</span>
                <span className="font-semibold text-[#16171A]">07:00 AM – 06:00 PM</span>
              </div>
              <div className="flex justify-between py-1 text-[#696155]">
                <span>Patients Booked</span>
                <span className="font-semibold text-[#16171A]">45 patients</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
