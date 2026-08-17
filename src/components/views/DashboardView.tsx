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
    <div>
      <div className="mb-6">
        <h2 className="font-display italic text-2xl md:text-[28px] text-[var(--ink)] leading-snug max-w-2xl">
          Here's everything your team took off your plate today.
        </h2>
        <p className="text-sm text-[var(--ink-muted)] mt-1.5">
          Eight helpers, quietly working the phones, the calendar, and the follow-ups — so your chairs stay full and your patients feel looked after.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 auto-rows-[minmax(300px,1fr)]">
        <ReEngagementAgent />
        <AIReceptionist />
        <NoShowRecovery />
        <PracticeDashboard />
        <TreatmentFollowUp />
        <ReputationAgent />
        <WebsiteBooking />
        <InsuranceAgent />
      </div>
    </div>
  );
}
