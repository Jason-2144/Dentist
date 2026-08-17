import React from 'react';

export interface AgentCardProps {
  title: string;
  icon: React.ElementType;
  accentColor: string;
  isLive?: boolean;
  /** When set, the card shows a "data unavailable" banner instead of pretending the zeros below are real. */
  error?: string | null;
  /** Small uppercase tag next to the title, e.g. "Preview" for cards still on mock data. */
  badge?: string;
  /** One human sentence, in the agent's own voice, summing up what it did — the card's shift note. */
  note?: string;
  children: React.ReactNode;
}
