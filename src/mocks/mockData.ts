import { EmailFolder, EmailsByFolder } from "../interfaces/internal/email.interface";

export const emailFolders: EmailFolder[] = [
  {
    key: "inbox",
    label: "Inbox",
    icon: "InboxOutlined",
    children: [
      { key: "important", label: "Important", icon: "StarOutlined" },
      { key: "updates", label: "Updates", icon: "InboxOutlined" },
    ],
  },
  {
    key: "sent",
    label: "Sent",
    icon: "SendOutlined",
  },
  {
    key: "trash",
    label: "Trash",
    icon: "DeleteOutlined",
  },
];

export const emailsByFolder: EmailsByFolder = {
  inbox: [
    {
      id: 1,
      from: "John Doe",
      subject: "Meeting Reminder",
      preview: "Don't forget our meeting tomorrow...",
      date: "2025-01-10",
      body: "Hello John, this is the full message content...",
    },
    {
      id: 2,
      from: "Jane Smith",
      subject: "Invoice Attached",
      preview: "Please find the invoice attached...",
      date: "2025-01-09",
      body: "Hi Jane, here is the invoice you requested...",
    },
  ],
  important: [
    {
      id: 5,
      from: "CEO",
      subject: "Company Announcement",
      preview: "Important changes next month...",
      date: "2025-01-02",
      body: "All employees must review this...",
    },
  ],
  updates: [],
  sent: [
    {
      id: 3,
      from: "You",
      subject: "Project Update",
      preview: "The latest project update is here...",
      date: "2025-01-05",
      body: "Hello team, here is the update...",
    },
  ],
  trash: [],
};