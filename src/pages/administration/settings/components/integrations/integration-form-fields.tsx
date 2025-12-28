import { Form, Input, Row, Col, Select, DatePicker, Switch } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { CredentialType } from "../../../../../interfaces/models/integration-api.interfaces";

export function IntegrationFormFields() {
  return (
    <>
      <Row gutter="2rem">
        {/* Service Name */}
        <Col span={12}>
          <Form.Item
            label="Service Name"
            name="service_name"
            rules={[{ required: true, message: "El nombre del servicio es obligatorio" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Credential Type */}
        <Col span={12}>
          <Form.Item
            label="Credential Type"
            name="credential_type"
            rules={[{ required: true, message: "El tipo de credencial es obligatorio" }]}
          >
            <Select placeholder="Seleccione un tipo">
              {Object.values(CredentialType).map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* API Key */}
        <Col span={12}>
          <Form.Item
            label="API Key"
            name="api_key"
            rules={[{ required: true, message: "El API Key es obligatorio" }]}
          >
            <Input.Password
              placeholder="API Key"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Col>

        {/* API Secret */}
        <Col span={12}>
          <Form.Item
            label="API Secret"
            name="api_secret"
            rules={[{ required: true, message: "El API Secret es obligatorio" }]}
          >
            <Input.Password
              placeholder="API Secret"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Col>

        {/* Access Token */}
        <Col span={12}>
          <Form.Item
            label="Access Token"
            name="access_token"
          >
            <Input.Password
              placeholder="Access Token"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Col>

        {/* Refresh Token */}
        <Col span={12}>
          <Form.Item
            label="Refresh Token"
            name="refresh_token"
          >
            <Input.Password
              placeholder="Refresh Token"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Col>

        {/* Webhook URL */}
        <Col span={24}>
          <Form.Item
            label="Webhook URL"
            name="webhook_url"
            rules={[{ required: true, message: "El Webhook URL es obligatorio" }]}
          >
            <Input placeholder="https://example.com/webhook" />
          </Form.Item>
        </Col>

        {/* Phone Number ID */}
        <Col span={12}>
          <Form.Item
            label="Phone Number ID"
            name="phone_number_id"
          >
            <Input placeholder="+573001234567" />
          </Form.Item>
        </Col>

        {/* Business Account ID */}
        <Col span={12}>
          <Form.Item
            label="Business Account ID"
            name="business_account_id"
          >
            <Input />
          </Form.Item>
        </Col>
     
        {/* Estado */}
        <Col span={6}>
          <Form.Item
            label="Activo"
            name="is_active"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Col>

        {/* Expiration Date */}
        <Col span={12}>
          <Form.Item
            label="Expiration Date"
            name="expires_at"
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}