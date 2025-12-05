import { useTable, List } from "@refinedev/antd";
import { TableViewUser } from "../components/table-view_user";
import { Space } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { Text } from "../../../../components/base/text";
import { User } from "../../../../interfaces";
import { usePermissions } from "@refinedev/core";

export default function UsersListPage() {
    const { tableProps } = useTable<User>();

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
       canCreate={permissionsData?.includes("admin")}
      >     
        <TableViewUser tableProps={tableProps} />
      </List>
    </div>
  );
}