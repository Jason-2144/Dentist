import React, { useState } from 'react';
import {
  ChevronDown,
  Plus,
  RotateCw,
  Edit2,
  Video,
  Activity,
  Stethoscope,
  Users,
  FileText,
  Clock,
  MoreVertical,
} from 'lucide-react';
import { WEEKLY_SCHEDULE, ScheduleEvent } from '../../lib/mockData';
import { AddEventModal } from '../AddEventModal';

export function ScheduleView() {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('week');
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleEvent[]>(WEEKLY_SCHEDULE);

  const days = [
    { key: 'monday', label: 'MONDAY', date: '11/05', isToday: false },
    { key: 'tuesday', label: 'TUESDAY', date: '12/05', isToday: false },
    { key: 'wednesday', label: 'WEDNESDAY', date: '13/05', isToday: false },
    { key: 'thursday', label: 'THU', date: '14/05', isToday: true },
    { key: 'friday', label: 'FR', date: '15/05', isToday: false },
    { key: 'saturday', label: 'SA', date: '16/05', isToday: false },
    { key: 'sunday', label: 'SU', date: '17/05', isToday: false },
  ];

  const timeSlots = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30'];

  const handleJoinCall = (title: string) => {
    alert(`Connecting to virtual clinic room for: ${title}`);
  };

  return (
    <div className="w-full space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#181A1D] tracking-tight">
            Stay up to date, Dr.Samskruti
          </h1>
          <div className="flex items-center space-x-2 mt-2">
            <button className="flex items-center space-x-1.5 bg-[#181A1D] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs">
              <span>May 11/05-17/05</span>
              <ChevronDown size={13} />
            </button>
          </div>
        </div>

        {/* Action Controls & Segmented Toggle */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setIsAddEventOpen(true)}
            className="flex items-center space-x-1.5 bg-[#181A1D] hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all"
          >
            <Plus size={14} />
            <span>Add event</span>
          </button>
          <button
            onClick={() => setSchedule([...WEEKLY_SCHEDULE])}
            className="w-8 h-8 rounded-full bg-[#EFE6DC] text-[#4A453E] hover:bg-[#DFD3C4] flex items-center justify-center transition-colors shadow-2xs"
            title="Refresh"
          >
            <RotateCw size={13} />
          </button>
          <button
            className="w-8 h-8 rounded-full bg-[#EFE6DC] text-[#4A453E] hover:bg-[#DFD3C4] flex items-center justify-center transition-colors shadow-2xs"
            title="Edit"
          >
            <Edit2 size={13} />
          </button>

          {/* Today | Week | Month Toggle */}
          <div className="flex items-center bg-[#EFE6DC] p-1 rounded-full border border-[#E2D6C7]">
            <button
              onClick={() => setActiveTab('today')}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                activeTab === 'today' ? 'bg-[#181A1D] text-white shadow-xs' : 'text-[#6C6458]'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                activeTab === 'week' ? 'bg-[#181A1D] text-white shadow-xs' : 'text-[#6C6458]'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setActiveTab('month')}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                activeTab === 'month' ? 'bg-[#181A1D] text-white shadow-xs' : 'text-[#6C6458]'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Column Weekly Schedule Grid */}
      <div className="bg-[#FAF5EE] rounded-[28px] border border-[#E9DDD0] shadow-xs p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[950px] relative">
          {/* Live Pink Time Marker Line across the whole calendar (07:21) */}
          <div className="absolute top-[82px] left-0 right-0 z-20 pointer-events-none flex items-center">
            <span className="bg-[#F28DC4] text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded-full shadow-xs shrink-0 mr-1.5 ml-1">
              07:21
            </span>
            <div className="h-px flex-1 border-t-2 border-dashed border-[#F28DC4]" />
          </div>

          {/* Grid Header */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-2 pb-4 border-b border-[#EADFD1] items-center text-center">
            <div className="text-[11px] font-bold text-[#9E9588] text-left pl-1">
              <span className="block text-[10px]">W</span>
              <span>24</span>
            </div>
            {days.map((d) => (
              <div key={d.key} className="flex justify-center">
                {d.isToday ? (
                  <div className="bg-[#181A1D] text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                    {d.label} {d.date}
                  </div>
                ) : (
                  <div className="text-xs font-bold text-[#6D655A]">
                    <span className="block text-[10px] text-[#A3998C] font-semibold">{d.label}</span>
                    <span>{d.date}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Grid Rows by Time Slot */}
          <div className="relative divide-y divide-[#EADFD1]/60">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-[60px_repeat(7,1fr)] gap-2 py-4 min-h-[110px] items-start">
                {/* Time Column */}
                <div className="text-[11px] font-bold text-[#7E766B] pt-1">
                  {time}
                </div>

                {/* Day Columns */}
                {days.map((d) => {
                  const eventsInSlot = schedule.filter(
                    (s) => s.day === d.key && s.timeSlot === time
                  );

                  return (
                    <div key={d.key} className="space-y-2.5 h-full">
                      {eventsInSlot.map((evt) => (
                        <div
                          key={evt.id}
                          className={`rounded-2xl p-3 border shadow-xs transition-all hover:shadow-md ${evt.bgClass} ${
                            evt.type === 'team'
                              ? 'border-[#EAD36F]'
                              : evt.type === 'intern'
                              ? 'border-[#CCE1F0]'
                              : 'border-[#E5DDD2]'
                          }`}
                        >
                          {/* Card Header with Icon & 3-dots */}
                          <div className="flex items-start justify-between">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/70 shadow-2xs">
                              {evt.type === 'emergency' && <Activity size={12} className="text-[#E26AA8]" />}
                              {evt.type === 'diagnostic' && <Stethoscope size={12} className="text-[#4A90E2]" />}
                              {evt.type === 'video' && <Video size={12} className="text-[#A26AE2]" />}
                              {evt.type === 'team' && <Users size={12} className="text-[#D49826]" />}
                              {evt.type === 'intern' && <Users size={12} className="text-[#3A7BB8]" />}
                              {evt.type === 'followup' && <Clock size={12} className="text-[#E26AA8]" />}
                            </div>
                            <button className="text-gray-400 hover:text-black">
                              <MoreVertical size={12} />
                            </button>
                          </div>

                          {/* Title & Location */}
                          <h4 className="text-[12px] font-bold text-[#181A1D] mt-2 leading-tight">
                            {evt.title}
                          </h4>
                          {evt.location && (
                            <p className="text-[10px] text-[#7A7369] mt-0.5 truncate">
                              {evt.location}
                            </p>
                          )}
                          <p className="text-[9.5px] font-semibold text-[#989083] mt-0.5">
                            {evt.startTime} - {evt.endTime}
                          </p>

                          {/* Tag */}
                          {evt.tag && (
                            <span className="inline-block mt-2 text-[9px] font-bold text-[#2A5D8A] bg-[#CCE2F4] px-2 py-0.5 rounded-full">
                              {evt.tag}
                            </span>
                          )}

                          {/* Description */}
                          {evt.description && (
                            <p className="text-[10px] text-[#554F45] mt-1.5 leading-snug line-clamp-3">
                              {evt.description}
                            </p>
                          )}

                          {/* Optional Image */}
                          {evt.image && (
                            <img
                              src={evt.image}
                              alt="Article preview"
                              className="w-full h-16 object-cover rounded-xl mt-2"
                            />
                          )}

                          {/* Attachment (e.g. Agenda.pdf) */}
                          {evt.attachment && (
                            <div className="flex items-center space-x-1 text-[10px] font-bold text-[#8C630D] bg-white/80 px-2 py-1 rounded-lg mt-2">
                              <FileText size={11} />
                              <span>{evt.attachment}</span>
                            </div>
                          )}

                          {/* Status Badge (e.g. In progress...) */}
                          {evt.statusBadge && (
                            <div className="mt-2 text-[10px] font-bold text-[#854570] bg-[#F8C3E5] px-2 py-1 rounded-xl text-center">
                              {evt.statusBadge}
                            </div>
                          )}

                          {/* Participants Avatars */}
                          {evt.participants && evt.participants.length > 0 && (
                            <div className="flex items-center space-x-1 mt-2">
                              {evt.participants.map((p, i) => (
                                <span
                                  key={i}
                                  className="w-4 h-4 rounded-full bg-[#181A1D] text-white text-[7.5px] font-bold flex items-center justify-center"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Join Call Button */}
                          {evt.hasJoinButton && (
                            <button
                              onClick={() => handleJoinCall(evt.title)}
                              className="w-full mt-2.5 py-1 text-[11px] font-bold rounded-xl bg-[#8F949E] hover:bg-[#181A1D] text-white transition-colors"
                            >
                              Join
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onAddEvent={(newEvent) => {
          setSchedule((prev) => [
            ...prev,
            {
              id: `sched_${Date.now()}`,
              day: 'thursday',
              dateStr: '14/05',
              timeSlot: '08:00',
              startTime: newEvent.startTime,
              endTime: newEvent.endTime,
              title: newEvent.title,
              location: newEvent.location,
              type: newEvent.type,
              bgClass: 'bg-[#F5F2ED]',
            },
          ]);
        }}
      />
    </div>
  );
}
