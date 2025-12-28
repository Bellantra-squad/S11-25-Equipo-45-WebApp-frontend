import {  Tag } from "antd";
import { Text } from "../../../../components/base/text";
import { Lead } from "../../../../interfaces/models/lead.interface";



export const DetailsHeader = ({
  industry,
  lead_source,
  category,  
  estimated_value,
  lead_score,
}: Partial<Lead>) => { 

  return (  
     <div style={{ display: "flex", flexDirection: "row" }}>

        {industry && <Text type="secondary">Industria: {industry}</Text>}
       
        {category && (
            <Text type="secondary">Categorias: 
             <Tag color={category.color}>
            {category.name}
          </Tag>
            </Text>
         
        )}

        {lead_source && (
             <Text type="secondary">Origen:  <Tag color="blue">
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