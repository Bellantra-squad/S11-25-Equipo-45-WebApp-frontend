import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultFilter,
  getDefaultSortOrder,
  ShowButton,
  useSelect,
} from "@refinedev/antd";
import { CrudFilters, CrudSorting } from "@refinedev/core";
import { Table, Input, Space, Select } from "antd";
import type { TableProps } from "antd";
import { EmailTemplate } from "../../../interfaces/models/email-templates";
import { StatusTag } from "../../../components";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { User } from "../../../interfaces";
import { CustomAvatar } from "../../../components/header/CustomAvatar";
import { Text } from "../../../components/base/text";

type Props = {
  tableProps: TableProps<EmailTemplate>;
  filters: CrudFilters;
  sorters: CrudSorting;
};

export const TableViewEmailTemplates: React.FC<Props> = ({ tableProps, filters, sorters }) => {


  const { selectProps: userSelect  } = useSelect<User>({
      resource: "users",
      optionLabel: "email",
      optionValue: "id",
      pagination: { pageSize: 50 },
    });

  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total) => `${total} Plantillas`,
      }}
      rowKey="id"
    >
      <Table.Column<EmailTemplate>
        dataIndex="name"
        title="Nombre"
        sorter
        defaultSortOrder={getDefaultSortOrder("name", sorters)}
        render={(value: string) => <span>{value}</span>}
      />
      <Table.Column<EmailTemplate>
        dataIndex="subject"
        title="Asunto"
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<EmailTemplate>
        dataIndex="body"
        title="Cuerpo"        
        render={(value: string) => (
            <span
            style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,       
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",    
            }}
            >
            {value}
            </span>
        )}
      />

       <Table.Column<EmailTemplate>
        dataIndex="template_type"
        title="Tipo de Plantilla"
        defaultFilteredValue={getDefaultFilter("template_type", filters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder="Buscar tipo de Plantilla" />
          </FilterDropdown>
        )}
        render={(value: string) => <span>{value}</span>}
      />

       <Table.Column<EmailTemplate>
        dataIndex={["created_by"]}
        title="Creado por"
        defaultFilteredValue={getDefaultFilter("created_by", filters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Select
              placeholder="Search Sales owner"
              style={{ width: 220 }}
              {...userSelect}
            />
          </FilterDropdown>
        )}
        render={(_, record) => {
          const user = record.created_by;
          return (
            <Space>
              <CustomAvatar                
                  name={`${user.last_name} ${user.last_name}`}
                  size={40}
                  style={{ display: "inline-flex" }}
                  /> 
              <Text style={{whiteSpace: "nowrap"}}>
                {`${user.first_name} ${user.last_name}`}
              </Text>
            </Space>
          );
        }}
      />

      <Table.Column<EmailTemplate>
        dataIndex="is_active"
        title="Estado"
        defaultFilteredValue={getDefaultFilter("is_active", filters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Select
              placeholder="Filtrar por estado"
              style={{ width: 160 }}
              options={[
                { value: true, label: "Activo" },
                { value: false, label: "Desactivado" },
              ]}
            />
          </FilterDropdown>
        )}
        render={(value: boolean) =>
        <StatusTag
                value={value}
                trueLabel={"Activo"}
                falseLabel={"Inactivo"} 
                trueIcon= {<CheckCircleOutlined />} 
                falseIcon={<CloseCircleOutlined />}
            />
        }/>  
    
      <Table.Column<EmailTemplate>
        fixed="right"
        title="Acciones"
        dataIndex="actions"
        render={(_, record) => (
          <Space>
            <EditButton hideText size="small" recordItemId={record.id} />
            <ShowButton hideText size="small" recordItemId={record.id} />
            <DeleteButton hideText size="small" recordItemId={record.id} />
          </Space>
        )}
      />
    </Table>
  );
};