import { Edit, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { Contact } from "../../../interfaces/models/contact.interface";
import { ContactFormFields } from "../components/contact-form-fields";

export default function ContactEdit() {
  const { formProps, saveButtonProps, query } = useForm<Contact>();    

  return (
   <Edit title="Editar Contactos"    
        saveButtonProps={{
        ...saveButtonProps,
        children: "Guardar", 
        }} isLoading={query?.isLoading}>
      <Form {...formProps} layout="vertical">
        <ContactFormFields />
      </Form>
    </Edit>
  );
}