import React from 'react';
import { AgentCardProps } from '../types';
import { motion } from 'motion/react';

export function AgentCard({ title, icon: Icon, accentColor, isLive, children }: AgentCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-[#161B22] rounded-xl flex flex-col h-full border-l-[3px] border-y border-r border-y-white/5 border-r-white/5 overflow-hidden`}
      style={{ borderLeftColor: accentColor }}
    >
      {/* Subtle glow effect behind the card content */}
      <div 
        className="absolute -top-10 -left-10 w-24 h-24 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />
      
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 rounded-md bg-black/20" style={{ color: accentColor }}>
            <Icon size={18} />
          </div>
          <h2 className="text-gray-200 font-medium text-sm tracking-wide">{title}</h2>
        </div>
        {isLive && (
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Live</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: accentColor }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: accentColor }}></span>
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
