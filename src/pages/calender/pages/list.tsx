import { useTable, List, CreateButton } from '@refinedev/antd';
import { useGo, useNavigation, type HttpError, type LogicalFilter } from '@refinedev/core';
import { Button, Form, Input, Select, Space } from "antd";
import { Status, Task, Task_Type } from "../../../interfaces/models/task.interface";
import { TableViewTasks } from "../components/table-view-task";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface ISearch {
  search?: string;
  status?: Status;
  task_type?: Task_Type;
}

export default function TaskListPage() {
  const {
    tableProps,
    searchFormProps,
    filters,
    sorters,
    setFilters,
  } = useTable<Task, HttpError, ISearch>({
    resource: "tasks",
    pagination: { pageSize: 10 },    
    sorters: {
      initial: [
        {
          field: "due_date",
          order: "desc",
        },      
      ],
      
    },    
    filters: {
      initial: [       
        {
          field: "status",
          operator: "eq",
          value: undefined,
        },
        {
          field: "task_type",
          operator: "eq",
          value: undefined,
        },
      ],
    },
    onSearch: (values) => {
      const f: LogicalFilter[] = [];
      if (values.search) {
        f.push({ field: "search", operator: "contains", value: values.search });
      }
      if (values.status) {
        f.push({ field: "status", operator: "eq", value: values.status });
      }
      if (values.task_type) {
        f.push({ field: "task_type", operator: "eq", value: values.task_type });
      }
      return f;
    },
  });

  const { create } = useNavigation();
  const go = useGo();

  const handleResetFilters = () => {
    searchFormProps.form?.resetFields();
    setFilters([], "replace");
  };

  return (
    <div className="page-container">
      <List     
      title="Lista de Tareas"
      headerButtons={() => (
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
          >
            Atrás
          </Button>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => go({ to: "/calendar" })} 
          >
            Ver Calendario
          </Button>
          <CreateButton onClick={() => create("tasks")}>Crear Tarea</CreateButton>
        </Space>
      )}
      >
        <Form {...searchFormProps} style={{ marginBottom: 16 }}>
          <Space.Compact>
            <Form.Item name="search">
              <Input.Search
                placeholder="Buscar por título"
                allowClear
                onSearch={() => searchFormProps.form?.submit()}
              />
            </Form.Item>
            <Form.Item name="status">
              <Select
                placeholder="Filtrar por estado"
                style={{ width: 160 }}
                options={Object.values(Status).map((s) => ({
                  value: s,
                  label: s,
                }))}
                onChange={() => searchFormProps.form?.submit()}
              />
            </Form.Item>
            <Form.Item name="task_type">
              <Select
                placeholder="Filtrar por tipo"
                style={{ width: 160 }}
                options={Object.values(Task_Type).map((t) => ({
                  value: t,
                  label: t,
                }))}
                onChange={() => searchFormProps.form?.submit()}
              />
            </Form.Item>
            <Button onClick={handleResetFilters} type="default">
              Limpiar filtros
            </Button>
          </Space.Compact>
        </Form>

        <TableViewTasks tableProps={tableProps} filters={filters} sorters={sorters} />
      </List>
    </div>
  );
}
