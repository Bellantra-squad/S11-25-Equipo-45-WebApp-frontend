import { ColorPicker, Form, Input } from "antd";

export function CategoriesForm() {
  return (
    <>
      <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Descripción" name="description" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Color"
        name="color"
        rules={[{ required: true }]}
        // 🔥 convierte automáticamente el valor recibido del ColorPicker
        getValueFromEvent={(color) => color.toHexString()}
        // 🔥 hace que el Form muestre correctamente el valor HEX
        normalize={(value) => value}
      >
        <ColorPicker
          format="hex"
          showText
          size="large"          
        />
      </Form.Item> 
    </>
  );
}