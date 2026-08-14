import React from 'react';
import { ReEngagementAgent } from '../agents/ReEngagementAgent';
import { AIReceptionist } from '../agents/AIReceptionist';
import { NoShowRecovery } from '../agents/NoShowRecovery';
import { PracticeDashboard } from '../agents/PracticeDashboard';
import { TreatmentFollowUp } from '../agents/TreatmentFollowUp';
import { ReputationAgent } from '../agents/ReputationAgent';
import { WebsiteBooking } from '../agents/WebsiteBooking';
import { InsuranceAgent } from '../agents/InsuranceAgent';

export function DashboardView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 auto-rows-[minmax(280px,1fr)]">
      <ReEngagementAgent />
      <AIReceptionist />
      <NoShowRecovery />
      <PracticeDashboard />
      <TreatmentFollowUp />
      <ReputationAgent />
      <WebsiteBooking />
      <InsuranceAgent />
    </div>
  );
}
