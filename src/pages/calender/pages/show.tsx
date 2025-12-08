


import { Show } from "@refinedev/antd";
import { useNavigation, useParsed, useShow } from "@refinedev/core";


import { Descriptions, Modal, Skeleton} from "antd";
import { Task } from "../../../interfaces/models/task.interface";
import { PriorityTag } from "../../../components/tags/priority-tag";
import { StatusTaskTag } from "../../../components/tags/status-task-tag";

const TaskShowModal: React.FC = () => {
  const { id } = useParsed();
  const { list } = useNavigation();

  const { query: queryResult } = useShow<Task>({
    resource: "tasks",
    id,
  });

  const { data, isLoading, isError, error } = queryResult;

  if (isError) {
    console.error("Error fetching task", error);
    return null;
  }

  const task = data?.data;

  const handleOnClose = () => {
    list("tasks");
  };

  return (
     <Modal
      title={task ? `Task #${task.id}` : "Task Details"}
      footer={null}
      width={600}
      open
      onCancel={handleOnClose}
    >
      {isLoading ? (
        <Skeleton
          loading={isLoading}
          active
          avatar
          paragraph={{ rows: 4 }}
          style={{ padding: 0 }}
        />
      ) : (
        task && (
           <Show isLoading={!task} title={task.title}>
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
         </Show>
           )
      )}
    </Modal>
  );
};


export default TaskShowModal;