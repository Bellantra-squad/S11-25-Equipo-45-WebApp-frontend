import { Show } from '@refinedev/antd';
import { Descriptions} from "antd";
import { useShow } from "@refinedev/core";
import { Contact } from '../../../interfaces/models/contact.interface';


export default function ContactsShow() {
  const { result: record, query } = useShow<Contact>();
    
  const { isLoading } = query;
  return (
    <Show isLoading={isLoading} title={record?.name}>
        <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">{record?.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{record?.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{record?.phone}</Descriptions.Item>
            <Descriptions.Item label="Primary">{record?.is_primary ? "Yes" : "No"}</Descriptions.Item>
            <Descriptions.Item label="Decision Maker">{record?.is_decision_maker ? "Yes" : "No"}</Descriptions.Item>
        </Descriptions>
    </Show>
  );

}