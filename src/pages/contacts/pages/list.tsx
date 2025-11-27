import { useTable, List } from "@refinedev/antd";
import type { HttpError, LogicalFilter } from "@refinedev/core";
import { Button, Form, Input, Select, Space } from "antd";
import { TableView } from "../components/table-view";
import { Contact } from "../../../interfaces/models/contact.interface";

interface ISearch {
  first_name?: string;
  last_name?: string;
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
                    field: "first_name",
                    order: "asc",
                },
            ],
        },
        filters: {
            initial: [
                {
                    field: "first_name",
                    operator: "contains",
                    value: undefined,
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
                if (values.first_name) {
                    f.push({ field: "first_name", operator: "contains", value: values.first_name });
                }
                 if (values.last_name) {
                    f.push({ field: "last_name", operator: "contains", value: values.last_name });
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
        <Form.Item name="first_name">
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