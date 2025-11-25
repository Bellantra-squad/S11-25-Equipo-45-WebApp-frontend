// import { memo, useMemo } from "react";

// import { useDelete, useNavigation } from "@refinedev/core";

// import {
//   CheckSquareOutlined,
//   ClockCircleOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   MessageOutlined,
//   MoreOutlined,
// } from "@ant-design/icons";
// import type { MenuProps } from "antd";
// import {
//   Button,
//   Card,
//   ConfigProvider,
//   Dropdown,
//   Skeleton,
//   Space,
//   Tag,
//   theme,
//   Tooltip,
// } from "antd";
// import dayjs from "dayjs";




// import { Text } from "../../../../components/base/text";
// import { CustomAvatar } from "../../../../components/header/CustomAvatar";
// import { User } from "../../../../interfaces";
// import { getDateColor } from "../../../../utils/date";
// import { TextIcon } from "../../../../components/base/TextIcon";

// type ProjectCardProps = {
//   id: string;
//   title: string;
//   comments: {
//     totalCount: number;
//   };
//   dueDate?: string;
//   users?: {
//     id: string;
//     name: string;
//     avatarUrl?: User["avatar"];
//   }[];
//   checkList?: {
//     title: string;
//     checked: boolean;
//   }[];
// };

// export const ProjectCard = ({
//   id,
//   title,
//   checkList,
//   comments,
//   dueDate,
//   users,
// }: ProjectCardProps) => {
//   const { token } = theme.useToken();
//   const { edit } = useNavigation();
//   const { mutate } = useDelete();

//   const dropdownItems = useMemo(() => {
//     const dropdownItems: MenuProps["items"] = [
//       {
//         label: "View card",
//         key: "1",
//         icon: <EyeOutlined />,
//         onClick: () => {
//           edit("tasks", id, "replace");
//         },
//       },
//       {
//         danger: true,
//         label: "Delete card",
//         key: "2",
//         icon: <DeleteOutlined />,
//         onClick: () => {
//           mutate({
//             resource: "tasks",
//             id,
//             meta: {
//               operation: "task",
//             },
//           });
//         },
//       },
//     ];

//     return dropdownItems;
//   }, []);

//   const dueDateOptions = useMemo(() => {
//     if (!dueDate) return null;

//     const date = dayjs(dueDate);

//     return {
//       color: getDateColor({ date: dueDate }) as string,
//       text: date.format("MMM D"),
//     };
//   }, [dueDate]);

//   const checkListCompletionCountOptions = useMemo(() => {
//     const hasCheckList = checkList && checkList.length > 0;
//     if (!hasCheckList) {
//       return null;
//     }

//     const total = checkList.length;
//     const checked = checkList?.filter((item) => item.checked).length;

//     const defaulOptions = {
//       color: "default",
//       text: `${checked}/${total}`,
//       allCompleted: false,
//     };

//     if (checked === total) {
//       defaulOptions.color = "success";
//       defaulOptions.allCompleted = true;
//       return defaulOptions;
//     }

//     return defaulOptions;
//   }, [checkList]);

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Tag: {
//             colorText: token.colorTextSecondary,
//           },
//           Card: {
//             headerBg: "transparent",
//           },
//         },
//       }}
//     >
//       <Card
//         size="small"
//         title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
//         onClick={() => {
//           edit("tasks", id, "replace");
//         }}
//         extra={
//           <Dropdown
//             trigger={["click"]}
//             menu={{
//               items: dropdownItems,
//               onPointerDown: (e) => {
//                 e.stopPropagation();
//               },
//               onClick: (e) => {
//                 e.domEvent.stopPropagation();
//               },
//             }}
//             placement="bottom"
//             arrow={{ pointAtCenter: true }}
//           >
//             <Button
//               type="text"
//               shape="circle"
//               icon={
//                 <MoreOutlined
//                   style={{
//                     transform: "rotate(90deg)",
//                   }}
//                 />
//               }
//               onPointerDown={(e) => {
//                 e.stopPropagation();
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//               }}
//             />
//           </Dropdown>
//         }
//       >
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             alignItems: "center",
//             gap: "8px",
//           }}
//         >
//           <TextIcon
//             style={{
//               marginRight: "4px",
//             }}
//           />
//           {!!comments?.totalCount && (
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "4px",
//               }}
//             >
//               <MessageOutlined
//                 style={{
//                   color: token.colorTextSecondary,
//                   fontSize: "12px",
//                 }}
//               />
//               <Text size="xs" type="secondary">
//                 {comments.totalCount}
//               </Text>
//             </div>
//           )}
//           {dueDateOptions && (
//             <Tag
//               icon={
//                 <ClockCircleOutlined
//                   style={{
//                     fontSize: "12px",
//                   }}
//                 />
//               }
//               style={{
//                 padding: "0 4px",
//                 marginInlineEnd: "0",
//                 backgroundColor:
//                   dueDateOptions.color === "default" ? "transparent" : "unset",
//               }}
//               color={dueDateOptions.color}
//               bordered={dueDateOptions.color !== "default"}
//             >
//               {dueDateOptions.text}
//             </Tag>
//           )}
//           {checkListCompletionCountOptions && (
//             <Tag
//               icon={
//                 <CheckSquareOutlined
//                   style={{
//                     fontSize: "12px",
//                   }}
//                 />
//               }
//               style={{
//                 padding: "0 4px",
//                 marginInlineEnd: "0",
//                 backgroundColor:
//                   checkListCompletionCountOptions.color === "default"
//                     ? "transparent"
//                     : "unset",
//               }}
//               color={checkListCompletionCountOptions.color}
//               bordered={checkListCompletionCountOptions.color !== "default"}
//             >
//               {checkListCompletionCountOptions.text}
//             </Tag>
//           )}
//           {!!users?.length && (
//             <Space
//               size={4}
//               wrap
//               direction="horizontal"
//               align="center"
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 marginLeft: "auto",
//                 marginRight: "0",
//               }}
//             >
//               {users.map((user) => {
//                 return (
//                   <Tooltip key={user.id} title={user.name}>
//                     <CustomAvatar name={user.name} src={user.avatarUrl} />
//                   </Tooltip>
//                 );
//               })}
//             </Space>
//           )}
//         </div>
//       </Card>
//     </ConfigProvider>
//   );
// };


import { memo, useMemo } from "react";
import { useNavigation, useDelete } from "@refinedev/core";
import { EyeOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Tag, Tooltip, Space, Skeleton } from "antd";
import type { MenuProps } from "antd";
import { Text } from "../../../../components/base/text";

// tu interface

export const LeadCard = ({
  id,
  company_name,
  industry,
  website,
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
    []
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
            {lead_source.name}
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

export const LeadCardMemo = memo(LeadCard);

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
//     prev.company_name === next.company_name 
//     // prev.dueDate === next.dueDate &&
//     // prev.comments.totalCount === next.comments.totalCount &&
//     // prev.checkList?.length === next.checkList?.length &&
//     // prev.users?.length === next.users?.length
//   );
// });