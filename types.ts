export interface Project {
  id: string;
  title: string;
  category: 'WEB' | 'AI' | '3D_ART' | 'SYSTEM';
  status: 'LIVE' | 'OFFLINE' | 'ARCHIVED' | 'ERROR' | 'DRAFT';
  description: string;
  techStack: string[];
  imageUrl: string;
  clientId?: string;
  role?: string;
  timestamp?: string;
}

export interface StatMetric {
  label: string;
  value: string;
  change?: string;
  trend: 'up' | 'down' | 'neutral';
  alert?: boolean;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
}