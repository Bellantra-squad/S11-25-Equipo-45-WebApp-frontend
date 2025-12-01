import { Show } from '@refinedev/antd';
import { Descriptions} from "antd";
import { useShow } from "@refinedev/core";
import { Contact } from '../../../interfaces/models/contact.interface';


export default function ContactsShow() {
  const { result: record, query } = useShow<Contact>();
    
  const { isLoading } = query;
  return (
    <Show isLoading={isLoading}  title={record?.first_name +" " + record?.last_name} >
        <Descriptions column={2} bordered>
            <Descriptions.Item label="Name">{record?.first_name}</Descriptions.Item>
            <Descriptions.Item label="Apellido">{record?.last_name}</Descriptions.Item>
            <Descriptions.Item label="Email">{record?.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{record?.phone}</Descriptions.Item>            
            <Descriptions.Item label="Whatsapp">{record?.whatsapp_number}</Descriptions.Item>
             <Descriptions.Item label="Lead">{record?.lead}</Descriptions.Item>
            <Descriptions.Item label="Departamento">{record?.department}</Descriptions.Item>
            <Descriptions.Item label="Ocupación">{record?.position}</Descriptions.Item>                          
            <Descriptions.Item label="Primary">{record?.is_primary ? "Yes" : "No"}</Descriptions.Item>
            <Descriptions.Item label="Decision Maker">{record?.is_decision_maker ? "Yes" : "No"}</Descriptions.Item>
        </Descriptions>
    </Show>
  );

}