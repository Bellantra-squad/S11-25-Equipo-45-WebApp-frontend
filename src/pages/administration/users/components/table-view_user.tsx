import {
  EditButton,
  ShowButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import type { TableProps } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, CrownOutlined, UserOutlined } from "@ant-design/icons";
import { Role, User } from "../../../../interfaces";
import { StatusTag } from "../../../../components";
import { RoleTag } from "../../../../components/tags/role-tag";

type Props = {
  tableProps: TableProps<User>;
};

export const TableViewUser: React.FC<Props> = ({ tableProps }) => {
  return (
    <Table
      {...tableProps}
      rowKey="id"
      pagination={{
        showTotal: (total) => `${total} Usuarios`,
      }}
    >
      <Table.Column<User>
        dataIndex="first_name"
        title="Nombre"
        render={(value: string) => <span>{value}</span>}
      />
      <Table.Column<User>
        dataIndex="last_name"
        title="Apellido"
        render={(value: string) => <span>{value}</span>}
      />
      <Table.Column<User>
        dataIndex="email"
        title="Email"
        render={(value: string) => <span>{value}</span>}
      />
       <Table.Column<User>
        dataIndex="is_active"
        title="Estado"
        render={(value: boolean) =>
         <StatusTag
                value={value}
                trueLabel={"Activo"}
                falseLabel={"Inactivo"} 
                trueIcon= {<CheckCircleOutlined />} 
                falseIcon={<CloseCircleOutlined />}
            />
        }/>  
        <Table.Column<User>
        dataIndex="role"
        title="Rol"
        render={(value: Role) => <RoleTag role={value} /> }
        /> 

       <Table.Column<User>
        dataIndex="is_superuser"
        title="Tipo de Usuario"
        render={(value: boolean) =>  
            <StatusTag
                value={value}
                trueLabel={"SuperUser"}
                falseLabel={"User"} 
                falseColor={"cyan"}
                trueIcon= {<CrownOutlined />} 
                falseIcon={<UserOutlined />}
            />}
      />     

      <Table.Column<User>
        fixed="right"
        title="Acciones"
        dataIndex="actions"
        render={(_, record) => (
          <Space>
            <EditButton hideText size="small" recordItemId={record.id} />
            <ShowButton hideText size="small" recordItemId={record.id} />           
          </Space>
        )}
      />
    </Table>
  );
};