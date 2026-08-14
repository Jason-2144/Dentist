import React from 'react';
import { Calendar as CalendarIcon, Clock, User, AlertCircle } from 'lucide-react';

export function ScheduleView() {
  const appointments = [
    { time: '09:00 AM', duration: '60m', patient: 'Sarah Jenkins', type: 'New Patient Exam', confirmed: true, chair: 'Chair 1' },
    { time: '10:00 AM', duration: '45m', patient: 'David Lopez', type: 'Hygiene', confirmed: true, chair: 'Chair 2' },
    { time: '10:15 AM', duration: '90m', patient: 'Emma Wilson', type: 'Crown Prep', confirmed: false, chair: 'Chair 1', warning: 'Unconfirmed - AI sent 2nd text' },
    { time: '11:30 AM', duration: '30m', patient: 'James Smith', type: 'Invisalign Check', confirmed: true, chair: 'Chair 3' },
    { time: '01:00 PM', duration: '60m', patient: 'Michael Chen', type: 'Filling (2)', confirmed: true, chair: 'Chair 1' },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 tracking-tight">Today's Schedule</h2>
          <p className="text-sm text-gray-400 mt-1">Oct 24, 2023 • 5 Appointments</p>
        </div>
        <div className="flex space-x-2">
           <button className="px-4 py-2 bg-[#161B22] border border-white/5 rounded-lg text-sm text-gray-300 font-medium hover:bg-white/5 transition-colors">
             Day
           </button>
           <button className="px-4 py-2 bg-[#0D1117] border border-transparent rounded-lg text-sm text-gray-500 font-medium hover:text-gray-300 transition-colors">
             Week
           </button>
        </div>
      </div>

      <div className="bg-[#161B22] border border-white/5 rounded-xl p-6 flex-1 overflow-auto">
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white/5">
          {appointments.map((appt, i) => (
             <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#161B22] bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative left-0 md:left-auto">
                  <Clock size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-[#0D1117] shadow-sm ml-4 md:ml-0 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-200">{appt.time} <span className="text-gray-500 font-normal">({appt.duration})</span></span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium ${appt.confirmed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {appt.confirmed ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300 mb-1">
                    <User size={14} className="text-gray-500" />
                    <span>{appt.patient}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{appt.chair}</span>
                  </div>
                  <p className="text-xs text-gray-500">{appt.type}</p>
                  
                  {appt.warning && (
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-start space-x-2 text-xs text-amber-400">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>{appt.warning}</span>
                    </div>
                  )}
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
