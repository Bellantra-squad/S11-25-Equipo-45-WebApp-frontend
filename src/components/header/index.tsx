import type { RefineThemedLayoutHeaderProps } from "@refinedev/antd";
import {
  Layout as AntdLayout,  
  Space,
  Switch,
  theme,
} from "antd";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { Notifications } from "../layout/Notifications";
import { CurrentUser } from './CurrentUser';

const { useToken } = theme;

export const Header: React.FC<RefineThemedLayoutHeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { mode, setMode } = useContext(ColorModeContext);

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
      <Space style={{ columnGap:"30px" }}>
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        <Space  style={{ columnGap:"25px" }} size="middle">
         <Notifications />    
         <CurrentUser />        
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
