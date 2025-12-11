import { AppstoreOutlined, CloudOutlined, MailOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { CustomAvatar } from "../components/header/CustomAvatar";
import { CredentialType } from "../interfaces/models/integration-api.interfaces";

export const getIntegrationIcon = (type: CredentialType): React.ReactNode => {
  switch (type) {
    case CredentialType.WhatsApp:
      return (
        <CustomAvatar name="WhatsApp" size="large" style={{ backgroundColor: "#25D366" }} icon={<WhatsAppOutlined />} />
      );
    case CredentialType.EmailSmtp:
      return (
        <CustomAvatar name="SMTP" size="large" style={{ backgroundColor: "#1890ff" }} icon={<MailOutlined />} />
      );
    case CredentialType.EmailBrevo:
      return (
        <CustomAvatar name="Brevo" size="large" style={{ backgroundColor: "#722ed1" }} icon={<CloudOutlined />} />
      );
    default:
      return (
        <CustomAvatar  name="Other" size="large" style={{ backgroundColor: "#595959" }} icon={<AppstoreOutlined />} />
      );
  }
};