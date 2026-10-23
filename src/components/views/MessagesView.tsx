import React, { useState } from 'react';
import { Search, Send, Sparkles, Check, MessageSquare } from 'lucide-react';

export function MessagesView() {
  const [threads, setThreads] = useState([
    {
      id: 1,
      name: 'Emma Wilson',
      phone: '(713) 555-0144',
      preview: 'Checking if you want to reschedule your checkup...',
      time: '10:42 AM',
      unread: true,
      messages: [
        { sender: 'ai', text: 'Hi Emma, it has been 6 months since your last cleaning at DentistOS. We would love to see you! Reply YES to book a slot.', time: '10:40 AM' },
        { sender: 'patient', text: 'Hi! Yes please, do you have any openings on Friday morning?', time: '10:42 AM' },
      ],
    },
    {
      id: 2,
      name: 'Michael Chen',
      phone: '(713) 555-0192',
      preview: 'Patient: Sounds good, see you then.',
      time: '09:15 AM',
      unread: false,
      messages: [
        { sender: 'ai', text: 'Reminder: your cleaning appointment at DentistOS is tomorrow at 10:00 AM. Reply C to confirm or R to reschedule.', time: '09:00 AM' },
        { sender: 'patient', text: 'C', time: '09:15 AM' },
        { sender: 'ai', text: 'Thanks Michael! Your appointment is confirmed. See you tomorrow!', time: '09:15 AM' },
      ],
    },
    {
      id: 3,
      name: 'David Lopez',
      phone: '(713) 555-0188',
      preview: 'AI: Your appointment is confirmed...',
      time: 'Yesterday',
      unread: false,
      messages: [
        { sender: 'ai', text: 'Hi David, your tooth extraction is scheduled with Dr. Samskruti on Oct 30.', time: 'Yesterday' },
        { sender: 'patient', text: 'Got it, thank you!', time: 'Yesterday' },
      ],
    },
  ]);

  const [activeThreadId, setActiveThreadId] = useState(1);
  const [inputMsg, setInputMsg] = useState('');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            preview: `You: ${inputMsg}`,
            messages: [
              ...t.messages,
              { sender: 'staff', text: inputMsg, time: 'Just now' },
            ],
          };
        }
        return t;
      })
    );

    setInputMsg('');
  };

  const handleAiSuggest = () => {
    setInputMsg('We have a slot open this Friday at 10:30 AM with Dr. Samskruti. Would that work for you?');
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-5 pb-16">
      {/* Left Sidebar - Chat Threads */}
      <div className="w-full lg:w-80 bg-[#FAF5EE] border border-[#E9DDD0] rounded-3xl flex flex-col overflow-hidden shrink-0 h-[480px] lg:h-full shadow-xs">
        <div className="p-4 border-b border-[#EADFD1]">
          <h3 className="font-bold text-[#16171A] text-sm mb-2.5">WhatsApp & SMS Chats</h3>
          <div className="flex items-center bg-white/80 rounded-full px-3 py-1.5 border border-[#E2D6C7]">
            <Search size={13} className="text-[#8C8479]" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="bg-transparent border-none outline-none text-xs text-[#16171A] ml-2 w-full font-medium"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#EADFD1]">
          {threads.map((t) => {
            const isSelected = t.id === activeThreadId;
            return (
              <div
                key={t.id}
                onClick={() => setActiveThreadId(t.id)}
                className={`p-3.5 cursor-pointer transition-colors ${
                  isSelected ? 'bg-white/80 border-l-4 border-l-[#F094C6]' : 'hover:bg-white/40'
                }`}
              >
                <div className="flex justify-between items-start mb-0.5">
                  <span className="text-xs font-bold text-[#16171A]">{t.name}</span>
                  <span className="text-[10px] text-[#8C8479] font-medium">{t.time}</span>
                </div>
                <p className="text-[11px] text-[#7A7369] truncate leading-tight">{t.preview}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Area - Active Chat Messages */}
      <div className="flex-1 bg-[#FAF5EE] border border-[#E9DDD0] rounded-3xl flex flex-col overflow-hidden shadow-xs h-[480px] lg:h-full">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#EADFD1] flex justify-between items-center bg-white/40">
          <div>
            <h3 className="font-bold text-sm text-[#16171A]">{activeThread.name}</h3>
            <p className="text-[10.5px] text-[#7A7369] font-mono">{activeThread.phone} · WhatsApp Channel</p>
          </div>
          <button
            onClick={handleAiSuggest}
            className="flex items-center space-x-1 bg-[#16171A] text-white text-[10.5px] font-bold px-3 py-1 rounded-full shadow-2xs hover:bg-black cursor-pointer"
          >
            <Sparkles size={12} className="text-[#F094C6]" />
            <span>AI Suggest Reply</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3">
          {activeThread.messages.map((m, idx) => {
            const isMe = m.sender === 'staff' || m.sender === 'ai';
            return (
              <div
                key={idx}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'ai'
                      ? 'bg-[#FDEAF4] text-[#16171A] border border-[#F28DC4]/30'
                      : m.sender === 'staff'
                      ? 'bg-[#16171A] text-white'
                      : 'bg-white border border-[#E8DDD0] text-[#16171A]'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <span className="text-[9.5px] text-[#9E9588] mt-1 px-1">
                  {m.sender === 'ai' ? 'DentistOS Bot' : m.sender === 'staff' ? 'Dr. Samskruti' : activeThread.name} · {m.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-[#EADFD1] flex items-center space-x-2 bg-white/50">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Type WhatsApp message..."
            className="flex-1 bg-white border border-[#DECDBE] rounded-full px-4 py-2 text-xs text-[#16171A] outline-none focus:border-[#16171A]"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-full bg-[#16171A] text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
          >
            <Send size={13} />
          </button>
        </form>
      </div>
    </div>
  );
}
