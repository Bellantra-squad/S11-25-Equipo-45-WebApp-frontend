import { Show } from '@refinedev/antd';
import { Descriptions, Card } from 'antd';
import { useShow } from "@refinedev/core";
import { Tag } from '../../../interfaces/models/tag.interface';


export default function TagShow() {
  const { result: record, query } = useShow<Tag>();
    
  const { isLoading } = query;
  return (
    <Show isLoading={isLoading} title={record?.name}>
        <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">{record?.name}</Descriptions.Item>
            <Descriptions.Item label="Description">{record?.description}</Descriptions.Item>
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