import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultFilter,
  getDefaultSortOrder,
  ShowButton,
} from "@refinedev/antd";
import { CrudFilters, CrudSorting } from "@refinedev/core";
import { Table, Space, Select } from "antd";
import type { TableProps } from "antd";
import { Task, Task_Type, Priority, Status } from "../../../interfaces/models/task.interface";
import { PriorityTag } from "../../../components/tags/priority-tag";
import { StatusTaskTag } from "../../../components/tags/status-task-tag";

type Props = {
  tableProps: TableProps<Task>;
  filters: CrudFilters;
  sorters: CrudSorting;
};

export const TableViewTasks: React.FC<Props> = ({ tableProps, filters, sorters }) => {
  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total) => `${total} Tasks`,
      }}
      rowKey="id"
    >
      <Table.Column<Task>
        dataIndex="title"
        title="Title"      
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<Task>
        dataIndex="description"
        title="Description"
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<Task>
        dataIndex="task_type"
        title="Task Type"
        render={(value: Task_Type) => <span>{value}</span>}
      />

      <Table.Column<Task>
        dataIndex="priority"
        title="Priority"
        render={(value: Priority) => <PriorityTag priority={value} />}
        />

      <Table.Column<Task>
        dataIndex="status"
        title="Status"
         defaultFilteredValue={getDefaultFilter("is_active", filters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
             <Select
              placeholder="Filtrar por estado"
              style={{ width: 160 }}>
                {Object.values(Priority).map((priority) => (
                <Select.Option key={priority} value={priority}>
                    {priority}
                </Select.Option>
                ))}
            </Select>            
          </FilterDropdown>
        )}
        render={(value: Status) => <StatusTaskTag status={value} />}
        />

      <Table.Column<Task>
        dataIndex="due_date"
        defaultSortOrder={getDefaultSortOrder("due_date", sorters)}
        title="Due Date"
        render={(value: Date) => <span>{new Date(value).toLocaleDateString()}</span>}
      />

      <Table.Column<Task>
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
