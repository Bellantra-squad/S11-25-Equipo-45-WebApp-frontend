import React, { useState } from "react";

import { useForm } from "@refinedev/antd";
import { HttpError, useNavigation } from "@refinedev/core";

import { Modal } from "antd";
import dayjs from "dayjs";

import { CalendarForm } from "./components/form";
import { IEvent } from "../../interfaces/calendar/calendar";

interface ColorObject {
  toHex: () => string;
}

// interface Event {
//   id: number | string;
//   startDate: string;
//   endDate: string;
//   type: "warning" | "success" | "error";
//   // other event fields...
// }

type BasePayloadOmmited = Omit<EventCreatePayload, "color">;

interface EventCreatePayload {
  title: string;
  categoryId: number;
  startDate: string;
  endDate: string;
  color: string;
  // ... other fields needed for event creation
}

type FormValues = BasePayloadOmmited & {
  rangeDate: [dayjs.Dayjs, dayjs.Dayjs];
  date: dayjs.Dayjs;
  time: [dayjs.Dayjs, dayjs.Dayjs];
  color: string | ColorObject;
};

export const CalendarCreatePage: React.FC = () => {
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const { list } = useNavigation();

  const { formProps, saveButtonProps, form, onFinish } = useForm<
    IEvent,
    HttpError,
    EventCreatePayload
  >();

  const handleOnFinish = async (values: FormValues) => {
    const { rangeDate, date, time, color, ...otherValues } = values;

    let startDate = dayjs();
    let endDate = dayjs();

    if (rangeDate) {
      startDate = rangeDate[0].startOf("day");
      endDate = rangeDate[1].endOf("day");
    } else {
      startDate = date
        .set("hour", time[0].hour())
        .set("minute", time[0].minute())
        .set("second", 0);

      endDate = date
        .set("hour", time[1].hour())
        .set("minute", time[1].minute())
        .set("second", 0);
    }

    await onFinish({
      ...otherValues,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      color:
        typeof color === "object"
          ? `#${(color as ColorObject).toHex()}`
          : color,
    });
  };

  return (
    <Modal
      title="Create Event"
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
