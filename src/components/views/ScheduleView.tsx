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
  X,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  CheckCircle2,
} from 'lucide-react';
import { WEEKLY_SCHEDULE, ScheduleEvent } from '../../lib/mockData';
import { AddEventModal } from '../AddEventModal';

interface ScheduleViewProps {
  searchFilter?: string;
}

export function ScheduleView({ searchFilter }: ScheduleViewProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('week');
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleEvent[]>(WEEKLY_SCHEDULE);
  const [selectedWeek, setSelectedWeek] = useState('May 11/05-17/05');
  const [showWeekDropdown, setShowWeekDropdown] = useState(false);
  const [activeCallModal, setActiveCallModal] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [selectedEventActionId, setSelectedEventActionId] = useState<string | null>(null);

  const days = [
    { key: 'monday', label: 'MONDAY', date: '11/05', isToday: false },
    { key: 'tuesday', label: 'TUESDAY', date: '12/05', isToday: false },
    { key: 'wednesday', label: 'WEDNESDAY', date: '13/05', isToday: false },
    { key: 'thursday', label: 'THU', date: '14/05', isToday: true },
    { key: 'friday', label: 'FR', date: '15/05', isToday: false },
    { key: 'saturday', label: 'SA', date: '16/05', isToday: false },
    { key: 'sunday', label: 'SU', date: '17/05', isToday: false },
  ];

  // If in 'Today' mode, only show Thursday
  const visibleDays = activeTab === 'today' ? days.filter((d) => d.isToday) : days;

  const timeSlots = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30'];

  const filteredSchedule = schedule.filter((item) => {
    if (!searchFilter || searchFilter.trim().length === 0) return true;
    const q = searchFilter.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.tag && item.tag.toLowerCase().includes(q))
    );
  });

  const handleDeleteEvent = (id: string) => {
    setSchedule((prev) => prev.filter((e) => e.id !== id));
    setSelectedEventActionId(null);
  };

  return (
    <div className="w-full space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#181A1D] tracking-tight">
            Stay up to date, Dr.Samskruti
          </h1>
          <div className="flex items-center space-x-2 mt-2 relative">
            <button
              onClick={() => setShowWeekDropdown(!showWeekDropdown)}
              className="flex items-center space-x-1.5 bg-[#181A1D] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs cursor-pointer hover:bg-black transition-colors"
            >
              <span>{selectedWeek}</span>
              <ChevronDown size={13} />
            </button>

            {/* Week Dropdown */}
            {showWeekDropdown && (
              <div className="absolute left-0 top-8 w-44 bg-[#FAF6EF] rounded-xl border border-[#E9DDD0] shadow-xl p-1 z-30">
                {['May 04/05-10/05', 'May 11/05-17/05', 'May 18/05-24/05', 'May 25/05-31/05'].map((w) => (
                  <button
                    key={w}
                    onClick={() => {
                      setSelectedWeek(w);
                      setShowWeekDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                      selectedWeek === w ? 'bg-[#181A1D] text-white font-bold' : 'text-[#615A4F] hover:bg-black/5'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls & Segmented Toggle */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setIsAddEventOpen(true)}
            className="flex items-center space-x-1.5 bg-[#181A1D] hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>Add event</span>
          </button>
          <button
            onClick={() => setSchedule([...WEEKLY_SCHEDULE])}
            className="w-8 h-8 rounded-full bg-[#EFE6DC] text-[#4A453E] hover:bg-[#DFD3C4] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            title="Reset schedule"
          >
            <RotateCw size={13} />
          </button>
          <button
            onClick={() => alert('Editing mode activated: click 3 dots on any appointment to reschedule or remove.')}
            className="w-8 h-8 rounded-full bg-[#EFE6DC] text-[#4A453E] hover:bg-[#DFD3C4] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            title="Edit Schedule"
          >
            <Edit2 size={13} />
          </button>

          {/* Today | Week | Month Toggle */}
          <div className="flex items-center bg-[#EFE6DC] p-1 rounded-full border border-[#E2D6C7]">
            <button
              onClick={() => setActiveTab('today')}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === 'today' ? 'bg-[#181A1D] text-white shadow-xs' : 'text-[#6C6458]'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === 'week' ? 'bg-[#181A1D] text-white shadow-xs' : 'text-[#6C6458]'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setActiveTab('month')}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all cursor-pointer ${
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
            <span className="bg-[#F28DC4] text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded-full shadow-xs shrink-0 mr-1.5 ml-1 animate-pulse">
              07:21
            </span>
            <div className="h-px flex-1 border-t-2 border-dashed border-[#F28DC4]" />
          </div>

          {/* Grid Header */}
          <div
            className={`grid ${
              activeTab === 'today'
                ? 'grid-cols-[60px_1fr]'
                : 'grid-cols-[60px_repeat(7,1fr)]'
            } gap-2 pb-4 border-b border-[#EADFD1] items-center text-center`}
          >
            <div className="text-[11px] font-bold text-[#9E9588] text-left pl-1">
              <span className="block text-[10px]">W</span>
              <span>24</span>
            </div>
            {visibleDays.map((d) => (
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
              <div
                key={time}
                className={`grid ${
                  activeTab === 'today'
                    ? 'grid-cols-[60px_1fr]'
                    : 'grid-cols-[60px_repeat(7,1fr)]'
                } gap-2 py-4 min-h-[110px] items-start`}
              >
                {/* Time Column */}
                <div className="text-[11px] font-bold text-[#7E766B] pt-1">
                  {time}
                </div>

                {/* Day Columns */}
                {visibleDays.map((d) => {
                  const eventsInSlot = filteredSchedule.filter(
                    (s) => s.day === d.key && s.timeSlot === time
                  );

                  return (
                    <div key={d.key} className="space-y-2.5 h-full relative">
                      {eventsInSlot.map((evt) => (
                        <div
                          key={evt.id}
                          className={`rounded-2xl p-3 border shadow-xs transition-all hover:shadow-md relative ${evt.bgClass} ${
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

                            <div className="relative">
                              <button
                                onClick={() =>
                                  setSelectedEventActionId(
                                    selectedEventActionId === evt.id ? null : evt.id
                                  )
                                }
                                className="text-gray-400 hover:text-black cursor-pointer p-0.5"
                              >
                                <MoreVertical size={13} />
                              </button>

                              {/* 3-dots Quick Actions Popover */}
                              {selectedEventActionId === evt.id && (
                                <div className="absolute right-0 top-5 w-32 bg-[#FAF6EF] rounded-xl border border-[#E9DDD0] shadow-xl p-1 z-40">
                                  <button
                                    onClick={() => {
                                      alert(`Marked "${evt.title}" as completed`);
                                      setSelectedEventActionId(null);
                                    }}
                                    className="w-full text-left px-2 py-1 text-[11px] text-[#2F6F63] hover:bg-emerald-50 rounded-lg font-medium"
                                  >
                                    Mark Done
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEvent(evt.id)}
                                    className="w-full text-left px-2 py-1 text-[11px] text-rose-600 hover:bg-rose-50 rounded-lg font-medium"
                                  >
                                    Cancel Slot
                                  </button>
                                </div>
                              )}
                            </div>
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

                          {/* Join Video Call Button */}
                          {evt.hasJoinButton && (
                            <button
                              onClick={() => setActiveCallModal(evt.title)}
                              className="w-full mt-2.5 py-1 text-[11px] font-bold rounded-xl bg-[#8F949E] hover:bg-[#181A1D] text-white transition-colors cursor-pointer"
                            >
                              Join Call
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

      {/* Interactive Video Telehealth Call Modal */}
      {activeCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#181A1D] rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl border border-white/10">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div>
                <h3 className="text-sm font-bold">{activeCallModal}</h3>
                <p className="text-[11px] text-gray-400">Encrypted Telehealth Consultation · Dr. Samskruti</p>
              </div>
              <button
                onClick={() => setActiveCallModal(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="my-5 h-56 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
              {isVideoOff ? (
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-xl font-bold">
                  DS
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 animate-pulse">
                    <Video size={32} />
                  </div>
                  <p className="text-xs text-gray-300">Live Camera Stream Active</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">High definition 1080p</p>
                </div>
              )}

              <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded text-[10px]">
                Dr. Samskruti (Host)
              </div>
            </div>

            <div className="flex justify-center items-center space-x-3 pt-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition-colors cursor-pointer ${
                  isMuted ? 'bg-rose-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-3 rounded-full transition-colors cursor-pointer ${
                  isVideoOff ? 'bg-rose-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                }`}
                title={isVideoOff ? 'Turn video on' : 'Turn video off'}
              >
                {isVideoOff ? <VideoOff size={16} /> : <Video size={16} />}
              </button>
              <button
                onClick={() => setActiveCallModal(null)}
                className="px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <PhoneOff size={15} />
                <span>End Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
