import { useTable, List, CreateButton } from "@refinedev/antd";
import { useNavigation, type HttpError, type LogicalFilter } from "@refinedev/core";
import { Button, Form, Input, Space } from "antd";

import { Category } from "../../../interfaces/models/category.interface";
import { TableViewCategories } from "../components/table-view";
import { ArrowLeftOutlined, FolderOutlined } from "@ant-design/icons";
import { Text } from "../../../components/base/text";

interface ISearch {
  search?: string;
}

export default function CategoryListPage() {
    const { create } = useNavigation();  
    const {
        tableProps,
        searchFormProps,        
        sorters,
        setFilters,
    } = useTable<Category, HttpError, ISearch>({
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
        title={
          <Space size="middle" style={{ marginTop:"5px"}}>
            <FolderOutlined />
            <Text size="lg">Listado de Categorías</Text>
          </Space>
        }
        headerButtons={() => (
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => window.history.back()}
            >
              Atrás
            </Button>           
            <CreateButton onClick={() => create("categories")}>Crear Categorías</CreateButton>
          </Space>
        )}
      >
        <Form {...searchFormProps} style={{ marginBottom: 16, justifyContent: "flex-end" }}>
          <Space.Compact>
              <Form.Item name="search">
                <Input.Search
                  placeholder="Buscar por categoría"
                  allowClear
                  onSearch={() => searchFormProps.form?.submit()}
                />
              </Form.Item>             
              <Button onClick={handleResetFilters} type="default">
                  Limpiar filtros
                </Button>
              </Space.Compact>              
          </Form>
              <TableViewCategories tableProps={tableProps} sorters={sorters} />
      </List>
    </div>
  );
}