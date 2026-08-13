import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';

export function Topbar() {
  const date = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="h-16 border-b border-white/5 bg-[#0D1117]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-semibold text-gray-100 tracking-tight">Smile & Co. Dental Arts</h1>
        <p className="text-xs text-gray-400 font-medium mt-0.5">{date}</p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center bg-[#161B22] rounded-full px-4 py-1.5 border border-white/5">
          <Search size={14} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search patients, claims..." 
            className="bg-transparent border-none outline-none text-sm text-gray-300 ml-2 w-48 placeholder-gray-600"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-200 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-[#0D1117]"></span>
          </button>
          <div className="h-6 w-px bg-white/10"></div>
          <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <UserCircle size={24} />
            <span className="text-sm font-medium hidden sm:block">Dr. Sarah</span>
          </button>
        </div>
      </div>
    </header>
  );
}
