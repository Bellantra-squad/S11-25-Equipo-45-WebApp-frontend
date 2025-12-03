import {
  InboxOutlined,
  StarOutlined,
  DeleteOutlined,
  SendOutlined,
} from "@ant-design/icons";
import React, { ReactNode } from "react";
import { IconName } from "../interfaces/internal/email.interface";

export const iconMap: Record<IconName, ReactNode> = {
  InboxOutlined: <InboxOutlined />,
  SendOutlined: <SendOutlined />,
  DeleteOutlined: <DeleteOutlined />,
  StarOutlined: <StarOutlined />,
};