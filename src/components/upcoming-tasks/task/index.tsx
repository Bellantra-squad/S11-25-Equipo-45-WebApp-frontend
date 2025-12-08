import React, { useState } from "react";
import { Badge, Tag } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import styles from "../index.module.css";
import { Priority, Task } from "../../../interfaces/models/task.interface";
import { Text } from "../../base/text";
import TaskShowDrawer from "../../../pages/calender/pages/show-drawer";

type CalendarUpcomingEventProps = {
  item: Task;
};

const priorityColorMap: Record<Priority, string> = {
  [Priority.Urgent]: "red",
  [Priority.High]: "volcano",
  [Priority.Medium]: "blue",
  [Priority.Low]: "green",
};

export const CalendarUpcomingTask: React.FC<CalendarUpcomingEventProps> = ({
  item,
}) => {
  const { id, title, priority, due_date } = item;
  const [open, setOpen] = useState(false);

  const isToday = dayjs.utc(due_date).isSame(dayjs.utc(), "day");
  const isTomorrow = dayjs
    .utc(due_date)
    .isSame(dayjs.utc().add(1, "day"), "day");
  const isAllDayEvent = dayjs.utc(due_date).startOf("day").isSame(due_date);

  const renderDate = () => {
    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";
    return dayjs(due_date).format("MMM DD");
  };

  const renderTime = () => {
    if (isAllDayEvent) {
      return "All day";
    }
    return `${dayjs(due_date).format("HH:mm")}`;
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)} // abrir modal
        key={id}
        className={styles.item}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.date}>
          <Badge color={"#6fb51fff"} className={styles.badge} />
          <Text size="xs">{`${renderDate()}, ${renderTime()}`}</Text>
          <Tag
            color={priorityColorMap[priority]}
            style={{ marginLeft: "8px", fontSize: "10px" }}
          >
            {priority.toUpperCase()}
          </Tag>
        </div>
        <Text ellipsis={{ tooltip: true }} strong className={styles.title}>
          {title}
        </Text>
      </div>

      {/* Modal de show */}
      <TaskShowDrawer
        task={item}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
