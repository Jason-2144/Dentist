export interface PatientItem {
  id: string;
  name: string;
  ageGender: string;
  code: string;
  type: string;
  time: string;
  avatarBg: string;
  avatarIcon: 'emergency' | 'stethoscope' | 'video' | 'report';
  tags: string[];
  lastCheckedDoctor: string;
  lastCheckedDate: string;
  prescriptionNo: string;
  observation: string;
  prescription: string;
}

export interface TimelineEvent {
  id: string;
  timeLabel: string;
  startTime: string;
  endTime: string;
  title: string;
  location: string;
  type: 'emergency' | 'diagnostic' | 'team' | 'video';
  iconColor: string;
  isLive?: boolean;
  participants?: string[];
  badgeColor?: string;
  fileAttachment?: string;
}

export interface ScheduleEvent {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  dateStr: string;
  startTime: string;
  endTime: string;
  timeSlot: string; // e.g. "07:00", "07:30", "08:00", "08:30", "09:00"
  title: string;
  location?: string;
  description?: string;
  type: 'emergency' | 'diagnostic' | 'video' | 'team' | 'followup' | 'intern' | 'article';
  bgClass: string;
  tag?: string;
  hasJoinButton?: boolean;
  participants?: string[];
  image?: string;
  attachment?: string;
  statusBadge?: string;
}

export const INITIAL_PATIENTS: PatientItem[] = [
  {
    id: 'p1',
    name: 'Taigo Wilkinson',
    ageGender: 'Male - 38 Years 5 Months',
    code: '1EG4-TE5-MK72',
    type: 'Emergency Visit',
    time: '09:15 AM',
    avatarBg: 'bg-[#F9C3E3]',
    avatarIcon: 'emergency',
    tags: ['Fever', 'Cough', 'Heart Burn'],
    lastCheckedDoctor: 'Dr Everly',
    lastCheckedDate: '21 April 2021',
    prescriptionNo: '#2JPB3KTO',
    observation: 'High fever and cough at normal hemoglobin levels.',
    prescription: 'Paracetamol - 2 times a day\nDiazepam - Day and Night before meal',
  },
  {
    id: 'p2',
    name: 'Samantha Williams',
    ageGender: 'Female - 29 Years 2 Months',
    code: '2KL9-PR4-AB11',
    type: 'Routine Check-Up',
    time: '09:15 AM',
    avatarBg: 'bg-[#A2D2F7]',
    avatarIcon: 'stethoscope',
    tags: ['Cleaning', 'Checkup', 'Teeth Whitening'],
    lastCheckedDoctor: 'Dr Sarah',
    lastCheckedDate: '12 Dec 2023',
    prescriptionNo: '#8KR799PA',
    observation: 'Mild plaque build-up on lower molars. Gingival tissues healthy and firm.',
    prescription: 'Chlorhexidine mouthwash - 2x daily for 7 days\nFluoride remineralizing paste nightly',
  },
  {
    id: 'p3',
    name: 'Amy White',
    ageGender: 'Female - 34 Years 8 Months',
    code: '7RT1-WQ8-MN45',
    type: 'Video Consultation',
    time: '09:15 AM',
    avatarBg: 'bg-[#F9DAEC]',
    avatarIcon: 'video',
    tags: ['Sensitivity', 'Post-Op', 'Consult'],
    lastCheckedDoctor: 'Dr Samskruti',
    lastCheckedDate: '10 May 2024',
    prescriptionNo: '#3TX110BC',
    observation: 'Patient reports mild sensitivity to cold liquids following filling replacement on #14.',
    prescription: 'Sensodyne Rapid Relief - twice daily\nIbuprofen 400mg as needed for discomfort',
  },
  {
    id: 'p4',
    name: 'Tyler Young',
    ageGender: 'Male - 42 Years 1 Month',
    code: '4PL3-ZX2-CD88',
    type: 'Report',
    time: '09:45 AM',
    avatarBg: 'bg-[#AACB77]',
    avatarIcon: 'report',
    tags: ['X-Ray', 'Crown', 'Lab Review'],
    lastCheckedDoctor: 'Dr Miller',
    lastCheckedDate: '02 May 2024',
    prescriptionNo: '#9ZX442AA',
    observation: 'Zirconia crown seated on tooth #19. Margins verified via bitewing radiograph.',
    prescription: 'Routine oral hygiene maintenance with soft bristled brush and daily flossing',
  },
];

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 't1',
    timeLabel: '07:00',
    startTime: '07:00',
    endTime: '07:30',
    title: 'Emergency visit',
    location: 'West camp, Room 312',
    type: 'emergency',
    iconColor: '#E26AA8',
  },
  {
    id: 't2',
    timeLabel: '07:30',
    startTime: '07:30',
    endTime: '07:55',
    title: 'Diagnostic test',
    location: 'East camp, Laboratory, floor 5',
    type: 'diagnostic',
    iconColor: '#4A90E2',
  },
  {
    id: 't3',
    timeLabel: '08:00',
    startTime: '08:00',
    endTime: '09:00',
    title: 'Team daily planning',
    location: 'East camp, Room 200',
    type: 'team',
    iconColor: '#E5A93C',
    isLive: true,
    badgeColor: '#FDE782',
    participants: ['TY', 'AB', 'NR', 'SS', '+3'],
  },
  {
    id: 't4',
    timeLabel: '09:00',
    startTime: '09:00',
    endTime: '09:30',
    title: 'Emergency visit',
    location: 'West camp, Room 312',
    type: 'emergency',
    iconColor: '#E26AA8',
  },
];

