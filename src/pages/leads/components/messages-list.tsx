import { useList, useParsed } from "@refinedev/core";
import { Collapse, Typography } from "antd";
import { Conversation } from "../../../interfaces/models/conversation.interface";
import { MessageListItem } from "./message-list-item";
import { CaretRightOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

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
    // <Space size={32} direction="vertical" style={{ width: "100%" }}>
    //   {data.data.map(conversation => (
    //     <div key={conversation.id} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    //       <Typography.Title level={5}>{conversation.subject}</Typography.Title>

    //       {conversation.messages.map(msg => (
    //         <MessageListItem key={msg.id} item={msg} />
    //       ))}
    //     </div>
    //   ))}
    // </Space>
    <Collapse
      accordion
      style={{ width: "100%" }}
      expandIconPosition="start"
      defaultActiveKey={
        data?.data?.length ? [String(data.data[0].id)] : undefined
      }
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      
    >
      {data.data.map((conversation) => (
        <Panel
          header={
            <Typography.Text strong>
              {conversation.subject || "Sin asunto"}
            </Typography.Text>
          }
          key={conversation.id}
        >
          {conversation.messages?.length ? (
            conversation.messages.map((msg) => (
              <MessageListItem key={msg.id} item={msg} />
            ))
          ) : (
            <Typography.Text type="secondary">
              No hay mensajes en esta conversación.
            </Typography.Text>
          )}
        </Panel>
      ))}
    </Collapse>
  );
};