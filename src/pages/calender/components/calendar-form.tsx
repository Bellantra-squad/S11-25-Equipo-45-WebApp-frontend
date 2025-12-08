import React from "react";
import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  FormInstance,
  FormProps,
  Input,
  Row,
  Select,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { Priority, Status, Task_Type } from "../../../interfaces/models/task.interface";
import { User } from "../../../interfaces";
import { useSelect } from "@refinedev/antd";

type CalendarFormProps = {
  isAllDayEvent: boolean;
  setIsAllDayEvent: (value: boolean) => void;
  formProps: FormProps;
  form: FormInstance;
};

const { RangePicker } = DatePicker;

export const CalendarForm: React.FC<CalendarFormProps> = ({
  form,
  formProps,
  isAllDayEvent = false,
  setIsAllDayEvent,
}) => {
 

  const { selectProps: userSelectProps } = useSelect<User>({
    resource: "users",
    optionLabel: "email",
    optionValue: "id",
  });

  const rangeDate = form.getFieldsValue()?.rangeDate;
  const date = form.getFieldsValue()?.date;

  return (
    <Form layout="vertical" form={form} {...formProps}>
      {/* Title */}
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      {/* Description */}
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      {/* Date & Time */}
      <Form.Item label="Date & Time" rules={[{ required: true }]}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={isAllDayEvent}
            onChange={(e) => setIsAllDayEvent(e.target.checked)}
            style={{ marginRight: "1rem" }}
          >
            All Day
          </Checkbox>

          {isAllDayEvent ? (
            <Form.Item name="rangeDate" rules={[{ required: true }]} noStyle>
              <RangePicker
                style={{ width: 416 }}
                format="YYYY/MM/DD"
                defaultValue={[dayjs(date), dayjs(date)]}
              />
            </Form.Item>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Form.Item name="date" rules={[{ required: true }]} noStyle>
                <DatePicker
                  style={{ width: 160 }}
                  format="YYYY/MM/DD"
                  defaultValue={dayjs(rangeDate ? rangeDate[0] : undefined)}
                />
              </Form.Item>
              <Form.Item name="time" rules={[{ required: true }]} noStyle>
                <TimePicker.RangePicker
                  style={{ width: 240 }}
                  format="HH:mm"
                  minuteStep={15}
                />
              </Form.Item>
            </div>
          )}
        </div>
      </Form.Item>

      <Row gutter={[32, 32]}>
        {/* Task Type */}
        <Col span={12}>
          <Form.Item
            label="Task Type"
            name="task_type"
            rules={[{ required: true }]}
          >
            <Select>
              {Object.values(Task_Type).map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Priority */}
        <Col span={12}>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true }]}
          >
            <Select>
              {Object.values(Priority).map((priority) => (
                <Select.Option key={priority} value={priority}>
                  {priority}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Status */}
      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true }]}
      >
        <Select>
          {Object.values(Status).map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row gutter={[32, 32]}>
        {/* Lead */}
        <Col span={12}>
          <Form.Item
            label="Lead"
            name="lead"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>

        {/* Contact */}
        <Col span={12}>
          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>

      {/* Assigned To */}
      <Form.Item
        label="Assigned To"
        name="assigned_to_id"
      >
        <Select allowClear {...userSelectProps} />
      </Form.Item>
    </Form>
  );
};
