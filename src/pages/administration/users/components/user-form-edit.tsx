import { Form, Input, Checkbox, Row, Col, Select } from "antd";
import { Role } from "../../../../interfaces";

export function UserFormEditFields() {
  return (
    <>
      <Row gutter="2rem">
        <Col span={12}>
          <Form.Item
            label="Nombre"
            name="first_name"
            rules={[{ required: true, message: "El nombre es obligatorio" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Apellido"
            name="last_name"
            rules={[{ required: true, message: "El apellido es obligatorio" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "El email es obligatorio" },
              { type: "email", message: "Formato de email inválido" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "El rol es obligatorio" }]}
          >
            <Select placeholder="Seleccione un rol">
              {Object.values(Role).map((role) => (
                <Select.Option key={role} value={role}>
                  {role.replace("ROLE_", "").toLowerCase()}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Estado"
            name="is_active"
            valuePropName="checked"
            initialValue={true}
          >
            <Checkbox />
          </Form.Item>
        </Col>          
      </Row>     
    </>
  );
}