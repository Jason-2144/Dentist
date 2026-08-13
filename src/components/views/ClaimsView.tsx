import React from 'react';
import { FileText, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

export function ClaimsView() {
  const stats = [
    { label: 'Total Open Claims', value: 'Rs 1.8L', count: '42 claims' },
    { label: 'Pending (30+ Days)', value: 'Rs 45K', count: '3 claims', alert: true },
    { label: 'AI Auto-Filed Today', value: '12 claims', count: '100% accuracy' },
  ];

  const claims = [
    { id: 'CLM-9923', patient: 'Sarah Jenkins', provider: 'Bajaj Allianz', procedure: 'Root Canal', amount: 'Rs 15,000', status: 'Action Required', days: 32 },
    { id: 'CLM-9924', patient: 'David Lopez', provider: 'HDFC Ergo', procedure: 'Extraction', amount: 'Rs 5,500', status: 'Pending', days: 14 },
    { id: 'CLM-9925', patient: 'Emma Wilson', provider: 'Star Health', procedure: 'Crown', amount: 'Rs 12,000', status: 'Approved', days: 2 },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 tracking-tight">Insurance Claims</h2>
          <p className="text-sm text-gray-400 mt-1">AI Insurance Agent is actively managing 42 claims.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`bg-[#161B22] border rounded-xl p-4 ${s.alert ? 'border-rose-500/30' : 'border-white/5'}`}>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{s.label}</span>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className={`text-2xl font-semibold ${s.alert ? 'text-rose-400' : 'text-gray-100'}`}>{s.value}</span>
              <span className="text-sm text-gray-500">{s.count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#161B22] border border-white/5 rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="overflow-auto flex-1">
           <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0D1117]/50 text-gray-400 text-xs uppercase tracking-wider sticky top-0">
              <tr>
                <th className="px-6 py-4 font-medium">Claim ID</th>
                <th className="px-6 py-4 font-medium">Patient / Provider</th>
                <th className="px-6 py-4 font-medium">Procedure</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status / Age</th>
                <th className="px-6 py-4 font-medium text-right">AI Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {claims.map((c, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-300">{c.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-200">{c.patient}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{c.provider}</div>
                  </td>
                  <td className="px-6 py-4">{c.procedure}</td>
                  <td className="px-6 py-4 font-medium">{c.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium w-fit ${
                        c.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 
                        c.status === 'Action Required' ? 'bg-rose-500/10 text-rose-400' : 
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                        {c.status}
                      </span>
                      <span className="text-xs text-gray-500">{c.days} days old</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {c.status === 'Action Required' ? (
                      <button className="text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 px-3 py-1.5 rounded-lg transition-colors">
                        Auto-Appeal
                      </button>
                    ) : (
                      <span className="text-xs text-gray-500">Monitoring</span>
                    )}
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
