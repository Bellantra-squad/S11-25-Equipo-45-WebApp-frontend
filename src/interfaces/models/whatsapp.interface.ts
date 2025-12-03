import { Contact } from "./contact.interface";

// Interfaz del usuario asignado
export interface AssignedUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

// Mensaje de WhatsApp - alineado con MessageSerializer del backend
export interface WhatsAppMessage {
  id: number;
  conversation?: number;
  sender_type: "user" | "contact"; // 'user' = nosotros, 'contact' = cliente
  sender_id?: string;
  content: string;
  message_type: "text" | "image" | "audio" | "video" | "document" | "location";
  external_message_id?: string;
  is_read: boolean;
  sent_at: string;
  delivered_at?: string | null;
  read_at?: string | null;
}

// Conversación de WhatsApp - alineado con ConversationSerializer del backend
export interface WhatsAppConversation {
  id: number;
  lead?: number | null;
  contact?: number | Contact | null;
  channel: "whatsapp" | "email" | "sms" | "other";
  subject?: string;
  status: "open" | "closed" | "pending";
  assigned_to?: AssignedUser | null;
  messages?: WhatsAppMessage[];
  messages_count?: number;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

// Conversación con contacto expandido para la UI
export interface WhatsAppConversationWithContact extends Omit<WhatsAppConversation, 'contact'> {
  contact: Contact;
  last_message?: WhatsAppMessage;
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
  content: string;
  message_type?: "text" | "image" | "audio" | "video" | "document" | "location";
}

// Evento de WebSocket para actividad de mensaje
export interface WebSocketActivityEvent {
  type: "activity_created" | "connection_established" | "pong" | "error";
  data?: {
    id: number;
    activity_type: string;
    description: string;
    metadata: {
      message_id?: string;
      channel?: string;
      message_type?: string;
      conversation_id?: number;
    };
    lead_id?: number;
    contact_id?: number;
    created_at: string;
  };
  message?: string;
  channel?: string;
}
