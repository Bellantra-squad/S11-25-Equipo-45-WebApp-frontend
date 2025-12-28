import React, { useState } from "react";
import { ClearOutlined, FlagOutlined } from "@ant-design/icons";
import { Button, Card, Radio, theme } from "antd";
import type { RadioChangeEvent } from "antd/es/radio";
import styles from "./index.module.css";
import { Task_Type } from "../../../interfaces/models/task.interface";
import { Text } from "../../../components/base/text";
import { CardProps } from "antd/lib";
import { taskTypeLabels } from "../../../interfaces/constants/task-labels";

type CalendarTaskTypesProps = {
  onChange?: (e: RadioChangeEvent) => void;
  cardProps?: CardProps;
};

export const CalendarTaskTypes: React.FC<CalendarTaskTypesProps> = ({ onChange, cardProps }) => {
  const { token } = theme.useToken();
  const [value, setValue] = useState<string | null>(null);

  // Lista fija desde el enum Task_Type
  const taskTypes = Object.values(Task_Type);

  const handleClear = () => {
    setValue(null);
    onChange?.({ target: { value: null } } as RadioChangeEvent);
  };

  const handleChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  return (
    <Card
      title={
        <span>
          <FlagOutlined style={{ color: token.colorPrimary }} />
          <Text size="sm" style={{ marginLeft: ".5rem" }}>
            Tipo de tareas
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
      {...cardProps}
    >
       <Radio.Group
        value={value ?? undefined}
        className={styles.container}
        onChange={handleChange}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        {taskTypes.map((type) => (
          <Radio key={type} value={type} className={styles.checkbox}>
             <Text>{taskTypeLabels[type]}</Text>
          </Radio>
        ))}
      </Radio.Group>
    </Card>
  );
};