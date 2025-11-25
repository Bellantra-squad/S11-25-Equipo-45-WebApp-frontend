import { Form, Input, Checkbox, Row, Col } from "antd";
const { TextArea } = Input;


export function ContactFormFields() {
  return (
     <Row gutter="2rem">
      <Col span={12}>
      <Form.Item label="Nombre" name="first_name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}><Form.Item label="Apellido" name="last_name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
      </Col> 
      <Col span={6}>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
      </Col>     
      <Col span={6}>
          <Form.Item label="Whatsapp" name="whatsapp_number">
            <Input />
          </Form.Item>
       </Col>
       <Col span={6}>
        <Form.Item label="Lead" name="lead" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
       <Col span={6}>
        <Form.Item label="Ocupación" name="position" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Departmento" name="department" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Notas" name="notes">
          <TextArea rows={4} />
        </Form.Item>
      </Col>
       <Col span={6}>
        <Form.Item label="Is Primary" name="is_primary" valuePropName="checked">
          <Checkbox />
        </Form.Item>
       </Col> 
        <Col span={6}> 
          <Form.Item label="Is Decision Maker" name="is_decision_maker" valuePropName="checked">
          <Checkbox />
        </Form.Item>
      </Col>     
     
    </Row>
  );
}