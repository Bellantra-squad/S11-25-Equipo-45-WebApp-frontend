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

    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
        optionLabel: "name",
        optionValue: "id",
        pagination:{pageSize:20}
    });

    return (
        <div style={{ display: "flex", flexDirection:"column", width: "100%" }}>
            <Form 
                {...formProps} 
                style={{ width: "100%" }} 
                initialValues={initialValues}
            >
                <Form.Item label="Industria" name="industry">
                    <Input />
                </Form.Item>

                <Form.Item label="Sitio Web" name="website"
                rules={[                   
                    { type: "url", message: "Debe ser una URL válida (ej: https://ejemplo.com)" },
                ]}>
                    <Input placeholder="https://ejemplo.com" />
                </Form.Item>

                <Form.Item label="Categoria" name="category_id">
                    <Select {...categorySelectProps} />
                </Form.Item>

                <Form.Item label="Origen del Lead" name="lead_source">
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

                <Form.Item label="Valor estimado" name="estimated_value">
                    <Input />
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
                <Space >
                    <Button onClick={cancelForm}>Cancelar</Button>
                    <Button type="primary" {...saveButtonProps}>Guardar</Button>
                </Space>
            </div>           
        </div>
    );
};