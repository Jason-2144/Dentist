import React, { useState } from 'react';
import { FileText, ShieldAlert, CheckCircle2, Clock, Check, AlertCircle } from 'lucide-react';

export function ClaimsView() {
  const [claims, setClaims] = useState([
    { id: 'CLM-9923', patient: 'Sarah Jenkins', provider: 'Bajaj Allianz', procedure: 'Root Canal', amount: '$1,500', status: 'Action Required', days: 32 },
    { id: 'CLM-9924', patient: 'David Lopez', provider: 'HDFC Ergo', procedure: 'Extraction', amount: '$550', status: 'Pending', days: 14 },
    { id: 'CLM-9925', patient: 'Emma Wilson', provider: 'Star Health', procedure: 'Crown', amount: '$1,200', status: 'Approved', days: 2 },
    { id: 'CLM-9926', patient: 'Tyler Young', provider: 'MetLife Dental', procedure: 'Zirconia Crown', amount: '$1,850', status: 'Pending', days: 24 },
  ]);

  const [activeActionMsg, setActiveActionMsg] = useState<string | null>(null);

  const handleResolveClaim = (id: string) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Approved', days: 0 } : c))
    );
    setActiveActionMsg(`Claim ${id} auto-resolved and verified.`);
    setTimeout(() => setActiveActionMsg(null), 3000);
  };

  const stats = [
    { label: 'Total Open Claims', value: '$5,100', count: `${claims.length} claims` },
    { label: 'Pending (30+ Days)', value: '$1,500', count: '1 claim', alert: true },
    { label: 'AI Auto-Filed Today', value: '12 claims', count: '100% accuracy' },
  ];

  return (
    <div className="h-full flex flex-col space-y-5 pb-16">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#16171A] tracking-tight">Insurance & Billing Recovery</h2>
          <p className="text-xs text-[#7A7369] mt-0.5">Automated aging claims monitor and patient balance recovery.</p>
        </div>
      </div>

      {activeActionMsg && (
        <div className="bg-[#16171A] text-white text-xs font-semibold py-2 px-4 rounded-xl flex items-center space-x-2 animate-in fade-in">
          <Check size={14} className="text-[#AACB77]" />
          <span>{activeActionMsg}</span>
        </div>
      )}

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`rounded-2xl p-4 border shadow-2xs ${
              s.alert
                ? 'bg-rose-50/70 border-rose-200'
                : 'bg-[#FAF5EE] border-[#E9DDD0]'
            }`}
          >
            <span className="text-[10.5px] font-bold text-[#7A7369] uppercase tracking-wider">{s.label}</span>
            <div className="mt-1.5 flex items-baseline space-x-2">
              <span className={`text-2xl font-extrabold ${s.alert ? 'text-rose-700' : 'text-[#16171A]'}`}>
                {s.value}
              </span>
              <span className="text-xs text-[#8C8479] font-medium">{s.count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Claims Table */}
      <div className="bg-[#FAF5EE] border border-[#E9DDD0] rounded-3xl flex-1 flex flex-col overflow-hidden shadow-xs">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#F3ECE2] text-[#7A7369] text-[10px] uppercase tracking-wider sticky top-0 font-bold">
              <tr>
                <th className="px-6 py-3.5">Claim ID</th>
                <th className="px-6 py-3.5">Patient / Provider</th>
                <th className="px-6 py-3.5">Procedure</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Status / Age</th>
                <th className="px-6 py-3.5 text-right">AI Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADFD1] text-[#16171A]">
              {claims.map((c) => (
                <tr key={c.id} className="hover:bg-white/60 transition-colors">
                  <td className="px-6 py-3.5 font-mono font-bold text-[#16171A]">{c.id}</td>
                  <td className="px-6 py-3.5">
                    <div className="font-bold">{c.patient}</div>
                    <div className="text-[10.5px] text-[#7A7369]">{c.provider}</div>
                  </td>
                  <td className="px-6 py-3.5 text-[#554F46] font-medium">{c.procedure}</td>
                  <td className="px-6 py-3.5 font-bold text-[#16171A]">{c.amount}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : c.status === 'Action Required'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {c.status}
                      </span>
                      <span className="text-[10px] text-[#7A7369]">({c.days} days)</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    {c.status === 'Approved' ? (
                      <span className="text-emerald-700 font-bold text-[10.5px] inline-flex items-center space-x-1">
                        <CheckCircle2 size={12} />
                        <span>Settled</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleResolveClaim(c.id)}
                        className="bg-[#16171A] hover:bg-black text-white px-3 py-1 rounded-full text-[10.5px] font-bold transition-all shadow-2xs cursor-pointer"
                      >
                        Re-check & Expedite
                      </button>
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
