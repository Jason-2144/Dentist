import React from 'react';
import { Search, Send, Sparkles } from 'lucide-react';

export function MessagesView() {
  const threads = [
    { name: 'Emma Wilson', preview: 'AI: Hi Emma, checking if you want to...', time: '10:42 AM', unread: true },
    { name: 'Michael Chen', preview: 'Patient: Sounds good, see you then.', time: '09:15 AM', unread: false },
    { name: 'David Lopez', preview: 'AI: Your appointment is confirmed for...', time: 'Yesterday', unread: false },
  ];

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar - Threads */}
      <div className="w-full lg:w-80 bg-[#161B22] border border-white/5 rounded-xl flex flex-col overflow-hidden shrink-0 h-[400px] lg:h-full">
        <div className="p-4 border-b border-white/5">
          <h3 className="font-semibold text-gray-200 mb-3">Messages</h3>
          <div className="flex items-center bg-[#0D1117] rounded-lg px-3 py-1.5 border border-white/5">
            <Search size={14} className="text-gray-500" />
            <input type="text" placeholder="Search chats..." className="bg-transparent border-none outline-none text-sm text-gray-300 ml-2 w-full" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map((t, i) => (
            <div key={i} className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors ${i === 0 ? 'bg-blue-500/5 border-l-2 border-l-blue-500' : 'border-l-2 border-l-transparent'}`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm font-medium ${i === 0 ? 'text-gray-200' : 'text-gray-300'}`}>{t.name}</span>
                <span className="text-[10px] text-gray-500">{t.time}</span>
              </div>
              <p className={`text-xs truncate ${t.unread ? 'text-gray-300 font-medium' : 'text-gray-500'}`}>{t.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Area - Chat */}
      <div className="flex-1 bg-[#161B22] border border-white/5 rounded-xl flex flex-col overflow-hidden min-h-[500px]">
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0D1117]/50">
          <div>
            <h3 className="font-semibold text-gray-200">Emma Wilson</h3>
            <p className="text-xs text-gray-400">Re-Engagement Campaign #42</p>
          </div>
          <span className="px-2.5 py-1 bg-teal-500/10 text-teal-400 text-xs font-medium rounded-full flex items-center border border-teal-500/20">
             <Sparkles size={12} className="mr-1" /> AI Handling
          </span>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="flex flex-col items-center mb-6">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium bg-[#0D1117] px-3 py-1 rounded-full border border-white/5">Today</span>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white text-sm p-3 rounded-2xl rounded-tr-sm max-w-md">
              Hi Emma, this is Sarah from Smile & Co. We noticed you haven't been in for a cleaning since January! We have a few openings next week. Would you like to grab one?
              <span className="text-[9px] text-blue-200 block mt-1 text-right opacity-80">Sent by AI • 10:30 AM</span>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-[#0D1117] border border-white/10 text-gray-200 text-sm p-3 rounded-2xl rounded-tl-sm max-w-md">
              Oh wow, time flies. Yes, do you have anything on Tuesday morning?
              <span className="text-[9px] text-gray-500 block mt-1 text-left">10:41 AM</span>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white text-sm p-3 rounded-2xl rounded-tr-sm max-w-md relative">
              I can offer you Tuesday at 9:00 AM or 10:30 AM. Do either of those work for you?
              <span className="text-[9px] text-blue-200 block mt-1 text-right opacity-80">Drafted by AI • Pending send</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/5 bg-[#0D1117]/50">
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="Type a message (Overrides AI)..." 
              className="flex-1 bg-[#161B22] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-blue-500/50 transition-colors focus:ring-1 focus:ring-blue-500/50"
              defaultValue="I can offer you Tuesday at 9:00 AM or 10:30 AM. Do either of those work for you?"
            />
            <button className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
