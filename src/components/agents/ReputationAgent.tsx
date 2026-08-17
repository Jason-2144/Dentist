import React from 'react';
import { AgentCard } from '../AgentCard';
import { RunButton } from '../RunButton';
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

const ACCENT = '#B0559A';

// NOTE: this reflects *our own* post-visit rating capture (WhatsApp + kiosk),
// not Google's live public rating — that requires the Google Business Profile
// API, a separate integration not covered by the 8 products built. See
// APPWRITE_SCHEMA.md "Gaps" section.
export function ReputationAgent() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, loading, error } = useCollection<RatingRow>(COLLECTIONS.RATINGS, [
    Query.greaterThanEqual('logged_at', sevenDaysAgo.toISOString()),
    Query.orderDesc('logged_at'),
  ]);

  const avg = data.length > 0 ? (data.reduce((sum, r) => sum + r.rating, 0) / data.length).toFixed(1) : '—';
  const highRatingCount = data.filter((r) => r.rating >= 4).length;
  const negativeCount = data.filter((r) => r.rating <= 3).length;
  const mostRecent = data[0];

  const note = loading
    ? undefined
    : data.length === 0
    ? "No ratings captured this week yet — I'll ask every patient after their visit."
    : negativeCount > 0
    ? `${highRatingCount} happy patients this week — and I quietly caught ${negativeCount} unhappy one${negativeCount === 1 ? '' : 's'} before it went public.`
    : `${highRatingCount} happy patients rated their visit this week — nothing needed your attention.`;

  return (
    <AgentCard title="Reputation Agent" icon={HeartHandshake} accentColor={ACCENT} isLive={true} error={error} note={note}>
      <div className="flex flex-col h-full justify-between">

        <div className="flex justify-between items-start mb-4">
          <div className="flex items-baseline space-x-1">
            <span className="text-4xl font-light text-[var(--ink)] tracking-tight">{loading ? '—' : avg}</span>
            <Star size={20} className="pb-1" style={{ color: ACCENT, fill: ACCENT }} />
          </div>
          <div className="px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ backgroundColor: `${ACCENT}22`, border: `1px solid ${ACCENT}44`, color: ACCENT }}>
            {highRatingCount} new this week
          </div>
        </div>

        <div className="bg-[var(--surface-soft)] rounded-xl p-3 mb-4 flex-1">
          <div className="flex items-center space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={10}
                style={mostRecent && star <= mostRecent.rating ? { color: ACCENT, fill: ACCENT } : undefined}
                className={!(mostRecent && star <= mostRecent.rating) ? 'text-[var(--hairline)]' : ''}
              />
            ))}
            <span className="text-[10px] text-[var(--ink-muted)] ml-2">Internal · last 7 days</span>
          </div>
          <p className="text-xs text-[var(--ink)] italic line-clamp-2 leading-relaxed">
            {mostRecent ? `Rated ${mostRecent.rating}/5 by ${mostRecent.name}` : 'No ratings captured yet this week.'}
          </p>
          {negativeCount > 0 && (
            <p className="text-[10px] text-rose-600 font-medium mt-2">
              {negativeCount} rated 3★ or below this week — routed to private feedback, not posted publicly.
            </p>
          )}
        </div>

        <RunButton job="ratings" label="Send Rating Requests Now" className="text-[var(--ink)] border" style={{ backgroundColor: 'var(--surface-soft)', borderColor: 'var(--hairline)' }} />

      </div>
    </AgentCard>
  );
}
