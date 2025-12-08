import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Card, Radio, theme } from "antd";
import type { RadioChangeEvent } from "antd/es/radio";
import styles from "./index.module.css";
import { Status } from "../../../interfaces/models/task.interface";
import { Text } from "../../../components/base/text";

type CalendarStatusesProps = {
  onChange?: (e: RadioChangeEvent) => void;
};

export const CalendarStatuses: React.FC<CalendarStatusesProps> = ({ onChange }) => {
  const { token } = theme.useToken();

  const statuses = Object.values(Status);

  return (
    <Card
      title={
        <span>
          <SettingOutlined style={{ color: token.colorPrimary }} />
          <Text size="sm" style={{ marginLeft: ".5rem" }}>
            Status
          </Text>
        </span>
      }
      styles={{
            body: { padding: "1rem 1rem" },            
        }}
    >
      <Radio.Group
        className={styles.container}
        onChange={onChange}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        {statuses.map((status) => (
          <Radio key={status} value={status} className={styles.checkbox}>
            <Text>{status}</Text>
          </Radio>
        ))}
      </Radio.Group>
    </Card>
  );
};
