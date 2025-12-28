import { Typography, List, Alert } from "antd";
const { Title } = Typography;

const BillingPage = () => (
  <div>
    <Title level={4}>Planes</Title>
    <List
      bordered
      dataSource={[
        "Plan Básico - Gratis",
        "Plan Pro - $29/mes",
        "Plan Enterprise - $99/mes",
      ]}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
    <Alert
      style={{ marginTop: 16 }}
      message="Para contratar un plan, contáctenos directamente."
      type="info"
      showIcon
    />
  </div>
);

export default BillingPage;