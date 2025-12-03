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

  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <CustomAvatar
        style={{ flexShrink: 0 }}
        size={40}
        name={query.isLoading ? "..." : senderName}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Text strong>
            {query.isLoading ? "Loading..." : senderName}
          </Typography.Text>

          <Typography.Text type="secondary">
            {item.sent_at ? new Date(item.sent_at).toLocaleDateString() : "—"}
          </Typography.Text>
        </div>

        <Typography.Paragraph
          style={{
            background: "#fff",
            borderRadius: 6,
            padding: 8,
            marginBottom: 0,
          }}
        >
          {item.content}
        </Typography.Paragraph>
      </div>
    </div>
  );
};