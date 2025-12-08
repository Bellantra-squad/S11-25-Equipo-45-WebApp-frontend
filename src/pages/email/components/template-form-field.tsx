import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Input, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { TemplateType } from "../../../interfaces/models/email-templates";
import { useGetIdentity } from "@refinedev/core";

export function TemplateForm() {
    const { data: user } = useGetIdentity(); 
    
  return (
    <>
        <Form.Item label="Nombre" name="name" rules={[{ required: true, message: "El Nombre es obligatorio" }]}>
            <Input />
        </Form.Item>
        <Form.Item label="Asunto" name="subject" rules={[{ required: true, message: "El Asunto es obligatorio" }]}>
            <Input />
        </Form.Item>
        <Form.Item label="Mensaje" name="body" rules={[{ required: true, message: "El Mensaje es obligatorio" }]}>
            <TextArea rows={10} />
        </Form.Item>
        <Form.Item
        label="Tipo de Plantilla"
        name="template_type"
        rules={[{ required: true, message: "El tipo de plantilla es obligatorio" }]}
        >
        <Select placeholder="Selecciona un tipo de plantilla">
            {Object.values(TemplateType).map((type) => (
            <Select.Option key={type} value={type}>
                {type.replace("_", " ").toUpperCase()}
            </Select.Option>
            ))}
        </Select>
        </Form.Item>
        
        <Form.Item
            label="Estado"
            name="is_active"
            valuePropName="checked"
            initialValue={true}
        >
            <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
            />
        </Form.Item>

        <Form.Item
            name="created_by_id"
            initialValue={user?.id}   
            
        >
            <Input type="hidden" />
        </Form.Item>
        
    </>
  );
}