import { useState, useMemo } from "react";
import { emailsByFolder } from "../mocks/mockData";


export function useEmailData() {
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  const emails = useMemo(() => {
    return emailsByFolder[selectedFolder] || [];
  }, [selectedFolder]);

  const activeEmail = emails.find((e) => e.id === selectedEmail) || null;

  return {
    selectedFolder,
    setSelectedFolder,

    emails,
    selectedEmail,
    setSelectedEmail,

    activeEmail,
  };
}