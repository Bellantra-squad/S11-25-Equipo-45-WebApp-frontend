import type { RefineThemedLayoutHeaderProps } from "@refinedev/antd";
import { Layout as AntdLayout, Space, theme } from "antd";
import React from "react";
import { Notifications } from "../layout/notifications/Notifications";
import { CurrentUser } from "./CurrentUser";
import { ToggleTheme } from "./ToggleTheme";

const { useToken } = theme;

export const Header: React.FC<RefineThemedLayoutHeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space style={{ columnGap: "20px" }}>
        <ToggleTheme />
        <Space style={{ columnGap: "20px" }} size="middle">
          <Notifications />
          <CurrentUser />
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
