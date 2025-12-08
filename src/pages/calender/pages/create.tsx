import React, { useState } from "react";
import { useForm } from "@refinedev/antd";
import { HttpError, useNavigation } from "@refinedev/core";
import { Modal } from "antd";
import dayjs from "dayjs";
import { TaskRequest } from "../../../interfaces/models/task.interface";
import { CalendarForm } from "../components/calendar-form";

type FormValues = TaskRequest & {
  rangeDate?: [dayjs.Dayjs, dayjs.Dayjs];
  date?: dayjs.Dayjs;
  time?: [dayjs.Dayjs, dayjs.Dayjs];
};

const CalendarCreatePage: React.FC = () => {
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const { list } = useNavigation();

  const { formProps, saveButtonProps, form, onFinish } = useForm<
    TaskRequest,
    HttpError,
    TaskRequest
  >({
    resource: "tasks", // importante: apunta al recurso correcto
  });

  const handleOnFinish = async (values: FormValues) => {
    const { rangeDate, date, time, ...otherValues } = values;

    let dueDate = dayjs();

    if (rangeDate) {
      // si selecciona un rango, tomamos el final como fecha límite
      dueDate = rangeDate[1].endOf("day");
    } else if (date && time) {
      // si selecciona fecha + hora
      dueDate = date
        .set("hour", time[1].hour())
        .set("minute", time[1].minute())
        .set("second", 0);
    }

    await onFinish({
      ...otherValues,
      due_date: dueDate.toDate(),
      completed_at: null, // siempre null al crear
    });
  };

  return (
    <Modal
      title="Create Task"
      open
      onCancel={() => {
        list("tasks");
      }}
      okButtonProps={{
        ...saveButtonProps,
      }}
      okText="Save"
      width={560}
    >
      <CalendarForm
        isAllDayEvent={isAllDayEvent}
        setIsAllDayEvent={setIsAllDayEvent}
        form={form}
        formProps={{
          ...formProps,
          onFinish: handleOnFinish,
        }}
      />
    </Modal>
  );
};


export default CalendarCreatePage;