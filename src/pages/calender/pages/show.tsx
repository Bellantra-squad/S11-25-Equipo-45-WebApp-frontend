


import { Show } from "@refinedev/antd";
import { useNavigation, useParsed, useShow } from "@refinedev/core";


import { Button, Descriptions, Empty, Space} from "antd";
import { Task } from "../../../interfaces/models/task.interface";
import { PriorityTag } from "../../../components/tags/priority-tag";
import { StatusTaskTag } from "../../../components/tags/status-task-tag";
import { EditOutlined, ReloadOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { UserTag } from "../../../components/tags/user-tag";

const TaskShowModal: React.FC = () => {
  const { id } = useParsed();
  const { list, edit } = useNavigation();

  const { query: queryResult } = useShow<Task>({
    resource: "tasks",
    id,
  });

  const { data, isLoading, isError, error, refetch } = queryResult;

  if (isError) {
    console.error("Error fetching task", error);
    return null;
  }
  const task = data?.data;

  return (     
     <Show
      isLoading={isLoading}
      title={task ? task.title : "Detalle de Tarea"}
      // Botones en el header
      headerButtons={() => (
        <Space>
          <Button icon={<UnorderedListOutlined />} onClick={() => list("tasks")}>
            Tareas
          </Button>
          <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
            Refrescar
          </Button>
          {task && (
            <Button type='primary' icon={<EditOutlined />} onClick={() => edit("tasks", task.id)}>
              Editar Tarea
            </Button>
          )}
        </Space>
      )}
    >
      {task ? (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Título">{task.title}</Descriptions.Item>
          <Descriptions.Item label="Descripción">{task.description}</Descriptions.Item>
          <Descriptions.Item label="Lead">{task.lead}</Descriptions.Item>
          <Descriptions.Item label="Contacto">{task.contact}</Descriptions.Item>
          <Descriptions.Item label="Asignado a">
             {task.assigned_to ? <UserTag user={task.assigned_to} /> : "Sin asignar"}
          </Descriptions.Item>
          <Descriptions.Item label="Tipo de Tarea">{task.task_type}</Descriptions.Item>
          <Descriptions.Item label="Prioridad">
            <PriorityTag priority={task.priority} />
          </Descriptions.Item>
          <Descriptions.Item label="Estado">
            <StatusTaskTag status={task.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Fecha límite">
            {new Date(task.due_date).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Completada en">
            {task.completed_at
              ? new Date(task.completed_at).toLocaleString()
              : "No completada"}
          </Descriptions.Item>
          <Descriptions.Item label="Creada en">
            {new Date(task.created_at).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Actualizada en">
            {new Date(task.updated_at).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Empty description="No hay datos de la tarea" />
      )}
    </Show>
  );
};


export default TaskShowModal;