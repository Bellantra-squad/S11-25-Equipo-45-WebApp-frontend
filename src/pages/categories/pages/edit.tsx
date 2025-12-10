import { Edit, useForm } from "@refinedev/antd";
import { Form } from "antd";

import { Category } from "../../../interfaces/models/category.interface";
import { CategoriesForm } from "../components/contact-form-fields";

export default function CategoryEdit() {
  const { formProps, saveButtonProps, query } = useForm<Category>();    

  return (
   <Edit title="Editar Categorías"    
        saveButtonProps={{
        ...saveButtonProps,
        children: "Guardar", 
        }}
        isLoading={query?.isLoading}
        >
      <Form {...formProps} layout="vertical">
        <CategoriesForm />
      </Form>
    </Edit>
  );
}