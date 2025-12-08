import { Edit, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { EmailTemplate } from "../../../../interfaces/models/email-templates";
import { TemplateForm } from "../../components/template-form-field";

export default function TemplateEdit() {
    const { formProps, saveButtonProps, query } = useForm<EmailTemplate>(); 
   
    return (
    <Edit saveButtonProps={saveButtonProps} isLoading={query?.isLoading}>
       <Form {...formProps} layout="horizontal"  labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }} style={{ maxWidth: 800 }}>
            <TemplateForm />
        </Form>
        </Edit>
    );
}