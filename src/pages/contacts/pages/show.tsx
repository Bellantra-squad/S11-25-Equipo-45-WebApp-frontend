import { Show } from '@refinedev/antd';
import { Button, Descriptions, Space} from "antd";
import { useNavigation, useShow } from "@refinedev/core";
import { Contact } from '../../../interfaces/models/contact.interface';
import { EditOutlined, ReloadOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { ContactStatusLead } from '../components/contact-status-lead';


export default function ContactsShow() {
  const { result: record, query } = useShow<Contact>();
  const { list, edit } = useNavigation();  
  const {  isLoading,  refetch } = query;
    
  return (
     <Show 
     isLoading={isLoading} 
      title={record ? record?.first_name +" " + record?.last_name : "Detalle de Contacto"}     
      headerButtons={() => (
        <Space>
          <Button icon={<UnorderedListOutlined />} onClick={() => list("contacts")}>
            Contactos
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
            Refrescar
          </Button>
          {record && (
            <Button icon={<EditOutlined />} onClick={() => edit("contacts", record.id)}>
              Editar
            </Button>
          )}
        </Space>
      )}> 
        <Descriptions column={2} bordered>
            <Descriptions.Item label="Nombre">{record?.first_name}</Descriptions.Item>
            <Descriptions.Item label="Apellido">{record?.last_name}</Descriptions.Item>
            <Descriptions.Item label="Email">{record?.email}</Descriptions.Item>
            <Descriptions.Item label="Telefono">{record?.phone}</Descriptions.Item>            
            <Descriptions.Item label="Whatsapp">{record?.whatsapp_number}</Descriptions.Item>
             <Descriptions.Item label="Lead">{record?.lead}</Descriptions.Item>
            <Descriptions.Item label="Departamento">{record?.department}</Descriptions.Item>
            <Descriptions.Item label="Ocupación">{record?.position}</Descriptions.Item>                          
            <Descriptions.Item label="Contacto Principal">{record?.is_primary ? "Yes" : "No"}</Descriptions.Item>
            <Descriptions.Item label="Toma Decisiones">{record?.is_decision_maker ? "Yes" : "No"}</Descriptions.Item>
        </Descriptions>

        {record?.lead && (
          <div style={{ marginTop: "2rem" }}>            
            <ContactStatusLead leadId={record.lead} />
          </div>
        )}
    </Show>
  );

}