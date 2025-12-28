import { List, Avatar, Typography } from "antd";
import { EmailMessage } from "../../../../interfaces/internal/email.interface";


export const EmailList = ({
  emails,
  onSelectEmail,
  selectedEmailId,
}: {
  emails: EmailMessage[];
  onSelectEmail: (email: EmailMessage) => void;
  selectedEmailId: number | null;
}) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={emails}
      renderItem={(item) => (
        <List.Item
          style={{
            cursor: "pointer",
            background: selectedEmailId === item.id ? "#f0f5ff" : "transparent",
            padding: 12,
          }}
          onClick={() => onSelectEmail(item)}
        >
          <List.Item.Meta
            avatar={<Avatar>{item.from[0]}</Avatar>}
            title={<Typography.Text strong>{item.subject}</Typography.Text>}
            description={`${item.from} — ${item.preview}`}
          />
        </List.Item>
      )}
    />
  );
};
