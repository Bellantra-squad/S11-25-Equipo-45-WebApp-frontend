import { Edit, useForm } from "@refinedev/antd";
import { Form } from "antd";
import { AssignedUser } from "../../../../interfaces";
import { UserFormEditFields } from "../components/user-form-edit";

export default function UserEdit() {
  const { formProps, saveButtonProps, query } = useForm<AssignedUser>();    

  return (
   <Edit saveButtonProps={saveButtonProps} isLoading={query?.isLoading}>
      <Form {...formProps} layout="vertical">
        <UserFormEditFields  />
      </Form>
    </Edit>
  );
}