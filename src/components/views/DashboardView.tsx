import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  FileSpreadsheet,
  Plus,
  Stethoscope,
  Video,
  FileText,
  Activity,
  ChevronDown,
  Sparkles,
  Syringe,
} from 'lucide-react';
import { INITIAL_PATIENTS, PatientItem, TimelineEvent } from '../../lib/mockData';
import { AddEventModal } from '../AddEventModal';

// AI Agent cards
import { ReEngagementAgent } from '../agents/ReEngagementAgent';
import { AIReceptionist } from '../agents/AIReceptionist';
import { NoShowRecovery } from '../agents/NoShowRecovery';
import { PracticeDashboard } from '../agents/PracticeDashboard';
import { TreatmentFollowUp } from '../agents/TreatmentFollowUp';
import { ReputationAgent } from '../agents/ReputationAgent';
import { WebsiteBooking } from '../agents/WebsiteBooking';
import { InsuranceAgent } from '../agents/InsuranceAgent';

interface DashboardViewProps {
  onNavigateToSchedule?: () => void;
}

export function DashboardView({ onNavigateToSchedule }: DashboardViewProps) {
  const [patients] = useState<PatientItem[]>(INITIAL_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(INITIAL_PATIENTS[0].id);
  const [isAddEventOpen, setIsAddEventOpen] = useState<boolean>(false);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const scrollToAiAgents = () => {
    document.getElementById('ai-command-center')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full space-y-10 pb-16">
      {/* =========================================================================
          TOP SECTION: EXACT 1:1 MATCH OF REFERENCE DASHBOARD (INTELLY)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main Center Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          {/* Greeting */}
          <div className="pt-0.5">
            <h1 className="text-[26px] sm:text-[29px] font-bold text-[#16171A] tracking-tight leading-tight font-sans">
              Good morning, Dr.Samskruti
            </h1>
            <p className="text-[12.5px] text-[#7A7369] mt-0.5 leading-normal max-w-xl">
              DentistOS wishes you a good and productive day. 45 patients waiting for your treatment today. You also have one live event in your calendar today.
            </p>
          </div>

          {/* Stat Cards Header with "Show all …" link */}
          <div className="flex items-center justify-end -mb-1">
            <button
              onClick={scrollToAiAgents}
              className="text-[12px] font-bold text-[#16171A] hover:underline"
            >
              Show all …
            </button>
          </div>

          {/* 4 Pastel Cards in 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Yellow Patients Card */}
            <div className="relative bg-[#FEE488] rounded-[22px] p-4 overflow-hidden shadow-2xs border border-[#F4DC73] flex flex-col justify-between min-h-[160px]">
              {/* Plus Watermark Shape */}
              <div className="absolute top-1 right-2 text-[#E8CF6B]/40 pointer-events-none select-none">
                <svg width="74" height="74" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19z" />
                </svg>
              </div>

              <div>
                <h3 className="text-[13.5px] font-bold text-[#16171A] tracking-tight">Patients:</h3>
                <div className="flex items-baseline space-x-3 mt-1.5 text-[#16171A]">
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">14 pers</span>
                    <span className="text-[10px] font-medium text-[#655A46] ml-1">22-32 Y.O</span>
                  </div>
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">5 pers</span>
                    <span className="text-[10px] font-medium text-[#655A46] ml-1">32-45 Y.O</span>
                  </div>
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">2 pers</span>
                    <span className="text-[10px] font-medium text-[#655A46] ml-1">45+ Y.O</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart Visualization with Dotted Lines */}
              <div className="mt-3 pt-1">
                <div className="flex items-end justify-between px-3 h-12 relative">
                  {/* Dotted reference lines */}
                  <div className="absolute inset-x-3 top-0 bottom-0 flex justify-between pointer-events-none">
                    <div className="w-px h-full border-r border-dotted border-[#16171A]/20" />
                    <div className="w-px h-full border-r border-dotted border-[#16171A]/20" />
                    <div className="w-px h-full border-r border-dotted border-[#16171A]/20" />
                    <div className="w-px h-full border-r border-dotted border-[#16171A]/20" />
                    <div className="w-px h-full border-r border-dotted border-[#16171A]/20" />
                  </div>

                  {/* Vertical rounded bars */}
                  <div className="w-[9px] bg-[#16171A] rounded-full h-[45%] z-10" />
                  <div className="w-[9px] bg-[#16171A] rounded-full h-[78%] z-10" />
                  <div className="w-[9px] bg-[#16171A] rounded-full h-[32%] z-10" />
                  <div className="w-[9px] bg-[#16171A] rounded-full h-[95%] z-10" />
                  <div className="w-[9px] bg-[#16171A] rounded-full h-[58%] z-10" />
                </div>
                <div className="flex justify-between px-1 text-[9.5px] font-bold text-[#554A36] mt-1">
                  <span>07:30 p.m</span>
                  <span>12:00 p.m</span>
                </div>
              </div>
            </div>

            {/* 2. Pink Visits Summary Card */}
            <div className="relative bg-[#F8C0E2] rounded-[22px] p-4 overflow-hidden shadow-2xs border border-[#F0B3DA] flex flex-col justify-between min-h-[160px]">
              {/* Heart Watermark Shape */}
              <div className="absolute top-1 right-2 text-[#E7A3CE]/45 pointer-events-none select-none">
                <svg width="74" height="74" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <div>
                <h3 className="text-[13.5px] font-bold text-[#16171A] tracking-tight">Visits summary:</h3>
                <div className="flex items-baseline space-x-3 mt-1.5 text-[#16171A]">
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">24 min</span>
                    <span className="text-[9px] font-bold text-[#6D4960] ml-1 uppercase">AVERAGE</span>
                  </div>
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">15 min</span>
                    <span className="text-[9px] font-bold text-[#6D4960] ml-1 uppercase">MINIMUM</span>
                  </div>
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">01:30 h</span>
                    <span className="text-[9px] font-bold text-[#6D4960] ml-1 uppercase">MAXIMUM</span>
                  </div>
                </div>
              </div>

              {/* Peak Wave Chart with Peak Point at 12:00 */}
              <div className="mt-2 relative">
                <div className="h-12 relative w-full flex items-end">
                  <svg className="w-full h-11 overflow-visible" viewBox="0 0 240 45">
                    <path
                      d="M 0 32 Q 25 35 45 28 T 90 28 T 135 7 T 170 30 T 215 22 T 240 25"
                      fill="none"
                      stroke="#16171A"
                      strokeWidth="1.8"
                    />
                    {/* Peak Dot & Dotted Line */}
                    <circle cx="135" cy="7" r="3" fill="#16171A" />
                    <line x1="135" y1="7" x2="135" y2="44" stroke="#16171A" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div className="flex justify-between text-[9px] font-semibold text-[#6A475D] mt-0.5">
                  <span>10:30</span>
                  <span>11:00</span>
                  <span>11:30</span>
                  <span className="font-extrabold text-[#16171A]">12:00</span>
                  <span>12:30</span>
                  <span>13:00</span>
                  <span>13:30</span>
                </div>
              </div>
            </div>

            {/* 3. Olive Green By Condition Card */}
            <div className="relative bg-[#AACB77] rounded-[22px] p-4 overflow-hidden shadow-2xs border border-[#9DC069] flex flex-col justify-between min-h-[135px]">
              {/* Rotated Diamond / Leaf Watermark Shape */}
              <div className="absolute top-1 right-2 text-[#95BB5E]/40 pointer-events-none select-none">
                <svg width="74" height="74" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 12l10 10 10-10L12 2z" />
                </svg>
              </div>

              <div>
                <h3 className="text-[13.5px] font-bold text-[#16171A] tracking-tight">By condition:</h3>
                <div className="flex items-baseline space-x-3 mt-2 text-[#16171A]">
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">14 pers</span>
                    <span className="text-[9.5px] font-bold text-[#455B27] ml-1 uppercase">STABLE</span>
                  </div>
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">5 pers</span>
                    <span className="text-[9.5px] font-bold text-[#455B27] ml-1 uppercase">FAIR</span>
                  </div>
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">1 pers</span>
                    <span className="text-[9.5px] font-bold text-[#455B27] ml-1 uppercase">CRITICAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Sky Blue Sessions Card */}
            <div className="relative bg-[#A2D2F7] rounded-[22px] p-4 overflow-hidden shadow-2xs border border-[#92C7F0] flex flex-col justify-between min-h-[135px]">
              {/* Starburst Watermark Shape */}
              <div className="absolute top-1 right-2 text-[#88BEEA]/40 pointer-events-none select-none">
                <svg width="74" height="74" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l3 7 7-3-3 7 7 3-7 3 3 7-7-3-3 7-3-7-7 3 3-7-7-3 7-3-3-7 7 3z" />
                </svg>
              </div>

              <div>
                <h3 className="text-[13.5px] font-bold text-[#16171A] tracking-tight">Sessions:</h3>
                <div className="flex items-baseline space-x-3 mt-2 text-[#16171A]">
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">03:45 h</span>
                    <span className="text-[9.5px] font-bold text-[#355773] ml-1 uppercase">IN CLINIC</span>
                  </div>
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">02:00 min</span>
                    <span className="text-[9.5px] font-bold text-[#355773] ml-1 uppercase">VIDEO CALLS</span>
                  </div>
                  <div>
                    <span className="text-[16px] font-extrabold tracking-tight">00:24 min</span>
                    <span className="text-[9.5px] font-bold text-[#355773] ml-1 uppercase">IN CHAT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Two Cards: Patient's List & Visit Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {/* Left: Patient's List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[15px] font-bold text-[#16171A] tracking-tight">Patient's list</h3>
                <div className="flex items-center space-x-1 bg-[#16171A] text-white text-[10.5px] font-medium px-2.5 py-0.5 rounded-full shadow-2xs cursor-pointer">
                  <span>Today</span>
                  <ChevronDown size={11} />
                </div>
              </div>

              <div className="space-y-2">
                {patients.map((p) => {
                  const isSelected = p.id === selectedPatientId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPatientId(p.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-all text-left ${
                        isSelected
                          ? 'bg-[#FDEAF4] border border-[#F28DC4]/50 shadow-2xs'
                          : 'bg-[#F5ECE1] hover:bg-[#EFE4D6] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${p.avatarBg}`}
                        >
                          {p.avatarIcon === 'emergency' && (
                            <Activity size={16} className="text-[#16171A]" />
                          )}
                          {p.avatarIcon === 'stethoscope' && (
                            <Stethoscope size={16} className="text-[#16171A]" />
                          )}
                          {p.avatarIcon === 'video' && (
                            <Video size={16} className="text-[#16171A]" />
                          )}
                          {p.avatarIcon === 'report' && (
                            <FileText size={16} className="text-[#16171A]" />
                          )}
                        </div>
                        <div className="truncate">
                          <p className="text-[12.5px] font-bold text-[#16171A] truncate leading-tight">{p.name}</p>
                          <p className="text-[10.5px] font-medium text-[#7A7368] mt-0.5 truncate">{p.type}</p>
                        </div>
                      </div>

                      <div
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ml-2 ${
                          p.avatarIcon === 'report'
                            ? 'bg-[#D8ECC0] text-[#4A6822]'
                            : 'bg-[#DCEDFA] text-[#3B668B]'
                        }`}
                      >
                        {p.time}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Visit Details Card — EXACT MATCH in Solid Pastel Pink #F8C0E2 */}
            <div className="bg-[#F8C0E2] rounded-[22px] p-4.5 border border-[#F0B3DA] shadow-2xs flex flex-col justify-between space-y-3.5">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-bold text-[#16171A] tracking-tight">{selectedPatient.name}</h3>
                    <p className="text-[10.5px] font-medium text-[#69485E] mt-0.5">{selectedPatient.ageGender}</p>
                  </div>
                  <span className="text-[9.5px] font-bold font-mono text-[#16171A] bg-white/80 border border-white/60 px-2 py-0.5 rounded-full shadow-2xs">
                    {selectedPatient.code}
                  </span>
                </div>

                {/* Medical Tags (Fever, Caught, Heart Burn) */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="text-[10px] font-medium text-[#16171A] bg-[#F1A7D3]/40 border border-[#E899C5] px-2 py-0.5 rounded-full">
                    Fever
                  </span>
                  <span className="text-[10px] font-medium text-[#16171A] bg-[#F1A7D3]/40 border border-[#E899C5] px-2 py-0.5 rounded-full">
                    Caught
                  </span>
                  <span className="text-[10px] font-medium text-[#16171A] bg-[#F1A7D3]/40 border border-[#E899C5] px-2 py-0.5 rounded-full">
                    Heart Burn
                  </span>
                </div>

                {/* Last Checked */}
                <div className="mt-3.5 pt-2 border-t border-[#EEA7D2]/60">
                  <div className="flex items-start text-[10.5px]">
                    <span className="font-medium text-[#69485E] w-24 shrink-0">Last Checked</span>
                    <span className="text-[#16171A] font-medium flex-1">
                      Dr Everly on 21 April 2021
                      <span className="block text-[#2F6FE0] font-mono text-[10px] mt-0.5 underline cursor-pointer">
                        Prescription #2JPB3KTO
                      </span>
                    </span>
                  </div>
                </div>

                {/* Observation */}
                <div className="mt-2.5">
                  <div className="flex items-start text-[10.5px]">
                    <span className="font-medium text-[#69485E] w-24 shrink-0">Observation</span>
                    <span className="text-[#16171A] leading-snug flex-1">
                      High fever and cough at normal hemoglobin levels.
                    </span>
                  </div>
                </div>

                {/* Prescription */}
                <div className="mt-2.5">
                  <div className="flex items-start text-[10.5px]">
                    <span className="font-medium text-[#69485E] w-24 shrink-0">Prescription</span>
                    <span className="text-[#16171A] leading-snug whitespace-pre-line flex-1">
                      Paracetmol - 2 times a day{'\n'}Dizepam - Day and Night before meal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Calendar & Timeline Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-4 pt-1">
          {/* Calendar Header with Navigation */}
          <div className="flex items-center justify-between px-2">
            <button className="text-[#16171A] hover:text-black transition-colors font-bold text-sm">
              ←
            </button>
            <div className="bg-[#F8C0E2] text-[#16171A] text-xs font-bold px-4 py-1 rounded-full shadow-2xs">
              May 2024
            </div>
            <button className="text-[#16171A] hover:text-black transition-colors font-bold text-sm">
              →
            </button>
          </div>

          {/* Mini Calendar */}
          <div className="select-none px-1">
            {/* Days of Week */}
            <div className="grid grid-cols-8 gap-1 text-center text-[9.5px] font-bold text-[#7A7369] mb-1.5 uppercase">
              <span>MO</span>
              <span>TU</span>
              <span>WE</span>
              <span>TH</span>
              <span>FR</span>
              <span>SA</span>
              <span>SU</span>
              <span className="text-[9px] text-[#A69C90]">W#</span>
            </div>

            {/* Dates Grid */}
            <div className="space-y-1 text-center text-[10.5px] font-semibold text-[#16171A]">
              {/* Row 1 */}
              <div className="grid grid-cols-8 gap-1 items-center">
                <span className="text-transparent">0</span>
                <span className="text-transparent">0</span>
                <span className="text-transparent">0</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">1</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">2</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">3</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">4</span>
                <span className="text-[9px] text-[#A69C90]">W23</span>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-8 gap-1 items-center">
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">6</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">7</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">8</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">9</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">10</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">11</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">12</span>
                <span className="text-[9px] text-[#A69C90]">W24</span>
              </div>
              {/* Row 3 (15 is pink circle!) */}
              <div className="grid grid-cols-8 gap-1 items-center">
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">13</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">14</span>
                <span className="w-5 h-5 mx-auto rounded-full bg-[#F094C6] text-white font-bold flex items-center justify-center cursor-pointer shadow-2xs">
                  15
                </span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">16</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">17</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">18</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">19</span>
                <span className="text-[9px] text-[#A69C90]">W25</span>
              </div>
              {/* Row 4 */}
              <div className="grid grid-cols-8 gap-1 items-center">
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">20</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">21</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">22</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">23</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">24</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">25</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">26</span>
                <span className="text-[9px] text-[#A69C90]">W26</span>
              </div>
              {/* Row 5 */}
              <div className="grid grid-cols-8 gap-1 items-center">
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">27</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">28</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">29</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">30</span>
                <span className="py-0.5 cursor-pointer hover:bg-black/5 rounded-full">31</span>
                <span className="text-transparent">0</span>
                <span className="text-transparent">0</span>
                <span className="text-[9px] text-[#A69C90]">W27</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => setIsAddEventOpen(true)}
              className="flex-1 bg-[#16171A] hover:bg-black text-white py-2 rounded-full text-xs font-bold transition-all shadow-xs text-center"
            >
              Add event
            </button>
            <button
              className="w-8 h-8 rounded-full bg-[#F5ECE1] text-[#16171A] hover:bg-[#EFE4D6] flex items-center justify-center transition-colors shadow-2xs"
              title="Refresh timeline"
            >
              <RotateCw size={13} />
            </button>
            <button
              onClick={onNavigateToSchedule}
              className="w-8 h-8 rounded-full bg-[#F5ECE1] text-[#16171A] hover:bg-[#EFE4D6] flex items-center justify-center transition-colors shadow-2xs"
              title="Full Schedule & Agenda"
            >
              <FileSpreadsheet size={13} />
            </button>
          </div>

          {/* Today's Timeline Section */}
          <div className="pt-1">
            <h3 className="text-[17px] font-bold text-[#16171A]">May 15</h3>
            <div className="flex items-center justify-between text-[11px] font-medium text-[#7A7369] mt-1 pb-2 border-b border-[#EBE1D4]">
              <span>Time</span>
              <div className="flex items-center space-x-1">
                <span>Today's timeline</span>
                <div className="flex items-center space-x-0.5 bg-[#16171A] text-white text-[9.5px] px-2 py-0.5 rounded-full ml-1">
                  <span>All</span>
                  <ChevronDown size={10} />
                </div>
              </div>
            </div>

            {/* Timeline slots */}
            <div className="mt-3 space-y-2.5 relative">
              {/* Slot 1: 07:00 Emergency visit */}
              <div className="flex items-start space-x-2.5">
                <span className="text-[10px] font-semibold text-[#8C8479] w-8 shrink-0 pt-1">
                  07:00
                </span>
                <div className="flex-1 bg-[#F5ECE1] rounded-2xl p-2.5">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#F8C0E2] text-[#E26AA8] flex items-center justify-center shrink-0 mt-0.5">
                      <Stethoscope size={13} />
                    </div>
                    <div>
                      <p className="text-[11.5px] font-bold text-[#16171A] leading-tight">Emergency visit</p>
                      <p className="text-[9.5px] text-[#7A7268] mt-0.5">West camp, Room 312</p>
                      <p className="text-[9px] font-medium text-[#9E9588] mt-0.5">07:00 - 07:30</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slot 2: 07:30 Diagnostic test */}
              <div className="flex items-start space-x-2.5">
                <span className="text-[10px] font-semibold text-[#8C8479] w-8 shrink-0 pt-1">
                  07:30
                </span>
                <div className="flex-1 bg-[#F5ECE1] rounded-2xl p-2.5">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#A2D2F7] text-[#2C6EA8] flex items-center justify-center shrink-0 mt-0.5">
                      <Syringe size={13} />
                    </div>
                    <div>
                      <p className="text-[11.5px] font-bold text-[#16171A] leading-tight">Diagnostic test</p>
                      <p className="text-[9.5px] text-[#7A7268] mt-0.5">East camp, Laboratory, floor 5</p>
                      <p className="text-[9px] font-medium text-[#9E9588] mt-0.5">07:30 - 07:55</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slot 3: 08:00 Team daily planning (WITH LIVE 08:12 MARKER) */}
              <div className="flex items-start space-x-2.5 relative">
                {/* 08:12 Pink Badge and Dashed Line */}
                <div className="w-8 shrink-0 flex flex-col items-start pt-1">
                  <span className="text-[10px] font-semibold text-[#8C8479]">08:00</span>
                  <span className="bg-[#F094C6] text-white text-[8px] font-bold px-1 rounded-full mt-1">
                    08:12
                  </span>
                </div>

                <div className="flex-1 bg-[#F7F1DF] rounded-2xl p-2.5 border border-[#EADB9F]">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#FEE488] text-[#8C630D] flex items-center justify-center shrink-0 mt-0.5">
                      <UsersIcon size={13} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11.5px] font-bold text-[#16171A] leading-tight">Team daily planning</p>
                      <p className="text-[9.5px] text-[#7A7268] mt-0.5">East camp, Room 200</p>

                      <p className="text-[9px] font-medium text-[#7A7268] mt-1.5">Participants</p>
                      <div className="flex items-center space-x-0.5 mt-1">
                        <span className="w-4 h-4 rounded-full bg-[#82BAEC] text-white text-[7px] font-bold flex items-center justify-center">TY</span>
                        <span className="w-4 h-4 rounded-full bg-[#48B8A6] text-white text-[7px] font-bold flex items-center justify-center">AB</span>
                        <span className="w-4 h-4 rounded-full bg-[#3F9A6C] text-white text-[7px] font-bold flex items-center justify-center">NR</span>
                        <span className="w-4 h-4 rounded-full bg-[#2D734E] text-white text-[7px] font-bold flex items-center justify-center">TY</span>
                        <span className="w-4 h-4 rounded-full bg-[#F2BD35] text-white text-[7px] font-bold flex items-center justify-center">SS</span>
                        <span className="w-4 h-4 rounded-full bg-[#EAB127] text-white text-[7px] font-bold flex items-center justify-center">+3</span>
                      </div>
                      <p className="text-[9px] font-medium text-[#9E9588] mt-1.5">08:00 - 09:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slot 4: 09:00 Emergency visit */}
              <div className="flex items-start space-x-2.5">
                <span className="text-[10px] font-semibold text-[#8C8479] w-8 shrink-0 pt-1">
                  09:00
                </span>
                <div className="flex-1 bg-[#F5ECE1] rounded-2xl p-2.5">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#F8C0E2] text-[#E26AA8] flex items-center justify-center shrink-0 mt-0.5">
                      <Stethoscope size={13} />
                    </div>
                    <div>
                      <p className="text-[11.5px] font-bold text-[#16171A] leading-tight">Emergency visit</p>
                      <p className="text-[9.5px] text-[#7A7268] mt-0.5">West camp, Room 312</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View all details bottom button */}
            <div className="pt-3">
              <button
                onClick={onNavigateToSchedule}
                className="w-full py-2.5 bg-[#16171A] hover:bg-black text-white text-xs font-bold rounded-full transition-colors shadow-2xs text-center"
              >
                View all details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM SECTION: AI AUTONOMOUS PRACTICE COMMAND CENTER
          (Scrollable directly underneath as requested by the user!)
         ========================================================================= */}
      <div id="ai-command-center" className="pt-10 border-t border-[#E8DDCE]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#16171A] text-[#F094C6] text-xs font-bold mb-2 shadow-2xs">
              <Sparkles size={13} />
              <span>AI Autonomous Command Center</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#16171A] tracking-tight">
              Here's everything your AI team took off your plate today.
            </h2>
            <p className="text-sm text-[#7A746B] mt-1.5 max-w-2xl">
              Eight specialized agents, quietly working the phones, WhatsApp outreach, no-show backfill, and billing recovery so your practice runs like clockwork.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs font-semibold text-[#16171A] bg-[#AACB77]/30 border border-[#AACB77] px-3.5 py-1.5 rounded-full flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2F8F5B] animate-pulse" />
              <span>8 Agents Live & Active</span>
            </span>
          </div>
        </div>

        {/* 8 AI Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 auto-rows-[minmax(310px,1fr)]">
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

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onAddEvent={(newEvent) => {
          // Handled
        }}
      />
    </div>
  );
}

function UsersIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
