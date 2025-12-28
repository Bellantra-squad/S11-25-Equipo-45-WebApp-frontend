import { useForm, useSelect } from "@refinedev/antd";
import { useUpdateMany } from "@refinedev/core";
import { Button, Form, Select } from "antd";
import { Contact } from "../../../../interfaces/models/contact.interface";

type Props = {
  initialValues: {
    contactIds?: { label: string; value: number }[];
  };
  leadId: number; 
  cancelForm: () => void;
};

type FormValues = {
  contactIds?: number[];
};

export const ContactsForm = ({ initialValues,leadId, cancelForm }: Props) => {
  const { formProps, saveButtonProps } = useForm({
    queryOptions: { enabled: false },
    redirect: false,
    onMutationSuccess: cancelForm,
  });

  const { mutate } = useUpdateMany();

  const { selectProps } = useSelect({
    resource: "contacts",
    optionLabel: (contact: Contact) => `${contact.first_name} ${contact.last_name}`, 
    optionValue: "id", 
    pagination: { pageSize: 50 },  
  });

  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <Form {...formProps} 
      initialValues={initialValues} 
      style={{ width: "100%" }}
      onFinish={(values:FormValues) => {
        const contactIds = values.contactIds || [];
        mutate({
          resource: "contacts",
          ids: contactIds,
          values: { lead: leadId }, // 👈 asigna el lead
        });
  }}
      >
        <Form.Item name="contactIds">
          <Select
            mode="multiple"
             {...selectProps}
              filterOption={false}
            // options={initialValues.contactIds}
            style={{ width: "100%" }}
          />        
        </Form.Item>
      </Form>

      <Button {...saveButtonProps} type="primary">
        Guardar
      </Button>
    </div>
  );
};