import { Typography, Divider } from "antd";
import { EmailMessage } from "../../../../interfaces/internal/email.interface";


export const EmailPreview = ({
  email,
}: {
  email: EmailMessage | null;
}) => {
  if (!email) {
    return (
      <Typography.Text type="secondary">
        Select an email to view its content.
      </Typography.Text>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <Typography.Title level={4}>{email.subject}</Typography.Title>

      <Typography.Text type="secondary">
        From: {email.from} — {email.date}
      </Typography.Text>

      <Divider />

      <Typography.Paragraph>{email.body}</Typography.Paragraph>
    </div>
  );
};