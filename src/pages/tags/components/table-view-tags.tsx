import {
  DeleteButton,
  EditButton,
  getDefaultSortOrder,
  ShowButton,
} from "@refinedev/antd";
import { CrudSorting } from "@refinedev/core";
import { Table, Space } from "antd";
import type { TableProps } from "antd";
import { Tag } from "../../../interfaces/models/tag.interface";

type Props = {
  tableProps: TableProps<Tag>;
  sorters: CrudSorting;
};

export const TableViewTags: React.FC<Props> = ({ tableProps, sorters }) => {
  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total) => `${total} Etiquetas`,
      }}
      rowKey="id"
    >
      <Table.Column<Tag>
        dataIndex="name"
        title="Nombre"
        sorter
        defaultSortOrder={getDefaultSortOrder("name", sorters)}       
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<Tag>
        dataIndex="description"
        title="Descripción"        
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<Tag>
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
      <Table.Column<Tag>
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