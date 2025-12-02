import { useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Button, Space, InputNumber } from "antd";
import { Lead, LeadUpdate } from "../../../../interfaces/models/lead.interface";
import { HttpError } from "@refinedev/core";

type Props = {
    initialValues: Partial<LeadUpdate>;
    cancelForm: () => void;
};

export const DetailsForm = ({ initialValues, cancelForm }: Props) => {
    const { formProps, saveButtonProps } = useForm<
        Lead,
        HttpError,
        Partial<Lead>
    >({
        redirect: false,  
        queryOptions: {
            enabled: false,   
        },
        meta: {
            method: "put",
            resource: "leads",
        },
        onMutationSuccess: cancelForm,
    });

    // Categories
    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
        optionLabel: "name",
        optionValue: "id",
    });

    // Assigned user
    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "email",
        optionValue: "id",
    });

    return (
        <div style={{ display: "flex", width: "100%" }}>
            <Form 
                {...formProps} 
                style={{ width: "100%" }} 
                initialValues={initialValues}
            >
                <Form.Item label="Industry" name="industry">
                    <Input />
                </Form.Item>

                <Form.Item label="Website" name="website">
                    <Input />
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

            <Space style={{ marginLeft: 12 }}>
                <Button onClick={cancelForm}>Cancel</Button>
                <Button type="primary" {...saveButtonProps}>Save</Button>
            </Space>
        </div>
    );
};