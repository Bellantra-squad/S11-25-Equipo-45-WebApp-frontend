import { BellOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import { Badge, Button, Divider, Popover, Space, Spin, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Activity } from "../../../interfaces/models/activity.interface";
import { CustomAvatar } from "../../header/CustomAvatar";
import { Text } from "../../base/text";
import { useActivityWebSocket } from "../../../hooks/useWebSocket";

export const Notifications: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [isLoadingNotification, setIsLoadingNotification] = useState(false);

  // === LISTADO DE ACTIVIDADES ===
  const { result } = useList<Activity>({
    resource: "activities",
    pagination: { pageSize: 10 },
    sorters: [{ field: "created_at", order: "desc" }],    
    queryOptions: { enabled: open },
  });

  // === FUNCIÓN QUE SE EJECUTA CUANDO LLEGA UNA NUEVA ACTIVIDAD ===
  const handleNewActivity = useCallback(() => {
    setIsLoadingNotification(true);

    // Mostrar alerta con Ant Design
    notification.open({
      message: "Nueva actividad registrada",
      description: "Se registró una nueva actividad en tiempo real.",
      placement: "bottomRight",
    });

    setAlertCount((prev) => prev + 1);

    // efecto visual
    setTimeout(() => {
      setIsLoadingNotification(false);
    }, 1200);
  }, []);

  // === CONECTAR AL WEBSOCKET ===
  const { isConnected } = useActivityWebSocket(handleNewActivity);

  useEffect(() => {
    console.log("[Notifications] WebSocket conectado:", isConnected);
  }, [isConnected]);

  // === VISTA DEL POPOVER ===
  const content = (
    <Space direction="vertical" split={<Divider style={{ margin: 0 }} />}>
      {result.data?.map((audit) => (
        <Space key={audit.id}>
          <CustomAvatar size={48} shape="square" name={audit?.activity_type} />
          <Space direction="vertical" size={0}>
            <Text size="sm">
              {audit.activity_type}
            </Text>
            <Text size="xs" type="secondary">
              {audit.created_at.toString()}
            </Text>
          </Space>
        </Space>
      ))}
    </Space>
  );

  const loadingContent = (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 40,
    }}>
      <Spin />
    </div>
  );

  return (
    <Popover
      placement="bottomRight"
      content={isLoadingNotification ? loadingContent : content}
      trigger="click"
      onOpenChange={(newOpen) => {
        setOpen(newOpen);

        // si abre, borramos alertas nuevas
        if (newOpen) {
          setAlertCount(0);
        }
      }}
      overlayStyle={{ width: 400 }}
    >
      <Badge count={alertCount} overflowCount={9}>
        <Button shape="circle" size="large" icon={<BellOutlined />} />
      </Badge>
    </Popover>
  );
};