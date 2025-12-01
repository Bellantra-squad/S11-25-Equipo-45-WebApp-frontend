import React, { useState, useEffect, useContext } from "react";
//import { useList, useCreate } from "@refinedev/core";
import {
  WhatsAppConversation,
  WhatsAppMessage,
} from "../../../interfaces/models/whatsapp.interface";
import { ConversationList } from "../components/ConversationList";
import { ChatWindow } from "../components/ChatWindow";
import { ColorModeContext } from "../../../contexts/color-mode";
import styles from "../index.module.css";

// Datos mock para demostración
const mockConversations: WhatsAppConversation[] = [
  {
    id: 1,
    contact: {
      id: 1,
      lead: 1,
      first_name: "María",
      last_name: "García",
      email: "maria@example.com",
      phone: "+54 11 2345-6789",
      whatsapp_number: "+54 11 2345-6789",
      position: "Gerente",
      department: "Ventas",
      is_primary: true,
      is_decision_maker: true,
      notes: "",
      tags: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    last_message: {
      id: 101,
      conversation_id: 1,
      sender_type: "contact",
      content: "Hola, quisiera saber más sobre sus servicios de CRM",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 5),
      updated_at: new Date(),
    },
    unread_count: 2,
    status: "active",
    assigned_agent_name: "Juan Pérez",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    contact: {
      id: 2,
      lead: 2,
      first_name: "Carlos",
      last_name: "López",
      email: "carlos@empresa.com",
      phone: "+54 11 3456-7890",
      whatsapp_number: "+54 11 3456-7890",
      position: "Director",
      department: "IT",
      is_primary: true,
      is_decision_maker: true,
      notes: "",
      tags: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    last_message: {
      id: 201,
      conversation_id: 2,
      sender_type: "agent",
      content: "Perfecto, te envío la propuesta por email",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2),
      updated_at: new Date(),
    },
    unread_count: 0,
    status: "active",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    contact: {
      id: 3,
      lead: 3,
      first_name: "Ana",
      last_name: "Martínez",
      email: "ana@startup.io",
      phone: "+54 11 4567-8901",
      whatsapp_number: "+54 11 4567-8901",
      position: "CEO",
      department: "Dirección",
      is_primary: true,
      is_decision_maker: true,
      notes: "",
      tags: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    last_message: {
      id: 301,
      conversation_id: 3,
      sender_type: "contact",
      content: "¿Tienen integración con WhatsApp Business API?",
      message_type: "text",
      status: "delivered",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24),
      updated_at: new Date(),
    },
    unread_count: 1,
    status: "active",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    contact: {
      id: 4,
      lead: 4,
      first_name: "Roberto",
      last_name: "Sánchez",
      email: "roberto@corp.com",
      phone: "+54 11 5678-9012",
      whatsapp_number: "+54 11 5678-9012",
      position: "CTO",
      department: "Tecnología",
      is_primary: true,
      is_decision_maker: false,
      notes: "",
      tags: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    last_message: {
      id: 401,
      conversation_id: 4,
      sender_type: "agent",
      content: "Gracias por contactarnos. ¿En qué podemos ayudarte?",
      message_type: "text",
      status: "sent",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      updated_at: new Date(),
    },
    unread_count: 0,
    status: "active",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 5,
    contact: {
      id: 5,
      lead: 5,
      first_name: "Laura",
      last_name: "Fernández",
      email: "laura@pyme.com",
      phone: "+54 11 6789-0123",
      whatsapp_number: "+54 11 6789-0123",
      position: "Propietaria",
      department: "General",
      is_primary: true,
      is_decision_maker: true,
      notes: "",
      tags: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    last_message: {
      id: 501,
      conversation_id: 5,
      sender_type: "contact",
      content: "Excelente, esperaré su llamada entonces 👍",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      updated_at: new Date(),
    },
    unread_count: 0,
    status: "archived",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const mockMessages: { [conversationId: number]: WhatsAppMessage[] } = {
  1: [
    {
      id: 1,
      conversation_id: 1,
      sender_type: "contact",
      content: "Hola, buenas tardes",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60),
      updated_at: new Date(),
    },
    {
      id: 2,
      conversation_id: 1,
      sender_type: "agent",
      content:
        "¡Hola María! Buenas tardes, bienvenida a nuestro servicio de atención.",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 55),
      updated_at: new Date(),
    },
    {
      id: 3,
      conversation_id: 1,
      sender_type: "agent",
      content: "¿En qué podemos ayudarte hoy?",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 54),
      updated_at: new Date(),
    },
    {
      id: 4,
      conversation_id: 1,
      sender_type: "contact",
      content:
        "Estoy buscando una solución CRM para mi empresa, somos una pyme de 50 empleados",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 45),
      updated_at: new Date(),
    },
    {
      id: 5,
      conversation_id: 1,
      sender_type: "agent",
      content:
        "¡Perfecto! Tenemos planes especiales para pymes. Nuestro sistema incluye gestión de contactos, seguimiento de leads, integración con WhatsApp y mucho más.",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 40),
      updated_at: new Date(),
    },
    {
      id: 6,
      conversation_id: 1,
      sender_type: "contact",
      content: "¿Tienen alguna demo disponible?",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 30),
      updated_at: new Date(),
    },
    {
      id: 7,
      conversation_id: 1,
      sender_type: "agent",
      content:
        "¡Por supuesto! Puedo agendarte una demo personalizada. ¿Qué día te vendría bien?",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 25),
      updated_at: new Date(),
    },
    {
      id: 8,
      conversation_id: 1,
      sender_type: "contact",
      content: "Hola, quisiera saber más sobre sus servicios de CRM",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 5),
      updated_at: new Date(),
    },
  ],
  2: [
    {
      id: 201,
      conversation_id: 2,
      sender_type: "contact",
      content: "Buenos días, necesito información sobre precios",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 3),
      updated_at: new Date(),
    },
    {
      id: 202,
      conversation_id: 2,
      sender_type: "agent",
      content:
        "Buenos días Carlos! Nuestros planes comienzan desde $99/mes para equipos pequeños.",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
      updated_at: new Date(),
    },
    {
      id: 203,
      conversation_id: 2,
      sender_type: "contact",
      content: "Interesante, ¿pueden enviarme una propuesta formal?",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2.3),
      updated_at: new Date(),
    },
    {
      id: 204,
      conversation_id: 2,
      sender_type: "agent",
      content: "Perfecto, te envío la propuesta por email",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2),
      updated_at: new Date(),
    },
  ],
  3: [
    {
      id: 301,
      conversation_id: 3,
      sender_type: "contact",
      content: "Hola! Vi su página web y me interesó el producto",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 25),
      updated_at: new Date(),
    },
    {
      id: 302,
      conversation_id: 3,
      sender_type: "agent",
      content: "¡Hola Ana! Gracias por tu interés. ¿Qué te gustaría saber?",
      message_type: "text",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24.5),
      updated_at: new Date(),
    },
    {
      id: 303,
      conversation_id: 3,
      sender_type: "contact",
      content: "¿Tienen integración con WhatsApp Business API?",
      message_type: "text",
      status: "delivered",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24),
      updated_at: new Date(),
    },
  ],
};

