import { User } from "./user.interface";

export interface Activity {
    id:            number;
    lead:          number;
    contact:       number;
    user:          User | null;
    activity_type: ActivityType;
    description:   string;
    metadata:      Metadata;
    created_at:    Date;
}

export enum ActivityType {
    Meeting             = "meeting",
    Message             = "message",
    Call                = "call",
    Email               = "email",
    Note                = "note",
    Task                = "task",
    status_change       = "status_change",     
    Other = "other",
}

export interface Metadata {
    channel?:      Channel;
    message_id?:   string;
    message_type?: MessageType;
    source?:       string;
    duration?:     number;
}

export enum Channel {
    Whatsapp = "whatsapp",
}

export enum MessageType {
    Text = "text",
}
