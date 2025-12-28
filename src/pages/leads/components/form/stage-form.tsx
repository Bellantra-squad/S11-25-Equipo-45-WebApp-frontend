import { useEffect } from "react";

import { useForm, useSelect } from "@refinedev/antd";
import { HttpError, useInvalidate } from "@refinedev/core";
import { Checkbox, Form, Select, Space,  } from "antd";
import { LeadStatus } from "../../../../interfaces/models/lead-status.interfaces";
import { Lead } from "../../../../interfaces/models/lead.interface";
import { AccordionHeaderSkeleton } from "../accordion-header-skeleton";
import { FlagOutlined } from "@ant-design/icons";


type Props = {
  initialValues: {   
    is_client: Lead["is_client"], 
    status: Lead["status"];
  };
  isLoading?: boolean;
};

export const StageForm = ({ initialValues, isLoading }: Props) => {
  const invalidate = useInvalidate();

  const { formProps } = useForm<Lead, HttpError, Lead>({
    queryOptions: { enabled: true },
    autoSave: {
      enabled: true,
      debounce: 0,
      onFinish: (values) => ({
        ...values,
        status:values.status,
        status_id: values.status.id
      }),
    },
    onMutationSuccess: () => {
      invalidate({ invalidates: ["list"], resource: "leads" });
    },
  });
  
    const { selectProps } = useSelect<LeadStatus>({
        resource: "lead-statuses",
        pagination: { mode: "off" },
        optionLabel: "name",   
        optionValue: "id",      
    });

  // Inicializamos valores en mount / cambio de tarea
  useEffect(() => {
  formProps.form?.setFieldsValue({
    status: initialValues.status,
    is_client: initialValues.is_client,
  });
    },[initialValues.status, initialValues.is_client, formProps.form]);

  if (isLoading) return <AccordionHeaderSkeleton />;

  return (
    <div style={{ padding: "12px 24px", borderBottom: "1px solid #d9d9d9" }}>
      <Form
        layout="inline"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        {...formProps}
        initialValues={initialValues}
      >

         <Space size={5}>
          <FlagOutlined />
          <Form.Item noStyle name={["status", "id"]}>
            <Select
              {...selectProps}
              popupMatchSelectWidth={false}
              options={selectProps.options}
              variant="borderless"
              showSearch={false}
              placeholder="Seleccciona un Estado"
              onSearch={undefined}
              size="small"
            />
          </Form.Item>
        </Space>
       
      

        {/* Campo independiente: si es cliente */}
        <Form.Item
          label="Es Cliente"
          name="is_client"
          valuePropName="checked"
        >
          <Checkbox>Marcar como Cliente</Checkbox>
        </Form.Item>

      </Form>
    </div>
  );
};