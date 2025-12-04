import { Create, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { UserFormFields } from "../components/user-form-fields";
import { AssignedUser } from "../../../../interfaces";

export default function UserCreate() { 
  const { formProps, saveButtonProps } = useForm<AssignedUser>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <UserFormFields />
      </Form>
    </Create>
  );
}