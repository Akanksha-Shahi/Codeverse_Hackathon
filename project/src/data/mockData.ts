import { Incident, ThreatLocation, ChatMessage, CalendarEvent, Contact } from '../types';

export const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Unauthorized Access Attempt',
    description: 'Multiple failed login attempts detected from external IP address. Potential brute force attack in progress.',
    priority: 'CRITICAL',
    status: 'ACTIVE',
    timestamp: '2024-01-15T14:30:00Z',
    location: 'Sector Alpha-7',
    assignedTo: 'Agent Rani',
    solution: 'IP blocked, additional security measures implemented',
    reportedBy: 'Agent Rani',
    type: 'CYBER'
  },
  {
    id: '2',
    title: 'Perimeter Breach Alert',
    description: 'Motion sensors triggered in restricted zone Delta. Security team dispatched for investigation.',
    priority: 'HIGH',
    status: 'INVESTIGATING',
    timestamp: '2024-01-15T13:45:00Z',
    location: 'Zone Delta-3',
    assignedTo: 'Security Team Alpha',
    reportedBy: 'Agent Rudra',
    type: 'PHYSICAL'
  },
  {
    id: '3',
    title: 'Communication System Anomaly',
    description: 'Intermittent signal interference detected on secure communication channels.',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    timestamp: '2024-01-15T12:15:00Z',
    location: 'Communications Hub',
    assignedTo: 'Tech Specialist Kirti',
    solution: 'Signal amplifier replaced, communication restored to normal levels',
    reportedBy: 'Agent Kirti',
    type: 'COMMUNICATION'
  },
  {
    id: '4',
    title: 'Suspicious Vehicle Spotted',
    description: 'Unidentified vehicle observed near checkpoint. License plate not in database.',
    priority: 'HIGH',
    status: 'ACTIVE',
    timestamp: '2024-01-15T15:20:00Z',
    location: 'Checkpoint Bravo',
    assignedTo: 'Agent Mitesh',
    reportedBy: 'Agent Vikas',
    type: 'SURVEILLANCE'
  },
  {
    id: '5',
    title: 'Equipment Malfunction',
    description: 'Radar system showing intermittent failures. Backup systems activated.',
    priority: 'MEDIUM',
    status: 'INVESTIGATING',
    timestamp: '2024-01-15T11:30:00Z',
    location: 'Control Tower',
    assignedTo: 'Tech Team Beta',
    reportedBy: 'Operator Veena',
    type: 'OTHER'
  }
];

export const mockThreatLocations: ThreatLocation[] = [
  {
    id: '1',
    name: 'Border Checkpoint Alpha',
    coordinates: { x: 150, y: 100 },
    threatLevel: 'CRITICAL',
    description: 'Suspicious vehicle detected approaching checkpoint',
    timestamp: '2024-01-15T14:25:00Z',
    status: 'ACTIVE',
    type: 'SURVEILLANCE'
  },
  {
    id: '2',
    name: 'Communications Tower Beta',
    coordinates: { x: 300, y: 180 },
    threatLevel: 'HIGH',
    description: 'Signal jamming equipment detected in vicinity',
    timestamp: '2024-01-15T13:50:00Z',
    status: 'CONTAINED',
    type: 'COMMUNICATION'
  },
  {
    id: '3',
    name: 'Supply Route Charlie',
    coordinates: { x: 450, y: 120 },
    threatLevel: 'MEDIUM',
    description: 'Unusual traffic patterns observed',
    timestamp: '2024-01-15T12:30:00Z',
    status: 'RESOLVED',
    type: 'PHYSICAL'
  },
  {
    id: '4',
    name: 'Facility Delta',
    coordinates: { x: 200, y: 250 },
    threatLevel: 'HIGH',
    description: 'Unauthorized personnel detected',
    timestamp: '2024-01-15T15:10:00Z',
    status: 'ACTIVE',
    type: 'SECURITY'
  },
  {
    id: '5',
    name: 'Sector Echo',
    coordinates: { x: 400, y: 300 },
    threatLevel: 'LOW',
    description: 'Minor equipment anomaly reported',
    timestamp: '2024-01-15T10:45:00Z',
    status: 'RESOLVED',
    type: 'OTHER'
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Commander Anil',
    message: 'All units report status for sector Alpha sweep.',
    timestamp: '2024-01-15T14:30:00Z',
    isRead: true,
    senderRole: 'COMMANDER',
    type: 'TEXT'
  },
  {
    id: '2',
    sender: 'Agent Rudra',
    message: 'Alpha-1 reporting all clear. Proceeding to checkpoint Beta.',
    timestamp: '2024-01-15T14:31:00Z',
    isRead: true,
    senderRole: 'FIELD_AGENT',
    type: 'TEXT'
  },
  {
    id: '3',
    sender: 'Agent Rani',
    message: 'Threat analysis complete for Zone Delta. Sending report now.',
    timestamp: '2024-01-15T14:32:00Z',
    isRead: false,
    senderRole: 'FIELD_AGENT',
    type: 'TEXT'
  },
  {
    id: '4',
    sender: 'Commander Anil',
    message: 'Shared tactical map for current operation',
    timestamp: '2024-01-15T14:33:00Z',
    isRead: true,
    senderRole: 'COMMANDER',
    type: 'IMAGE',
    fileName: 'tactical_map.jpg',
    fileUrl: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg'
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Operation Nightwatch',
    description: 'Perimeter security sweep and threat assessment',
    date: '2024-01-16',
    time: '02:00',
    priority: 'CRITICAL',
    type: 'MISSION',
    status: 'SCHEDULED'
  },
  {
    id: '2',
    title: 'Equipment Maintenance',
    description: 'Scheduled maintenance for communication systems',
    date: '2024-01-16',
    time: '10:00',
    priority: 'MEDIUM',
    type: 'MAINTENANCE',
    status: 'SCHEDULED'
  },
  {
    id: '3',
    title: 'Team Briefing',
    description: 'Weekly security briefing and status update',
    date: '2024-01-17',
    time: '09:00',
    priority: 'HIGH',
    type: 'MEETING',
    status: 'SCHEDULED'
  }
];

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Commander Trivedi',
    role: 'Operations Commander',
    department: 'Command Center',
    phone: '+1 (555) 0101',
    email: 'commander.trivedi@defense.mil',
    available: true
  },
  {
    id: '2',
    name: 'Agent Rani',
    role: 'Senior Field Agent',
    department: 'Field Operations',
    phone: '+1 (555) 0102',
    email: 'agent.rani@defense.mil',
    available: true
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    role: 'Threat Analyst',
    department: 'Intelligence',
    phone: '+1 (555) 0103',
    email: 'analyst.chen@defense.mil',
    available: false
  },
  {
    id: '4',
    name: 'Tech Sergeant David ',
    role: 'Communications Specialist',
    department: 'Technical Support',
    phone: '+1 (555) 0104',
    email: 'tech.david@defense.mil',
    available: true
  }
];