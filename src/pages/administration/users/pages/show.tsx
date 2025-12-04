import { Show } from '@refinedev/antd';
import { Descriptions} from "antd";
import { useShow } from "@refinedev/core";
import { CheckCircleOutlined, CloseCircleOutlined, CrownOutlined, UserOutlined } from '@ant-design/icons';
import { StatusTag } from '../../../../components';
import { User } from '../../../../interfaces';

export default function UserShow() {
  const { result: record, query } = useShow<User>();
    
  const { isLoading } = query;
  return (
    <Show isLoading={isLoading}  title={record?.first_name +" " + record?.last_name} >
        <Descriptions column={2} bordered>
            <Descriptions.Item label="Name">{record?.first_name}</Descriptions.Item>
            <Descriptions.Item label="Apellido">{record?.last_name}</Descriptions.Item>
            <Descriptions.Item label="Email">{record?.email}</Descriptions.Item> 
            <Descriptions.Item label="Rol">{record?.role}</Descriptions.Item>                           
            <Descriptions.Item label="Es Super-Usuario">
              <StatusTag
                value={record?.is_superuser || false}
                trueLabel={"SuperUser"}
                falseLabel={"User"}
                falseColor={"cyan"}
                trueIcon= {<CrownOutlined />}
                falseIcon={<UserOutlined />}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <StatusTag
                value={record?.is_active || false}
                trueLabel={"Activo"}
                falseLabel={"Inactivo"}
                trueIcon= {<CheckCircleOutlined />}
                falseIcon={<CloseCircleOutlined />}
              />
            </Descriptions.Item>
        </Descriptions>
    </Show>
  );
}