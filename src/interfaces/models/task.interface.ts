import { User } from "./user.interface";

export interface Task {
    id:           number;
    title:        string;
    description:  string;
    lead:         number;
    contact:      number;
    assigned_to:  User | null;
    task_type:    Task_Type;
    priority:     Priority;
    status:       Status;
    due_date:     Date;
    completed_at: Date | null;
    created_at:   Date;
    updated_at:   Date;
}

export interface TaskRequest {    
    title:        string;
    description:  string;
    lead:         number;
    contact:      number;
    assigned_to_id:  number | null;
    task_type:    Task_Type;
    priority:     Priority;
    status:       Status;
    due_date:     Date;
    completed_at: Date | null;
}


export enum Task_Type {
    Call = "call",
    Email  = "email",
    Meeting  = "meeting",
    Follow_up  = "follow_up",
    Other = "other"
}

export enum Priority {
    High = "high",
    Low = "low",
    Medium = "medium",
    Urgent = "urgent",
}

export enum Status {
    Cancelled = "cancelled",
    Completed = "completed",
    InProgress = "in_progress",
    Pending = "pending",
}
