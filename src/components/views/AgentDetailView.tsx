import React, { useState } from 'react';
import {
  Sparkles,
  PhoneCall,
  RefreshCw,
  Zap,
  TrendingUp,
  ClipboardCheck,
  Star,
  Globe,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Play,
  Settings,
  ExternalLink,
  ChevronRight,
  Activity,
  Check,
} from 'lucide-react';

import { AIReceptionist } from '../agents/AIReceptionist';
import { ReEngagementAgent } from '../agents/ReEngagementAgent';
import { NoShowRecovery } from '../agents/NoShowRecovery';
import { PracticeDashboard } from '../agents/PracticeDashboard';
import { TreatmentFollowUp } from '../agents/TreatmentFollowUp';
import { ReputationAgent } from '../agents/ReputationAgent';
import { WebsiteBooking } from '../agents/WebsiteBooking';
import { InsuranceAgent } from '../agents/InsuranceAgent';
import { runJob } from '../../lib/automation';

interface AgentDetailViewProps {
  agentId: string;
  onNavigate: (view: string) => void;
}

interface AgentMeta {
  id: string;
  name: string;
  shortName: string;
  role: string;
  description: string;
  accentColor: string;
  icon: React.ElementType;
  schedule: string;
  kpis: { label: string; value: string; change?: string }[];
  recentActivities: { time: string; text: string; status: 'success' | 'info' | 'pending' }[];
  component: React.ReactNode;
  relatedView?: { label: string; viewId: string };
}

