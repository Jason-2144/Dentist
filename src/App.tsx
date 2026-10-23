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
import { BookOpen, Bookmark, FileText, Settings as SettingsIcon } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Ping Appwrite Cloud connection
    client.ping()
      .then(() => console.log('[Appwrite] Connected to sgp.cloud.appwrite.io (practice_os)'))
      .catch((err) => console.warn('[Appwrite] Running in resilient offline/mock mode:', err.message));
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onNavigateToSchedule={() => setActiveView('schedule')} />;
      case 'schedule':
        return <ScheduleView />;
      case 'patients':
        return <PatientsView />;
      case 'calls':
        return <CallLogsView />;
      case 'claims':
        return <ClaimsView />;
      case 'statistics':
      case 'reputation':
        return <ReputationView />;
      case 'messages':
        return <MessagesView />;
      case 'education':
        return (
          <div className="bg-[#FAF5EE] rounded-[28px] border border-[#E9DDD0] p-8 max-w-4xl space-y-4">
            <div className="flex items-center space-x-3 text-[#181A1D]">
              <div className="p-2.5 rounded-xl bg-[#F28DC4]/20 text-[#E26AA8]">
                <BookOpen size={24} />
              </div>
              <h2 className="text-2xl font-bold">Clinical Education & Protocols</h2>
            </div>
            <p className="text-sm text-[#736B61] leading-relaxed">
              Clinical guidelines, antibiotic prophylaxis protocols, and post-op care guides for Dr. Samskruti and staff.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E8DDCE]">
                <span className="text-xs font-bold text-[#E26AA8] uppercase">Protocol #14</span>
                <h4 className="font-bold text-[#181A1D] mt-1">Endodontic Emergency Management</h4>
                <p className="text-xs text-[#7A7368] mt-1">Single-visit vs two-step protocol for acute apical abscess.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E8DDCE]">
                <span className="text-xs font-bold text-[#4A90E2] uppercase">Protocol #22</span>
                <h4 className="font-bold text-[#181A1D] mt-1">Invisalign Treatment Sequencing</h4>
                <p className="text-xs text-[#7A7368] mt-1">Refinement scan windows and attachment templates.</p>
              </div>
            </div>
          </div>
        );
      case 'articles':
        return (
          <div className="bg-[#FAF5EE] rounded-[28px] border border-[#E9DDD0] p-8 max-w-4xl space-y-4">
            <div className="flex items-center space-x-3 text-[#181A1D]">
              <div className="p-2.5 rounded-xl bg-[#AACB77]/20 text-[#5D8B1E]">
                <Bookmark size={24} />
              </div>
              <h2 className="text-2xl font-bold">My Published Articles & Research</h2>
            </div>
            <p className="text-sm text-[#736B61]">Authored research papers, patient handouts, and community health contributions.</p>
          </div>
        );
      case 'documents':
        return (
          <div className="bg-[#FAF5EE] rounded-[28px] border border-[#E9DDD0] p-8 max-w-4xl space-y-4">
            <div className="flex items-center space-x-3 text-[#181A1D]">
              <div className="p-2.5 rounded-xl bg-[#A2D2F7]/20 text-[#2C6EA8]">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl font-bold">Documents & Consent Forms Base</h2>
            </div>
            <p className="text-sm text-[#736B61]">HIPAA consent forms, surgical release waivers, and insurance pre-authorizations.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-[#FAF5EE] rounded-[28px] border border-[#E9DDD0] p-8 max-w-4xl space-y-4">
            <div className="flex items-center space-x-3 text-[#181A1D]">
              <div className="p-2.5 rounded-xl bg-[#181A1D] text-white">
                <SettingsIcon size={24} />
              </div>
              <h2 className="text-2xl font-bold">Practice & Automation Settings</h2>
            </div>
            <p className="text-sm text-[#736B61]">Configure Appwrite database connection, Twilio telephone number, Meta WhatsApp Cloud API credentials, and working hours.</p>
          </div>
        );
      default:
        return <DashboardView onNavigateToSchedule={() => setActiveView('schedule')} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F4EFE6] p-2 md:p-3 flex items-center justify-center">
      {/* Outer Rounded Container with Exact Dark Frame matching the screenshot */}
      <div className="w-full h-[calc(100vh-16px)] md:h-[calc(100vh-24px)] max-w-[1720px] bg-[#FAF6EF] rounded-[34px] border-[2.5px] border-[#222327] shadow-2xl overflow-hidden flex flex-row">
        {/* Floating Matte Dark Sidebar */}
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
          {/* Topbar Search & Profile Icons */}
          <Topbar onSearch={(q) => setSearchQuery(q)} />

          {/* Scrollable View Container */}
          <main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-2">
            <div className="max-w-[1550px] mx-auto min-h-full">
              {renderView()}
            </div>
          </main>

          {/* Bottom Bar for Agent Status */}
          <Bottombar />
        </div>
      </div>
    </div>
  );
}
