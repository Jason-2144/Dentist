import React, { useEffect, useState } from 'react';
import { client } from './lib/appwrite';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Bottombar } from './components/Bottombar';
import { DashboardView } from './components/views/DashboardView';
import { PatientsView } from './components/views/PatientsView';
import { ScheduleView } from './components/views/ScheduleView';
import { MessagesView } from './components/views/MessagesView';
import { CallLogsView } from './components/views/CallLogsView';
import { ClaimsView } from './components/views/ClaimsView';
import { ReputationView } from './components/views/ReputationView';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    // Verifies the Appwrite connection is reachable on app load — check the
    // browser console for the result. A failure here means every agent card
    // will silently fall back to its empty/zero state.
    client.ping()
      .then(() => console.log('[Appwrite] ping OK — connected to', client.config.endpoint))
      .catch((err) => console.error('[Appwrite] ping failed:', err));
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'patients': return <PatientsView />;
      case 'schedule': return <ScheduleView />;
      case 'messages': return <MessagesView />;
      case 'calls': return <CallLogsView />;
      case 'claims': return <ClaimsView />;
      case 'reputation': return <ReputationView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--canvas)] text-[var(--ink)] font-sans overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto h-full">
            {renderView()}
          </div>
        </main>

        <Bottombar />
      </div>
    </div>
  );
}
