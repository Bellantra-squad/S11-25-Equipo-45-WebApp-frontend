import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { TagForm } from "../components/tag-form-field";
import { Tag } from "../../../interfaces/models/tag.interface";


export default function TagCreatePage() {
 
    const { formProps, saveButtonProps } = useForm<Tag>();

    return (
        <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
            <TagForm />
        </Form>
        </Create>
    );
}