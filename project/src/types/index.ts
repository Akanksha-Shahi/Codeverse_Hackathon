export interface User {
  id: string;
  username: string;
  role: 'COMMANDER' | 'FIELD_AGENT';
  name: string;
  avatar?: string;
  lastActive: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'ACTIVE' | 'RESOLVED' | 'INVESTIGATING';
  timestamp: string;
  location?: string;
  assignedTo?: string;
  solution?: string;
  reportedBy?: string;
  type: 'SECURITY' | 'CYBER' | 'PHYSICAL' | 'SURVEILLANCE' | 'COMMUNICATION' | 'OTHER';
}

export interface ThreatLocation {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  timestamp: string;
  status: 'ACTIVE' | 'CONTAINED' | 'RESOLVED';
  type: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  senderRole: 'COMMANDER' | 'FIELD_AGENT';
  type: 'TEXT' | 'IMAGE' | 'FILE' | 'AUDIO';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  type: 'MISSION' | 'TRAINING' | 'MEETING' | 'MAINTENANCE';
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  available: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'THREAT_UPLOADED' | 'STATUS_UPDATED' | 'MISSION_ASSIGNED' | 'SYSTEM_ALERT';
  timestamp: string;
  isRead: boolean;
  targetRole?: 'COMMANDER' | 'FIELD_AGENT' | 'ALL';
}

export interface AnalyticsData {
  totalIncidents: number;
  resolvedPercentage: number;
  activeThreats: number;
  criticalAlerts: number;
  incidentsByType: Array<{ name: string; value: number; color: string }>;
  incidentsByPriority: Array<{ name: string; value: number; color: string }>;
  threatLocations: Array<{ x: number; y: number; intensity: number }>;
  timelineData: Array<{ date: string; incidents: number; resolved: number }>;
}