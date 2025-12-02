import { memo, useMemo } from "react";
import { useNavigation, useDelete } from "@refinedev/core";
import { EyeOutlined, DeleteOutlined, MoreOutlined, ClockCircleOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Tag, Tooltip, Space, Skeleton } from "antd";
import type { MenuProps } from "antd";
import { Text } from "../../../../components/base/text";
import {  LeadResponse } from "../../../../interfaces/models/lead.interface";
import { TextIcon } from "../../../../components/base/TextIcon";
import { CustomAvatar } from "../../../../components/header/CustomAvatar";


export const LeadCard = ({
  id,
  company_name,
  assigned_to,
  lead_score,
  contacts_count,
  last_contact_date,
}: LeadResponse) => {
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
       title={<Text ellipsis={{ tooltip: company_name }}>{company_name}</Text>}
       onClick={() => {
          edit("leads", id, "replace");
        }}
       extra={
        <Dropdown
            trigger={["click"]}
            menu={{
              items: dropdownItems,
              onPointerDown: (e) => {
                e.stopPropagation();
              },
              onClick: (e) => {
                e.domEvent.stopPropagation();
              },
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
            >
           <Button
              type="text"
              shape="circle"
              icon={
                <MoreOutlined
                  style={{
                    transform: "rotate(90deg)",
                  }}
                />
              }
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />  
        </Dropdown>
      }
    >


      <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "3px",
          }}
        >
          <TextIcon
            style={{
              marginRight: "1px",
            }}
          />
          
          {!!lead_score && (
            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1px",
              }}
            >
              <StarOutlined 
                style={{
                  color: "#898989",
                  fontSize: "10px",
                }}
              />
              <Text size="xs" type="secondary">
                {lead_score}
              </Text>
            </div>
          )}
          {!!contacts_count && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1px",
              }}
            >
              <UserOutlined
                style={{
                  color: "#898989",
                  fontSize: "10px",
                }}
              />
              <Text size="xs" type="secondary">
                {contacts_count}
              </Text>
            </div>
          )}
          {last_contact_date && (
            <Tag
              icon={
                <ClockCircleOutlined
                  style={{
                    fontSize: "10px",
                  }}
                />
              }
              style={{
                padding: "1 0px",
                marginInlineEnd: "0",
                backgroundColor: "#f6c7c7",
                color:"#000",
                border: "1px"
              }}
            >
              {last_contact_date ? new Date(last_contact_date).toLocaleDateString() : "—"}
            </Tag>
          )}
          {assigned_to.id && (
            <Space
              size={2}
              wrap
              direction="horizontal"
              align="center"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: "auto",
                marginRight: "0",
              }}
            >  
              <Tooltip key={assigned_to.id} title={assigned_to.first_name + " " + assigned_to.last_name}>
                  <CustomAvatar                
                name={assigned_to.email}
                size={25}
                style={{ display: "inline-flex" }}
                />
              </Tooltip>
              
            </Space>
          )}
        </div>

    </Card>
  );
};

export const LeadCardSkeleton = () => {
  return (
    <Card   
      size="small"  
       styles={{
        body: {  display: "flex",
        justifyContent: "center",
        gap: "8px", },       
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


export const LeadCardMemo = memo(LeadCard);