import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { ContactRequest } from "../../../interfaces/models/contact.interface";
import { ContactFormFields } from "../components/contact-form-fields";


export default function ContactsCreate() {
 
    const { formProps, saveButtonProps } = useForm<ContactRequest>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <ContactFormFields />
      </Form>
    </Create>
  );
}