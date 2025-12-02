import { Card, List, Avatar, Typography, Badge, Empty } from "antd";
import {
  WhatsAppOutlined,
  MailOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { RecentMessage } from "../../../interfaces/models/metrics.interface";
import styles from "./IncomingMessages.module.css";

interface IncomingMessagesProps {
  messages?: RecentMessage[];
  loading?: boolean;
  title?: string;
  channel?: "whatsapp" | "email" | "chat";
}

const channelConfig = {
  whatsapp: {
    icon: <WhatsAppOutlined />,
    color: "#25D366",
    label: "WhatsApp",
    emptyText: "No hay mensajes de WhatsApp",
    link: "/whatsapp",
  },
  email: {
    icon: <MailOutlined />,
    color: "#1677ff",
    label: "Email",
    emptyText: "No hay correos entrantes",
    link: "/emails",
  },
  chat: {
    icon: <MessageOutlined />,
    color: "#722ed1",
    label: "Chat",
    emptyText: "No hay mensajes de chat",
    link: "/chats",
  },
} as const;

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days === 1) return "Ayer";
  if (days < 7) return `${days}d`;

  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const IncomingMessages: React.FC<IncomingMessagesProps> = ({
  messages = [],
  loading = false,
  title = "Mensajes Entrantes",
  channel,
}) => {
  const config = channel ? channelConfig[channel] : null;
  const emptyText = config?.emptyText || "No hay mensajes recientes";
  const linkHref = config?.link || "/messages";

  return (
    <Card
      className={styles.card}
      title={
        <span>
          {config && (
            <span className={styles.titleIcon} style={{ color: config.color }}>
              {config.icon}
            </span>
          )}
          {title}
        </span>
      }
      extra={<Typography.Link href={linkHref}>Ver todos</Typography.Link>}
      styles={{ body: { flex: 1, overflow: "auto", padding: "0 24px" } }}
    >
      {messages.length === 0 && !loading ? (
        <Empty
          description={emptyText}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className={styles.emptyState}
        />
      ) : (
        <List
          loading={loading}
          dataSource={messages}
          renderItem={(message) => {
            const msgChannel =
              channelConfig[message.channel] || channelConfig.chat;
            return (
              <List.Item className={styles.listItem}>
                <List.Item.Meta
                  avatar={
                    <Badge dot={!message.is_read} offset={[-4, 4]}>
                      <Avatar
                        src={message.contact_avatar}
                        style={{
                          backgroundColor: message.contact_avatar
                            ? undefined
                            : msgChannel.color,
                        }}
                      >
                        {!message.contact_avatar &&
                          getInitials(message.contact_name)}
                      </Avatar>
                    </Badge>
                  }
                  title={
                    <div className={styles.titleWrapper}>
                      <Typography.Text
                        strong={!message.is_read}
                        ellipsis
                        className={styles.contactName}
                      >
                        {message.contact_name}
                      </Typography.Text>
                      <Typography.Text
                        type="secondary"
                        className={styles.timestamp}
                      >
                        {formatTime(message.created_at)}
                      </Typography.Text>
                    </div>
                  }
                  description={
                    <Typography.Text
                      type="secondary"
                      ellipsis
                      className={!message.is_read ? styles.unreadMessage : undefined}
                    >
                      {message.message_preview}
                    </Typography.Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};
