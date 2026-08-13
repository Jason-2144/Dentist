import React from 'react';
import { AgentCard } from '../AgentCard';
import { CalendarClock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function NoShowRecovery() {
  const data = [
    { name: 'Confirmed', value: 82 },
    { name: 'Pending', value: 18 },
  ];
  const COLORS = ['#F59E0B', '#374151']; // Amber and dark gray

  return (
    <AgentCard title="No-Show Recovery" icon={CalendarClock} accentColor="#F59E0B" isLive={true}>
      <div className="flex flex-col h-full justify-between">
        
        <div className="flex items-center mb-2">
          <div className="w-24 h-24 relative -ml-2 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={30}
                  outerRadius={40}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold text-gray-100">82%</span>
            </div>
          </div>
          <div className="ml-2">
            <p className="text-xs text-gray-400 mb-1">Confirmation Rate</p>
            <div className="inline-flex items-center px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>
              <span className="text-[10px] text-amber-400 font-medium">2 slots at risk</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-3 mb-4 text-xs">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-300 font-medium">1:00 PM</span>
            <span className="text-gray-500">Hygiene (45m)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">3:30 PM</span>
            <span className="text-gray-500">Crown Prep (90m)</span>
          </div>
        </div>

        <button className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 text-xs font-semibold rounded-lg transition-colors mt-auto">
          Fill from Waitlist
        </button>
      </div>
    </AgentCard>
  );
}
