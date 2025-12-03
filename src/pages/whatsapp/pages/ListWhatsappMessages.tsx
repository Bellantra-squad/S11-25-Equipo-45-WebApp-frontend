import React, { useState, useEffect, useContext, useCallback, useMemo, useRef } from "react";
import { useList } from "@refinedev/core";
import { message as antdMessage } from "antd";
import {
  WhatsAppConversation,
  WhatsAppConversationWithContact,
  WhatsAppMessage,
} from "../../../interfaces/models/whatsapp.interface";
import { Contact } from "../../../interfaces/models/contact.interface";
import { ConversationList } from "../components/ConversationList";
import { ChatWindow } from "../components/ChatWindow";
import { ColorModeContext } from "../../../contexts/color-mode";
import { useWhatsAppMessageListener } from "../../../hooks/useWebSocket";
import { httpApi } from "../../../refine/api/httpApi";
import styles from "../index.module.css";

export default function WhatsAppListPage() {
  const { mode } = useContext(ColorModeContext);
  const [selectedConversation, setSelectedConversation] =
    useState<WhatsAppConversationWithContact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");
  const [conversations, setConversations] = useState<WhatsAppConversationWithContact[]>([]);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 900);
  const [processingConversations, setProcessingConversations] = useState(false);

  // Refs para mantener valores actualizados en callbacks
  const selectedConversationRef = useRef(selectedConversation);
  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  // Obtener conversaciones del backend filtradas por canal whatsapp
  const { result: conversationsResult, query: conversationsQuery } = useList<WhatsAppConversation>({
    resource: "conversations",
    pagination: { pageSize: 50 },
    sorters: [{ field: "updated_at", order: "desc" }],
    filters: [{ field: "channel", operator: "eq", value: "whatsapp" }],
  });

  const conversationsData = useMemo(() => conversationsResult?.data ?? [], [conversationsResult]);
  const conversationsLoading = conversationsQuery.isLoading;
  const refetchConversations = conversationsQuery.refetch;

  // Función para obtener mensajes de una conversación
  const fetchMessages = useCallback(async (conversationId: number) => {
    setMessagesLoading(true);
    try {
      const response = await httpApi.get(`/conversations/${conversationId}/messages/`);
      // Los mensajes vienen en el formato del backend
      const messagesData: WhatsAppMessage[] = response.data.results || response.data;
      console.log("[WhatsApp] Mensajes cargados:", messagesData.length);
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
      antdMessage.error("Error al cargar los mensajes");
      setMessages([]);
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  // Callback para cuando llega un nuevo mensaje via WebSocket
  // Usa función simple sin parámetros ya que el hook usa refs internamente
  const handleNewMessage = useCallback(() => {
    console.log("[WhatsApp] 🔄 Refrescando por nuevo mensaje WebSocket");
    
    // Refetch conversaciones para actualizar unread_count y last_message
    refetchConversations();
    
    // Si hay una conversación seleccionada, refetch sus mensajes
    const currentConversation = selectedConversationRef.current;
    if (currentConversation) {
      console.log("[WhatsApp] 📩 Refrescando mensajes de conversación:", currentConversation.id);
      fetchMessages(currentConversation.id);
    }
  }, [refetchConversations, fetchMessages]);

  // Conectar al WebSocket para escuchar mensajes nuevos
  const { isConnected } = useWhatsAppMessageListener(handleNewMessage);

  // Log del estado de conexión WebSocket
  useEffect(() => {
    console.log("[WhatsApp] WebSocket conectado:", isConnected);
  }, [isConnected]);

  // Detectar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Procesar conversaciones del backend y obtener contactos
  useEffect(() => {
    const processConversations = async () => {
      if (!conversationsData || conversationsData.length === 0) {
        console.log("[WhatsApp] No hay datos de conversaciones");
        setConversations([]);
        return;
      }

      console.log("[WhatsApp] Procesando conversaciones:", conversationsData.length);
      setProcessingConversations(true);

      try {
        // Obtener IDs únicos de contactos que necesitamos cargar
        const contactIdsToFetch = new Set<number>();
        conversationsData.forEach((conv: WhatsAppConversation) => {
          if (typeof conv.contact === "number") {
            contactIdsToFetch.add(conv.contact);
          }
        });

        console.log("[WhatsApp] Contactos a cargar:", Array.from(contactIdsToFetch));

        // Cargar todos los contactos en paralelo
        const contactsMap = new Map<number, Contact>();
        
        if (contactIdsToFetch.size > 0) {
          const contactPromises = Array.from(contactIdsToFetch).map(async (contactId) => {
            try {
              const response = await httpApi.get(`/contacts/${contactId}/`);
              return { id: contactId, data: response.data as Contact };
            } catch (error) {
              console.error(`[WhatsApp] Error fetching contact ${contactId}:`, error);
              return { id: contactId, data: null };
            }
          });

          const contactResults = await Promise.all(contactPromises);
          contactResults.forEach((result) => {
            if (result.data) {
              contactsMap.set(result.id, result.data);
            }
          });
        }

        console.log("[WhatsApp] Contactos cargados:", contactsMap.size);

        // Procesar conversaciones con los contactos obtenidos
        const conversationsWithContacts: WhatsAppConversationWithContact[] = [];

        for (const conv of conversationsData) {
          let contact: Contact | null = null;

          if (typeof conv.contact === "number") {
            contact = contactsMap.get(conv.contact) || null;
          } else if (conv.contact && typeof conv.contact === "object") {
            contact = conv.contact as Contact;
          }

          // Si no hay contacto, omitir esta conversación
          if (!contact) {
            console.warn(`[WhatsApp] Conversación ${conv.id} sin contacto válido`);
            continue;
          }

          // Obtener el último mensaje de la conversación
          const lastMessage = conv.messages && conv.messages.length > 0
            ? conv.messages[conv.messages.length - 1]
            : undefined;

          conversationsWithContacts.push({
            ...conv,
            contact,
            last_message: lastMessage,
          });
        }

        console.log("[WhatsApp] Conversaciones procesadas:", conversationsWithContacts.length);
        setConversations(conversationsWithContacts);
      } catch (error) {
        console.error("[WhatsApp] Error procesando conversaciones:", error);
        antdMessage.error("Error al cargar las conversaciones");
      } finally {
        setProcessingConversations(false);
      }
    };

    processConversations();
  }, [conversationsData]);

  // Cargar mensajes cuando se selecciona una conversación
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    } else {
      setMessages([]);
    }
  }, [selectedConversation, fetchMessages]);

  const handleSelectConversation = (conversation: WhatsAppConversationWithContact) => {
    setSelectedConversation(conversation);
    // Actualizar unread_count localmente
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversation.id ? { ...c, unread_count: 0 } : c
      )
    );
  };

  // Función para volver a la lista en modo móvil
  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation || sendingMessage) return;

    setSendingMessage(true);

    // Crear mensaje optimista para mostrar inmediatamente
    const optimisticMessage: WhatsAppMessage = {
      id: Date.now(), // ID temporal
      conversation: selectedConversation.id,
      sender_type: "user",
      sender_id: "", // Se llenará con el ID del usuario actual
      content,
      message_type: "text",
      is_read: false,
      sent_at: new Date().toISOString(),
    };

    // Agregar mensaje optimista
    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      // Enviar mensaje al backend
      const response = await httpApi.post(
        `/conversations/${selectedConversation.id}/send_whatsapp/`,
        {
          content,
          message_type: "text",
        }
      );

      // Reemplazar mensaje optimista con el real del servidor
      const serverMessage: WhatsAppMessage = response.data;
      setMessages((prev) =>
        prev.map((m) => (m.id === optimisticMessage.id ? serverMessage : m))
      );

      // Actualizar last_message en la conversación
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversation.id
            ? { ...c, last_message: serverMessage, updated_at: new Date().toISOString() }
            : c
        )
      );
    } catch (error: unknown) {
      console.error("Error sending message:", error);
      
      // Remover mensaje optimista en caso de error
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id));
      
      // Mostrar error al usuario
      const axiosError = error as { response?: { data?: { error?: string } } };
      const errorMsg = axiosError?.response?.data?.error || "Error al enviar el mensaje";
      antdMessage.error(errorMsg);
    } finally {
      setSendingMessage(false);
    }
  };

  // Determinar si mostrar sidebar o chat en móvil
  const showSidebar = !isMobileView || !selectedConversation;
  const showChat = !isMobileView || selectedConversation;

  // Mostrar loading mientras se cargan o procesan conversaciones
  const isLoading = conversationsLoading || processingConversations;

  return (
    <div className={`${styles.whatsappContainer} ${styles[mode]}`}>
      {showSidebar && (
        <ConversationList
          conversations={conversations}
          loading={isLoading}
          selectedConversationId={selectedConversation?.id ?? null}
          onSelectConversation={handleSelectConversation}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
          onFilterChange={setFilter}
        />
      )}

      {showChat && (
        <ChatWindow
          conversation={selectedConversation}
          messages={messages}
          loading={messagesLoading}
          onSendMessage={handleSendMessage}
          onBack={isMobileView ? handleBackToList : undefined}
          isConnected={isConnected}
          isSending={sendingMessage}
        />
      )}
    </div>
  );
}
