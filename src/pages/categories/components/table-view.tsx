import {
  DeleteButton,
  EditButton,
  getDefaultSortOrder,
  ShowButton,
} from "@refinedev/antd";
import { CrudSorting } from "@refinedev/core";
import { Table, Space } from "antd";
import type { TableProps } from "antd";
import { Category } from "../../../interfaces/models/category.interface";

type Props = {
  tableProps: TableProps<Category>;
  
  sorters: CrudSorting;
};

export const TableViewCategories: React.FC<Props> = ({ tableProps, sorters }) => {
  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total) => `${total} categorías`,
      }}
      rowKey="id"
    >
      <Table.Column<Category>
        dataIndex="name"
        title="Nombre"
        sorter
        defaultSortOrder={getDefaultSortOrder("name", sorters)}       
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<Category>
        dataIndex="description"
        title="Descripción"       
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<Category>
        dataIndex="color"
        title="Color"
        render={(value: string) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: value,
                borderRadius: 4,
                marginRight: 8,
                border: "1px solid #ccc",
              }}
            />
            <span>{value}</span>
          </div>
        )}
      />

      <Table.Column<Category>
        fixed="right"
        title="Acciones"
        dataIndex="actions"
        render={(_, record) => (
          <Space>
            <EditButton hideText size="small" recordItemId={record.id} />
            <ShowButton hideText size="small" recordItemId={record.id} />
            <DeleteButton hideText size="small" recordItemId={record.id} />
          </Space>
        )}
      />
    </Table>
  );
};