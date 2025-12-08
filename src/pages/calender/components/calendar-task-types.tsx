import React from "react";
import { FlagOutlined } from "@ant-design/icons";
import { Card, Radio, theme } from "antd";
import type { RadioChangeEvent } from "antd/es/radio";
import styles from "./index.module.css";
import { Task_Type } from "../../../interfaces/models/task.interface";
import { Text } from "../../../components/base/text";

type CalendarTaskTypesProps = {
  onChange?: (e: RadioChangeEvent) => void;
};

export const CalendarTaskTypes: React.FC<CalendarTaskTypesProps> = ({ onChange }) => {
  const { token } = theme.useToken();

  // Lista fija desde el enum Task_Type
  const taskTypes = Object.values(Task_Type);

  return (
    <Card
      title={
        <span>
          <FlagOutlined style={{ color: token.colorPrimary }} />
          <Text size="sm" style={{ marginLeft: ".5rem" }}>
            Task Types
          </Text>
        </span>
      }
      styles={{
            body: { padding: "0.5rem 1rem"},
        }}
    >
      <Radio.Group
        className={styles.container}
        onChange={onChange}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        {taskTypes.map((type) => (
          <Radio key={type} value={type} className={styles.checkbox}>
            <Text>{type}</Text>
          </Radio>
        ))}
      </Radio.Group>
    </Card>
  );
};