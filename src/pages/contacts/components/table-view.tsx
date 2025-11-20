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
import { Contact } from "../../../interfaces/models/contact.interface";

type Props = {
  tableProps: TableProps<Contact>;
  filters: CrudFilters;
  sorters: CrudSorting;
};

export const TableView: React.FC<Props> = ({ tableProps, filters, sorters }) => {
  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total) => `${total} contacts`,
      }}
      rowKey="id"
    >
      <Table.Column<Contact>
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

      <Table.Column<Contact>
        dataIndex="email"
        title="Email"
        defaultFilteredValue={getDefaultFilter("email", filters)}
        defaultSortOrder={getDefaultSortOrder("email", sorters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder="Search Name" />
          </FilterDropdown>
        )}
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<Contact>
        dataIndex="phone"
        title="Phone"
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<Contact>
        dataIndex="lead"
        title="Lead"
        defaultFilteredValue={getDefaultFilter("lead", filters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Select
              placeholder="Filter by Lead"
              style={{ width: 160 }}
              options={[
                { value: 1, label: "Lead 1" },
                { value: 2, label: "Lead 2" },
              ]}
            />
          </FilterDropdown>
        )}
        render={(value?: number) => (value ? `Lead ${value}` : "-")}
      />

      <Table.Column<Contact>
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