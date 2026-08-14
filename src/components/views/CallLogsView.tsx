import React from 'react';
import { Phone, Play, Pause, AlertCircle } from 'lucide-react';

export function CallLogsView() {
  const calls = [
    { time: '10:42 AM', caller: '(555) 123-4567', duration: '2m 14s', intent: 'Scheduling', status: 'Resolved', sentiment: 'Positive' },
    { time: '10:15 AM', caller: 'John Doe', duration: '1m 05s', intent: 'Billing Question', status: 'Resolved', sentiment: 'Neutral' },
    { time: '09:30 AM', caller: 'Sarah Jenkins', duration: '4m 30s', intent: 'Post-Op Concerns', status: 'Escalated', sentiment: 'Anxious' },
    { time: '08:45 AM', caller: '(555) 987-6543', duration: '0m 45s', intent: 'Directions', status: 'Resolved', sentiment: 'Neutral' },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 tracking-tight">AI Receptionist Logs</h2>
          <p className="text-sm text-gray-400 mt-1">Review calls handled by your AI agent today.</p>
        </div>
      </div>

      <div className="bg-[#161B22] border border-white/5 rounded-xl flex-1 overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0D1117]/50 text-gray-400 text-xs uppercase tracking-wider sticky top-0">
              <tr>
                <th className="px-6 py-4 font-medium">Time / Caller</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium">Primary Intent</th>
                <th className="px-6 py-4 font-medium">Sentiment</th>
                <th className="px-6 py-4 font-medium">AI Status</th>
                <th className="px-6 py-4 font-medium text-right">Recording</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {calls.map((c, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-200">{c.caller}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{c.time}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{c.duration}</td>
                  <td className="px-6 py-4">
                    <span className="bg-[#0D1117] border border-white/5 px-2.5 py-1 rounded-md text-gray-300 text-xs">
                      {c.intent}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`text-xs font-medium ${c.sentiment === 'Positive' ? 'text-emerald-400' : c.sentiment === 'Anxious' ? 'text-amber-400' : 'text-gray-400'}`}>
                        {c.sentiment}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${c.status === 'Resolved' ? 'bg-teal-500/10 text-teal-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                      <Play size={14} className="ml-0.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
