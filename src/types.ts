import React from 'react';

export interface AgentCardProps {
  title: string;
  icon: React.ElementType;
  accentColor: string;
  isLive?: boolean;
  children: React.ReactNode;
}
