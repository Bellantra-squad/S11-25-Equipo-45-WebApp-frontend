import { Form, Input, Button, Space } from "antd";
import { useForm } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { Lead } from '../../../../interfaces/models/lead.interface';

type Props = {
  initialValues: {
    notes?: string;
  };
  cancelForm: () => void;
};

export const DescriptionForm = ({ initialValues, cancelForm }: Props) => {
  const { formProps, saveButtonProps } = useForm<
    { description?: string },
    HttpError,
    { description?: string }
  >({
    queryOptions: { enabled: false },
    redirect: false,

    onMutationSuccess: () => {
      cancelForm();
    },
      meta: {
        transformPayload(values: Lead) {
          return {
            description: values.notes,
          };
        },
      },
    });

  return (
    <>
      <Form {...formProps} initialValues={initialValues} layout="vertical">
        <Form.Item
          name="notes"
        >
          <Input.TextArea rows={8} placeholder="Write a description..." />
        </Form.Item>
      </Form>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          marginTop: "12px",
        }}
      >
        <Space>
          <Button  type="default" onClick={cancelForm}>
            Cancelar
          </Button>

          <Button type="primary" {...saveButtonProps}>
            Guardar
          </Button>
        </Space>
      </div>
    </>
  );
};
