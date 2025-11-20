import { Edit, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { ContactRequest } from "../../../interfaces/models/contact.interface";
import { ContactFormFields } from "../components/contact-form-fields";

export default function ContactEdit() {
  const { formProps, saveButtonProps, query } = useForm<ContactRequest>();    

  return (
   <Edit saveButtonProps={saveButtonProps} isLoading={query?.isLoading}>
      <Form {...formProps} layout="vertical">
        <ContactFormFields />
      </Form>
    </Edit>
  );
}