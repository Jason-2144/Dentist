import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, FileText } from 'lucide-react';
import { TimelineEvent } from '../lib/mockData';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: TimelineEvent) => void;
}

export function AddEventModal({ isOpen, onClose, onAddEvent }: AddEventModalProps) {
  const [title, setTitle] = useState('');
  const [patientName, setPatientName] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('10:30');
  const [location, setLocation] = useState('West camp, Room 312');
  const [eventType, setEventType] = useState<'emergency' | 'diagnostic' | 'team' | 'video'>('diagnostic');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvent: TimelineEvent = {
      id: `t_${Date.now()}`,
      timeLabel: startTime,
      startTime,
      endTime,
      title: patientName ? `${title} (${patientName})` : title,
      location,
      type: eventType,
      iconColor: eventType === 'emergency' ? '#E26AA8' : eventType === 'video' ? '#A2D2F7' : '#4A90E2',
    };

    onAddEvent(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-[#FAF6F0] rounded-[24px] border border-[#E9DDD0] shadow-2xl w-full max-w-md p-6 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-[#EADFD2]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#181A1D] text-white flex items-center justify-center">
              <Calendar size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#181A1D]">Add New Calendar Event</h3>
              <p className="text-xs text-[#7F786E]">Schedule appointment or team meeting</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#EFE6DC] text-[#4A453E] hover:bg-[#E3D8CC] flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-[12px] font-semibold text-[#544F46] mb-1">Event / Procedure Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Root Canal Examination"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F3ECE2] border border-[#E0D4C5] rounded-xl px-3.5 py-2 text-sm text-[#181A1D] outline-none focus:border-[#F28DC4]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#544F46] mb-1">Patient Name (Optional)</label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-2.5 text-[#91887B]" />
              <input
                type="text"
                placeholder="e.g. Jonathan Vance"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-[#F3ECE2] border border-[#E0D4C5] rounded-xl pl-9 pr-3.5 py-2 text-sm text-[#181A1D] outline-none focus:border-[#F28DC4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#544F46] mb-1">Start Time</label>
              <div className="relative">
                <Clock size={15} className="absolute left-3.5 top-2.5 text-[#91887B]" />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-[#F3ECE2] border border-[#E0D4C5] rounded-xl pl-9 pr-3 py-2 text-sm text-[#181A1D] outline-none focus:border-[#F28DC4]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#544F46] mb-1">End Time</label>
              <div className="relative">
                <Clock size={15} className="absolute left-3.5 top-2.5 text-[#91887B]" />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-[#F3ECE2] border border-[#E0D4C5] rounded-xl pl-9 pr-3 py-2 text-sm text-[#181A1D] outline-none focus:border-[#F28DC4]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#544F46] mb-1">Location / Room</label>
            <div className="relative">
              <MapPin size={15} className="absolute left-3.5 top-2.5 text-[#91887B]" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#F3ECE2] border border-[#E0D4C5] rounded-xl pl-9 pr-3.5 py-2 text-sm text-[#181A1D] outline-none focus:border-[#F28DC4]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#544F46] mb-1">Type</label>
            <div className="grid grid-cols-4 gap-2">
              {(['emergency', 'diagnostic', 'team', 'video'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setEventType(t)}
                  className={`py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all ${
                    eventType === t
                      ? 'bg-[#181A1D] text-white border-[#181A1D]'
                      : 'bg-[#F3ECE2] text-[#555047] border-[#E0D4C5] hover:border-[#181A1D]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-xs font-semibold rounded-xl bg-[#EBE2D7] text-[#544F46] hover:bg-[#E0D5C7] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-[#181A1D] text-white hover:bg-black transition-colors shadow-sm"
            >
              Confirm Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
