import React, { useState } from "react";
import { ClearOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Card, Radio, theme } from "antd";
import type { RadioChangeEvent } from "antd/es/radio";
import styles from "./index.module.css";
import { Status } from "../../../interfaces/models/task.interface";
import { Text } from "../../../components/base/text";
import { statusLabels } from "../../../interfaces/constants/task-labels";

type CalendarStatusesProps = {
  onChange?: (e: RadioChangeEvent) => void;
};

export const CalendarStatuses: React.FC<CalendarStatusesProps> = ({ onChange }) => {
  const { token } = theme.useToken();
  const [value, setValue] = useState<string | null>(null);
  
      
  const handleClear = () => {
    setValue(null);
    onChange?.({ target: { value: null } } as RadioChangeEvent);
  };

  const handleChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  const statuses = Object.values(Status);

  return (
    <Card
      title={
        <span>
          <SettingOutlined style={{ color: token.colorPrimary }} />
          <Text size="sm" style={{ marginLeft: ".5rem" }}>
            Estados
          </Text>
        </span>
      }
      extra={
        <Button
          type="link"
          icon={<ClearOutlined />}
          onClick={handleClear}
        >
          Limpiar
        </Button>
      }
      styles={{
                  body:{
                       padding: "0.5rem 1rem",                       
                    },
                    header:{
                      padding: "8px 16px",
                    }
              }}   
    >
       <Radio.Group
        value={value ?? undefined}
        className={styles.container}
        onChange={handleChange}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        {statuses.map((status) => (
          <Radio key={status} value={status} className={styles.checkbox}>
            <Text>{statusLabels[status]}</Text>
          </Radio>
        ))}
      </Radio.Group>
    </Card>
  );
};
