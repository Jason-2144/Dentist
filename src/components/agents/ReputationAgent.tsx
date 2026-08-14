import React from 'react';
import { AgentCard } from '../AgentCard';
import { HeartHandshake, Star } from 'lucide-react';
import { useCollection } from '../../lib/useCollection';
import { COLLECTIONS, Query } from '../../lib/appwrite';

interface RatingRow {
  $id: string;
  name: string;
  rating: number;
  outcome: 'sent_to_google' | 'escalated_to_manager';
  logged_at: string;
}

// NOTE: this reflects *our own* post-visit rating capture (WhatsApp + kiosk),
// not Google's live public rating — that requires the Google Business Profile
// API, a separate integration not covered by the 8 products built. See
// APPWRITE_SCHEMA.md "Gaps" section.
export function ReputationAgent() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, loading } = useCollection<RatingRow>(COLLECTIONS.RATINGS, [
    Query.greaterThanEqual('logged_at', sevenDaysAgo.toISOString()),
    Query.orderDesc('logged_at'),
  ]);

  const avg = data.length > 0 ? (data.reduce((sum, r) => sum + r.rating, 0) / data.length).toFixed(1) : '—';
  const highRatingCount = data.filter((r) => r.rating >= 4).length;
  const negativeCount = data.filter((r) => r.rating <= 3).length;
  const mostRecent = data[0];

  return (
    <AgentCard title="Reputation Agent" icon={HeartHandshake} accentColor="#A855F7" isLive={true}>
      <div className="flex flex-col h-full justify-between">

        <div className="flex justify-between items-start mb-4">
          <div className="flex items-baseline space-x-1">
            <span className="text-4xl font-light text-gray-100 tracking-tight">{loading ? '—' : avg}</span>
            <Star size={20} className="text-purple-500 fill-purple-500 pb-1" />
          </div>
          <div className="bg-purple-500/20 border border-purple-500/30 px-2.5 py-1 rounded-full text-[10px] font-medium text-purple-300">
            {highRatingCount} new this week
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-3 mb-4 flex-1">
          <div className="flex items-center space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={10}
                className={mostRecent && star <= mostRecent.rating ? 'text-purple-400 fill-purple-400' : 'text-gray-700'}
              />
            ))}
            <span className="text-[10px] text-gray-500 ml-2">Internal · last 7 days</span>
          </div>
          <p className="text-xs text-gray-300 italic line-clamp-2 leading-relaxed">
            {mostRecent ? `Rated ${mostRecent.rating}/5 by ${mostRecent.name}` : 'No ratings captured yet this week.'}
          </p>
        </div>

        <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-lg transition-colors border border-white/10">
          View Negative Feedback ({negativeCount})
        </button>

      </div>
    </AgentCard>
  );
}
