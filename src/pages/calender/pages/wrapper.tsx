import React, { useState } from "react";

import { CreateButton } from "@refinedev/antd";
import { useNavigation, useList } from "@refinedev/core";

import { Button, Col, Row, Space, Skeleton } from 'antd';
import { CalendarUpcomingTasks } from "../../../components/upcoming-tasks";

import { Task, Task_Type, Status } from "../../../interfaces/models/task.interface";
import { CalendarTaskTypes } from "../components/calendar-task-types";
import { CalendarStatuses } from "../components/calendar-statuses";
import { TaskCalendar } from "../components/calender-view";
import { UnorderedListOutlined } from "@ant-design/icons";

const CalendarPageWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { list, create } = useNavigation();

  const [selectedTaskType, setSelectedTaskType] = useState<Task_Type | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  
  const { result: data, query } = useList<Task>({
    resource: "tasks",
    pagination: { mode: "off" }, 
  });

  const tasks = data?.data ?? [];

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={6} >
        <Space style={{display:"flex", justifyContent:"center" , width:"100%"}}>
            <Space.Compact >
              <CreateButton
                size="large"
                onClick={() => create("tasks")}
                style={{ marginBottom: "1rem"}}
              >
                Crear Tarea
              </CreateButton>

              <Button
                size="large"
                icon={<UnorderedListOutlined />}
                onClick={() => list("tasks")}
                style={{ marginBottom: "1rem" }}
              >
                Tareas
              </Button>
            </Space.Compact>
          </Space>

          <CalendarUpcomingTasks
            limit={3}
            cardProps={{ style: { marginBottom: "1rem" } }}
          />         

          <CalendarTaskTypes
            onChange={(e) => {
              const value = e.target.value as Task_Type | null;
              setSelectedTaskType(value);
            }}
            cardProps={{ style: { marginBottom: "1rem" } }}
          />

          {/* Componente de status */}
          <CalendarStatuses
            onChange={(e) => {
              const value = e.target.value as Status;
              setSelectedStatus(value);
            }}
          />
        </Col>

        <Col xs={24} xl={18}>
          {query.isLoading ? (
            <Skeleton active paragraph={{ rows: 8 }} />
          ) : (
            <TaskCalendar
              tasks={tasks}
              task_type={selectedTaskType ?? undefined}
              status={selectedStatus ?? undefined}
            />
          )}
        </Col>
      </Row>
      {children}
    </div>
  );
};

export default CalendarPageWrapper;