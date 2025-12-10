import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { CategoriesForm } from "../components/contact-form-fields";
import { Category } from "../../../interfaces/models/category.interface";



export default function CategoryCreatePage() {
 
    const { formProps, saveButtonProps } = useForm<Category>();

  return (
    <Create title="Crear Categorías"    
        saveButtonProps={{
        ...saveButtonProps,
        children: "Guardar"}} >
      <Form {...formProps} layout="vertical">
        <CategoriesForm />
      </Form>
    </Create>
  );
}