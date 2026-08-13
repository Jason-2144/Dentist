import React from 'react';
import { AgentCard } from '../AgentCard';
import { HeartHandshake, Star } from 'lucide-react';

export function ReputationAgent() {
  return (
    <AgentCard title="Reputation Agent" icon={HeartHandshake} accentColor="#A855F7" isLive={true}>
      <div className="flex flex-col h-full justify-between">
        
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-baseline space-x-1">
            <span className="text-4xl font-light text-gray-100 tracking-tight">4.7</span>
            <Star size={20} className="text-purple-500 fill-purple-500 pb-1" />
          </div>
          <div className="bg-purple-500/20 border border-purple-500/30 px-2.5 py-1 rounded-full text-[10px] font-medium text-purple-300">
            8 new this week
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-3 mb-4 flex-1">
          <div className="flex items-center space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={10} className="text-purple-400 fill-purple-400" />
            ))}
            <span className="text-[10px] text-gray-500 ml-2">Google • 2h ago</span>
          </div>
          <p className="text-xs text-gray-300 italic line-clamp-2 leading-relaxed">
            "Best cleaning I've ever had. The staff was incredibly gentle and the new high-tech scanners are amazing."
          </p>
        </div>

        <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-lg transition-colors border border-white/10">
          View Negative Feedback (0)
        </button>

      </div>
    </AgentCard>
  );
}
