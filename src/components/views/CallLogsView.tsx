import React, { useState } from 'react';
import { Phone, Play, Pause, AlertCircle, CheckCircle2, Volume2, X } from 'lucide-react';

export function CallLogsView() {
  const [playingCallIndex, setPlayingCallIndex] = useState<number | null>(null);
  const [selectedCallDetails, setSelectedCallDetails] = useState<any | null>(null);

  const calls = [
    {
      time: '10:42 AM',
      caller: '(713) 555-0192',
      name: 'Michael Chen',
      duration: '2m 14s',
      intent: 'Scheduling',
      status: 'Resolved',
      sentiment: 'Positive',
      transcript: 'Patient called to schedule routine semi-annual cleaning. AI Receptionist booked slot for Friday Nov 15 at 10:00 AM.',
    },
    {
      time: '10:15 AM',
      caller: '(713) 555-0105',
      name: 'Taigo Wilkinson',
      duration: '1m 05s',
      intent: 'Emergency Visit',
      status: 'Resolved',
      sentiment: 'Neutral',
      transcript: 'Caller reporting acute sensitivity and fever. Qualified as emergency visit and booked same-day 09:15 AM check.',
    },
    {
      time: '09:30 AM',
      caller: '(713) 555-0112',
      name: 'Sarah Jenkins',
      duration: '4m 30s',
      intent: 'Post-Op Concerns',
      status: 'Escalated',
      sentiment: 'Anxious',
      transcript: 'Patient reporting throbbing pain 3 days after root canal. Escalate tool triggered and WhatsApp summary sent to Dr. Samskruti.',
    },
    {
      time: '08:45 AM',
      caller: '(713) 555-0100',
      name: 'Unknown Caller',
      duration: '0m 45s',
      intent: 'Clinic Directions',
      status: 'Resolved',
      sentiment: 'Neutral',
      transcript: 'Caller asked for parking directions to West Camp building. Provided gate 2 entrance instructions.',
    },
  ];

  const togglePlay = (index: number) => {
    if (playingCallIndex === index) {
      setPlayingCallIndex(null);
    } else {
      setPlayingCallIndex(index);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-5 pb-16">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#16171A] tracking-tight">AI Receptionist Logs</h2>
          <p className="text-xs text-[#7A7369] mt-0.5">24/7 call transcripts, sentiment scores, and audio recordings.</p>
        </div>
      </div>

      <div className="bg-[#FAF5EE] border border-[#E9DDD0] rounded-3xl flex-1 overflow-hidden flex flex-col shadow-xs">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#F3ECE2] text-[#7A7369] text-[10px] uppercase tracking-wider sticky top-0 font-bold">
              <tr>
                <th className="px-6 py-3.5">Time / Caller</th>
                <th className="px-6 py-3.5">Duration</th>
                <th className="px-6 py-3.5">Primary Intent</th>
                <th className="px-6 py-3.5">Sentiment</th>
                <th className="px-6 py-3.5">AI Status</th>
                <th className="px-6 py-3.5 text-right">Recording</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADFD1] text-[#16171A]">
              {calls.map((c, i) => {
                const isPlaying = playingCallIndex === i;
                return (
                  <tr
                    key={i}
                    onClick={() => setSelectedCallDetails(c)}
                    className="hover:bg-white/60 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-3.5">
                      <div className="font-bold text-[#16171A]">{c.name}</div>
                      <div className="text-[10px] text-[#7A7369] mt-0.5 font-mono">{c.caller} · {c.time}</div>
                    </td>
                    <td className="px-6 py-3.5 text-[#554F46] font-medium">{c.duration}</td>
                    <td className="px-6 py-3.5">
                      <span className="bg-white/80 border border-[#DECDBE] px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold text-[#16171A]">
                        {c.intent}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`text-[10.5px] font-bold ${
                          c.sentiment === 'Positive'
                            ? 'text-emerald-700'
                            : c.sentiment === 'Anxious'
                            ? 'text-rose-600'
                            : 'text-[#655E52]'
                        }`}
                      >
                        {c.sentiment}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === 'Resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {c.status === 'Resolved' ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                        <span>{c.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => togglePlay(i)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold transition-all shadow-2xs cursor-pointer ${
                          isPlaying
                            ? 'bg-[#16171A] text-white animate-pulse'
                            : 'bg-[#F094C6]/25 hover:bg-[#F094C6]/40 text-[#A22B69]'
                        }`}
                      >
                        {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                        <span>{isPlaying ? 'Playing...' : 'Audio'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call Details / Audio Player Drawer */}
      {selectedCallDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[#FAF6EF] rounded-3xl p-6 max-w-md w-full border border-[#E9DDD0] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#EADFD1]">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-[#16171A]" />
                <h3 className="text-sm font-bold text-[#16171A]">Call Transcript · {selectedCallDetails.name}</h3>
              </div>
              <button onClick={() => setSelectedCallDetails(null)} className="text-[#7A7369] hover:text-black">
                <X size={16} />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between text-[#7A7369]">
                <span>Number: <b className="text-[#16171A]">{selectedCallDetails.caller}</b></span>
                <span>Duration: <b className="text-[#16171A]">{selectedCallDetails.duration}</b></span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-[#E8DDD0]">
                <span className="text-[10px] font-bold text-[#8C8479] uppercase block mb-1">AI Transcript Summary</span>
                <p className="text-[#16171A] leading-relaxed text-[11.5px]">{selectedCallDetails.transcript}</p>
              </div>

              {/* Simulated Audio Waveform */}
              <div className="p-3 rounded-2xl bg-[#16171A] text-white flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Volume2 size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] text-gray-300 mb-1">
                    <span>Twilio Call Audio</span>
                    <span>{selectedCallDetails.duration}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F094C6] w-2/3" />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedCallDetails(null)}
              className="w-full py-2 bg-[#16171A] text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
            >
              Close Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
