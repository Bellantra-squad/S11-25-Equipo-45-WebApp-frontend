
import { useModalForm, useSelect } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import { Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import { Lead } from "../../../interfaces/models/lead.interface";
import { useSearchParams } from "react-router";
import { LeadStatus } from "../../../interfaces/models/lead-status.interfaces";
import { Tag } from "../../../interfaces/models/tag.interface";



const LeadCreateModal = () => {
  const [searchParams] = useSearchParams();
  const { list } = useNavigation();

  const { formProps, modalProps, close } = useModalForm<Lead>({
    action: "create",
    resource: "leads",
    defaultVisible: true,
    id: undefined, 
  });

   // Categories
    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
        optionLabel: "name",
        optionValue: "id",
    });

    //Usuario asignado
    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "email",
        optionValue: "id",
    });

    //Estados
     const { selectProps : statusSelectProps} = useSelect<LeadStatus>({
        resource: "lead-statuses",
        pagination: { mode: "off" },
        optionLabel: "name",   
        optionValue: "id",      
    });

     //Tags
     const { selectProps : tagsSelectProps} = useSelect<Tag>({
        resource: "tags",
        pagination: { mode: "off" },
        optionLabel: "name",   
        optionValue: "id",      
    });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        close();
        list("leads", "replace");
      }}
      title="Crear Lead"
      width={600}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps?.onFinish?.({
            ...values,
            stageId: searchParams.get("stageId")
              ? Number(searchParams.get("stageId"))
              : null,
          });
        }}
      >
        <Row>
          <Col span={24} style={{ padding: '0 8px' }}>
            <Form.Item label="Nombre de la compañía" name="company_name" rules={[{ required: true }]}>
              <Input  />
            </Form.Item>          
          </Col>         
        </Row>
        <Row>
          <Col span={12} style={{ padding: '0 8px' }}>
             <Form.Item label="Website" name="website">
              <Input />
            </Form.Item>          
          </Col>
          <Col span={12} style={{ padding: '0 8px' }}> 
             <Form.Item label="Industria" name="industry">
              <Input />
            </Form.Item>
          </Col>
        </Row>

         <Row>
          <Col span={12} style={{ padding: '0 8px' }}>
            <Form.Item label="Estado" name="status_id" rules={[{ required: true }]}>
              <Select {...statusSelectProps} placeholder="Seleccione el estado"/>
            </Form.Item>         
          </Col>
          <Col span={12} style={{ padding: '0 8px' }}> 
             <Form.Item label="Asignar Usuario" name="assigned_to_id" rules={[{ required: true }]}>
              <Select {...userSelectProps} placeholder="Seleccione un usuario" />
            </Form.Item>
          </Col>
        </Row>

         <Row>
          <Col span={24} style={{ padding: '0 8px' }}>
            <Form.Item label="Category"   name="category_id" rules={[{ required: true }]}>
              <Select {...categorySelectProps} placeholder="Seleccione la categoria"/>
            </Form.Item>          
          </Col>         
        </Row>

         <Row>
          <Col span={24} style={{ padding: '0 8px' }}>
            <Form.Item label="Tags" name="tag_ids">
                <Select {...tagsSelectProps} mode="multiple" style={{ width: "100%" }} />
            </Form.Item>          
          </Col>         
        </Row>
        
         <Row>
          <Col span={8} style={{ padding: '0 8px' }}>
             <Form.Item label="Origen del Lead" name="lead_source" rules={[{ required: true }]}>
              <Select placeholder="Seleccione un Origen">
                  <Select.Option value="cold_call">Cold Call</Select.Option>
                  <Select.Option value="referral">Referral</Select.Option>
                  <Select.Option value="social_media">Social Media</Select.Option>
                  <Select.Option value="website">Website</Select.Option>
              </Select>
          </Form.Item>         
          </Col>
          <Col span={8} style={{ padding: '0 8px' }}>              
          <Form.Item label="Lead Score" name="lead_score">
              <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          </Col>
          <Col span={8} style={{ padding: '0 8px' }}> 
            <Form.Item label="Estimated Value" name="estimated_value">
              <Input />
            </Form.Item>
          </Col>
        </Row>
          

       

           

            
          
          

          

         


          
        
    </Form>
      
    </Modal>
  );
};


export default LeadCreateModal;