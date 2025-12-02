import { Space, Tag, Tooltip } from "antd";
import { Text } from "../../../../components/base/text";
import { Lead } from "../../../../interfaces/models/lead.interface";
import { CustomAvatar } from "../../../../components/header/CustomAvatar";



export const DetailsHeader = ({
  industry,
  lead_source,
  category,
  assigned_to,
  estimated_value,
  lead_score,
}: Partial<Lead>) => { 

  return (  
     <div style={{ display: "flex", flexDirection: "row" }}>

        {assigned_to && (
            <Space
              size={2}
              wrap
              direction="horizontal"
              align="center"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginLeft: "auto",
                marginRight: "20px",
              }}
            >  
              <Tooltip key={assigned_to.id} title={assigned_to.first_name + " " + assigned_to.last_name}>
                  <CustomAvatar                
                name={assigned_to.email}
                size={40}
                style={{ display: "inline-flex" }}
                />
              </Tooltip>
              
            </Space>
        )}

        {industry && <Text type="secondary">Industry: {industry}</Text>}
       
        {category && (
            <Text type="secondary">Categorias: 
             <Tag color={category.color}>
            {category.name}
          </Tag>
            </Text>
         
        )}

        {lead_source && (
             <Text type="secondary">Origen: 
             <Tag color="blue">
            {lead_source}
          </Tag>
            </Text>
          
        )}

        {estimated_value && (
          <Text>
            Valor estimado: <strong>{estimated_value}</strong>
          </Text>
        )}

        <Text>Score: {lead_score}</Text>
   
    </div>
)};