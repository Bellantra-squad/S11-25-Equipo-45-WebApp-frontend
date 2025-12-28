import React from "react";
import { Create, SaveButton, useForm } from "@refinedev/antd";
import { HttpError, useNavigation } from "@refinedev/core";
import dayjs from "dayjs";
import { TaskRequest } from "../../../interfaces/models/task.interface";
import { CalendarForm } from "../components/calendar-form";
import { Button, Space } from "antd";
import { CloseOutlined, ReloadOutlined, UnorderedListOutlined } from "@ant-design/icons";

type FormValues = TaskRequest & {
  date?: dayjs.Dayjs;
  time?: dayjs.Dayjs;
};

const CalendarCreatePage: React.FC = () => {
  const { list } = useNavigation();

  const { formProps, saveButtonProps, form, onFinish, query } = useForm<
    TaskRequest,
    HttpError,
    TaskRequest
  >({
    resource: "tasks", // importante: apunta al recurso correcto
  });

  const handleOnFinish = async (values: FormValues) => {
    const { date, time, ...otherValues } = values;

    let dueDate = dayjs();

    if (date && time) {
      // si selecciona fecha + hora
      dueDate = date
        .set("hour", time.hour())
        .set("minute", time.minute())
        .set("second", 0);
    }

    await onFinish({
      ...otherValues,
      due_date: dueDate.toDate(),
      completed_at: null, // siempre null al crear
    });
  };

  return (
    <Create title="Crear Tarea"
     saveButtonProps={saveButtonProps}     
    isLoading={query?.isLoading}     
    headerButtons={() => (
      <Space>
        <Button icon={<ReloadOutlined />} onClick={() => query?.refetch()}>
          Refrescar
        </Button>
        <Button icon={<UnorderedListOutlined />} onClick={() => list("tasks")}>
          Listar
        </Button>
      </Space>
    )}
      footerButtons={({ saveButtonProps }) => (
        <Space>
          <Button icon={<CloseOutlined />} onClick={() => list("tasks", "replace")}>
            Cancelar
          </Button>
          <SaveButton {...saveButtonProps}>Guardar</SaveButton>
        </Space>
      )}
    >
   
      <CalendarForm  
        form={form}
        formProps={{
          ...formProps,
          onFinish: handleOnFinish,
        }}
      />
    </Create>
  );
};

export default CalendarCreatePage;


