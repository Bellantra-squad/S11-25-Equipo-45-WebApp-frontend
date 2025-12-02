import { User } from "./user.interface";

export interface Conversation {
    id:             number;
    lead:           number;
    contact:        number;
    channel:        string;
    subject:        string;
    status:         string;
    assigned_to:    User;
    messages:       Message[];
    messages_count: number;
    unread_count:   number;
    created_at:     Date;
    updated_at:     Date;
}


export enum SenderType {
    Contact = "contact",
    User = "user",
}

export interface Message {
    id:                  number;
    conversation:        number;
    sender_type:         SenderType;
    sender_id:           string;
    content:             string;
    message_type:        string;
    external_message_id: string;
    is_read:             boolean;
    sent_at:             Date;
    delivered_at:        null;
    read_at:             null;
}





