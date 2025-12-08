import React from "react";
import { Drawer, Descriptions } from "antd";
import { Task } from "../../../interfaces/models/task.interface";
import { PriorityTag } from "../../../components/tags/priority-tag";
import { StatusTaskTag } from "../../../components/tags/status-task-tag";

type Props = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
};

const TaskShowDrawer: React.FC<Props> = ({ task, open, onClose }) => {
  return (
    <Drawer
      title={task ? `Task #${task.id}` : "Task Details"}
      open={open}
      onClose={onClose}
      width={600}
    >
      {task && (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Title">{task.title}</Descriptions.Item>
          <Descriptions.Item label="Description">{task.description}</Descriptions.Item>
          <Descriptions.Item label="Lead">{task.lead}</Descriptions.Item>
          <Descriptions.Item label="Contact">{task.contact}</Descriptions.Item>
          <Descriptions.Item label="Assigned To">
            {task.assigned_to ? task.assigned_to.first_name : "Unassigned"}
          </Descriptions.Item>
          <Descriptions.Item label="Task Type">{task.task_type}</Descriptions.Item>
          <Descriptions.Item label="Priority">
            <PriorityTag priority={task.priority} />
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <StatusTaskTag status={task.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Due Date">
            {new Date(task.due_date).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Completed At">
            {task.completed_at
              ? new Date(task.completed_at).toLocaleString()
              : "Not completed"}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(task.created_at).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {new Date(task.updated_at).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default TaskShowDrawer;
