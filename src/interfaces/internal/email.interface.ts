export interface EmailFolder {
  key: string;
  label: string;
  icon?: IconName;
  children?: EmailFolder[];
}

export type IconName = "InboxOutlined" | "SendOutlined" | "DeleteOutlined" | "StarOutlined";

export interface EmailMessage {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  body: string;
}

export type EmailsByFolder = Record<string, EmailMessage[]>;