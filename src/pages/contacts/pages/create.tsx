import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";

import { ContactFormFields } from "../components/contact-form-fields";
import { ContactRequest } from "../../../interfaces/models/contact.interface";


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