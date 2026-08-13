import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Bottombar } from './components/Bottombar';
import { ReEngagementAgent } from './components/agents/ReEngagementAgent';
import { AIReceptionist } from './components/agents/AIReceptionist';
import { NoShowRecovery } from './components/agents/NoShowRecovery';
import { PracticeDashboard } from './components/agents/PracticeDashboard';
import { TreatmentFollowUp } from './components/agents/TreatmentFollowUp';
import { ReputationAgent } from './components/agents/ReputationAgent';
import { WebsiteBooking } from './components/agents/WebsiteBooking';
import { InsuranceAgent } from './components/agents/InsuranceAgent';

export default function App() {
  return (
    <div className="flex h-screen bg-[#0D1117] text-gray-200 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
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
          </div>
        </main>

        <Bottombar />
      </div>
    </div>
  );
}
