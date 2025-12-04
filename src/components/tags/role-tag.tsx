import React, { FC } from "react";
import { CrownOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { Tag, type TagProps } from "antd";
import { Role } from "../../interfaces";

type Props = {
  role: Role;
};

export const RoleTag: FC<Props> = ({ role }) => {

  // Normalizamos el enum a un formato consistente:
  const normalized = role.replace(/-/g, "_");

  const variants: Record<string, { color: TagProps["color"]; icon: React.ReactNode }> = {
    ROLE_ADMIN: {
      color: "red",
      icon: <CrownOutlined />,
    },
    ROLE_USER: {
      color: "blue",
      icon: <UserOutlined />,
    },
    ROLE_SALES: {
      color: "geekblue",
      icon: <UserOutlined />,
    },
    ROLE_MANAGER: {
      color: "cyan",
      icon: <StarOutlined />,
    },
  };

  // fallback si no existe
  const variant = variants[normalized] ?? {
    color: "default",
    icon: <UserOutlined />,
  };

  return (
    <Tag
      color={variant.color}
      icon={variant.icon}
      style={{ textTransform: "capitalize" }}
    >
      {normalized.replace("_", " ").toLowerCase()}
    </Tag>
  );
};