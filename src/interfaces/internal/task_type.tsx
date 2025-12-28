import { CalendarOutlined, CheckSquareOutlined, MailOutlined, PhoneOutlined, SyncOutlined } from "@ant-design/icons";

export const taskTypeConfig = {
  follow_up: {
    icon: <SyncOutlined />,
    color: "#1677ff",
    label: "Seguimiento",
    tagColor: "blue",
  },
  call: {
    icon: <PhoneOutlined />,
    color: "#52c41a",
    label: "Llamada",
    tagColor: "green",
  },
  meeting: {
    icon: <CalendarOutlined />,
    color: "#722ed1",
    label: "Reunión",
    tagColor: "purple",
  },
  email: {
    icon: <MailOutlined />,
    color: "#13c2c2",
    label: "Email",
    tagColor: "cyan",
  },
  other: {
    icon: <CheckSquareOutlined />,
    color: "#faad14",
    label: "Otro",
    tagColor: "gold",
  },
} as const;