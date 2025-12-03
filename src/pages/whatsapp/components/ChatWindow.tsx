import React, { useState, useRef, useEffect } from "react";
import { Input, Avatar, Dropdown, Spin, Tooltip } from "antd";
import type { MenuProps } from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  SmileOutlined,
  PaperClipOutlined,
  AudioOutlined,
  SendOutlined,
  CheckOutlined,
  UserOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  ArrowLeftOutlined,
  WifiOutlined,
  DisconnectOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  WhatsAppConversationWithContact,
  WhatsAppMessage,
} from "../../../interfaces/models/whatsapp.interface";
import styles from "../index.module.css";

interface ChatWindowProps {
  conversation: WhatsAppConversationWithContact | null;
  messages: WhatsAppMessage[];
  loading: boolean;
  onSendMessage: (content: string) => void;
  onBack?: () => void;
  isConnected?: boolean;
  isSending?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  messages,
  loading,
  onSendMessage,
  onBack,
  isConnected = false,
  isSending = false,
}) => {
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (messageInput.trim() && !isSending) {
      onSendMessage(messageInput.trim());
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Usar sent_at del backend (string ISO) en lugar de created_at
  const formatMessageTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateDivider = (dateStr: string) => {
    const now = new Date();
    const messageDate = new Date(dateStr);
    const diff = now.getTime() - messageDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return "HOY";
    } else if (days === 1) {
      return "AYER";
    } else {
      return messageDate
        .toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .toUpperCase();
    }
  };

  // Estado del mensaje basado en is_read, delivered_at, read_at
  const getMessageStatus = (message: WhatsAppMessage): "sent" | "delivered" | "read" => {
    if (message.read_at) return "read";
    if (message.delivered_at) return "delivered";
    return "sent";
  };

  const getStatusIcon = (message: WhatsAppMessage) => {
    const status = getMessageStatus(message);
    switch (status) {
      case "sent":
        return <CheckOutlined className={styles.sent} />;
      case "delivered":
        return (
          <span className={styles.delivered}>
            <CheckOutlined />
            <CheckOutlined style={{ marginLeft: -8 }} />
          </span>
        );
      case "read":
        return (
          <span className={styles.read}>
            <CheckOutlined />
            <CheckOutlined style={{ marginLeft: -8 }} />
          </span>
        );
      default:
        return null;
    }
  };

  // Agrupar mensajes por fecha usando sent_at
  const groupMessagesByDate = (messages: WhatsAppMessage[]) => {
    const groups: { [key: string]: WhatsAppMessage[] } = {};

    messages.forEach((message) => {
      const date = new Date(message.sent_at).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const contactMenuItems: MenuProps["items"] = [
    { key: "info", label: "Info del contacto" },
    { key: "mute", label: "Silenciar notificaciones" },
    { key: "archive", label: "Archivar chat" },
    { key: "delete", label: "Eliminar chat" },
    { key: "block", label: "Bloquear" },
  ];

  // Empty state
  if (!conversation) {
    return (
      <div className={styles.chatPanel}>
        <div className={styles.chatPanelEmpty}>
          <svg viewBox="0 0 303 172" preserveAspectRatio="xMidYMid meet">
            <path
              fill="#364147"
              d="M229.565 160.229c32.647-10.984 57.366-41.988 53.825-86.81-5.381-68.1-71.025-84.335-111.49-81.467C113.005-4.258 79.903 22.382 61.921 42.381 23.694 84.377-.15 136.339 0 170.95l.003.057c.016.363-.146 1.753-.146 1.753S.77 174.77 3.134 175c0 0 .716.332 1.691.002z"
            />
            <path
              fill="#202c33"
              d="M188 155c0 10.493-8.507 19-19 19H59c-10.493 0-19-8.507-19-19V85c0-10.493 8.507-19 19-19h110c10.493 0 19 8.507 19 19v70z"
            />
            <path
              fill="#00a884"
              d="M130.92 90.664l-35.684 35.684c-1.562 1.562-4.095 1.562-5.657 0l-17.678-17.678c-1.562-1.562-1.562-4.095 0-5.657l5.657-5.657c1.562-1.562 4.095-1.562 5.657 0l9.192 9.192 27.198-27.198c1.562-1.562 4.095-1.562 5.657 0l5.657 5.657c1.563 1.562 1.563 4.095.001 5.657z"
            />
          </svg>
          <h2 className={styles.chatPanelEmptyTitle}>WhatsApp CRM</h2>
          <p className={styles.chatPanelEmptyText}>
            Envía y recibe mensajes de WhatsApp desde tu CRM.
            <br />
            Selecciona una conversación para comenzar.
          </p>
          <div style={{ marginTop: 16, fontSize: 12, color: "#8696a0" }}>
            <Tooltip title={isConnected ? "Conexión en tiempo real activa" : "Sin conexión en tiempo real"}>
              {isConnected ? (
                <span style={{ color: "#00a884" }}>
                  <WifiOutlined /> Conectado
                </span>
              ) : (
                <span style={{ color: "#f5222d" }}>
                  <DisconnectOutlined /> Desconectado
                </span>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className={styles.chatPanel}>
      {/* Header */}
      <div className={styles.chatHeader}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: "transparent",
              border: "none",
              color: "#aebac1",
              fontSize: 20,
              cursor: "pointer",
              padding: 8,
              marginRight: 8,
            }}
          >
            <ArrowLeftOutlined />
          </button>
        )}
        <Avatar
          size={40}
          style={{ backgroundColor: "#00a884", flexShrink: 0 }}
          icon={<UserOutlined />}
        >
          {conversation.contact.first_name.charAt(0)}
        </Avatar>

        <div className={styles.chatHeaderInfo}>
          <div className={styles.chatHeaderName}>
            {conversation.contact.first_name} {conversation.contact.last_name}
          </div>
          <div className={styles.chatHeaderStatus}>
            {conversation.contact.whatsapp_number}
            {isConnected && (
              <Tooltip title="Conexión en tiempo real activa">
                <WifiOutlined style={{ marginLeft: 8, color: "#00a884", fontSize: 12 }} />
              </Tooltip>
            )}
          </div>
        </div>

        <div className={styles.chatHeaderActions}>
          <button title="Llamar">
            <PhoneOutlined />
          </button>
          <button title="Videollamada">
            <VideoCameraOutlined />
          </button>
          <button title="Buscar">
            <SearchOutlined />
          </button>
          <Dropdown
            menu={{ items: contactMenuItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <button title="Más opciones">
              <MoreOutlined />
            </button>
          </Dropdown>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messagesContainer}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Spin size="large" />
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "#8696a0" }}>
            <p>No hay mensajes en esta conversación</p>
            <p style={{ fontSize: 12 }}>Envía un mensaje para comenzar</p>
          </div>
        ) : (
          Object.entries(messageGroups).map(([date, msgs]) => (
            <div key={date} className={styles.dateGroup}>
              <div className={styles.dateDivider}>
                <span className={styles.dateDividerLabel}>
                  {formatDateDivider(date)}
                </span>
              </div>

              {msgs.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.messageWrapper} ${
                    message.sender_type === "user"
                      ? styles.sent
                      : styles.received
                  }`}
                >
                  <div
                    className={`${styles.messageBubble} ${
                      message.sender_type === "user"
                        ? styles.sent
                        : styles.received
                    }`}
                  >
                    <span className={styles.messageContent}>
                      {message.content}
                    </span>
                    <span className={styles.messageFooter}>
                      <span className={styles.messageTime}>
                        {formatMessageTime(message.sent_at)}
                      </span>
                      {message.sender_type === "user" && (
                        <span
                          className={`${styles.messageStatus} ${styles[getMessageStatus(message)]}`}
                        >
                          {getStatusIcon(message)}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.inputContainer}>
        <div className={styles.inputActions}>
          <button title="Emoji">
            <SmileOutlined />
          </button>
          <button title="Adjuntar">
            <PaperClipOutlined />
          </button>
        </div>

        <div className={styles.messageInputWrapper}>
          <Input.TextArea
            placeholder="Escribe un mensaje"
            className={styles.messageInput}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyPress}
            autoSize={{ minRows: 1, maxRows: 4 }}
            disabled={isSending}
          />
        </div>

        <button
          className={`${styles.sendButton} ${messageInput.trim() && !isSending ? styles.active : ""}`}
          onClick={handleSend}
          disabled={isSending}
          title={isSending ? "Enviando..." : messageInput.trim() ? "Enviar mensaje" : "Mensaje de voz"}
        >
          {isSending ? (
            <LoadingOutlined />
          ) : messageInput.trim() ? (
            <SendOutlined />
          ) : (
            <AudioOutlined />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
