import {
  CloseOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Drawer, Input, Space, Spin, Typography } from "antd";

import styles from "./index.module.css";
import { Text } from "../../base/text";
import { CustomAvatar } from "../../header/CustomAvatar";
import { User } from "../../../interfaces";
import { useState } from "react";
import { useOne } from "@refinedev/core";
import { SingleElementForm } from "../../single-element-form";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  user: User;
};

type FormKeys = "email" | "first_name" | "last_name" | "role";

export const AccountSettings = ({ opened, setOpened, user }: Props) => {
  const [activeForm, setActiveForm] = useState<FormKeys>();

  /** GET USER (REST API) */
  const { result, query } = useOne<User>({
    resource: "users",
    id: user.id,
    queryOptions: { enabled: opened },
  });

  const { id, first_name, last_name, email } = result ?? {};

  const isLoading = query.isLoading;

  const closeModal = () => {
    setOpened(false);
  };

  const getActiveForm = (key: FormKeys) => {
    if (activeForm === key) return "form";

    if (!result) return "empty";

    if (!result[key as keyof User]) return "empty";

    return "view";
  };

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
      onClose={closeModal}
      open={opened}
      width={756}
      styles={{
        body: { padding: 0 },
        header: { display: "none" },
      }}
    >
      <div className={styles.header}>
        <Text strong>Account Settings</Text>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => closeModal()}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.name}>
          <CustomAvatar
            style={{
              marginRight: "1rem",
              flexShrink: 0,
              fontSize: "40px",
            }}
            size={96}
            name={user?.first_name}
            last_name={user?.last_name}
          />
          <div className="styles.subtitle">
            <Typography.Title
              level={3}
              style={{ padding: 0, margin: 0, width: "100%" }}
              className={styles.title}
            >
              {first_name} {last_name}
            </Typography.Title>
            <Text
              size="sm"
              style={{ padding: 0, margin: 0, width: "100%" }}
              type="secondary"
              className={styles.title}
            >
              {email}
            </Text>
          </div>
        </div>
        <Card
          title={
            <Space size={15}>
              <UserOutlined />
              <Text size="sm">User profile</Text>
            </Space>
          }
          styles={{
            header: { padding: "0 12px" },
            body: { padding: "0" },
          }}
        >
          <SingleElementForm
            icon={<IdcardOutlined className="tertiary" />}
            itemProps={{
              name: "first_name",
              label: "Nombre",
            }}
            useFormProps={{
              id,
              resource: "users", // refine llamará PATCH /users/:id
            }}
            formProps={{ initialValues: { first_name } }}
            view={<Text>{first_name}</Text>}
            state={getActiveForm("first_name")}
            onClick={() => setActiveForm("first_name")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input />
          </SingleElementForm>
          <SingleElementForm
            icon={<IdcardOutlined className="tertiary" />}
            itemProps={{
              name: "last_name",
              label: "Apellido",
            }}
            useFormProps={{
              id,
              resource: "users", // refine llamará PATCH /users/:id
            }}
            formProps={{ initialValues: { last_name } }}
            view={<Text>{last_name}</Text>}
            state={getActiveForm("last_name")}
            onClick={() => setActiveForm("last_name")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input />
          </SingleElementForm>
        </Card>
        <Card
          title={
            <Space size={15}>
              <SafetyCertificateOutlined />
              <Text size="sm">Security</Text>
            </Space>
          }
          styles={{
            header: { padding: "0 12px" },
            body: { padding: "0" },
          }}
        >
          <SingleElementForm
            icon={<IdcardOutlined className="tertiary" />}
            itemProps={{
              name: "email",
              label: "Email",
            }}
            useFormProps={{
              id,
              resource: "users", // refine llamará PATCH /users/:id
            }}
            formProps={{ initialValues: { email } }}
            view={<Text>{email}</Text>}
            state={getActiveForm("email")}
            onClick={() => setActiveForm("email")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input />
          </SingleElementForm>
        </Card>
      </div>
    </Drawer>
  );
};