export const WEEKLY_SCHEDULE: ScheduleEvent[] = [
  // Monday 11/05
  {
    id: 's-m1',
    day: 'monday',
    dateStr: '11/05',
    timeSlot: '07:00',
    startTime: '07:00',
    endTime: '07:30',
    title: 'Emergency visit',
    location: 'West camp, Room 312',
    type: 'emergency',
    bgClass: 'bg-[#F5F2ED]',
  },
  {
    id: 's-m2',
    day: 'monday',
    dateStr: '11/05',
    timeSlot: '07:30',
    startTime: '07:30',
    endTime: '07:55',
    title: 'Diagnostic test',
    location: 'East camp, Laboratory',
    type: 'diagnostic',
    bgClass: 'bg-[#F5F2ED]',
  },
  {
    id: 's-m3',
    day: 'monday',
    dateStr: '11/05',
    timeSlot: '08:00',
    startTime: '08:00',
    endTime: '09:00',
    title: 'Team planning',
    location: 'East camp, Room 200',
    type: 'team',
    bgClass: 'bg-[#FDE782]',
    attachment: 'Agenda.pdf',
    participants: ['TY', 'AB', 'NR', 'SS', '+3'],
  },
  {
    id: 's-m4',
    day: 'monday',
    dateStr: '11/05',
    timeSlot: '09:00',
    startTime: '09:00',
    endTime: '09:30',
    title: 'Emergency visit',
    location: 'West camp, Room 312',
    type: 'emergency',
    bgClass: 'bg-[#F5F2ED]',
  },

  // Tuesday 12/05
  {
    id: 's-tu1',
    day: 'tuesday',
    dateStr: '12/05',
    timeSlot: '07:00',
    startTime: '07:00',
    endTime: '08:00',
    title: 'Online visit',
    location: 'West camp, Room 312',
    type: 'video',
    bgClass: 'bg-[#F5F2ED]',
    hasJoinButton: true,
    participants: ['TY'],
  },
  {
    id: 's-tu2',
    day: 'tuesday',
    dateStr: '12/05',
    timeSlot: '08:00',
    startTime: '08:00',
    endTime: '08:15',
    title: 'Diagnostic test',
    type: 'diagnostic',
    bgClass: 'bg-[#F5F2ED]',
  },
  {
    id: 's-tu3',
    day: 'tuesday',
    dateStr: '12/05',
    timeSlot: '08:30',
    startTime: '08:30',
    endTime: '09:00',
    title: 'Health systems …',
    description: 'Do you know how to optimally manage moderate to severe asthma in your patients?',
    tag: 'Clinical Immunology',
    type: 'article',
    bgClass: 'bg-[#F5F2ED]',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
  },

  // Wednesday 13/05
  {
    id: 's-w1',
    day: 'wednesday',
    dateStr: '13/05',
    timeSlot: '08:00',
    startTime: '09:00',
    endTime: '09:30',
    title: 'Follow-up',
    location: 'West camp, Room 312',
    type: 'followup',
    bgClass: 'bg-[#F5F2ED]',
  },
  {
    id: 's-w2',
    day: 'wednesday',
    dateStr: '13/05',
    timeSlot: '08:30',
    startTime: '08:30',
    endTime: '09:30',
    title: 'Interns visit',
    location: 'West camp, Conference room 404',
    type: 'intern',
    bgClass: 'bg-[#EBF2F7]',
    participants: ['TY', 'AB', 'NR', 'SS', '+12'],
  },
  {
    id: 's-w3',
    day: 'wednesday',
    dateStr: '13/05',
    timeSlot: '09:30',
    startTime: '09:40',
    endTime: '10:00',
    title: 'Emergency visit',
    location: 'West camp, Room 312',
    type: 'emergency',
    bgClass: 'bg-[#F5F2ED]',
  },

  // Thursday 14/05 (Active/Today column in screenshot)
  {
    id: 's-th1',
    day: 'thursday',
    dateStr: '14/05',
    timeSlot: '07:00',
    startTime: '07:00',
    endTime: '08:00',
    title: 'Online visit',
    location: 'West camp, Room 312',
    type: 'video',
    bgClass: 'bg-[#F5F2ED]',
    statusBadge: 'In progress...',
    participants: ['TY'],
  },
  {
    id: 's-th2',
    day: 'thursday',
    dateStr: '14/05',
    timeSlot: '08:00',
    startTime: '08:00',
    endTime: '09:30',
    title: 'Chronic Kidney...',
    description: 'What tools can you leverage to help maximize a co-management approach to caring for people with CKD',
    tag: 'Primary Care',
    type: 'article',
    bgClass: 'bg-[#EAF1F8]',
    hasJoinButton: true,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
  },

  // Friday 15/05
  {
    id: 's-f1',
    day: 'friday',
    dateStr: '15/05',
    timeSlot: '07:00',
    startTime: '07:00',
    endTime: '08:00',
    title: 'Team results',
    location: 'East camp, Room 200',
    type: 'team',
    bgClass: 'bg-[#FDE782]',
    attachment: 'Agenda.pdf',
    participants: ['TY', 'AB', 'NR', 'SS', '+3'],
  },
  {
    id: 's-f2',
    day: 'friday',
    dateStr: '15/05',
    timeSlot: '08:00',
    startTime: '07:00',
    endTime: '07:30',
    title: 'Emergency visit',
    location: 'West camp, Room 312',
    type: 'emergency',
    bgClass: 'bg-[#F5F2ED]',
  },
  {
    id: 's-f3',
    day: 'friday',
    dateStr: '15/05',
    timeSlot: '08:30',
    startTime: '07:30',
    endTime: '07:55',
    title: 'Diagnostic test',
    type: 'diagnostic',
    bgClass: 'bg-[#F5F2ED]',
  },
  {
    id: 's-f4',
    day: 'friday',
    dateStr: '15/05',
    timeSlot: '09:00',
    startTime: '08:30',
    endTime: '09:30',
    title: 'Interns visit',
    location: 'West camp, Conference room 404',
    type: 'intern',
    bgClass: 'bg-[#EBF2F7]',
    participants: ['TY', 'AB', 'NR', 'SS', '+12'],
  },

  // Saturday 16/05
  {
    id: 's-sa1',
    day: 'saturday',
    dateStr: '16/05',
    timeSlot: '08:00',
    startTime: '07:00',
    endTime: '08:00',
    title: 'Online visit',
    location: 'West camp, Room 312',
    type: 'video',
    bgClass: 'bg-[#F5F2ED]',
    hasJoinButton: true,
    participants: ['TY'],
  },
  {
    id: 's-sa2',
    day: 'saturday',
    dateStr: '16/05',
    timeSlot: '08:30',
    startTime: '09:00',
    endTime: '09:30',
    title: 'Follow-up',
    location: 'West camp, Room 312',
    type: 'followup',
    bgClass: 'bg-[#F5F2ED]',
  },
];
