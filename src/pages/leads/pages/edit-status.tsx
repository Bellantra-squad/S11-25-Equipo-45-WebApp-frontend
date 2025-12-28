
import { useModalForm } from "@refinedev/antd";
import { useInvalidate, useNavigation } from "@refinedev/core";
import { Form, Input, InputNumber, Modal, Switch } from "antd";
import { ColorPicker } from "antd";

const KanbanEditStage = () => {
  const invalidate = useInvalidate();
  const { list } = useNavigation();

  const { formProps, modalProps, close } = useModalForm({
    action: "edit",
    defaultVisible: true,
    resource: "lead-statuses",   
    onMutationSuccess: () => {    
      invalidate({ invalidates: ["list"], resource: "leads" });
    },
    successNotification: () => {
      return {
        key: "edit-stage",
        type: "success",
        message: "Successfully updated stage",
        description: "Successful",
      };
    },
  });

return (
    <Modal
      {...modalProps}
      title="Editar estado"
      width={520}
      okText="Guardar"
      cancelText="Cancelar"
      onCancel={() => {
        close();
        list("leads", "replace");
      }}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps.onFinish?.({
            ...values
          });
        }}
      >
        <Form.Item label="Nombre" name="name" rules={[{ required: true, message:"El Nombre es obligatorio" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="description"
          rules={[{ required: true, message:"La descripción es obligatoria" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message:"El Color es obligatorio" }]}
          getValueFromEvent={(color) => color.toHexString()}        
          normalize={(value) => value}
        >
          <ColorPicker defaultValue="#1677ff" showText />
        </Form.Item>

        <Form.Item
          label="Posición"
          name="order_position"
          rules={[{ required: true, message:"La Posición es obligatorio" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Activo"
          name="is_active"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};


export default KanbanEditStage;