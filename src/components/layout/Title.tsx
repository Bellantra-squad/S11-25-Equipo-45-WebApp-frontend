import React from "react";

import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { useLink } from "@refinedev/core";

import { Space, theme, Typography } from "antd";
import { Logo } from "../base/logo";

const { useToken } = theme;

const name = "CRMStartup";

export const AppTitle: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  const { token } = useToken();
  const Link = useLink();

  return (
    <Link
      to="/"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "42px",
            width: "36px",
            color: token.colorPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo />
        </div>

        {!collapsed && (
          <Typography.Title
            style={{
              fontSize: "18px",
              marginBottom: 0,
              fontWeight: 700,
              letterSpacing: "-0.3px",
              color: token.colorText,
            }}
          >
            {name}
          </Typography.Title>
        )}
      </Space>
    </Link>
  );
};
