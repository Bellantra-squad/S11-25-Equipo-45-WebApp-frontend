import { useForm } from "@refinedev/antd";
import { Button, Form, Select } from "antd";

type Props = {
  initialValues: {
    contactIds?: { label: string; value: number }[];
  };
  cancelForm: () => void;
};

export const ContactsForm = ({ initialValues, cancelForm }: Props) => {
  const { formProps, saveButtonProps } = useForm({
    queryOptions: { enabled: false },
    redirect: false,
    onMutationSuccess: cancelForm,
  });

  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <Form {...formProps} initialValues={initialValues} style={{ width: "100%" }}>
        <Form.Item name="contactIds">
          <Select
            mode="multiple"
            options={initialValues.contactIds}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>

      <Button {...saveButtonProps} type="primary">
        Save
      </Button>
    </div>
  );
};