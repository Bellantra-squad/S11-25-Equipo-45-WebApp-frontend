import { useTable, List, CreateButton, useSelect } from "@refinedev/antd";
import { useNavigation, type HttpError, type LogicalFilter } from "@refinedev/core";
import { Button, Form, Input, Select, Space } from "antd";
import { TableView } from "../components/table-view";
import { Contact } from "../../../interfaces/models/contact.interface";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Lead } from "../../../interfaces/models/lead.interface";

interface ISearch {
  search?: string; 
  lead?: string;
}

export default function ContactsListPage() {

    const { create } = useNavigation();    

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
                {
                    field: "last_name",
                    order: "asc",
                },
            ],
        },
        filters: {
            initial: [                
                {
                  field: "lead",
                  value: undefined,
                  operator: "eq",
                },
                {
                  field: "is_decision_maker",
                  value: undefined,
                  operator: "eq",
                },
            ],
        },
        onSearch: (values) => {
            const f: LogicalFilter[] = [];
                if (values.search) {
                    f.push({ field: "search", operator: "contains", value: values.search });
                }
                if (values.lead) {
                    f.push({ field: "lead", operator: "eq", value: values.lead });
                }
            return f;
        },
    });


  const { selectProps: leadSelectProps } = useSelect({
    resource: "leads",
    optionLabel: (lead: Lead) => `${lead.company_name} (Lead ${lead.id})`,
    optionValue: "id",
    pagination: { pageSize: 50 },
  });

  const handleResetFilters = () => {   
    searchFormProps.form?.resetFields();
    setFilters([], "replace");
  };

  return (
    <div className="page-container">
      <List
        title="Lista de Contactos"
        headerButtons={() => (
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => window.history.back()}
            >
              Atrás
            </Button>           
            <CreateButton onClick={() => create("contacts")}>Crear Contacto</CreateButton>
          </Space>
        )}
      >
        <Form {...searchFormProps} style={{ marginBottom: 16, justifyContent: "flex-end" }}>
          <Space.Compact>
            <Form.Item name="search">
              <Input.Search
                placeholder="Buscar "
                allowClear
                onSearch={() => searchFormProps.form?.submit()}
              />
            </Form.Item>
            <Form.Item name="lead">            
                <Select
                  {...leadSelectProps}
                  placeholder="Filtrar por Lead"
                  allowClear
                  showSearch
                  style={{ width: 240 }}
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