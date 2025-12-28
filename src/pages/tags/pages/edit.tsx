import { Edit, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { TagForm } from "../components/tag-form-field";
import { Tag } from "../../../interfaces/models/tag.interface";

export default function TagEdit() {
    const { formProps, saveButtonProps, query } = useForm<Tag>();    

    return (
    <Edit title="Editar Etiqueta"    
        saveButtonProps={{
        ...saveButtonProps,
        children: "Guardar", 
        }}
        isLoading={query?.isLoading}>
        <Form {...formProps} layout="vertical">
            <TagForm />
        </Form>
        </Edit>
    );
}