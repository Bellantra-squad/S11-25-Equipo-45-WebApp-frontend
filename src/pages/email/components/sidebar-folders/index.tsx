import { Menu } from "antd";
import { EmailFolder } from "../../../../interfaces/internal/email.interface";
import { emailFolders } from "../../../../mocks/mockData";
import { iconMap } from "../../../../utils/icon-map";
import { ItemType } from "antd/es/menu/interface";


export function SidebarFolders({
  selectedFolder,
  onSelectFolder,
}: {
  selectedFolder: string;
  onSelectFolder: (key: string) => void;
}) {
  
 const renderItems = (folders: EmailFolder[]): ItemType[] =>
  folders.map((f): ItemType => ({
    key: f.key,
    icon: f.icon ? iconMap[f.icon] : undefined,
    label: f.label,
    children: f.children ? renderItems(f.children) : undefined,
  }));

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedFolder]}
      onClick={(info) => onSelectFolder(info.key)}
      items={renderItems(emailFolders)}
      style={{ height: "100%", borderRight: 0 }}
    />
  );
}