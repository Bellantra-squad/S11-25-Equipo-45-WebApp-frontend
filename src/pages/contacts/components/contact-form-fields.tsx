import { useSelect } from "@refinedev/antd";
import { Form, Input, Row, Col, Select, Switch } from "antd";
import { Lead } from "../../../interfaces/models/lead.interface";
const { TextArea } = Input;


export function ContactFormFields() {

  const { selectProps: leadSelectProps } = useSelect({
      resource: "leads",
      optionLabel: (lead: Lead) => `${lead.company_name} (Lead ${lead.id})`,
      optionValue: "id",
      pagination: { pageSize: 50 },
    });


  return (
     <Row gutter="2rem">
      <Col span={12}>
      <Form.Item label="Nombre" name="first_name" rules={[{ required: true, message:"El nombre es obligatorio" }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}><Form.Item label="Apellido" name="last_name" rules={[{ required: true, message:"El apellido es obligatorio" }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Email" name="email" rules={[{ type: "email", message:"No es un email válido"}]}>
          <Input />
        </Form.Item>
      </Col> 
      <Col span={6}>
        <Form.Item label="Phone" name="phone" rules={[{
          pattern: /^\+?[0-9]{7,15}$/,
          message: "No es un número de teléfono válido",
        },]}>
          <Input />
        </Form.Item>
      </Col>     
      <Col span={6}>
          <Form.Item label="Whatsapp" name="whatsapp_number" rules={[{
            pattern: /^\+?[0-9]{7,15}$/,
            message: "No es un número de teléfono válido",
          },]}>
            <Input />
          </Form.Item>
       </Col>
       <Col span={6}>
        <Form.Item label="Lead" name="lead" rules={[{ required: true, message:"Debe Seleccionar un Lead" }]}>
         <Select
          {...leadSelectProps}
          placeholder="Filtrar por Lead"
          allowClear
          showSearch
          style={{ width: 240 }}                 
          />
        </Form.Item>
      </Col>
       <Col span={6}>
        <Form.Item label="Ocupación" name="position" rules={[{ required: true, message:"La ocupación es obligatoria" }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Departmento" name="department" rules={[{ required: true , message:"El Departamento es obligatorio"}]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Notas" name="notes">
          <TextArea rows={4} />
        </Form.Item>
      </Col>
       <Col span={6}>
        <Form.Item label="Contacto Principal" name="is_primary" valuePropName="checked">
          <Switch />
        </Form.Item>
       </Col> 
        <Col span={6}> 
          <Form.Item label="Tomador de Decisiones" name="is_decision_maker" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Col>     
     
    </Row>
  );
}