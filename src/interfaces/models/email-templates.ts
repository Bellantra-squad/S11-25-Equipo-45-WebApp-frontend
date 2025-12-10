import { User } from "./user.interface";

export interface EmailTemplate {
    id:            number;
    name:          string;
    subject:       string;
    body:          string;
    template_type: TemplateType;
    is_active:     boolean;
    created_by:    User;
    created_at:    Date;
    updated_at:    Date;
}

export interface EmailRequest {
    name:          string;
    subject:       string;
    body:          string;
    template_type: TemplateType;
    is_active:     boolean;
    created_by:    number;
}

export enum TemplateType {
  Welcome = "welcome",
  Reminder = "reminder",
  FollowUp = "follow_up",
  Custom = "custom",  
}