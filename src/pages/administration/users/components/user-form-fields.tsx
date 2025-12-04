import { Form, Input, Checkbox, Row, Col, Select } from "antd";
import { Role } from "../../../../interfaces";

export function UserFormFields() {
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
      <Col span={12}>
        <Form.Item label="Role" name="role">
            <Select>
                {Object.values(Role).map((role) => (
                <Select.Option key={role} value={role}>
                    {role.replace("ROLE_", "").toLowerCase()}
                </Select.Option>
                ))}
            </Select>
        </Form.Item>
      </Col>    
       <Col span={6}>
        <Form.Item label="Estado" name="is_active" valuePropName="checked">
          <Checkbox />
        </Form.Item>              
      </Col>  
    </Row>
  );
}