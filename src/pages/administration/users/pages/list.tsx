import { useTable, List, CreateButton } from "@refinedev/antd";
import { TableViewUser } from "../components/table-view_user";
import { Button, Space } from "antd";
import { ArrowLeftOutlined, TeamOutlined } from "@ant-design/icons";
import { Text } from "../../../../components/base/text";
import { User } from "../../../../interfaces";
import { useNavigation, usePermissions } from "@refinedev/core";

export default function UsersListPage() {
  const { tableProps } = useTable<User>();
  const { create } = useNavigation(); 

  const { data: permissionsData } = usePermissions({
    params: { tenantId: "id" }, // you can pass parameters to getPermissions
  });

  return (
    <div className="page-container">
      <List      
       title={
        <Space size="middle" style={{ marginTop:"20px"}}>
          <TeamOutlined />
          <Text size="lg">Listado de Usuarios</Text>
        </Space>
      }
      headerButtons={() => (
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => window.history.back()}
            >
              Atrás
            </Button>           
            <CreateButton onClick={() => create("users")}>Crear Usuario</CreateButton>
          </Space>
        )}
       canCreate={permissionsData?.includes("admin")}       
      >     
        <TableViewUser tableProps={tableProps} />
      </List>
    </div>
  );
}