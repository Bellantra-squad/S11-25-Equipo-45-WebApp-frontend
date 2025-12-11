import React, { useEffect } from "react";
import { Tabs, Flex, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Text } from "../../../../components/base/text";
import { useNavigate, useLocation, Outlet } from "react-router";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

const activeKey = location.pathname.split("/")[2] || "integrations";

  useEffect(() => {
    if (location.pathname === "/settings") {
      navigate("/settings/integrations", { replace: true });
    }
  }, [location.pathname, navigate]);

  const items = [
    { key: "integrations", label: "Integración", children: <Outlet /> },
    { key: "email", label: "Ajustes Email", children: <Outlet /> },    
    { key: "billing", label: "Planes", children: <Outlet /> },
  ];

  return (
    <div>
      <Flex
        style={{
          justifyContent: "space-between",
          width: "100%",
          display: "flex",
          paddingBottom: "20px",
        }}
        align="center"
      >
        <Space size="middle" style={{ marginTop: "20px", fontSize: "24px" }}>
          <SettingOutlined />
          <Text size="xl" strong>
            Configuración
          </Text>
        </Space>
      </Flex>

      <Tabs
        tabPosition="left"
        defaultActiveKey="email"
        activeKey={activeKey}
        onChange={(key) => navigate(`/settings/${key}`)}
        items={items}
        style={{ minHeight: 300 }}
      />
    </div>
  );
};

export default SettingsPage;
