import React from "react";
import { CreateButton, List, useTable } from "@refinedev/antd";
import { HttpError, LogicalFilter, useNavigation, usePermissions } from "@refinedev/core";
import { Button, Form, Input, Space, Spin } from "antd";
import { ApiOutlined } from "@ant-design/icons";
import { IntegrationAPI } from "../../../../../interfaces/models/integration-api.interfaces";
import { IntegrationsCardView } from "../../components/integrations/integrations-card-view";
import { Text } from "../../../../../components/base/text";
import { Outlet } from "react-router";


type Props = React.PropsWithChildren;

interface ISearch {
  search?: string;
}

const IntegrationsListPage: React.FC<Props> = ({ children }) => {
   
    const { create } = useNavigation(); 
  
    const { data: permissionsData } = usePermissions({
        params: { tenantId: "id" }, // you can pass parameters to getPermissions
    });

    const {
        tableProps,
        searchFormProps,
        setCurrentPage,
        setPageSize,
        setFilters,
        tableQuery
    } = useTable<IntegrationAPI, HttpError, ISearch>({
        resource: "api-credentials",
        pagination: {
        pageSize: 12,
        },
        filters: {
        initial: [
            {
            field: "service_name",
            operator: "contains",
            value: undefined,
            },
        ],
        },
        onSearch: (values) => {
        const f: LogicalFilter[] = [];
        if (values.search) {
            f.push({
            field: "search",
            operator: "contains",
            value: values.search,
            });
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
            <Space size="middle" style={{ marginTop:"10px"}}>
            <ApiOutlined />
            <Text size="lg">Integraciones</Text>
            </Space>
        }
        headerButtons={() => (
            <Space style={{ marginTop:"15px"}}>                          
               <CreateButton onClick={() => create("api-credentials")}>Crear Integración</CreateButton>         
               <Space.Compact>
                    <Form {...searchFormProps} layout="inline">
                        <Form.Item name="search" noStyle>
                        <Input.Search                            
                            placeholder="Buscar "
                            allowClear
                            onSearch={() => searchFormProps.form?.submit()}                    
                            prefix={
                            <Spin
                            size="small"
                            spinning={tableQuery.isFetching}
                            />
                        }
                        />              
                    </Form.Item>
                     </Form>
                    <Button onClick={handleResetFilters} type="default">
                        Limpiar filtros
                    </Button>
                   
                </Space.Compact>
            </Space>
            )}
        canCreate={permissionsData?.includes("admin")}  
        contentProps={{
          style: {
            marginTop: "28px",
          },
        }}        
      >
        <IntegrationsCardView
          tableProps={tableProps}
          setPageSize={setPageSize}
          setCurrent={setCurrentPage}
        />
        {children}
      </List>

      <Outlet />
    </div>
    
  );
};

export default IntegrationsListPage;