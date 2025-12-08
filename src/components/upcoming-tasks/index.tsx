import React from "react";

import { useList, useNavigation } from "@refinedev/core";

import { CalendarOutlined, RightCircleOutlined } from "@ant-design/icons";
import type { CardProps } from "antd";
import { Button, Card, Skeleton as AntdSkeleton } from "antd";
import dayjs from "dayjs";

import styles from "./index.module.css";
import { Text } from "../base/text";
import { CalendarUpcomingTask } from "./task";
import { Task } from "../../interfaces/models/task.interface";

type CalendarUpcomingEventsProps = {
  limit?: number;
  cardProps?: CardProps;
  showGoToListButton?: boolean;
};

const NoTask: React.FC = () => {
  return (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "220px",
      }}
    >
      No Upcoming Tasks
    </span>
  );
};

const Skeleton: React.FC = () => {
  return (
    <div className={styles.item}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "24px",
          padding: "1px 0",
        }}
      >
        <AntdSkeleton.Button
          active
          style={{
            height: "14px",
          }}
        />
        <AntdSkeleton.Button
          active
          style={{
            width: "90%",
            marginTop: "8px",
            height: "16px",
          }}
        />
      </div>
    </div>
  );
};

export const CalendarUpcomingTasks: React.FC<CalendarUpcomingEventsProps> = ({
  limit = 5,
  cardProps,
  showGoToListButton,
}) => {
  const { list } = useNavigation();

  const { result: data, query } = useList<Task>({
    resource: "tasks",
    pagination: {
      pageSize: limit,
    },
    sorters: [
      {
        field: "due_date",
        order: "desc",
      },
    ],
    filters: [
      {
        field: "due_date",
        operator: "gte",
        value: dayjs().format("YYYY-MM-DD"),
      }
    ],
  });

  return (
    <Card
    styles={{
      body:{
         padding: "0 1rem",
      },
      header:{
        padding: "8px 16px"
      }
    }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: ".7rem" }}>
            Upcoming Task
          </Text>
        </div>
      }
      extra={
        showGoToListButton && (
          <Button onClick={() => list("tasks")} icon={<RightCircleOutlined />}>
            Ver calendario
          </Button>
        )
      }
      {...cardProps}
    >
      {query.isLoading &&
        Array.from({ length: limit }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      {!query.isLoading &&
        data?.data.map((item) => (
          <CalendarUpcomingTask key={item.id} item={item} />
        ))}
      {!query.isLoading && data?.data.length === 0 && <NoTask/>}
    </Card>
  );
};
