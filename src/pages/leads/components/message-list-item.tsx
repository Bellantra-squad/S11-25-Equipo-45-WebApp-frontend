import { Typography } from "antd";
import { CustomAvatar } from "../../../components/header/CustomAvatar";
import { Message } from "../../../interfaces/models/conversation.interface";
import { useOne } from "@refinedev/core";
import { User } from "../../../interfaces";
import { Contact } from "../../../interfaces/models/contact.interface";


export const MessageListItem = ({ item }: { item: Message }) => {
  const isUser = item.sender_type === "user";

  // Obtener nombre real del remitente
  const { result: senderData, query } = useOne<User | Contact>({
    resource: isUser ? "users" : "contacts",
    id: item.sender_id, // ID del mensaje
    queryOptions: {
      enabled: !!item.sender_id, // evita query hasta que exista el ID
    },
  });

  const senderName =
    senderData?.first_name + " " + senderData?.last_name ||
    senderData?.email ||
    (isUser ? "User" : "Contact");

      const containerStyle: React.CSSProperties = {
        display: "flex",
        gap: 12,
        marginBottom: 16,
        justifyContent: isUser ? "flex-end" : "flex-start",
    };

    const avatarContainerStyle: React.CSSProperties = {
        order: isUser ? 2 : 1,
    };

    const messageContentStyle: React.CSSProperties = {
        order: isUser ? 1 : 2,
        display: "flex",
        flexDirection: "column",  
        gap: "4px",
        width: "100%"
    };

    const bubbleStyle: React.CSSProperties = {
        background: isUser ? "#a66eb5ff" : "#f5f5f5",
        color: isUser ? "#fff" : "#000",
        borderRadius: 12,
        padding: "10px 14px",
        width: "100%",
        alignSelf: isUser ? "flex-end" : "flex-start",
    };

  return (
    <div style={containerStyle}>
            {/* Avatar (solo aparece del lado correspondiente) */}
            <div style={avatarContainerStyle}>
                <CustomAvatar
                    size={40}
                    name={query.isLoading ? "..." : senderName}
                />
            </div>

            {/* Contenido del mensaje */}
            <div style={messageContentStyle}>
                <Typography.Text strong style={{ textAlign: isUser ? "right" : "left" }}>
                    {query.isLoading ? "Loading..." : senderName}
                </Typography.Text>

                <Typography.Paragraph style={bubbleStyle}>
                    {item.content}
                </Typography.Paragraph>

                <Typography.Text type="secondary" style={{ fontSize: 12, textAlign: isUser ? "right" : "left" }}>
                    {item.sent_at ? new Date(item.sent_at).toLocaleString() : "—"}
                </Typography.Text>
            </div>
        </div>
  );
};