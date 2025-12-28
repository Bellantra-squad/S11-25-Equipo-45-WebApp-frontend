import { useForm, useSelect } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { Button, Form, Select } from "antd";
import { User } from "../../../../interfaces";
import { Lead } from "../../../../interfaces/models/lead.interface";

type Props = {
  initialValues: {
    userId?: { label: string; value: number  };
  };   
  cancelForm: () => void;
};


export const UserLeadForm = ({ initialValues, cancelForm }: Props) => {
  const { formProps, saveButtonProps } = useForm<Lead, HttpError, Lead>({
      queryOptions: { enabled: false },
      redirect: false,
  
      onMutationSuccess: () => {
        cancelForm();
      },
        meta: {
          transformPayload(values: Lead) {
            return {
              assigned_to_id: values.assigned_to.id,
            };
          },
        },
      });

  const { selectProps } = useSelect({
    resource: "users",
    optionLabel: (user: User) => `${user.first_name} ${user.last_name}`, 
    optionValue: "id", 
    pagination: { pageSize: 50 },  
  });

  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <Form {...formProps} 
      initialValues={initialValues} 
      style={{ width: "100%" }}>
        <Form.Item name="assigned_to_id">
          <Select
             {...selectProps}
              filterOption={false}
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