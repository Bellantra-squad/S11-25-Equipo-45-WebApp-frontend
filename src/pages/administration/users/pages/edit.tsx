import { Edit, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { UserFormFields } from "../components/user-form-fields";
import { AssignedUser } from "../../../../interfaces";

export default function UserEdit() {
  const { formProps, saveButtonProps, query } = useForm<AssignedUser>();    

  return (
   <Edit saveButtonProps={saveButtonProps} isLoading={query?.isLoading}>
      <Form {...formProps} layout="vertical">
        <UserFormFields />
      </Form>
    </Edit>
  );
}