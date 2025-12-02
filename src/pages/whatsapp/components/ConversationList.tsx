import React from "react";
import { Input, Skeleton, Avatar, Badge } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { WhatsAppConversation } from "../../../interfaces/models/whatsapp.interface";
import styles from "../index.module.css";

interface ConversationListProps {
  conversations: WhatsAppConversation[];
  loading: boolean;
  selectedConversationId: number | null;
  onSelectConversation: (conversation: WhatsAppConversation) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filter: "all" | "unread" | "archived";
  onFilterChange: (filter: "all" | "unread" | "archived") => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  loading,
  selectedConversationId,
  onSelectConversation,
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diff = now.getTime() - messageDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return messageDate.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (days === 1) {
      return "Ayer";
    } else if (days < 7) {
      return messageDate.toLocaleDateString("es-ES", { weekday: "short" });
    } else {
      return messageDate.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      !searchTerm ||
      `${conv.contact.first_name} ${conv.contact.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      conv.contact.whatsapp_number.includes(searchTerm);

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && conv.unread_count > 0) ||
      (filter === "archived" && conv.status === "archived");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.sidebar}>
      {/* Header */}
      <div className={styles.sidebarHeader}>
        <Avatar
          size={40}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#00a884" }}
        />
        <div className={styles.sidebarHeaderActions}>
          <button title="Filtros">
            <FilterOutlined />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchContainer}>
        <Input
          prefix={<SearchOutlined style={{ color: "#8696a0" }} />}
          placeholder="Buscar o iniciar un nuevo chat"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          allowClear
        />
      </div>

      {/* Filter tabs */}
      <div className={styles.filterTabs}>
        <button
          className={`${styles.filterTab} ${filter === "all" ? styles.active : ""}`}
          onClick={() => onFilterChange("all")}
        >
          Todos
        </button>
        <button
          className={`${styles.filterTab} ${filter === "unread" ? styles.active : ""}`}
          onClick={() => onFilterChange("unread")}
        >
          No leídos
        </button>
        <button
          className={`${styles.filterTab} ${filter === "archived" ? styles.active : ""}`}
          onClick={() => onFilterChange("archived")}
        >
          Archivados
        </button>
      </div>

      {/* Conversation list */}
      <div className={styles.conversationList}>
        {loading ? (
          // Loading skeleton
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={styles.conversationSkeleton}>
              <Skeleton
                avatar
                active
                paragraph={{ rows: 1 }}
                title={{ width: "60%" }}
              />
            </div>
          ))
        ) : filteredConversations.length === 0 ? (
          <div className={styles.emptyConversations}>
            <SearchOutlined style={{ fontSize: 48 }} />
            <p>No se encontraron conversaciones</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`${styles.conversationItem} ${
                selectedConversationId === conversation.id ? styles.active : ""
              }`}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className={styles.conversationAvatar}>
                {getInitials(
                  conversation.contact.first_name,
                  conversation.contact.last_name
                )}
              </div>

              <div className={styles.conversationInfo}>
                <div className={styles.conversationHeader}>
                  <span className={styles.conversationName}>
                    {conversation.contact.first_name}{" "}
                    {conversation.contact.last_name}
                  </span>
                  <span
                    className={`${styles.conversationTime} ${
                      conversation.unread_count > 0 ? styles.unread : ""
                    }`}
                  >
                    {conversation.last_message
                      ? formatTime(conversation.last_message.created_at)
                      : ""}
                  </span>
                </div>

                <div className={styles.conversationPreview}>
                  <span className={styles.conversationLastMessage}>
                    {conversation.last_message?.sender_type === "agent" && "✓ "}
                    {conversation.last_message?.content || "Sin mensajes"}
                  </span>
                  {conversation.unread_count > 0 && (
                    <Badge
                      count={conversation.unread_count}
                      className={styles.unreadBadge}
                      style={{
                        backgroundColor: "#00a884",
                        color: "#111b21",
                        fontWeight: 500,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;

