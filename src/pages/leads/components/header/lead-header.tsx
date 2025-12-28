import { FC } from "react";
import { Row, Col, Form,  Select, Button, Dropdown, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import type { MenuProps } from "antd";
import { PaginationControls } from "../../../../interfaces/internal/pagination.interface";
import { LeadSource } from "../../../../interfaces/models/lead.interface";
import { useSelect } from "@refinedev/antd";
import { User } from "../../../../interfaces";
import { IFilter } from "../../pages/list";

interface LeadHeaderProps {
  form: FormInstance;                
  menuItems: MenuProps["items"];     
  onChangeFilters: (values: IFilter) => void;
  pagination: PaginationControls;           
}

export const LeadHeader: FC<LeadHeaderProps> = ({ form, menuItems, onChangeFilters, pagination }) => {
  const { currentPage, maxPage, setCurrentPage, pageSize, setPageSize } = pagination;

  const { selectProps: categorySelectProps, query: qcategory } = useSelect({
    resource: "categories",
    optionLabel: "name",
    optionValue: "id",
    pagination:{pageSize:20}
  });

  // useSelect para usuarios
  const { selectProps: userSelectProps, query: quser } = useSelect({
    resource: "users",
    optionLabel: (user: User) => `${user.first_name} ${user.last_name}`,
    optionValue: "id",
    pagination:{pageSize:50}
  });

  return (
    <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
      <Col>
        <h2>Tablero de Leads</h2>
      </Col>
      <Col>
      <Row>
        <Space.Compact>
        <Form form={form} layout="inline" onValuesChange={(_, values) => onChangeFilters(values)}>
            <Space.Compact>
            <Form.Item name="assigned_to" style={{padding:"0px", margin:"0px"}}>
                <Select
                  {...userSelectProps}
                  loading={quser.isLoading}
                  placeholder="Usuario"
                  style={{ width: 150 }}
                  allowClear
                />
            </Form.Item>
            <Form.Item name="lead_source" style={{padding:"0px", margin:"0px"}}>
                 <Select
                  placeholder="Lead Source"
                  style={{ width: 150 }}
                  allowClear
                >
                  {Object.entries(LeadSource).map(([label, value]) => (
                    <Select.Option key={value} value={value}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
            </Form.Item>
            <Form.Item name="category" style={{padding:"0px", margin:"0px"}}>
                <Select
                  {...categorySelectProps}
                  placeholder="Category"
                  loading={qcategory.isLoading}
                  style={{ width: 150 }}
                  allowClear
                />
            </Form.Item>
            </Space.Compact>
            </Form>      
            <Button
                type="default"
                onClick={() => {
                form.resetFields();
                onChangeFilters({});
                }}
            >
                Limpiar
            </Button> 
            </Space.Compact>
           
          {/* Controles de paginación */}
          <Space.Compact style={{ marginLeft: 16 }}>
            <Button
              onClick={() => {
                if (currentPage >= maxPage) {
                  setCurrentPage(1);
                } else {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              {currentPage >= maxPage ? "Volver al inicio" : "Cargar más leads"}
            </Button>
            <Select
              value={pageSize}
              style={{ width: 80 }}
              onChange={(value) => setPageSize(Number(value))}
            >
              {[5, 10, 20, 50].map((size) => (
                <Select.Option key={size} value={size}>
                  {size}
                </Select.Option>
              ))}
            </Select>
          </Space.Compact>        
         
           <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
          </Row>
      </Col>
    </Row>
  );
};
