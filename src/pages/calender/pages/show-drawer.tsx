// import React from "react";
// import { Drawer, Descriptions } from "antd";
// import { Task } from "../../../interfaces/models/task.interface";
// import { PriorityTag } from "../../../components/tags/priority-tag";
// import { StatusTaskTag } from "../../../components/tags/status-task-tag";
// import { UserTag } from "../../../components/tags/user-tag";

// type Props = {
//   task: Task | null;
//   open: boolean;
//   onClose: () => void;
// };

// const TaskShowDrawer: React.FC<Props> = ({ task, open, onClose }) => {
//   return (
//     <Drawer
//       title={task ? `Tarea #${task.id}` : "Detalle de tareas"}
//       open={open}
//       onClose={onClose}
//       width={600}
//     >
//       {task && (
//         <Descriptions column={1} bordered size="small">
//           <Descriptions.Item label="Título">{task.title}</Descriptions.Item>
//           <Descriptions.Item label="Descrición">{task.description}</Descriptions.Item>         
//           <Descriptions.Item label="Asignado a">
//             {task.assigned_to ? <UserTag user={task.assigned_to} /> : "Sin asignar"}
//           </Descriptions.Item>          
//           <Descriptions.Item label="Prioridad">
//             <PriorityTag priority={task.priority} />
//           </Descriptions.Item>
//           <Descriptions.Item label="Estado">
//             <StatusTaskTag status={task.status} />
//           </Descriptions.Item>
//           <Descriptions.Item label="Fecha de Vencimiento">
//             {new Date(task.due_date).toLocaleString()}
//           </Descriptions.Item>
//           <Descriptions.Item label="Completada">
//             {task.completed_at
//               ? new Date(task.completed_at).toLocaleString()
//               : "Not completed"}
//           </Descriptions.Item>         
//         </Descriptions>
//       )}
//     </Drawer>
//   );
// };

// export default TaskShowDrawer;

import React from "react";
import { Drawer, Descriptions, Checkbox } from "antd";
import { Task } from "../../../interfaces/models/task.interface";
import { PriorityTag } from "../../../components/tags/priority-tag";
import { StatusTaskTag } from "../../../components/tags/status-task-tag";
import { UserTag } from "../../../components/tags/user-tag";
import { useCustomMutation, useShow } from "@refinedev/core";

type Props = {
  id: number;
  open: boolean;
  onClose: () => void;
};

const TaskShowDrawer: React.FC<Props> = ({ id, open, onClose }) => {
  const { query } = useShow<Task>({
    resource: "tasks",
    id,
    queryOptions: { enabled: !!id },
  });

  const task = query.data?.data;

  const { mutate, mutation } = useCustomMutation();

  const handleCompleteToggle = (checked: boolean) => {
    if (!task) return;
    mutate(
      {
        url: `/tasks/${task.id}/complete/`,
        method: "post",
        values: { completed: checked },
      },
      {
        onSuccess: () => {         
          query.refetch(); // refresca los datos del show
        },       
      }
    );
  };

  return (
    <Drawer
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{task ? `Tarea #${task.id}` : "Detalle de tareas"}</span>
          {task && (
            <Checkbox
              checked={!!task.completed_at}
              onChange={(e) => handleCompleteToggle(e.target.checked)}
              disabled={mutation.isPending}
            >
              Completada
            </Checkbox>
          )}
        </div>
      }
      open={open}
      onClose={onClose}
      width={600}
    >
      {task ? (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Título">{task.title}</Descriptions.Item>
          <Descriptions.Item label="Descripción">{task.description}</Descriptions.Item>
          <Descriptions.Item label="Asignado a">
            {task.assigned_to ? <UserTag user={task.assigned_to} /> : "Sin asignar"}
          </Descriptions.Item>
          <Descriptions.Item label="Prioridad">
            <PriorityTag priority={task.priority} />
          </Descriptions.Item>
          <Descriptions.Item label="Estado">
            <StatusTaskTag status={task.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Fecha de Vencimiento">
            {new Date(task.due_date).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Completada">
            {task.completed_at
              ? new Date(task.completed_at).toLocaleString()
              : "No completada"}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        "No hay datos"
      )}
    </Drawer>
  );
};

export default TaskShowDrawer;