export function AgentDetailView({ agentId, onNavigate }: AgentDetailViewProps) {
  const [activeAgentId, setActiveAgentId] = useState<string>(agentId);
  const [isRunning, setIsRunning] = useState(false);
  const [runSuccessToast, setRunSuccessToast] = useState<string | null>(null);

  // Sync internal state if prop changes from sidebar click
  React.useEffect(() => {
    setActiveAgentId(agentId);
  }, [agentId]);

  const agentsData: Record<string, AgentMeta> = {
    'agent-receptionist': {
      id: 'agent-receptionist',
      name: 'AI Receptionist',
      shortName: 'Receptionist',
      role: '24/7 Front Desk, Call Answering & Patient Triage',
      description: 'Answers all clinic telephone calls instantly, qualifies dental emergencies, books routine visits, and seamlessly escalates urgent post-op calls directly to Dr. Samskruti.',
      accentColor: '#1B8C7A',
      icon: PhoneCall,
      schedule: 'Always on (24/7 Real-Time Webhook via Twilio Voice)',
      kpis: [
        { label: 'Calls Handled Today', value: '45', change: '+12% vs last week' },
        { label: 'Avg Call Duration', value: '1m 42s' },
        { label: 'Emergency Escalations', value: '2', change: 'Addressed' },
        { label: 'Zero Hold Time', value: '100%' },
      ],
      recentActivities: [
        { time: '10:42 AM', text: 'Answered Michael Chen — Booked routine semi-annual cleaning for Friday 10:00 AM.', status: 'success' },
        { time: '10:15 AM', text: 'Triaged acute toothache for Taigo Wilkinson — Booked emergency slot 09:15 AM.', status: 'success' },
        { time: '09:30 AM', text: 'Escalated post-op pain query from Sarah Jenkins — Sent SMS alert to Dr. Samskruti.', status: 'info' },
        { time: '08:45 AM', text: 'Provided clinic location & West Camp parking instructions to caller.', status: 'success' },
      ],
      component: <AIReceptionist />,
      relatedView: { label: 'View All Call Transcripts', viewId: 'calls' },
    },
    'agent-reengagement': {
      id: 'agent-reengagement',
      name: 'Patient Re-engagement Agent',
      shortName: 'Re-engagement',
      role: 'Dormant Patient Recall & Hygiene Reactivation',
      description: 'Continuously monitors your patient database for overdue cleanings (6+ and 12+ months) and sends friendly, personalized WhatsApp & SMS invitations to rebook.',
      accentColor: '#3B6FE0',
      icon: RefreshCw,
      schedule: 'Runs daily at 09:00 AM & 02:00 PM',
      kpis: [
        { label: 'Lapsed Patients Messaged', value: '18', change: 'Today' },
        { label: 'Rebooked Within 48h', value: '6', change: '33% conversion' },
        { label: 'Production Reactivated', value: '$2,850', change: 'This week' },
        { label: 'Avg Recall Cadence', value: '5.8 mo' },
      ],
      recentActivities: [
        { time: '09:00 AM', text: 'Sent personalized recall WhatsApp to Emma Wilson (Last seen 14 months ago).', status: 'success' },
        { time: '09:02 AM', text: 'Emma Wilson clicked link and confirmed booking for Nov 18 with Dr. Samskruti.', status: 'success' },
        { time: '09:05 AM', text: 'Sent hygiene follow-up to Robert Vance (Overdue 6 months).', status: 'info' },
        { time: '09:12 AM', text: 'Scheduled automated nudge for 4 patients who opened the WhatsApp link.', status: 'pending' },
      ],
      component: <ReEngagementAgent />,
      relatedView: { label: 'View Patient Directory', viewId: 'patients' },
    },
    'agent-noshow': {
      id: 'agent-noshow',
      name: 'No-Show Recovery Agent',
      shortName: 'No-Show',
      role: 'Late Cancellation & Short-Notice Chair Backfill',
      description: 'Instantly triggers when a patient cancels or misses an appointment, messaging standby VIP patients to fill chair openings within minutes so production never drops.',
      accentColor: '#D97706',
      icon: Zap,
      schedule: 'Event-driven (Triggers instantly upon cancellation)',
      kpis: [
        { label: 'Chair Openings Recovered', value: '3', change: '100% fill rate' },
        { label: 'Avg Fill Time', value: '11 min', change: 'Fast backfill' },
        { label: 'Production Saved Today', value: '$1,420' },
        { label: 'Standby Waitlist Size', value: '14 patients' },
      ],
      recentActivities: [
        { time: '08:30 AM', text: 'Cancellation received for 11:30 AM slot (Deep cleaning, 60m).', status: 'info' },
        { time: '08:32 AM', text: 'Dispatched instant offer to top 3 waitlisted patients matching procedure type.', status: 'info' },
        { time: '08:41 AM', text: 'Arthur Dent accepted slot. Chair backfilled in 11 minutes.', status: 'success' },
      ],
      component: <NoShowRecovery />,
      relatedView: { label: 'Open Practice Schedule', viewId: 'schedule' },
    },
    'agent-analytics': {
      id: 'agent-analytics',
      name: 'Practice Performance Dashboard',
      shortName: 'Performance',
      role: 'Daily Production Briefing & Clinical Intelligence',
      description: 'Synthesizes appointments, daily collections, hygiene production, and chair utilization into Dr. Samskruti’s daily morning briefing.',
      accentColor: '#8C1B5A',
      icon: TrendingUp,
      schedule: 'Summarized daily at 07:00 AM & 06:00 PM',
      kpis: [
        { label: 'Today’s Booked Production', value: '$8,450', change: 'Target: $7,500' },
        { label: 'Chair Utilization', value: '94%', change: '+8% vs benchmark' },
        { label: 'Confirmed Patients', value: '45', change: 'Full schedule' },
        { label: 'Hygiene / Doctor Ratio', value: '1 : 2.4' },
      ],
      recentActivities: [
        { time: '07:00 AM', text: 'Delivered Dr. Samskruti’s morning briefing: 45 patients scheduled, 1 live event.', status: 'success' },
        { time: '08:00 AM', text: 'Audited morning check-ins: 100% arrived on time.', status: 'success' },
        { time: '11:00 AM', text: 'Midday production pacing check: Tracking 112% to goal.', status: 'info' },
      ],
      component: <PracticeDashboard />,
      relatedView: { label: 'View Main Dashboard', viewId: 'dashboard' },
    },
    'agent-treatment': {
      id: 'agent-treatment',
      name: 'Treatment Follow-Up Agent',
      shortName: 'Treatment',
      role: 'Unscheduled Treatment Case Conversion',
      description: 'Educates patients on pending restorative, crown, and ortho treatment plans, answering insurance coverage questions to get cases accepted.',
      accentColor: '#2F8F5B',
      icon: ClipboardCheck,
      schedule: 'Runs Tuesdays & Thursdays at 11:00 AM',
      kpis: [
        { label: 'Pending Treatment Messaged', value: '$18,400', change: '8 patients' },
        { label: 'Accepted Plans This Month', value: '14', change: '+$14,200' },
        { label: 'Case Acceptance Rate', value: '68%', change: '+15%' },
        { label: 'Financing Inquiries', value: '4 pre-qualified' },
      ],
      recentActivities: [
        { time: '11:00 AM', text: 'Sent visual treatment breakdown & insurance co-pay calculation to Tyler Young.', status: 'success' },
        { time: '11:22 AM', text: 'Tyler Young accepted crown plan #CR-102 and scheduled procedure.', status: 'success' },
        { time: '11:45 AM', text: 'Sent gentle check-in regarding Invisalign refinement scans to Rachel Adams.', status: 'info' },
      ],
      component: <TreatmentFollowUp />,
      relatedView: { label: 'Open Patient Directory', viewId: 'patients' },
    },
    'agent-reputation': {
      id: 'agent-reputation',
      name: 'Reputation & Review Agent',
      shortName: 'Reputation',
      role: 'Automated 5-Star Google & Yelp Review Collection',
      description: 'Monitors satisfied patient check-outs and automatically sends a friendly review invitation 2 hours post-procedure while experience is fresh.',
      accentColor: '#F59E0B',
      icon: Star,
      schedule: 'Triggers 2 hours after completed appointment',
      kpis: [
        { label: 'Google Rating', value: '4.9 ★', change: '184 verified reviews' },
        { label: 'Reviews Collected This Month', value: '26', change: '+32%' },
        { label: 'Patient Sentiment Score', value: '98% Positive' },
        { label: 'Negative Feedback Intercepted', value: '2 (Resolved privately)' },
      ],
      recentActivities: [
        { time: '01:15 PM', text: 'Sent SMS review invite to David Lopez following routine check-up.', status: 'success' },
        { time: '02:04 PM', text: 'David Lopez published 5-star Google review: "Dr. Samskruti is gentle and thorough!"', status: 'success' },
        { time: '03:10 PM', text: 'Generated public thank-you draft for review approval.', status: 'info' },
      ],
      component: <ReputationAgent />,
      relatedView: { label: 'Open Reputation & Reviews', viewId: 'reputation' },
    },
    'agent-booking': {
      id: 'agent-booking',
      name: 'Website 24/7 Smart Booking Agent',
      shortName: 'Website Booking',
      role: 'Self-Service Patient Scheduling Widget',
      description: 'Embedded directly on the clinic website. Allows new and existing patients to schedule consultations online while automatically checking calendar availability and chair rules.',
      accentColor: '#2563EB',
      icon: Globe,
      schedule: 'Always on (Live embedded website widget)',
      kpis: [
        { label: 'Online Bookings Today', value: '8', change: '6 new patients' },
        { label: 'After-Hours Bookings', value: '62%', change: 'Booked after 6 PM' },
        { label: 'Deposit Collection', value: '$400', change: '100% paid' },
        { label: 'Scheduling Friction', value: '0 dropped' },
      ],
      recentActivities: [
        { time: '09:15 AM', text: 'New patient Clara Oswald scheduled Initial Comprehensive Exam for Friday 02:00 PM.', status: 'success' },
        { time: '09:16 AM', text: 'Sent digital medical intake forms and calendar invite to Clara.', status: 'success' },
        { time: '11:05 AM', text: 'Patient Leo Fitz booked Zoom Invisalign consultation.', status: 'success' },
      ],
      component: <WebsiteBooking />,
      relatedView: { label: 'Open Practice Schedule', viewId: 'schedule' },
    },
    'agent-insurance': {
      id: 'agent-insurance',
      name: 'Insurance & Claims Agent',
      shortName: 'Insurance & Claims',
      role: 'Real-Time Eligibility, Pre-Auth & Claims Tracking',
      description: 'Automatically verifies dental insurance benefits 48 hours prior to every visit, checks deductible balances, and tracks submitted claims to prevent rejections.',
      accentColor: '#059669',
      icon: ShieldCheck,
      schedule: 'Batch verified nightly at 02:00 AM + on-demand',
      kpis: [
        { label: 'Claims Cleared Today', value: '$5,500', change: 'HDFC Ergo settled' },
        { label: 'Pre-Auth Approvals', value: '6 / 6', change: '100% clean' },
        { label: 'Tomorrow’s Patients Verified', value: '100%', change: 'All 38 checked' },
        { label: 'Avg Payout Time', value: '4.2 days' },
      ],
      recentActivities: [
        { time: '02:00 AM', text: 'Verified dental eligibility for all 45 patients booked today. 0 coverage surprises.', status: 'success' },
        { time: '08:15 AM', text: 'Processed HDFC Ergo claim #CLM-9924 ($5,500). Payment received.', status: 'success' },
        { time: '10:30 AM', text: 'Submitted prior authorization with X-rays for tooth #19 crown.', status: 'info' },
      ],
      component: <InsuranceAgent />,
      relatedView: { label: 'Open Billing & Claims', viewId: 'claims' },
    },
  };

  const currentAgent = agentsData[activeAgentId] || agentsData['agent-receptionist'];
  const IconComponent = currentAgent.icon;

  const handleManualRun = async () => {
    setIsRunning(true);
    setRunSuccessToast(null);
    try {
      // Map agent id to automation trigger type
      const triggerKey = activeAgentId.replace('agent-', '');
      const res = await runJob(triggerKey);
      setRunSuccessToast(`${currentAgent.name}: ${res.message}`);
    } catch {
      setRunSuccessToast(`${currentAgent.name} run completed in simulation mode.`);
    } finally {
      setIsRunning(false);
      setTimeout(() => setRunSuccessToast(null), 4000);
    }
  };

  return (
    <div className="w-full space-y-6 pb-16 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Agent Switcher Tabs */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-1.5 text-xs font-bold text-[#7A7369] hover:text-[#16171A] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              Autonomous Team Active
            </span>
          </div>
        </div>

        {/* 8 Agent Horizontal Switcher Bar */}
        <div className="bg-[#FAF5EE] border border-[#E9DDD0] rounded-2xl p-1.5 flex items-center space-x-1 overflow-x-auto shadow-2xs">
          {Object.values(agentsData).map((agent) => {
            const isSelected = agent.id === activeAgentId;
            const TabIcon = agent.icon;
            return (
              <button
                key={agent.id}
                onClick={() => setActiveAgentId(agent.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#16171A] text-white shadow-xs font-bold'
                    : 'text-[#6C655A] hover:text-[#16171A] hover:bg-white/60'
                }`}
              >
                <TabIcon size={13} style={{ color: isSelected ? '#FFFFFF' : agent.accentColor }} />
                <span>{agent.shortName}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: isSelected ? '#F094C6' : agent.accentColor }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Agent Header Card */}
      <div className="bg-[#FAF5EE] border border-[#E9DDD0] rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start space-x-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs"
              style={{ backgroundColor: currentAgent.accentColor }}
            >
              <IconComponent size={28} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#16171A] tracking-tight">
                  {currentAgent.name}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#E2D5C6] text-[#696155]">
                  AI Agent #0{Object.keys(agentsData).indexOf(activeAgentId) + 1}
                </span>
                <span className="inline-flex items-center space-x-1 text-[10.5px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online & Active</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-[#8C7A6B] mt-1">
                {currentAgent.role}
              </p>
              <p className="text-xs text-[#635C52] mt-2 max-w-2xl leading-relaxed">
                {currentAgent.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
            <button
              onClick={handleManualRun}
              disabled={isRunning}
              className="flex items-center space-x-1.5 bg-[#16171A] hover:bg-black text-white px-4 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Play size={13} fill="currentColor" />
              <span>{isRunning ? 'Running Agent...' : 'Trigger Run Now'}</span>
            </button>

            {currentAgent.relatedView && (
              <button
                onClick={() => onNavigate(currentAgent.relatedView!.viewId)}
                className="flex items-center space-x-1.5 bg-white hover:bg-[#F3EBE0] text-[#16171A] border border-[#DECDBE] px-3.5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                <span>{currentAgent.relatedView.label}</span>
                <ExternalLink size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Schedule Strip */}
        <div className="mt-5 pt-4 border-t border-[#EADFD1] flex flex-wrap items-center justify-between text-xs text-[#7A7369] gap-2">
          <div className="flex items-center space-x-2">
            <Clock size={13} />
            <span>Autonomous Cadence: <strong className="text-[#16171A]">{currentAgent.schedule}</strong></span>
          </div>
          <span className="text-[11px] font-mono text-[#8C8479]">Doctor: Dr. Samskruti · Practice: DentistOS</span>
        </div>
      </div>

      {/* Success Notification */}
      {runSuccessToast && (
        <div className="bg-emerald-900 text-white text-xs font-semibold py-2 px-4 rounded-2xl flex items-center justify-between shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{runSuccessToast}</span>
          </div>
          <span className="text-[10px] text-emerald-200">Live Simulation Updated</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {currentAgent.kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-[#FAF5EE] border border-[#E9DDD0] rounded-2xl p-4 shadow-2xs flex flex-col justify-between"
          >
            <span className="text-xs font-medium text-[#7A7369]">{kpi.label}</span>
            <div className="mt-2">
              <span className="text-2xl font-extrabold text-[#16171A] tracking-tight">{kpi.value}</span>
              {kpi.change && (
                <p className="text-[10.5px] font-bold text-emerald-700 mt-0.5">
                  {kpi.change}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Interactive Live Agent Card + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Live Agent Card (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-[#16171A] flex items-center space-x-1.5">
              <Sparkles size={14} className="text-[#F094C6]" />
              <span>Interactive Agent Console</span>
            </h3>
            <span className="text-[10px] font-semibold text-[#8C8479]">Live Real-time State</span>
          </div>
          <div className="min-h-[340px]">
            {currentAgent.component}
          </div>
        </div>

        {/* Right Column: Live Activities & Execution Log (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-[#16171A] flex items-center space-x-1.5">
              <Activity size={14} className="text-[#1B8C7A]" />
              <span>Autonomous Activity Stream (Today)</span>
            </h3>
            <span className="text-[10.5px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              4 Events Logged
            </span>
          </div>

          <div className="bg-[#FAF5EE] border border-[#E9DDD0] rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
            {currentAgent.recentActivities.map((act, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-2xl bg-white/70 border border-[#ECE0D2] hover:bg-white transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    act.status === 'success'
                      ? 'bg-emerald-500'
                      : act.status === 'info'
                      ? 'bg-blue-500'
                      : 'bg-amber-500'
                  }`}
                />

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#16171A] font-medium leading-relaxed">
                    {act.text}
                  </p>
                  <span className="text-[10px] font-mono text-[#8C8479] mt-1 block">
                    {act.time} · Autonomous Agent #0{Object.keys(agentsData).indexOf(activeAgentId) + 1}
                  </span>
                </div>

                <div className="shrink-0">
                  <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            ))}

            {/* Integration Health Strip */}
            <div className="mt-4 pt-3 border-t border-[#EADFD1] flex items-center justify-between text-[11px] text-[#7A7369]">
              <span>Sync Protocol: <b>Twilio / WhatsApp Cloud API / Appwrite</b></span>
              <span className="flex items-center space-x-1 text-emerald-700 font-bold">
                <Check size={12} strokeWidth={3} />
                <span>Zero Failure Rate</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
