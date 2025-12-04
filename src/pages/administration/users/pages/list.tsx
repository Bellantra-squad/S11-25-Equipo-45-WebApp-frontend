import { useTable, List } from "@refinedev/antd";
import { TableViewUser } from "../components/table-view_user";
import { Space } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { Text } from "../../../../components/base/text";
import { User } from "../../../../interfaces";

export default function UsersListPage() {
    const { tableProps } = useTable<User>();

  return (
    <div className="page-container">
      <List
       title={
        <Space size="middle" style={{ marginTop:"20px"}}>
          <TeamOutlined />
          <Text size="lg">Listado de Usuarios</Text>
        </Space>
      }
      >     
        <TableViewUser tableProps={tableProps} />
      </List>
    </div>
  );
}