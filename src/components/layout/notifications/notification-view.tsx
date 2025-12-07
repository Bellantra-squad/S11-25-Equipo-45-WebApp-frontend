import { Button, Drawer, List, Spin, Tabs, Tag } from "antd";
import { Activity, propsFilter } from "../../../interfaces/models/activity.interface";
import { Text } from "../../base/text";
import { CustomAvatar } from "../../header/CustomAvatar";
import { NotificationMessage } from "./notification-messages";
import { CloseOutlined } from "@ant-design/icons";


type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  data: Activity[];
  filter: propsFilter;
  setFilter: (filter: propsFilter) => void; 
  isLoading: boolean;
};

export const NotificationView = ({
  opened,
  setOpened,
  data,
  filter,
  setFilter,
  isLoading,
}: Props) => {
  const closeModal = () => setOpened(false);

  const filtered = data ?? [];

    if (isLoading) {
      return (
        <Drawer
          open={opened}
          width={756}
          styles={{
            body: { 
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }
          }}
        >
          <Spin />
        </Drawer>
      );
    }

  return (
    <Drawer
      open={opened}
      onClose={closeModal}
      width={600}
      styles={{
        body: { padding: 0 },
        header: { display: "none" },
      }}
    >
      <div style={{display:"flex", justifyContent:"space-between", alignItems: "center", padding: "16px" }}>
        <Text size="lg" strong>Panel de Notificaciones</Text>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => closeModal()}
        />
      </div>
      {/* === FILTROS === */}
      <Tabs
        activeKey={filter}
        centered
        items={[
          { key: "all", label: "Todos" },
          { key: "unread", label: "No leídos" },
          { key: "read", label: "Leídos" },
        ]}
        onChange={(k) => setFilter(k as propsFilter)}
        style={{ padding: "1rem" }}
      />

     {filtered.length === 0 ? (
        <div style={{ padding: 20, textAlign: "center" }}>
          <Spin />
        </div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={filtered}
          renderItem={(item) => (
            <List.Item
                style={{
                cursor: "pointer",
                background: item.is_read ? "#ffffff" : "#f6f9ff",
                padding: "1rem",
                borderBottom: "1px solid #eee",
              }}
            >
              <List.Item.Meta
                avatar={
                  <CustomAvatar
                    size={42}
                    shape="square"
                    name={item.activity_type}
                  />
                }
                title={<NotificationMessage audit={item} />}
                  
                description={
                  <>
                    <Text size="xs" type="secondary">
                      {new Date(item.created_at).toLocaleString()}
                    </Text>
                    {!item.is_read && (
                      <Tag color="blue" style={{ marginLeft: 8 }}>
                        Nuevo
                      </Tag>
                    )}
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};