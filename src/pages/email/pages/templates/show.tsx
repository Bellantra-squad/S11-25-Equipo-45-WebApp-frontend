import { Button, Space} from "antd";
import { EditOutlined, ReloadOutlined, UnorderedListOutlined } from "@ant-design/icons";

import { Show } from '@refinedev/antd';
import { useNavigation, useShow } from "@refinedev/core";
import { EmailTemplate } from "../../../../interfaces/models/email-templates";
import { TemplatePreview } from "../../components/template-preview";



export default function EmailTemplateShow() {
  const { query } = useShow<EmailTemplate>();
  const { list, edit } = useNavigation();

  const { data, isLoading,  refetch } = query;
  const templateData= data?.data;
    
  return (
    <Show isLoading={isLoading} 
    title={templateData ? templateData.name : "Detalle de Plantilla"}
      // Botones en el header
      headerButtons={() => (
        <Space>
          <Button icon={<UnorderedListOutlined />} onClick={() => list("email-templates")}>
            Plantillas
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
            Refrescar
          </Button>
          {templateData && (
            <Button type='primary' icon={<EditOutlined />} onClick={() => edit("email-templates", templateData.id)}>
              Editar
            </Button>
          )}
        </Space>
      )}>
        <TemplatePreview
            isLoading={isLoading}
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
    </Show>
  );

}