import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Popover } from "antd";


export const Notifications: React.FC = () => {
  return (
    <Popover
      placement="bottomRight"     
      trigger="click"
    >
      <Badge dot>
        <Button shape="circle" icon={<BellOutlined />} style={{ border: 0 }} />
      </Badge>
    </Popover>
  );
};