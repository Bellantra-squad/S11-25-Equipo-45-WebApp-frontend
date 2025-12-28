import { Priority, Status, Task_Type } from "../models/task.interface";

export const taskTypeLabels: Record<Task_Type, string> = {
  [Task_Type.Call]: "Llamada",
  [Task_Type.Email]: "Correo",
  [Task_Type.Meeting]: "Reunión",
  [Task_Type.Follow_up]: "Seguimiento",
  [Task_Type.Other]: "Otro",
};

export const priorityLabels: Record<Priority, string> = {
  [Priority.High]: "Alta",
  [Priority.Medium]: "Media",
  [Priority.Low]: "Baja",
  [Priority.Urgent]: "Urgente",
};

export const statusLabels: Record<Status, string> = {
  [Status.Cancelled]: "Cancelada",
  [Status.Completed]: "Completada",
  [Status.InProgress]: "En progreso",
  [Status.Pending]: "Pendiente",
};