import React, { useState } from "react";
import { Avatar, Tooltip } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import styles from "../index.module.css";
import { Task } from "../../../interfaces/models/task.interface";
import { Text } from "../../base/text";
import TaskShowDrawer from "../../../pages/calender/pages/show-drawer";
import { statusLabels } from '../../../interfaces/constants/task-labels';
import { taskTypeConfig } from "../../../interfaces/internal/task_type";
import { PriorityTag } from "../../tags/priority-tag";
import { StatusTaskTag } from "../../tags/status-task-tag";

type CalendarUpcomingEventProps = {
  item: Task;
};

export const CalendarUpcomingTask: React.FC<CalendarUpcomingEventProps> = ({
  item
}) => {
  const { id, title, status, task_type, priority, due_date } = item;
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
        onClick={() => setOpen(true)} 
        key={id}
        className={styles.item}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.contentItem}>
          <Avatar
                style={{ backgroundColor:  taskTypeConfig[task_type].color }}
                icon={taskTypeConfig[task_type].icon}
            />
            <div className="styles.contentText">
              <div className={styles.date}>
                <Text size="xs" style={{paddingRight:"6px"}}>{`${renderDate()}, ${renderTime()}`}</Text>                
                <PriorityTag priority={priority} />
                <Tooltip title={statusLabels[status]}> <StatusTaskTag status={status} mode="icon" /> </Tooltip>
                          
              </div>
              <Text ellipsis={{ tooltip: true }} strong 
                  className={`${styles.taskTitle} ${
                          status === "completed" ? styles.completed : ""
                        } ${status === "cancelled" ? styles.cancelled : ""}`}>
                  {title.toUpperCase()}
              </Text>               
            </div> 
        </div>
        
               
       
      </div>
      <TaskShowDrawer
        id={item.id}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
