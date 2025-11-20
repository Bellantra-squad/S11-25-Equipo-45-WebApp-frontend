import { useTable, List } from "@refinedev/antd";
import type { HttpError, LogicalFilter } from "@refinedev/core";
import { Button, Form, Input, Select, Space } from "antd";
import { TableView } from "../components/table-view";
import { Contact } from "../../../interfaces/models/contact.interface";

interface ISearch {
  name?: string;
  lead?: number;
}

export default function ContactsListPage() {
    const {
        tableProps,
        searchFormProps,
        filters,
        sorters,
        setFilters,
    } = useTable<Contact, HttpError, ISearch>({
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
                    value: "",
                },
                {
                  field: "email",
                  value: undefined,
                  operator: "contains",
                },
                {
                  field: "lead",
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
                if (values.lead) {
                    f.push({ field: "lead", operator: "eq", value: values.lead });
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
        <Form.Item name="lead">
          <Select
            placeholder="Filtrar por Lead"
            allowClear
            style={{ width: 160 }}
            options={[
              { value: 1, label: "Lead 1" },
              { value: 2, label: "Lead 2" },
            ]}
             onChange={() => searchFormProps.form?.submit()} 
          />
        </Form.Item>
         <Button onClick={handleResetFilters} type="default">
            Limpiar filtros
          </Button>
        </Space.Compact>
        
      </Form>
        <TableView tableProps={tableProps} filters={filters} sorters={sorters} />
      </List>
    </div>
  );
}