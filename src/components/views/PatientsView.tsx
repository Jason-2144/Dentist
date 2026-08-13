import React from 'react';
import { Search, Filter, MoreHorizontal, UserPlus } from 'lucide-react';

export function PatientsView() {
  const patients = [
    { name: 'Michael Chen', id: 'PT-8942', lastVisit: 'Oct 12, 2023', nextAppt: 'Nov 15, 2023', risk: 'Low', status: 'Active' },
    { name: 'Emma Wilson', id: 'PT-1023', lastVisit: 'Jan 05, 2023', nextAppt: 'None', risk: 'High (Lapsed)', status: 'Re-Engaging' },
    { name: 'David Lopez', id: 'PT-4421', lastVisit: 'Sep 28, 2023', nextAppt: 'Oct 30, 2023', risk: 'Medium', status: 'Active' },
    { name: 'Sarah Jenkins', id: 'PT-9932', lastVisit: 'Mar 14, 2022', nextAppt: 'None', risk: 'Churned', status: 'Inactive' },
    { name: 'James Smith', id: 'PT-5521', lastVisit: 'Oct 20, 2023', nextAppt: 'Nov 02, 2023', risk: 'Low', status: 'Active' },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 tracking-tight">Patient Directory</h2>
          <p className="text-sm text-gray-400 mt-1">Manage your 4,204 active patients.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <UserPlus size={16} />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="bg-[#161B22] border border-white/5 rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center bg-[#0D1117] rounded-lg px-3 py-1.5 border border-white/5 w-64">
            <Search size={14} className="text-gray-500" />
            <input type="text" placeholder="Search patients..." className="bg-transparent border-none outline-none text-sm text-gray-300 ml-2 w-full" />
          </div>
          <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-gray-200">
            <Filter size={14} />
            <span>Filter</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0D1117]/50 text-gray-400 text-xs uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-medium">Patient</th>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Last Visit</th>
                <th className="px-6 py-4 font-medium">Next Appt</th>
                <th className="px-6 py-4 font-medium">AI Churn Risk</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {patients.map((p, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-200">{p.name}</td>
                  <td className="px-6 py-4 text-gray-500">{p.id}</td>
                  <td className="px-6 py-4">{p.lastVisit}</td>
                  <td className="px-6 py-4">{p.nextAppt}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      p.risk.includes('Low') ? 'bg-emerald-500/10 text-emerald-400' : 
                      p.risk.includes('High') ? 'bg-rose-500/10 text-rose-400' :
                      p.risk.includes('Medium') ? 'bg-amber-500/10 text-amber-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {p.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4">{p.status}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-gray-500 hover:text-gray-300 transition-colors">
                      <MoreHorizontal size={16} />
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
