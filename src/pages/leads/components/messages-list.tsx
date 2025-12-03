import { useList, useParsed } from "@refinedev/core";
import { Space, Typography } from "antd";
import { Conversation } from "../../../interfaces/models/conversation.interface";
import { MessageListItem } from "./message-list-item";

const useLeadConversations = () => {
  const { id: leadId } = useParsed();

    return useList<Conversation>({
      resource: `leads/${leadId}/conversations`,
      pagination: { mode: "off" },
    });
};

export const MessageList = () => {
  const { result: data, query } = useLeadConversations();

  if (query.isLoading) return <p>Cargando mensajes…</p>;
  if (!data?.data?.length) return <p>No hay mensajes.</p>;

  return (
    <Space size={32} direction="vertical" style={{ width: "100%" }}>
      {data.data.map(conversation => (
        <div key={conversation.id} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Typography.Title level={5}>{conversation.subject}</Typography.Title>

          {conversation.messages.map(msg => (
            <MessageListItem key={msg.id} item={msg} />
          ))}
        </div>
      ))}
    </Space>
  );
};