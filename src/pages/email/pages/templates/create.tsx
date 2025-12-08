import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { EmailRequest } from "../../../../interfaces/models/email-templates";
import { TemplateForm } from "../../components/template-form-field";


export default function TemplateCreatePage() {
 
    const { formProps, saveButtonProps } = useForm<EmailRequest>();

    return (
        <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="horizontal"  labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }} style={{ maxWidth: 800 }}>
            <TemplateForm />
        </Form>
        </Create>
    );
}