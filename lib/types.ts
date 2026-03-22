import { Role, TicketStatus, PriorityAI, AreaAI, SentimentAI } from "../app/generated/prisma/client";

export { Role, TicketStatus, PriorityAI, AreaAI, SentimentAI };

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  portal_id?: string | null;
  created_at: Date;
}

export interface Portal {
  id: string;
  name: string;
  url?: string | null;
  ip_address?: string | null;
  created_at: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority_ai?: PriorityAI | null;
  area_ai?: AreaAI | null;
  sentiment_ai?: SentimentAI | null;
  portal_id: string;
  client_id: string;
  assigned_dev_id?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: string;
  content: string;
  ticket_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Attachment {
  id: string;
  file_url: string;
  file_type: string;
  ticket_id: string;
  uploaded_at: Date;
}

export interface Deployment {
  id: string;
  version: string;
  status: 'success' | 'failure' | 'in_progress';
  portal_id: string;
  created_at: Date;
}

export interface ErrorLog {
  id: string;
  message: string;
  stack_trace?: string | null;
  severity: 'low' | 'medium' | 'high' | 'critical';
  portal_id: string;
  created_at: Date;
}

// Navigation and UI Types
export type NavigationSection =
  | 'overview'
  | 'incidents'
  | 'deployments'
  | 'performance'
  | 'errors'
  | 'sla'
  | 'oncall'
  | 'services'
  | 'postmortems'
  | 'settings';

export interface NavigationItem {
  id: NavigationSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}
