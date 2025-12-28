import { Show } from '@refinedev/antd';
import { Descriptions, Card, Button, Space } from 'antd';
import { useNavigation, useShow } from "@refinedev/core";
import { Category } from '../../../interfaces/models/category.interface';
import { EditOutlined, ReloadOutlined, UnorderedListOutlined } from '@ant-design/icons';


export default function CategoryShow() {
  const { result: record, query } = useShow<Category>();
  const { list, edit } = useNavigation();  
  const {  isLoading,  refetch } = query;
    
  return (
     <Show 
     isLoading={isLoading} 
      title={record ? record?.name : "Detalle de Categoría"}     
      headerButtons={() => (
        <Space>
          <Button icon={<UnorderedListOutlined />} onClick={() => list("categories")}>
            Categorías
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
            Refrescar
          </Button>
          {record && (
            <Button type='primary' icon={<EditOutlined />} onClick={() => edit("categories", record.id)}>
              Editar
            </Button>
          )}
        </Space>
      )}>    
        <Descriptions column={1} bordered>
            <Descriptions.Item label="Nombre">{record?.name}</Descriptions.Item>
            <Descriptions.Item label="Descripción">{record?.description}</Descriptions.Item>
            <Descriptions.Item  label="Color">
                
                <Card
                    className="site-badge-count-109 "                    
                    style={{ backgroundColor: record?.color, width:"200px" }}
                >
                { record?.color }
                </Card>
                </Descriptions.Item>  
                    
        </Descriptions>
    </Show>
  );

}