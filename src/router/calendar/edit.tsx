import React, { useEffect, useState } from "react";

import { useForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import { Modal } from "antd";
import dayjs from "dayjs";

import { CalendarForm } from "./components/form";

interface ICategory {
  id: string;
  title: string;
}

interface IParticipant {
  id: number | string;
  name: string;
  avatarUrl: string;
}

interface IEvent {
  id: string;
  startDate: string;
  endDate: string;
  color: string;
  description?: string;
  title?: string;
  category: ICategory;
  participants: IParticipant[];
}

interface IFormValues {
  rangeDate?: [dayjs.Dayjs, dayjs.Dayjs];
  date?: dayjs.Dayjs;
  time?: [dayjs.Dayjs, dayjs.Dayjs];
  color?: string | { toHex: (format?: string) => string };
  categoryId?: string;
  participantIds?: string[];
  [key: string]: unknown;
}

export const CalendarEditPage: React.FC = () => {
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);

  const { list } = useNavigation();

  const { formProps, saveButtonProps, form, onFinish, query } = useForm<IEvent>(
    {
      resource: "events", // Pending: replace with actual resource name
      action: "edit",
      queryOptions: {
        enabled: true,
      },
    }
  );

  useEffect(() => {
    const startDate = query?.data?.data.startDate;
    const endDate = query?.data?.data.endDate;
    const utcStartDate = dayjs(startDate).utc();
    const utcEndDate = dayjs(endDate).utc();

    form.setFieldsValue({
      categoryId: query?.data?.data.category.id,
      participantIds: query?.data?.data.participants.map(
        (participant) => participant.id //
      ),
    });

    // if more than 24 hours, set as all day event
    if (utcEndDate.diff(utcStartDate, "hours") >= 23) {
      setIsAllDayEvent(true);
      form.setFieldsValue({
        rangeDate: [utcStartDate, utcEndDate],
      });
    } else {
      form.setFieldsValue({
        date: utcStartDate,
        time: [utcStartDate, utcEndDate],
      });
    }
  }, [query?.data, form]);

  const handleOnFinish = async (values: IFormValues) => {
    const { rangeDate, date, time, color, ...otherValues } = values;

    let startDate = dayjs();
    let endDate = dayjs();

    if (rangeDate) {
      startDate = rangeDate[0].utc().startOf("day");
      endDate = rangeDate[1].utc().endOf("day");
    } else {
      if (!date || !time) return;
      startDate = date
        .utc()
        .set("hour", time[0].hour())
        .set("minute", time[0].minute())
        .set("second", 0);

      endDate = date
        .utc()
        .set("hour", time[1].hour())
        .set("minute", time[1].minute())
        .set("second", 0);
    }

    await onFinish({
      ...otherValues,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      color: typeof color === "object" ? `#${color.toHex()}` : color,
    });
  };

  return (
    <Modal
      title="Edit Event"
      open
      onCancel={() => {
        list("events");
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