export default function WhatsAppListPage() {
  const { mode } = useContext(ColorModeContext);
  const [selectedConversation, setSelectedConversation] =
    useState<WhatsAppConversation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");
  const [conversations, setConversations] =
    useState<WhatsAppConversation[]>(mockConversations);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  //Todo : Implementar el setLoading con el backend andando
  const [loading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Todo: usar cuando conectes con el backend real
  // const { data: conversationsData, isLoading } = useList<WhatsAppConversation>({
  //   resource: "whatsapp-conversations",
  //   pagination: { pageSize: 50 },
  //   sorters: [{ field: "updated_at", order: "desc" }],
  // });

  // const { mutate: sendMessage } = useCreate<WhatsAppMessage>();

  useEffect(() => {
    if (selectedConversation) {
      setMessagesLoading(true);
      // Simular carga de mensajes
      setTimeout(() => {
        setMessages(mockMessages[selectedConversation.id] || []);
        setMessagesLoading(false);
      }, 300);
    }
  }, [selectedConversation]);

  const handleSelectConversation = (conversation: WhatsAppConversation) => {
    setSelectedConversation(conversation);
    // Marcar como leídos
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversation.id ? { ...c, unread_count: 0 } : c
      )
    );
  };

  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return;

    const newMessage: WhatsAppMessage = {
      id: Date.now(),
      conversation_id: selectedConversation.id,
      sender_type: "agent",
      content,
      message_type: "text",
      status: "sent",
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Agregar mensaje localmente
    setMessages((prev) => [...prev, newMessage]);

    // Actualizar última conversación
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedConversation.id
          ? { ...c, last_message: newMessage, updated_at: new Date() }
          : c
      )
    );

    // Simular cambio de estado del mensaje
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === newMessage.id ? { ...m, status: "delivered" } : m
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: "read" } : m))
      );
    }, 2500);

    // Todo: enviar al backend real
    // sendMessage({
    //   resource: "whatsapp-messages",
    //   values: {
    //     conversation_id: selectedConversation.id,
    //     content,
    //     message_type: "text",
    //   },
    // });
  };

  return (
    <div className={`${styles.whatsappContainer} ${styles[mode]}`}>
      <ConversationList
        conversations={conversations}
        loading={loading}
        selectedConversationId={selectedConversation?.id ?? null}
        onSelectConversation={handleSelectConversation}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filter={filter}
        onFilterChange={setFilter}
      />

      <ChatWindow
        conversation={selectedConversation}
        messages={messages}
        loading={messagesLoading}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
