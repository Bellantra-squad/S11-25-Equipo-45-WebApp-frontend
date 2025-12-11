import {
  CloseOutlined,
  LinkOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  ApiOutlined,
  KeyOutlined,
  LockOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Drawer, Input, Space, Spin, Switch, Typography } from "antd";
import { useState } from "react";
import { useOne } from "@refinedev/core";
import dayjs from "dayjs";

import styles from "./index.module.css";
import { IntegrationAPI } from "../../../../../interfaces/models/integration-api.interfaces";
import { Text } from "../../../../../components/base/text";
import { getIntegrationIcon } from "../../../../../helpers/get-integration-icon";
import { SingleElementForm } from "../../../../../components/single-element-form";
import { getDateColor } from "../../../../../utils/date";
import { StatusTag } from "../../../../../components";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  integration: IntegrationAPI;
};

type FormKeys =
  | "service_name"
  | "credential_type"
  | "api_key"
  | "api_secret"
  | "access_token"
  | "refresh_token"
  | "webhook_url"
  | "phone_number_id"
  | "business_account_id"
  | "additional_config"
  | "is_active"
  | "expires_at";

const IntegrationApiShow = ({ opened, setOpened, integration }: Props) => {
  const [activeForm, setActiveForm] = useState<FormKeys>();

  /** GET INTEGRATION (REST API) */
  const { result, query } = useOne<IntegrationAPI>({
    resource: "api-credentials",
    id: integration.id,
    queryOptions: { enabled: opened },
  });

  const {
    id,
    service_name,
    credential_type,
    webhook_url,
    phone_number_id,
    business_account_id,
    is_active,
    expires_at,
  } = result ?? {};

  const isLoading = query.isLoading;

  const closeModal = () => {
    setOpened(false);
  };

  const getActiveForm = (key: FormKeys) => {
    if (activeForm === key) return "form";
    if (!result) return "empty";
    if (!result[key as keyof IntegrationAPI]) return "empty";
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
          },
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
        <Text size="lg" strong>Integration Settings</Text>
        <Button type="text" icon={<CloseOutlined />} onClick={closeModal} />
      </div>

      <div className={styles.container}>
        <div className={styles.name}>
          {getIntegrationIcon(credential_type!)}
          <div className="styles.subtitle">
            <Typography.Title
              level={3}
              style={{ padding: 0, margin: 0, width: "100%" }}
              className={styles.title}
            >
              {service_name}
            </Typography.Title>
            <Text
              size="sm"
              style={{ padding: 0, margin: 0, width: "100%" }}
              type="secondary"
              className={styles.title}
            >
              {credential_type}
            </Text>
          </div>
        </div>

        {/* General Info */}
        <Card
          title={
            <Space size={15}>
              <ApiOutlined />
              <Text size="sm">General</Text>
            </Space>
          }
        >
          <SingleElementForm
            icon={<ApiOutlined />}
            itemProps={{ name: "service_name", label: "Service Name" }}
            useFormProps={{ id, resource: "api-credentials" }}
            formProps={{ initialValues: { service_name } }}
            view={<Text>{service_name}</Text>}
            state={getActiveForm("service_name")}
            onClick={() => setActiveForm("service_name")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input />
          </SingleElementForm>

          <SingleElementForm
            icon={<LinkOutlined />}
            itemProps={{ name: "webhook_url", label: "Webhook URL" }}
            useFormProps={{ id, resource: "api-credentials" }}
            formProps={{ initialValues: { webhook_url } }}
            view={<Text>{webhook_url}</Text>}
            state={getActiveForm("webhook_url")}
            onClick={() => setActiveForm("webhook_url")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input />
          </SingleElementForm>

          <SingleElementForm
            icon={<PhoneOutlined />}
            itemProps={{ name: "phone_number_id", label: "Phone Number" }}
            useFormProps={{ id, resource: "api-credentials" }}
            formProps={{ initialValues: { phone_number_id } }}
            view={<Text>{phone_number_id}</Text>}
            state={getActiveForm("phone_number_id")}
            onClick={() => setActiveForm("phone_number_id")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input />
          </SingleElementForm>

          <SingleElementForm
            icon={<ApiOutlined />}
            itemProps={{ name: "business_account_id", label: "Business Account ID" }}
            useFormProps={{ id, resource: "api-credentials" }}
            formProps={{ initialValues: { business_account_id } }}
            view={<Text>{business_account_id}</Text>}
            state={getActiveForm("business_account_id")}
            onClick={() => setActiveForm("business_account_id")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input />
          </SingleElementForm>

        {/* Is Active */}
        <SingleElementForm
        icon={<SafetyCertificateOutlined className="tertiary" />}
        itemProps={{ name: "is_active", label: "Estado" }}
        useFormProps={{ id, resource: "api-credentials" }}
        formProps={{ initialValues: { is_active } }}
        view={
            <StatusTag
                value={is_active!}
                trueLabel={"Activo"}
                falseLabel={"Inactivo"} 
                trueIcon= {<CheckCircleOutlined />} 
                falseIcon={<CloseCircleOutlined />}
            />
        }
        state={getActiveForm("is_active")}
        onClick={() => setActiveForm("is_active")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
        >
        <Switch defaultChecked={is_active} />
        </SingleElementForm>
        </Card>

        {/* Security */}
        <Card
          title={
            <Space size={15}>
              <SafetyCertificateOutlined />
              <Text size="sm">Security</Text>
            </Space>
          }
        >
          <SingleElementForm
            icon={<KeyOutlined />}
            itemProps={{ name: "api_key", label: "API Key" }}
            useFormProps={{ id, resource: "api-credentials" }}
            formProps={{ initialValues: { api_key: "" } }}
            view={<Text>••••••••</Text>}
            state={getActiveForm("api_key")}
            onClick={() => setActiveForm("api_key")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input.Password />
          </SingleElementForm>

          <SingleElementForm
            icon={<LockOutlined />}
            itemProps={{ name: "api_secret", label: "API Secret" }}
            useFormProps={{ id, resource: "api-credentials" }}
            formProps={{ initialValues: { api_secret: "" } }}
            view={<Text>••••••••</Text>}
            state={getActiveForm("api_secret")}
            onClick={() => setActiveForm("api_secret")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input.Password />
          </SingleElementForm>

          <SingleElementForm
            icon={<KeyOutlined />}
            itemProps={{ name: "access_token", label: "Access Token" }}
            useFormProps={{ id, resource: "api-credentials" }}
            formProps={{ initialValues: { access_token: "" } }}
            view={<Text>••••••••</Text>}
            state={getActiveForm("access_token")}
            onClick={() => setActiveForm("access_token")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input.Password />
          </SingleElementForm>

          <SingleElementForm
            icon={<KeyOutlined />}
            itemProps={{ name: "refresh_token", label: "Refresh Token" }}
            useFormProps={{ id, resource: "api-credentials" }}
            formProps={{ initialValues: { refresh_token: "" } }}
            view={<Text>••••••••</Text>}
            state={getActiveForm("refresh_token")}
            onClick={() => setActiveForm("refresh_token")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input.Password />
          </SingleElementForm>
          <SingleElementForm
            icon={<SafetyCertificateOutlined className="tertiary" />}
            itemProps={{ name: "expires_at", label: "Expiration Date" }}
            useFormProps={{ id, resource: "api-credentials" }}
            formProps={{ initialValues: { expires_at } }}
            view={
              expires_at ? (
                <Text color={getDateColor({ date: expires_at.toString() })}>
                  {dayjs(expires_at).format("DD/MM/YYYY")}
                </Text>
              ) : (
                <Text type="secondary">Sin fecha de expiración</Text>
              )
            }
            state={getActiveForm("expires_at")}
            onClick={() => setActiveForm("expires_at")}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input type="date" />
          </SingleElementForm>
        </Card>
      </div>
    </Drawer>
  );
};


export default IntegrationApiShow;