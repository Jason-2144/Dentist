import React, { useState } from 'react';
import { Search, User, Bell, Settings } from 'lucide-react';

interface TopbarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filter: string) => void;
}

export function Topbar({ onSearch, onFilterChange }: TopbarProps) {
  const [activeFilter, setActiveFilter] = useState('Patients');
  const [searchVal, setSearchVal] = useState('Lis');

  const filters = ['Patients', 'Education', 'Prescriptions', 'Test results'];

  const handleFilterClick = (f: string) => {
    setActiveFilter(f);
    onFilterChange?.(f);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="w-full flex items-center justify-between pt-3 pb-2 px-6 shrink-0 gap-4">
      {/* Pill Search Bar with Inline Filters */}
      <div className="flex-1 max-w-[540px]">
        <div className="flex items-center bg-[#F6EFE5] border border-[#EBE1D4] rounded-full px-3.5 py-1.5 shadow-2xs">
          {/* Pink search circle icon */}
          <div className="w-6 h-6 rounded-full bg-[#F094C6]/20 text-[#E26AA8] flex items-center justify-center shrink-0 mr-2.5">
            <Search size={13} strokeWidth={2.5} />
          </div>

          <div className="flex-1 flex items-center min-w-0">
            <input
              type="text"
              value={searchVal}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-[13px] text-[#16171A] font-medium w-24 shrink-0 placeholder:text-[#A1988C]"
            />

            {/* Scope Filter Tags */}
            <div className="flex items-center space-x-1 shrink-0 ml-auto">
              <span className="text-[11px] font-semibold text-[#8B8479] mr-1">In:</span>
              {filters.map((f) => {
                const isSelected = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => handleFilterClick(f)}
                    className={`text-[10.5px] font-medium px-2 py-0.5 rounded-full transition-all ${
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

      {/* Right Circular Dark Buttons */}
      <div className="flex items-center space-x-2 shrink-0">
        <button
          className="w-9 h-9 rounded-full bg-[#16171A] text-white flex items-center justify-center hover:bg-black transition-colors shadow-2xs"
          title="Dr. Samskruti's Profile"
        >
          <User size={15} strokeWidth={2} />
        </button>
        <button
          className="w-9 h-9 rounded-full bg-[#16171A] text-white flex items-center justify-center hover:bg-black transition-colors shadow-2xs relative"
          title="Notifications"
        >
          <Bell size={15} strokeWidth={2} />
        </button>
        <button
          className="w-9 h-9 rounded-full bg-[#16171A] text-white flex items-center justify-center hover:bg-black transition-colors shadow-2xs"
          title="Settings"
        >
          <Settings size={15} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
