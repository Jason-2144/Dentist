import React from 'react';
import { AgentCard } from '../AgentCard';
import { RunButton } from '../RunButton';
import { CalendarClock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useCollection } from '../../lib/useCollection';
import { COLLECTIONS, Query } from '../../lib/appwrite';

interface AppointmentRow {
  appointment_id: string;
  patient_name: string;
  reason: string;
  appointment_datetime: string;
  status: 'pending_confirmation' | 'confirmed' | 'cancelled';
}

export function NoShowRecovery() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const { data: todaysAppts, loading, error } = useCollection<AppointmentRow>(COLLECTIONS.APPOINTMENTS, [
    Query.greaterThanEqual('appointment_datetime', todayStart.toISOString()),
    Query.lessThanEqual('appointment_datetime', todayEnd.toISOString()),
  ]);

  const confirmed = todaysAppts.filter((a) => a.status === 'confirmed').length;
  const total = todaysAppts.length;
  const confirmationRate = total > 0 ? Math.round((confirmed / total) * 100) : 0;
  const atRisk = todaysAppts.filter((a) => a.status === 'pending_confirmation');

  const data = [
    { name: 'Confirmed', value: confirmationRate },
    { name: 'Pending', value: 100 - confirmationRate },
  ];
  const COLORS = ['#F59E0B', '#374151'];

  return (
    <AgentCard title="No-Show Recovery" icon={CalendarClock} accentColor="#F59E0B" isLive={true} error={error}>
      <div className="flex flex-col h-full justify-between">

        <div className="flex items-center mb-2">
          <div className="w-24 h-24 relative -ml-2 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} innerRadius={30} outerRadius={40} paddingAngle={0} dataKey="value" stroke="none">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold text-gray-100">{loading ? '—' : `${confirmationRate}%`}</span>
            </div>
          </div>
          <div className="ml-2">
            <p className="text-xs text-gray-400 mb-1">Confirmation Rate</p>
            <div className="inline-flex items-center px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>
              <span className="text-[10px] text-amber-400 font-medium">{atRisk.length} slots at risk</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-3 mb-4 text-xs space-y-1">
          {atRisk.length === 0 && !loading && <p className="text-gray-500">No slots at risk right now.</p>}
          {atRisk.slice(0, 2).map((a) => (
            <div key={a.appointment_id} className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">
                {new Date(a.appointment_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="text-gray-500">{a.reason}</span>
            </div>
          ))}
        </div>

        <RunButton job="reminders" label="Send Reminders Now" className="bg-amber-500 hover:bg-amber-400 text-amber-950" />
      </div>
    </AgentCard>
  );
}
