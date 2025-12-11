import { FC, ReactElement } from "react";
import { Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Status } from "../../interfaces/models/task.interface";
import { statusLabels } from "../../interfaces/constants/task-labels";

const statusVariant: Record<Status, { color: string; icon: ReactElement }> = {
  [Status.Completed]: {
    color: "green",
    icon: <CheckCircleOutlined />,
  },
  [Status.Cancelled]: {
    color: "red",
    icon: <CloseCircleOutlined />,
  },
  [Status.InProgress]: {
    color: "blue",
    icon: <SyncOutlined spin />,
  },
  [Status.Pending]: {
    color: "orange",
    icon: <ClockCircleOutlined />,
  },
};

type DisplayMode = "text" | "icon" | "both";

type Props = {
  status: Status;
  mode?: DisplayMode; // nueva prop opcional
};

export const StatusTaskTag: FC<Props> = ({ status, mode = "both" }) => {
  const { color, icon } = statusVariant[status];
  const label = statusLabels[status].toLowerCase();

  // estilos condicionales
  const baseStyle: React.CSSProperties = {
    textTransform: "capitalize",
    display: "inline-flex",
    alignItems: "center",
  };

  const iconOnlyStyle: React.CSSProperties =
    mode === "icon"
      ? { paddingTop: "4px", paddingBottom: "4px" } // 👈 padding extra arriba y abajo
      : {};

  return (
    <Tag
      style={{ ...baseStyle, ...iconOnlyStyle }}
      color={color}
      icon={mode === "icon" || mode === "both" ? icon : undefined}
    >
      {mode === "text" || mode === "both" ? label : null}
    </Tag>
  );
};
