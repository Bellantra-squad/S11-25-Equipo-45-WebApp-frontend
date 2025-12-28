import { useTable, List, CreateButton } from "@refinedev/antd";
import { useNavigation, type HttpError, type LogicalFilter } from "@refinedev/core";
import { Button, Form, Input, Space } from "antd";
import { TableViewTags } from "../components/table-view-tags";
import { Tag } from "../../../interfaces/models/tag.interface";
import { ArrowLeftOutlined } from "@ant-design/icons";


interface ISearch {
  search?: string;
}

export default function TagListPage() {
    const { create } = useNavigation();
    const {
        tableProps,
        searchFormProps,
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
        title="Lista de Etiquetas"
        headerButtons={() => (
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => window.history.back()}
            >
              Atrás
            </Button>           
            <CreateButton onClick={() => create("tags")}>Crear Etiqueta</CreateButton>
          </Space>
        )}
      >
      <Form {...searchFormProps} style={{ marginBottom: 16, justifyContent: "flex-end" }}>
        <Space.Compact>
            <Form.Item name="search">
              <Input.Search
                placeholder="Buscar por Etiquetas"
                allowClear
                onSearch={() => searchFormProps.form?.submit()}
              />
            </Form.Item>      
            <Button onClick={handleResetFilters} type="default">
                Limpiar filtros
              </Button>
            </Space.Compact>            
      </Form>
            <TableViewTags tableProps={tableProps} sorters={sorters} />
      </List>
    </div>
  );
}