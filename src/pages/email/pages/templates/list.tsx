import { useTable, List } from "@refinedev/antd";
import type { HttpError, LogicalFilter } from "@refinedev/core";
import { Button, Form, Input, Space } from "antd";
import { EmailTemplate } from "../../../../interfaces/models/email-templates";
import { TableViewEmailTemplates } from "../../components/table-view-emailtemplates";

interface ISearch {
  search?: string;
}

export default function TagListPage() {
    const {
        tableProps,
        searchFormProps,
        filters,
        sorters,
        setFilters,
    } = useTable<EmailTemplate, HttpError, ISearch>({
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
                  field: "created_by",
                  value: undefined,
                  operator: "eq",
                },
                {
                  field: "template_type",
                  value: undefined,
                  operator: "contains",
                },
            ],
        },
        onSearch: (values) => {
            const f: LogicalFilter[] = [];
                if (values.search) {
                    f.push({ field: "search", operator: "contains", value: values.search });
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
      <List
      >

 <Form {...searchFormProps} style={{ marginBottom: 16, justifyContent: "flex-end" }}>
     <Space.Compact>
        <Form.Item name="search">
          <Input.Search
            placeholder="Buscar por nombre"
            allowClear
            onSearch={() => searchFormProps.form?.submit()}
          />
        </Form.Item>
       
         <Button onClick={handleResetFilters} type="default">
            Limpiar filtros
          </Button>
        </Space.Compact>
        
      </Form>
        <TableViewEmailTemplates tableProps={tableProps} filters={filters} sorters={sorters} />
      </List>
    </div>
  );
}