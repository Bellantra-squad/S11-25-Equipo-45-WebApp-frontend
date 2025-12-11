import React, { useEffect } from "react";
import { Tabs, Flex, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Text } from "../../../../components/base/text";
import { useNavigate, useLocation, Outlet } from "react-router";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar tab activo según la ruta
  const activeKey = location.pathname.split("/").pop();

  useEffect(() => {    
    if (location.pathname === "/settings") {
      navigate("/settings/email", { replace: true });
    }
  }, [location.pathname, navigate]);

  const items = [
    { key: "email", label: "Email Setting", children: <Outlet /> },
    { key: "integration", label: "Integration", children: <Outlet /> },
    { key: "billing", label: "Billing", children: <Outlet /> },
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
