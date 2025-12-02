/**
 * Interfaz para las métricas del dashboard
 * Basado en los endpoints de /api/docs/#/
 */

export interface DashboardMetrics {
  active_contacts: number;
  messages_sent: number;
  messages_received: number;
  response_rate: number;
  leads_by_status: LeadsByStatus[];
  conversion_rate: number;
  total_leads: number;
  converted_leads: number;
  recent_activities: number;
  pending_tasks: number;
  period_days: number;
}

export interface LeadsByStatus {
  status__name: string;
  count: number;
  status?: string;
  status_name?: string;
  percentage?: number;
}

export interface LeadsPerformance {
  period: string;
  won: number;
  lost: number;
  in_progress: number;
}

export interface AssignedUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface RecentTask {
  id: number;
  title: string;
  description?: string;
  lead: number;
  contact: number;
  assigned_to: AssignedUser | null;
  task_type: "follow_up" | "call" | "meeting" | "email" | "other";
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  due_date: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RecentMessage {
  id: number;
  contact_name: string;
  contact_avatar?: string;
  message_preview: string;
  channel: "whatsapp" | "email" | "chat";
  is_read: boolean;
  created_at: string;
}

export interface UpcomingEvent {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  event_type: "meeting" | "call" | "task" | "reminder";
  lead_id?: number;
  lead_name?: string;
}
