import { FC, ReactElement } from "react";
import { Tag } from "antd";
import {
  ExclamationCircleOutlined,
  ArrowUpOutlined,
  MinusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Priority } from "../../interfaces/models/task.interface";


const priorityVariant: Record<Priority, { color: string; icon: ReactElement }> = {
  [Priority.Urgent]: {
    color: "red",
    icon: <ExclamationCircleOutlined />,
  },
  [Priority.High]: {
    color: "volcano",
    icon: <ArrowUpOutlined />,
  },
  [Priority.Medium]: {
    color: "blue",
    icon: <MinusOutlined />,
  },
  [Priority.Low]: {
    color: "green",
    icon: <CheckOutlined />,
  },
};

type Props = {
  priority: Priority;
};

export const PriorityTag: FC<Props> = ({ priority }) => {
  return (
    <Tag
      style={{ textTransform: "capitalize" }}
      color={priorityVariant[priority].color}
      icon={priorityVariant[priority].icon}
    >
      {priority.toLowerCase()}
    </Tag>
  );
};
