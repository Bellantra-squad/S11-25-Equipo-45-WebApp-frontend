import { Typography, Form, Input, Button, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useCustomMutation } from "@refinedev/core";

const { Title, Paragraph } = Typography;

const EmailSettingsPage = () => {
  const { mutate, mutation } = useCustomMutation();

  const onFinish = (values: { email: string }) => {
    mutate(
      {
        url: "api-credentials/test-brevo/", // 👈 endpoint REST
        method: "post",
        values: { email: values.email },
        successNotification: () => ({
            key: "email-send-success",
            message: `Correo de prueba enviado a ${values.email}`,
            description: "Satisfactorio",
            type: "success",
        }),
        errorNotification: () => ({
            key: "email-send-error",
            message: "No se pudo enviar el correo de prueba",
            description: "Error en el Envio",
            type: "success",
        }),
      },     
    );
  };

  return (
    <div>
      <Title level={4}>Configuración de Email</Title>
      <Paragraph>
        Configura tu servidor SMTP, plantillas y etiquetas para envío de correos.
      </Paragraph>

      <Form
        layout="inline"
        onFinish={onFinish}
        style={{ marginTop: "1rem" }}
      >
        <Space>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "El email es obligatorio" },
              { type: "email", message: "Formato de email inválido" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="test@ejemplo.com"
              style={{ width: 250 }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
            >
              Enviar correo de prueba
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default EmailSettingsPage;
