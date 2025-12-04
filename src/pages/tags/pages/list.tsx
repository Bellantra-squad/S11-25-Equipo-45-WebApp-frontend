import { useTable, List } from "@refinedev/antd";
import type { HttpError, LogicalFilter } from "@refinedev/core";
import { Button, Form, Input, Select, Space } from "antd";
import { TableViewTags } from "../components/table-view-tags";
import { Tag } from "../../../interfaces/models/tag.interface";


interface ISearch {
  name?: string;
  color?: string;
}

export default function TagListPage() {
    const {
        tableProps,
        searchFormProps,
        filters,
        sorters,
        setFilters,
    } = useTable<Tag, HttpError, ISearch>({
        pagination: { pageSize: 10 },
        sorters: {
            initial: [
                {
                    field: "name",
                    order: "asc",
                },
            ],
        },
        filters: {
            initial: [
                {
                    field: "name",
                    operator: "contains",
                    value: undefined,
                },
                {
                  field: "description",
                  value: undefined,
                  operator: "contains",
                },
                {
                  field: "color",
                  value: undefined,
                  operator: "eq",
                },
            ],
        },
        onSearch: (values) => {
            const f: LogicalFilter[] = [];
                if (values.name) {
                    f.push({ field: "name", operator: "contains", value: values.name });
                }
                if (values.color) {
                    f.push({ field: "color", operator: "eq", value: values.color });
                }
            return f;
        },
    });

  const handleResetFilters = () => {   
    searchFormProps.form?.resetFields();
    setFilters([], "replace");
  };

  return (
    <div className="page-container">
      <List>

 <Form {...searchFormProps} style={{ marginBottom: 16, justifyContent: "flex-end" }}>
     <Space.Compact>
        <Form.Item name="name">
          <Input.Search
            placeholder="Buscar por nombre"
            allowClear
            onSearch={() => searchFormProps.form?.submit()}
          />
        </Form.Item>
        <Form.Item name="color">
            <Select
                placeholder="Filtrar por color"
                style={{ width: 160 }}
                options={[
                { value: "#1677ff", label: "Azul" },
                { value: "#ff0000", label: "Rojo" },
                ]}
                onChange={() => searchFormProps.form?.submit()} 
            />
        </Form.Item>
         <Button onClick={handleResetFilters} type="default">
            Limpiar filtros
          </Button>
        </Space.Compact>
        
      </Form>
        <TableViewTags tableProps={tableProps} filters={filters} sorters={sorters} />
      </List>
    </div>
  );
}