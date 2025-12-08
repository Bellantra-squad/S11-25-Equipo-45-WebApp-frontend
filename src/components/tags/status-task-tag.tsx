import { FC, ReactElement } from "react";
import { Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Status } from "../../interfaces/models/task.interface";


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

type Props = {
  status: Status;
};

export const StatusTaskTag: FC<Props> = ({ status }) => {
  return (
    <Tag
      style={{ textTransform: "capitalize" }}
      color={statusVariant[status].color}
      icon={statusVariant[status].icon}
    >
      {status.toLowerCase()}
    </Tag>
  );
};
