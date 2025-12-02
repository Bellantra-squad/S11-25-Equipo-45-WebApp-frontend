
import { useModalForm, useSelect } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import { Form, Input, InputNumber, Modal, Select,  } from "antd";
import { Lead } from "../../../interfaces/models/lead.interface";
import { useSearchParams } from "react-router";
import { LeadStatus } from "../../../interfaces/models/lead-status.interfaces";


const LeadCreateModal = () => {
  const [searchParams] = useSearchParams();
  const { list } = useNavigation();

  const { formProps, modalProps, close } = useModalForm<Lead>({
    action: "create",
    resource: "leads",
    defaultVisible: true,
    id: undefined, 
  });

   // Categories
    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
        optionLabel: "name",
        optionValue: "id",
    });

    //Usuario asignado
    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "email",
        optionValue: "id",
    });

    //Estados
     const { selectProps : statusSelectProps} = useSelect<LeadStatus>({
        resource: "lead-statuses",
        pagination: { mode: "off" },
        optionLabel: "name",   
        optionValue: "id",      
    });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        close();
        list("leads", "replace");
      }}
      title="Crear Lead"
      width={600}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps?.onFinish?.({
            ...values,
            stageId: searchParams.get("stageId")
              ? Number(searchParams.get("stageId"))
              : null,
          });
        }}
      >
        <Form.Item
          label="Nombre de la compañía"
          name="company_name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Industria" name="industry">
          <Input />
        </Form.Item>

        <Form.Item label="Website" name="website">
          <Input />
        </Form.Item>   

        <Form.Item label="Estado" name="status_id">
            <Select {...statusSelectProps} />
        </Form.Item>    
        
        <Form.Item label="Category" name="category_id">
            <Select {...categorySelectProps} />
        </Form.Item>

        <Form.Item label="Assigned To" name="assigned_to_id">
            <Select {...userSelectProps} />
        </Form.Item>

        <Form.Item label="Lead Source" name="lead_source">
            <Select>
                <Select.Option value="cold_call">Cold Call</Select.Option>
                <Select.Option value="referral">Referral</Select.Option>
                <Select.Option value="social_media">Social Media</Select.Option>
                <Select.Option value="website">Website</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item label="Lead Score" name="lead_score">
            <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Estimated Value" name="estimated_value">
            <Input />
        </Form.Item>
    </Form>
      
    </Modal>
  );
};


export default LeadCreateModal;