import React from 'react';
import { Star, MessageCircleReply, ExternalLink } from 'lucide-react';

export function ReputationView() {
  const reviews = [
    { name: 'John D.', platform: 'Google', rating: 5, time: '2 hours ago', text: "Best cleaning I've ever had. The staff was incredibly gentle and the new high-tech scanners are amazing.", aiDrafted: false },
    { name: 'Alice M.', platform: 'Yelp', rating: 4, time: 'Yesterday', text: "Great service, slightly long wait time but Dr. Sarah is worth it.", aiDrafted: true },
    { name: 'Robert B.', platform: 'Google', rating: 5, time: '3 days ago', text: "Very professional team. Fixed my crown in one visit.", aiDrafted: false }
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 tracking-tight">Reputation Management</h2>
          <p className="text-sm text-gray-400 mt-1">Overall rating: 4.7 ★ across 342 reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 overflow-auto pb-6">
        {reviews.map((r, i) => (
          <div key={i} className="bg-[#161B22] border border-white/5 rounded-xl p-5 flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-200">{r.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={12} className={idx < r.rating ? "text-purple-500 fill-purple-500" : "text-gray-600"} />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500">{r.platform} • {r.time}</span>
                </div>
              </div>
              <ExternalLink size={14} className="text-gray-500 hover:text-gray-300 cursor-pointer" />
            </div>
            
            <p className="text-sm text-gray-300 italic mb-6 flex-1 line-clamp-4">"{r.text}"</p>
            
            <div className="mt-auto pt-4 border-t border-white/5">
              {r.aiDrafted ? (
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                  <span className="text-[10px] text-purple-400 font-medium uppercase tracking-wider mb-1 block">AI Suggested Reply</span>
                  <p className="text-xs text-gray-300 mb-3">Hi Alice, thank you for your kind words! We apologize for the wait time and are working to streamline our schedule. We're thrilled you had a great experience with Dr. Sarah.</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium py-1.5 rounded transition-colors">Post Reply</button>
                    <button className="flex-1 bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 text-xs font-medium py-1.5 rounded transition-colors">Edit</button>
                  </div>
                </div>
              ) : (
                <button className="w-full flex items-center justify-center space-x-2 text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 py-2 rounded-lg transition-colors border border-white/5">
                  <MessageCircleReply size={14} />
                  <span>Generate Reply with AI</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
