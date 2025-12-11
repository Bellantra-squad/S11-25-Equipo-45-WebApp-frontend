import React, { useState } from "react";
import { Badge, Calendar, Card } from "antd";
import { Status, Task, Task_Type } from "../../../interfaces/models/task.interface";
import dayjs, { Dayjs } from "dayjs";
import TaskShowDrawer from "../pages/show-drawer";
import { Text } from "../../../components/base/text";


type CalendarProps = {
  tasks: Task[];
  task_type?: Task_Type;
  status?: Status;
};

const getStatusColor = (
  status: Status
): "success" | "error" | "warning" | "processing" => {
  switch (status) {
    case Status.Completed:
      return "success";
    case Status.Cancelled:
      return "error";
    case Status.InProgress:
      return "processing";
    case Status.Pending:
    default:
      return "warning";
  }
};

export const TaskCalendar: React.FC<CalendarProps> = ({
  tasks,
  task_type,
  status,
}) => {
  const [selectedId, setSelectedId] = useState<number>();
  const [showModal, setShowModal] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchType = task_type ? task.task_type === task_type : true;
    const matchStatus = status ? task.status === status : true;
    return matchType && matchStatus;
  });

  const dateCellRender = (value: Dayjs) => {
    const dayTasks = filteredTasks.filter((task) =>
      dayjs(task.due_date).isSame(value, "day")
    );

    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {dayTasks.map((task) => (
          <li
            key={task.id}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (task){
              setSelectedId(task.id);
              setShowModal(true);}
            }}
          >           
            <Badge status={getStatusColor(task.status)} text=
            {
               <Text               
                size="sm"
                style={{
                  textTransform: "capitalize",
                  textDecoration: task.status === "completed" ? "line-through" : "none",
                  opacity: task.status === "cancelled" ? 0.5 : 1,
                }}
              >
                {task.title}
              </Text> 
            } />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card>
      <Calendar
        cellRender={dateCellRender}
      />

      {/* Modal de show */}
      {selectedId && (
        <TaskShowDrawer
        id={selectedId}
        open={showModal}
        onClose={() => setShowModal(false)}
      />)}
    </Card>
  );
};
