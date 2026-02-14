export interface Project {
  id: string;
  title: string;
  category: 'LIVE' | 'TEMPLATE';
  description: string;
  techStack: string[];
  imageUrl: string;
  clientId?: string;
  role?: string;
  timestamp?: string;
  order?: number;
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