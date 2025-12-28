import { BellOutlined } from "@ant-design/icons";
import { useInvalidate, useList } from "@refinedev/core";
import { Badge, Button, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Activity, propsFilter } from "../../../interfaces/models/activity.interface";
import { useActivityWebSocket } from "../../../hooks/useWebSocket";
import { NotificationView } from "./notification-view";

export const Notifications: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const [filter, setFilter] = useState<propsFilter>(propsFilter.Unread);
  const invalidate = useInvalidate();

  // === LISTADO DE ACTIVIDADES ===
  const { result, query } = useList<Activity>({
    resource: "activities",
    pagination: { pageSize: 20 },
    sorters: [{ field: "created_at", order: "desc" }],
    filters: [
      filter === "all"
        ? {
            field: "is_read",
            operator: "eq",
            value: undefined,
          }
        : {
            field: "is_read",
            operator: "eq",
            value: filter === "read" ? true : false,
          },
    ],
  });

   const [messageApi, contextHolder] = message.useMessage();

  const handleNewActivity = useCallback(() => {
    messageApi.info("Tienes una nueva Notificación");

    invalidate({
      resource: "activities",
      invalidates: ["list"],
    });
  }, [invalidate, messageApi]);

    const unreadCount = result?.data?.filter((a) => !a.is_read).length ?? 0;

  // === CONECTAR AL WEBSOCKET ===
  const { isConnected } = useActivityWebSocket(handleNewActivity);

  useEffect(() => {
    console.log("[Notifications] WebSocket conectado:", isConnected);
  }, [isConnected]);

  return (
  <>
    {contextHolder}
       <Badge count={unreadCount} overflowCount={9}>
        <Button
          shape="circle"
          size="large"
          icon={<BellOutlined />}
          onClick={() => setOpened(true)}
        />
      </Badge>

      <NotificationView
        opened={opened}
        setOpened={setOpened}
        data={result?.data ?? []}
        isLoading={query.isLoading}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  );
};