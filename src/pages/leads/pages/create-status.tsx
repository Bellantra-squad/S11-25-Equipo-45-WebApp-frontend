import { useModalForm } from "@refinedev/antd";
import { useInvalidate, useNavigation } from "@refinedev/core";
import { Form, Input, InputNumber, Modal, Switch } from "antd";
import { ColorPicker } from "antd";

export const KanbanCreateLeadStatus = () => {

  const invalidate = useInvalidate();
  const { list } = useNavigation();

  const { formProps, modalProps, close } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "lead-statuses",   // 💡 Tu recurso REST
    onMutationSuccess: () => {
      invalidate({
        resource: "lead-statuses",
        invalidates: ["list"],
      });

      invalidate({
        resource: "leads",
        invalidates: ["list"],
      });
    },
    successNotification: () => ({
      key: "create-lead-status",
      type: "success",
      message: "Estado creado correctamente",
      description: "El estado se agregó al tablero Kanban.",
    }),
  });

  return (
    <Modal
      {...modalProps}
      title="Crear nuevo estado"
      width={520}
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
            ...values,
            color: "#777777"//values.color?.toHexString?.() ?? values.color, // 🟦 convierte ColorPicker → HEX
          });
        }}
      >
        <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true }]}
        >
          <ColorPicker defaultValue="#1677ff" showText />
        </Form.Item>

        <Form.Item
          label="Posición"
          name="order_position"
          rules={[{ required: true }]}
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