import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, UserPlus, X, Check, ShieldAlert } from 'lucide-react';

interface PatientsViewProps {
  searchFilter?: string;
}

export function PatientsView({ searchFilter }: PatientsViewProps) {
  const [patients, setPatients] = useState([
    { name: 'Michael Chen', id: 'PT-8942', phone: '(713) 555-0192', lastVisit: 'Oct 12, 2023', nextAppt: 'Nov 15, 2023', risk: 'Low', status: 'Active' },
    { name: 'Emma Wilson', id: 'PT-1023', phone: '(713) 555-0144', lastVisit: 'Jan 05, 2023', nextAppt: 'None', risk: 'High (Lapsed)', status: 'Re-Engaging' },
    { name: 'David Lopez', id: 'PT-4421', phone: '(713) 555-0188', lastVisit: 'Sep 28, 2023', nextAppt: 'Oct 30, 2023', risk: 'Medium', status: 'Active' },
    { name: 'Sarah Jenkins', id: 'PT-9932', phone: '(713) 555-0112', lastVisit: 'Mar 14, 2022', nextAppt: 'None', risk: 'Churned', status: 'Inactive' },
    { name: 'James Smith', id: 'PT-5521', phone: '(713) 555-0177', lastVisit: 'Oct 20, 2023', nextAppt: 'Nov 02, 2023', risk: 'Low', status: 'Active' },
    { name: 'Taigo Wilkinson', id: 'PT-1092', phone: '(713) 555-0105', lastVisit: 'Today', nextAppt: 'Today 09:15 AM', risk: 'Low', status: 'Active' },
  ]);

  const [searchVal, setSearchVal] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  // New patient form
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');

  const activeSearch = searchFilter || searchVal;

  const filteredPatients = patients.filter((p) => {
    if (selectedRiskFilter !== 'All' && !p.risk.includes(selectedRiskFilter)) {
      return false;
    }
    if (activeSearch.trim().length > 0) {
      const q = activeSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.phone.includes(q);
    }
    return true;
  });

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim()) return;

    setPatients((prev) => [
      {
        name: newPatientName,
        id: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
        phone: newPatientPhone || '(713) 555-0199',
        lastVisit: 'New Patient',
        nextAppt: 'Pending Scheduling',
        risk: 'Low',
        status: 'Active',
      },
      ...prev,
    ]);

    setNewPatientName('');
    setNewPatientPhone('');
    setIsAddPatientOpen(false);
  };

  return (
    <div className="h-full flex flex-col space-y-5 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#16171A] tracking-tight">Patient Directory</h2>
          <p className="text-xs text-[#7A7369] mt-0.5">Manage active patient database and recall tracking.</p>
        </div>
        <button
          onClick={() => setIsAddPatientOpen(true)}
          className="flex items-center space-x-1.5 bg-[#16171A] hover:bg-black text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer w-fit"
        >
          <UserPlus size={14} />
          <span>Add Patient</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-[#FAF5EE] border border-[#E9DDD0] rounded-3xl flex-1 flex flex-col overflow-hidden shadow-xs">
        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-[#EADFD1] flex justify-between items-center gap-4">
          <div className="flex items-center bg-white/80 rounded-full px-3.5 py-1.5 border border-[#E2D5C6] w-72 focus-within:ring-2 focus-within:ring-[#F094C6]/30">
            <Search size={14} className="text-[#8C8479]" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search patients by name or ID..."
              className="bg-transparent border-none outline-none text-xs text-[#16171A] ml-2 w-full font-medium placeholder:text-[#A69D92]"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center space-x-1.5 text-xs font-bold text-[#554F46] hover:text-black bg-[#EFE6DC] px-3 py-1.5 rounded-full border border-[#E2D6C7] cursor-pointer"
            >
              <Filter size={13} />
              <span>Filter: {selectedRiskFilter}</span>
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 top-8 w-32 bg-[#FAF6EF] rounded-xl border border-[#E9DDD0] shadow-xl p-1 z-30">
                {(['All', 'Low', 'Medium', 'High'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedRiskFilter(opt);
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                      selectedRiskFilter === opt ? 'bg-[#16171A] text-white font-bold' : 'text-[#615A4F] hover:bg-black/5'
                    }`}
                  >
                    {opt} Risk
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#F3ECE2] text-[#7A7369] uppercase tracking-wider sticky top-0 z-10 font-bold text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Patient</th>
                <th className="px-6 py-3.5">ID</th>
                <th className="px-6 py-3.5">Phone</th>
                <th className="px-6 py-3.5">Last Visit</th>
                <th className="px-6 py-3.5">Next Appt</th>
                <th className="px-6 py-3.5">AI Churn Risk</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADFD1] text-[#16171A]">
              {filteredPatients.map((p, i) => (
                <tr key={i} className="hover:bg-white/60 transition-colors">
                  <td className="px-6 py-3.5 font-bold">{p.name}</td>
                  <td className="px-6 py-3.5 font-mono text-[11px] text-[#7A7369]">{p.id}</td>
                  <td className="px-6 py-3.5 text-[#554F46] font-mono text-[11px]">{p.phone}</td>
                  <td className="px-6 py-3.5 text-[#554F46]">{p.lastVisit}</td>
                  <td className="px-6 py-3.5 font-medium">{p.nextAppt}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.risk.includes('Low')
                          ? 'bg-[#AACB77]/30 text-[#3F6317]'
                          : p.risk.includes('High')
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {p.risk}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="font-semibold">{p.status}</span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button
                      onClick={() => alert(`Opening full chart and treatment history for ${p.name}`)}
                      className="p-1 text-[#7A7369] hover:text-black cursor-pointer rounded-lg hover:bg-black/5"
                    >
                      <MoreHorizontal size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Patient Modal */}
      {isAddPatientOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[#FAF6EF] rounded-3xl p-6 max-w-sm w-full border border-[#E9DDD0] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#EADFD1]">
              <h3 className="text-base font-bold text-[#16171A]">Add New Patient</h3>
              <button onClick={() => setIsAddPatientOpen(false)} className="text-[#7A7369] hover:text-black">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#544F46] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jonathan Vance"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full bg-[#F3ECE2] border border-[#E0D4C5] rounded-xl px-3 py-2 text-xs text-[#16171A] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#544F46] mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="(713) 555-0199"
                  value={newPatientPhone}
                  onChange={(e) => setNewPatientPhone(e.target.value)}
                  className="w-full bg-[#F3ECE2] border border-[#E0D4C5] rounded-xl px-3 py-2 text-xs text-[#16171A] outline-none"
                />
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddPatientOpen(false)}
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-[#EBE2D7] text-[#544F46]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold rounded-xl bg-[#16171A] text-white hover:bg-black"
                >
                  Create Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
