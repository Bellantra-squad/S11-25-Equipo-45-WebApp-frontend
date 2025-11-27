import { memo, useMemo } from "react";
import { useNavigation, useDelete } from "@refinedev/core";
import { EyeOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Tag, Tooltip, Space, Skeleton } from "antd";
import type { MenuProps } from "antd";
import { Text } from "../../../../components/base/text";
import { Lead } from "../../../../interfaces/models/lead.interface";


export const LeadCard = ({
  id,
  company_name,
  industry,
  category,
  status,
  assigned_to,
  is_client,
  lead_source,
  lead_score,
  estimated_value,
  contacts_count,
  tags,
  last_contact_date,
  next_follow_up,
}: Lead) => {
  const { edit } = useNavigation();
  const { mutate } = useDelete();

  const dropdownItems = useMemo<MenuProps["items"]>(
    () => [
      {
        label: "Ver Lead",
        key: "1",
        icon: <EyeOutlined />,
        onClick: () => edit("leads", id),
      },
      {
        danger: true,
        label: "Eliminar",
        key: "2",
        icon: <DeleteOutlined />,
        onClick: () => mutate({ resource: "leads", id }),
      },
    ],
    [edit, id, mutate]
  );

  return (
    <Card
      size="small"
      title={<Text strong>{company_name}</Text>}
      extra={
        <Dropdown
          trigger={["click"]}
          menu={{ items: dropdownItems }}
          placement="bottom"
        >
          <Button type="text" shape="circle" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <Space direction="vertical" size={6}>

        {/* Industry */}
        {industry && <Text type="secondary">{industry}</Text>}

        {/* Status */}
        {status && (
          <Tag color={status.color} style={{ textTransform: "capitalize" }}>
            {status.name}
          </Tag>
        )}

        {/* Category */}
        {category && (
          <Tag color={category.color}>
            {category.name}
          </Tag>
        )}

        {/* Lead Source */}
        {lead_source && (
          <Tag color="blue">
            {lead_source}
          </Tag>
        )}

        {/* Assigned user */}
        {assigned_to && (
          <Tooltip title="Asignado a">
            <Text>
              👤 {assigned_to.first_name} {assigned_to.last_name}
            </Text>
          </Tooltip>
        )}

        {/* Tags */}
        {tags?.length > 0 && (
          <Space wrap>
            {tags.map((t) => (
              <Tag key={t.id} color={t.color}>
                {t.name}
              </Tag>
            ))}
          </Space>
        )}

        {/* Value */}
        {estimated_value && (
          <Text>
            💰 Valor estimado: <strong>{estimated_value}</strong>
          </Text>
        )}

        {/* Score */}
        <Text>⭐ Score: {lead_score}</Text>

        {/* Contacts */}
        <Text>📇 Contactos: {contacts_count}</Text>

        {/* Dates */}
        <Text type="secondary">
          Último contacto:{" "}
          {last_contact_date ? new Date(last_contact_date).toLocaleDateString() : "—"}
        </Text>

        <Text type="secondary">
          Seguimiento:{" "}
          {next_follow_up ? new Date(next_follow_up).toLocaleDateString() : "—"}
        </Text>

        {/* Client flag */}
        {is_client && (
          <Tag color="green">Cliente</Tag>
        )}

      </Space>
    </Card>
  );
};



export const LeadCardSkeleton = () => {
  return (
    <Card
      size="small"
      bodyStyle={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
      }}
      title={
        <Skeleton.Button
          active
          size="small"
          style={{
            width: "200px",
            height: "22px",
          }}
        />
      }
    >
      <Skeleton.Button
        active
        size="small"
        style={{
          width: "200px",
        }}
      />
      <Skeleton.Avatar active size="small" />
    </Card>
  );
};

// export const LeadCardMemo = memo(LeadCard, (prev, next) => {
//   return (
//     prev.id === next.id &&
//     prev.company_name === next.company_name &&
//     prev.created_at === next.created_at &&
//     prev.contacts_count === next.contacts_count &&
//     prev.assigned_to === next.assigned_to
//   );
// });


export const LeadCardMemo = memo(LeadCard);