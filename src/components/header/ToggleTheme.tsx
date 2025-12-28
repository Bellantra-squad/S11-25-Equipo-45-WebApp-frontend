import React, { useContext } from "react";
import { Button } from 'antd';
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { ColorModeContext } from "../../contexts/color-mode";

export const ToggleTheme: React.FC = () => {
  const { mode, setMode } = useContext(ColorModeContext);
 
  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (    
    <Button
      shape="circle"    
      onClick={toggleMode}
      size="large"
      icon={mode === "light" ? <SunOutlined /> : <MoonOutlined />}      
    />
  );
};
