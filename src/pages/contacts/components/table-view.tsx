import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultFilter,
  getDefaultSortOrder,
  ShowButton,
} from "@refinedev/antd";
import { CrudFilters, CrudSorting } from "@refinedev/core";
import { Table, Select, Space } from "antd";
import type { TableProps } from "antd";
import { Contact } from "../../../interfaces/models/contact.interface";
import { StatusTag } from "../../../components";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

type Props = {
  tableProps: TableProps<Contact>;
  filters: CrudFilters;
  sorters: CrudSorting;
};

export const TableView: React.FC<Props> = ({ tableProps, filters, sorters }) => {
  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total) => `${total} contactos`,
      }}
      rowKey="id"
    >
      <Table.Column<Contact>
        dataIndex="first_name"
        title="Nombre"
        sorter
        defaultSortOrder={getDefaultSortOrder("first_name", sorters)}        
        render={(value: string) => <span>{value}</span>}
      />
     
      <Table.Column<Contact>
        dataIndex="last_name"
        title="Apellido"
        sorter
        defaultSortOrder={getDefaultSortOrder("last_name", sorters)}      
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<Contact>
        dataIndex="email"
        title="Correo"       
        render={(value: string) => <span>{value}</span>}
      />

      <Table.Column<Contact>
        dataIndex="phone"
        title="Telefono"
        render={(value: string) => <span>{value}</span>}
      />

       <Table.Column<Contact>
        dataIndex="is_primary"
        title="Principal"
        defaultFilteredValue={getDefaultFilter("is_primary", filters)}
        defaultSortOrder={getDefaultSortOrder("is_primary", sorters)}
        filterDropdown={(props) => (
         <FilterDropdown {...props}>
            <Select
              placeholder="Filtrar por Principal"
              style={{ width: 160 }}
              options={[
                { value: "true", label: "Si" },
                { value: "false", label: "No" },
              ]}
            />
          </FilterDropdown>
        )}   
        render={(value: boolean) =>
          <StatusTag
                value={value}
                trueLabel={"Si"}
                falseLabel={"No"} 
                trueIcon= {<CheckCircleOutlined />} 
                falseIcon={<CloseCircleOutlined />}
            />
        }/>  


      <Table.Column<Contact>
        dataIndex="lead"
        title="Lead"        
        render={(value?: number) => (value ? `Lead ${value}` : "-")}
      />
     
      <Table.Column<Contact>
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