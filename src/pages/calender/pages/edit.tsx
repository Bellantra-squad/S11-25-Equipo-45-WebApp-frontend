import { useEffect } from "react";
import { Edit, SaveButton, useForm } from "@refinedev/antd";
import dayjs from "dayjs";
import { Task } from "../../../interfaces/models/task.interface";
import { CalendarForm } from "../components/calendar-form";
import { Button, Space } from "antd";
import { useNavigation } from "@refinedev/core";
import {  CloseOutlined, ReloadOutlined, UnorderedListOutlined } from "@ant-design/icons";


interface IFormValues {
  assigned_to_id?: number;
  date?: dayjs.Dayjs;
  time?: dayjs.Dayjs;  
}

const CalendarEditPage = () => {

  const { list } = useNavigation();
  
  const { formProps, saveButtonProps, form, onFinish, query } = useForm<Task>(
    {
      resource: "tasks", 
      action: "edit",
      queryOptions: {
        enabled: true,
      },
    }
  );

  useEffect(() => {
    const date = query?.data?.data.due_date;    
    const utcStartDate = dayjs(date);
    

    form.setFieldsValue({ 
      date: utcStartDate,
      time: utcStartDate,
      assigned_to_id:  query?.data?.data.assigned_to?.id,
    });     
    
  }, [query?.data, form]);

  const handleOnFinish = async (values: IFormValues) => {
    const { date, time, ...otherValues } = values;

    let due_date = dayjs();

    if (!date || !time) return;
    due_date = date
        .utc()
        .set("hour", time.hour())
        .set("minute", time.minute())
        .set("second", 0);
    

    await onFinish({
      ...otherValues,
      due_date: due_date.toISOString(),      
    });
  };

  return (
    <Edit 
    title="Editar Tarea"    
    saveButtonProps={{
      ...saveButtonProps,
      children: "Guardar", 
    }}
    headerButtons={() => (
    <Space>      
      <Button icon={<UnorderedListOutlined />} onClick={() => list("tasks")}>
        Tareas
      </Button>
      <Button icon={<ReloadOutlined />} onClick={() => query?.refetch()}>
        Refrescar
      </Button>
    </Space>
  )}
   footerButtons={({ saveButtonProps }) => (
      <Space>
        <Button icon={<CloseOutlined /> } onClick={() => list("tasks", "replace")}>
          Cancelar
        </Button>
        <SaveButton {...saveButtonProps}>Guardar</SaveButton>
      </Space>
    )}
  isLoading={query?.isLoading}
  
  >
      <CalendarForm
        form={form}
        formProps={{
          ...formProps,
          onFinish: handleOnFinish,
        }}
      />
    </Edit>
  );
};


export default CalendarEditPage;