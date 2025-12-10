
import React, { useState } from "react";
import {
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
import { Priority, Status, Task_Type } from "../../../interfaces/models/task.interface";
import { User } from "../../../interfaces";
import { useSelect } from "@refinedev/antd";
import { priorityLabels, statusLabels, taskTypeLabels } from "../../../interfaces/constants/task-labels";
import { BaseOption } from "@refinedev/core";
import { Contact } from "../../../interfaces/models/contact.interface";

type CalendarFormProps = { 
  formProps: FormProps;
  form: FormInstance;
};


export const CalendarForm: React.FC<CalendarFormProps> = ({
  form,
  formProps,
}) => {
 
 const [selectedLeadId, setSelectedLeadId] = useState<BaseOption["value"] | null>(null);

  const { selectProps: userSelectProps } = useSelect<User>({
    resource: "users",
    optionLabel: (user: User) => `${user.first_name} ${user.last_name}`,
    optionValue: "id",
    pagination:{pageSize:50}
  });


  const { selectProps: leadSelectProps, query: leadQuery  } = useSelect({
    resource: "leads",
    optionLabel: "company_name",
    optionValue: "id",
    pagination:{pageSize:50}
  });

  const { selectProps: contactSelectProps,  query: contactQuery } = useSelect({
    resource:  `leads/${selectedLeadId}/contacts`,
    optionLabel: (c: Contact) => `${c.first_name} ${c.last_name}`,
    optionValue: "id",
    queryOptions: {
      enabled: !!selectedLeadId, 
    },
  });
  
  return (
    <Form 
    layout="vertical"     
    form={form} 
    {...formProps}
     autoComplete="off"
    >
      {/* Title */}
      <Form.Item
        label="Título"
        name="title"
        rules={[{ required: true, message: "El Título es obligatorio" }]}
      >
        <Input />
      </Form.Item>

      {/* Description */}
      <Form.Item
        label="Descripción"
        name="description"
        rules={[{ required: true , message: "La Descripción es obligatoria"}]}
      >
        <Input.TextArea rows={3}  />
      </Form.Item>

      <Row gutter={[32, 32]}>
        <Col span={12}>
      <Form.Item label="Fecha y Hora" rules={[{ required: true }]}>
        <div style={{ display: "flex", alignItems: "center" }}>        
              <Form.Item name="date" rules={[{ required: true , message: "La Fecha es obligatoria" }]} noStyle>
                <DatePicker
                  style={{ width: 250 }}
                  format="YYYY/MM/DD"
                  
                />
              </Form.Item>
              <Form.Item name="time" rules={[{ required: true, message: "La Hora es obligatorio" }]} noStyle>
                <TimePicker
                  style={{ width: 160 }}
                  format="HH:mm"
                  minuteStep={15}
                />
              </Form.Item>            
        </div>
      </Form.Item>
      </Col>
      <Col span={12}>
          <Form.Item
            label="Estado"
            name="status"
            rules={[{ required: true }]}
          >
            <Select>
                {Object.values(Status).map((s) => (
                  <Select.Option key={s} value={s}>
                    {statusLabels[s]}
                  </Select.Option>
                ))}
              </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Form.Item
            label="Tipo de Tarea"
            name="task_type"
            rules={[{ required: true }]}
          >
             <Select>
              {Object.values(Task_Type).map((type) => (
                <Select.Option key={type} value={type}>
                  {taskTypeLabels[type]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Priority */}
        <Col span={12}>
          <Form.Item
            label="Prioridad"
            name="priority"
            rules={[{ required: true }]}
          >
            <Select>
              {Object.values(Priority).map((p) => (
                <Select.Option key={p} value={p}>
                  {priorityLabels[p]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Status */}
      

      <Row gutter={[32, 32]}>
        {/* Lead */}
        <Col span={12}>  
         <Form.Item
              label="Lead"
              name="lead"
              rules={[{ required: true, message: "Selecciona un lead" }]}
            >
              <Select
                {...leadSelectProps}
                loading={leadQuery.isLoading}
                placeholder="Selecciona un lead"
                onSelect={(value) => {
                  setSelectedLeadId(value);
                  form.setFieldsValue({ contact_id: null, });
                }}
              />
            </Form.Item>        
        
        </Col>

        {/* Contact */}
        <Col span={12}>           
            <Form.Item
              label="Contacto"
              name="contact"
              rules={[{ required: true, message: "Selecciona un contacto" }]}
            >
              <Select
                {...contactSelectProps}
                loading={contactQuery.isLoading}
                placeholder="Selecciona un contacto"
                onSelect={(option) => {
                  form.setFieldsValue({ to: option.label });
                }}
              />
            </Form.Item>
        </Col>
      </Row>

      {/* Assigned To */}
      <Form.Item
        label="Asignado a"
        name="assigned_to_id">
        <Select  {...userSelectProps} />
      </Form.Item>
    </Form>
  );
};

