import { Contact } from "./contact.interface";

export interface WhatsAppMessage {
  id: number;
  conversation_id: number;
  sender_type: "agent" | "contact"; // 'agent' = nosotros, 'contact' = cliente
  content: string;
  message_type: "text" | "image" | "audio" | "video" | "document" | "location";
  media_url?: string;
  status: "sent" | "delivered" | "read" | "failed";
  created_at: Date;
  updated_at: Date;
}

export interface WhatsAppConversation {
  id: number;
  contact: Contact;
  last_message?: WhatsAppMessage;
  unread_count: number;
  status: "active" | "archived" | "blocked";
  assigned_agent_id?: number;
  assigned_agent_name?: string;
  created_at: Date;
  updated_at: Date;
}

export interface PaginationWhatsAppConversation {
  count: number;
  next: string | null;
  previous: string | null;
  results: WhatsAppConversation[];
}

export interface PaginationWhatsAppMessage {
  count: number;
  next: string | null;
  previous: string | null;
  results: WhatsAppMessage[];
}

export interface SendMessageRequest {
  conversation_id: number;
  content: string;
  message_type: "text" | "image" | "audio" | "video" | "document" | "location";
  media_url?: string;
}

