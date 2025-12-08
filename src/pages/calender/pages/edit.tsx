import { Form } from "antd";
import { useForm, Edit } from "@refinedev/antd";
import { TaskRequest } from "../../../interfaces/models/task.interface";
import { CalendarForm } from "../components/calendar-form";

export default function TaskEdit() {
  const { formProps, saveButtonProps, query } = useForm<TaskRequest>({
    resource: "tasks",
  });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={query?.isLoading}>
      <Form {...formProps} layout="vertical">
        <CalendarForm
          isAllDayEvent={false}
          setIsAllDayEvent={() => {}}
          form={formProps.form!}
          formProps={formProps}
        />
      </Form>
    </Edit>
  );
}