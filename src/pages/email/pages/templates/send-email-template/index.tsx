import { Layout, Form, Input, Button, Select, Skeleton, Splitter, Space } from "antd";
import { BaseOption, useCreate, useNavigation, useOne } from "@refinedev/core";
import { useState } from "react";
import { useSelect } from "@refinedev/antd";
import Title from "antd/es/typography/Title";
import { TemplatePreview } from "../../../components/template-preview";
import { Contact } from "../../../../../interfaces/models/contact.interface";
import { ArrowLeftOutlined, FileSearchOutlined, MailOutlined } from "@ant-design/icons";

interface SendEmailParams {
  to: string;
  lead_id: number;
  contact_id: number;
  template_id: number; // suponiendo que el endpoint recibe el id de la template
}

export default function SendEmailTemplatePage() {
  const [form] = Form.useForm();
  const [selectedTemplateId, setSelectedTemplateId] = useState<BaseOption["value"] | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<BaseOption["value"] | null>(null);

  const { Header, Content } = Layout;

  // Mutación para enviar email
  const { mutate } = useCreate();
  const { list } = useNavigation();

  // Usar useSelect para poblar el dropdown
  const { selectProps, query: templatesQuery} = useSelect<{ id: number; name: string }>({
  resource: "email-templates",
  optionLabel: "name",
  optionValue: "id",
});

  // Select de leads
  const { selectProps: leadSelectProps, query: leadQuery  } = useSelect<{ id: number; company_name: string }>({
    resource: "leads",
    optionLabel: "company_name",
    optionValue: "id",
  });

  const { selectProps: contactSelectProps } = useSelect({
    resource:  `leads/${selectedLeadId}/contacts`,
    optionLabel: (c: Contact) => `${c.first_name} ${c.last_name}`,
    optionValue: "id",
    queryOptions: {
      enabled: !!selectedLeadId, 
    },
  });

  // Preview de la plantilla seleccionada
  const { result: templateData, query: isPreviewLoading } = useOne({
    resource: "email-templates",
    id: selectedTemplateId ?? undefined,
    queryOptions: { enabled: !!selectedTemplateId },
  });

  const onFinish = (values: SendEmailParams) => {
    mutate({
      resource: `email-templates/${values.template_id}/send`,
      values: {
        to: values.to,
        lead_id: values.lead_id,
        contact_id: values.contact_id,
      },
    });
  };

  const isLoadingSelects = templatesQuery?.isLoading || leadQuery?.isLoading;

  return (
    <Layout style={{ height: "100vh" }}>
      {/* Header con botones */}
      <Header style={{ 
        padding:"1rem", 
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center", 
        background: "transparent",
        borderBottom: "1px solid #dddddd"
         }}>
        <Title level={4} style={{ margin: 0 }}>
          Enviar Plantilla de Email
        </Title>
         <Space>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
          >
            Atrás
          </Button>
          <Button
            type="text"
            icon={<MailOutlined />}
            onClick={() => list("emails")}
          >
            Bandeja de entrada
          </Button>
          <Button
            type="text"
            icon={<FileSearchOutlined />}
            onClick={() => list("email-templates")}
          >
            Ver plantillas
          </Button>
        </Space>
      </Header>

      <Content style={{ padding: "24px" }}>
        <Layout style={{ display: "flex" }}>
         <Splitter >
            <Splitter.Panel style={{borderRight: "1px solid #dddddd", paddingRight:"20px"}}>
          {isLoadingSelects ? (
            <Skeleton active paragraph={{ rows: 6 }} />
          ) : (
            <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Destinatario"
              name="to"
              rules={[{ required: true, message: "El destinatario es obligatorio" }]}
            >
              <Input placeholder="user@example.com" />
            </Form.Item>

             <Form.Item
              label="Lead"
              name="lead_id"
              rules={[{ required: true, message: "Selecciona un lead" }]}
            >
              <Select
                {...leadSelectProps}
                placeholder="Selecciona un lead"
                onSelect={(value) => {
                  setSelectedLeadId(value);
                  form.setFieldsValue({ contact_id: null, to: "" });
                }}
              />
            </Form.Item>

            
            <Form.Item
              label="Contacto"
              name="contact_id"
              rules={[{ required: true, message: "Selecciona un contacto" }]}
            >
              <Select
                {...contactSelectProps}
                placeholder="Selecciona un contacto"
                onSelect={(option) => {
                  form.setFieldsValue({ to: option.label });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Plantilla"
              name="template_id"
              rules={[{ required: true, message: "Selecciona una plantilla" }]}
            >
              <Select
                {...selectProps}
                placeholder="Selecciona una plantilla"
                onChange={(value) => setSelectedTemplateId(value)}
                />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Enviar Email
              </Button>
            </Form.Item>
          </Form>
          )}
          </Splitter.Panel>
          

        {/* Columna derecha: preview */}
        <Splitter.Panel style={{ padding: "24px" , height:"100%"}}>
            <TemplatePreview
              isLoading={isPreviewLoading.isLoading}
              templateData={
                templateData
                  ? {
                      name: templateData.name,
                      subject: templateData.subject,
                      body: templateData.body,
                    }
                  : undefined
              }
            />
          </Splitter.Panel>
        </Splitter>
        </Layout>
      </Content>
    </Layout>
  );
}
