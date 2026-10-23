import React, { useState } from 'react';
import { Star, MessageCircleReply, ExternalLink, RotateCw, Send, Check } from 'lucide-react';

export function ReputationView() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'John D.',
      platform: 'Google Business',
      rating: 5,
      time: '2 hours ago',
      text: "Best cleaning I've ever had. Dr. Samskruti was incredibly gentle and the new high-tech scanners are amazing.",
      reply: 'Thank you for your kind words John! It was a pleasure caring for you today. — Dr. Samskruti',
      hasReplied: true,
    },
    {
      id: 2,
      name: 'Alice M.',
      platform: 'Google Business',
      rating: 4,
      time: 'Yesterday',
      text: 'Great service, slightly long wait time but Dr. Samskruti is worth it.',
      reply: null,
      hasReplied: false,
    },
    {
      id: 3,
      name: 'Robert B.',
      platform: 'Google Business',
      rating: 5,
      time: '3 days ago',
      text: 'Very professional team. Fixed my crown in one visit with no pain.',
      reply: null,
      hasReplied: false,
    },
  ]);

  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleSyncGoogle = () => {
    setSyncStatus('Syncing with Google Business API...');
    setTimeout(() => {
      setSyncStatus('Google Business reviews are up to date (4.8 ★ average)');
      setTimeout(() => setSyncStatus(null), 3000);
    }, 1200);
  };

  const handleAiReply = (id: number) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              hasReplied: true,
              reply: 'Thank you for your feedback! We look forward to seeing you at your next visit. — Dr. Samskruti & Team',
            }
          : r
      )
    );
  };

  return (
    <div className="h-full flex flex-col space-y-5 pb-16">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#16171A] tracking-tight">Reputation & Reviews</h2>
          <p className="text-xs text-[#7A7369] mt-0.5">Overall rating: 4.8 ★ across 342 verified Google reviews.</p>
        </div>

        <button
          onClick={handleSyncGoogle}
          className="flex items-center space-x-1.5 bg-[#16171A] hover:bg-black text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer w-fit"
        >
          <RotateCw size={13} />
          <span>Sync Google Reviews</span>
        </button>
      </div>

      {syncStatus && (
        <div className="bg-[#16171A] text-white text-xs font-semibold py-2 px-4 rounded-xl flex items-center space-x-2 animate-in fade-in">
          <Check size={14} className="text-[#AACB77]" />
          <span>{syncStatus}</span>
        </div>
      )}

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-[#FAF5EE] border border-[#E9DDD0] rounded-3xl p-5 flex flex-col justify-between shadow-xs hover:border-[#DECDBE] transition-all"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-[#16171A] text-sm">{r.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={13}
                          className={
                            idx < r.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#7A7369] font-medium">
                      {r.platform} · {r.time}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#554F46] leading-relaxed mt-2.5">"{r.text}"</p>

              {r.reply && (
                <div className="mt-3 p-3 bg-white/80 rounded-2xl border border-[#EADFD1] text-[11px] text-[#16171A] leading-relaxed">
                  <span className="font-bold text-[10px] text-[#2F6F63] block mb-0.5">Clinic Response:</span>
                  {r.reply}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#EADFD1] flex justify-between items-center">
              {r.hasReplied ? (
                <span className="text-[10.5px] font-bold text-[#2F6F63] inline-flex items-center space-x-1">
                  <Check size={12} />
                  <span>Response Posted</span>
                </span>
              ) : (
                <button
                  onClick={() => handleAiReply(r.id)}
                  className="bg-[#16171A] hover:bg-black text-white px-3 py-1 rounded-full text-[10.5px] font-bold transition-all shadow-2xs cursor-pointer flex items-center space-x-1"
                >
                  <MessageCircleReply size={12} />
                  <span>Draft AI Response</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
