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
import { UserTag } from "../../../components/tags/user-tag";
import { statusLabels } from "../../../interfaces/constants/task-labels";

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
        showTotal: (total) => `${total} Tareas`,
      }}
      rowKey="id"
    >
      <Table.Column<Task>
        dataIndex="title"
        title="Título"        
        render={(value: string) => <span>{value}</span>}
      />

       <Table.Column<Task>
        dataIndex="description"
        title="Descripción"        
        render={(value: string) => (
            <span
            style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,       // máximo 2 líneas
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",     // permite salto de línea
            }}
            >
            {value}
            </span>
        )}
      />

      <Table.Column<Task>
        dataIndex="task_type"
        title="Tipo"       
        render={(value: Task_Type) => <span>{value}</span>}
      />

      <Table.Column<Task>
        dataIndex="priority"
        title="Prioridad"
        render={(value: Priority) => <PriorityTag priority={value} />}
        />

      <Table.Column<Task>
        dataIndex="status"
        title="Estado"
         defaultFilteredValue={getDefaultFilter("is_active", filters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
             <Select
              placeholder="Filtrar por estado"
              style={{ width: 160 }}>                
              {Object.values(Status).map((s) => (
                <Select.Option key={s} value={s}>
                  {statusLabels[s]}
                </Select.Option>
              ))}
            </Select>            
          </FilterDropdown>
        )}
        render={(value: Status) => <StatusTaskTag status={value} />}
        />

      <Table.Column<Task>
        dataIndex="due_date"
        sorter
        defaultSortOrder={getDefaultSortOrder("due_date", sorters)}
        title="Vencimiento"
        render={(value: Date) => <span>{new Date(value).toLocaleDateString()}</span>}
      />
 
      <Table.Column<Task>
      dataIndex={["assigned_to"]}
      title="Asignado a"      
      render={(_, record) => {        
        return (  
          (record.assigned_to &&  <UserTag user={record!.assigned_to} />)         
        );
      }}
    />

      <Table.Column<Task>
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
