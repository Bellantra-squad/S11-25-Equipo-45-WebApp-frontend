import { Typography } from "antd";
const { Title, Paragraph } = Typography;

const EmailSettingsPage = () => (
  <div>
    <Title level={4}>Email Settings</Title>
    <Paragraph>
      Configura tu servidor SMTP, plantillas y etiquetas para envío de correos.
    </Paragraph>
  </div>
);

export default EmailSettingsPage;