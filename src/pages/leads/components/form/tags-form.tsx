import { useForm, useSelect } from "@refinedev/antd";
import { HttpError, useInvalidate } from "@refinedev/core";
import { Button, Form, Select } from "antd";
import { Lead } from "../../../../interfaces/models/lead.interface";
import { Tag } from "../../../../interfaces/models/tag.interface";

type Props = {
  initialValues: {
    tag_ids?: { label: string; value: number }[];
  };
  cancelForm: () => void;
};

export const TagsForm = ({ initialValues, cancelForm }: Props) => {
  
 const invalidate = useInvalidate();
  const { formProps, saveButtonProps  } = useForm<Lead, HttpError, Lead>({
      queryOptions: { enabled: true },
      redirect: false,
      autoSave: {
        enabled: true,
        debounce: 0,
        onFinish: (values: Lead) => ({
          ...values,
          tag_ids: values.tags
        }),
      },
      onMutationSuccess: () => {
        invalidate({ invalidates: ["list"], resource: "leads" });
      },
    });
    

  const { selectProps } = useSelect<Tag>({
    resource: "tags",
    optionLabel: "name",
    optionValue: "id",
    pagination: { mode: "off" },
  });

  return (
    <div style={{ display: "flex", gap: "12px" , justifyContent:"center" }}>
      <Form
        {...formProps}
        style={{ width: "100%" }}
        initialValues={initialValues}      
      >
        <Form.Item label="Etiquetas" name="tag_ids">
          <Select {...selectProps} mode="multiple"  style={{ width: "100%" }}/>
        </Form.Item>
      </Form>     

            <Button type="default" onClick={cancelForm}>
              Cancelar
            </Button>
            <Button {...saveButtonProps} type="primary">
              Guardar
            </Button>
                 
    </div>
  );
};