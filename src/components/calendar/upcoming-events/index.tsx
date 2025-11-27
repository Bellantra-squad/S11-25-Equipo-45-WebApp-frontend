import React from "react";

import { useList, useNavigation } from "@refinedev/core";

import { CalendarOutlined, RightCircleOutlined } from "@ant-design/icons";
import type { CardProps } from "antd";
import { Button, Card, Skeleton as AntdSkeleton } from "antd";
import dayjs from "dayjs";

import { Text } from "../../base/text";
import { CalendarUpcomingEvent } from "./event";
import styles from "./index.module.css";

type CalendarUpcomingEventsProps = {
  limit?: number;
  cardProps?: CardProps;
  showGoToListButton?: boolean;
};

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  color: string;
  description?: string;
}

const NoEvent: React.FC = () => {
  return (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "220px",
      }}
    >
      No Upcoming Event
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

export const CalendarUpcomingEvents: React.FC<CalendarUpcomingEventsProps> = ({
  limit = 5,
  cardProps,
  showGoToListButton,
}) => {
  const { list } = useNavigation();

  const { result: data, query } = useList<Event>({
    resource: "events",
    pagination: {
      pageSize: limit,
    },
    sorters: [
      {
        field: "startDate",
        order: "asc",
      },
    ],
    filters: [
      {
        field: "startDate",
        operator: "gte",
        value: dayjs().format("YYYY-MM-DD"),
      },
    ],
  });

  return (
    <Card
      headStyle={{ padding: "8px 16px" }}
      bodyStyle={{
        padding: "0 1rem",
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
            Upcoming events
          </Text>
        </div>
      }
      extra={
        showGoToListButton && (
          <Button onClick={() => list("events")} icon={<RightCircleOutlined />}>
            See calendar
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
          <CalendarUpcomingEvent key={item.id} item={item} />
        ))}
      {!query.isLoading && data?.data.length === 0 && <NoEvent />}
    </Card>
  );
};
