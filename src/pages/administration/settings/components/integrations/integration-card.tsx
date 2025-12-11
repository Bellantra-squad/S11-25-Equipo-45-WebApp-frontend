import { FC, useState } from "react";
import { Button, Dropdown, MenuProps, Space, Tag } from "antd";
import { EyeOutlined, DeleteOutlined, EllipsisOutlined, CheckCircleOutlined, CloseCircleOutlined, PhoneOutlined, LinkOutlined } from "@ant-design/icons";
import { useDelete } from "@refinedev/core";
import { IntegrationAPI } from "../../../../../interfaces/models/integration-api.interfaces";
import styles from "./index.module.css";
import { CardSkeleton } from "./skeleton";
import { Text } from "../../../../../components/base/text";
import { StatusTag } from "../../../../../components";
import { getDateColor } from "../../../../../utils/date";
import dayjs from "dayjs";
import { getIntegrationIcon } from "../../../../../helpers/get-integration-icon";
import IntegrationApiShow from "../../pages/integrations/show";

// Helper para íconos
interface Props {
  integration: IntegrationAPI;
}

const formatPhone = (phone?: string): string => {
  if (!phone) return "";
  return phone.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4");
};

export const IntegrationCard: FC<Props> = ({ integration }) => {
  const [opened, setOpened] = useState(false)
  const { mutate: deleteMutate } = useDelete();

  if (!integration) return <CardSkeleton />;

  const { id, service_name, webhook_url, phone_number_id, is_active, expires_at } = integration;

  const items: MenuProps["items"] = [
    {
      label: "Show",
      key: "show",
      icon: <EyeOutlined />,
      onClick: () => {
        setOpened(true);
      }    
    },
    {
      label: "Delete",
      key: "delete",
      danger: true,
      icon: <DeleteOutlined />,
      onClick: () => {
        deleteMutate({
          resource: "api-credentials",
          id,
        });
      },
    },
  ];

  return (
    <>
    <div className={styles.container}>   

      <div className={styles.personal}>
       {getIntegrationIcon(integration.credential_type)}
        <Text
          className={styles.name}
          size="lg"
          strong
          ellipsis={{
            tooltip: true,
          }}
        >
          {service_name}
        </Text>
        <Text        
        className={styles.email}
        >
        {webhook_url ? (
            <Space>
            <LinkOutlined style={{ color: "#1890ff" }} />
            <a
                href={webhook_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
            >
                {webhook_url}
            </a>
            </Space>
        ) : (
             <span>&nbsp;</span>
        )}
        </Text>
        <Text size="sm">
            {phone_number_id ? (
                <Space>
                <PhoneOutlined style={{ color: "#1890ff" }} />
                +{formatPhone(phone_number_id)}
                </Space>
            ) : (
                 <span>&nbsp;</span>
            )}
        </Text>
            <Tag
            color={getDateColor({ date: expires_at?.toString() ?? ""})}
            >
            {expires_at
                ? `Expira: ${dayjs(expires_at).format("DD/MM/YYYY")}`
                : "Sin fecha de expiración"}
            </Tag>
        </div>

      <div className={styles.company}> 
        <StatusTag
                value={is_active}
                trueLabel={"Activo"}
                falseLabel={"Inactivo"} 
                trueIcon= {<CheckCircleOutlined />} 
                falseIcon={<CloseCircleOutlined />}
        />
        <Dropdown className={styles.dropdown} menu={{ items }} trigger={["click"]} >
            <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      </div>
    </div>

    <IntegrationApiShow
        opened={opened}
        setOpened={setOpened}
        integration={integration}
      />
      </>
  );
};
