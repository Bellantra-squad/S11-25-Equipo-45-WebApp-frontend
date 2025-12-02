import { Card, List, Avatar, Typography, Tag, Empty } from "antd";
import {
  PhoneOutlined,
  CheckSquareOutlined,
  MailOutlined,
  UserOutlined,
  CalendarOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import type { RecentTask } from "../../../interfaces/models/metrics.interface";
import styles from "./UpcomingEvents.module.css";

interface UpcomingEventsProps {
  events?: RecentTask[];
  loading?: boolean;
}

const taskTypeConfig = {
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

const priorityConfig = {
  low: { color: "default", label: "Baja" },
  medium: { color: "warning", label: "Media" },
  high: { color: "error", label: "Alta" },
} as const;

const statusConfig = {
  pending: { color: "default", label: "Pendiente" },
  in_progress: { color: "processing", label: "En progreso" },
  completed: { color: "success", label: "Completada" },
  cancelled: { color: "error", label: "Cancelada" },
} as const;

const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = date.toDateString() === now.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();
  const isPast = date < now;

  const time = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return { text: `Hoy, ${time}`, isPast };
  if (isTomorrow) return { text: `Mañana, ${time}`, isPast };

  return {
    text: date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
    isPast,
  };
};

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  events = [],
  loading = false,
}) => {
  return (
    <Card
      className={styles.card}
      title="Próximos Eventos"
      extra={<Typography.Link href="/calendar">Ver todos</Typography.Link>}
      styles={{ body: { flex: 1, overflow: "auto", padding: "0 24px" } }}
    >
      {events.length === 0 && !loading ? (
        <Empty
          description="No hay eventos próximos"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className={styles.emptyState}
        />
      ) : (
        <List
          loading={loading}
          dataSource={events}
          renderItem={(task) => {
            const taskType =
              taskTypeConfig[task.task_type] || taskTypeConfig.other;
            const priority =
              priorityConfig[task.priority] || priorityConfig.medium;
            const status = statusConfig[task.status] || statusConfig.pending;
            const dateInfo = formatEventDate(task.due_date);

            return (
              <List.Item
                className={styles.listItem}
                actions={[
                  <Tag color={priority.color} key="priority">
                    {priority.label}
                  </Tag>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: taskType.color }}
                      icon={taskType.icon}
                    />
                  }
                  title={
                    <div className={styles.titleWrapper}>
                      <Typography.Text
                        ellipsis
                        className={`${styles.taskTitle} ${
                          task.status === "completed" ? styles.completed : ""
                        } ${task.status === "cancelled" ? styles.cancelled : ""}`}
                      >
                        {task.title}
                      </Typography.Text>
                      <Tag color={status.color} className={styles.statusTag}>
                        {status.label}
                      </Tag>
                    </div>
                  }
                  description={
                    <div>
                      <Typography.Text
                        type={dateInfo.isPast ? "danger" : "secondary"}
                        className={styles.dateText}
                      >
                        {dateInfo.text}
                      </Typography.Text>
                      {task.assigned_to && (
                        <>
                          <Typography.Text
                            type="secondary"
                            className={styles.separator}
                          >
                            {" "}
                            •{" "}
                          </Typography.Text>
                          <Typography.Text
                            type="secondary"
                            className={styles.assignedUser}
                          >
                            <UserOutlined className={styles.userIcon} />
                            {task.assigned_to.first_name}{" "}
                            {task.assigned_to.last_name}
                          </Typography.Text>
                        </>
                      )}
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};
