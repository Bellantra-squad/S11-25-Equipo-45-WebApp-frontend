import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultFilter,
  getDefaultSortOrder,
  ShowButton,
} from "@refinedev/antd";
import { CrudFilters, CrudSorting } from "@refinedev/core";
import { Table, Input, Select, Space } from "antd";
import type { TableProps } from "antd";
import { Tag } from "../../../interfaces/models/tag.interface";

type Props = {
  tableProps: TableProps<Tag>;
  filters: CrudFilters;
  sorters: CrudSorting;
};

export const TableViewTags: React.FC<Props> = ({ tableProps, filters, sorters }) => {
  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total) => `${total} Tags`,
      }}
      rowKey="id"
    >
      <Table.Column<Tag>
        dataIndex="name"
        title="Name"
        defaultFilteredValue={getDefaultFilter("name", filters)}
        defaultSortOrder={getDefaultSortOrder("name", sorters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder="Search Name" />
          </FilterDropdown>
        )}
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<Tag>
        dataIndex="description"
        title="Descripción"
        defaultFilteredValue={getDefaultFilter("description", filters)}
        defaultSortOrder={getDefaultSortOrder("description", sorters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Select
              placeholder="Filtrar por color"
              style={{ width: 160 }}
              options={[
                { value: "#1677ff", label: "Azul" },
                { value: "#ff0000", label: "Rojo" },
              ]}
            />
          </FilterDropdown>
        )}
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
        title="Actions"
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