import { Form, Input, Checkbox } from "antd";

export function ContactFormFields() {
  return (
    <>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="Is Primary" name="is_primary" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item label="Is Decision Maker" name="is_decision_maker" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </>
  );
}