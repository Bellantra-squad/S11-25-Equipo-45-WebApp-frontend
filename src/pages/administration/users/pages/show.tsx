import { Show } from '@refinedev/antd';
import { Button, Descriptions, Space} from "antd";
import { useNavigation, useShow } from "@refinedev/core";
import { CheckCircleOutlined, CloseCircleOutlined, CrownOutlined, EditOutlined, ReloadOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { StatusTag } from '../../../../components';
import { User } from '../../../../interfaces';

export default function UserShow() {
  const { result: record, query } = useShow<User>();
  const { list, edit } = useNavigation();  
  const {  isLoading,  refetch } = query;

  return (
    <Show isLoading={isLoading}  
    title={record ? record?.first_name +" " + record?.last_name : "Detalle del Usuario"}     
      headerButtons={() => (
        <Space>
          <Button icon={<UnorderedListOutlined />} onClick={() => list("users")}>
            Usuarios
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
            Refrescar
          </Button>
          {record && (
            <Button type='primary' icon={<EditOutlined />} onClick={() => edit("users", record.id)}>
              Editar Usuario
            </Button>
          )}
        </Space>
      )}>    
        <Descriptions column={2} bordered>
            <Descriptions.Item label="Nombre">{record?.first_name}</Descriptions.Item>
            <Descriptions.Item label="Apellido">{record?.last_name}</Descriptions.Item>
            <Descriptions.Item label="Email">{record?.email}</Descriptions.Item> 
            <Descriptions.Item label="Rol">{record?.role}</Descriptions.Item>                           
            <Descriptions.Item label="Super-Usuario">
              <StatusTag
                value={record?.is_superuser || false}
                trueLabel={"SuperUser"}
                falseLabel={"User"}
                falseColor={"cyan"}
                trueIcon= {<CrownOutlined />}
                falseIcon={<UserOutlined />}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Estado">
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